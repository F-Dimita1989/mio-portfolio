import { useEffect, useState } from 'react'

export function useMinWidth(minWidthPx: number) {
  const query = `(min-width: ${minWidthPx}px)`

  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export function useIsDesktop() {
  return useMinWidth(768)
}
