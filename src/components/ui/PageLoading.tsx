import { site } from '../../content/site'

/** İlk sayfa parçası yüklenirken gösterilir. */
export function PageLoading() {
  return (
    <p role="status" className="sr-only">
      {site.ui.pageLoading}
    </p>
  )
}
