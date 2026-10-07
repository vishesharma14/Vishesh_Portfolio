import { Badge } from './components/ui/Badge.tsx'
import { Button, ButtonLink } from './components/ui/Button.tsx'
import { Card } from './components/ui/Card.tsx'
import { FieldMessage, Input, Label, Textarea } from './components/ui/FormControls.tsx'
import { Section } from './components/ui/Section.tsx'
import { SectionHeader } from './components/ui/SectionHeader.tsx'
import { SkipLink } from './components/ui/SkipLink.tsx'

// TEMPORARY design-foundation preview (roadmap Step 2).
// It only shows the tokens and base components with sample text, so they can be
// reviewed in the browser. Step 3 replaces this file with the real app shell.

const inkSwatches = [
  ['50', 'bg-ink-50'],
  ['100', 'bg-ink-100'],
  ['200', 'bg-ink-200'],
  ['300', 'bg-ink-300'],
  ['400', 'bg-ink-400'],
  ['500', 'bg-ink-500'],
  ['600', 'bg-ink-600'],
  ['700', 'bg-ink-700'],
  ['800', 'bg-ink-800'],
  ['900', 'bg-ink-900'],
  ['950', 'bg-ink-950'],
] as const

const accentSwatches = [
  ['50', 'bg-accent-50'],
  ['100', 'bg-accent-100'],
  ['200', 'bg-accent-200'],
  ['300', 'bg-accent-300'],
  ['400', 'bg-accent-400'],
  ['500', 'bg-accent-500'],
  ['600', 'bg-accent-600'],
  ['700', 'bg-accent-700'],
  ['800', 'bg-accent-800'],
  ['900', 'bg-accent-900'],
  ['950', 'bg-accent-950'],
] as const

function SwatchRow({
  name,
  swatches,
}: {
  name: string
  swatches: readonly (readonly [string, string])[]
}) {
  return (
    <div>
      <p className="text-sm font-medium text-fg">{name}</p>
      <ul className="mt-3 grid grid-cols-6 gap-2 sm:grid-cols-11">
        {swatches.map(([step, className]) => (
          <li key={step} className="space-y-1.5">
            <div className={`h-12 rounded-lg border border-ink-950/5 ${className}`} />
            <p className="text-xs text-fg-subtle">{step}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function App() {
  return (
    <>
      <SkipLink />
      <main id="main">
        <Section aria-labelledby="preview-title" className="bg-accent-wash">
          <SectionHeader
            as="h1"
            titleId="preview-title"
            eyebrow="Design foundation"
            title={
              <>
                Base components <span className="text-accent-gradient">preview</span>
              </>
            }
            description="A temporary page for reviewing colour, type and components. Sample text only. It is replaced by the real app shell in Step 3."
          />

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button>Primary action</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button size="sm" variant="secondary">
              Small
            </Button>
            <Button size="lg">Large</Button>
            <ButtonLink href="#cards" variant="secondary">
              Link styled as a button
            </ButtonLink>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>Neutral badge</Badge>
            <Badge variant="accent">Accent badge</Badge>
          </div>
        </Section>

        <Section aria-labelledby="type-title" className="border-t border-border">
          <SectionHeader
            titleId="type-title"
            eyebrow="Typography"
            title="Type scale"
            description="Inter Variable, self-hosted. Sizes scale smoothly between phone and desktop."
          />
          <div className="mt-10 space-y-6">
            <p className="text-display text-fg">Display sample</p>
            <p className="text-title text-fg">Title sample</p>
            <p className="text-heading text-fg">Heading sample</p>
            <p className="max-w-2xl text-lead text-fg-muted">
              Lead paragraph sample. Introductory text sits slightly larger than body copy, with
              generous line height for comfortable reading.
            </p>
            <p className="max-w-2xl text-fg-muted">
              Body text sample. Regular paragraphs use the muted ink colour on the off-white canvas,
              which keeps long passages calm while still meeting contrast guidelines.
            </p>
            <p className="text-sm text-fg-subtle">Small caption sample.</p>
          </div>
        </Section>

        <Section id="cards" aria-labelledby="cards-title" className="border-t border-border">
          <SectionHeader titleId="cards-title" eyebrow="Surfaces" title="Cards and form controls" />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card as="li">
              <h3 className="text-heading">Static card</h3>
              <p className="mt-2 text-fg-muted">White surface, hairline border, soft shadow.</p>
            </Card>
            <Card as="li" interactive>
              <h3 className="text-heading">Interactive card</h3>
              <p className="mt-2 text-fg-muted">Hover to see the lift and stronger shadow.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge>Sample tag</Badge>
                <Badge variant="accent">Sample tag</Badge>
              </div>
            </Card>
            <Card as="li" className="bg-surface-muted shadow-none">
              <h3 className="text-heading">Muted surface</h3>
              <p className="mt-2 text-fg-muted">For secondary panels inside a section.</p>
            </Card>
          </ul>

          <Card className="mt-6 max-w-xl">
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="sample-text">Text input</Label>
                <Input id="sample-text" placeholder="Placeholder text" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sample-invalid">Invalid input</Label>
                <Input
                  id="sample-invalid"
                  invalid
                  defaultValue="Invalid value"
                  aria-describedby="sample-invalid-message"
                />
                <FieldMessage id="sample-invalid-message" tone="error">
                  Sample error message.
                </FieldMessage>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sample-textarea">Textarea</Label>
                <Textarea id="sample-textarea" placeholder="Placeholder text" />
              </div>
            </div>
          </Card>
        </Section>

        <Section aria-labelledby="colour-title" className="border-t border-border">
          <SectionHeader
            titleId="colour-title"
            eyebrow="Colour"
            title="Palette"
            description="Navy-tinted neutrals and a single deep indigo accent."
          />
          <div className="mt-10 space-y-8">
            <SwatchRow name="Ink" swatches={inkSwatches} />
            <SwatchRow name="Accent" swatches={accentSwatches} />
          </div>
        </Section>
      </main>
    </>
  )
}
