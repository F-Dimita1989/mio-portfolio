import { useEffect, useState } from 'react'

type UseTypewriterOptions = {
  charDelay?: number
  startDelay?: number
}

export function useTypewriter(
  text: string,
  active: boolean,
  { charDelay = 42, startDelay = 0 }: UseTypewriterOptions = {},
) {
  const [displayed, setDisplayed] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!active) {
      const frameId = requestAnimationFrame(() => {
        setDisplayed('')
        setIsComplete(false)
      })
      return () => cancelAnimationFrame(frameId)
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const frameId = requestAnimationFrame(() => {
        setDisplayed(text)
        setIsComplete(true)
      })
      return () => cancelAnimationFrame(frameId)
    }

    let cancelled = false
    let index = 0
    let timerId = 0

    const schedule = (fn: () => void, ms: number) => {
      timerId = window.setTimeout(() => {
        if (!cancelled) fn()
      }, ms)
    }

    const typeNext = () => {
      index += 1
      setDisplayed(text.slice(0, index))
      if (index < text.length) {
        schedule(typeNext, charDelay)
      } else {
        setIsComplete(true)
      }
    }

    const frameId = requestAnimationFrame(() => {
      setDisplayed('')
      setIsComplete(false)
      schedule(typeNext, startDelay)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(frameId)
      window.clearTimeout(timerId)
    }
  }, [active, text, charDelay, startDelay])

  return { displayed, isComplete }
}
