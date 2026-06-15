import { projects } from '../../data/projects'
import { useIsDesktop } from '../../hooks/useMinWidth'
import { Folder } from '../Folder/Folder'

export function ProjectsFolder() {
  const isDesktop = useIsDesktop()

  if (!isDesktop) {
    return null
  }

  const folderProjects = projects.slice(0, 3)

  const items = folderProjects.map((project) => {
    const link = project.links?.sito ?? project.links?.demo ?? project.links?.repo

    return (
      <div key={project.id} className="folder-paper-content">
        <span className="folder-paper-eyebrow">// file</span>
        <span className="folder-paper-title">{project.title}</span>
        <span className="folder-paper-tag">{project.tags[0]}</span>
        {link ? (
          <a
            href={link}
            className="folder-paper-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            Apri →
          </a>
        ) : (
          <span className="folder-paper-status">In corso</span>
        )}
      </div>
    )
  })

  return (
    <div className="folder-stage mb-8">
      <Folder color="#3dd9ee" size={2.5} items={items} ariaLabel="Cartella progetti — clicca per aprire" />
      <p className="folder-stage-hint">Clicca la cartella per sfogliare i progetti</p>
    </div>
  )
}
