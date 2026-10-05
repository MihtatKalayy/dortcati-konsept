import type { StaticPageId } from '../content/types'

/** Adres yapısının tek kaynağı. */
export const paths: Record<StaticPageId, string> = {
  home: '/',
  about: '/hakkimizda',
  services: '/hizmetler',
  projects: '/projeler',
  contact: '/iletisim',
}

export const projectDetailPattern = '/projeler/:slug'

export function projectDetailPath(slug: string): string {
  return `${paths.projects}/${encodeURIComponent(slug)}`
}

/** Projeler sayfasında kategori filtresinin sorgu parametresi. */
export const projectCategoryParam = 'kategori'

/** Projeler sayfasının adresi; kategori verilirse filtreli. */
export function projectsPath(categorySlug?: string): string {
  if (!categorySlug) return paths.projects
  return `${paths.projects}?${new URLSearchParams({ [projectCategoryParam]: categorySlug })}`
}

/** Hizmetler sayfasında bir hizmetin çapalı adresi. */
export function serviceAnchorPath(serviceSlug: string): string {
  return `${paths.services}#${encodeURIComponent(serviceSlug)}`
}
