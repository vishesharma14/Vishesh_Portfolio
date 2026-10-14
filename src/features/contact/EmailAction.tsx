import { buttonStyles } from '../../components/ui/buttonStyles.ts'
import { MailIcon } from '../../components/ui/icons.tsx'
import { useCoarsePointer } from '../../hooks/useCoarsePointer.ts'
import { cn } from '../../lib/cn.ts'
import { gmailComposeHref, mailtoHref } from './emailLinks.ts'

interface EmailActionProps {
  email: string
  subject?: string | undefined
  /** Who the email goes to, as in "Email Vishesh". */
  name: string
}

/**
 * The Email button. On touch devices it is a mailto: link, so the phone's mail app opens straight
 * away. On desktop it opens Gmail's compose window in a new tab (EmailAddress then offers "Use
 * another email app"). Both fill in the subject. Until the browser has reported its pointer (e.g.
 * in prerendered HTML) it is the mailto: link, which works anywhere.
 */
export function EmailAction({ email, subject, name }: EmailActionProps) {
  const desktop = useCoarsePointer() === false

  return (
    <a
      href={desktop ? gmailComposeHref(email, subject) : mailtoHref(email, subject)}
      target={desktop ? '_blank' : undefined}
      rel={desktop ? 'noopener noreferrer' : undefined}
      className={buttonStyles({ tone: 'dark' })}
    >
      <MailIcon className="-ml-0.5 size-[1.125rem]" />
      Email {name}
      {desktop ? <span className="sr-only"> (opens Gmail in a new tab)</span> : null}
    </a>
  )
}

interface EmailAddressProps {
  email: string
  subject?: string | undefined
  className?: string
}

/**
 * The address as plain text that can be seen and selected (one click selects all of it). On
 * desktop, where the Email button opens Gmail, "Use another email app" (mailto:) follows it for
 * Outlook or Apple Mail users; the two wrap onto separate lines on narrow screens.
 */
export function EmailAddress({ email, subject, className }: EmailAddressProps) {
  const desktop = useCoarsePointer() === false

  return (
    <p
      className={cn(
        'flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[0.9375rem] text-ink-300',
        className,
      )}
    >
      <span className="font-medium text-ink-200 select-all">{email}</span>
      {desktop ? (
        <>
          <span aria-hidden="true" className="hidden text-ink-400 sm:inline">
            ·
          </span>
          <a
            href={mailtoHref(email, subject)}
            className="rounded-sm px-1 py-1 underline decoration-white/30 underline-offset-4 transition-colors duration-200 ease-smooth hover:text-white hover:decoration-white"
          >
            Use another email app
          </a>
        </>
      ) : null}
    </p>
  )
}
