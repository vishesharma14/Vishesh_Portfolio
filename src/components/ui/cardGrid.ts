import { cn } from '../../lib/cn.ts'

// A grid of cards shared by sections such as Skills and AI / GenAI. cardSpan() is written for
// exactly these columns, so keep the two together.

/**
 * One column on phones, two from `sm`, three from `lg`. The `lg` grid has six tracks with every
 * card spanning two, so a last row of two cards can share the row in halves.
 */
export const cardGridClass = 'grid gap-6 sm:grid-cols-2 lg:grid-cols-6'

/**
 * Classes for the card at `index` of `count` cards in a cardGridClass grid, so the last row is
 * always full: a last card alone in its row spans the whole row (2- and 3-column layouts), and a
 * last row of two shares the 3-column row equally. Computed from the number of cards shown.
 */
export function cardSpan(index: number, count: number) {
  const fromEnd = count - index // 1 for the last card
  const leftOverInThree = count % 3
  return cn(
    count % 2 === 1 && fromEnd === 1 && 'sm:col-span-2',
    leftOverInThree === 1 && fromEnd === 1
      ? 'lg:col-span-6'
      : leftOverInThree === 2 && fromEnd <= 2
        ? 'lg:col-span-3'
        : 'lg:col-span-2',
  )
}
