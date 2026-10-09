import type { EducationEntry } from '../types.ts'

// TODO(content): add one entry per qualification (school, Class X, Class XII, B.Tech), most
// recent first. Each needs `id`, `level`, `qualification` and `institution`; `boardOrUniversity`,
// `startDate`/`endDate` (YYYY or YYYY-MM), `current` and `score` (CGPA with its scale, or a
// percentage) are optional. Left empty because none of these details are verified yet.
export const education: EducationEntry[] = []
