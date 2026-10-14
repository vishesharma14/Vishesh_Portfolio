import { Link } from 'react-router'
import { pageTitle } from '../app/site.ts'
import { PageMetadata } from '../components/layout/PageMetadata.tsx'
import { buttonStyles } from '../components/ui/buttonStyles.ts'
import { Container } from '../components/ui/Container.tsx'
import { SectionHeader } from '../components/ui/SectionHeader.tsx'

export function NotFoundPage() {
  return (
    <section aria-labelledby="not-found-title">
      <PageMetadata title={pageTitle('Page not found')} noindex />
      <Container
        size="narrow"
        className="flex min-h-[calc(100svh-var(--spacing-header))] flex-col items-center justify-center py-section text-center"
      >
        <SectionHeader
          as="h1"
          titleId="not-found-title"
          align="center"
          eyebrow="Error 404"
          title="Page not found"
          description="The page you're looking for doesn't exist or may have moved."
        />
        <Link to="/" className={buttonStyles({ className: 'mt-8' })}>
          Back to home
        </Link>
      </Container>
    </section>
  )
}
