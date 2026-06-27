import { describe, expect, it } from 'vitest'
import { heroStackItems, skillGroups } from './skills'

describe('skills', () => {
  it('heroStackItems è un sottoinsieme di skillGroups', () => {
    const catalog = new Set(skillGroups.flatMap((group) => group.items))

    for (const item of heroStackItems) {
      expect(catalog.has(item), `"${item}" manca in skillGroups`).toBe(true)
    }
  })
})
