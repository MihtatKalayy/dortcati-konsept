import { site } from '../../content/site'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { useMetaDescription } from '../../hooks/useMetaDescription'
import { useNoIndex } from '../../hooks/useNoIndex'
import { paths } from '../../routes/paths'
import { PageHeading } from './PageHeading'
import { TextLink } from './TextLink'

/** 404 görünümü; bilinmeyen adresler ve bulunamayan projeler için. */
export function NotFoundView() {
  const copy = site.pages.notFound
  useDocumentTitle(copy.documentTitle)
  useMetaDescription(copy.metaDescription ?? site.home.metaDescription)
  useNoIndex()

  return (
    <section className="container-page py-section">
      <PageHeading>{copy.heading}</PageHeading>
      <p className="mt-8 max-w-prose text-lead text-gray-600">{site.notFoundBody}</p>
      <TextLink to={paths.home}>{site.ui.backToHome}</TextLink>
    </section>
  )
}
