import { useEffect } from 'react'

/** Sayfa açıkken açıklama meta etiketini değiştirir, ayrılınca önceki değeri geri yükler. */
export function useMetaDescription(description: string) {
  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!meta) throw new Error('index.html açıklama meta etiketi bulunamadı')
    const previous = meta.content
    meta.content = description
    return () => {
      meta.content = previous
    }
  }, [description])
}
