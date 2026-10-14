import { useLayoutEffect, type RefObject } from 'react'

let settleFrame = 0

/** The dark bands under the navbar right now. The navbar is dark while there is at least one. */
const bandsUnderNavbar = new Set<Element>()

/**
 * Sets the navbar's tone on <html>: `data-navbar-tone="dark"` while a dark band is under it
 * (read by the `navbar-dark:` variant in globals.css), no attribute otherwise. With `instant`,
 * `data-navbar-instant` switches the navbar's colour transitions off until the change has been
 * painted, so it shows at once instead of fading.
 */
function setNavbarTone(dark: boolean, instant: boolean) {
  const html = document.documentElement
  if (dark === (html.getAttribute('data-navbar-tone') === 'dark')) return
  if (instant) {
    html.setAttribute('data-navbar-instant', '')
    cancelAnimationFrame(settleFrame)
    // Two frames: the first runs before this change is painted, the second after it.
    settleFrame = requestAnimationFrame(() => {
      settleFrame = requestAnimationFrame(() => {
        html.removeAttribute('data-navbar-instant')
      })
    })
  }
  if (dark) html.setAttribute('data-navbar-tone', 'dark')
  else html.removeAttribute('data-navbar-tone')
}

/** Records whether one band is under the navbar, then sets the navbar's tone from all of them. */
function setBandUnderNavbar(band: Element, under: boolean, instant: boolean) {
  if (under) bandsUnderNavbar.add(band)
  else bandsUnderNavbar.delete(band)
  setNavbarTone(bandsUnderNavbar.size > 0, instant)
}

/**
 * Turns the navbar dark while this element, a full-width dark band (the Hero, the Contact band),
 * is under it, that is while the band covers the navbar's bottom edge. Each band counts on its
 * own, so the navbar is dark over every band and light between them.
 *
 * Two IntersectionObservers report the crossings, and both check the band's position then:
 * - The band's bottom edge crossing the navbar's bottom edge: the root is the screen below the
 *   navbar, so the band intersects it while part of the band is below that edge.
 * - The band's top edge crossing it: the root starts 1px below the navbar and reaches far past the
 *   screen at the sides and the bottom, so the band is fully inside (ratio 1) until its top edge
 *   moves above that line. The 1px lets a band that starts exactly at the navbar count as under
 *   it (the Hero at the top of the page, a band a section link scrolled to), even when layout puts
 *   it a fraction of a pixel lower.
 *
 * The observers report only after the first paint, so the starting colour is measured once just
 * before that paint (after React Router has restored the scroll position) and shown without a
 * fade. When the band unmounts (another page opens), it stops counting at once. The tone is an
 * attribute rather than React state so that each change is in the very next painted frame.
 */
export function useDarkBandUnderNavbar(ref: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const band = ref.current
    if (!band) return

    // scroll-padding-top is the navbar's height (globals.css), resolved to pixels.
    const navbarHeight =
      parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
    const coversEdge = (rect: DOMRectReadOnly) =>
      rect.top < navbarHeight + 1 && rect.bottom >= navbarHeight

    const frame = requestAnimationFrame(() => {
      setBandUnderNavbar(band, coversEdge(band.getBoundingClientRect()), true)
    })
    const update = ([entry]: IntersectionObserverEntry[]) => {
      if (entry) setBandUnderNavbar(band, coversEdge(entry.boundingClientRect), false)
    }
    const observers = [
      new IntersectionObserver(update, { rootMargin: `${String(-navbarHeight)}px 0px 0px 0px` }),
      new IntersectionObserver(update, {
        rootMargin: `${String(-(navbarHeight + 1))}px 100% 1000% 100%`,
        threshold: 1,
      }),
    ]
    for (const observer of observers) observer.observe(band)

    return () => {
      cancelAnimationFrame(frame)
      for (const observer of observers) observer.disconnect()
      setBandUnderNavbar(band, false, true)
    }
  }, [ref])
}
