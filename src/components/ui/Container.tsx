import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn.ts'

export type ContainerSize = 'content' | 'narrow'

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  /** `content` for full layouts, `narrow` for reading-width text. */
  size?: ContainerSize | undefined
}

/** Centres content at a maximum width with responsive side padding. */
export function Container({ size = 'content', className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-gutter',
        size === 'narrow' ? 'max-w-narrow' : 'max-w-content',
        className,
      )}
      {...props}
    />
  )
}
