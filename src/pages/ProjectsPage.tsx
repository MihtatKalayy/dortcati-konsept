import { useSearchParams } from 'react-router'
import { ProjectCard } from '../components/projects/ProjectCard'
import { ProjectFilter } from '../components/projects/ProjectFilter'
import { PageHeading } from '../components/ui/PageHeading'
import {
  countProjectsByCategory,
  filterProjectsByCategory,
  findCategoryBySlug,
  sortProjects,
} from '../content/projectQueries'
import { categories, getCategory } from '../content/categories'
import { projects } from '../content/projects'
import { site } from '../content/site'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useMetaDescription } from '../hooks/useMetaDescription'
import { projectCategoryParam } from '../routes/paths'

const orderedProjects = sortProjects(projects)
const categoryCounts = countProjectsByCategory(projects)

export default function ProjectsPage() {
  const copy = site.projectsPage
  const [searchParams] = useSearchParams()
  // Geçersiz ya da eksik parametre "Tümü" olarak yorumlanır.
  const activeCategory = findCategoryBySlug(categories, searchParams.get(projectCategoryParam))
  const visible = filterProjectsByCategory(orderedProjects, activeCategory?.id ?? null)
  useDocumentTitle(copy.documentTitle(activeCategory?.name ?? null))
  useMetaDescription(copy.metaDescription(activeCategory?.name ?? null))

  return (
    <section className="container-page py-section">
      <PageHeading>{site.pages.projects.heading}</PageHeading>
      <p className="mt-8 max-w-prose text-lead text-gray-600">{copy.intro}</p>

      <div className="mt-12 flex flex-col gap-6 border-t border-gray-200 pt-8 lg:flex-row lg:items-center lg:justify-between">
        <ProjectFilter
          categories={categories}
          counts={categoryCounts}
          total={projects.length}
          active={activeCategory}
        />
        <p role="status" className="text-gray-600">
          {copy.resultStatus(visible.length, activeCategory?.name ?? null)}
        </p>
      </div>

      {visible.length > 0 ? (
        // overflow-anchor: süzme sırasında kaldırılan bir kart kaydırma çapası seçilip
        // sayfa başa atlamasın; çapa filtre çubuğu gibi yerinde kalan bir öğe olur.
        <ul className="mt-12 grid [overflow-anchor:none] gap-y-16 md:grid-cols-2 md:gap-x-10 lg:gap-x-16 lg:gap-y-24">
          {visible.map((project, index) => (
            <li key={project.id} className="md:even:mt-24">
              <ProjectCard project={project} categoryName={getCategory(project.categoryId).name} priority={index === 0} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-12 text-gray-600">{copy.emptyResult}</p>
      )}
    </section>
  )
}
