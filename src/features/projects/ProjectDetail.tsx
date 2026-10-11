import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { sectionHref } from '../../app/navigation.ts'
import type { Project } from '../../content/index.ts'
import { buttonStyles } from '../../components/ui/buttonStyles.ts'
import { Container } from '../../components/ui/Container.tsx'
import { ArrowLeftIcon } from '../../components/ui/icons.tsx'
import { ProjectLinks } from './ProjectLinks.tsx'
import { TechnologyList } from './TechnologyList.tsx'

/**
 * A project's page: title, summary and links, then the full description, key features and
 * technologies, all verbatim from the content. Parts without content are left out.
 */
export function ProjectDetail({ project }: { project: Project }) {
  return (
    <article aria-labelledby="project-title">
      <Container size="narrow" className="pt-8 pb-section sm:pt-12">
        <Link
          to={sectionHref('projects')}
          className={buttonStyles({
            variant: 'ghost',
            className: 'group -ml-1 gap-1.5 px-1 hover:bg-transparent',
          })}
        >
          <ArrowLeftIcon className="size-[1.125rem] transition-[translate] duration-200 ease-smooth motion-safe:group-hover:-translate-x-0.5" />
          Back to projects
        </Link>

        <header className="mt-6 sm:mt-8">
          <h1 id="project-title" className="text-title text-fg">
            {project.title}
          </h1>
          {project.summary ? <p className="mt-5 text-lead text-fg">{project.summary}</p> : null}
          <ProjectLinks project={project} className="mt-8" />
        </header>

        {project.description.length > 0 ? (
          <DetailSection title="Overview">
            <div className="space-y-5">
              {project.description.map((paragraph) => (
                <p key={paragraph} className="text-lead text-fg-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </DetailSection>
        ) : null}

        {project.keyFeatures.length > 0 ? (
          <DetailSection title="Key features">
            <ul className="space-y-3">
              {project.keyFeatures.map((feature) => (
                // The dot is centred on the first line (`lh`), so it lines up at any font size.
                <li
                  key={feature}
                  className="relative pl-6 text-fg-muted before:absolute before:top-[calc(0.5lh-3px)] before:left-1 before:size-1.5 before:rounded-full before:bg-accent-600"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </DetailSection>
        ) : null}

        {project.technologies.length > 0 ? (
          <DetailSection title="Technologies">
            <TechnologyList technologies={project.technologies} />
          </DetailSection>
        ) : null}
      </Container>
    </article>
  )
}

function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12 border-t border-border pt-10 sm:mt-14 sm:pt-12">
      <h2 className="text-heading text-fg">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}
