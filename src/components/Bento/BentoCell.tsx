import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type BentoVariant =
  | 'base'
  | 'card'
  | 'intro'
  | 'accent'
  | 'featured'
  | 'muted'
  | 'links'
  | 'cta-primary'
  | 'cta-secondary'

type BentoCellProps<T extends ElementType = 'div'> = {
  as?: T
  children: ReactNode
  variant?: BentoVariant
  contentClassName?: string
} & ComponentPropsWithoutRef<T>

const variantClass: Record<BentoVariant, string> = {
  base: '',
  card: 'bento-cell--card',
  intro: 'bento-cell--intro',
  accent: 'bento-cell--accent',
  featured: 'bento-cell--featured',
  muted: 'bento-cell--muted',
  links: 'bento-cell--links',
  'cta-primary': 'bento-cell--cta-primary',
  'cta-secondary': 'bento-cell--cta-secondary',
}

const contentLayout: Partial<Record<BentoVariant, string>> = {
  links: 'flex-row items-start gap-3',
}

export function BentoCell<T extends ElementType = 'div'>({
  children,
  as,
  className,
  contentClassName,
  variant = 'base',
  ...props
}: BentoCellProps<T>) {
  const Component = as ?? 'div'

  return (
    <Component className={cn('bento-cell', variantClass[variant], className)} {...props}>
      <div
        className={cn(
          'relative z-[1] flex h-full flex-col',
          contentLayout[variant],
          contentClassName,
        )}
      >
        {children}
      </div>
    </Component>
  )
}
