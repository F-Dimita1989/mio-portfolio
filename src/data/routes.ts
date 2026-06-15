export type RouteKey = 'home' | 'progetti' | 'stack' | 'percorso' | 'profilo' | 'contatti'

export type Route = {
  key: RouteKey
  id: string
  hash: string
  label: string
}

export const ROUTES: Record<RouteKey, Route> = {
  home: { key: 'home', id: 'home', hash: '#home', label: 'Home' },
  progetti: { key: 'progetti', id: 'progetti', hash: '#progetti', label: 'Progetti' },
  stack: { key: 'stack', id: 'stack', hash: '#stack', label: 'Stack' },
  percorso: { key: 'percorso', id: 'percorso', hash: '#percorso', label: 'Percorso' },
  profilo: { key: 'profilo', id: 'profilo', hash: '#profilo', label: 'Chi sono' },
  contatti: { key: 'contatti', id: 'contatti', hash: '#contatti', label: 'Contatti' },
}

export const NAV_ROUTES: Route[] = [
  ROUTES.progetti,
  ROUTES.stack,
  ROUTES.percorso,
  ROUTES.profilo,
  ROUTES.contatti,
]

export type NavItem = Pick<Route, 'id' | 'label' | 'key'> & { href: string }

export const navItems: NavItem[] = NAV_ROUTES.map((route) => ({
  id: route.id,
  key: route.key,
  label: route.label,
  href: route.hash,
}))

export function routeHash(key: RouteKey): string {
  return ROUTES[key].hash
}

export function routeId(key: RouteKey): string {
  return ROUTES[key].id
}
