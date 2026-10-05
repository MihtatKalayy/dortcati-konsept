import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { site } from '../../content/site'
import { MAIN_CONTENT_ID } from './ids'

/**
 * Sayfa değişince odağı yeni sayfanın h1 başlığına (adreste çapa varsa o
 * öğeye) taşır ve sayfayı ekran okuyucuya duyurur. İlk yüklemede çalışmaz.
 * Kaydırma, çapaya kaydırma dahil, ScrollRestoration'dadır.
 * Yerleşimde <main>'den sonra durmalıdır; böylece sayfanın efektlerinden
 * (sekme başlığı) sonra çalışır.
 */
export function RouteChangeAnnouncer() {
  const { pathname, hash } = useLocation()
  const previousPathname = useRef(pathname)
  const regionRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (previousPathname.current === pathname) return
    previousPathname.current = pathname

    const main = document.getElementById(MAIN_CONTENT_ID)
    const heading = main?.querySelector('h1')
    const anchor = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    ;(anchor ?? heading ?? main)?.focus({ preventScroll: true })

    if (regionRef.current) {
      regionRef.current.textContent = site.ui.routeAnnouncement(
        heading?.textContent ?? document.title,
      )
    }
  }, [pathname, hash])

  return <p ref={regionRef} role="status" aria-atomic="true" className="sr-only" />
}
