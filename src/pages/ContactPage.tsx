import { useSearchParams } from 'react-router'
import { ContactInfo } from '../components/contact/ContactInfo'
import { QuoteForm } from '../components/quote/QuoteForm'
import { PageHeading } from '../components/ui/PageHeading'
import { site } from '../content/site'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useMetaDescription } from '../hooks/useMetaDescription'
import { quoteProjectTypeParam } from '../routes/paths'

export default function ContactPage() {
  const copy = site.contactPage
  useDocumentTitle(copy.documentTitle)
  useMetaDescription(copy.metaDescription)
  // Yalnızca kategori slug'ı okunur; adres çubuğuna hiçbir zaman form verisi yazılmaz.
  const [searchParams] = useSearchParams()
  const projectTypeSlug = searchParams.get(quoteProjectTypeParam)

  return (
    <section className="container-page pt-12 pb-section md:pt-20">
      <PageHeading>{copy.heading}</PageHeading>
      <p className="mt-8 max-w-prose text-lead text-gray-600">{copy.intro}</p>
      {/* Mobilde önce form, sonra bilgiler; geniş ekranda yan yana. */}
      <div className="mt-14 grid gap-16 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-14">
        <QuoteForm key={projectTypeSlug ?? ''} projectTypeSlug={projectTypeSlug} />
        <ContactInfo />
      </div>
    </section>
  )
}
