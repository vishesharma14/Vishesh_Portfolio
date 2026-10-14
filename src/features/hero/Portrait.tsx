import type { ReactNode } from 'react'
import type { ContentImage, Profile } from '../../content/index.ts'
import { cn } from '../../lib/cn.ts'

interface PortraitProps {
  profile: Profile
  className?: string
  /** Laid over the frame, e.g. a small card that the caller positions. */
  children?: ReactNode
}

/**
 * The owner's photo, or a neutral initials monogram until a real photo is added.
 * Both fill the same fixed-shape frame, so swapping one for the other never shifts the layout.
 * Made for the dark Hero band: a thin indigo ring around the frame, a dark indigo panel offset
 * behind it, and behind everything the site's one soft indigo light (bg-accent-glow).
 */
export function Portrait({ profile, className, children }: PortraitProps) {
  return (
    <div className={cn('relative w-24 sm:w-32 lg:w-full', className)}>
      {/* The light reaches no further than the Hero's own padding (py-10 / sm:py-14 / lg:py-16),
          so it fades out inside the band instead of being cut off at an edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 bg-accent-glow sm:-inset-8 lg:-inset-16"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl bg-accent-900 sm:translate-x-2.5 sm:translate-y-2.5 sm:rounded-3xl lg:translate-x-5 lg:translate-y-5 lg:rounded-[2rem]"
      />
      <div className="@container relative aspect-square overflow-hidden rounded-2xl bg-surface ring-1 ring-accent-400/60 sm:rounded-3xl lg:aspect-[4/5] lg:rounded-[2rem]">
        {profile.photo ? (
          // The photo is the largest element in the Hero (the LCP image): never lazy-load it.
          // width/height are the file's real pixel size; the frame's CSS sets the shown size and
          // object-cover crops it to the frame (centred, which keeps a centred headshot's face).
          <img
            src={profile.photo.src}
            srcSet={photoSrcSet(profile.photo)}
            sizes={profile.photo.variants ? photoSizes(profile.photo) : undefined}
            alt={profile.photo.alt}
            width={profile.photo.width}
            height={profile.photo.height}
            loading="eager"
            fetchPriority="high"
            className="size-full object-cover"
          />
        ) : (
          // Decorative: the name is already the page heading.
          <div aria-hidden="true" className="grid size-full place-items-center bg-accent-wash">
            <span className="text-accent-gradient text-[length:36cqi] leading-none font-semibold tracking-tight select-none">
              {profile.initials}
            </span>
          </div>
        )}
      </div>
      {children}
    </div>
  )
}

/** The photo and its smaller copies as a srcset, or nothing when there are no copies. */
function photoSrcSet({ src, width, variants }: ContentImage): string | undefined {
  if (!variants) return undefined
  return [...variants, { src, width }]
    .map((image) => `${image.src} ${String(image.width)}w`)
    .join(', ')
}

/**
 * How wide the photo is drawn at each breakpoint, for `sizes`: in a 96px square, a 128px square
 * from sm, and the 448×560 frame (the 28rem column at 4:5) from lg. Keep these in step with the
 * frame's classes above and the Hero's grid. object-cover fills the frame, so a photo wider than
 * the frame is drawn wider than the frame: max(frame width, frame height × the photo's aspect).
 */
function photoSizes({ width, height }: ContentImage): string {
  const drawn = (frameWidth: number, frameHeight: number) =>
    `${String(Math.ceil(Math.max(frameWidth, (frameHeight * width) / height)))}px`
  return `(min-width: 64rem) ${drawn(448, 560)}, (min-width: 40rem) ${drawn(128, 128)}, ${drawn(96, 96)}`
}
