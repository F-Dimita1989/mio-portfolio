import type { ElementType, ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'
import { cn } from '../../lib/cn'

type RevealVariant =
  | 'fade-up'
  | 'fade-in'
  | 'fade-down'
  | 'scale-in'
  | 'slide-left'
  | 'slide-right'

type RevealProps = {
  children: ReactNode
  as?: ElementType
  className?: string
  variant?: RevealVariant
  delay?: number
  duration?: number
  immediate?: boolean
}

const variantClass: Record<RevealVariant, string> = {
  'fade-up': 'reveal-fade-up',
  'fade-in': 'reveal-fade-in',
  'fade-down': 'reveal-fade-down',
  'scale-in': 'reveal-scale-in',
  'slide-left': 'reveal-slide-left',
  'slide-right': 'reveal-slide-right',
}

export function Reveal({
  children,
  as: Component = 'div',
  className,
  variant = 'fade-up',
  delay = 0,
  duration = 700,
  immediate = false,
}: RevealProps) {
  const { ref, isInView } = useInView()
  const visible = immediate || isInView

  return (
    <Component
      ref={ref as never}
      className={cn('reveal', variantClass[variant], visible && 'reveal-visible', className)}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Component>
  )
}
