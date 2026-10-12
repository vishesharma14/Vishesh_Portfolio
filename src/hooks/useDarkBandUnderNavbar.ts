import { useLayoutEffect, type RefObject } from 'react'

let settleFrame = 0

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

/**
 * Turns the navbar dark while this element, a dark band at the top of the page (the Hero), is
 * under it: from the top of the page until the band's bottom edge passes the navbar's bottom
 * edge, and again on the way back up. An IntersectionObserver reports each crossing. Its root is
 * the viewport minus the navbar, so "intersecting" means part of the band is still below the
 * navbar's bottom edge, which for a band at the top of the page means it is under the navbar.
 *
 * The observer reports only after the first paint, so the starting colour is measured once just
 * before that paint (after React Router has restored the scroll position) and shown without a
 * fade. When the band unmounts (another page opens), the navbar turns light at once. The tone is
 * an attribute rather than React state so that each change is in the very next painted frame.
 */
export function useDarkBandUnderNavbar(ref: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const band = ref.current
    if (!band) return

    // scroll-padding-top is the navbar's height (globals.css), resolved to pixels.
    const navbarHeight =
      parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
    const frame = requestAnimationFrame(() => {
      setNavbarTone(band.getBoundingClientRect().bottom >= navbarHeight, true)
    })
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setNavbarTone(entry.isIntersecting, false)
      },
      { rootMargin: `${String(-navbarHeight)}px 0px 0px 0px` },
    )
    observer.observe(band)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      setNavbarTone(false, true)
    }
  }, [ref])
}
