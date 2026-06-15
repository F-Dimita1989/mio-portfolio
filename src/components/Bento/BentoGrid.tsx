import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type BentoGridProps = {
  children: ReactNode
  className?: string
  elevated?: boolean
}

export function BentoGrid({ children, className, elevated = false }: BentoGridProps) {
  return (
    <div className={cn('bento-grid grid gap-px border', elevated && 'bento-grid--elevated', className)}>
      {children}
    </div>
  )
}
