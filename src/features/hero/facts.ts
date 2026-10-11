import type { EducationEntry, Project } from '../../content/index.ts'
import { formatScoreScale, formatScoreValue } from '../education/format.ts'

/** A quick fact in the Hero: a short value with a label, e.g. "8.16" over "CGPA". */
export interface HeroFact {
  value: string
  label: string
  /** Read after the value by screen readers only, e.g. " out of 10". */
  spokenSuffix?: string
}

/** The entry the owner is studying for now: the first one marked current (newest first). */
export function findCurrentEducation(education: EducationEntry[]): EducationEntry | undefined {
  return education.find((entry) => entry.current)
}

/**
 * The Hero's quick facts, all derived from content: the current CGPA, the expected graduation
 * year and the number of featured projects with a live demo. Facts without data are left out.
 */
export function heroFacts(
  current: EducationEntry | undefined,
  featuredProjects: Project[],
): HeroFact[] {
  const facts: HeroFact[] = []

  if (current?.score?.kind === 'cgpa') {
    facts.push({
      value: formatScoreValue(current.score.value),
      label: 'CGPA',
      spokenSuffix: ` out of ${formatScoreScale(current.score.scale)}`,
    })
  }

  const endYear = current?.endDate?.slice(0, 4)
  if (endYear) facts.push({ value: endYear, label: 'Graduating' })

  const live = featuredProjects.filter((project) => project.liveUrl !== undefined).length
  if (live > 0) {
    facts.push({ value: String(live), label: live === 1 ? 'Live project' : 'Live projects' })
  }

  return facts
}

/** "Qualification · institution" in their short forms when given, e.g. "B.Tech CSE · SRM IST". */
export function studyLabel(entry: EducationEntry): string {
  const qualification = entry.shortQualification ?? entry.qualification
  const institution = entry.shortInstitution ?? entry.institution
  return `${qualification} · ${institution}`
}
