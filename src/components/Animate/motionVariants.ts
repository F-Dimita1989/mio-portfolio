import type { Variants } from 'motion/react'

export type MotionRevealVariant = 'fade-up' | 'fade-down' | 'fade-in' | 'scale-in' | 'slide-left' | 'slide-right'

export const staggerContainer = (
  staggerChildren = 0.07,
  delayChildren = 0.08,
): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
})

export const revealItemVariants: Record<MotionRevealVariant, Variants> = {
  'fade-up': {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  },
  'fade-down': {
    hidden: { opacity: 0, y: -16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  },
  'fade-in': {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  },
  'scale-in': {
    hidden: { opacity: 0, scale: 0.96 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  },
  'slide-left': {
    hidden: { opacity: 0, x: 22 },
    show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  },
  'slide-right': {
    hidden: { opacity: 0, x: -22 },
    show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  },
}

export const reducedMotionItem: Variants = {
  hidden: { opacity: 1, y: 0, scale: 1, x: 0 },
  show: { opacity: 1, y: 0, scale: 1, x: 0 },
}
