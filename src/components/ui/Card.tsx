import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn.ts'

type CardProps = HTMLAttributes<HTMLElement> & {
  /** Element to render. Use `article` for self-contained items and `li` inside lists. */
  as?: 'div' | 'article' | 'li' | 'section'
  /** Adds hover feedback. Use only when the card is clickable or holds its main link. */
  interactive?: boolean
}

/** White surface with a hairline border and a soft shadow. */
export function Card({ as: Tag = 'div', interactive = false, className, ...props }: CardProps) {
  return (
    <Tag
      className={cn(
        'rounded-2xl border border-border bg-surface p-6 shadow-card sm:p-8',
        interactive &&
          'transition-[border-color,box-shadow,translate] duration-300 ease-smooth hover:border-border-strong hover:shadow-card-hover motion-safe:hover:-translate-y-0.5',
        className,
      )}
      {...props}
    />
  )
}
