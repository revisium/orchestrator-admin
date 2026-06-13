import { describe, expect, it } from 'vitest'
import { system } from 'src/shared/ui/theme/theme'

describe('theme system', () => {
  it('builds a Chakra system with brand tokens', () => {
    expect(system).toBeDefined()
    expect(system.token('colors.brand.500')).toBe('#2944af')
  })
})
