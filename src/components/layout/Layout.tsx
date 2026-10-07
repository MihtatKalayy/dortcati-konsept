import { Outlet, ScrollRestoration, useNavigation } from 'react-router'
import { Footer } from './Footer'
import { Header } from './Header'
import { RouteChangeAnnouncer } from './RouteChangeAnnouncer'
import { MAIN_CONTENT_ID } from './ids'
import { NavigationProgress } from './NavigationProgress'
import { SkipLink } from './SkipLink'

export function Layout() {
  const loading = useNavigation().state === 'loading'
  return (
    <div className="flex min-h-dvh flex-col">
      <NavigationProgress active={loading} />
      <SkipLink />
      <Header />
      <main id={MAIN_CONTENT_ID} tabIndex={-1} aria-busy={loading || undefined} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
      <RouteChangeAnnouncer />
      <ScrollRestoration />
    </div>
  )
}
