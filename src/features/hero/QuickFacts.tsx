import { cn } from '../../lib/cn.ts'
import type { HeroFact } from './facts.ts'

interface QuickFactsProps {
  facts: HeroFact[]
  className?: string
}

/**
 * A row of short facts, each a large value over a small uppercase label, split by thin dividers
 * with the same space on both sides. The first fact lines up with the text column's edge.
 * A description list, so screen readers pair each label with its value ("CGPA, 8.16 out of 10");
 * flex-col-reverse shows the value above the label without changing that reading order.
 */
export function QuickFacts({ facts, className }: QuickFactsProps) {
  if (facts.length === 0) return null

  return (
    <dl className={cn('flex flex-wrap divide-x divide-border', className)}>
      {facts.map((fact) => (
        <div key={fact.label} className="flex flex-col-reverse px-4 first:pl-0 last:pr-0 sm:px-6">
          <dt className="mt-2 text-xs font-medium tracking-[0.08em] text-fg-muted uppercase">
            {fact.label}
          </dt>
          <dd className="text-[1.75rem] leading-none font-semibold tracking-tight text-fg tabular-nums">
            {fact.value}
            {fact.spokenSuffix ? <span className="sr-only">{fact.spokenSuffix}</span> : null}
          </dd>
        </div>
      ))}
    </dl>
  )
}
