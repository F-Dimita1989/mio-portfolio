import {
  educationTimeline,
  experienceTimeline,
  type TimelineItem,
} from '../../data/education'
import type { BentoVariant } from '../Bento/BentoCell'
import { BentoCell } from '../Bento/BentoCell'
import { BentoGrid } from '../Bento/BentoGrid'
import { Reveal } from '../Animate/Reveal'
import { Section } from '../Section/Section'

const timelineVariants: Record<string, BentoVariant> = {
  'its-apulia': 'accent',
  'rosa-luxemburg': 'card',
  techloop: 'accent',
  sgamapp: 'featured',
}

const leftRailIds = new Set(['its-apulia', 'rosa-luxemburg', 'techloop', 'sgamapp'])

function TimelineList({ items, startDelay = 0 }: { items: TimelineItem[]; startDelay?: number }) {
  return (
    <BentoGrid className="grid-cols-1">
      {items.map((item, index) => {
        const variant = timelineVariants[item.id] ?? 'card'

        return (
        <Reveal
          key={item.id}
          as="li"
          className="list-none"
          delay={startDelay + index * 110}
          variant="fade-up"
          duration={750}
        >
          <BentoCell
            as="article"
            variant={variant}
            className={leftRailIds.has(item.id) ? 'bento-cell--accent-rail' : undefined}
          >
            <time className="tech-label mb-3 block text-accent">{item.period}</time>
            <h3 className="mb-1 text-base text-text-heading sm:text-lg">{item.title}</h3>
            {item.organization && (
              <p className="mb-2 font-mono text-xs text-text-muted">{item.organization}</p>
            )}
            {item.description && (
              <p className="max-w-prose text-sm leading-relaxed text-text-muted">{item.description}</p>
            )}
            {item.highlights && (
              <ul className="mt-3 flex max-w-prose flex-col gap-1.5">
                {item.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="relative pl-4 text-sm leading-relaxed text-text-muted before:absolute before:left-0 before:text-accent before:content-['·']"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            )}
          </BentoCell>
        </Reveal>
        )
      })}
    </BentoGrid>
  )
}

export function Education() {
  return (
    <Section
      id="journey"
      eyebrow="percorso"
      title="Studi e lavoro"
      subtitle="Formazione ITS, stage in azienda e progetti web reali."
    >
      <div className="flex flex-col gap-10 md:gap-12">
        <div>
          <p className="tech-label mb-4">
            <span className="text-text-muted">{'// '}</span>
            formazione
          </p>
          <TimelineList items={educationTimeline} />
        </div>

        <div>
          <p className="tech-label mb-4">
            <span className="text-text-muted">{'// '}</span>
            esperienze lavorative
          </p>
          <TimelineList items={experienceTimeline} startDelay={80} />
        </div>
      </div>
    </Section>
  )
}
