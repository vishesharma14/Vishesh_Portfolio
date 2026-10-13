import { Link } from 'react-router'
import { projectHref } from '../../app/navigation.ts'
import type { AiTopic, Project } from '../../content/index.ts'
import { Card } from '../../components/ui/Card.tsx'
import {
  ArrowRightIcon,
  ChartScatterIcon,
  CpuIcon,
  MessagesIcon,
  ScanEyeIcon,
  SparkleIcon,
  TerminalIcon,
} from '../../components/ui/icons.tsx'
import { cn } from '../../lib/cn.ts'
import { TechnologyList } from '../projects/TechnologyList.tsx'

/** A line icon per topic id. Topics without an entry here get a generic chip icon. */
const topicIcons: Record<string, typeof SparkleIcon> = {
  'machine-learning': ChartScatterIcon,
  'computer-vision': ScanEyeIcon,
  llms: MessagesIcon,
  'generative-ai': SparkleIcon,
  'prompt-engineering': TerminalIcon,
}

interface AiTopicCardProps {
  topic: AiTopic
  /** The topic's projects that have a page, in the topic's order: one "Used in" link each. */
  projects: Project[]
  className?: string | undefined
}

/**
 * One AI / GenAI topic: icon, title, description and tools, then links to the project pages
 * where it is used. Parts without content are left out.
 */
export function AiTopicCard({ topic, projects, className }: AiTopicCardProps) {
  const Icon = topicIcons[topic.id] ?? CpuIcon

  return (
    <Card as="li" className={cn('flex flex-col', className)}>
      <span className="flex size-11 items-center justify-center rounded-xl border border-accent-100 bg-accent-50 text-accent-700">
        <Icon className="size-[1.375rem]" />
      </span>
      <h3 className="mt-5 text-heading text-fg">{topic.title}</h3>
      {topic.description ? <p className="mt-2 text-fg-muted">{topic.description}</p> : null}
      {topic.tools.length > 0 ? (
        <TechnologyList technologies={topic.tools} aria-label="Tools" className="mt-5" />
      ) : null}

      {projects.length > 0 ? (
        // mt-auto keeps the links at the bottom of the card, level across a row.
        <div className="mt-auto pt-6">
          <div className="border-t border-border pt-5">
            {/* Screen readers get the list's own label: Chrome would read this one in capitals. */}
            <p aria-hidden="true" className="text-eyebrow text-fg-subtle uppercase">
              Used in
            </p>
            <ul aria-label="Used in" className="mt-1">
              {projects.map((project) => (
                <li key={project.slug}>
                  {/* A 22px line height: a title that wraps onto two lines is exactly as tall as
                      the 44px touch target, so these links stay level across a row of cards. */}
                  <Link
                    to={projectHref(project.slug)}
                    className="group flex min-h-11 w-fit items-center rounded-md text-[0.9375rem]/[1.375rem] font-medium text-balance text-accent-700 transition-colors duration-200 ease-smooth hover:text-accent-800"
                  >
                    <TitleWithArrow title={project.title} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </Card>
  )
}

/** The title followed by an arrow that stays with its last word, so it never wraps onto a line alone. */
function TitleWithArrow({ title }: { title: string }) {
  const lastSpace = title.lastIndexOf(' ')
  return (
    <span>
      {title.slice(0, lastSpace + 1)}
      <span className="whitespace-nowrap">
        {title.slice(lastSpace + 1)}
        <ArrowRightIcon className="ml-1.5 inline-block size-[1.125rem] align-[-0.25em] transition-[translate] duration-200 ease-smooth motion-safe:group-hover:translate-x-0.5" />
      </span>
    </span>
  )
}
