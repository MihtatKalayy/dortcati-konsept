import { site } from '../../content/site'
import type { ProjectImage } from '../../content/types'
import { ImageButton } from './ImageButton'

interface ProjectGalleryProps {
  images: readonly ProjectImage[]
  headingId: string
  onOpen: (galleryIndex: number) => void
}

/**
 * Editoryal galeri: her üç görselden ilki tam genişlikte, diğer ikisi yan yana.
 * Görsellerin boyutları belirtilidir ve tembel yüklenir; düzen kaymaz.
 */
export function ProjectGallery({ images, headingId, onOpen }: ProjectGalleryProps) {
  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId} className="text-h2">
        {site.projectDetail.galleryHeading}
      </h2>
      <ul className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:gap-x-12">
        {images.map((image, index) => (
          <li key={image.src} className={index % 3 === 0 ? 'md:col-span-2' : undefined}>
            <figure>
              <ImageButton image={image} onOpen={() => onOpen(index)} />
              <figcaption className="mt-3 text-sm text-gray-600">{image.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
