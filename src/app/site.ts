/** Site identity used by the shell (navbar, footer and page titles). */
export const site = {
  name: 'Vishesh Sharma',
  initials: 'VS',
} as const

/** Builds a document title such as "Page not found | Vishesh Sharma". */
export function pageTitle(title: string): string {
  return `${title} | ${site.name}`
}
