import { profile } from '../../data/profile'
import { BentoCell } from '../Bento/BentoCell'
import { BentoGrid } from '../Bento/BentoGrid'
import { Reveal } from '../Animate/Reveal'
import { Section } from '../Section/Section'
import { cn } from '../../lib/cn'

export function About() {
  return (
    <Section
      id="about"
      eyebrow="about"
      title="Chi sono"
      subtitle="Frontend, formazione full stack e valori che guidano il mio lavoro."
      alt
    >
      <BentoGrid className="grid-cols-1 lg:grid-cols-12">
        <Reveal className="lg:col-span-8" variant="fade-up" duration={750}>
          <BentoCell variant="card" className="h-full">
            <p className="tech-label mb-4">
              <span className="text-accent/80">{'// '}</span>
              profilo
            </p>
            <div className="flex flex-col gap-5">
              {profile.about.map((paragraph, index) => (
                <p key={index} className="max-w-prose text-sm leading-relaxed text-text-muted sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </BentoCell>
        </Reveal>

        <Reveal className="lg:col-span-4" delay={180} variant="scale-in" duration={750}>
          <BentoCell variant="accent" className="h-full">
            <p className="tech-label mb-4">
              <span className="text-accent/80">{'// '}</span>
              interessi
            </p>
            <ul className="flex flex-col gap-2">
              {profile.interests.map((interest, index) => (
                <li
                  key={interest}
                  className={cn(
                    'font-mono text-xs sm:text-sm',
                    index < 2 ? 'text-accent' : 'text-text',
                  )}
                >
                  {interest}
                </li>
              ))}
            </ul>
          </BentoCell>
        </Reveal>
      </BentoGrid>
    </Section>
  )
}
