import {
  useAbout,
  useAiTopics,
  useContact,
  useEducation,
  useResume,
  useSkills,
  useSocialLinks,
} from '../content/index.ts'
import { hasContactActions } from '../features/contact/hasContactActions.ts'
import { useFeaturedProjects } from '../features/projects/useFeaturedProjects.ts'
import { sectionNav, type SectionId, type SectionNavItem } from './navigation.ts'

/**
 * Whether each section renders on the home page. These are the rules the section components use
 * to render nothing when their content is empty; when one changes, change it here too.
 */
export function useRenderedSections(): Record<SectionId, boolean> {
  const about = useAbout()
  const education = useEducation()
  const skills = useSkills()
  const featuredProjects = useFeaturedProjects()
  const aiTopics = useAiTopics()
  const resume = useResume()
  const contact = useContact()
  const socialLinks = useSocialLinks()

  return {
    home: true,
    about: about.paragraphs.length > 0,
    education: education.length > 0,
    skills: skills.some((category) => category.skills.length > 0),
    projects: featuredProjects.length > 0,
    ai: aiTopics.length > 0,
    // The GitHub Activity section arrives in Step 19.
    github: false,
    resume: resume !== undefined,
    contact: hasContactActions(contact, socialLinks),
  }
}

/**
 * The section links of the navbar, the mobile menu and the footer: only sections the home page
 * renders, so no link leads nowhere. They point at the home page (/#id), so they work on every page.
 */
export function useSectionNav(): SectionNavItem[] {
  const rendered = useRenderedSections()
  return sectionNav.filter((item) => rendered[item.id])
}
