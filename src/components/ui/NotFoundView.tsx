import { site } from '../../content/site'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { paths } from '../../routes/paths'
import { PageHeading } from './PageHeading'
import { TextLink } from './TextLink'

/** 404 görünümü; bilinmeyen adresler ve bulunamayan projeler için. */
export function NotFoundView() {
  const copy = site.pages.notFound
  useDocumentTitle(copy.documentTitle)

  return (
    <section className="container-page py-section">
      <PageHeading>{copy.heading}</PageHeading>
      <p className="mt-8 max-w-prose text-lead text-gray-600">{site.notFoundBody}</p>
      <TextLink to={paths.home}>{site.ui.backToHome}</TextLink>
    </section>
  )
}
