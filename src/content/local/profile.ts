import type { Profile } from '../types.ts'

// Verified: the owner's name (already used across the site), the headline the owner chose, and
// the owner's own photo (public/images/profile.webp, added by the owner; 1327×1185 pixels).
// Only ever the owner's real photo here: never a stock or generated image.
// TODO(content): optionally add `location`.
export const profile: Profile = {
  fullName: 'Vishesh Sharma',
  initials: 'VS',
  headline: 'AI / GenAI, ML & Data Analytics Developer',
  photo: { src: '/images/profile.webp', alt: 'Vishesh Sharma', width: 1327, height: 1185 },
}
