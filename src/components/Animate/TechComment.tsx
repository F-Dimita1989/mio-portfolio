import { useInView } from '../../hooks/useInView'
import { useTypewriter } from '../../hooks/useTypewriter'
import { cn } from '../../lib/cn'
import { usePageReady } from '../../hooks/usePageReady'
import { useRevealVisible } from './revealVisibilityContext'

const COMMENT_PREFIX = '// '

type TechCommentProps = {
  text: string
  className?: string
  variant?: 'tech-label' | 'eyebrow'
  prefixTone?: 'accent' | 'muted'
  textTone?: 'accent' | 'muted' | 'inherit'
  suffix?: string
  showPrefix?: boolean
  immediate?: boolean
  delay?: number
  charDelay?: number
}

const prefixToneClass = {
  accent: 'text-accent/80',
  muted: 'text-text-muted',
} as const

const textToneClass = {
  accent: 'text-accent',
  muted: 'text-text-muted',
  inherit: '',
} as const

export function TechComment({
  text,
  className,
  variant = 'tech-label',
  prefixTone = 'accent',
  textTone = 'inherit',
  suffix,
  showPrefix = true,
  immediate = false,
  delay = 0,
  charDelay,
}: TechCommentProps) {
  const pageReady = usePageReady()
  const revealVisible = useRevealVisible()
  const { ref, isInView } = useInView({ threshold: 0.2, rootMargin: '0px 0px -5% 0px' })
  const active = pageReady && (immediate || isInView) && revealVisible
  const typedSource = showPrefix ? `${COMMENT_PREFIX}${text}` : text
  const prefixLength = showPrefix ? COMMENT_PREFIX.length : 0
  const { displayed, isComplete } = useTypewriter(typedSource, active, {
    charDelay,
    startDelay: delay,
  })

  const prefixPart = displayed.slice(0, Math.min(displayed.length, prefixLength))
  const wordPart = displayed.slice(prefixLength)

  const accessibleLabel = showPrefix
    ? `${COMMENT_PREFIX}${text}${suffix ?? ''}`
    : `${text}${suffix ?? ''}`

  return (
    <p
      ref={ref as never}
      className={cn(variant === 'eyebrow' ? 'eyebrow' : 'tech-label', className)}
      aria-label={accessibleLabel}
    >
      <span aria-hidden="true">
        {showPrefix && prefixPart && (
          <span className={prefixToneClass[prefixTone]}>{prefixPart}</span>
        )}
        <span
          className={cn('tech-comment-word', textTone !== 'inherit' && textToneClass[textTone])}
        >
          {wordPart}
        </span>
        {!isComplete && active && (
          <span className="tech-comment-caret">_</span>
        )}
        {suffix && isComplete && (
          <span className="text-text-muted">{suffix}</span>
        )}
      </span>
    </p>
  )
}
