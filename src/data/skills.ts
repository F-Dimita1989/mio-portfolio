export type SkillGroup = {
  category: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    items: [
      'React',
      'React Native',
      'Next.js',
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
    items: ['C# / .NET', 'Supabase'],
  },
  {
    category: 'Database',
    items: ['MySQL', 'SQLite'],
  },
  {
    category: 'Tools & Altro',
    items: ['Git', 'GitHub', 'WordPress', 'Python'],
  },
]
