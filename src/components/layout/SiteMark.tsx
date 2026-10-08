import { Link } from 'react-router'
import { site } from '../../app/site.ts'
import { cn } from '../../lib/cn.ts'

/** The site identity: monogram plus name, linking to the top of the home page. */
export function SiteMark({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn('inline-flex items-center gap-2.5 rounded-lg text-fg', className)}>
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-lg bg-accent-600 text-[0.8125rem] font-semibold tracking-tight text-white shadow-accent"
      >
        {site.initials}
      </span>
      <span className="text-[0.9375rem] font-semibold tracking-tight">{site.name}</span>
    </Link>
  )
}
