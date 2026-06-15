export type TimelineItem = {
  id: string
  period: string
  title: string
  organization?: string
  description?: string
  highlights?: string[]
}

export const educationTimeline: TimelineItem[] = [
  {
    id: 'its-apulia',
    period: '2024 – 2026',
    title: 'Diplomando — Sviluppo web e software',
    organization: 'ITS Academy Apulia Digital',
  },
  {
    id: 'rosa-luxemburg',
    period: '2003 – 2008',
    title: 'Diploma Tecnico della Grafica Pubblicitaria',
    organization: 'I.P.S.S. Rosa Luxemburg',
    description: 'Voto finale: 65/100',
  },
]

export const experienceTimeline: TimelineItem[] = [
  {
    id: 'techloop',
    period: '01/2026 – 05/2026',
    title: 'Stage — Sviluppo software',
    organization: 'Techloop S.R.L. — Via Mar Grande, 32, 74121 Taranto',
    highlights: [
      'Sistemi MQTT (HomeAssistant/OpenTherm)',
      'Creazione interfacce con modello IA in locale (Ollama)',
    ],
  },
  {
    id: 'sgamapp',
    period: '2025 – Presente',
    title: 'Web Developer — SgamApp',
    highlights: [
      'Sviluppo e manutenzione dell’applicazione web',
      'Creazione interfacce responsive con React e Tailwind CSS',
      'Implementazione funzionalità frontend moderne e ottimizzazione UX',
      'Gestione database MySQL/SQLite',
      'Utilizzo di Git e GitHub per il versionamento del progetto',
    ],
  },
]
