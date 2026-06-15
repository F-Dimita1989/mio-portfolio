import { routeId } from '../../data/routes'
import { skillGroups } from '../../data/skills'
import { MotionReveal } from '../Animate/MotionReveal'
import { MotionStaggerGrid } from '../Animate/MotionStaggerGrid'
import { Section } from '../Section/Section'
import { SkillCard } from './SkillCard'

export function Skills() {
  return (
    <Section
      id={routeId('stack')}
      eyebrow="skills"
      title="Stack tecnico"
      subtitle="Tecnologie e ambiti su cui lavoro oggi."
      alt
    >
      <MotionStaggerGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group) => (
          <MotionReveal key={group.category} className="h-full">
            <SkillCard group={group} />
          </MotionReveal>
        ))}
      </MotionStaggerGrid>
    </Section>
  )
}
