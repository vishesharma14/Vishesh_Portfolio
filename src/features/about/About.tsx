import { useAbout } from '../../content/index.ts'
import { Section } from '../../components/ui/Section.tsx'
import { SectionHeader } from '../../components/ui/SectionHeader.tsx'
import { cn } from '../../lib/cn.ts'

/**
 * The #about section: heading on the left and the About Me text on the right (stacked on
 * phones). Renders nothing until there is text, so the page never shows an empty section.
 */
export function About() {
  const about = useAbout()
  if (about.paragraphs.length === 0) return null

  return (
    <Section id="about" aria-labelledby="about-title" className="border-t border-border">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
        <SectionHeader titleId="about-title" title="About me" className="lg:col-span-4" />
        <div className="space-y-6 lg:col-span-8">
          {about.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={cn('max-w-2xl text-lead', index === 0 ? 'text-fg' : 'text-fg-muted')}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Section>
  )
}
