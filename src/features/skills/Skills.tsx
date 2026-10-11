import { useSectionDescriptions, useSkills } from '../../content/index.ts'
import { Badge } from '../../components/ui/Badge.tsx'
import { Card } from '../../components/ui/Card.tsx'
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
  const lastIndex = categories.length - 1

  return (
    <Section id="skills" aria-labelledby="skills-title" className="border-t border-border">
      <SectionHeader titleId="skills-title" title="Skills" description={description} />
      <ul className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <Card
            as="li"
            key={category.id}
            className={index === lastIndex ? lastCardSpan(categories.length) : undefined}
          >
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

/**
 * Lets the last card fill its row when it would otherwise sit alone in it: in the 2-column grid
 * when the number of cards is odd, in the 3-column grid when one card is left over.
 */
function lastCardSpan(count: number) {
  const aloneInTwo = count % 2 === 1
  const aloneInThree = count % 3 === 1
  return cn(
    aloneInTwo && 'sm:col-span-2',
    aloneInThree ? 'lg:col-span-3' : aloneInTwo && 'lg:col-span-1',
  )
}
