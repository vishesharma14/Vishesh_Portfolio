import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { buttonStyles } from '../../components/ui/buttonStyles.ts'
import { CheckIcon, CopyIcon } from '../../components/ui/icons.tsx'
import { cn } from '../../lib/cn.ts'

type CopyState = 'idle' | 'copied' | 'failed'

const labels: Record<CopyState, string> = {
  idle: 'Copy email',
  copied: 'Copied',
  failed: 'Copy failed',
}

const icons: Record<CopyState, typeof CopyIcon> = {
  idle: CopyIcon,
  copied: CheckIcon,
  failed: CopyIcon,
}

/** How long "Copied" (or "Copy failed") stays before the button reads "Copy email" again. */
const RESET_AFTER_MS = 2000

const noSubscription = () => () => undefined

/** The Clipboard API exists only on secure pages (https, localhost), and only in the browser. */
function canCopy(): boolean {
  return window.isSecureContext && 'clipboard' in navigator
}

/**
 * Copies the email address to the clipboard. The label turns to "Copied" for two seconds, and a
 * status message announces it to screen readers. Each state's icon and label share one grid
 * cell, centred, so the button keeps the width of the longest one and nothing next to it moves.
 * Where the Clipboard API is missing (pages that aren't secure, server-rendered HTML) the button
 * isn't shown, so it never looks clickable without working.
 */
export function CopyEmailButton({ email }: { email: string }) {
  const [state, setState] = useState<CopyState>('idle')
  const resetTimer = useRef(0)
  const available = useSyncExternalStore(noSubscription, canCopy, () => false)

  useEffect(() => {
    return () => {
      window.clearTimeout(resetTimer.current)
    }
  }, [])

  if (!available) return null

  async function copy() {
    window.clearTimeout(resetTimer.current)
    try {
      await navigator.clipboard.writeText(email)
      setState('copied')
    } catch {
      setState('failed')
    }
    resetTimer.current = window.setTimeout(() => {
      setState('idle')
    }, RESET_AFTER_MS)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => void copy()}
        className={buttonStyles({ variant: 'secondary', tone: 'dark' })}
      >
        <span className="grid">
          {(Object.keys(labels) as CopyState[]).map((key) => {
            const StateIcon = icons[key]
            return (
              <span
                key={key}
                // Hidden states only reserve their width; `invisible` also keeps them out of the
                // button's accessible name.
                className={cn(
                  'col-start-1 row-start-1 inline-flex items-center justify-center gap-2',
                  key !== state && 'invisible',
                )}
              >
                <StateIcon className="-ml-0.5 size-[1.125rem]" />
                {labels[key]}
              </span>
            )
          })}
        </span>
      </button>
      <span role="status" className="sr-only">
        {state === 'idle' ? '' : labels[state]}
      </span>
    </>
  )
}
