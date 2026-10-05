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
