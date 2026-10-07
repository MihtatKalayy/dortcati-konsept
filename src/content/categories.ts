import type { ProjectCategory } from './types'

/** Proje kategorilerinin tek kaynağı. Projeler kategoriye `categoryId` ile bağlanır. */
export const categories: ProjectCategory[] = [
  { id: 'cat-konut', slug: 'konut', name: 'Konut' },
  { id: 'cat-ticari', slug: 'ticari', name: 'Ticari' },
  { id: 'cat-ic-mekan', slug: 'ic-mekan', name: 'İç Mekân' },
]

/** Kategoriyi id ile bulur; tanımsız id veri hatasıdır ve fırlatır. */
export function getCategory(id: string): ProjectCategory {
  const category = categories.find((c) => c.id === id)
  if (!category) throw new Error(`Tanımsız kategori: ${id}`)
  return category
}
