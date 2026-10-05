import { Link } from 'react-router'
import { site } from '../../content/site'
import type { Project, ProjectCategory } from '../../content/types'
import { paths, projectsPath } from '../../routes/paths'

interface BreadcrumbProps {
  project: Project
  category: ProjectCategory
}

/** Projeler › Kategori › Proje adı. Kategori bağlantısı filtreli Projeler sayfasını açar. */
export function Breadcrumb({ project, category }: BreadcrumbProps) {
  const link = 'underline-offset-4 hover:text-accent hover:underline'
  const separator = (
    <span aria-hidden="true" className="text-gray-500">
      ›
    </span>
  )

  return (
    <nav aria-label={site.projectDetail.breadcrumbLabel}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600">
        <li className="flex items-center gap-2">
          <Link to={paths.projects} className={link}>
            {site.pages.projects.heading}
          </Link>
          {separator}
        </li>
        <li className="flex items-center gap-2">
          <Link to={projectsPath(category.slug)} className={link}>
            {category.name}
          </Link>
          {separator}
        </li>
        <li>
          <span aria-current="page" className="font-medium text-ink">
            {project.name}
          </span>
        </li>
      </ol>
    </nav>
  )
}
