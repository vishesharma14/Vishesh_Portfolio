import { useParams } from 'react-router'
import { ProjectDetail } from '../features/projects/ProjectDetail.tsx'
import { useFeaturedProjects } from '../features/projects/useFeaturedProjects.ts'
import { NotFoundPage } from './NotFoundPage.tsx'

/**
 * /projects/:slug, a featured project's own page. Only the projects listed in the Featured
 * Projects section have one: an unknown slug, or a project that isn't featured, shows the 404 page.
 */
export function ProjectPage() {
  const { slug } = useParams()
  const project = useFeaturedProjects().find((item) => item.slug === slug)

  return project ? <ProjectDetail project={project} /> : <NotFoundPage />
}
