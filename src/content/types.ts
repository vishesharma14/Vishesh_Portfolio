import type { z } from 'zod'
import type {
  aboutSchema,
  aiTopicSchema,
  contactSchema,
  educationEntrySchema,
  imageSchema,
  portfolioContentSchema,
  profileSchema,
  projectSchema,
  resumeSchema,
  skillCategorySchema,
  skillSchema,
  socialLinkSchema,
} from './schema.ts'

// Content types, inferred from the schemas so the two can never drift apart.
// These are type-only imports: the browser bundle doesn't include zod.

/** Named ContentImage (not Image) so it never shadows the browser's global `Image`. */
export type ContentImage = z.infer<typeof imageSchema>
export type Profile = z.infer<typeof profileSchema>
export type About = z.infer<typeof aboutSchema>
export type EducationEntry = z.infer<typeof educationEntrySchema>
export type EducationLevel = EducationEntry['level']
/** A CGPA (with its scale) or a percentage. */
export type EducationScore = NonNullable<EducationEntry['score']>
export type Skill = z.infer<typeof skillSchema>
export type SkillCategory = z.infer<typeof skillCategorySchema>
export type SkillCategoryId = SkillCategory['id']
export type Project = z.infer<typeof projectSchema>
export type AiTopic = z.infer<typeof aiTopicSchema>
export type SocialLink = z.infer<typeof socialLinkSchema>
export type SocialPlatform = SocialLink['platform']
export type Resume = z.infer<typeof resumeSchema>
export type Contact = z.infer<typeof contactSchema>
export type PortfolioContent = z.infer<typeof portfolioContentSchema>
