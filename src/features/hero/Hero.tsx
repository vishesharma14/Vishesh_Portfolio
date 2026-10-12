import { Fragment, useRef } from 'react'
import { Link } from 'react-router'
import { sectionHref } from '../../app/navigation.ts'
import {
  useAbout,
  useEducation,
  useProfile,
  useResume,
  useSocialLinks,
  type SocialPlatform,
} from '../../content/index.ts'
import { buttonStyles } from '../../components/ui/buttonStyles.ts'
import { Container } from '../../components/ui/Container.tsx'
import {
  ArrowDownIcon,
  ArrowRightIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  LinkIcon,
} from '../../components/ui/icons.tsx'
import { useDarkBandUnderNavbar } from '../../hooks/useDarkBandUnderNavbar.ts'
import { cn } from '../../lib/cn.ts'
import { ChatbotEntry } from '../chatbot/ChatbotEntry.tsx'
import { CHATBOT_ENABLED } from '../chatbot/config.ts'
import { useFeaturedProjects } from '../projects/useFeaturedProjects.ts'
import { findCurrentEducation, heroFacts, studyLabel } from './facts.ts'
import { Portrait } from './Portrait.tsx'
import { QuickFacts } from './QuickFacts.tsx'
import { StudyCard } from './StudyCard.tsx'

const socialIcons: Record<SocialPlatform, typeof LinkIcon> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  other: LinkIcon,
}

interface HeroProps {
  /** Opens the chat panel. Supplied once the chatbot exists (Step 21); until then it's absent. */
  onOpenChat?: () => void
  /**
   * Whether the page has a #contact section. The Contact button renders only then, so it never
   * looks clickable without working. Pass it once that section exists (Step 10).
   */
  showContact?: boolean
}

/**
 * The #home section: availability, name, role line, intro, calls to action, quick facts and the
 * portrait, on a full-width dark band (night) with a faint white dot grid; every section below
 * stays light. The navbar turns dark while this band is under it. From lg the band fills the
 * first screen with its content centred and a scroll cue at the bottom; below that it takes its
 * natural height. Every action renders only when its target exists. Text and photo fade in on
 * load (motion-safe).
 */
export function Hero({ onOpenChat, showContact = false }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  useDarkBandUnderNavbar(sectionRef)
  const profile = useProfile()
  const resume = useResume()
  const socialLinks = useSocialLinks()
  const about = useAbout()
  const featuredProjects = useFeaturedProjects()
  const currentEducation = findCurrentEducation(useEducation())
  const facts = heroFacts(currentEducation, featuredProjects)
  // "View projects" needs the #projects section, which renders only with featured projects.
  const showProjects = featuredProjects.length > 0
  const hasActions = showProjects || showContact || resume !== undefined || socialLinks.length > 0

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-labelledby="hero-title"
      // overflow-x-clip: the light behind the portrait may reach past the screen edge.
      className="relative isolate overflow-x-clip bg-night-950 on-dark"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-dot-grid" />
      <Container className="grid items-center gap-8 py-10 sm:gap-10 sm:py-14 lg:min-h-[calc(100svh-var(--spacing-header))] lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:content-center lg:gap-16 lg:py-16">
        {/* A size container: the name (text-display) is sized to this column's width. */}
        <div className="@container motion-safe:animate-rise">
          {profile.availability ? (
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-ink-200 sm:mb-6 sm:text-sm">
              <span
                aria-hidden="true"
                className="size-2 shrink-0 rounded-full bg-success-400 ring-4 ring-success-400/20"
              />
              {profile.availability}
            </p>
          ) : null}
          <h1 id="hero-title" className="text-display text-white">
            {profile.fullName}
          </h1>
          {profile.headline ? <RoleLine text={profile.headline} className="mt-4 sm:mt-5" /> : null}
          {profile.intro ? (
            <p className="mt-4 max-w-[34rem] text-[1.0625rem] text-balance text-ink-300 sm:mt-5">
              {profile.intro}
            </p>
          ) : null}

          {hasActions ? (
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
              {showProjects ? (
                <Link
                  to={sectionHref('projects')}
                  className={buttonStyles({ tone: 'dark', className: 'group' })}
                >
                  View projects
                  <ArrowRightIcon className="-mr-1 size-[1.125rem] transition-[translate] duration-200 ease-smooth motion-safe:group-hover:translate-x-0.5" />
                </Link>
              ) : null}
              {showContact ? (
                <Link
                  to={sectionHref('contact')}
                  className={buttonStyles({ variant: 'secondary', tone: 'dark' })}
                >
                  Contact
                </Link>
              ) : null}
              {resume ? (
                <a
                  href={resume.file}
                  download={resume.downloadName}
                  className={buttonStyles({ variant: 'secondary', tone: 'dark' })}
                >
                  <DownloadIcon className="-ml-0.5 size-[1.125rem]" />
                  Download résumé
                  <span className="sr-only"> (PDF)</span>
                </a>
              ) : null}
              {socialLinks.length > 0 ? (
                <ul aria-label="Profiles" className="flex flex-wrap gap-3">
                  {socialLinks.map((link) => {
                    const PlatformIcon = socialIcons[link.platform]
                    return (
                      <li key={link.url}>
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
          ) : null}

          {CHATBOT_ENABLED && onOpenChat ? (
            <ChatbotEntry onOpen={onOpenChat} className="mt-8" />
          ) : null}

          <QuickFacts facts={facts} className="mt-8 sm:mt-10" />
        </div>

        <Portrait
          profile={profile}
          className="order-first [--rise-delay:80ms] motion-safe:animate-rise lg:order-none"
        >
          {currentEducation ? <StudyCard label={studyLabel(currentEducation)} /> : null}
        </Portrait>
      </Container>

      {about.paragraphs.length > 0 ? <ScrollCue /> : null}
    </section>
  )
}

/**
 * The headline as a role line in light indigo. Its "·" separators are shown in the accent, and
 * each item stays on one line ("Data Science" never splits); when the line wraps, it breaks after
 * a separator.
 */
function RoleLine({ text, className }: { text: string; className?: string }) {
  const items = text.split('·').map((item) => item.trim())

  return (
    <p className={cn('text-heading font-medium text-balance text-accent-200', className)}>
      {items.map((item, index) => (
        <Fragment key={`${String(index)}-${item}`}>
          {index > 0 ? ' ' : null}
          <span className="whitespace-nowrap">
            {item}
            {index < items.length - 1 ? (
              <>
                {' '}
                <span className="text-accent-400">·</span>
              </>
            ) : null}
          </span>
        </Fragment>
      ))}
    </p>
  )
}

/** "Scroll" with a down arrow at the bottom centre of the first screen, linking to #about. */
function ScrollCue() {
  return (
    <Link
      to={sectionHref('about')}
      className="absolute inset-x-0 bottom-3 mx-auto hidden min-h-11 w-max flex-col items-center justify-center gap-1 rounded-full px-4 py-1.5 text-xs font-medium tracking-[0.08em] text-ink-400 transition-colors duration-200 ease-smooth [--rise-delay:100ms] hover:text-white motion-safe:animate-rise lg:flex"
    >
      {/* Uppercase only on the visible word: Chrome passes text-transform on to screen readers. */}
      <span className="uppercase">Scroll</span>
      <span className="sr-only"> to About</span>
      <ArrowDownIcon className="size-4 motion-safe:animate-nudge" />
    </Link>
  )
}
