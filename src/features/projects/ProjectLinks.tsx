import { useId, type ComponentPropsWithoutRef } from 'react'
import type { Project } from '../../content/index.ts'
import { buttonStyles } from '../../components/ui/buttonStyles.ts'
import { ArrowUpRightIcon } from '../../components/ui/icons.tsx'

/** Whether a URL is a Streamlit Community Cloud app. Those apps sleep when nobody uses them. */
function isStreamlitApp(url: string): boolean {
  try {
    return new URL(url).hostname.endsWith('.streamlit.app')
  } catch {
    return false
  }
}

interface ProjectLinksProps {
  project: Project
  className?: string
}

/**
 * A project's external links (GitHub, live demo and the optional extra link) as buttons that open
 * in a new tab. Each link's accessible name includes the project title, e.g. "SizerAI on GitHub".
 * A live demo hosted on Streamlit gets a note that it may need a moment to wake up.
 */
export function ProjectLinks({ project, className }: ProjectLinksProps) {
  const hintId = useId()
  const { title, githubUrl, liveUrl, extraLink } = project
  if (!githubUrl && !liveUrl && !extraLink) return null
  const showWakeHint = liveUrl !== undefined && isStreamlitApp(liveUrl)

  return (
    <div className={className}>
      <ul className="flex flex-wrap gap-3">
        {githubUrl ? (
          <li>
            <ExternalButton href={githubUrl}>
              <span className="sr-only">{title} on </span>GitHub
            </ExternalButton>
          </li>
        ) : null}
        {liveUrl ? (
          <li>
            <ExternalButton href={liveUrl} aria-describedby={showWakeHint ? hintId : undefined}>
              Live demo<span className="sr-only"> of {title}</span>
            </ExternalButton>
          </li>
        ) : null}
        {extraLink ? (
          <li>
            <ExternalButton href={extraLink.url}>
              {extraLink.label}
              <span className="sr-only"> for {title}</span>
            </ExternalButton>
          </li>
        ) : null}
      </ul>
      {showWakeHint ? (
        <p id={hintId} className="mt-3 text-sm text-fg-subtle">
          Hosted on Streamlit, may take a moment to wake up
        </p>
      ) : null}
    </div>
  )
}

type ExternalButtonProps = ComponentPropsWithoutRef<'a'> & { href: string }

function ExternalButton({ children, ...props }: ExternalButtonProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={buttonStyles({ variant: 'secondary', className: 'group' })}
      {...props}
    >
      {children}
      <ArrowUpRightIcon className="-mr-1 size-[1.125rem] text-fg-subtle transition-[color,translate] duration-200 ease-smooth group-hover:text-fg motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
