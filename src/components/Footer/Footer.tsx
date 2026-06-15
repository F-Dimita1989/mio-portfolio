import { profile } from '../../data/profile'
import { Reveal } from '../Animate/Reveal'
import { Logo } from '../Logo/Logo'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 flex min-h-14 items-center border-t border-border py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:min-h-16 sm:py-5">
      <Reveal variant="fade-in" duration={600} className="w-full">
        <div className="container-page flex w-full flex-col gap-4 font-mono text-[0.6875rem] leading-none tracking-wide text-text-muted sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <a
            href="#hero"
            className="touch-target group flex items-center gap-2.5 transition-colors duration-200 active:text-accent motion-safe:hover:text-accent"
          >
            <Logo size="sm" />
            <span>© {year} {profile.name}</span>
          </a>
          <p className="sm:text-right">
            {profile.role} — {profile.location}
          </p>
        </div>
      </Reveal>
    </footer>
  )
}
