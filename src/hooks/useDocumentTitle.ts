import { useEffect } from 'react'
import { formatDocumentTitle } from '../content/documentTitle'

export function useDocumentTitle(pageTitle?: string) {
  useEffect(() => {
    document.title = formatDocumentTitle(pageTitle)
  }, [pageTitle])
}
