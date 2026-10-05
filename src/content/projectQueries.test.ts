import { describe, expect, it } from 'vitest'
import {
  countProjectsByCategory,
  filterProjectsByCategory,
  findCategoryBySlug,
  findProjectBySlug,
  getAdjacentProjects,
  sortProjects,
} from './projectQueries'
import type { Project } from './types'

const image = { src: '/x.svg', alt: 'x', caption: 'x', width: 1200, height: 800 }

function project(id: string, overrides: Partial<Project> = {}): Project {
  return {
    id,
    slug: `slug-${id}`,
    name: `Proje ${id}`,
    categoryId: 'cat-a',
    year: 2022,
    completedAt: '2022-01',
    location: 'Bir yer',
    areaM2: 100,
    scope: ['Mimari tasarım'],
    summary: 'Özet',
    description: ['Açıklama'],
    cover: image,
    gallery: [image, image, image],
    featured: false,
    ...overrides,
  }
}

const a = project('a', { categoryId: 'cat-a', completedAt: '2021-03' })
const b = project('b', { categoryId: 'cat-b', completedAt: '2024-01' })
const c = project('c', { categoryId: 'cat-a', completedAt: '2023-07', featured: true })
const d = project('d', { categoryId: 'cat-b', completedAt: '2020-12', featured: true })
const list = [a, b, c, d]

describe('filterProjectsByCategory', () => {
  it('yalnızca verilen kategorinin projelerini sırayı koruyarak döndürür', () => {
    expect(filterProjectsByCategory(list, 'cat-a').map((p) => p.id)).toEqual(['a', 'c'])
  })

  it('null ile tüm projeleri yeni bir dizi olarak döndürür', () => {
    const result = filterProjectsByCategory(list, null)
    expect(result).toEqual(list)
    expect(result).not.toBe(list)
  })

  it('bilinmeyen kategoride boş liste döndürür', () => {
    expect(filterProjectsByCategory(list, 'cat-yok')).toEqual([])
  })
})

describe('sortProjects', () => {
  it('önce öne çıkanları, sonra yeniden eskiye sıralar', () => {
    expect(sortProjects(list).map((p) => p.id)).toEqual(['c', 'd', 'b', 'a'])
  })

  it('aynı tarihte ada göre Türkçe sıralar', () => {
    const x = project('x', { name: 'Çarşı', completedAt: '2022-01' })
    const y = project('y', { name: 'Cadde', completedAt: '2022-01' })
    const z = project('z', { name: 'Dere', completedAt: '2022-01' })
    expect(sortProjects([z, x, y]).map((p) => p.name)).toEqual(['Cadde', 'Çarşı', 'Dere'])
  })

  it('girdiyi değiştirmez', () => {
    const input = [a, b]
    sortProjects(input)
    expect(input).toEqual([a, b])
  })
})

describe('findProjectBySlug', () => {
  it('slug ile projeyi bulur', () => {
    expect(findProjectBySlug(list, 'slug-b')?.id).toBe('b')
  })

  it('olmayan slug için undefined döndürür', () => {
    expect(findProjectBySlug(list, 'yok')).toBeUndefined()
  })
})

describe('findCategoryBySlug', () => {
  const categories = [
    { id: 'cat-a', slug: 'konut', name: 'Konut' },
    { id: 'cat-b', slug: 'ticari', name: 'Ticari' },
  ]

  it('slug ile kategoriyi bulur', () => {
    expect(findCategoryBySlug(categories, 'ticari')?.id).toBe('cat-b')
  })

  it('parametre yoksa veya geçersizse undefined döndürür', () => {
    expect(findCategoryBySlug(categories, null)).toBeUndefined()
    expect(findCategoryBySlug(categories, 'KONUT')).toBeUndefined()
    expect(findCategoryBySlug(categories, '')).toBeUndefined()
  })
})

describe('countProjectsByCategory', () => {
  it('kategori id’sine göre sayar', () => {
    const counts = countProjectsByCategory(list)
    expect(counts.get('cat-a')).toBe(2)
    expect(counts.get('cat-b')).toBe(2)
    expect(counts.get('cat-yok')).toBeUndefined()
  })
})

describe('getAdjacentProjects', () => {
  const ordered = sortProjects(list) // c, d, b, a

  it('ortadaki projenin öncesini ve sonrasını döndürür', () => {
    const adjacent = getAdjacentProjects(ordered, 'd')
    expect(adjacent?.previous.id).toBe('c')
    expect(adjacent?.next.id).toBe('b')
  })

  it('uçlarda döngüsel çalışır', () => {
    expect(getAdjacentProjects(ordered, 'c')?.previous.id).toBe('a')
    expect(getAdjacentProjects(ordered, 'a')?.next.id).toBe('c')
  })

  it('eşleştirmeyi ad veya sıra ile değil id ile yapar', () => {
    const twin = project('e', { name: 'Proje d', slug: 'slug-d' })
    const adjacent = getAdjacentProjects([d, twin, a], 'e')
    expect(adjacent?.previous.id).toBe('d')
    expect(adjacent?.next.id).toBe('a')
  })

  it('olmayan id veya tek projelik listede null döndürür', () => {
    expect(getAdjacentProjects(ordered, 'yok')).toBeNull()
    expect(getAdjacentProjects([a], 'a')).toBeNull()
  })
})
