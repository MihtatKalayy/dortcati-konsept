import { describe, expect, it } from 'vitest'
import { formatDocumentTitle } from './documentTitle'
import { site } from './site'
import { paths, projectDetailPath, projectsPath } from '../routes/paths'

describe('içerik kaynağı', () => {
  it('menü öğelerinin kimlikleri benzersiz', () => {
    const ids = site.nav.map((item) => item.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('menü ve çağrı hedefleri tanımlı bir adrese gider', () => {
    for (const target of [...site.nav.map((item) => item.page), site.primaryCta.page]) {
      expect(paths[target]).toMatch(/^\//)
    }
  })

  it('menü beklenen sırada: Projeler, Hizmetler, Hakkımızda, İletişim', () => {
    expect(site.nav.map((item) => item.page)).toEqual(['projects', 'services', 'about', 'contact'])
  })

  it('konsept ibaresi PROJE.md ile birebir aynı', () => {
    expect(site.conceptNotice).toBe('Bu site bir konsept çalışmadır; gerçek bir firmayı temsil etmez.')
  })
})

describe('formatDocumentTitle', () => {
  it('sayfa başlığını marka adıyla birleştirir', () => {
    expect(formatDocumentTitle('Projeler')).toBe('Projeler | Dörtçatı Mimarlık')
  })

  it('başlık yoksa marka adı ve sloganı kullanır', () => {
    expect(formatDocumentTitle()).toBe(`Dörtçatı Mimarlık — ${site.brand.tagline}`)
  })
})

describe('projectDetailPath', () => {
  it('slug ile proje detay adresini üretir', () => {
    expect(projectDetailPath('bahce-evi')).toBe('/projeler/bahce-evi')
  })

  it('özel karakterleri kodlar', () => {
    expect(projectDetailPath('a b/c')).toBe('/projeler/a%20b%2Fc')
  })
})

describe('projectsPath', () => {
  it('kategori yoksa filtresiz adres', () => {
    expect(projectsPath()).toBe('/projeler')
  })

  it('kategori ile sorgu parametreli adres', () => {
    expect(projectsPath('ic-mekan')).toBe('/projeler?kategori=ic-mekan')
  })
})
