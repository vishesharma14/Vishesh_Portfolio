import { useEducation, type EducationEntry } from '../../content/index.ts'
import { Badge } from '../../components/ui/Badge.tsx'
import { Section } from '../../components/ui/Section.tsx'
import { SectionHeader } from '../../components/ui/SectionHeader.tsx'
import { cn } from '../../lib/cn.ts'
import { formatDateRange, formatScore } from './format.ts'

/**
 * The #education section: an ordered timeline in content order (newest first).
 * Renders nothing until there are entries, so the page never shows an empty section.
 */
export function Education() {
  const education = useEducation()
  if (education.length === 0) return null

  return (
    <Section id="education" aria-labelledby="education-title" className="border-t border-border">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <SectionHeader titleId="education-title" title="Education" className="lg:col-span-4" />
        {/* The vertical line runs behind the dots; each dot's ring masks it. */}
        <ol className="relative grid gap-10 before:absolute before:top-2 before:bottom-2 before:left-[4.5px] before:w-px before:bg-border lg:col-span-8">
          {education.map((entry) => (
            <TimelineItem key={entry.id} entry={entry} />
          ))}
        </ol>
      </div>
    </Section>
  )
}

function TimelineItem({ entry }: { entry: EducationEntry }) {
  const dates = formatDateRange(entry)
  const details = [entry.boardOrUniversity, entry.location].filter((detail) => detail !== undefined)
  const score = entry.score ? formatScore(entry.score) : null

  // The dot sits inside whichever line comes first (the dates, or the title when there are no
  // dates) and is centred on that line's own line-height (`lh`), so it lines up at any font size.
  const marker = (
    <span
      aria-hidden="true"
      className={cn(
        'absolute top-[calc(0.5lh-5px)] -left-8 size-2.5 rounded-full ring-4 ring-canvas sm:-left-10',
        entry.current ? 'bg-accent-600' : 'bg-ink-300',
      )}
    />
  )

  return (
    <li className="pl-8 sm:pl-10">
      {dates ? (
        <p className="relative text-sm font-medium text-fg-subtle tabular-nums">
          {marker}
          {dates}
        </p>
      ) : null}
      <h3 className={cn('text-heading text-fg', dates ? 'mt-1.5' : 'relative')}>
        {dates ? null : marker}
        {entry.qualification}
      </h3>
      <p className="mt-1 font-medium text-fg">{entry.institution}</p>
      {details.length > 0 ? (
        <p className="mt-1 text-sm text-fg-muted">{details.join(' · ')}</p>
      ) : null}
      {score ? (
        // 14px rather than the badge default (12px): the score is a key fact, so keep it readable.
        <Badge className="mt-3 text-sm">
          <span aria-hidden="true">{score.text}</span>
          <span className="sr-only">{score.spoken}</span>
        </Badge>
      ) : null}
    </li>
  )
}
