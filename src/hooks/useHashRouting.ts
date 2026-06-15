import { useEffect } from 'react'
import { syncRouteFromHash } from '../lib/scrollToRoute'

export function useHashRouting(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return

    const handleHashChange = () => syncRouteFromHash('smooth')

    if (window.location.hash) {
      requestAnimationFrame(() => syncRouteFromHash('auto'))
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [enabled])
}
