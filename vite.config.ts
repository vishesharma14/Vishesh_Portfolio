import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite'
import { site } from './src/app/site.ts'

/**
 * Writes the site identity (src/app/site.ts) into the <head> of index.html: the home page's title
 * and description, the theme colour, and the Open Graph and Twitter tags that link previews read.
 * Crawlers that don't run JavaScript get these on every URL; once the app runs, each page renders
 * its own title and description (PageMetadata). Tags with absolute URLs wait for site.url.
 */
function siteHead(): Plugin {
  const meta = (attrs: Record<string, string>): HtmlTagDescriptor => ({
    tag: 'meta',
    attrs,
    injectTo: 'head',
  })
  const image = site.url ? site.url + site.socialImage.path : undefined
  const imageTags = image
    ? [
        meta({ property: 'og:image', content: image }),
        meta({ property: 'og:image:type', content: 'image/png' }),
        meta({ property: 'og:image:width', content: String(site.socialImage.width) }),
        meta({ property: 'og:image:height', content: String(site.socialImage.height) }),
        meta({ property: 'og:image:alt', content: site.socialImage.alt }),
        meta({ name: 'twitter:image', content: image }),
        meta({ name: 'twitter:image:alt', content: site.socialImage.alt }),
      ]
    : []

  return {
    name: 'site-head',
    configResolved(config) {
      if (config.command === 'build' && !site.url)
        config.logger.warn(
          'site.url is not set yet (Step 11b): the canonical link, og:url and og:image are left out.',
        )
    },
    transformIndexHtml() {
      return [
        // Vite inserts text children as they are, so escape them (attributes it escapes itself).
        { tag: 'title', children: site.title.replaceAll('&', '&amp;'), injectTo: 'head' },
        meta({ name: 'description', content: site.description }),
        meta({ name: 'theme-color', content: site.themeColor }),
        meta({ property: 'og:type', content: 'website' }),
        meta({ property: 'og:site_name', content: site.name }),
        meta({ property: 'og:title', content: site.title }),
        meta({ property: 'og:description', content: site.description }),
        ...(site.url ? [meta({ property: 'og:url', content: `${site.url}/` })] : []),
        meta({ name: 'twitter:card', content: 'summary_large_image' }),
        meta({ name: 'twitter:title', content: site.title }),
        meta({ name: 'twitter:description', content: site.description }),
        ...imageTags,
      ]
    },
  }
}

/** The Inter file that every page needs for its first screen: Latin, variable weight. */
const ABOVE_THE_FOLD_FONT = 'inter-latin-wght-normal.woff2'

/**
 * Preloads that font, so it arrives with the stylesheet instead of after the first layout: the
 * page is laid out once, in Inter, rather than again when the font swaps in. That second layout
 * cost time on slow phones and moved a freshly loaded /#section away from the navbar. In a build
 * the file name has a content hash, so it is looked up in the bundle.
 */
function preloadFont(): Plugin {
  let base = '/'

  return {
    name: 'preload-font',
    configResolved(config) {
      base = config.base
    },
    transformIndexHtml: {
      order: 'post',
      handler(_html, { bundle }) {
        let href = `/node_modules/@fontsource-variable/inter/files/${ABOVE_THE_FOLD_FONT}`
        if (bundle) {
          const font = Object.values(bundle).find(
            (file) => file.type === 'asset' && file.names.includes(ABOVE_THE_FOLD_FONT),
          )
          if (!font) throw new Error(`preload-font: ${ABOVE_THE_FOLD_FONT} is not in the build`)
          href = base + font.fileName
        }
        return [
          {
            tag: 'link',
            attrs: { rel: 'preload', href, as: 'font', type: 'font/woff2', crossorigin: true },
            injectTo: 'head',
          },
        ]
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), siteHead(), preloadFont()],
})
