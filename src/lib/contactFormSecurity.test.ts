import { describe, expect, it } from 'vitest'
import {
  FIELD_LIMITS,
  isHoneypotTriggered,
  isValidEmail,
  isWithinLimit,
} from './contactFormSecurity'

describe('contactFormSecurity', () => {
  describe('isValidEmail', () => {
    it('accetta email valide', () => {
      expect(isValidEmail('nome@esempio.com')).toBe(true)
      expect(isValidEmail('a.b+c@dominio.it')).toBe(true)
    })

    it('rifiuta email non valide', () => {
      expect(isValidEmail('')).toBe(false)
      expect(isValidEmail('non-email')).toBe(false)
      expect(isValidEmail('@dominio.com')).toBe(false)
      expect(isValidEmail('nome@')).toBe(false)
    })

    it('rifiuta email oltre il limite massimo', () => {
      const longLocal = 'a'.repeat(FIELD_LIMITS.email)
      expect(isValidEmail(`${longLocal}@x.it`)).toBe(false)
    })
  })

  describe('isWithinLimit', () => {
    it('verifica la lunghezza dei campi', () => {
      expect(isWithinLimit('ciao', 10)).toBe(true)
      expect(isWithinLimit('x'.repeat(10), 10)).toBe(true)
      expect(isWithinLimit('x'.repeat(11), 10)).toBe(false)
    })
  })

  describe('isHoneypotTriggered', () => {
    it('rileva compilazione del campo honeypot', () => {
      expect(isHoneypotTriggered('')).toBe(false)
      expect(isHoneypotTriggered('   ')).toBe(false)
      expect(isHoneypotTriggered('bot')).toBe(true)
    })
  })
})
