import { useEffect } from 'react'

/**
 * Sayfa açıkken arama motorlarına dizine eklememesini söyler. Tek sayfa uygulamasında
 * bilinmeyen adresler HTTP 200 döndüğü için 404 görünümünde kullanılır.
 */
export function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex'
    document.head.append(meta)
    return () => meta.remove()
  }, [])
}
