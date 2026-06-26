import { routeId } from '../../data/routes'
import { profile } from '../../data/profile'
import { MotionReveal } from '../Animate/MotionReveal'
import { MotionStaggerGrid } from '../Animate/MotionStaggerGrid'
import { TechComment } from '../Animate/TechComment'
import { BentoCell } from '../Bento/BentoCell'
import { SkillChip } from '../Icon/SkillChip'
import { Section } from '../Section/Section'

export function About() {
  return (
    <Section
      id={routeId('profilo')}
      eyebrow="about"
      title="Chi sono"
      subtitle="Full stack, UX/UI e valori che guidano il mio lavoro."
      alt
    >
      <MotionStaggerGrid className="grid-cols-1 lg:grid-cols-12">
        <MotionReveal className="lg:col-span-8">
          <BentoCell variant="card" className="h-full">
            <TechComment text="profilo" className="mb-4" delay={80} />
            <div className="flex flex-col gap-5">
              {profile.about.map((paragraph, index) => (
                <p key={index} className="max-w-prose text-sm leading-relaxed text-text-muted sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </BentoCell>
        </MotionReveal>

        <MotionReveal className="lg:col-span-4" variant="scale-in">
          <BentoCell variant="accent" className="h-full">
            <TechComment text="interessi" className="mb-4" delay={80} />
            <ul className="flex flex-wrap gap-1.5 bento-chip-list">
              {profile.interests.map((interest, index) => (
                <li key={interest}>
                  <SkillChip label={interest} accent={index < 2} />
                </li>
              ))}
            </ul>
          </BentoCell>
        </MotionReveal>
      </MotionStaggerGrid>
    </Section>
  )
}
