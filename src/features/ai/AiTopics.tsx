import { useAiTopics, useSectionDescriptions, type Project } from '../../content/index.ts'
import { cardGridClass, cardSpan } from '../../components/ui/cardGrid.ts'
import { Section } from '../../components/ui/Section.tsx'
import { SectionHeader } from '../../components/ui/SectionHeader.tsx'
import { cn } from '../../lib/cn.ts'
import { useFeaturedProjects } from '../projects/useFeaturedProjects.ts'
import { AiTopicCard } from './AiTopicCard.tsx'

/**
 * The #ai section: one card per AI / GenAI topic, in content order, in the same grid as Skills.
 * Renders nothing without topics, so the page never shows an empty section (the navbar's
 * AI / GenAI link then lands on the top of the page).
 */
export function AiTopics() {
  const topics = useAiTopics()
  const { ai: description } = useSectionDescriptions()
  const featuredProjects = useFeaturedProjects()
  if (topics.length === 0) return null

  return (
    <Section id="ai" aria-labelledby="ai-title" className="border-t border-border">
      <SectionHeader titleId="ai-title" title="AI / GenAI" description={description} />
      <ul className={cn(cardGridClass, 'mt-10 sm:mt-12')}>
        {topics.map((topic, index) => (
          <AiTopicCard
            key={topic.id}
            topic={topic}
            projects={withPage(topic.projects, featuredProjects)}
            className={cardSpan(index, topics.length)}
          />
        ))}
      </ul>
    </Section>
  )
}

/**
 * The projects behind the given slugs, in that order, keeping only those with a page (the
 * featured ones), so a "Used in" link never leads to the 404 page.
 */
function withPage(slugs: string[] | undefined, featuredProjects: Project[]): Project[] {
  return (slugs ?? []).flatMap(
    (slug) => featuredProjects.find((project) => project.slug === slug) ?? [],
  )
}
