import { cn } from '../../lib/cn.ts'

// Kept separate from Button.tsx so other link components (e.g. router links later)
// can share the exact same button look.

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'
/** The surface the button sits on: the light page, or the dark Hero band (night). */
export type ButtonTone = 'light' | 'dark'

export interface ButtonStyleOptions {
  variant?: ButtonVariant | undefined
  size?: ButtonSize | undefined
  tone?: ButtonTone | undefined
  className?: string | undefined
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap select-none transition-[background-color,border-color,color,box-shadow,scale] duration-200 ease-smooth motion-safe:active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50'

const variants: Record<ButtonTone, Record<ButtonVariant, string>> = {
  light: {
    primary: 'bg-accent-600 text-white shadow-accent hover:bg-accent-700',
    secondary:
      'border border-border bg-surface text-fg shadow-xs hover:border-border-strong hover:bg-ink-50',
    ghost: 'text-fg-muted hover:bg-ink-100 hover:text-fg',
  },
  // On night: white text on accent-500 (5.2:1) or darker on hover; no coloured shadow, which
  // would read as a glow; the secondary button is outlined (white border at 20%), not filled.
  dark: {
    primary: 'bg-accent-500 text-white hover:bg-accent-600',
    secondary: 'border border-white/20 text-white hover:border-white/30 hover:bg-white/10',
    ghost: 'text-ink-300 hover:bg-white/10 hover:text-white',
  },
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
  tone = 'light',
  className,
}: ButtonStyleOptions = {}): string {
  return cn(base, variants[tone][variant], sizes[size], className)
}
