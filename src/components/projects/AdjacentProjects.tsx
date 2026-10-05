import { Link } from 'react-router'
import { site } from '../../content/site'
import type { Project } from '../../content/types'
import { paths, projectDetailPath } from '../../routes/paths'

interface AdjacentProjectsProps {
  previous: Project
  next: Project
}

/** Önceki / sonraki proje geçişi ve Projeler sayfasına dönüş. */
export function AdjacentProjects({ previous, next }: AdjacentProjectsProps) {
  const { adjacent, backToProjects } = site.projectDetail
  const card = 'group flex flex-col gap-2 py-8 md:py-12'
  const title = 'font-display text-h3 decoration-accent decoration-2 underline-offset-[0.2em] group-hover:underline'

  return (
    <nav aria-label={adjacent.label} className="border-t border-gray-200">
      <ul className="grid md:grid-cols-2 md:gap-10">
        <li className="border-b border-gray-200 md:border-b-0">
          <Link to={projectDetailPath(previous.slug)} className={card}>
            <span className="text-sm text-gray-600">
              <span aria-hidden="true">← </span>
              {adjacent.previous}
            </span>
            <span className={title}>{previous.name}</span>
          </Link>
        </li>
        <li>
          <Link to={projectDetailPath(next.slug)} className={`${card} md:items-end md:text-right`}>
            <span className="text-sm text-gray-600">
              {adjacent.next}
              <span aria-hidden="true"> →</span>
            </span>
            <span className={title}>{next.name}</span>
          </Link>
        </li>
      </ul>
      <p className="border-t border-gray-200 pt-8 text-center">
        <Link to={paths.projects} className="font-medium text-accent underline underline-offset-4 hover:text-accent-strong">
          {backToProjects}
        </Link>
      </p>
    </nav>
  )
}
