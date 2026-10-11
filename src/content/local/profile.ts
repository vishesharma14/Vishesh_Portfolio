import type { Profile } from '../types.ts'

// Verified: the owner's name (already used across the site), the headline, availability note and
// intro the owner provided (2026-10-11), and the owner's own photo (public/images/profile.webp,
// added by the owner; 1327×1185 pixels). The Hero shows the headline's "·" separators in the accent.
// Only ever the owner's real photo here: never a stock or generated image.
// TODO(content): optionally add `location`.
export const profile: Profile = {
  fullName: 'Vishesh Sharma',
  initials: 'VS',
  headline: 'Machine Learning · Data Science · Generative AI',
  availability: 'Available for opportunities',
  intro:
    'I build explainable machine-learning models and data products end to end, from fraud detection with XGBoost and SHAP to on-device computer vision.',
  photo: { src: '/images/profile.webp', alt: 'Vishesh Sharma', width: 1327, height: 1185 },
}
