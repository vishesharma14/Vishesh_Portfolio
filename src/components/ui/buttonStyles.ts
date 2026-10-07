import { cn } from '../../lib/cn.ts'

// Kept separate from Button.tsx so other link components (e.g. router links later)
// can share the exact same button look.

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonStyleOptions {
  variant?: ButtonVariant | undefined
  size?: ButtonSize | undefined
  className?: string | undefined
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap select-none transition-[background-color,border-color,color,box-shadow,scale] duration-200 ease-smooth motion-safe:active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent-600 text-white shadow-accent hover:bg-accent-700',
  secondary:
    'border border-border bg-surface text-fg shadow-xs hover:border-border-strong hover:bg-ink-50',
  ghost: 'text-fg-muted hover:bg-ink-100 hover:text-fg',
}

// md and lg are at least 44px tall, a comfortable touch target.
const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-12 px-7 text-base',
}

export function buttonStyles({
  variant = 'primary',
  size = 'md',
  className,
}: ButtonStyleOptions = {}): string {
  return cn(base, variants[variant], sizes[size], className)
}
