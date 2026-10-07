import { useId, useState } from 'react'
import { useParams } from 'react-router'
import { AdjacentProjects } from '../components/projects/AdjacentProjects'
import { Breadcrumb } from '../components/projects/Breadcrumb'
import { ImageButton } from '../components/projects/ImageButton'
import { ImageViewer } from '../components/projects/ImageViewer'
import { ProjectFacts } from '../components/projects/ProjectFacts'
import { ProjectGallery } from '../components/projects/ProjectGallery'
import { NotFoundView } from '../components/ui/NotFoundView'
import { ButtonLink } from '../components/ui/ButtonLink'
import { PageHeading } from '../components/ui/PageHeading'
import { findProjectBySlug, getAdjacentProjects, sortProjects } from '../content/projectQueries'
import { getCategory } from '../content/categories'
import { projects } from '../content/projects'
import { site } from '../content/site'
import type { Project } from '../content/types'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useMetaDescription } from '../hooks/useMetaDescription'
import { contactPath } from '../routes/paths'

// Önceki/sonraki geçişi Projeler sayfasındaki "Tümü" sırasını izler.
const orderedProjects = sortProjects(projects)

export default function ProjectDetailPage() {
  const { slug = '' } = useParams()
  const project = findProjectBySlug(projects, slug)
  if (!project) return <NotFoundView />
  // Proje değişince görüntüleyici durumu sıfırlansın.
  return <ProjectDetail key={project.id} project={project} />
}

function ProjectDetail({ project }: { project: Project }) {
  const copy = site.projectDetail
  const ids = useId()
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)
  useDocumentTitle(project.name)
  useMetaDescription(copy.metaDescription(project.name, project.summary))

  const category = getCategory(project.categoryId)
  const adjacent = getAdjacentProjects(orderedProjects, project.id)
  // Görüntüleyicide kapak ilk sırada, ardından galeri görselleri.
  const viewerImages = [project.cover, ...project.gallery]

  return (
    <article>
      <header className="container-page pt-10 md:pt-14">
        <Breadcrumb project={project} category={category} />
        <div className="mt-10 md:mt-14">
          <PageHeading>{project.name}</PageHeading>
          <p className="mt-6 max-w-prose text-lead text-gray-600">{project.summary}</p>
        </div>
        <div className="mt-10 md:mt-14">
          <ImageButton image={project.cover} onOpen={() => setViewerIndex(0)} priority />
        </div>
      </header>

      <div className="container-page grid gap-12 py-section lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
        <ProjectFacts project={project} category={category} headingId={`${ids}-kunye`} />
        <section aria-labelledby={`${ids}-aciklama`}>
          <h2 id={`${ids}-aciklama`} className="sr-only">
            {copy.descriptionHeading}
          </h2>
          <div className="flex max-w-prose flex-col gap-6 text-lead">
            {project.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-12 flex max-w-prose flex-col items-start gap-4 border-t border-gray-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-h3">{copy.quoteCta.text}</p>
            <ButtonLink to={contactPath(category.slug)}>{copy.quoteCta.button}</ButtonLink>
          </div>
        </section>
      </div>

      <div className="container-page pb-section">
        <ProjectGallery
          images={project.gallery}
          headingId={`${ids}-galeri`}
          onOpen={(galleryIndex) => setViewerIndex(galleryIndex + 1)}
        />
      </div>

      {adjacent && (
        <div className="container-page pb-section">
          <AdjacentProjects previous={adjacent.previous} next={adjacent.next} />
        </div>
      )}

      <ImageViewer
        images={viewerImages}
        index={viewerIndex}
        label={copy.viewer.label(project.name)}
        onIndexChange={setViewerIndex}
        onClose={() => setViewerIndex(null)}
      />
    </article>
  )
}
