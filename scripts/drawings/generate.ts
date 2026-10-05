/**
 * Proje çizimlerini üretir: src/assets/projects/<proje-id>/{kapak,galeri-1,galeri-2,galeri-3}.svg
 * Çalıştırma: npm run cizimler
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { drawAxonometric, drawElevation, drawPlan, drawSection } from './building.ts'
import { exteriors } from './exteriors.ts'
import { interiors } from './interiors.ts'

const outRoot = join(dirname(fileURLToPath(import.meta.url)), '../../src/assets/projects')

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
console.log(`${Object.keys(sets).length} proje, toplam ${(total / 1024).toFixed(1)} KB`)
