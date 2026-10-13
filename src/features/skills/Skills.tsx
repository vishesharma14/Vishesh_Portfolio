import { useSectionDescriptions, useSkills } from '../../content/index.ts'
import { Badge } from '../../components/ui/Badge.tsx'
import { Card } from '../../components/ui/Card.tsx'
import { cardGridClass, cardSpan } from '../../components/ui/cardGrid.ts'
import { Section } from '../../components/ui/Section.tsx'
import { SectionHeader } from '../../components/ui/SectionHeader.tsx'
import { cn } from '../../lib/cn.ts'

/**
 * The #skills section: one card per category, in content order, each listing its skills as
 * badges. Categories without skills are left out, and the section renders nothing until at
 * least one category has skills, so the page never shows an empty card or section.
 */
export function Skills() {
  const categories = useSkills().filter((category) => category.skills.length > 0)
  const { skills: description } = useSectionDescriptions()
  if (categories.length === 0) return null

  return (
    <Section id="skills" aria-labelledby="skills-title" className="border-t border-border">
      <SectionHeader titleId="skills-title" title="Skills" description={description} />
      <ul className={cn(cardGridClass, 'mt-10 sm:mt-12')}>
        {categories.map((category, index) => (
          <Card as="li" key={category.id} className={cardSpan(index, categories.length)}>
            <h3 className="text-heading text-fg">{category.label}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <li key={skill.name}>
                  {/* 14px rather than the badge default (12px): the skills are this section's content. */}
                  <Badge className="text-sm">{skill.name}</Badge>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </ul>
    </Section>
  )
}
