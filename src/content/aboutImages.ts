import { DRAWING_HEIGHT, DRAWING_WIDTH } from './drawingSize'
import type { ProjectImage } from './types'

/** Hakkımızda sayfası çizimleri (`scripts/drawings/about.ts` ile üretilir). */
const urls = import.meta.glob<string>('../assets/about/*.svg', {
  eager: true,
  query: '?url&no-inline',
  import: 'default',
})

function aboutDrawing(file: string, caption: string, alt: string): ProjectImage {
  const src = urls[`../assets/about/${file}.svg`]
  if (!src) throw new Error(`Çizim bulunamadı: about/${file}.svg`)
  return { src, alt, caption, width: DRAWING_WIDTH, height: DRAWING_HEIGHT }
}

export const aboutImages = {
  studio: aboutDrawing(
    'atolye',
    'Atölye',
    'Ofisin atölyesinin perspektif çizimi: iki uzun çizim masası, masalarda maketler, sol duvarda raflar ve arkada geniş pencere.',
  ),
  fourRoofs: aboutDrawing(
    'dort-cati',
    'Dört çatı',
    'Ortak bir bahçenin çevresine yerleşmiş dört küçük beşik çatılı evin aksonometrik çizimi; ofis adını bu ilk işten alır.',
  ),
}
