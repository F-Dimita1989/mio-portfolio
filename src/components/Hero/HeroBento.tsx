import {
  EnvelopeClosedIcon,
  ExternalLinkIcon,
  FileTextIcon,
  GitHubLogoIcon,
  RocketIcon,
} from '@radix-ui/react-icons'
import { contacts } from '../../data/contacts'
import { profile } from '../../data/profile'
import { projects } from '../../data/projects'
import { notifyCvDownload } from '../../lib/appToast'
import { cn } from '../../lib/cn'
import { BentoCell } from '../Bento/BentoCell'
import { BentoGrid } from '../Bento/BentoGrid'
import { Reveal } from '../Animate/Reveal'
import { RadixIcon } from '../Icon/RadixIcon'

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

const featuredProject = projects.find((project) => project.id === 'sgamapp') ?? projects[0]
const githubContact = contacts.find((contact) => contact.id === 'github')
const cvContact = contacts.find((contact) => contact.id === 'cv')

export function HeroBento() {
  return (
    <BentoGrid elevated className="sm:grid-cols-2 lg:grid-cols-12">
      <Reveal
        immediate
        className="sm:col-span-2 lg:col-span-7 lg:row-span-2"
        variant="fade-up"
        delay={120}
        duration={750}
      >
        <BentoCell variant="intro" className="min-h-[12rem] justify-center lg:min-h-0">
          <p className="tech-label mb-4">
            <span className="text-accent/80">{'// '}</span>
            intro
          </p>
          <h1
            id="hero-title"
            className="mb-4 bg-linear-to-r from-text-heading to-text bg-clip-text text-3xl text-transparent sm:text-4xl md:text-[2.75rem] lg:text-5xl"
          >
            {profile.name}
          </h1>
          <p className="max-w-prose text-sm leading-relaxed text-text sm:text-base">
            {profile.bio}
          </p>
        </BentoCell>
      </Reveal>

      <Reveal immediate className="lg:col-span-5" variant="fade-up" delay={200} duration={700}>
        <BentoCell variant="accent">
          <p className="tech-label mb-4">
            <span className="text-accent/80">{'// '}</span>
            status
          </p>
          <p className="mb-2 font-mono text-sm text-accent sm:text-base">{profile.role}</p>
          <p className="mb-4 text-sm leading-relaxed text-text-muted">{profile.location}</p>
          <p className="mt-auto font-mono text-[0.6875rem] tracking-wide text-accent-secondary uppercase">
            Full stack in formazione · Frontend-first
          </p>
        </BentoCell>
      </Reveal>

      <Reveal immediate className="lg:col-span-5" variant="fade-up" delay={280} duration={700}>
        <BentoCell variant="links">
          <p className="tech-label mb-4">
            <span className="text-accent/80">{'// '}</span>
            link rapidi
          </p>
          <ul className="flex flex-col gap-2">
            {githubContact && (
              <li>
                <a
                  href={githubContact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bento-link"
                >
                  <RadixIcon icon={GitHubLogoIcon} className="text-accent" />
                  GitHub
                </a>
              </li>
            )}
            {cvContact && (
              <li>
                <a href={cvContact.href} download className="bento-link" onClick={notifyCvDownload}>
                  <RadixIcon icon={FileTextIcon} className="text-accent" />
                  Scarica CV
                </a>
              </li>
            )}
          </ul>
        </BentoCell>
      </Reveal>

      <Reveal
        immediate
        className="sm:col-span-2 lg:col-span-7"
        variant="fade-up"
        delay={360}
        duration={700}
      >
        <BentoCell variant="featured" className="min-h-[10rem]">
          <p className="tech-label mb-3">
            <span className="text-accent/80">{'// '}</span>
            progetto in evidenza
          </p>
          <h2 className="mb-2 text-lg text-text-heading sm:text-xl">{featuredProject.title}</h2>
          <p className="mb-4 flex-1 text-sm leading-relaxed text-text-muted">
            {featuredProject.description}
          </p>
          <ul className="mb-4 flex flex-wrap gap-1.5">
            {featuredProject.tags.slice(0, 4).map((tag, index) => (
              <li key={tag} className={cn('bento-chip', index === 0 && 'bento-chip--accent')}>
                {tag}
              </li>
            ))}
          </ul>
          {featuredProject.links?.sito && (
            <a
              href={featuredProject.links.sito}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary mt-auto !min-h-10 !w-auto gap-1.5 self-start border-border-accent/40 px-3 text-[0.6875rem] motion-safe:hover:border-accent motion-safe:hover:bg-accent-muted"
            >
              <RadixIcon icon={ExternalLinkIcon} size="sm" />
              Visita il sito
            </a>
          )}
        </BentoCell>
      </Reveal>

      <Reveal
        immediate
        className="sm:col-span-2 lg:col-span-5"
        variant="fade-up"
        delay={440}
        duration={700}
      >
        <BentoCell variant="muted">
          <p className="tech-label mb-4">
            <span className="text-accent/80">{'// '}</span>
            stack
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {stackItems.map((item, index) => (
              <li
                key={item}
                className={cn(
                  'bento-chip',
                  (index < 2 || item === 'TypeScript') && 'bento-chip--accent',
                )}
              >
                {item}
              </li>
            ))}
          </ul>
        </BentoCell>
      </Reveal>

      <Reveal immediate className="lg:col-span-6" variant="fade-up" delay={520} duration={650}>
        <BentoCell variant="cta-primary" className="justify-center">
          <a href="#projects" className="btn-primary gap-2 shadow-[0_0_24px_rgb(61_217_238/0.2)]">
            <RadixIcon icon={RocketIcon} />
            Vedi tutti i progetti
          </a>
        </BentoCell>
      </Reveal>

      <Reveal immediate className="lg:col-span-6" variant="fade-up" delay={600} duration={650}>
        <BentoCell variant="cta-secondary" className="justify-center">
          <a href="#contact" className="btn-secondary gap-2">
            <RadixIcon icon={EnvelopeClosedIcon} />
            Contattami
          </a>
        </BentoCell>
      </Reveal>
    </BentoGrid>
  )
}
