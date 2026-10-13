import { Link } from 'react-router'
import { projectHref } from '../../app/navigation.ts'
import type { Project } from '../../content/index.ts'
import { buttonStyles } from '../../components/ui/buttonStyles.ts'
import { Card } from '../../components/ui/Card.tsx'
import { ArrowRightIcon } from '../../components/ui/icons.tsx'
import { ProjectLinks } from './ProjectLinks.tsx'
import { TechnologyList } from './TechnologyList.tsx'

/**
 * One project in the Featured Projects list: title, summary and tech stack, then its links.
 * The card itself isn't a link because it holds several; "View details" opens the project page.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card as="li">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h3 className="text-heading text-fg">{project.title}</h3>
          {project.summary ? <p className="mt-3 text-fg-muted">{project.summary}</p> : null}
        </div>
        {project.technologies.length > 0 ? (
          <div className="lg:col-span-5">
            {/* Screen readers get the list's own label: Chrome would read this one in capitals. */}
            <p aria-hidden="true" className="text-eyebrow text-fg-subtle uppercase">
              Tech stack
            </p>
            <TechnologyList
              technologies={project.technologies}
              aria-label="Tech stack"
              className="mt-3"
            />
          </div>
        ) : null}
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-start sm:justify-between">
        <ProjectLinks project={project} />
        <Link
          to={projectHref(project.slug)}
          className={buttonStyles({
            variant: 'ghost',
            className:
              'group gap-1.5 self-start px-1 text-accent-700 hover:bg-transparent hover:text-accent-800',
          })}
        >
          View details<span className="sr-only"> about {project.title}</span>
          <ArrowRightIcon className="size-[1.125rem] transition-[translate] duration-200 ease-smooth motion-safe:group-hover:translate-x-0.5" />
        </Link>
      </div>
    </Card>
  )
}
