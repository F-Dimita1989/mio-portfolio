import { useState, type ReactNode } from 'react'
import { m, useReducedMotion } from 'motion/react'
import { usePageReady } from '../../hooks/usePageReady'
import { cn } from '../../lib/cn'
import {
  type MotionRevealVariant,
  reducedMotionItem,
  revealItemVariants,
} from './motionVariants'
import { RevealVisibilityContext } from './revealVisibilityContext'

type MotionRevealProps = {
  children: ReactNode
  className?: string
  variant?: MotionRevealVariant
  as?: 'div' | 'li'
}

const motionElements = {
  div: m.div,
  li: m.li,
} as const

export function MotionReveal({
  children,
  className,
  variant = 'fade-up',
  as = 'div',
}: MotionRevealProps) {
  const pageReady = usePageReady()
  const reduceMotion = useReducedMotion()
  const [revealed, setRevealed] = useState(false)
  const variants = reduceMotion ? reducedMotionItem : revealItemVariants[variant]
  const MotionEl = motionElements[as]
  const visible = pageReady && (reduceMotion || revealed)

  return (
    <MotionEl
      variants={variants}
      className={cn(className)}
      onAnimationStart={() => {
        if (pageReady) setRevealed(true)
      }}
    >
      <RevealVisibilityContext.Provider value={visible}>
        {children}
      </RevealVisibilityContext.Provider>
    </MotionEl>
  )
}
