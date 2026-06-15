export type NavItem = {
  id: string
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { id: 'projects', label: 'Progetti', href: '#projects' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'journey', label: 'Percorso', href: '#journey' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'contact', label: 'Contatti', href: '#contact' },
]
