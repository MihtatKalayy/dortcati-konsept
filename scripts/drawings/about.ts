/**
 * Hakkımızda sayfası çizimleri: atölye perspektifi ve ofisin adını aldığı
 * "ortak bahçeli dört ev" aksonometrisi.
 */
import { drawAxonometric, type Volume } from './building.ts'
import { ACCENT, GLASS, Perspective, TONE_1, WHITE } from './interior.ts'

function atolye() {
  const v = new Perspective({ w: 7, h: 4.2, near: 1.8, far: 8, eye: 1.6 })
  v.shell()
  // Arka duvarda geniş atölye penceresi
  v.backRect(-3, 0.8, 3, 3.8)
  for (const x of [-1.5, 0, 1.5]) v.line([x, 0.8, 8], [x, 3.8, 8], { stroke: WHITE, width: 1 })
  v.line([-3, 2.3, 8], [3, 2.3, 8], { stroke: WHITE, width: 1 })
  // Sol duvar boyunca maket ve kitap rafları
  for (const y of [0.9, 1.5, 2.1, 2.7, 3.3]) v.line([-3.5, y, 2.4], [-3.5, y, 7.4], { width: 1 })
  for (let z = 2.4; z <= 7.4; z += 1) v.line([-3.5, 0.9, z], [-3.5, 3.3, z], { width: 1 })
  v.box(-3.5, -3.15, 2.1, 2.5, 6.3, 7.1, { fill: TONE_1 })
  v.box(-3.5, -3.1, 1.5, 1.95, 4.4, 5.2, { fill: ACCENT })
  v.box(-3.5, -3.2, 0.9, 1.2, 2.7, 3.9, { fill: TONE_1 })
  v.box(-3.5, -3.15, 2.7, 3.1, 3.3, 4.1, { fill: TONE_1 })
  // Uzun çizim masaları, üzerlerinde maket ve paftalar
  for (const [x0, x1] of [[-2.4, -0.6], [0.6, 2.4]] as const) {
    v.box(x0 + 0.1, x0 + 0.18, 0, 0.74, 6.6, 6.7, { fill: GLASS })
    v.box(x1 - 0.18, x1 - 0.1, 0, 0.74, 6.6, 6.7, { fill: GLASS })
    v.box(x0 + 0.1, x0 + 0.18, 0, 0.74, 3.1, 3.2, { fill: GLASS })
    v.box(x1 - 0.18, x1 - 0.1, 0, 0.74, 3.1, 3.2, { fill: GLASS })
    v.box(x0, x1, 0.74, 0.8, 3, 6.8)
  }
  v.box(1, 1.8, 0.8, 1.2, 4.6, 5.4, { fill: TONE_1 })
  v.box(1.25, 1.55, 1.2, 1.45, 4.8, 5.1, { fill: TONE_1 })
  v.box(-2.1, -1.1, 0.8, 0.82, 3.6, 4.4, { fill: WHITE })
  v.person(-3, 5.6)
  v.person(2.9, 4.4)
  v.pendant(-1.5, 4.9, 2)
  v.pendant(1.5, 4.9, 2)
  return v.toSvg()
}

function dortCati() {
  const house = (x: number, y: number, axis: 'x' | 'y', accentDoor: boolean): Volume => ({
    x, y, z: 0, w: 5, d: 5, h: 3.2,
    roof: { type: 'gable', axis, rise: 2.4 },
    openings: [
      { face: 'front', u: 1.9, v: 0, w: 1.1, h: 2.2, accent: accentDoor },
      { face: 'right', u: 1.5, v: 1, w: 2, h: 1.2 },
    ],
  })
  return drawAxonometric({
    site: { x: -2, y: -2, w: 17, d: 17 },
    ground: [],
    section: { axis: 'y', at: 0 },
    volumes: [house(0, 0, 'y', false), house(8, 0, 'x', false), house(0, 8, 'x', false), house(8, 8, 'y', true)],
    trees: [
      { x: 6.5, y: 6.5, kind: 'round', height: 3.6 },
    ],
  })
}

export const aboutDrawings: Record<string, () => string> = {
  atolye,
  'dort-cati': dortCati,
}
