import type { ComponentPropsWithRef } from 'react'
import { buttonStyles, type ButtonSize, type ButtonVariant } from './buttonStyles.ts'

interface ButtonLookProps {
  variant?: ButtonVariant
  size?: ButtonSize
}

type ButtonProps = ComponentPropsWithRef<'button'> & ButtonLookProps

/** A button for actions. Defaults to type="button" so it never submits a form by accident. */
export function Button({ variant, size, className, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...props} />
}

type ButtonLinkProps = ComponentPropsWithRef<'a'> & ButtonLookProps & { href: string }

/** A link that looks like a button, for navigation (to a section, page or file). */
export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <a className={buttonStyles({ variant, size, className })} {...props} />
}
