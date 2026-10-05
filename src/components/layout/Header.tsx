import { Link, NavLink } from 'react-router'
import { site } from '../../content/site'
import { paths } from '../../routes/paths'
import { LogoMark } from '../ui/LogoMark'
import { MobileMenu } from './MobileMenu'
import { navLinkClass } from './navLinkClass'

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-paper">
      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-20">
        <Link
          to={paths.home}
          aria-label={site.ui.homeLinkLabel}
          className="flex items-center gap-2.5 font-display text-xl whitespace-nowrap md:text-2xl"
        >
          <LogoMark className="size-7 shrink-0" />
          {site.brand.name}
        </Link>

        <div className="flex items-center gap-6 lg:gap-10">
          <nav aria-label={site.ui.primaryNavLabel} className="hidden md:block">
            <ul className="flex items-center gap-6 lg:gap-8">
              {site.nav.map((item) => (
                <li key={item.id}>
                  <NavLink to={paths[item.page]} className={navLinkClass}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            to={paths[site.primaryCta.page]}
            className="hidden bg-accent px-5 py-2.5 font-medium text-white hover:bg-accent-strong sm:inline-block"
          >
            {site.primaryCta.label}
          </Link>

          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
