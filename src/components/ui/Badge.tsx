import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn.ts'

type BadgeVariant = 'neutral' | 'accent'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant
}

const variants: Record<BadgeVariant, string> = {
  neutral: 'border-ink-200 bg-ink-50 text-ink-700',
  accent: 'border-accent-100 bg-accent-50 text-accent-700',
}

/** Small pill label, e.g. for technologies or skill tags. */
export function Badge({ variant = 'neutral', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs leading-5 font-medium',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
