import { profile } from '../../data/profile'
import { Reveal } from '../Animate/Reveal'
import { Section } from '../Section/Section'

export function About() {
  return (
    <Section
      id="about"
      eyebrow="about"
      title="Chi sono"
      subtitle="Frontend, formazione full stack e valori che guidano il mio lavoro."
      alt
    >
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-16">
        <Reveal className="flex min-w-0 flex-1 flex-col gap-5" variant="fade-up" duration={750}>
          {profile.about.map((paragraph, index) => (
            <p key={index} className="max-w-prose text-sm leading-relaxed text-text-muted sm:text-base">
              {paragraph}
            </p>
          ))}
        </Reveal>

        <Reveal className="w-full md:max-w-xs md:shrink-0" delay={180} variant="scale-in" duration={750}>
          <aside className="border-t border-border pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
            <p className="tech-label mb-4">
              <span className="text-text-muted">{'// '}</span>
              interessi
            </p>
            <ul className="flex flex-col gap-2">
              {profile.interests.map((interest) => (
                <li key={interest} className="font-mono text-xs text-text sm:text-sm">
                  {interest}
                </li>
              ))}
            </ul>
          </aside>
        </Reveal>
      </div>
    </Section>
  )
}
