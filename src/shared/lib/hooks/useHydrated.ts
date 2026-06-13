import { useSyncExternalStore } from 'react'

const emptySubscribe = () => () => {}

/**
 * Returns false during SSR and the first client render, then true after hydration.
 * Lets a component defer client-only widgets (for example DOM-measuring graphs)
 * to a post-hydration render without a setState-in-effect.
 */
export const useHydrated = (): boolean =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )
