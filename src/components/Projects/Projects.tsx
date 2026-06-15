import { projects } from '../../data/projects'
import { BentoGrid } from '../Bento/BentoGrid'
import { Reveal } from '../Animate/Reveal'
import { Section } from '../Section/Section'
import { ProjectCard } from './ProjectCard'

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="progetti"
      title="Cosa sviluppo"
      subtitle="Progetti reali su cui sto lavorando: web app, portfolio e health tech."
    >
      <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal
            key={project.id}
            className="h-full"
            delay={index * 80}
            variant="fade-up"
            duration={700}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </BentoGrid>
    </Section>
  )
}
