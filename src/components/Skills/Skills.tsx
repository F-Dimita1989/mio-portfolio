import { skillGroups } from '../../data/skills'
import { Reveal } from '../Animate/Reveal'
import { Section } from '../Section/Section'
import { SkillCard } from './SkillCard'

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="skills"
      title="Stack tecnico"
      subtitle="Tecnologie e ambiti su cui lavoro oggi."
      alt
    >
      <div className="grid grid-cols-1 gap-px border border-accent bg-accent md:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, index) => (
          <Reveal key={group.category} className="h-full" delay={index * 80} variant="fade-up" duration={700}>
            <SkillCard group={group} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
