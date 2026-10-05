import { site } from '../../content/site'
import { paths } from '../../routes/paths'
import { PlaceholderPage } from './PlaceholderPage'
import { TextLink } from './TextLink'

/** 404 görünümü; bilinmeyen adresler ve bulunamayan projeler için. */
export function NotFoundView() {
  return (
    <PlaceholderPage {...site.pages.notFound} body={site.notFoundBody}>
      <TextLink to={paths.home}>{site.ui.backToHome}</TextLink>
    </PlaceholderPage>
  )
}
