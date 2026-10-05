import { describe, expect, it } from 'vitest'
import { categories, DRAWING_HEIGHT, DRAWING_WIDTH, projects } from './projects'

describe('proje verisi', () => {
  it('3 kategori ve her kategoride 3 olmak üzere 9 proje var', () => {
    expect(categories.map((c) => c.name)).toEqual(['Konut', 'Ticari', 'İç Mekân'])
    expect(projects).toHaveLength(9)
    for (const category of categories) {
      expect(projects.filter((p) => p.categoryId === category.id)).toHaveLength(3)
    }
  })

  it('id ve slug değerleri benzersiz ve adrese uygun', () => {
    for (const list of [projects, categories]) {
      const ids = list.map((item) => item.id)
      const slugs = list.map((item) => item.slug)
      expect(new Set(ids).size).toBe(list.length)
      expect(new Set(slugs).size).toBe(list.length)
      for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    }
  })

  it('her proje tanımlı bir kategoriye id ile bağlı', () => {
    const ids = new Set(categories.map((c) => c.id))
    for (const project of projects) expect(ids.has(project.categoryId)).toBe(true)
  })

  it('yıl ve tamamlanma tarihi tutarlı, alan pozitif tam sayı', () => {
    for (const project of projects) {
      expect(project.completedAt).toMatch(/^\d{4}-(0[1-9]|1[0-2])$/)
      expect(project.completedAt.startsWith(String(project.year))).toBe(true)
      expect(Number.isInteger(project.areaM2) && project.areaM2 > 0).toBe(true)
    }
  })

  it('metinler dolu: özet tek cümle, açıklama birden fazla paragraf, kapsam boş değil', () => {
    for (const project of projects) {
      expect(project.summary.trim().endsWith('.')).toBe(true)
      expect(project.summary.slice(0, -1)).not.toMatch(/[.!?]\s/)
      expect(project.description.length).toBeGreaterThanOrEqual(2)
      expect(project.scope.length).toBeGreaterThan(0)
    }
  })

  it('her projenin kapağı ve en az 3 galeri görseli var; alt metinler benzersiz', () => {
    const alts = new Set<string>()
    for (const project of projects) {
      expect(project.gallery.length).toBeGreaterThanOrEqual(3)
      for (const image of [project.cover, ...project.gallery]) {
        expect(image.alt.length).toBeGreaterThan(20)
        expect(alts.has(image.alt)).toBe(false)
        alts.add(image.alt)
        expect([image.width, image.height]).toEqual([DRAWING_WIDTH, DRAWING_HEIGHT])
      }
    }
  })

  it('çizim dosyaları beyan edilen boyutlarda', () => {
    const files = import.meta.glob<string>('../assets/projects/*/*.svg', { eager: true, query: '?raw', import: 'default' })
    expect(Object.keys(files)).toHaveLength(projects.length * 4)
    for (const svg of Object.values(files)) {
      expect(svg).toContain(`width="${DRAWING_WIDTH}" height="${DRAWING_HEIGHT}"`)
    }
  })

  it('en az bir öne çıkan proje var', () => {
    expect(projects.some((p) => p.featured)).toBe(true)
  })
})
