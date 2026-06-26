import type { IconType } from 'react-icons'
import { cn } from '../../lib/cn'

type TechIconProps = {
  icon: IconType
  className?: string
  size?: 'sm' | 'md'
}

const sizeClasses = {
  sm: 'h-3 w-3 text-[0.75rem]',
  md: 'h-3.5 w-3.5 text-[0.8125rem]',
}

export function TechIcon({ icon: Icon, className, size = 'sm' }: TechIconProps) {
  return (
    <Icon
      className={cn('shrink-0', sizeClasses[size], className)}
      aria-hidden="true"
    />
  )
}
