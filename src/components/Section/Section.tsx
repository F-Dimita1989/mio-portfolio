import type { ReactNode } from 'react'
import { Reveal } from '../Animate/Reveal'
import { cn } from '../../lib/cn'

type SectionProps = {
  id: string
  title: string
  subtitle?: string
  eyebrow?: string
  children: ReactNode
  alt?: boolean
}

export function Section({
  id,
  title,
  subtitle,
  eyebrow,
  children,
  alt = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'scroll-section section-padding section-divider',
        alt && 'bg-bg-elevated',
      )}
      aria-labelledby={`${id}-title`}
    >
      <div className="container-page">
        <Reveal as="header" className="mb-8 md:mb-12" variant="fade-up" duration={750}>
          {eyebrow && (
            <p className="eyebrow">
              <span className="text-text-muted">{'// '}</span>
              {eyebrow}
            </p>
          )}
          <h2 id={`${id}-title`} className="mb-3 text-xl sm:text-2xl md:text-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="max-w-prose text-sm leading-relaxed text-text-muted sm:text-base">
              {subtitle}
            </p>
          )}
        </Reveal>
        <Reveal delay={140} variant="fade-up" duration={750}>
          {children}
        </Reveal>
      </div>
    </section>
  )
}
