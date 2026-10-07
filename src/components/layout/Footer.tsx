import { Link } from 'react-router'
import { site } from '../../content/site'
import { paths } from '../../routes/paths'

export function Footer() {
  const { brand, contact, footer, nav, ui, conceptNotice } = site

  return (
    <footer className="bg-ink text-white">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[2fr_1fr_1fr] md:py-20">
        <div className="max-w-sm">
          <p className="font-display text-h3">{brand.name}</p>
          <p className="mt-4 text-gray-300">{brand.description}</p>
        </div>

        <nav aria-label={ui.footerNavLabel}>
          <h2 className="font-sans text-sm font-semibold tracking-widest text-gray-300 uppercase">
            {footer.navHeading}
          </h2>
          <ul className="mt-2 flex flex-col">
            {nav.map((item) => (
              <li key={item.id}>
                <Link to={paths[item.page]} className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-sm font-semibold tracking-widest text-gray-300 uppercase">
            {footer.contactHeading}
          </h2>
          <address className="mt-2 flex flex-col items-start gap-1 not-italic">
            <a href={`mailto:${contact.email}`} className="inline-flex min-h-11 items-center break-all underline-offset-4 hover:underline">
              {contact.email}
            </a>
            <a href={`tel:${contact.phoneHref}`} className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
              {contact.phone}
            </a>
            <span className="text-gray-300">
              {contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
            <span className="text-gray-300">{contact.hours}</span>
            <span className="text-sm text-gray-400">{contact.placeholderNote}</span>
          </address>
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="container-page flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
          <p className="border-l-4 border-accent pl-4 font-medium">{conceptNotice}</p>
          <p className="text-sm text-gray-400">{footer.copyright(new Date().getFullYear())}</p>
        </div>
      </div>
    </footer>
  )
}
