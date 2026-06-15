import type { SkillGroup } from '../../data/skills'

type SkillCardProps = {
  group: SkillGroup
}

export function SkillCard({ group }: SkillCardProps) {
  const count = group.items.length
  const titleId = `skill-${group.category.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-title`

  return (
    <article
      className="card-surface flex h-full flex-col p-4 sm:p-5"
      aria-labelledby={titleId}
    >
      <div className="mb-3 font-mono text-[0.6875rem] tracking-wide text-text-muted uppercase">
        <span>stack</span>
      </div>

      <h3 id={titleId} className="mb-4 text-base sm:text-lg">
        {group.category}
      </h3>

      <ul
        className="mb-4 flex flex-1 flex-wrap content-start gap-1.5"
        aria-label={`Tecnologie ${group.category}`}
      >
        {group.items.map((item) => (
          <li key={item} className="chip">
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex min-h-11 items-center border-t border-border pt-4">
        <span className="font-mono text-[0.6875rem] tracking-wide text-text-muted uppercase">
          {count} {count === 1 ? 'tecnologia' : 'tecnologie'}
        </span>
      </div>
    </article>
  )
}
