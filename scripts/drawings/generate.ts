/**
 * Çizimleri üretir:
 * - src/assets/projects/<proje-id>/{kapak,galeri-1,galeri-2,galeri-3}.svg
 * - src/assets/about/{atolye,dort-cati}.svg
 * - src/assets/contact/konum.svg
 * Çalıştırma: npm run cizimler
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { aboutDrawings } from './about.ts'
import { locationDrawing } from './contact.ts'
import { drawAxonometric, drawElevation, drawPlan, drawSection } from './building.ts'
import { exteriors } from './exteriors.ts'
import { interiors } from './interiors.ts'

const assetsRoot = join(dirname(fileURLToPath(import.meta.url)), '../../src/assets')
const outRoot = join(assetsRoot, 'projects')

const sets = {
  ...Object.fromEntries(
    Object.entries(exteriors).map(([id, b]) => [
      id,
      {
        kapak: () => drawAxonometric(b),
        'galeri-1': () => drawElevation(b),
        'galeri-2': () => drawSection(b),
        'galeri-3': () => drawPlan(b),
      },
    ]),
  ),
  ...interiors,
}

let total = 0
for (const [id, drawings] of Object.entries(sets)) {
  const dir = join(outRoot, id)
  mkdirSync(dir, { recursive: true })
  for (const [name, draw] of Object.entries(drawings)) {
    const svg = draw()
    writeFileSync(join(dir, `${name}.svg`), svg)
    total += svg.length
  }
}
const aboutDir = join(assetsRoot, 'about')
mkdirSync(aboutDir, { recursive: true })
for (const [name, draw] of Object.entries(aboutDrawings)) {
  const svg = draw()
  writeFileSync(join(aboutDir, `${name}.svg`), svg)
  total += svg.length
}
const contactDir = join(assetsRoot, 'contact')
mkdirSync(contactDir, { recursive: true })
const location = locationDrawing()
writeFileSync(join(contactDir, 'konum.svg'), location)
total += location.length
console.log(`${Object.keys(sets).length} proje + ${Object.keys(aboutDrawings).length} Hakkımızda + 1 iletişim çizimi, toplam ${(total / 1024).toFixed(1)} KB`)
