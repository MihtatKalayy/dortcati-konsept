import { formatArea } from '../../content/format'
import { site } from '../../content/site'
import type { Project, ProjectCategory } from '../../content/types'

interface ProjectFactsProps {
  project: Project
  category: ProjectCategory
  headingId: string
}

/** Proje künyesi: tanım listesi (dl). */
export function ProjectFacts({ project, category, headingId }: ProjectFactsProps) {
  const { facts, factsHeading } = site.projectDetail
  const rows = [
    { term: facts.category, detail: category.name },
    { term: facts.year, detail: String(project.year) },
    { term: facts.location, detail: project.location },
    { term: facts.area, detail: formatArea(project.areaM2) },
  ]

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId} className="font-sans text-sm font-semibold tracking-widest text-gray-600 uppercase">
        {factsHeading}
      </h2>
      <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 border-t border-gray-200">
        {rows.map((row) => (
          <div key={row.term} className="col-span-2 grid grid-cols-subgrid border-b border-gray-200 py-3">
            <dt className="text-gray-600">{row.term}</dt>
            <dd>{row.detail}</dd>
          </div>
        ))}
        <div className="col-span-2 grid grid-cols-subgrid border-b border-gray-200 py-3">
          <dt className="text-gray-600">{facts.scope}</dt>
          <dd>
            <ul>
              {project.scope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </section>
  )
}
