import type { Profile } from '../types.ts'

// Verified: the owner's name, already used across the site.
// TODO(content): add `headline` (one line under the name in the Hero) and, optionally, `location`.
// TODO(content): add `photo` once the real photo is in public/, e.g.
//   photo: { src: '/images/<file>.webp', alt: '<short description of the photo>' }
export const profile: Profile = {
  fullName: 'Vishesh Sharma',
  initials: 'VS',
}
