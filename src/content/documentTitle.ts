import { site } from './site'

/** Sekme başlığı: "Sayfa | Marka" ya da ana sayfa için "Marka — Slogan". */
export function formatDocumentTitle(pageTitle?: string): string {
  const { name, tagline } = site.brand
  return pageTitle ? `${pageTitle} | ${name}` : `${name} — ${tagline}`
}
