import { cn } from '../../lib/cn'
import { BrandIcon } from './BrandIcon'
import { getSkillIcon } from './skillIcons'

type SkillChipProps = {
  label: string
  accent?: boolean
  className?: string
}

export function SkillChip({ label, accent = false, className }: SkillChipProps) {
  const icon = getSkillIcon(label)

  return (
    <span className={cn('bento-chip', accent && 'bento-chip--accent', className)}>
      {icon && <BrandIcon icon={icon} />}
      {label}
    </span>
  )
}
