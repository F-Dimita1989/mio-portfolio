import { profile } from '../../data/profile'
import { Reveal } from '../Animate/Reveal'

const stackItems = [
  'React',
  'React Native',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Vite',
  'Tailwind CSS',
  'C# / .NET',
  'Supabase',
  'MySQL',
]

export function Hero() {
  return (
    <section
      id="hero"
      className="scroll-section section-divider pt-10 pb-12 sm:pt-12 sm:pb-14 md:pt-16 md:pb-20"
      aria-labelledby="hero-title"
    >
      <div className="container-page flex flex-col gap-10 md:gap-14">
        <div className="min-w-0 max-w-3xl">
          <Reveal immediate variant="fade-down" delay={80} duration={600}>
            <p className="tech-label mb-6">
              <span className="text-accent">{profile.role}</span>
              <span className="text-text-muted"> · {profile.location}</span>
            </p>
          </Reveal>

          <Reveal immediate variant="fade-up" delay={180} duration={800}>
            <h1 id="hero-title" className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              {profile.name}
            </h1>
          </Reveal>

          <Reveal immediate variant="fade-up" delay={320} duration={750}>
            <p className="mb-8 max-w-prose text-sm leading-relaxed text-text-muted sm:text-base">
              {profile.bio}
            </p>
          </Reveal>

          <Reveal immediate variant="fade-up" delay={460} duration={700}>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#projects" className="btn-primary">
                Progetti
              </a>
              <a href="#contact" className="btn-secondary">
                Contatti
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal immediate variant="fade-up" delay={560} duration={700}>
          <div className="border-t border-border pt-6">
            <p className="tech-label mb-4">
              <span className="text-text-muted">{'// '}</span>
              stack
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {stackItems.map((item, index) => (
                <Reveal
                  key={item}
                  as="li"
                  immediate
                  variant="fade-in"
                  delay={640 + index * 90}
                  duration={500}
                  className="font-mono text-xs text-text sm:text-sm"
                >
                  {item}
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
