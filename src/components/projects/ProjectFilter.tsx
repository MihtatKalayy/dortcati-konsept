import { Link } from 'react-router'
import { site } from '../../content/site'
import type { ProjectCategory } from '../../content/types'
import { projectsPath } from '../../routes/paths'

interface ProjectFilterProps {
  categories: readonly ProjectCategory[]
  counts: ReadonlyMap<string, number>
  total: number
  active: ProjectCategory | undefined
}

/**
 * Kategori filtresi. Her seçenek filtreli adrese giden bir bağlantıdır; böylece
 * durum adres çubuğunda kalır, geri tuşu önceki filtreye döner. Seçili seçenek
 * aria-current ile işaretlenir.
 */
export function ProjectFilter({ categories, counts, total, active }: ProjectFilterProps) {
  const copy = site.projectsPage
  const options = [
    { key: 'all', label: copy.allLabel, slug: undefined, count: total },
    ...categories.map((c) => ({ key: c.id, label: c.name, slug: c.slug, count: counts.get(c.id) ?? 0 })),
  ]

  return (
    <nav aria-label={copy.filterLabel}>
      <ul className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = option.slug === active?.slug
          return (
            <li key={option.key}>
              <Link
                to={projectsPath(option.slug)}
                preventScrollReset
                aria-current={isActive ? 'true' : undefined}
                className={`inline-flex min-h-11 items-center gap-2 border px-4 py-2 transition-colors ${
                  isActive ? 'border-ink bg-ink text-white' : 'border-gray-300 hover:border-ink'
                }`}
              >
                {option.label}
                <span className={`text-sm tabular-nums ${isActive ? 'text-gray-300' : 'text-gray-600'}`}>
                  {option.count}
                  <span className="sr-only"> {copy.countUnit}</span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
