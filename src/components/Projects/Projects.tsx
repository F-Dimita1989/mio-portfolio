import { routeId } from '../../data/routes'
import { projects } from '../../data/projects'
import { useIsDesktop } from '../../hooks/useMinWidth'
import { MotionReveal } from '../Animate/MotionReveal'
import { MotionStaggerGrid } from '../Animate/MotionStaggerGrid'
import { Section } from '../Section/Section'
import { ProjectCard } from './ProjectCard'
import { ProjectsFolder } from './ProjectsFolder'

export function Projects() {
  const isDesktop = useIsDesktop()

  return (
    <Section
      id={routeId('progetti')}
      eyebrow="progetti"
      title="Cosa sviluppo"
      subtitle="Progetti reali su cui sto lavorando."
    >
      {isDesktop ? (
        <ProjectsFolder />
      ) : (
        <MotionStaggerGrid className="grid-cols-1">
          {projects.map((project) => (
            <MotionReveal key={project.id} className="h-full">
              <ProjectCard project={project} />
            </MotionReveal>
          ))}
        </MotionStaggerGrid>
      )}
    </Section>
  )
}
