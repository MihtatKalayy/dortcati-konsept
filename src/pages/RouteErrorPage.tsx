import { PageHeading } from '../components/ui/PageHeading'
import { site } from '../content/site'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

/** Sayfa parçası yüklenemediğinde veya beklenmeyen bir hata olduğunda gösterilir. */
export function RouteErrorPage() {
  useDocumentTitle(site.error.heading)

  return (
    <section className="container-page py-section">
      <PageHeading>{site.error.heading}</PageHeading>
      <p className="mt-8 max-w-prose text-lead text-gray-600">{site.error.body}</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-10 bg-accent px-6 py-3 font-medium text-white hover:bg-accent-strong"
      >
        {site.error.reload}
      </button>
    </section>
  )
}
