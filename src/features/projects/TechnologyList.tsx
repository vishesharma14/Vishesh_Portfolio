import type { HTMLAttributes } from 'react'
import { Badge } from '../../components/ui/Badge.tsx'
import { cn } from '../../lib/cn.ts'

type TechnologyListProps = HTMLAttributes<HTMLUListElement> & { technologies: string[] }

/** Every technology as a badge, in content order. Badges wrap; none are hidden. */
export function TechnologyList({ technologies, className, ...props }: TechnologyListProps) {
  return (
    <ul className={cn('flex flex-wrap gap-2', className)} {...props}>
      {technologies.map((technology) => (
        <li key={technology}>
          {/* 14px, the same as the Skills badges. */}
          <Badge className="text-sm">{technology}</Badge>
        </li>
      ))}
    </ul>
  )
}
