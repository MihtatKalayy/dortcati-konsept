import { site } from '../../content/site'
import type { ProjectImage } from '../../content/types'

interface ImageButtonProps {
  image: ProjectImage
  onOpen: () => void
  /** Kapak gibi ilk ekranda görünen görsel: hemen ve öncelikli yüklenir. */
  priority?: boolean
}

/** Tıklanınca veya klavyeyle seçilince tam ekran görüntüleyiciyi açan görsel. */
export function ImageButton({ image, onOpen, priority = false }: ImageButtonProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className="group block w-full cursor-zoom-in overflow-hidden border border-gray-200 bg-white"
    >
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
      />
      <span className="sr-only"> {site.projectDetail.openImageHint}</span>
    </button>
  )
}
