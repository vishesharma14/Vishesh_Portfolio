import type { Profile } from '../../content/index.ts'
import { cn } from '../../lib/cn.ts'

interface PortraitProps {
  profile: Profile
  className?: string
}

/**
 * The owner's photo, or a neutral initials monogram until a real photo is added.
 * Both fill the same fixed-shape frame, so swapping one for the other never shifts the layout.
 */
export function Portrait({ profile, className }: PortraitProps) {
  return (
    <div className={cn('w-32 sm:w-40 lg:w-full', className)}>
      <div className="@container aspect-square overflow-hidden rounded-3xl border border-border bg-surface shadow-card lg:aspect-[4/5] lg:rounded-[2rem]">
        {profile.photo ? (
          // The photo is the largest element in the Hero (the LCP image): never lazy-load it.
          // width/height are the file's real pixel size; the frame's CSS sets the shown size and
          // object-cover crops it to the frame (centred, which keeps a centred headshot's face).
          <img
            src={profile.photo.src}
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
    </div>
  )
}
