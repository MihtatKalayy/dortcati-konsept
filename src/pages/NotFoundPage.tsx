import { Link } from 'react-router'
import { PlaceholderPage } from '../components/ui/PlaceholderPage'
import { site } from '../content/site'
import { paths } from '../routes/paths'

export default function NotFoundPage() {
  return (
    <PlaceholderPage page="notFound" body={site.notFoundBody}>
      <Link
        to={paths.home}
        className="mt-10 inline-block font-medium text-accent underline underline-offset-4 hover:text-accent-strong"
      >
        {site.ui.backToHome}
      </Link>
    </PlaceholderPage>
  )
}
