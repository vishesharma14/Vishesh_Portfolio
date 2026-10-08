import { Container } from '../components/ui/Container.tsx'
import { SectionHeader } from '../components/ui/SectionHeader.tsx'

// TEMPORARY (roadmap Step 3): a neutral "coming soon" placeholder so the shell has a #home
// section to navigate to. The Hero (Step 5) replaces it, and later steps add the sections
// listed in the navigation (#about, #education, ...) below it.
export function HomePage() {
  return (
    <section id="home" aria-labelledby="home-title" className="bg-accent-wash">
      <Container className="flex min-h-[calc(100svh-var(--spacing-header))] flex-col justify-center py-section">
        <SectionHeader
          as="h1"
          titleId="home-title"
          eyebrow="Under construction"
          title="Portfolio coming soon"
          description="This site is being built. Its sections will appear here as they are completed."
        />
      </Container>
    </section>
  )
}
