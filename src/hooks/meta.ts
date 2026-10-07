/** index.html'deki bir meta etiketinin içeriğini değiştirir; etiket yoksa hata verir (sessizce yutulmaz). */
export function setMetaContent(selector: string, content: string): string {
  const meta = document.head.querySelector<HTMLMetaElement>(selector)
  if (!meta) throw new Error(`index.html meta etiketi bulunamadı: ${selector}`)
  const previous = meta.content
  meta.content = content
  return previous
}

export const TITLE_META = ['meta[property="og:title"]', 'meta[name="twitter:title"]'] as const
export const DESCRIPTION_META = [
  'meta[name="description"]',
  'meta[property="og:description"]',
  'meta[name="twitter:description"]',
] as const
