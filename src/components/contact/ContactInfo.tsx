import { locationImage } from '../../content/contactImages'
import { site } from '../../content/site'

/** İletişim bilgileri (yer tutucu) ve harita yerine stilize konum çizimi. */
export function ContactInfo() {
  const { contact } = site
  const { info } = site.contactPage
  const row = 'border-b border-gray-200 py-4'
  const link = 'inline-flex min-h-11 items-center underline-offset-4 hover:text-accent hover:underline'

  return (
    <section aria-labelledby="iletisim-bilgileri">
      <h2 id="iletisim-bilgileri" className="text-h3">
        {info.heading}
      </h2>
      <address className="mt-6 not-italic">
        <dl className="border-t border-gray-200">
          <div className={row}>
            <dt className="text-sm text-gray-600">{info.address}</dt>
            <dd className="mt-1">
              {contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </dd>
          </div>
          <div className={row}>
            <dt className="text-sm text-gray-600">{info.phone}</dt>
            <dd>
              <a href={`tel:${contact.phoneHref}`} className={link}>
                {contact.phone}
              </a>
            </dd>
          </div>
          <div className={row}>
            <dt className="text-sm text-gray-600">{info.email}</dt>
            <dd className="break-all">
              <a href={`mailto:${contact.email}`} className={link}>
                {contact.email}
              </a>
            </dd>
          </div>
          <div className={row}>
            <dt className="text-sm text-gray-600">{info.hours}</dt>
            <dd className="mt-1">{contact.hours}</dd>
          </div>
        </dl>
      </address>
      <p className="mt-3 text-sm text-gray-600">{contact.placeholderNote}</p>
      <figure className="mt-8">
        <div className="overflow-hidden border border-gray-200 bg-white">
          <img
            src={locationImage.src}
            alt={locationImage.alt}
            width={locationImage.width}
            height={locationImage.height}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
        </div>
        <figcaption className="mt-3 text-sm font-medium text-gray-600">{locationImage.caption}</figcaption>
      </figure>
    </section>
  )
}
