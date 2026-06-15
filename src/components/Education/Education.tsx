import {
  educationTimeline,
  experienceTimeline,
  type TimelineItem,
} from '../../data/education'
import { Reveal } from '../Animate/Reveal'
import { Section } from '../Section/Section'

function TimelineList({ items, startDelay = 0 }: { items: TimelineItem[]; startDelay?: number }) {
  return (
    <ol className="flex flex-col border-l border-border">
      {items.map((item, index) => (
        <Reveal
          key={item.id}
          as="li"
          delay={startDelay + index * 110}
          variant="slide-right"
          duration={750}
        >
          <article className="relative border-b border-border py-6 pl-6 last:border-b-0 sm:pl-8">
            <span
              className="absolute top-7 left-0 size-1.5 -translate-x-1/2 bg-accent motion-safe:animate-pulse"
              aria-hidden="true"
            />
            <time className="mb-2 block font-mono text-[0.6875rem] tracking-wide text-accent uppercase">
              {item.period}
            </time>
            <h3 className="mb-1 text-base sm:text-lg">{item.title}</h3>
            {item.organization && (
              <p className="mb-2 font-mono text-xs text-text-muted">{item.organization}</p>
            )}
            {item.description && (
              <p className="max-w-prose text-sm leading-relaxed text-text-muted">{item.description}</p>
            )}
            {item.highlights && (
              <ul className="mt-2 flex max-w-prose flex-col gap-1.5">
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
          </article>
        </Reveal>
      ))}
    </ol>
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
