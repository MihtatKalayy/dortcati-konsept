import { TeamMemberCard } from '../components/about/TeamMemberCard'
import { ButtonLink } from '../components/ui/ButtonLink'
import { PageHeading } from '../components/ui/PageHeading'
import { aboutImages } from '../content/aboutImages'
import { site } from '../content/site'
import { team } from '../content/team'
import type { ProjectImage } from '../content/types'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useMetaDescription } from '../hooks/useMetaDescription'
import { paths } from '../routes/paths'

function Drawing({ image, priority = false }: { image: ProjectImage; priority?: boolean }) {
  return (
    <figure>
      <div className="overflow-hidden border border-gray-200 bg-white">
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 text-sm text-gray-600">{image.caption}</figcaption>
    </figure>
  )
}

export default function AboutPage() {
  const copy = site.about
  useDocumentTitle(copy.documentTitle)
  useMetaDescription(copy.metaDescription)

  return (
    <>
      <section className="container-page pt-12 pb-section md:pt-20">
        <PageHeading>{copy.heading}</PageHeading>
        <p className="mt-10 max-w-[32ch] font-display text-h2 text-balance">{copy.lead}</p>
        <div className="mt-14 md:mt-20">
          <Drawing image={aboutImages.studio} priority />
        </div>
      </section>

      <section aria-labelledby="hakkimizda-hikaye" className="border-t border-gray-200">
        <div className="container-page grid gap-10 py-section lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          <h2 id="hakkimizda-hikaye" className="text-h2">
            {copy.story.heading}
          </h2>
          <div>
            <div className="flex max-w-prose flex-col gap-6 text-lead">
              {copy.story.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-14">
              <Drawing image={aboutImages.fourRoofs} />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="hakkimizda-ilkeler" className="bg-white">
        <div className="container-page py-section">
          <h2 id="hakkimizda-ilkeler" className="text-h2">
            {copy.principles.heading}
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {copy.principles.items.map((principle, index) => (
              <li key={principle.id} className="border-t-2 border-ink pt-5">
                <span aria-hidden="true" className="font-display text-h3 text-accent tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-xl">{principle.title}</h3>
                <p className="mt-3 text-gray-600">{principle.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="hakkimizda-ekip">
        <div className="container-page py-section">
          <h2 id="hakkimizda-ekip" className="text-h2">
            {copy.team.heading}
          </h2>
          <p className="mt-6 max-w-prose border-l-4 border-accent pl-4 text-sm font-medium text-gray-600">
            {copy.team.note}
          </p>
          <ul className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {team.map((member) => (
              <li key={member.id}>
                <TeamMemberCard member={member} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="hakkimizda-kapanis" className="border-t border-gray-200">
        <div className="container-page flex flex-col items-start gap-10 py-section">
          <h2 id="hakkimizda-kapanis" className="max-w-[20ch] text-h1">
            {copy.closing.heading}
          </h2>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to={paths.projects} variant="secondary">
              {copy.closing.projectsLink}
            </ButtonLink>
            <ButtonLink to={paths.contact}>{copy.closing.contactLink}</ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
