import { describe, expect, it } from 'vitest'
import { resolveRouteKey } from './scrollToRoute'

describe('scrollToRoute', () => {
  describe('resolveRouteKey', () => {
    it('risolve gli hash correnti', () => {
      expect(resolveRouteKey('#home')).toBe('home')
      expect(resolveRouteKey('#progetti')).toBe('progetti')
      expect(resolveRouteKey('#stack')).toBe('stack')
      expect(resolveRouteKey('#percorso')).toBe('percorso')
      expect(resolveRouteKey('#profilo')).toBe('profilo')
      expect(resolveRouteKey('#contatti')).toBe('contatti')
    })

    it('supporta hash legacy in inglese', () => {
      expect(resolveRouteKey('#hero')).toBe('home')
      expect(resolveRouteKey('#projects')).toBe('progetti')
      expect(resolveRouteKey('#skills')).toBe('stack')
      expect(resolveRouteKey('#journey')).toBe('percorso')
      expect(resolveRouteKey('#about')).toBe('profilo')
      expect(resolveRouteKey('#contact')).toBe('contatti')
    })

    it('è case-insensitive', () => {
      expect(resolveRouteKey('#PROGETTI')).toBe('progetti')
      expect(resolveRouteKey('#Contact')).toBe('contatti')
    })

    it('restituisce null per hash sconosciuti o vuoti', () => {
      expect(resolveRouteKey('')).toBe(null)
      expect(resolveRouteKey('#sconosciuto')).toBe(null)
    })
  })
})
