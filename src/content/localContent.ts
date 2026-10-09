import { about } from './local/about.ts'
import { aiTopics } from './local/aiTopics.ts'
import { contact } from './local/contact.ts'
import { education } from './local/education.ts'
import { profile } from './local/profile.ts'
import { projects } from './local/projects.ts'
import { resume } from './local/resume.ts'
import { skills } from './local/skills.ts'
import { socialLinks } from './local/socialLinks.ts'
import type { PortfolioContent } from './types.ts'

/**
 * All local portfolio content in one object. Edit the files in ./local/.
 * Validated against the schemas by `npm run content:check`, which also runs before every build.
 */
export const localContent: PortfolioContent = {
  profile,
  about,
  education,
  skills,
  projects,
  aiTopics,
  socialLinks,
  resume,
  contact,
}
