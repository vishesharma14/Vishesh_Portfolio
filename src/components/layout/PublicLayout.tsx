import { Outlet } from 'react-router'
import { SkipLink } from '../ui/SkipLink.tsx'
import { Footer } from './Footer.tsx'
import { Navbar } from './Navbar.tsx'

/** Layout for all public pages: skip link, sticky navbar, page content and footer. */
export function PublicLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <SkipLink />
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
