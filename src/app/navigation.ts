/**
 * In-page sections of the one-page portfolio, in page order.
 * Each id is the `id` of a section element on the home page. Sections are added in later
 * steps; a link whose section doesn't exist yet simply lands on the top of the home page.
 */
export const sectionNav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'ai', label: 'AI / GenAI' },
  { id: 'github', label: 'GitHub' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionNavItem = (typeof sectionNav)[number]
export type SectionId = SectionNavItem['id']

export const sectionIds: readonly SectionId[] = sectionNav.map((item) => item.id)

/** Link target for a section. Always points at the home page, so it works from any route. */
export function sectionHref(id: SectionId): string {
  return `/#${id}`
}

/** Link to a project's detail page (route `projects/:slug` in router.ts). */
export function projectHref(slug: string): string {
  return `/projects/${slug}`
}
