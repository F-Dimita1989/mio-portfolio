import { ExternalLinkIcon, GitHubLogoIcon } from '@radix-ui/react-icons'
import type { Project } from '../../data/projects'
import type { BentoVariant } from '../Bento/BentoCell'
import { BentoCell } from '../Bento/BentoCell'
import { TechComment } from '../Animate/TechComment'
import { SkillChip } from '../Icon/SkillChip'
import { RadixIcon } from '../Icon/RadixIcon'

const statusLabels: Record<Project['status'], string> = {
  'in-progress': 'in corso',
  completed: 'completato',
  concept: 'concept',
}

const projectVariants: Record<string, BentoVariant> = {
  sgamapp: 'featured',
  pillapp: 'accent',
  portfolio: 'card',
}

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const variant = projectVariants[project.id] ?? 'card'

  return (
    <BentoCell
      as="article"
      variant={variant}
      className="h-full"
      aria-labelledby={`project-${project.id}-title`}
    >
      <TechComment text={statusLabels[project.status]} className="mb-3" delay={90} />

      <h3 id={`project-${project.id}-title`} className="mb-2 text-base text-text-heading sm:text-lg">
        {project.title}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-text-muted">
        {project.description}
      </p>

      <ul className="mb-4 flex flex-wrap gap-1.5" aria-label="Tecnologie">
        {project.tags.map((tag, index) => (
          <li key={tag}>
            <SkillChip label={tag} accent={index === 0} />
          </li>
        ))}
      </ul>

      <div
        className="bento-divider mt-auto flex min-h-11 flex-wrap items-center gap-2 border-t pt-4"
        aria-hidden={!project.links?.repo && !project.links?.demo && !project.links?.sito}
      >
        {project.links?.repo && (
          <a
            href={project.links.repo}
            className="btn-secondary !min-h-10 !w-auto gap-1.5 px-3 text-[0.6875rem]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <RadixIcon icon={GitHubLogoIcon} size="sm" />
            Repo
          </a>
        )}
        {project.links?.demo && (
          <a
            href={project.links.demo}
            className="btn-secondary !min-h-10 !w-auto gap-1.5 px-3 text-[0.6875rem]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <RadixIcon icon={ExternalLinkIcon} size="sm" />
            Demo
          </a>
        )}
        {project.links?.sito && (
          <a
            href={project.links.sito}
            className="btn-secondary !min-h-10 !w-auto gap-1.5 px-3 text-[0.6875rem]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <RadixIcon icon={ExternalLinkIcon} size="sm" />
            Sito
          </a>
        )}
      </div>
    </BentoCell>
  )
}
