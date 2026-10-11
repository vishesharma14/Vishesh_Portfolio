import { useProjects, type Project } from '../../content/index.ts'

/**
 * The featured projects, in content order: the ones the Featured Projects section lists, and the
 * only ones with a project page (/projects/:slug).
 */
export function useFeaturedProjects(): Project[] {
  return useProjects().filter((project) => project.featured)
}
