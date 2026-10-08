import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// tailwind-merge only knows Tailwind's default theme. Registering the custom tokens
// from globals.css stops it treating e.g. `text-title` (a font size) and `text-fg`
// (a colour) as the same kind of class and silently dropping one of them.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['display', 'title', 'heading', 'lead', 'eyebrow'],
      shadow: ['card', 'card-hover', 'accent'],
      spacing: ['section', 'gutter', 'header'],
      container: ['content', 'narrow'],
      ease: ['smooth'],
    },
  },
})

/** Joins class names conditionally and resolves conflicting Tailwind utilities (last one wins). */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
