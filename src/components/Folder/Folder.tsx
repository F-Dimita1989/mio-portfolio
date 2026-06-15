import { useEffect, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react'
import './Folder.css'

const MAX_ITEMS = 3

type PaperOffset = { x: number; y: number }

type FolderProps = {
  color?: string
  size?: number
  items?: ReactNode[]
  className?: string
  ariaLabel?: string
  onOpenChange?: (open: boolean) => void
  onPaperClick?: (index: number) => void
}

export function Folder({
  color = '#3dd9ee',
  size = 1,
  items = [],
  className = '',
  ariaLabel = 'Apri cartella progetti',
  onOpenChange,
  onPaperClick,
}: FolderProps) {
  const papers: (ReactNode | null)[] = items.slice(0, MAX_ITEMS)
  while (papers.length < MAX_ITEMS) {
    papers.push(null)
  }

  const [open, setOpen] = useState(false)
  const [paperOffsets, setPaperOffsets] = useState<PaperOffset[]>(
    Array.from({ length: MAX_ITEMS }, () => ({ x: 0, y: 0 })),
  )

  useEffect(() => {
    onOpenChange?.(open)
  }, [open, onOpenChange])

  const folderBackColor = '#0e1622'
  const paper1 = '#0e1622'
  const paper2 = '#101a28'
  const paper3 = '#12202e'

  const handleClick = () => {
    setOpen((prev) => {
      if (prev) {
        setPaperOffsets(Array.from({ length: MAX_ITEMS }, () => ({ x: 0, y: 0 })))
      }
      return !prev
    })
  }

  const handlePaperMouseMove = (e: MouseEvent<HTMLDivElement>, index: number) => {
    if (!open) return
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const offsetX = (e.clientX - centerX) * 0.15
    const offsetY = (e.clientY - centerY) * 0.15
    setPaperOffsets((prev) => {
      const newOffsets = [...prev]
      newOffsets[index] = { x: offsetX, y: offsetY }
      return newOffsets
    })
  }

  const handlePaperMouseLeave = (index: number) => {
    setPaperOffsets((prev) => {
      const newOffsets = [...prev]
      newOffsets[index] = { x: 0, y: 0 }
      return newOffsets
    })
  }

  const folderStyle = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor,
    '--paper-1': paper1,
    '--paper-2': paper2,
    '--paper-3': paper3,
  } as CSSProperties

  return (
    <div style={{ transform: `scale(${size})` }} className={className}>
      <div
        className={`folder folder--click ${open ? 'open' : ''}`.trim()}
        style={folderStyle}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-label={ariaLabel}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick()
          }
        }}
      >
        <div className="folder__back">
          {papers.map((item, i) => (
            <div
              key={i}
              className={`paper paper-${i + 1}`}
              onMouseMove={(e) => handlePaperMouseMove(e, i)}
              onMouseLeave={() => handlePaperMouseLeave(i)}
              onClick={(e) => {
                e.stopPropagation()
                if (open) onPaperClick?.(i)
              }}
              style={
                open
                  ? ({
                      '--magnet-x': `${paperOffsets[i]?.x ?? 0}px`,
                      '--magnet-y': `${paperOffsets[i]?.y ?? 0}px`,
                    } as CSSProperties)
                  : undefined
              }
            >
              {item}
            </div>
          ))}
          <div className="folder__front" />
          <div className="folder__front right" />
          {!open && <span className="folder__label">// progetti</span>}
        </div>
      </div>
    </div>
  )
}
