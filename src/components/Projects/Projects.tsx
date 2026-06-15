import { routeId } from '../../data/routes'
import { projects } from '../../data/projects'
import { MotionReveal } from '../Animate/MotionReveal'
import { MotionStaggerGrid } from '../Animate/MotionStaggerGrid'
import { Section } from '../Section/Section'
import { ProjectCard } from './ProjectCard'
import { ProjectsFolder } from './ProjectsFolder'

export function Projects() {
  return (
    <Section
      id={routeId('progetti')}
      eyebrow="progetti"
      title="Cosa sviluppo"
      subtitle="Progetti reali su cui sto lavorando: web app, portfolio e health tech."
    >
      <ProjectsFolder />

      <MotionStaggerGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <MotionReveal key={project.id} className="h-full">
            <ProjectCard project={project} />
          </MotionReveal>
        ))}
      </MotionStaggerGrid>
    </Section>
  )
}
