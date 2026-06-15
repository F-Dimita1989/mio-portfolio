import type { ReactNode } from 'react'
import { m, useReducedMotion } from 'motion/react'
import { usePageReady } from '../../hooks/usePageReady'
import { useInView } from '../../hooks/useInView'
import { cn } from '../../lib/cn'
import { staggerContainer } from './motionVariants'

type MotionStaggerProps = {
  children: ReactNode
  className?: string
  immediate?: boolean
  stagger?: number
  delayChildren?: number
}

export function MotionStagger({
  children,
  className,
  immediate = false,
  stagger = 0.1,
  delayChildren = 0.06,
}: MotionStaggerProps) {
  const pageReady = usePageReady()
  const reduceMotion = useReducedMotion()
  const { ref, isInView } = useInView({ threshold: 0.12, rootMargin: '0px 0px -4% 0px' })
  const active = pageReady && (immediate || isInView)

  return (
    <m.div
      ref={ref as never}
      className={cn(className)}
      variants={staggerContainer(reduceMotion ? 0 : stagger, reduceMotion ? 0 : delayChildren)}
      initial="hidden"
      animate={active ? 'show' : 'hidden'}
    >
      {children}
    </m.div>
  )
}
