import { useLayoutEffect, useRef } from 'react'
import { Outlet, ScrollRestoration, useLocation, type Location } from 'react-router'

/**
 * Every fresh page load (typed URL, external link) gets React Router's shared key "default",
 * so a new URL would reopen at the last scroll position saved under that key. Keying those
 * entries by URL keeps refresh restoring position while new pages start at the top.
 */
function scrollKey(location: Location): string {
  return location.key === 'default' ? location.pathname + location.hash : location.key
}

/**
 * Makes the scroll that follows a page change (a new pathname) jump instead of glide. The CSS
 * smooth scrolling is meant for section links on the current page; without this, opening a
 * project would animate up from the old scroll position, and browser Back would scroll through
 * the whole home page. Rendered before ScrollRestoration, so this layout effect runs just before
 * the one in which React Router scrolls.
 */
function InstantScrollOnPageChange() {
  const { pathname } = useLocation()
  const previousPathname = useRef(pathname)

  useLayoutEffect(() => {
    if (previousPathname.current === pathname) return
    previousPathname.current = pathname
    const root = document.documentElement
    root.style.scrollBehavior = 'auto'
    // Apply it right away: Chrome runs scrollTo(0, 0) without first updating styles, so the reset
    // to the top of a new page would otherwise still use the smooth value.
    getComputedStyle(root).getPropertyValue('scroll-behavior')
    const frame = requestAnimationFrame(() => {
      root.style.removeProperty('scroll-behavior')
    })
    return () => {
      cancelAnimationFrame(frame)
      root.style.removeProperty('scroll-behavior')
    }
  }, [pathname])

  return null
}

/**
 * Wraps every route. ScrollRestoration resets scroll on page changes, restores it on
 * back/forward and refresh, and scrolls to `#section` targets using the CSS smooth-scroll
 * setting (which is turned off for visitors who prefer reduced motion, and for page changes).
 */
export function RootLayout() {
  return (
    <>
      <Outlet />
      <InstantScrollOnPageChange />
      <ScrollRestoration getKey={scrollKey} />
    </>
  )
}
