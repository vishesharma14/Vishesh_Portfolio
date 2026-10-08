import { Outlet, ScrollRestoration, type Location } from 'react-router'

/**
 * Every fresh page load (typed URL, external link) gets React Router's shared key "default",
 * so a new URL would reopen at the last scroll position saved under that key. Keying those
 * entries by URL keeps refresh restoring position while new pages start at the top.
 */
function scrollKey(location: Location): string {
  return location.key === 'default' ? location.pathname + location.hash : location.key
}

/**
 * Wraps every route. ScrollRestoration resets scroll on page changes, restores it on
 * back/forward and refresh, and scrolls to `#section` targets using the CSS smooth-scroll
 * setting (which is turned off for visitors who prefer reduced motion).
 */
export function RootLayout() {
  return (
    <>
      <Outlet />
      <ScrollRestoration getKey={scrollKey} />
    </>
  )
}
