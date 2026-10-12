import { cn } from '../../lib/cn.ts'
import type { HeroFact } from './facts.ts'

interface QuickFactsProps {
  facts: HeroFact[]
  className?: string
}

/**
 * A row of short facts on the dark Hero band, each a large white value over a small uppercase muted
 * label, split by thin dividers with the same space on both sides. The first fact lines up with
 * the text column's edge.
 * A description list, so screen readers pair each label with its value ("CGPA, 8.16 out of 10");
 * flex-col-reverse shows the value above the label without changing that reading order.
 */
export function QuickFacts({ facts, className }: QuickFactsProps) {
  if (facts.length === 0) return null

  return (
    <dl className={cn('flex flex-wrap divide-x divide-night-800', className)}>
      {facts.map((fact) => (
        <div key={fact.label} className="flex flex-col-reverse px-4 first:pl-0 last:pr-0 sm:px-6">
          <dt className="mt-2 text-xs font-medium tracking-[0.08em] text-ink-400 uppercase">
            {fact.label}
          </dt>
          <dd className="text-[1.75rem] leading-none font-semibold tracking-tight text-white tabular-nums">
            {fact.value}
            {fact.spokenSuffix ? <span className="sr-only">{fact.spokenSuffix}</span> : null}
          </dd>
        </div>
      ))}
    </dl>
  )
}
