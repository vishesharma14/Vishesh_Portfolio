import { Link, useLocation } from 'react-router'
import { sectionHref, sectionIds, sectionNav } from '../../app/navigation.ts'
import { useActiveSection } from '../../hooks/useActiveSection.ts'
import { cn } from '../../lib/cn.ts'
import { Container } from '../ui/Container.tsx'
import { MobileMenu } from './MobileMenu.tsx'
import { SiteMark } from './SiteMark.tsx'

/** Sticky site header: identity, section links on large screens, menu button below that. */
export function Navbar() {
  const { pathname } = useLocation()
  // Sections only exist on the home page, so nothing is highlighted elsewhere.
  const activeId = useActiveSection(sectionIds, pathname === '/')

  return (
    <header className="sticky top-0 z-40 h-header border-b border-border bg-canvas">
      <Container className="flex h-full items-center justify-between gap-6">
        <SiteMark />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {sectionNav.map((item) => {
              const active = item.id === activeId
              return (
                <li key={item.id}>
                  <Link
                    to={sectionHref(item.id)}
                    aria-current={active ? 'location' : undefined}
                    className={cn(
                      'rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors duration-200 ease-smooth',
                      active
                        ? 'bg-accent-50 text-accent-700'
                        : 'text-fg-muted hover:bg-ink-100 hover:text-fg',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <MobileMenu activeId={activeId} />
      </Container>
    </header>
  )
}
