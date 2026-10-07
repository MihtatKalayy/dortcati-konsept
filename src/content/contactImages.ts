import { DRAWING_HEIGHT, DRAWING_WIDTH } from './drawingSize'
import { site } from './site'
import type { ProjectImage } from './types'

/** İletişim sayfasındaki stilize konum çizimi (`scripts/drawings/contact.ts`); harita gömülmez. */
const urls = import.meta.glob<string>('../assets/contact/*.svg', {
  eager: true,
  query: '?url&no-inline',
  import: 'default',
})

const src = urls['../assets/contact/konum.svg']
if (!src) throw new Error('Çizim bulunamadı: contact/konum.svg')

export const locationImage: ProjectImage = {
  src,
  alt: site.contactPage.info.mapAlt,
  caption: site.contactPage.info.mapCaption,
  width: DRAWING_WIDTH,
  height: DRAWING_HEIGHT,
}
