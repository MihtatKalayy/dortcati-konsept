import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { site } from '../../content/site'
import { paths } from '../../routes/paths'
import { navLinkClass } from './navLinkClass'

const MENU_ID = 'mobil-menu'
const DESKTOP_QUERY = '(min-width: 48rem)'

/**
 * Mobilde tam ekran açılan menü. Yerel <dialog> modal olarak açılır:
 * arka plan etkileşime kapanır, odak menü içinde kalır, Escape ile kapanır
 * ve kapanınca odak menü düğmesine döner.
 */
export function MobileMenu() {
  const { pathname } = useLocation()
  // Menünün hangi adreste açıldığı tutulur; adres değişince menü kendiliğinden kapanır.
  const [openedAt, setOpenedAt] = useState<string | null>(null)
  const isOpen = openedAt === pathname
  const dialogRef = useRef<HTMLDialogElement>(null)
  const close = useCallback(() => setOpenedAt(null), [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  // Menü açıkken arka plan kaymasın.
  useEffect(() => {
    if (!isOpen) return
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = previous
    }
  }, [isOpen])

  // Ekran masaüstü genişliğine çıkarsa menüyü kapat.
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY)
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) close()
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [close])

  return (
    <>
      <button
        type="button"
        className="px-1 py-2 text-base font-medium md:hidden"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={MENU_ID}
        onClick={() => setOpenedAt(pathname)}
      >
        {site.ui.menuOpen}
      </button>

      <dialog
        ref={dialogRef}
        id={MENU_ID}
        aria-label={site.ui.mobileMenuLabel}
        onClose={close}
        className="m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-paper text-ink"
      >
        <div className="container-page flex h-16 items-center justify-between border-b border-gray-200">
          <Link to={paths.home} onClick={close} className="font-display text-xl">
            {site.brand.name}
          </Link>
          <button type="button" className="px-1 py-2 text-base font-medium" onClick={close}>
            {site.ui.menuClose}
          </button>
        </div>

        <div className="container-page flex flex-col gap-12 py-12">
          <nav aria-label={site.ui.primaryNavLabel}>
            <ul className="flex flex-col gap-4 font-display text-h2">
              {site.nav.map((item) => (
                <li key={item.id}>
                  <NavLink to={paths[item.page]} onClick={close} className={navLinkClass}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            to={paths[site.primaryCta.page]}
            onClick={close}
            className="self-start bg-accent px-6 py-3 font-medium text-white hover:bg-accent-strong"
          >
            {site.primaryCta.label}
          </Link>

          <p className="text-sm text-gray-600">{site.conceptNotice}</p>
        </div>
      </dialog>
    </>
  )
}
