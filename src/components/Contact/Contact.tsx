import { contacts } from '../../data/contacts'
import { Reveal } from '../Animate/Reveal'
import { contactIcons } from '../Icon/contactIcons'
import { RadixIcon } from '../Icon/RadixIcon'
import { Section } from '../Section/Section'
import { ContactForm } from './ContactForm'

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="contatti"
      title="Parliamone"
      subtitle="Compila il form o contattami direttamente per collaborazioni, stage o progetti."
    >
      <div className="flex flex-col gap-10 lg:gap-12">
        <Reveal variant="fade-up" duration={750}>
          <ContactForm />
        </Reveal>

        <div>
          <p className="tech-label mb-4">
            <span className="text-text-muted">{'// '}</span>
            altri canali
          </p>
          <ul className="grid grid-cols-1 gap-px border border-accent bg-accent sm:grid-cols-2 lg:grid-cols-4">
            {contacts.map((contact, index) => (
              <Reveal key={contact.id} as="li" delay={index * 70} variant="scale-in" duration={650}>
                <a
                  href={contact.href}
                  className="flex min-h-11 items-start gap-3 bg-bg-card px-4 py-4 transition-[color,transform] duration-200 active:scale-[0.99] active:text-accent motion-safe:hover:text-accent"
                  {...(contact.download ? { download: true } : {})}
                  {...(contact.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <RadixIcon
                    icon={contactIcons[contact.id]}
                    className="mt-0.5 text-accent"
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
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
