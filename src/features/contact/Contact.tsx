import { useRef } from 'react'
import {
  useContact,
  useProfile,
  useSectionDescriptions,
  useSectionTitles,
  useSocialLinks,
  type Contact as ContactDetails,
  type SocialLink,
  type SocialPlatform,
} from '../../content/index.ts'
import { buttonStyles } from '../../components/ui/buttonStyles.ts'
import { Container } from '../../components/ui/Container.tsx'
import { PhoneIcon } from '../../components/ui/icons.tsx'
import { socialIcons } from '../../components/ui/socialIcons.ts'
import { useDarkBandUnderNavbar } from '../../hooks/useDarkBandUnderNavbar.ts'
import { CopyEmailButton } from './CopyEmailButton.tsx'
import { EmailAction, EmailAddress } from './EmailAction.tsx'
import { hasContactActions } from './hasContactActions.ts'

/** LinkedIn before GitHub here: this section is where recruiters reach out. */
const profileOrder: Record<SocialPlatform, number> = { linkedin: 0, github: 1, other: 2 }

/**
 * The #contact section, the last before the footer: a full-width dark band like the Hero (night,
 * white dot grid, no glow), so the page starts and ends on the same note. Title, description and
 * the ways to reach the owner: email (Gmail or the mail app, see EmailAction, and a copy button),
 * phone when the owner shows it, and the profile links, with the address as plain text below
 * them. Renders nothing without any of them. No form until Step 18.
 */
export function Contact() {
  const contact = useContact()
  const socialLinks = useSocialLinks()
  if (!hasContactActions(contact, socialLinks)) return null

  return <ContactBand contact={contact} socialLinks={socialLinks} />
}

interface ContactBandProps {
  contact: ContactDetails
  socialLinks: SocialLink[]
}

// A component of its own so the band registers with the navbar when it mounts.
function ContactBand({ contact, socialLinks }: ContactBandProps) {
  const sectionRef = useRef<HTMLElement>(null)
  useDarkBandUnderNavbar(sectionRef)
  const { contact: title = 'Contact' } = useSectionTitles()
  const { contact: description } = useSectionDescriptions()
  // The owner's first name, as in "Email Vishesh".
  const { fullName } = useProfile()
  const firstName = fullName.split(' ')[0] ?? fullName
  const { email, emailSubject, phone } = contact
  const profiles = socialLinks.toSorted(
    (a, b) => profileOrder[a.platform] - profileOrder[b.platform],
  )

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate bg-night-950 on-dark"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-dot-grid" />
      {/* As tall as its content and padding, but at least the largest screen height minus the
          navbar and 12rem (less than the footer is ever tall), so the band can always scroll up
          under the navbar, which then turns dark. That floor matters on tall screens (tablets
          held upright, 1080p desktops); the content is centred within it. */}
      <Container className="flex min-h-[calc(100lvh-var(--spacing-header)-12rem)] flex-col items-center justify-center py-section text-center">
        <h2 id="contact-title" className="text-title text-white">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-xl text-lead text-balance text-ink-300 sm:mt-5">{description}</p>
        ) : null}

        {/* Phones: one full-width button per row. From sm: groups side by side, wrapping whole. */}
        <div className="mt-10 flex w-full max-w-sm flex-col gap-3 sm:mt-12 sm:w-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
          {email ? (
            <div className="flex flex-col gap-3 sm:flex-row">
              <EmailAction email={email} subject={emailSubject} name={firstName} />
              <CopyEmailButton email={email} />
            </div>
          ) : null}
          {phone ? (
            <a
              href={`tel:${phone.replace(/[^\d+]/g, '')}`}
              className={buttonStyles({ variant: 'secondary', tone: 'dark' })}
            >
              <PhoneIcon className="-ml-0.5 size-[1.125rem]" />
              <span className="sr-only">Call </span>
              {phone}
            </a>
          ) : null}
          {profiles.length > 0 ? (
            <ul aria-label="Profiles" className="flex flex-col gap-3 sm:flex-row">
              {profiles.map((link) => {
                const PlatformIcon = socialIcons[link.platform]
                return (
                  <li key={link.url} className="flex flex-col">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonStyles({ variant: 'secondary', tone: 'dark' })}
                    >
                      <PlatformIcon className="-ml-0.5 size-[1.125rem]" />
                      {link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          ) : null}
        </div>
        {email ? <EmailAddress email={email} subject={emailSubject} className="mt-5" /> : null}
      </Container>
    </section>
  )
}
