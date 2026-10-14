// Makes the site's generated images in headless Chrome, so no image library is needed:
// - public/social-preview.png: the 1200×630 link-preview image, from scripts/social-preview.html
// - public/apple-touch-icon.png: the 180×180 home-screen icon, from public/favicon.svg
// - public/favicon-32x32.png: the favicon as a PNG, for browsers that can't show SVG favicons
// - smaller WebP copies of the profile photo for its srcset, saved next to the photo
// Run `npm run images` after changing the photo, the name, the headline or the favicon, and commit
// the results. Chrome is found at its usual install path; set CHROME_PATH to use another one.
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createInterface } from 'node:readline'
import { localContent } from '../src/content/localContent.ts'

/** Widths of the photo's smaller copies: phones at 2–3×, tablets, then desktops at 1× and 1.5×. */
const PHOTO_WIDTHS = [320, 480, 640, 960]
const PHOTO_QUALITY = 0.82

const repoFile = (path: string) => new URL(`../${path}`, import.meta.url)
const dataUrl = (type: string, bytes: Buffer) => `data:${type};base64,${bytes.toString('base64')}`
const escapeHtml = (text: string) =>
  text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

function findChrome(): string {
  const candidates = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    process.env.LOCALAPPDATA &&
      join(process.env.LOCALAPPDATA, 'Google/Chrome/Application/chrome.exe'),
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ]
  const found = candidates.find((path) => path && existsSync(path))
  if (!found) throw new Error('Chrome was not found: set CHROME_PATH to the Chrome executable')
  return found
}

interface CdpMessage {
  id?: number
  result?: unknown
  error?: { message: string }
}

/** Starts headless Chrome and opens one page, driven over the DevTools protocol. */
async function openChrome() {
  const profile = await mkdtemp(join(tmpdir(), 'portfolio-images-'))
  const chrome = spawn(
    findChrome(),
    [
      '--headless=new',
      '--remote-debugging-port=0',
      `--user-data-dir=${profile}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--hide-scrollbars',
      // Pixels in plain sRGB, whatever the monitor's colour profile.
      '--force-color-profile=srgb',
      'about:blank',
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] },
  )
  const endpoint = await new Promise<string>((resolve, reject) => {
    createInterface({ input: chrome.stderr }).on('line', (line) => {
      const match = /DevTools listening on (ws:\/\/\S+)/.exec(line)
      if (match?.[1]) resolve(match[1])
    })
    chrome.once('exit', (code) => {
      reject(new Error(`Chrome exited (${String(code)}) before it was ready`))
    })
  })

  const socket = new WebSocket(endpoint)
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true })
    socket.addEventListener('error', reject, { once: true })
  })
  let lastId = 0
  const pending = new Map<
    number,
    { resolve: (value: unknown) => void; reject: (error: Error) => void }
  >()
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(String(event.data)) as CdpMessage
    if (message.id === undefined) return
    const call = pending.get(message.id)
    pending.delete(message.id)
    if (message.error) call?.reject(new Error(message.error.message))
    else call?.resolve(message.result)
  })
  const send = <Result>(method: string, params: object = {}, sessionId?: string) =>
    new Promise<Result>((resolve, reject) => {
      lastId += 1
      pending.set(lastId, {
        resolve: (value) => {
          resolve(value as Result)
        },
        reject,
      })
      socket.send(JSON.stringify({ id: lastId, method, params, sessionId }))
    })

  const { targetId } = await send<{ targetId: string }>('Target.createTarget', {
    url: 'about:blank',
  })
  const { sessionId } = await send<{ sessionId: string }>('Target.attachToTarget', {
    targetId,
    flatten: true,
  })
  const page = <Result>(method: string, params: object = {}) =>
    send<Result>(method, params, sessionId)
  const { frameTree } = await page<{ frameTree: { frame: { id: string } } }>('Page.getFrameTree')

  async function evaluate<Value>(expression: string): Promise<Value> {
    const { result, exceptionDetails } = await page<{
      result: { value: Value }
      exceptionDetails?: { text: string }
    }>('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
    if (exceptionDetails) throw new Error(`In the page: ${exceptionDetails.text}`)
    return result.value
  }

  /**
   * Renders a whole HTML document at width×height CSS pixels and returns it as a PNG. With
   * `transparent`, whatever the page doesn't paint stays transparent instead of white.
   */
  async function screenshot(
    html: string,
    width: number,
    height: number,
    { transparent = false } = {},
  ): Promise<Buffer> {
    if (transparent) {
      await page('Emulation.setDefaultBackgroundColorOverride', {
        color: { r: 0, g: 0, b: 0, a: 0 },
      })
    }
    await page('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: false,
    })
    await page('Page.setDocumentContent', { frameId: frameTree.frame.id, html })
    // Every font and image loaded and decoded, then two frames so that they are painted.
    await evaluate(`Promise.all([
      ...[...document.fonts].map((font) => font.load()),
      ...[...document.images].map((image) => image.decode()),
    ]).then(() => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done))))`)
    const { data } = await page<{ data: string }>('Page.captureScreenshot', { format: 'png' })
    if (transparent) await page('Emulation.setDefaultBackgroundColorOverride')
    return Buffer.from(data, 'base64')
  }

  async function close() {
    await send('Browser.close').catch(() => undefined)
    socket.close()
    if (chrome.exitCode === null) await new Promise((resolve) => chrome.once('exit', resolve))
    await rm(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 })
  }

  return { evaluate, screenshot, close }
}

/** The headline as the Hero shows it: "·" in the accent, each item kept on one line. */
function roleLineHtml(headline: string): string {
  const items = headline.split('·').map((item) => item.trim())
  return items
    .map((item, index) => {
      const separator = index < items.length - 1 ? ' <span class="separator">·</span>' : ''
      return `<span class="item">${escapeHtml(item)}${separator}</span>`
    })
    .join(' ')
}

const { profile } = localContent
const photo = profile.photo
if (!photo?.src.startsWith('/')) {
  throw new Error('The images need the owner’s photo as a file in public/ (profile.photo.src)')
}
const photoBytes = await readFile(repoFile(`public${photo.src}`))
const photoType = photo.src.endsWith('.webp') ? 'image/webp' : 'image/jpeg'
const chrome = await openChrome()
const written: string[] = []

try {
  // Link-preview image.
  const font = await readFile(
    repoFile('node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'),
  )
  const card = (await readFile(repoFile('scripts/social-preview.html'), 'utf8'))
    .replaceAll('{{font}}', dataUrl('font/woff2', font))
    .replaceAll('{{photo}}', dataUrl(photoType, photoBytes))
    .replaceAll('{{initials}}', escapeHtml(profile.initials))
    .replaceAll('{{name}}', escapeHtml(profile.fullName))
    .replaceAll('{{roles}}', profile.headline ? roleLineHtml(profile.headline) : '')
  const unfilled = /\{\{\w+\}\}/.exec(card)?.[0]
  if (unfilled)
    throw new Error(`social-preview.html has a placeholder this script doesn’t fill: ${unfilled}`)
  await writeFile(repoFile('public/social-preview.png'), await chrome.screenshot(card, 1200, 630))
  written.push('public/social-preview.png')

  // Home-screen icon: the favicon on a square of its own tile colour. iOS rounds the corners itself
  // and would fill transparent ones with black.
  const favicon = await readFile(repoFile('public/favicon.svg'))
  const tile = /<rect [^>]*fill="(#[\da-f]{3,8})"/i.exec(favicon.toString('utf8'))?.[1]
  if (!tile) throw new Error('public/favicon.svg has no <rect fill="#…"> tile')
  const icon = `<body style="margin:0;background:${tile}"><img src="${dataUrl('image/svg+xml', favicon)}" width="180" height="180" style="display:block"></body>`
  await writeFile(repoFile('public/apple-touch-icon.png'), await chrome.screenshot(icon, 180, 180))
  written.push('public/apple-touch-icon.png')

  // The same favicon as a 32×32 PNG, its corners left transparent as in the SVG, for browsers
  // without SVG favicons.
  const fallback = `<body style="margin:0"><img src="${dataUrl('image/svg+xml', favicon)}" width="32" height="32" style="display:block"></body>`
  await writeFile(
    repoFile('public/favicon-32x32.png'),
    await chrome.screenshot(fallback, 32, 32, { transparent: true }),
  )
  written.push('public/favicon-32x32.png')

  // Smaller copies of the photo, scaled down in a canvas and encoded as WebP.
  const widths = PHOTO_WIDTHS.filter((width) => width < photo.width)
  const copies = await chrome.evaluate<Record<string, string>>(`(async () => {
    const image = new Image()
    image.src = ${JSON.stringify(dataUrl(photoType, photoBytes))}
    await image.decode()
    const copies = {}
    for (const width of ${JSON.stringify(widths)}) {
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = Math.round((width * image.naturalHeight) / image.naturalWidth)
      const context = canvas.getContext('2d')
      context.imageSmoothingQuality = 'high'
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      copies[width] = canvas.toDataURL('image/webp', ${String(PHOTO_QUALITY)}).split(',')[1]
    }
    return copies
  })()`)
  const variants = widths.map((width) => ({
    src: photo.src.replace(/(\.\w+)$/, `-${String(width)}.webp`),
    width,
  }))
  for (const variant of variants) {
    const base64 = copies[String(variant.width)]
    if (!base64) throw new Error(`No ${String(variant.width)}px copy of the photo was made`)
    await writeFile(repoFile(`public${variant.src}`), Buffer.from(base64, 'base64'))
    written.push(`public${variant.src}`)
  }
  if (JSON.stringify(photo.variants) !== JSON.stringify(variants)) {
    console.log(
      `\nSet profile.photo.variants in src/content/local/profile.ts to:\n${JSON.stringify(variants)}`,
    )
  }
} finally {
  await chrome.close()
}

console.log(`Wrote ${written.join(', ')}`)
