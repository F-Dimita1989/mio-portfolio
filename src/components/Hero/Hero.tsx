import { profile } from '../../data/profile'
import { Reveal } from '../Animate/Reveal'
import { HeroBento } from './HeroBento'

export function Hero() {
  return (
    <section
      id="hero"
      className="scroll-section section-divider pt-10 pb-12 sm:pt-12 sm:pb-14 md:pt-16 md:pb-20"
      aria-labelledby="hero-title"
    >
      <div className="container-page flex flex-col gap-8 md:gap-10">
        <Reveal immediate variant="fade-down" delay={60} duration={600}>
          <p className="tech-label">
            <span className="text-accent">{profile.role}</span>
            <span className="text-text-muted"> · portfolio personale</span>
          </p>
        </Reveal>

        <HeroBento />
      </div>
    </section>
  )
}
