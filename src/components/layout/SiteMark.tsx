import { Link } from 'react-router'
import { site } from '../../app/site.ts'
import { cn } from '../../lib/cn.ts'

/**
 * The site identity: monogram plus name, linking to the top of the home page. In the navbar it
 * follows the dark variant (`navbar-dark:`): white name, and no coloured shadow on the monogram,
 * which would read as a glow on night. Elsewhere (the footer) those classes never apply.
 */
export function SiteMark({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn(
        'inline-flex items-center gap-2.5 rounded-lg text-fg transition-colors duration-200 ease-smooth navbar-dark:text-white',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-lg bg-accent-600 text-[0.8125rem] font-semibold tracking-tight text-white shadow-accent navbar-dark:shadow-none"
      >
        {site.initials}
      </span>
      <span className="text-[0.9375rem] font-semibold tracking-tight">{site.name}</span>
    </Link>
  )
}
