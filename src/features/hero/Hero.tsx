import { Link } from 'react-router'
import { sectionHref } from '../../app/navigation.ts'
import { useProfile, useResume, useSocialLinks, type SocialPlatform } from '../../content/index.ts'
import { buttonStyles } from '../../components/ui/buttonStyles.ts'
import { Container } from '../../components/ui/Container.tsx'
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  GitHubIcon,
  LinkedInIcon,
  LinkIcon,
} from '../../components/ui/icons.tsx'
import { ChatbotEntry } from '../chatbot/ChatbotEntry.tsx'
import { CHATBOT_ENABLED } from '../chatbot/config.ts'
import { Portrait } from './Portrait.tsx'

const socialIcons: Record<SocialPlatform, typeof LinkIcon> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  other: LinkIcon,
}

interface HeroProps {
  /** Opens the chat panel. Supplied once the chatbot exists (Step 21); until then it's absent. */
  onOpenChat?: () => void
}

/** The #home section: name, headline, calls to action, profile links and portrait. */
export function Hero({ onOpenChat }: HeroProps) {
  const profile = useProfile()
  const resume = useResume()
  const socialLinks = useSocialLinks()

  return (
    <section id="home" aria-labelledby="hero-title" className="bg-accent-wash">
      <Container className="grid min-h-[calc(100svh-var(--spacing-header))] content-center items-center gap-10 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
        <div>
          <h1 id="hero-title" className="text-display text-fg">
            {profile.fullName}
          </h1>
          {profile.headline ? (
            <p className="mt-4 max-w-xl text-heading font-medium text-fg-muted sm:mt-5">
              {profile.headline}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
            <Link
              to={sectionHref('projects')}
              className={buttonStyles({ size: 'lg', className: 'group' })}
            >
              View projects
              <ArrowRightIcon className="-mr-1 size-[1.125rem] transition-[translate] duration-200 ease-smooth motion-safe:group-hover:translate-x-0.5" />
            </Link>
            <Link
              to={sectionHref('contact')}
              className={buttonStyles({ variant: 'secondary', size: 'lg' })}
            >
              Contact
            </Link>
            {resume ? (
              // A text-style link (no side padding), so it lines up with the buttons when it
              // wraps onto its own line on phones. It keeps the full 48px tap height.
              <a
                href={resume.file}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles({
                  variant: 'ghost',
                  size: 'lg',
                  className: 'group gap-1.5 px-1 hover:bg-transparent',
                })}
              >
                Resume
                <ArrowUpRightIcon className="size-[1.125rem] text-fg-subtle transition-[color,translate] duration-200 ease-smooth group-hover:text-accent-700 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </a>
            ) : null}
          </div>

          {CHATBOT_ENABLED && onOpenChat ? (
            <ChatbotEntry onOpen={onOpenChat} className="mt-8" />
          ) : null}

          {socialLinks.length > 0 ? (
            <ul aria-label="Profiles" className="mt-8 flex flex-wrap gap-2">
              {socialLinks.map((link) => {
                const PlatformIcon = socialIcons[link.platform]
                return (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface/80 px-4 text-sm font-medium text-fg-muted transition-colors duration-200 ease-smooth hover:border-border-strong hover:text-fg"
                    >
                      <PlatformIcon className="size-[1.125rem]" />
                      {link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          ) : null}
        </div>

        <Portrait profile={profile} className="order-first lg:order-none" />
      </Container>
    </section>
  )
}
