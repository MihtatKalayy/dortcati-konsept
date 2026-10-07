import { useEffect } from 'react'
import { formatDocumentTitle } from '../content/documentTitle'
import { setMetaContent, TITLE_META } from './meta'

/** Sekme başlığını ve paylaşım başlığı etiketlerini (og:title, twitter:title) günceller. */
export function useDocumentTitle(pageTitle?: string) {
  useEffect(() => {
    const title = formatDocumentTitle(pageTitle)
    document.title = title
    for (const selector of TITLE_META) setMetaContent(selector, title)
  }, [pageTitle])
}
