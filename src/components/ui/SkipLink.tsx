interface SkipLinkProps {
  /** id of the main content element, with a leading #. */
  href?: string
  label?: string
}

/**
 * Off-screen until focused: lets keyboard users jump past navigation to the main content.
 * Moved out of view rather than hidden, so screen readers can always reach it.
 */
export function SkipLink({ href = '#main', label = 'Skip to main content' }: SkipLinkProps) {
  return (
    <a
      href={href}
      className="fixed top-4 left-4 z-50 -translate-y-[calc(100%+2rem)] rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-fg focus:translate-y-0 focus:shadow-card-hover"
    >
      {label}
    </a>
  )
}
