export type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  status: 'in-progress' | 'completed' | 'concept'
  links?: {
    demo?: string
    repo?: string
    sito?: string
  }
}

export const projects: Project[] = [
  {
    id: 'pillapp',
    title: 'PillApp',
    description:
      'Applicazione per la gestione dei farmaci durante una terapia farmacologica. Il backend è già operativo con database su Supabase; il frontend è in sviluppo attivo.',
    tags: ['React Native', 'Supabase', '.NET / C#', 'Health Tech'],
    status: 'in-progress',
  },
  {
    id: 'sgamapp',
    title: 'SgamApp',
    description:
      'Sviluppo e manutenzione dell’applicazione web. Interfacce responsive con React e Tailwind CSS, funzionalità frontend moderne.',
    tags: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Git'],
    status: 'in-progress',
    links: {
      sito: 'https://sgamapp.vercel.app',
    },
  },
  {
    id: 'portfolio',
    title: 'Portfolio personale',
    description:
      'Questo sito: portfolio mobile-first in React e TypeScript, con Vite, Tailwind CSS e design minimalista tech.',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    status: 'in-progress',
  },
]
