import type { ReactNode } from 'react'
import { m, useReducedMotion } from 'motion/react'
import { usePageReady } from '../../hooks/usePageReady'
import { useInView } from '../../hooks/useInView'
import { cn } from '../../lib/cn'
import { type MotionRevealVariant, reducedMotionItem, revealItemVariants } from './motionVariants'
import { RevealVisibilityContext } from './revealVisibilityContext'

type RevealVariant = MotionRevealVariant

type RevealAs = keyof typeof motionElements

type RevealProps = {
  children: ReactNode
  as?: RevealAs
  className?: string
  variant?: RevealVariant
  delay?: number
  duration?: number
  immediate?: boolean
}

const motionElements = {
  div: m.div,
  header: m.header,
  li: m.li,
} as const

export function Reveal({
  children,
  as = 'div',
  className,
  variant = 'fade-up',
  delay = 0,
  duration = 700,
  immediate = false,
}: RevealProps) {
  const pageReady = usePageReady()
  const reduceMotion = useReducedMotion()
  const { ref, isInView } = useInView({ threshold: 0.12, rootMargin: '0px 0px -4% 0px' })
  const active = pageReady && (immediate || isInView)
  const variants = reduceMotion ? reducedMotionItem : revealItemVariants[variant]
  const MotionEl = motionElements[as]

  return (
    <RevealVisibilityContext.Provider value={active}>
      <MotionEl
        ref={ref as never}
        className={cn(className)}
        variants={variants}
        initial="hidden"
        animate={active ? 'show' : 'hidden'}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: duration / 1000, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }
        }
      >
        {children}
      </MotionEl>
    </RevealVisibilityContext.Provider>
  )
}
