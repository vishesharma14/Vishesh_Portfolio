import { z } from 'zod'

// Schemas for all portfolio content: the single source of truth for its shape.
// - TypeScript types are inferred from them (types.ts).
// - Local content is validated against them before every build (scripts/check-content.ts).
// - Supabase data will be parsed with them when the content source switches (Step 13).
//
// Schemas only validate. They never change values (no defaults, trimming or coercion), so the
// inferred types describe the data exactly and typed local content needs no runtime parsing.

// ---- Primitives --------------------------------------------------------------

/** Non-empty text with no leading or trailing whitespace. */
const text = z
  .string()
  .min(1, 'Must not be empty')
  .refine((value) => value.trim() === value, 'Must not start or end with whitespace')

/** Lower-case words joined by hyphens, e.g. "olympic-analytics". */
const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lower-case words separated by hyphens')

/**
 * Absolute https URL. Rejects http:, javascript:, data: and every other scheme.
 * Whitespace is rejected on the raw string first: z.url() trims its input, which would
 * otherwise let " https://…" pass validation while the site used the untrimmed value.
 */
const httpsUrl = z
  .string()
  .regex(/^\S+$/, 'Must not contain spaces')
  .pipe(z.url({ protocol: /^https$/, error: 'Must be an https:// URL' }))

/**
 * A file served by this site from public/, e.g. "/images/profile.webp". Rejects "//host" and
 * backslashes, which browsers would turn into a link to another site.
 */
const sitePath = z
  .string()
  .regex(/^\/(?![/\\])[^\s\\]+$/, 'Must be a site path starting with "/" (no spaces or "\\")')

/** A year or year and month, e.g. "2024" or "2024-07". */
const yearMonth = z.string().regex(/^\d{4}(?:-(?:0[1-9]|1[0-2]))?$/, 'Use YYYY or YYYY-MM')

/** Compares two yearMonth values; a bare year matches any month of that year. */
function isOnOrBefore(start: string, end: string): boolean {
  const length = Math.min(start.length, end.length)
  return start.slice(0, length) <= end.slice(0, length)
}

/** The path part of a site path or URL, without any ?query or #fragment. */
function pathOf(value: string): string {
  if (URL.canParse(value)) return new URL(value).pathname
  return value.split(/[?#]/, 1)[0] ?? value
}

/** An array whose items must have unique keys (ids, slugs). */
function uniqueList<Item extends z.ZodType>(
  item: Item,
  key: (value: z.output<Item>) => string,
  what: string,
) {
  return z.array(item).superRefine((list, ctx) => {
    const seen = new Set<string>()
    list.forEach((value, index) => {
      const k = key(value)
      if (seen.has(k))
        ctx.addIssue({ code: 'custom', message: `Duplicate ${what} "${k}"`, path: [index] })
      seen.add(k)
    })
  })
}

/** Intrinsic pixel size of an image file. */
const pixels = z.number().int('Use whole pixels').positive()

export const imageSchema = z.object({
  src: z.union([sitePath, httpsUrl]),
  /** Describes the image for screen readers. Content images are informative, so it's required. */
  alt: text,
  /** The file's real size in pixels. Rendered as width/height so the browser reserves its shape. */
  width: pixels,
  height: pixels,
})

// ---- Profile and About ---------------------------------------------------------

export const profileSchema = z.object({
  fullName: text,
  /** One to three capital letters for the site monogram. */
  initials: z.string().regex(/^[A-Z]{1,3}$/, 'Use one to three capital letters'),
  /** One line under the name in the Hero, e.g. a role and focus. */
  headline: text.optional(),
  location: text.optional(),
  /** The owner's real photo. Never a generated or stock image. */
  photo: imageSchema.optional(),
})

export const aboutSchema = z.object({
  /** About Me text, one entry per paragraph. */
  paragraphs: z.array(text),
})

// ---- Education -------------------------------------------------------------------

export const educationLevels = ['school', 'class-x', 'class-xii', 'btech', 'other'] as const

const scoreSchema = z.discriminatedUnion('kind', [
  z
    .object({ kind: z.literal('cgpa'), value: z.number().positive(), scale: z.number().positive() })
    .refine((score) => score.value <= score.scale, {
      message: 'CGPA cannot be higher than its scale',
      path: ['value'],
    }),
  z.object({ kind: z.literal('percentage'), value: z.number().min(0).max(100) }),
])

export const educationEntrySchema = z
  .object({
    id: slug,
    level: z.enum(educationLevels),
    /** e.g. "Class XII" or "B.Tech in <branch>". */
    qualification: text,
    institution: text,
    /** Exam board (Class X/XII) or the university that awards the degree. */
    boardOrUniversity: text.optional(),
    location: text.optional(),
    startDate: yearMonth.optional(),
    /** End date, or the expected end date while `current` is true. */
    endDate: yearMonth.optional(),
    /** Still studying here. */
    current: z.boolean().optional(),
    score: scoreSchema.optional(),
  })
  .refine(
    (entry) => !entry.startDate || !entry.endDate || isOnOrBefore(entry.startDate, entry.endDate),
    { message: 'End date is before the start date', path: ['endDate'] },
  )

// ---- Skills ------------------------------------------------------------------------

export const skillCategoryIds = [
  'programming',
  'data-analytics',
  'ai-ml',
  'genai',
  'web-development',
  'databases',
  'tools',
] as const

export const skillSchema = z.object({ name: text })

export const skillCategorySchema = z.object({
  id: z.enum(skillCategoryIds),
  label: text,
  skills: uniqueList(skillSchema, (skill) => skill.name.toLowerCase(), 'skill'),
})

// ---- Projects ----------------------------------------------------------------------

export const projectSchema = z.object({
  slug,
  title: text,
  /** One or two sentences for the project card. */
  summary: text.optional(),
  /** Longer description for the detail view, one entry per paragraph. */
  description: z.array(text),
  technologies: z.array(text),
  keyFeatures: z.array(text),
  githubUrl: httpsUrl.optional(),
  liveUrl: httpsUrl.optional(),
  image: imageSchema.optional(),
  featured: z.boolean(),
})

// ---- AI / GenAI --------------------------------------------------------------------

export const aiTopicSchema = z.object({
  id: slug,
  title: text,
  description: text.optional(),
  /** Tools or libraries used for this topic. */
  tools: z.array(text),
})

// ---- Social links, resume and contact ------------------------------------------------

export const socialPlatforms = ['github', 'linkedin', 'other'] as const

/** Whether a hostname belongs to the platform. LinkedIn uses country subdomains (in., uk., www.). */
const isPlatformHost: Record<'github' | 'linkedin', (hostname: string) => boolean> = {
  github: (hostname) => hostname === 'github.com',
  linkedin: (hostname) => hostname === 'linkedin.com' || hostname.endsWith('.linkedin.com'),
}

export const socialLinkSchema = z
  .object({
    platform: z.enum(socialPlatforms),
    /** Visible link text, e.g. "GitHub". */
    label: text,
    url: httpsUrl,
  })
  .refine(
    (link) =>
      link.platform === 'other' ||
      !URL.canParse(link.url) ||
      isPlatformHost[link.platform](new URL(link.url).hostname),
    { message: 'URL does not belong to the selected platform', path: ['url'] },
  )

export const resumeSchema = z.object({
  /** The resume PDF: a site path in public/ for now, a Storage URL later. */
  file: z
    .union([sitePath, httpsUrl])
    .refine((value) => pathOf(value).toLowerCase().endsWith('.pdf'), 'Must be a PDF'),
  /** File name used for downloads, e.g. "<Name>-Resume.pdf". */
  downloadName: z.string().regex(/^[\w.-]+\.pdf$/i, 'Use a simple file name ending in .pdf'),
  /** Date the resume was last updated (YYYY-MM-DD). */
  updatedOn: z.iso.date().optional(),
})

export const contactSchema = z.object({
  email: z.email().optional(),
  /** Public phone number. Leave it unset to keep the phone off the site (the default). */
  phone: z
    .string()
    .regex(/^\+?[0-9(][0-9 ()-]{6,18}[0-9]$/, 'Use digits, spaces, brackets or hyphens')
    .optional(),
})

// ---- Everything together ---------------------------------------------------------------

export const portfolioContentSchema = z.object({
  profile: profileSchema,
  about: aboutSchema,
  education: uniqueList(educationEntrySchema, (entry) => entry.id, 'education id'),
  skills: uniqueList(skillCategorySchema, (category) => category.id, 'skill category'),
  projects: uniqueList(projectSchema, (project) => project.slug, 'project slug'),
  aiTopics: uniqueList(aiTopicSchema, (topic) => topic.id, 'AI topic id'),
  socialLinks: uniqueList(socialLinkSchema, (link) => link.url, 'social link'),
  resume: resumeSchema.optional(),
  contact: contactSchema,
})
