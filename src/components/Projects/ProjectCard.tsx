import { ExternalLinkIcon, GitHubLogoIcon } from '@radix-ui/react-icons'
import type { Project } from '../../data/projects'
import { RadixIcon } from '../Icon/RadixIcon'

const statusLabels: Record<Project['status'], string> = {
  'in-progress': 'in corso',
  completed: 'completato',
  concept: 'concept',
}

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className="card-surface flex h-full flex-col p-4 sm:p-5"
      aria-labelledby={`project-${project.id}-title`}
    >
      <div className="mb-3 font-mono text-[0.6875rem] tracking-wide text-text-muted uppercase">
        <span>{statusLabels[project.status]}</span>
      </div>

      <h3 id={`project-${project.id}-title`} className="mb-2 text-base sm:text-lg">
        {project.title}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-text-muted">
        {project.description}
      </p>

      <ul className="mb-4 flex flex-wrap gap-1.5" aria-label="Tecnologie">
        {project.tags.map((tag) => (
          <li key={tag} className="chip">
            {tag}
          </li>
        ))}
      </ul>

      <div
        className="mt-auto flex min-h-11 flex-wrap items-center gap-2 border-t border-border pt-4"
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
    </article>
  )
}
