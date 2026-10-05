import { site } from './site'

/** Sekme başlığı: "Sayfa | Marka"; sayfa başlığı yoksa ana sayfa başlığı. */
export function formatDocumentTitle(pageTitle?: string): string {
  return pageTitle ? `${pageTitle} | ${site.brand.name}` : site.home.documentTitle
}
