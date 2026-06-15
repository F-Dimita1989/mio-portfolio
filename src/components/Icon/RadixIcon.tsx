import { EnvelopeClosedIcon } from '@radix-ui/react-icons'
import { cn } from '../../lib/cn'

export type RadixIconComponent = typeof EnvelopeClosedIcon

type RadixIconProps = {
  icon: RadixIconComponent
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'size-3.5',
  md: 'size-4',
  lg: 'size-5',
} as const

export function RadixIcon({ icon: Icon, className, size = 'md' }: RadixIconProps) {
  return <Icon className={cn('shrink-0', sizeClasses[size], className)} aria-hidden="true" />
}
