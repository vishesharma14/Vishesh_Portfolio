import { useResume } from '../../content/index.ts'
import { buttonStyles } from '../../components/ui/buttonStyles.ts'
import { ArrowUpRightIcon, DownloadIcon } from '../../components/ui/icons.tsx'
import { Section } from '../../components/ui/Section.tsx'
import { SectionHeader } from '../../components/ui/SectionHeader.tsx'
import { cn } from '../../lib/cn.ts'

const updatedDate = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

/**
 * The #resume section: the résumé's first page as a preview, a View button (the PDF in a new
 * tab) and a Download button. Renders nothing until there is a résumé. Browsers that can't show
 * PDFs inside a page (e.g. Chrome on Android) get the buttons without the preview.
 */
export function Resume() {
  const resume = useResume()
  if (!resume) return null
  const updated = resume.updatedOn ? updatedDate.format(new Date(resume.updatedOn)) : null

  return (
    <Section id="resume" aria-labelledby="resume-title" className="border-t border-border">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeader titleId="resume-title" title="Résumé" />
          <p className="mt-4 text-fg-muted">{updated ? `PDF · Updated ${updated}` : 'PDF'}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={resume.file}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({ className: 'group' })}
            >
              View
              <span className="sr-only"> résumé (PDF, opens in a new tab)</span>
              <ArrowUpRightIcon className="-mr-1 size-[1.125rem] transition-[translate] duration-200 ease-smooth motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
            </a>
            <a
              href={resume.file}
              download={resume.downloadName}
              className={buttonStyles({ variant: 'secondary' })}
            >
              <DownloadIcon className="-ml-0.5 size-[1.125rem]" />
              Download
              <span className="sr-only"> résumé (PDF)</span>
            </a>
          </div>
        </div>
        {navigator.pdfViewerEnabled ? (
          <ResumePreview file={resume.file} className="lg:col-span-7" />
        ) : null}
      </div>
    </Section>
  )
}

/**
 * The first page in the browser's PDF viewer, fitted to the width, without its toolbar. A picture
 * rather than a second viewer: `inert` keeps it out of the tab order and away from screen readers
 * (View opens the whole document), and it never catches the page's scrolling.
 */
function ResumePreview({ file, className }: { file: string; className?: string }) {
  const src = file.includes('#') ? file : `${file}#toolbar=0&navpanes=0&view=FitH`

  return (
    <div
      inert
      className={cn(
        'relative aspect-[210/297] w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-surface shadow-card lg:ml-auto',
        className,
      )}
    >
      {/* 1rem larger than the frame on every side, so the frame crops the dark margin the PDF
          viewer draws around the page (about 10px in Chrome); only the page's white margin goes. */}
      <iframe
        src={src}
        title="Résumé preview"
        loading="lazy"
        className="pointer-events-none absolute -top-4 -left-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)]"
      />
    </div>
  )
}
