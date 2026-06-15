import { useCallback, useEffect, useState } from 'react'

const INTRO_KEY = 'fd-intro-seen'

export function shouldShowIntro(): boolean {
  if (typeof window === 'undefined') return false
  if (sessionStorage.getItem(INTRO_KEY)) return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  return true
}

export function markIntroAsSeen(): void {
  sessionStorage.setItem(INTRO_KEY, '1')
}

export function useIntroScreen() {
  const [showIntro, setShowIntro] = useState(shouldShowIntro)

  const completeIntro = useCallback(() => setShowIntro(false), [])

  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [showIntro])

  return { showIntro, completeIntro }
}
