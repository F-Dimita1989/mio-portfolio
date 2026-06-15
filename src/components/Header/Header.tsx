import { useEffect, useState } from 'react'
import { navItems } from '../../data/navigation'
import { profile } from '../../data/profile'
import { cn } from '../../lib/cn'
import { Logo } from '../Logo/Logo'

const bannerHeaderSrc = encodeURI('/ChatGPT Image 15 giu 2026, 12_06_05.png')

const sectionIds = navItems.map((item) => item.href.replace('#', ''))

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const getActiveSection = () => {
      const offset = 96
      const scrollY = window.scrollY + offset
      const hero = document.getElementById('hero')

      if (hero && scrollY < hero.offsetTop + hero.offsetHeight * 0.55) {
        return ''
      }

      let current = ''
      for (const id of sectionIds) {
        const section = document.getElementById(id)
        if (section && section.offsetTop <= scrollY) {
          current = id
        }
      }

      return current
    }

    const onScroll = () => {
      setScrolled(window.scrollY > 12)
      setActiveSection(getActiveSection())
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="relative z-[100]">
      <div className="relative w-full overflow-hidden border-b border-border bg-bg-banner lg:aspect-[1915/657]">
        <img
          src={bannerHeaderSrc}
          alt="Banner hero Filippo Dimita"
          width={1915}
          height={821}
          className="animate-banner-enter block h-auto w-full lg:absolute lg:inset-0 lg:h-full lg:object-cover lg:object-center"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </div>

      <div
        className={cn(
          'animate-nav-enter sticky top-0 z-20 border-b border-border bg-bg/95 backdrop-blur-sm transition-colors duration-200',
          scrolled && 'border-border-accent/50 bg-bg',
        )}
      >
        <div className="container-page relative flex min-h-12 items-center md:grid md:min-h-14 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6">
          <a
            href="#hero"
            className="touch-target group flex shrink-0 items-center gap-2 px-1 py-1 md:col-start-1 md:row-start-1 md:justify-self-start"
            onClick={closeMenu}
          >
            <Logo size="sm" />
            <span className="flex min-w-0 flex-col justify-center leading-tight">
              <span className="truncate text-xs font-medium text-text-heading sm:text-sm">
                {profile.name}
              </span>
              <span className="font-mono text-[0.625rem] tracking-wide text-text-muted sm:text-[0.6875rem]">
                {profile.role}
              </span>
            </span>
          </a>

          <button
            type="button"
            className={cn(
              'touch-target ml-auto shrink-0 rounded-sm border border-border px-2 transition-colors duration-200 md:col-start-3 md:row-start-1 md:hidden md:justify-self-end',
              menuOpen ? 'border-accent text-accent' : 'text-text-muted',
            )}
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>

          <nav
            id="site-nav"
            className={cn(
              'absolute top-full right-0 left-0 overflow-hidden border-b border-border bg-bg transition-all duration-200 md:static md:col-start-2 md:row-start-1 md:justify-self-center md:overflow-visible md:border-0 md:bg-transparent',
              menuOpen
                ? 'visible max-h-[min(24rem,calc(100dvh-5rem))] translate-y-0 opacity-100'
                : 'invisible max-h-0 -translate-y-1 opacity-0 md:visible md:max-h-none md:translate-y-0 md:opacity-100',
            )}
            aria-label="Navigazione principale"
          >
            <ul className="flex flex-col px-3 py-3 md:flex-row md:items-center md:gap-0 md:p-0">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id

                return (
                  <li key={item.id} className="w-full md:w-auto">
                    <a
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'relative inline-flex min-h-11 w-full items-center px-3 font-mono text-xs tracking-wide uppercase transition-[transform,opacity,color] duration-300 ease-out',
                        'max-md:translate-y-2 max-md:opacity-0',
                        menuOpen && 'max-md:translate-y-0 max-md:opacity-100',
                        'md:translate-y-0 md:opacity-100 md:transition-colors md:duration-200',
                        'md:after:absolute md:after:bottom-0 md:after:left-3 md:after:h-px md:after:w-[calc(100%-1.5rem)] md:after:origin-left md:after:scale-x-0 md:after:bg-accent md:after:transition-transform md:after:duration-300',
                        'active:text-accent motion-safe:md:hover:text-text-heading motion-safe:md:hover:after:scale-x-100',
                        isActive ? 'text-accent' : 'text-text-muted',
                      )}
                      style={
                        menuOpen
                          ? { transitionDelay: `${100 + index * 55}ms` }
                          : { transitionDelay: '0ms' }
                      }
                      onClick={closeMenu}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>

      {menuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-10 bg-bg/70 md:hidden"
          aria-label="Chiudi menu"
          onClick={closeMenu}
        />
      )}
    </header>
  )
}
