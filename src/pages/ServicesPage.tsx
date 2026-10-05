import { FaqList } from '../components/services/FaqList'
import { ButtonLink } from '../components/ui/ButtonLink'
import { PageHeading } from '../components/ui/PageHeading'
import { eyebrowClass } from '../components/ui/styles'
import { faqItems } from '../content/faq'
import { processSteps } from '../content/process'
import { services } from '../content/services'
import { site } from '../content/site'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useMetaDescription } from '../hooks/useMetaDescription'
import { paths } from '../routes/paths'

const number = (index: number) => String(index + 1).padStart(2, '0')

export default function ServicesPage() {
  const copy = site.servicesPage
  useDocumentTitle(copy.documentTitle)
  useMetaDescription(copy.metaDescription)

  return (
    <>
      <section className="container-page pt-12 pb-section md:pt-20">
        <PageHeading>{copy.heading}</PageHeading>
        <p className="mt-8 max-w-prose text-lead text-gray-600">{copy.intro}</p>
      </section>

      {/* Hizmetler: her biri slug ile çapalanır (/hizmetler#slug) */}
      <ol className="container-page">
        {services.map((service, index) => (
          <li
            key={service.id}
            id={service.slug}
            tabIndex={-1}
            className="grid scroll-mt-6 gap-8 border-t border-gray-200 py-14 focus:outline-none md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16"
          >
            <div>
              <span aria-hidden="true" className="font-display text-h3 text-gray-500 tabular-nums">
                {number(index)}
              </span>
              <h2 className="mt-2 text-h2">
                {service.name}
              </h2>
            </div>
            <div className="max-w-prose">
              <p className="font-display text-h3">{service.summary}</p>
              <div className="mt-6 flex flex-col gap-4 text-gray-600">
                {service.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <h3 className={`mt-10 ${eyebrowClass}`}>{copy.includesHeading}</h3>
              <ul className="mt-4 border-t border-gray-200">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-3 border-b border-gray-200 py-3">
                    <span aria-hidden="true" className="text-accent">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <section aria-labelledby="hizmet-surec" className="bg-white">
        <div className="container-page py-section">
          <h2 id="hizmet-surec" className="text-h2">
            {copy.process.heading}
          </h2>
          <p className="mt-6 max-w-prose text-lead text-gray-600">{copy.process.intro}</p>
          <ol className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            {processSteps.map((step, index) => (
              <li key={step.id} className="border-t-2 border-ink pt-5">
                <span aria-hidden="true" className="font-display text-h3 text-accent tabular-nums">
                  {number(index)}
                </span>
                <h3 className="mt-3 font-display text-xl">{step.title}</h3>
                <p className="mt-3 text-gray-600">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="hizmet-sss" className="container-page grid gap-10 py-section lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
        <h2 id="hizmet-sss" className="text-h2">
          {copy.faq.heading}
        </h2>
        <FaqList items={faqItems} />
      </section>

      <section aria-labelledby="hizmet-kapanis" className="border-t border-gray-200">
        <div className="container-page flex flex-col items-start gap-10 py-section">
          <h2 id="hizmet-kapanis" className="max-w-[18ch] text-h1">
            {copy.closing.heading}
          </h2>
          <ButtonLink to={paths.contact}>{copy.closing.cta}</ButtonLink>
        </div>
      </section>
    </>
  )
}
