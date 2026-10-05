import { useEffect, useId, useRef } from 'react'
import { site } from '../../content/site'
import type { ProjectImage } from '../../content/types'
import { useModalDialog } from '../../hooks/useModalDialog'

interface ImageViewerProps {
  images: readonly ProjectImage[]
  /** Açık görselin sırası; null ise görüntüleyici kapalıdır. */
  index: number | null
  label: string
  onIndexChange: (index: number) => void
  onClose: () => void
}

const SWIPE_THRESHOLD = 50

/**
 * Tam ekran görsel görüntüleyici. Yerel modal <dialog>: odak içeride kalır,
 * Escape ile kapanır, kapanınca odak açan görsele döner. Sol/sağ ok tuşları ve
 * dokunmatik kaydırma ile görseller arasında döngüsel geçiş yapılır.
 */
export function ImageViewer({ images, index, label, onIndexChange, onClose }: ImageViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const positionId = useId()
  const open = index !== null
  const copy = site.projectDetail.viewer
  useModalDialog(dialogRef, open)

  const step = (delta: number) => {
    if (index === null) return
    onIndexChange((index + delta + images.length) % images.length)
  }
  // Olay dinleyicileri her çizimde güncel adımı kullansın.
  const stepRef = useRef(step)
  useEffect(() => {
    stepRef.current = step
  })

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') stepRef.current(-1)
      else if (event.key === 'ArrowRight') stepRef.current(1)
      else return
      event.preventDefault()
    }
    let startX: number | null = null
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') startX = event.clientX
    }
    const onPointerUp = (event: PointerEvent) => {
      if (startX === null) return
      const dx = event.clientX - startX
      startX = null
      if (Math.abs(dx) >= SWIPE_THRESHOLD) stepRef.current(dx < 0 ? 1 : -1)
    }
    dialog.addEventListener('keydown', onKeyDown)
    dialog.addEventListener('pointerdown', onPointerDown)
    dialog.addEventListener('pointerup', onPointerUp)
    return () => {
      dialog.removeEventListener('keydown', onKeyDown)
      dialog.removeEventListener('pointerdown', onPointerDown)
      dialog.removeEventListener('pointerup', onPointerUp)
    }
  }, [])

  const image = index === null ? null : images[index]
  const button =
    'min-h-11 whitespace-nowrap border border-gray-700 px-3 py-2 text-white sm:px-4 transition-colors hover:border-white disabled:opacity-40'

  return (
    <dialog
      ref={dialogRef}
      aria-label={label}
      aria-describedby={positionId}
      onClose={onClose}
      className="m-0 h-dvh max-h-none w-full max-w-none touch-pan-y bg-ink p-0 text-white backdrop:bg-ink"
    >
      {image && index !== null && (
        <div className="flex h-full flex-col">
          <div className="container-page flex items-center justify-between gap-4 py-3">
            <p id={positionId} aria-live="polite" className="text-sm text-gray-300">
              {copy.position(index + 1, images.length, image.caption)}
            </p>
            <button type="button" onClick={onClose} className={button}>
              {copy.close}
            </button>
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-center px-[var(--spacing-gutter)]">
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="max-h-full w-auto max-w-full object-contain"
            />
          </div>

          <div className="container-page flex items-center justify-between gap-4 py-4">
            <button type="button" onClick={() => step(-1)} className={button} disabled={images.length < 2}>
              <span aria-hidden="true">← </span>
              {copy.previous}
            </button>
            <button type="button" onClick={() => step(1)} className={button} disabled={images.length < 2}>
              {copy.next}
              <span aria-hidden="true"> →</span>
            </button>
          </div>
        </div>
      )}
    </dialog>
  )
}
