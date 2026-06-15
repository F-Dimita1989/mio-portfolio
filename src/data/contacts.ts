import { contactEmail } from './contactConfig'

export type ContactLink = {
  id: string
  label: string
  value: string
  href: string
  external?: boolean
  download?: boolean
}

export const contacts: ContactLink[] = [
  {
    id: 'email',
    label: 'Email',
    value: contactEmail,
    href: `mailto:${contactEmail}`,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/F-Dimita1989',
    href: 'https://github.com/F-Dimita1989',
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'filippo-dimita-web89',
    href: 'https://www.linkedin.com/in/filippo-dimita-web89/',
    external: true,
  },
  {
    id: 'cv',
    label: 'CV',
    value: 'Scarica il mio CV',
    href: '/Filippo_Dimita_CV_Cat_Prot.pdf',
    download: true,
  },
]
