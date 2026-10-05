import { useParams } from 'react-router'
import { NotFoundView } from '../components/ui/NotFoundView'
import { PlaceholderPage } from '../components/ui/PlaceholderPage'
import { TextLink } from '../components/ui/TextLink'
import { findProjectBySlug } from '../content/projectQueries'
import { projects } from '../content/projects'
import { site } from '../content/site'
import { paths } from '../routes/paths'

export default function ProjectDetailPage() {
  const { slug = '' } = useParams()
  const project = findProjectBySlug(projects, slug)
  if (!project) return <NotFoundView />

  return (
    <PlaceholderPage heading={project.name} documentTitle={project.name}>
      <TextLink to={paths.projects}>{site.projectDetail.backToProjects}</TextLink>
    </PlaceholderPage>
  )
}
