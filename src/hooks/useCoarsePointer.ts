import { useSyncExternalStore } from 'react'

const query = '(pointer: coarse)'

function subscribe(onChange: () => void) {
  const list = window.matchMedia(query)
  list.addEventListener('change', onChange)
  return () => {
    list.removeEventListener('change', onChange)
  }
}

/**
 * Whether the device's main pointer is a touch screen (`(pointer: coarse)`), following changes
 * such as a tablet docked to a keyboard and trackpad. `undefined` until it runs in the browser
 * (in server-rendered or prerendered HTML), so callers keep a choice that works everywhere.
 */
export function useCoarsePointer(): boolean | undefined {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => undefined,
  )
}
