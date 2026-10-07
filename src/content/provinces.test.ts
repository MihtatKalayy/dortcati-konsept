import { describe, expect, it } from 'vitest'
import { provinces, provincesByName } from './provinces'

describe('il listesi', () => {
  it('81 il, kodlar 01–81 ve benzersiz', () => {
    expect(provinces).toHaveLength(81)
    expect(provinces.map((p) => p.code)).toEqual(Array.from({ length: 81 }, (_, i) => String(i + 1).padStart(2, '0')))
    expect(new Set(provinces.map((p) => p.name)).size).toBe(81)
  })

  it('bilinen plaka kodları', () => {
    const byCode = new Map(provinces.map((p) => [p.code, p.name]))
    expect(byCode.get('06')).toBe('Ankara')
    expect(byCode.get('34')).toBe('İstanbul')
    expect(byCode.get('35')).toBe('İzmir')
    expect(byCode.get('81')).toBe('Düzce')
  })

  it('alfabetik liste Türkçe sıralı ve aynı illeri içerir', () => {
    expect(provincesByName).toHaveLength(81)
    expect(provincesByName[0].name).toBe('Adana')
    const names = provincesByName.map((p) => p.name)
    expect(names.indexOf('Çanakkale')).toBeGreaterThan(names.indexOf('Bursa'))
    expect(names.indexOf('Çanakkale')).toBeLessThan(names.indexOf('Denizli'))
    expect(names.indexOf('Iğdır')).toBeLessThan(names.indexOf('Isparta'))
    expect(names.indexOf('Isparta')).toBeLessThan(names.indexOf('İstanbul'))
  })
})
