import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn.ts'
import { Container, type ContainerSize } from './Container.tsx'

type SectionProps = HTMLAttributes<HTMLElement> & {
  /** Width of the inner container. */
  size?: ContainerSize
}

/**
 * A page section with consistent vertical rhythm and a centred container.
 * Give it `aria-labelledby` pointing at its heading so it shows up as a named region.
 */
export function Section({ size, className, children, ...props }: SectionProps) {
  return (
    <section className={cn('py-section', className)} {...props}>
      <Container size={size}>{children}</Container>
    </section>
  )
}
