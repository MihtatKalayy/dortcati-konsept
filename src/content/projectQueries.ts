import type { Project, ProjectCategory } from './types'

/** Kategoriye göre süzer; kategori yoksa (null) tüm projeleri döndürür. Sırayı korur. */
export function filterProjectsByCategory(list: readonly Project[], categoryId: string | null): Project[] {
  return categoryId === null ? [...list] : list.filter((project) => project.categoryId === categoryId)
}

/** Önce öne çıkanlar, sonra yeniden eskiye; eşitlikte ada göre (Türkçe). Girdiyi değiştirmez. */
export function sortProjects(list: readonly Project[]): Project[] {
  return [...list].sort(
    (a, b) =>
      Number(b.featured) - Number(a.featured) ||
      b.completedAt.localeCompare(a.completedAt) ||
      a.name.localeCompare(b.name, 'tr'),
  )
}

/** Öne çıkan projelerden ilk `count` tanesi, sortProjects sırasıyla. */
export function getFeaturedProjects(list: readonly Project[], count: number): Project[] {
  return sortProjects(list)
    .filter((project) => project.featured)
    .slice(0, count)
}

export function findProjectBySlug(list: readonly Project[], slug: string): Project | undefined {
  return list.find((project) => project.slug === slug)
}

/** Adresteki kategori parametresine karşılık gelen kategori; geçersizse undefined ("Tümü"). */
export function findCategoryBySlug(
  list: readonly ProjectCategory[],
  slug: string | null,
): ProjectCategory | undefined {
  return slug === null ? undefined : list.find((category) => category.slug === slug)
}

export function countProjectsByCategory(list: readonly Project[]): Map<string, number> {
  const counts = new Map<string, number>()
  for (const project of list) counts.set(project.categoryId, (counts.get(project.categoryId) ?? 0) + 1)
  return counts
}

export interface AdjacentProjects {
  previous: Project
  next: Project
}

/**
 * Verilen sıralı listede bir projenin öncesi ve sonrası (id ile). Liste döngüseldir:
 * ilk projenin öncesi son projedir. Proje listede yoksa veya tek projeyse null.
 */
export function getAdjacentProjects(ordered: readonly Project[], id: string): AdjacentProjects | null {
  const index = ordered.findIndex((project) => project.id === id)
  if (index === -1 || ordered.length < 2) return null
  return {
    previous: ordered[(index - 1 + ordered.length) % ordered.length],
    next: ordered[(index + 1) % ordered.length],
  }
}
