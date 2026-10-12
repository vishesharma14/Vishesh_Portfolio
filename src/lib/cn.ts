import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// tailwind-merge only knows Tailwind's default theme. Registering the custom tokens
// from globals.css stops it treating e.g. `text-title` (a font size) and `text-fg`
// (a colour) as the same kind of class and silently dropping one of them.
// Colours (canvas, ink-*, accent-*, night-*) need no entry: any colour name counts as a colour.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['display', 'title', 'heading', 'lead', 'eyebrow'],
      shadow: ['card', 'card-hover', 'accent'],
      spacing: ['section', 'gutter', 'header'],
      container: ['content', 'narrow'],
      ease: ['smooth'],
      animate: ['rise', 'nudge'],
    },
    classGroups: {
      // The background-image utilities from globals.css. Unregistered, they would pass for
      // background colours, and e.g. `bg-night-950 bg-accent-glow` would lose one of the two.
      'bg-image': [{ bg: ['accent-wash', 'dot-grid', 'accent-glow'] }],
    },
  },
})

/** Joins class names conditionally and resolves conflicting Tailwind utilities (last one wins). */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
