import { localContent } from './localContent.ts'
import type {
  About,
  AiTopic,
  Contact,
  EducationEntry,
  PortfolioContent,
  Profile,
  Project,
  Resume,
  SkillCategory,
  SocialLink,
} from './types.ts'

/**
 * The one place UI code gets portfolio content from.
 *
 * It currently returns the local content bundled with the site. When the source switches to
 * Supabase (Step 13), only this function changes, so the section hooks below and the
 * components that use them stay the same. They are hooks (not plain imports) so that switch
 * can load data without changing any call site.
 */
function useContent(): PortfolioContent {
  return localContent
}

export function useProfile(): Profile {
  return useContent().profile
}

export function useAbout(): About {
  return useContent().about
}

export function useEducation(): EducationEntry[] {
  return useContent().education
}

export function useSkills(): SkillCategory[] {
  return useContent().skills
}

export function useProjects(): Project[] {
  return useContent().projects
}

export function useAiTopics(): AiTopic[] {
  return useContent().aiTopics
}

export function useSocialLinks(): SocialLink[] {
  return useContent().socialLinks
}

/** `undefined` until a resume PDF is added; the Resume section must handle that. */
export function useResume(): Resume | undefined {
  return useContent().resume
}

export function useContact(): Contact {
  return useContent().contact
}
