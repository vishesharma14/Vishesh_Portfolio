import { GraduationCapIcon } from '../../components/ui/icons.tsx'
import { cn } from '../../lib/cn.ts'

interface StudyCardProps {
  /** e.g. "B.Tech CSE · SRM IST". */
  label: string
  className?: string
}

/**
 * A small card overlapping the portrait's lower-left corner with what the owner is studying now,
 * low enough to stay clear of the face. Desktop only: below lg the photo is a small square.
 */
export function StudyCard({ label, className }: StudyCardProps) {
  return (
    <p
      className={cn(
        'absolute bottom-8 -left-10 hidden items-center gap-3 rounded-2xl border border-border bg-surface py-2.5 pr-5 pl-2.5 leading-tight shadow-card-hover lg:flex',
        className,
      )}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-50 text-accent-700">
        <GraduationCapIcon className="size-[1.125rem]" />
      </span>
      <span>
        <span className="block text-[0.6875rem] font-medium tracking-[0.08em] text-fg-muted uppercase">
          Currently studying
        </span>{' '}
        <span className="mt-1 block text-sm font-semibold tracking-tight text-fg">{label}</span>
      </span>
    </p>
  )
}
