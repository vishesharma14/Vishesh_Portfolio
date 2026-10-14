import { useLocation } from 'react-router'
import { site } from '../../app/site.ts'

interface PageMetadataProps {
  /** The whole document title: site.title on the home page, pageTitle(…) elsewhere. */
  title: string
  /** The page's description for search results. Left out when there is none. */
  description?: string
  /** Keeps the page out of search results (the 404 page). */
  noindex?: boolean
}

/**
 * The current page's title and description, plus its canonical URL once the site has a domain
 * (site.url). React places them in <head> and swaps them when another page renders. Link previews
 * come from index.html instead, which carries the home page's tags (vite.config.ts): crawlers that
 * don't run JavaScript see those on every URL.
 */
export function PageMetadata({ title, description, noindex = false }: PageMetadataProps) {
  const { pathname } = useLocation()

  return (
    <>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
      {noindex ? <meta name="robots" content="noindex" /> : null}
      {site.url && !noindex ? <link rel="canonical" href={site.url + pathname} /> : null}
    </>
  )
}
