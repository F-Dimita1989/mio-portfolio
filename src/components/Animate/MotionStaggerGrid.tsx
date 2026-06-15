import type { ReactNode } from 'react'
import { m, useReducedMotion } from 'motion/react'
import { usePageReady } from '../../hooks/usePageReady'
import { useInView } from '../../hooks/useInView'
import { cn } from '../../lib/cn'
import { staggerContainer } from './motionVariants'

type MotionStaggerGridProps = {
  children: ReactNode
  className?: string
  elevated?: boolean
  immediate?: boolean
  stagger?: number
  delayChildren?: number
}

export function MotionStaggerGrid({
  children,
  className,
  elevated = false,
  immediate = false,
  stagger = 0.07,
  delayChildren = 0.08,
}: MotionStaggerGridProps) {
  const pageReady = usePageReady()
  const reduceMotion = useReducedMotion()
  const { ref, isInView } = useInView({ threshold: 0.08, rootMargin: '0px 0px -4% 0px' })
  const active = pageReady && (immediate || isInView)

  return (
    <m.div
      ref={ref as never}
      className={cn('bento-grid grid gap-px border', elevated && 'bento-grid--elevated', className)}
      variants={staggerContainer(reduceMotion ? 0 : stagger, reduceMotion ? 0 : delayChildren)}
      initial="hidden"
      animate={active ? 'show' : 'hidden'}
    >
      {children}
    </m.div>
  )
}
