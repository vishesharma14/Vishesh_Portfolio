// Validates the local portfolio content against the content schemas.
// Runs in `npm run check` and before every production build, so invalid content (non-https
// links, empty text, impossible dates or scores, duplicate ids, ...) can never ship.
// It also lists content that is still missing. Gaps are reported, but don't fail the check.
import { z } from 'zod'
import { localContent } from '../src/content/localContent.ts'
import { portfolioContentSchema } from '../src/content/schema.ts'

const result = portfolioContentSchema.safeParse(localContent)

if (result.success) {
  const content = result.data
  const count = (missing: number, total: number, what: string) =>
    missing > 0 ? `${String(missing)} of ${String(total)} ${what}` : false

  const gaps = [
    !content.profile.headline && 'profile headline',
    !content.profile.photo && 'profile photo',
    content.about.paragraphs.length === 0 && 'About Me text',
    content.education.length === 0 && 'education entries',
    count(
      content.skills.filter((category) => category.skills.length === 0).length,
      content.skills.length,
      'skill categories have no skills',
    ),
    count(
      content.projects.filter(
        (project) =>
          !project.summary ||
          project.description.length === 0 ||
          project.technologies.length === 0 ||
          project.keyFeatures.length === 0,
      ).length,
      content.projects.length,
      'projects are missing a summary, description, technologies or key features',
    ),
    count(
      content.aiTopics.filter((topic) => !topic.description).length,
      content.aiTopics.length,
      'AI / GenAI topics have no description',
    ),
    !content.socialLinks.some((link) => link.platform === 'linkedin') && 'LinkedIn link',
    !content.resume && 'resume PDF',
    !content.contact.email && 'contact email',
  ].filter((gap) => typeof gap === 'string')

  console.log('Local content is valid.')
  if (gaps.length > 0) {
    console.log(`Content still to add (${String(gaps.length)}):`)
    for (const gap of gaps) console.log(`  - ${gap}`)
  }
} else {
  console.error(`Local content is invalid:\n${z.prettifyError(result.error)}`)
  process.exitCode = 1
}
