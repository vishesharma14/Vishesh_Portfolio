import { useEffect, useRef, type RefObject } from 'react'
import { Link } from 'react-router'
import { sectionHref } from '../../app/navigation.ts'
import { useSectionNav } from '../../app/useSectionNav.ts'
import { Container } from '../ui/Container.tsx'
import { SiteMark } from './SiteMark.tsx'

const footerLink =
  'inline-block py-1 text-sm text-fg-muted transition-colors duration-200 ease-smooth hover:text-fg'

/** Site footer: identity, the navbar's section links and a way back to the top. */
export function Footer() {
  const items = useSectionNav()
  const footerRef = useRef<HTMLElement>(null)
  useMarkInView(footerRef)

  return (
    <footer ref={footerRef} className="border-t border-border bg-surface">
      <Container className="py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <SiteMark />
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-3">
              {items.map((item) => (
                <li key={item.id}>
                  <Link to={sectionHref(item.id)} className={footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex justify-end border-t border-border pt-6">
          {/* Stays on the current page and returns to the top of its main content. */}
          <Link to={{ hash: 'main' }} className={footerLink}>
            Back to top <span aria-hidden="true">↑</span>
          </Link>
        </div>
      </Container>
    </footer>
  )
}

/**
 * Sets data-footer-in-view on <html> while the footer is on screen, so that overscrolling past the
 * bottom of the page shows the footer's colour (globals.css) instead of the navbar's.
 */
function useMarkInView(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const footer = ref.current
    if (!footer) return
    const root = document.documentElement
    // At least 1px of it: a footer that only touches the bottom edge (below the 404 page, which is
    // a screen tall) isn't in view.
    const observer = new IntersectionObserver(
      ([entry]) => {
        root.toggleAttribute('data-footer-in-view', entry?.isIntersecting ?? false)
      },
      { rootMargin: '0px 0px -1px 0px' },
    )
    observer.observe(footer)
    return () => {
      observer.disconnect()
      root.removeAttribute('data-footer-in-view')
    }
  }, [ref])
}
