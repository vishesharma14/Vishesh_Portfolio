import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { sectionHref, sectionNav, type SectionId } from '../../app/navigation.ts'
import { cn } from '../../lib/cn.ts'
import { Button } from '../ui/Button.tsx'
import { Container } from '../ui/Container.tsx'
import { navLinkColors } from './navLinkColors.ts'

/**
 * Menu button and drop-down section list for small and medium screens.
 * A disclosure, not a modal: focus is never trapped, Escape closes it and returns focus
 * to the button, and any navigation (including picking a link) closes it. The button and the
 * panel follow the navbar's dark variant (`navbar-dark:`).
 */
export function MobileMenu({ activeId }: { activeId: SectionId | null }) {
  const { key: locationKey } = useLocation()
  // Remember which location the menu was opened on; navigating anywhere closes it.
  const [openedAt, setOpenedAt] = useState<string | null>(null)
  const open = openedAt === locationKey
  const panelId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpenedAt(null)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  function close() {
    setOpenedAt(null)
  }

  return (
    <div className="lg:hidden">
      <Button
        ref={buttonRef}
        variant="ghost"
        className="size-11 px-0 text-fg navbar-dark:text-white navbar-dark:hover:bg-white/10 navbar-dark:hover:text-white"
        aria-label="Menu"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          setOpenedAt(open ? null : locationKey)
        }}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </Button>

      {/* Dims the page while the menu is open; clicking it closes the menu. */}
      <div
        aria-hidden="true"
        onClick={close}
        className={cn(
          'fixed inset-x-0 top-header bottom-0 bg-ink-950/15 transition-opacity duration-200 ease-smooth',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <div
        id={panelId}
        className={cn(
          'absolute inset-x-0 top-full border-b border-border bg-canvas shadow-card-hover transition-[opacity,translate,visibility,background-color,border-color] duration-200 ease-smooth navbar-dark:border-night-800 navbar-dark:bg-night-900',
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0',
        )}
      >
        <Container className="max-h-[calc(100svh-var(--spacing-header))] overflow-y-auto py-3">
          <nav aria-label="Primary">
            <ul className="grid gap-1">
              {sectionNav.map((item) => {
                const active = item.id === activeId
                return (
                  <li key={item.id}>
                    <Link
                      to={sectionHref(item.id)}
                      onClick={close}
                      aria-current={active ? 'location' : undefined}
                      className={cn(
                        'flex min-h-12 items-center rounded-xl px-4 text-base font-medium transition-colors duration-200 ease-smooth',
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
        </Container>
      </div>
    </div>
  )
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none">
      <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}
