// Public API of the content module. UI code imports content hooks and types from here only,
// never from ./local/ or ./localContent.ts, so the content source can change in one place.

export {
  useAbout,
  useAiTopics,
  useContact,
  useEducation,
  useProfile,
  useProjects,
  useResume,
  useSectionDescriptions,
  useSectionTitles,
  useSkills,
  useSocialLinks,
} from './hooks.ts'

export type {
  About,
  AiTopic,
  Contact,
  ContentImage,
  EducationEntry,
  EducationLevel,
  EducationScore,
  PortfolioContent,
  Profile,
  Project,
  Resume,
  SectionDescriptions,
  SectionTitles,
  Skill,
  SkillCategory,
  SkillCategoryId,
  SocialLink,
  SocialPlatform,
} from './types.ts'
