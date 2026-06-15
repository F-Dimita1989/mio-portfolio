import { config } from '@fortawesome/fontawesome-svg-core'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { cn } from '../../lib/cn'

config.autoAddCss = false

type BrandIconProps = {
  icon: IconDefinition
  className?: string
  size?: 'sm' | 'md'
}

const sizeClasses = {
  sm: 'h-3 w-3 text-[0.75rem]',
  md: 'h-3.5 w-3.5 text-[0.8125rem]',
}

export function BrandIcon({ icon, className, size = 'sm' }: BrandIconProps) {
  return (
    <FontAwesomeIcon
      icon={icon}
      className={cn('shrink-0', sizeClasses[size], className)}
      aria-hidden="true"
    />
  )
}
