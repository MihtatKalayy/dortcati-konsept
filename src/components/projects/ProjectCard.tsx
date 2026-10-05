import { Link } from 'react-router'
import { site } from '../../content/site'
import type { Project } from '../../content/types'
import { projectDetailPath } from '../../routes/paths'

interface ProjectCardProps {
  project: Project
  categoryName: string
  /** İlk ekranda görünen kart: görsel hemen ve öncelikli yüklenir. */
  priority?: boolean
}

/** Kartın tamamı, başlıktaki bağlantının ::after ile genişletilmesiyle tıklanabilir. */
export function ProjectCard({ project, categoryName, priority = false }: ProjectCardProps) {
  const { meta } = site.projectsPage
  const { cover } = project

  return (
    <article className="group relative outline-offset-8 outline-accent has-[a:focus-visible]:outline-2">
      <div className="overflow-hidden border border-gray-200 bg-white">
        <img
          src={cover.src}
          alt={cover.alt}
          width={cover.width}
          height={cover.height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <h2 className="mt-5 text-h3">
        <Link
          to={projectDetailPath(project.slug)}
          className="decoration-accent decoration-2 underline-offset-[0.2em] group-hover:underline after:absolute after:inset-0 focus-visible:outline-none"
        >
          {project.name}
        </Link>
      </h2>
      <dl className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-gray-600">
        <div>
          <dt className="sr-only">{meta.category}</dt>
          <dd className="font-medium text-ink">{categoryName}</dd>
        </div>
        <div>
          <dt className="sr-only">{meta.year}</dt>
          <dd>{project.year}</dd>
        </div>
        <div>
          <dt className="sr-only">{meta.location}</dt>
          <dd>{project.location}</dd>
        </div>
      </dl>
    </article>
  )
}
