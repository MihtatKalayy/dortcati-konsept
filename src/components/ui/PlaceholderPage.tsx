import type { ReactNode } from 'react'
import { site } from '../../content/site'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { PageHeading } from './PageHeading'

interface PlaceholderPageProps {
  heading: string
  documentTitle?: string
  body?: string
  children?: ReactNode
}

/** İçeriği sonraki adımlarda gelecek sayfalar için başlıklı yer tutucu. */
export function PlaceholderPage({ heading, documentTitle, body = site.ui.placeholderBody, children }: PlaceholderPageProps) {
  useDocumentTitle(documentTitle)

  return (
    <section className="container-page py-section">
      <PageHeading>{heading}</PageHeading>
      <p className="mt-8 max-w-prose text-lead text-gray-600">{body}</p>
      {children}
    </section>
  )
}
