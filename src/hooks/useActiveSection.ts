import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently in view, for highlighting in-page navigation.
 *
 * A section becomes current when it crosses a thin band about 40% down the viewport.
 * Ids with no matching element are ignored, so navigation can list sections that are
 * added later. Until a section is detected, the first id counts as current.
 */
export function useActiveSection<Id extends string>(ids: readonly Id[], enabled = true): Id | null {
  const [active, setActive] = useState<Id | null>(null)

  useEffect(() => {
    if (!enabled) return

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((element) => element !== null)
    if (sections.length === 0) return

    const inBand = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id)
          else inBand.delete(entry.target.id)
        }
        const current = ids.find((id) => inBand.has(id))
        if (current) setActive(current)
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    for (const section of sections) observer.observe(section)

    return () => {
      observer.disconnect()
    }
  }, [ids, enabled])

  if (!enabled) return null
  return active ?? ids[0] ?? null
}
