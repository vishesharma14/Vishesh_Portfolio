import { Link, useLocation } from 'react-router'
import { sectionHref, sectionIds } from '../../app/navigation.ts'
import { useSectionNav } from '../../app/useSectionNav.ts'
import { useActiveSection } from '../../hooks/useActiveSection.ts'
import { cn } from '../../lib/cn.ts'
import { Container } from '../ui/Container.tsx'
import { MobileMenu } from './MobileMenu.tsx'
import { navLinkColors } from './navLinkColors.ts'
import { SiteMark } from './SiteMark.tsx'

/**
 * Sticky site header: identity, section links on large screens, menu button below that. The links
 * cover only the sections the home page renders. Dark while a dark band (the Hero, the Contact
 * band) is under it (`navbar-dark:` classes, see useDarkBandUnderNavbar), light everywhere else.
 * Only the colours change: a short fade, instant with reduced motion.
 */
export function Navbar() {
  const { pathname } = useLocation()
  const items = useSectionNav()
  // Sections only exist on the home page, so nothing is highlighted elsewhere.
  const activeId = useActiveSection(sectionIds, pathname === '/')

  return (
    <header
      data-navbar
      className="sticky top-0 z-40 h-header border-b border-border bg-canvas transition-colors duration-200 ease-smooth navbar-dark:border-night-800 navbar-dark:bg-night-950 navbar-dark:on-dark"
    >
      <Container className="flex h-full items-center justify-between gap-6">
        <SiteMark />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {items.map((item) => {
              const active = item.id === activeId
              return (
                <li key={item.id}>
                  <Link
                    to={sectionHref(item.id)}
                    aria-current={active ? 'location' : undefined}
                    className={cn(
                      'rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors duration-200 ease-smooth',
                      navLinkColors(active),
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <MobileMenu items={items} activeId={activeId} />
      </Container>
    </header>
  )
}
