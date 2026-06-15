import type { ReactNode } from 'react'
import { MotionReveal } from '../Animate/MotionReveal'
import { MotionStagger } from '../Animate/MotionStagger'
import { TechComment } from '../Animate/TechComment'
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
        <MotionStagger>
          <MotionReveal as="div" variant="fade-up" className="mb-8 md:mb-12">
            <header>
              {eyebrow && (
                <TechComment
                  text={eyebrow}
                  variant="eyebrow"
                  prefixTone="muted"
                  delay={80}
                />
              )}
              <h2 id={`${id}-title`} className="mb-3 text-xl sm:text-2xl md:text-3xl">
                {title}
              </h2>
              {subtitle && (
                <p className="max-w-prose text-sm leading-relaxed text-text-muted sm:text-base">
                  {subtitle}
                </p>
              )}
            </header>
          </MotionReveal>
          <MotionReveal variant="fade-up">{children}</MotionReveal>
        </MotionStagger>
      </div>
    </section>
  )
}
