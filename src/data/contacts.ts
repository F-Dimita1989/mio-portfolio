import { contactEmail } from './contactConfig'

export type ContactLink = {
  id: string
  label: string
  value: string
  href: string
  external?: boolean
  download?: boolean | string
}

export const contacts: ContactLink[] = [
  {
    id: 'phone',
    label: 'Telefono',
    value: '+39 327 197 3302',
    href: 'tel:+393271973302',
  },
  {
    id: 'email',
    label: 'Email',
    value: contactEmail,
    href: `mailto:${contactEmail}`,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'F-Dimita1989',
    href: 'https://github.com/F-Dimita1989',
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'filippo-dimita',
    href: 'https://www.linkedin.com/in/filippo-dimita-web89/',
    external: true,
  },
  {
    id: 'cv',
    label: 'CV',
    value: 'Scarica PDF',
    href: '/cv/Filippo_Dimita_CV.pdf',
    external: true,
  },
]
