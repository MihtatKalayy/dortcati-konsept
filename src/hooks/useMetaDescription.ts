import { useEffect } from 'react'
import { DESCRIPTION_META, setMetaContent } from './meta'

/**
 * Sayfa açıkken açıklama etiketlerini (description, og:description, twitter:description)
 * değiştirir, ayrılınca önceki değerleri geri yükler.
 */
export function useMetaDescription(description: string) {
  useEffect(() => {
    const previous = DESCRIPTION_META.map((selector) => setMetaContent(selector, description))
    return () => {
      DESCRIPTION_META.forEach((selector, i) => setMetaContent(selector, previous[i]))
    }
  }, [description])
}
