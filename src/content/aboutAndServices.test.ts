import { describe, expect, it } from 'vitest'
import { faqItems } from './faq'
import { processSteps } from './process'
import { site } from './site'
import { initials, team } from './team'

const unique = (values: string[]) => new Set(values).size === values.length
// Kesin süre, fiyat veya garanti çağrıştıran ifadeler
const forbidden = /\d+\s*(gün|hafta|ay|yıl)|₺|\bTL\b|[Gg]aranti|[Kk]esin/

describe('çalışma süreci', () => {
  it('4–5 adım, benzersiz id', () => {
    expect(processSteps.length).toBeGreaterThanOrEqual(4)
    expect(processSteps.length).toBeLessThanOrEqual(5)
    expect(unique(processSteps.map((s) => s.id))).toBe(true)
  })
})

describe('sık sorulan sorular', () => {
  it('5 soru, benzersiz id, soru işaretiyle biter', () => {
    expect(faqItems).toHaveLength(5)
    expect(unique(faqItems.map((f) => f.id))).toBe(true)
    for (const item of faqItems) expect(item.question.endsWith('?')).toBe(true)
  })

  it('cevaplarda kesin süre, fiyat veya garanti yok', () => {
    for (const item of faqItems) for (const p of item.answer) expect(p).not.toMatch(forbidden)
  })
})

describe('ekip', () => {
  it('4 kurgusal üye, benzersiz id, dolu alanlar', () => {
    expect(team).toHaveLength(4)
    expect(unique(team.map((m) => m.id))).toBe(true)
    for (const m of team) expect(m.name && m.role && m.bio).toBeTruthy()
  })

  it('kurgusal ekip notu var', () => {
    expect(site.about.team.note.toLocaleLowerCase('tr')).toContain('kurgusal')
  })

  it('baş harfleri Türkçe büyük harfle üretir', () => {
    expect(initials('ece tunalı')).toBe('ET')
    expect(initials('ilker  ışık')).toBe('İI')
  })
})

describe('Hakkımızda ilkeleri', () => {
  it('3–4 ilke, benzersiz id', () => {
    const items = site.about.principles.items
    expect(items.length).toBeGreaterThanOrEqual(3)
    expect(items.length).toBeLessThanOrEqual(4)
    expect(unique(items.map((i) => i.id))).toBe(true)
  })
})

describe('sayfa meta bilgileri', () => {
  it('Hakkımızda ve Hizmetler açıklamaları sayfaya özgü ve farklı', () => {
    const descriptions = [site.home.metaDescription, site.about.metaDescription, site.servicesPage.metaDescription]
    expect(unique(descriptions)).toBe(true)
  })
})
