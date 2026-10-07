import type { ComponentPropsWithRef, HTMLAttributes } from 'react'
import { cn } from '../../lib/cn.ts'

const controlBase =
  'w-full rounded-xl border bg-surface px-4 text-[0.9375rem] text-fg shadow-xs transition-[border-color,box-shadow] duration-200 ease-smooth placeholder:text-fg-subtle focus-visible:outline-hidden focus-visible:ring-4 disabled:cursor-not-allowed disabled:bg-surface-muted disabled:opacity-70'

function controlState(invalid: boolean): string {
  return invalid
    ? 'border-danger-600 focus-visible:border-danger-600 focus-visible:ring-danger-600/15'
    : 'border-border-input hover:border-ink-500 focus-visible:border-accent-600 focus-visible:ring-accent-600/15'
}

interface ControlProps {
  /** Shows the error style and sets aria-invalid for assistive technology. */
  invalid?: boolean
}

type InputProps = ComponentPropsWithRef<'input'> & ControlProps

export function Input({ invalid = false, className, ...props }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(controlBase, 'h-11', controlState(invalid), className)}
      {...props}
    />
  )
}

type TextareaProps = ComponentPropsWithRef<'textarea'> & ControlProps

export function Textarea({ invalid = false, className, ...props }: TextareaProps) {
  return (
    <textarea
      aria-invalid={invalid || undefined}
      className={cn(
        controlBase,
        'min-h-32 resize-y py-3 leading-relaxed',
        controlState(invalid),
        className,
      )}
      {...props}
    />
  )
}

export function Label({ className, ...props }: ComponentPropsWithRef<'label'>) {
  return <label className={cn('block text-sm font-medium text-fg', className)} {...props} />
}

type FieldMessageProps = HTMLAttributes<HTMLParagraphElement> & {
  tone?: 'hint' | 'error'
}

/** Help or error text under a field. Link it to the control with aria-describedby. */
export function FieldMessage({ tone = 'hint', className, ...props }: FieldMessageProps) {
  return (
    <p
      className={cn('text-sm', tone === 'error' ? 'text-danger-700' : 'text-fg-subtle', className)}
      {...props}
    />
  )
}
