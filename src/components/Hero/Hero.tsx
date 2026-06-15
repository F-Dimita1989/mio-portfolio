import { profile } from '../../data/profile'
import { routeId } from '../../data/routes'
import { Reveal } from '../Animate/Reveal'
import { TechComment } from '../Animate/TechComment'
import { HeroBento } from './HeroBento'

export function Hero() {
  return (
    <section
      id={routeId('home')}
      className="scroll-section section-divider pt-10 pb-12 sm:pt-12 sm:pb-14 md:pt-16 md:pb-20"
      aria-labelledby="hero-title"
    >
      <div className="container-page flex flex-col gap-8 md:gap-10">
        <Reveal immediate variant="fade-down" delay={60} duration={600}>
          <TechComment
            text={profile.role}
            suffix=" · portfolio personale"
            textTone="accent"
            immediate
            delay={60}
          />
        </Reveal>

        <HeroBento />
      </div>
    </section>
  )
}
