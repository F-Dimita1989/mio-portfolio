export const FIELD_LIMITS = {
  name: 80,
  email: 254,
  subject: 120,
  message: 2000,
} as const

export const SUBMIT_COOLDOWN_MS = 60_000

const COOLDOWN_KEY = 'fd-contact-last-submit'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email) && email.length <= FIELD_LIMITS.email
}

export function isWithinLimit(value: string, limit: number): boolean {
  return value.length <= limit
}

export function getSubmitCooldownRemainingMs(): number {
  if (typeof window === 'undefined') return 0

  const last = sessionStorage.getItem(COOLDOWN_KEY)
  if (!last) return 0

  const remaining = SUBMIT_COOLDOWN_MS - (Date.now() - Number(last))
  return remaining > 0 ? remaining : 0
}

export function markContactSubmitted(): void {
  sessionStorage.setItem(COOLDOWN_KEY, String(Date.now()))
}

export function isHoneypotTriggered(value: string): boolean {
  return value.trim().length > 0
}
