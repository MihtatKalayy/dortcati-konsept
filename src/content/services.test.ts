import { describe, expect, it } from 'vitest'
import { services } from './services'

describe('hizmet verisi', () => {
  it('4–6 hizmet var', () => {
    expect(services.length).toBeGreaterThanOrEqual(4)
    expect(services.length).toBeLessThanOrEqual(6)
  })

  it('id ve slug benzersiz, slug adrese uygun', () => {
    expect(new Set(services.map((s) => s.id)).size).toBe(services.length)
    expect(new Set(services.map((s) => s.slug)).size).toBe(services.length)
    for (const service of services) expect(service.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })

  it('özet tek cümle, açıklama dolu', () => {
    for (const service of services) {
      expect(service.summary.endsWith('.')).toBe(true)
      expect(service.summary.slice(0, -1)).not.toMatch(/[.!?]\s/)
      expect(service.description.length).toBeGreaterThan(0)
      for (const paragraph of service.description) expect(paragraph.length).toBeGreaterThan(40)
    }
  })

  it('her hizmette 3–5 kapsam maddesi var', () => {
    for (const service of services) {
      expect(service.includes.length).toBeGreaterThanOrEqual(3)
      expect(service.includes.length).toBeLessThanOrEqual(5)
      expect(new Set(service.includes).size).toBe(service.includes.length)
    }
  })
})
