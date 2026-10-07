import type { ReactNode } from 'react'
import { cn } from '../../lib/cn.ts'

interface SectionHeaderProps {
  title: ReactNode
  /** Short label above the title. */
  eyebrow?: ReactNode
  description?: ReactNode
  /** Heading level. Sections use h2; only the page's main heading is h1. */
  as?: 'h1' | 'h2' | 'h3'
  /** id for the heading, so the section can reference it with aria-labelledby. */
  titleId?: string
  align?: 'start' | 'center'
  className?: string
}

/** Eyebrow, title and intro text for the top of a section. */
export function SectionHeader({
  title,
  eyebrow,
  description,
  as: Heading = 'h2',
  titleId,
  align = 'start',
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? <p className="text-eyebrow text-accent-700 uppercase">{eyebrow}</p> : null}
      <Heading id={titleId} className={cn('text-title text-fg', eyebrow ? 'mt-3' : null)}>
        {title}
      </Heading>
      {description ? <p className="mt-4 text-lead text-fg-muted">{description}</p> : null}
    </header>
  )
}
