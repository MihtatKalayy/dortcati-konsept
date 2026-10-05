import { Outlet, ScrollRestoration } from 'react-router'
import { Footer } from './Footer'
import { Header } from './Header'
import { RouteChangeAnnouncer } from './RouteChangeAnnouncer'
import { MAIN_CONTENT_ID } from './ids'
import { SkipLink } from './SkipLink'

export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SkipLink />
      <Header />
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
      <RouteChangeAnnouncer />
      <ScrollRestoration />
    </div>
  )
}
