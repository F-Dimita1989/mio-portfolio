import { config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { cn } from '../../lib/cn'
import type { SkillIcon } from './skillIcons'

config.autoAddCss = false

type TechIconProps = {
  icon: SkillIcon
  className?: string
  size?: 'sm' | 'md'
}

const sizeClasses = {
  sm: 'h-3 w-3 text-[0.75rem]',
  md: 'h-3.5 w-3.5 text-[0.8125rem]',
}

export function TechIcon({ icon, className, size = 'sm' }: TechIconProps) {
  const iconClassName = cn('shrink-0', sizeClasses[size], className)

  if (icon.kind === 'fa') {
    return (
      <FontAwesomeIcon icon={icon.icon} className={iconClassName} aria-hidden="true" />
    )
  }

  const SimpleIcon = icon.icon
  return <SimpleIcon className={iconClassName} aria-hidden="true" />
}
