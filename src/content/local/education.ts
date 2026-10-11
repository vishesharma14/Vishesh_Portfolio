import type { EducationEntry } from '../types.ts'

// Verified: provided by the owner (2026-10-10). Keep the wording exactly as given.
// The B.Tech short forms ("B.Tech CSE", "SRM IST") are the owner's, from the Hero brief (2026-10-11).
// Order = display order: newest first. There is no separate "school" entry; the school appears
// in the Class X and Class XII entries.
export const education: EducationEntry[] = [
  {
    id: 'btech-cse',
    level: 'btech',
    qualification: 'Bachelor of Technology in Computer Science and Engineering',
    institution: 'SRM Institute of Science and Technology, Delhi-NCR Campus',
    shortQualification: 'B.Tech CSE',
    shortInstitution: 'SRM IST',
    location: 'Modinagar, Uttar Pradesh',
    startDate: '2023',
    endDate: '2027',
    current: true,
    score: { kind: 'cgpa', value: 8.16, scale: 10 },
  },
  {
    id: 'class-xii',
    level: 'class-xii',
    qualification: 'Senior Secondary (Class XII), Science – PCM',
    institution: 'Meerut Public School',
    boardOrUniversity: 'CBSE',
    location: 'Meerut Cantt, Uttar Pradesh',
    endDate: '2023',
    score: { kind: 'percentage', value: 78.0 },
  },
  {
    id: 'class-x',
    level: 'class-x',
    qualification: 'Secondary (Class X)',
    institution: 'Meerut Public School',
    boardOrUniversity: 'CBSE',
    location: 'Meerut Cantt, Uttar Pradesh',
    endDate: '2021',
    score: { kind: 'percentage', value: 82.4 },
  },
]
