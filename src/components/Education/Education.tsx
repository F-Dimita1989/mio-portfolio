import {
  educationTimeline,
  experienceTimeline,
  type TimelineItem,
} from '../../data/education'
import { routeId } from '../../data/routes'
import type { BentoVariant } from '../Bento/BentoCell'
import { BentoCell } from '../Bento/BentoCell'
import { MotionReveal } from '../Animate/MotionReveal'
import { MotionStaggerGrid } from '../Animate/MotionStaggerGrid'
import { TechComment } from '../Animate/TechComment'
import { Section } from '../Section/Section'

const timelineVariants: Record<string, BentoVariant> = {
  'its-apulia': 'accent',
  'rosa-luxemburg': 'card',
  techloop: 'accent',
  sgamapp: 'featured',
}

const leftRailIds = new Set(['its-apulia', 'rosa-luxemburg', 'techloop', 'sgamapp'])

function TimelineList({ items }: { items: TimelineItem[] }) {
  return (
    <MotionStaggerGrid className="grid-cols-1" stagger={0.08} delayChildren={0.06}>
      {items.map((item) => {
        const variant = timelineVariants[item.id] ?? 'card'

        return (
          <MotionReveal key={item.id} as="li" className="list-none">
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
          </MotionReveal>
        )
      })}
    </MotionStaggerGrid>
  )
}

export function Education() {
  return (
    <Section
      id={routeId('percorso')}
      eyebrow="percorso"
      title="Studi e lavoro"
      subtitle="Formazione ITS, stage in azienda e progetti web reali."
    >
      <div className="flex flex-col gap-10 md:gap-12">
        <div>
          <TechComment text="formazione" className="mb-4" prefixTone="muted" delay={80} />
          <TimelineList items={educationTimeline} />
        </div>

        <div>
          <TechComment text="esperienze lavorative" className="mb-4" prefixTone="muted" delay={80} />
          <TimelineList items={experienceTimeline} />
        </div>
      </div>
    </Section>
  )
}
