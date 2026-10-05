import { Link } from 'react-router'
import { ProjectCard } from '../components/projects/ProjectCard'
import { ButtonLink } from '../components/ui/ButtonLink'
import { PageHeading } from '../components/ui/PageHeading'
import { getFeaturedProjects } from '../content/projectQueries'
import { getCategory, projects } from '../content/projects'
import { services } from '../content/services'
import { site } from '../content/site'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useMetaDescription } from '../hooks/useMetaDescription'
import { paths, projectDetailPath } from '../routes/paths'

const featuredProjects = getFeaturedProjects(projects, 3)
const heroProject = featuredProjects[0]
// Öne çıkan projeler bölümü kapakları gösterir; hero aynı projenin ilk galeri çizimini kullanır.
const heroImage = heroProject.gallery[0]

const sectionLabel = 'font-sans text-sm font-semibold tracking-widest text-gray-600 uppercase'
const textLink = 'font-medium text-accent underline underline-offset-4 hover:text-accent-strong'

export default function HomePage() {
  const copy = site.home
  useDocumentTitle()
  useMetaDescription(copy.metaDescription)

  return (
    <>
      {/* Açılış */}
      <section className="container-page pt-12 pb-section md:pt-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <PageHeading size="display">{site.brand.tagline}</PageHeading>
          <div className="flex flex-col gap-8">
            <p className="max-w-prose text-lead text-gray-600">{copy.hero.lead}</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink to={paths.projects}>{copy.hero.primaryCta}</ButtonLink>
              <ButtonLink to={paths.contact} variant="secondary">
                {copy.hero.secondaryCta}
              </ButtonLink>
            </div>
          </div>
        </div>
        <figure className="mt-12 md:mt-16">
          <div className="overflow-hidden border border-gray-200 bg-white">
            <img
              src={heroImage.src}
              alt={heroImage.alt}
              width={heroImage.width}
              height={heroImage.height}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="block h-auto w-full"
            />
          </div>
          <figcaption className="mt-3 text-sm text-gray-600">
            <Link to={projectDetailPath(heroProject.slug)} className="underline-offset-4 hover:text-accent hover:underline">
              {copy.hero.imageCaption(heroProject.name, heroImage.caption)}
            </Link>
          </figcaption>
        </figure>
      </section>

      {/* Yaklaşım */}
      <section aria-labelledby="ana-yaklasim" className="border-t border-gray-200">
        <div className="container-page grid gap-8 py-section lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          <h2 id="ana-yaklasim" className={sectionLabel}>
            {copy.intro.heading}
          </h2>
          <div>
            <p className="max-w-[30ch] font-display text-h2 text-balance">{copy.intro.body}</p>
            <Link to={paths.about} className={`mt-10 inline-block ${textLink}`}>
              {copy.intro.link}
            </Link>
          </div>
        </div>
      </section>

      {/* Öne çıkan projeler */}
      <section aria-labelledby="ana-projeler" className="border-t border-gray-200">
        <div className="container-page py-section">
          <h2 id="ana-projeler" className="text-h2">
            {copy.featured.heading}
          </h2>
          <ul className="mt-12 grid gap-y-16 md:grid-cols-2 md:gap-x-10 lg:gap-x-16">
            {featuredProjects.map((project, index) => (
              <li key={project.id} className={index === 0 ? 'md:col-span-2' : undefined}>
                <ProjectCard
                  project={project}
                  categoryName={getCategory(project.categoryId).name}
                  headingLevel="h3"
                />
              </li>
            ))}
          </ul>
          <Link to={paths.projects} className={`mt-14 inline-block ${textLink}`}>
            {copy.featured.link}
          </Link>
        </div>
      </section>

      {/* Hizmetler özeti */}
      <section aria-labelledby="ana-hizmetler" className="border-t border-gray-200">
        <div className="container-page grid gap-10 py-section lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          <h2 id="ana-hizmetler" className="text-h2">
            {copy.services.heading}
          </h2>
          <div>
            <ol className="border-t border-gray-200">
              {services.map((service, index) => (
                <li key={service.id} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 border-b border-gray-200 py-6 md:grid-cols-[4rem_minmax(0,1fr)]">
                  <span aria-hidden="true" className="font-display text-h3 text-gray-500 tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-h3">{service.name}</h3>
                    <p className="mt-2 max-w-prose text-gray-600">{service.summary}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link to={paths.services} className={`mt-10 inline-block ${textLink}`}>
              {copy.services.link}
            </Link>
          </div>
        </div>
      </section>

      {/* Kapanış çağrısı */}
      <section aria-labelledby="ana-kapanis" className="border-t border-gray-200">
        <div className="container-page flex flex-col items-start gap-10 py-section">
          <h2 id="ana-kapanis" className="max-w-[18ch] text-h1">
            {copy.closing.heading}
          </h2>
          <ButtonLink to={paths.contact}>{copy.closing.cta}</ButtonLink>
        </div>
      </section>
    </>
  )
}
