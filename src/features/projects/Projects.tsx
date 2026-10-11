import { useSectionDescriptions } from '../../content/index.ts'
import { Section } from '../../components/ui/Section.tsx'
import { SectionHeader } from '../../components/ui/SectionHeader.tsx'
import { ProjectCard } from './ProjectCard.tsx'
import { useFeaturedProjects } from './useFeaturedProjects.ts'

/**
 * The #projects section: the featured projects in content order, one wide card per row.
 * Renders nothing until a project is featured, so the page never shows an empty section.
 */
export function Projects() {
  const projects = useFeaturedProjects()
  const { projects: description } = useSectionDescriptions()
  if (projects.length === 0) return null

  return (
    <Section id="projects" aria-labelledby="projects-title" className="border-t border-border">
      <SectionHeader titleId="projects-title" title="Featured projects" description={description} />
      <ul className="mt-10 grid gap-6 sm:mt-12">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ul>
    </Section>
  )
}
