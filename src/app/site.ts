/**
 * Site identity used by the shell (navbar, footer and page titles) and by the page metadata: the
 * <head> of index.html (vite.config.ts writes these values into it) and each page's PageMetadata.
 */
export const site = {
  name: 'Vishesh Sharma',
  initials: 'VS',
  /** The home page's title: browser tab, search results and link previews. */
  title: 'Vishesh Sharma · Machine Learning, Data Science & Generative AI',
  /** The home page's description: search results and link previews. */
  description:
    'Vishesh Sharma builds explainable machine-learning models and data products: fraud detection with XGBoost and SHAP, on-device computer vision and analytics.',
  /**
   * The live site's origin (no trailing slash). Every absolute URL is built from it: the canonical
   * links, og:url, the link-preview image and sitemap.xml. robots.txt names the sitemap's URL too.
   */
  url: 'https://vishesh-sharma.vercel.app',
  /** Colour of the browser's own bars on phones (theme-color): night-950, the Hero band. */
  themeColor: '#0b1020',
  /** The link-preview image in public/, made by `npm run images` (scripts/generate-images.ts). */
  socialImage: {
    path: '/social-preview.png',
    width: 1200,
    height: 630,
    alt: 'Vishesh Sharma, Machine Learning · Data Science · Generative AI, beside a photo of Vishesh Sharma',
  },
} as const

/** Builds a document title such as "Page not found · Vishesh Sharma". */
export function pageTitle(title: string): string {
  return `${title} · ${site.name}`
}
