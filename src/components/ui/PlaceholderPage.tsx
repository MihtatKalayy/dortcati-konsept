import type { ReactNode } from 'react'
import { site } from '../../content/site'
import type { PageId } from '../../content/types'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { PageHeading } from './PageHeading'

interface PlaceholderPageProps {
  page: PageId
  body?: string
  children?: ReactNode
}

/** İçeriği sonraki adımlarda gelecek sayfalar için başlıklı yer tutucu. */
export function PlaceholderPage({ page, body = site.ui.placeholderBody, children }: PlaceholderPageProps) {
  const copy = site.pages[page]
  useDocumentTitle(copy.documentTitle)

  return (
    <section className="container-page py-section">
      <PageHeading>{copy.heading}</PageHeading>
      <p className="mt-8 max-w-prose text-lead text-gray-600">{body}</p>
      {children}
    </section>
  )
}
