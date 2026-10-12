/**
 * Colours of a section link in the navbar or the mobile menu, light and dark (`navbar-dark:`,
 * while the Hero band is under the navbar). On the dark navbar the current section is a white
 * label on an indigo pill and the others are muted grey (at least 7:1 on night).
 */
export function navLinkColors(active: boolean): string {
  return active
    ? 'bg-accent-50 text-accent-700 navbar-dark:bg-accent-500/25 navbar-dark:text-white'
    : 'text-fg-muted hover:bg-ink-100 hover:text-fg navbar-dark:text-ink-400 navbar-dark:hover:bg-white/10 navbar-dark:hover:text-white'
}
