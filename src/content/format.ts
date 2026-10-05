const numberFormat = new Intl.NumberFormat('tr-TR')

/** Alanı Türkçe sayı biçimiyle yazar: 1180 → "1.180 m²" (sayı ile birim arasında bölünmez boşluk). */
export function formatArea(m2: number): string {
  return `${numberFormat.format(m2)}\u00a0m²`
}
