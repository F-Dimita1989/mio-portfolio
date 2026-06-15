import type { SkillGroup } from '../../data/skills'
import type { BentoVariant } from '../Bento/BentoCell'
import { BentoCell } from '../Bento/BentoCell'
import { TechComment } from '../Animate/TechComment'
import { SkillChip } from '../Icon/SkillChip'

const skillVariants: Record<string, BentoVariant> = {
  Frontend: 'accent',
  Backend: 'featured',
  Database: 'muted',
  'Tools & Altro': 'card',
}

type SkillCardProps = {
  group: SkillGroup
}

export function SkillCard({ group }: SkillCardProps) {
  const count = group.items.length
  const titleId = `skill-${group.category.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-title`
  const variant = skillVariants[group.category] ?? 'card'

  return (
    <BentoCell as="article" variant={variant} className="h-full" aria-labelledby={titleId}>
      <TechComment text="stack" className="mb-3" delay={90} />

      <h3 id={titleId} className="mb-4 text-base text-text-heading sm:text-lg">
        {group.category}
      </h3>

      <ul
        className="mb-4 flex flex-1 flex-wrap content-start gap-1.5"
        aria-label={`Tecnologie ${group.category}`}
      >
        {group.items.map((item, index) => (
          <li key={item}>
            <SkillChip label={item} accent={index < 2} />
          </li>
        ))}
      </ul>

      <div className="bento-divider mt-auto flex min-h-11 items-center border-t pt-4">
        <span className="font-mono text-[0.6875rem] tracking-wide text-text-muted uppercase">
          {count} {count === 1 ? 'tecnologia' : 'tecnologie'}
        </span>
      </div>
    </BentoCell>
  )
}
