import type { EducationEntry, EducationScore } from '../../content/index.ts'

const monthName = new Intl.DateTimeFormat('en', { month: 'short', timeZone: 'UTC' })
// Scores keep at least one decimal ("78.0%"), as written on mark sheets; scales don't ("/ 10").
const scoreNumber = new Intl.NumberFormat('en', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 2,
})
const scaleNumber = new Intl.NumberFormat('en', { maximumFractionDigits: 2 })

/** "2024" → "2024", "2024-07" → "Jul 2024". */
export function formatYearMonth(value: string): string {
  const [year = value, month] = value.split('-')
  if (month === undefined) return year
  return `${monthName.format(new Date(Date.UTC(Number(year), Number(month) - 1, 1)))} ${year}`
}

/**
 * The date line for an education entry, e.g. "2023 – 2027 (expected)" for a current entry,
 * "2019 – 2021", or just "2023". Returns null when the entry has no dates and isn't current.
 */
export function formatDateRange({
  startDate,
  endDate,
  current,
}: Pick<EducationEntry, 'startDate' | 'endDate' | 'current'>): string | null {
  const start = startDate ? formatYearMonth(startDate) : null
  const end = endDate ? formatYearMonth(endDate) : null

  if (current) {
    if (start && end) return `${start} – ${end} (expected)`
    if (start) return `${start} – Present`
    if (end) return `Expected ${end}`
    return 'Present'
  }
  if (start && end) return start === end ? end : `${start} – ${end}`
  return end ?? start
}

/** A score number as on mark sheets: "8.16", "78.0". */
export function formatScoreValue(value: number): string {
  return scoreNumber.format(value)
}

/** A CGPA scale: "10". */
export function formatScoreScale(scale: number): string {
  return scaleNumber.format(scale)
}

/** Visible and spoken forms of a score: "CGPA 8.16 / 10" is read as "CGPA 8.16 out of 10". */
export function formatScore(score: EducationScore): { text: string; spoken: string } {
  if (score.kind === 'cgpa') {
    const value = formatScoreValue(score.value)
    const scale = formatScoreScale(score.scale)
    return { text: `CGPA ${value} / ${scale}`, spoken: `CGPA ${value} out of ${scale}` }
  }
  const percentage = `${formatScoreValue(score.value)}%`
  return { text: percentage, spoken: `Score ${percentage}` }
}
