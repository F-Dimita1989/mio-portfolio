import { profile } from '../../data/profile'
import { routeHash } from '../../data/routes'
import { scrollToRoute } from '../../lib/scrollToRoute'
import { Reveal } from '../Animate/Reveal'
import { Logo } from '../Logo/Logo'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 flex min-h-14 items-center border-t border-border py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
      <Reveal variant="fade-in" duration={600} className="w-full">
        <div className="footer-inner container-page">
          <a
            href={routeHash('home')}
            className="footer-brand touch-target group flex items-center gap-2.5 transition-colors duration-200 active:text-accent motion-safe:hover:text-accent"
            onClick={(event) => {
              event.preventDefault()
              scrollToRoute('home')
            }}
          >
            <Logo size="sm" />
            <span>© {year} {profile.name}</span>
          </a>
          <p className="footer-meta">
            {profile.role} — {profile.location}
          </p>
        </div>
      </Reveal>
    </footer>
  )
}
