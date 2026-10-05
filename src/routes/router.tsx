import type { ComponentType } from 'react'
import { createBrowserRouter } from 'react-router'
import { Layout } from '../components/layout/Layout'
import { PageLoading } from '../components/ui/PageLoading'
import { RouteErrorPage } from '../pages/RouteErrorPage'
import { paths, projectDetailPattern } from './paths'

/** Sayfaları ayrı parçalar halinde, gerektiğinde yükler. */
function lazyPage(load: () => Promise<{ default: ComponentType }>) {
  return async () => ({ Component: (await load()).default })
}

export const router = createBrowserRouter([
  {
    path: paths.home,
    Component: Layout,
    HydrateFallback: PageLoading,
    children: [
      {
        ErrorBoundary: RouteErrorPage,
        children: [
          { index: true, lazy: lazyPage(() => import('../pages/HomePage')) },
          { path: paths.about, lazy: lazyPage(() => import('../pages/AboutPage')) },
          { path: paths.services, lazy: lazyPage(() => import('../pages/ServicesPage')) },
          { path: paths.projects, lazy: lazyPage(() => import('../pages/ProjectsPage')) },
          { path: projectDetailPattern, lazy: lazyPage(() => import('../pages/ProjectDetailPage')) },
          { path: paths.contact, lazy: lazyPage(() => import('../pages/ContactPage')) },
          { path: '*', lazy: lazyPage(() => import('../pages/NotFoundPage')) },
        ],
      },
    ],
  },
])
