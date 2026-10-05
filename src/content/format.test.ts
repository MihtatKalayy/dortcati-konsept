import { describe, expect, it } from 'vitest'
import { formatArea } from './format'

describe('formatArea', () => {
  it('binlik ayıracı olarak nokta kullanır', () => {
    expect(formatArea(1180)).toBe('1.180\u00a0m²')
    expect(formatArea(2400)).toBe('2.400\u00a0m²')
  })

  it('küçük sayılarda ayıraç kullanmaz', () => {
    expect(formatArea(68)).toBe('68\u00a0m²')
  })
})
