import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { projects } from '../../data/projects'
import { scrollToCenter } from '../../lib/scrollToRoute'
import { Folder } from '../Folder/Folder'
import { ProjectCard } from './ProjectCard'

const folderProjects = projects.slice(0, 3)

function buildFolderPaperItems() {
  return folderProjects.map((project) => {
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
            Apri sito →
          </a>
        ) : (
          <span className="folder-paper-status">In corso</span>
        )}
        <span className="folder-paper-action">Apri card</span>
      </div>
    )
  })
}

export function ProjectsFolder() {
  const [folderOpen, setFolderOpen] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const folderPaperItems = useMemo(() => buildFolderPaperItems(), [])

  const selectedProject = folderProjects.find((project) => project.id === selectedProjectId)

  useEffect(() => {
    if (!selectedProjectId) return

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cardRef.current) scrollToCenter(cardRef.current)
      })
    })

    return () => cancelAnimationFrame(frame)
  }, [selectedProjectId])

  const handleFolderOpenChange = useCallback((open: boolean) => {
    setFolderOpen(open)
    if (!open) {
      setSelectedProjectId(null)
    }
  }, [])

  const handlePaperClick = useCallback((index: number) => {
    const project = folderProjects[index]
    if (!project) return
    setSelectedProjectId(project.id)
  }, [])

  const hint = !folderOpen
    ? 'Clicca la cartella per sfogliare i progetti'
    : selectedProject
      ? `Card aperta: ${selectedProject.title}`
      : 'Clicca un documento per aprire la card del progetto'

  return (
    <div className="flex flex-col">
      <div className="folder-stage mb-0">
        <Folder
          color="#3dd9ee"
          size={2.5}
          items={folderPaperItems}
          ariaLabel="Cartella progetti — clicca per aprire"
          onOpenChange={handleFolderOpenChange}
          onPaperClick={handlePaperClick}
        />
        <p className="folder-stage-hint">{hint}</p>
      </div>

      <AnimatePresence mode="wait">
        {folderOpen && selectedProject && (
          <m.div
            ref={cardRef}
            key={selectedProject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-8 w-full max-w-xl"
          >
            <ProjectCard project={selectedProject} />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
