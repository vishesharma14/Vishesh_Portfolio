import { Link } from 'react-router'
import { pageTitle } from '../app/site.ts'
import { buttonStyles } from '../components/ui/buttonStyles.ts'
import { Card } from '../components/ui/Card.tsx'

/**
 * PLACEHOLDER for /admin/* (roadmap Step 3). Structure only: no sign-in, no data access
 * and no admin actions. The real admin area, with authentication, comes in later steps.
 * Loaded as a separate bundle, so public visitors never download admin code.
 */
export function AdminPlaceholderPage() {
  return (
    <main id="main" className="grid min-h-svh place-items-center px-gutter py-16">
      <title>{pageTitle('Admin')}</title>
      <meta name="robots" content="noindex, nofollow" />
      <Card className="w-full max-w-md text-center">
        <p className="text-eyebrow text-accent-700 uppercase">Admin</p>
        <h1 className="mt-3 text-heading">Admin area not available yet</h1>
        <p className="mt-3 text-fg-muted">
          The private admin area hasn't been built yet. It will be added in a future update.
        </p>
        <Link to="/" className={buttonStyles({ variant: 'secondary', className: 'mt-6' })}>
          Back to the portfolio
        </Link>
      </Card>
    </main>
  )
}
