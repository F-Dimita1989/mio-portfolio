import {
  EnvelopeClosedIcon,
  ExternalLinkIcon,
  FileTextIcon,
  GitHubLogoIcon,
  RocketIcon,
} from '@radix-ui/react-icons'
import { routeHash } from '../../data/routes'
import { scrollToRoute } from '../../lib/scrollToRoute'
import { contacts } from '../../data/contacts'
import { profile } from '../../data/profile'
import { projects } from '../../data/projects'
import { notifyCvDownload } from '../../lib/appToast'
import { MotionReveal } from '../Animate/MotionReveal'
import { MotionStaggerGrid } from '../Animate/MotionStaggerGrid'
import { TechComment } from '../Animate/TechComment'
import { BentoCell } from '../Bento/BentoCell'
import { RadixIcon } from '../Icon/RadixIcon'
import { SkillChip } from '../Icon/SkillChip'

const stackItems = [
  'React',
  'React Native',
  'TypeScript',
  'Angular',
  'Tailwind CSS',
  'C# / .NET',
  'Docker',
  'Supabase',
  'MySQL',
  'Ollama',
]

const featuredProject = projects.find((project) => project.id === 'sgamapp') ?? projects[0]
const githubContact = contacts.find((contact) => contact.id === 'github')
const cvContact = contacts.find((contact) => contact.id === 'cv')

export function HeroBento() {
  return (
    <MotionStaggerGrid
      immediate
      elevated
      className="sm:grid-cols-2 lg:grid-cols-12"
      delayChildren={0.1}
    >
      <MotionReveal className="sm:col-span-2 lg:col-span-7 lg:row-span-2">
        <BentoCell variant="intro" className="min-h-[12rem] justify-center lg:min-h-0">
          <TechComment text="intro" className="mb-4" textTone="accent" immediate delay={80} />
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
      </MotionReveal>

      <MotionReveal className="lg:col-span-5">
        <BentoCell variant="accent">
          <TechComment text="status" className="mb-4" textTone="accent" immediate delay={80} />
          <p className="mb-2 font-mono text-sm text-accent sm:text-base">{profile.role}</p>
          <p className="mb-4 text-sm leading-relaxed text-text-muted">{profile.location}</p>
          <p className="mt-auto font-mono text-[0.6875rem] tracking-wide text-accent-secondary uppercase">
            React/TS · C#/.NET · UX/UI
          </p>
        </BentoCell>
      </MotionReveal>

      <MotionReveal className="lg:col-span-5">
        <BentoCell variant="links">
          <TechComment text="link rapidi" className="mb-4" textTone="accent" immediate delay={80} />
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
                <a
                  href={cvContact.href}
                  download="Filippo_Dimita_CV.pdf"
                  className="bento-link"
                  onClick={notifyCvDownload}
                >
                  <RadixIcon icon={FileTextIcon} className="text-accent" />
                  Scarica CV
                </a>
              </li>
            )}
          </ul>
        </BentoCell>
      </MotionReveal>

      <MotionReveal className="sm:col-span-2 lg:col-span-7">
        <BentoCell variant="featured" className="min-h-[10rem]">
          <TechComment
            text="progetto in evidenza"
            className="mb-3"
            textTone="accent"
            immediate
            delay={80}
          />
          <h2 className="mb-2 text-lg text-text-heading sm:text-xl">{featuredProject.title}</h2>
          <p className="mb-4 flex-1 text-sm leading-relaxed text-text-muted">
            {featuredProject.description}
          </p>
          <ul className="mb-4 flex flex-wrap gap-1.5 bento-chip-list">
            {featuredProject.tags.slice(0, 4).map((tag, index) => (
              <li key={tag}>
                <SkillChip label={tag} accent={index === 0} />
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
      </MotionReveal>

      <MotionReveal className="sm:col-span-2 lg:col-span-5">
        <BentoCell variant="muted">
          <TechComment text="stack" className="mb-4" textTone="accent" immediate delay={80} />
          <ul className="flex flex-wrap gap-1.5 bento-chip-list">
            {stackItems.map((item, index) => (
              <li key={item}>
                <SkillChip
                  label={item}
                  accent={index < 2 || item === 'TypeScript'}
                />
              </li>
            ))}
          </ul>
        </BentoCell>
      </MotionReveal>

      <MotionReveal className="lg:col-span-6">
        <BentoCell variant="cta-primary" className="justify-center">
          <a
            href={routeHash('progetti')}
            className="btn-primary gap-2 shadow-[0_0_24px_rgb(61_217_238/0.2)]"
            onClick={(event) => {
              event.preventDefault()
              scrollToRoute('progetti')
            }}
          >
            <RadixIcon icon={RocketIcon} />
            Vedi tutti i progetti
          </a>
        </BentoCell>
      </MotionReveal>

      <MotionReveal className="lg:col-span-6">
        <BentoCell variant="cta-secondary" className="justify-center">
          <a
            href={routeHash('contatti')}
            className="btn-secondary gap-2"
            onClick={(event) => {
              event.preventDefault()
              scrollToRoute('contatti')
            }}
          >
            <RadixIcon icon={EnvelopeClosedIcon} />
            Contattami
          </a>
        </BentoCell>
      </MotionReveal>
    </MotionStaggerGrid>
  )
}
