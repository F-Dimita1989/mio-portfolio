import { ROUTES, type RouteKey, routeHash, routeId } from '../data/routes'

const LEGACY_HASH_TO_KEY: Record<string, RouteKey> = {
  '#hero': 'home',
  '#projects': 'progetti',
  '#skills': 'stack',
  '#journey': 'percorso',
  '#about': 'profilo',
  '#contact': 'contatti',
}

export function resolveRouteKey(hash: string): RouteKey | null {
  if (!hash) return null

  const normalized = hash.toLowerCase()
  const legacy = LEGACY_HASH_TO_KEY[normalized]
  if (legacy) return legacy

  const match = Object.values(ROUTES).find((route) => route.hash === normalized)
  return match?.key ?? null
}

export function getScrollOffset(): number {
  const varName = window.matchMedia('(min-width: 768px)').matches
    ? '--spacing-nav-md'
    : '--spacing-nav'
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()

  if (value.endsWith('rem')) return parseFloat(value) * 16
  if (value.endsWith('px')) return parseFloat(value)
  return 48
}

export function scrollToRoute(key: RouteKey, behavior: ScrollBehavior = 'smooth') {
  const element = document.getElementById(routeId(key))
  if (!element) return

  const top = element.getBoundingClientRect().top + window.scrollY - getScrollOffset()
  window.scrollTo({ top: Math.max(0, top), behavior })

  const hash = routeHash(key)
  if (window.location.hash !== hash) {
    history.pushState(null, '', hash)
  }
}

export function syncRouteFromHash(behavior: ScrollBehavior = 'auto') {
  const key = resolveRouteKey(window.location.hash)
  if (key) scrollToRoute(key, behavior)
}
