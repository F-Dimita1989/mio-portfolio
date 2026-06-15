import { routeId } from '../../data/routes'
import { contacts } from '../../data/contacts'
import { notifyCvDownload } from '../../lib/appToast'
import { MotionReveal } from '../Animate/MotionReveal'
import { MotionStaggerGrid } from '../Animate/MotionStaggerGrid'
import { Reveal } from '../Animate/Reveal'
import { TechComment } from '../Animate/TechComment'
import { BentoCell } from '../Bento/BentoCell'
import { contactIcons } from '../Icon/contactIcons'
import { RadixIcon } from '../Icon/RadixIcon'
import { Section } from '../Section/Section'
import { ContactForm } from './ContactForm'

export function Contact() {
  return (
    <Section
      id={routeId('contatti')}
      eyebrow="contatti"
      title="Parliamone"
      subtitle="Compila il form o contattami direttamente per collaborazioni, stage o progetti."
    >
      <div className="flex flex-col gap-10 lg:gap-12">
        <Reveal variant="fade-up" duration={750}>
          <ContactForm />
        </Reveal>

        <div>
          <TechComment text="altri canali" className="mb-4" prefixTone="muted" delay={80} />
          <MotionStaggerGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {contacts.map((contact) => (
              <MotionReveal key={contact.id} as="li" className="list-none" variant="scale-in">
                <BentoCell
                  as="a"
                  variant="links"
                  href={contact.href}
                  className="min-h-full"
                  {...(contact.download ? { download: true } : {})}
                  {...(contact.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  {...(contact.id === 'cv' ? { onClick: notifyCvDownload } : {})}
                >
                  <RadixIcon
                    icon={contactIcons[contact.id]}
                    className="text-accent"
                    size="md"
                  />
                  <span className="flex min-w-0 flex-col justify-center gap-1">
                    <span className="font-mono text-[0.6875rem] tracking-wide text-text-muted uppercase">
                      {contact.label}
                    </span>
                    <span className="text-sm break-all text-text-heading">
                      {contact.value}
                    </span>
                  </span>
                </BentoCell>
              </MotionReveal>
            ))}
          </MotionStaggerGrid>
        </div>
      </div>
    </Section>
  )
}
