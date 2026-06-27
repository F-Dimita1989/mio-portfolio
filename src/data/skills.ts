export type SkillGroup = {
  category: string
  items: string[]
}

/** Stack in evidenza nella hero — sottoinsieme curato di `skillGroups` */
export const heroStackItems = [
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
] as const

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    items: [
      'React',
      'React Native',
      'Angular',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Vite',
    ],
  },
  {
    category: 'Backend',
    items: ['C# / .NET', 'PHP / Laravel', 'Supabase', 'Docker'],
  },
  {
    category: 'Database',
    items: ['MySQL', 'SQLite'],
  },
  {
    category: 'Tools & Altro',
    items: ['Git', 'GitHub', 'WordPress', 'Python', 'Ollama', 'Render', 'Vercel'],
  },
]
