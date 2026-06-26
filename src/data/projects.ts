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
      'Mobile app healthcare per la gestione dei farmaci in terapia. Frontend React Native, backend .NET e database Supabase, con OCR nativo personalizzato e integrazione API AIFA.',
    tags: ['React Native', 'Supabase', '.NET / C#', 'Health Tech', 'OCR'],
    status: 'in-progress',
  },
  {
    id: 'sgamapp',
    title: 'SgamApp',
    description:
      'Sviluppo e manutenzione dell’applicazione web: UI responsive con React e Tailwind CSS, backend C#/.NET su Render, frontend su Vercel, proxy API verso AI e branding visivo del progetto.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'C# / .NET', 'Render', 'Vercel', 'Git'],
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
