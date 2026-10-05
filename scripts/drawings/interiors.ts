/**
 * İç mekân projelerinin çizimleri: perspektif (kapak), plan, iç cephe/kesit
 * ve detay aksonometrisi.
 */
import { drawAxonometric } from './building.ts'
import {
  ACCENT, arc, GLASS, INK, Perspective, rect, SOFT, standingFigure, TONE_1, TONE_2, wall, WHITE,
} from './interior.ts'
import { type Pt, Sheet } from './sheet.ts'

type DrawingSet = Record<'kapak' | 'galeri-1' | 'galeri-2' | 'galeri-3', () => string>

// --- Kitap kafe ------------------------------------------------------------

function kitapKafePerspective() {
  const v = new Perspective({ w: 7.2, h: 4.8, near: 2, far: 9, eye: 1.6 })
  v.shell()
  v.backRect(-1.8, 0.4, 1.8, 3.8)
  for (const x of [-0.6, 0.6]) v.line([x, 0.4, 9], [x, 3.8, 9], { stroke: WHITE, width: 1 })
  // Sol duvar boyunca raflar
  for (let y = 1.6; y <= 4.4; y += 0.5) v.line([-3.6, y, 2.5], [-3.6, y, 8.5], { width: 1 })
  for (let z = 2.5; z <= 8.5; z += 0.75) v.line([-3.6, 1.6, z], [-3.6, 4.8, z], { width: 1 })
  v.box(2.4, 3.6, 0, 1.05, 6, 8.6)
  // Raflardan inen oturma basamakları (yüksekten alçağa)
  v.box(-3.6, -2.9, 0, 1.35, 2.5, 7.5, { fill: TONE_1 })
  v.box(-3.6, -2.2, 0, 0.9, 2.5, 7.5, { fill: TONE_1 })
  v.box(-3.6, -1.5, 0, 0.45, 2.5, 7.5, { fill: TONE_1 })
  v.box(-0.4, 1.2, 0.72, 0.78, 3.5, 7.5)
  v.box(-0.9, -0.6, 0, 0.45, 3.8, 7.2)
  v.box(1.5, 1.8, 0, 0.45, 3.8, 7.2)
  v.person(2, 6.2)
  v.person(-0.9, 5.2, true)
  v.pendant(0.4, 7, 1.8)
  v.pendant(0.4, 5.5, 1.8, true)
  v.pendant(0.4, 4, 1.8)
  return v.toSvg()
}

function kitapKafePlan() {
  const s = new Sheet()
  rect(s, 0, 0, 10, 14, { fill: WHITE, width: 6 })
  s.path([[4, 14], [5.4, 14]], { stroke: WHITE, width: 8 })
  s.path([[4, 14], [5.4, 14]], { stroke: ACCENT, width: 3 })
  for (const [y0, y1] of [[3, 6], [8, 11]]) {
    s.path([[10, y0], [10, y1]], { stroke: WHITE, width: 8 })
    s.path([[10, y0], [10, y1]], { width: 1 })
  }
  for (let k = 0; k < 3; k++) rect(s, k * 0.7, 2, 0.7, 10, { fill: k % 2 ? TONE_1 : WHITE, width: 1 })
  rect(s, 2.5, 0, 7, 0.45, { fill: TONE_2, width: 1 })
  for (let x = 3.5; x < 9.5; x += 1) s.path([[x, 0], [x, 0.45]], { width: 1 })
  rect(s, 4.5, 3, 1, 7.5, { fill: WHITE, width: 1.5 })
  rect(s, 3.7, 3.3, 0.4, 6.9, { fill: WHITE, width: 1 })
  rect(s, 5.9, 3.3, 0.4, 6.9, { fill: WHITE, width: 1 })
  rect(s, 8.4, 9, 1.2, 4.2, { fill: TONE_2, width: 1.5 })
  for (const y of [4.2, 6.7, 9.2]) s.circle([5, y], 0.22, { fill: y === 6.7 ? ACCENT : INK, stroke: 'none' })
  return s.toSvg()
}

function kitapKafeWall() {
  const s = new Sheet()
  const H = 4.2
  rect(s, 0, -H, 14, H, { fill: WHITE, width: 6 })
  for (let y = 1.6; y <= 4.0; y += 0.5) s.path([[1.5, -y], [12.5, -y]], { width: 1 })
  for (let x = 1.5; x <= 12.5; x += 1.1) s.path([[x, -1.6], [x, -H]], { width: 1 })
  rect(s, 6.9, -2.6, 1.1, 0.5, { fill: ACCENT, stroke: 'none' })
  const steps: Pt[] = [[1.5, 0], [1.5, -1.35], [12.5, -1.35], [12.5, 0]]
  s.poly(steps, { fill: TONE_1, width: 1.5 })
  for (const y of [0.45, 0.9]) s.path([[1.5, -y], [12.5, -y]], { width: 1 })
  standingFigure(s, 13.2, 0)
  for (const x of [3, 7.5, 10]) {
    s.circle([x, -2.35], 0.12, { fill: INK, stroke: 'none' })
    s.poly([[x - 0.2, -2.2], [x + 0.2, -2.2], [x + 0.18, -1.35], [x - 0.2, -1.35]], { fill: INK, stroke: 'none' })
  }
  return s.toSvg()
}

function kitapKafeDetail() {
  return drawAxonometric({
    ground: [],
    section: { axis: 'y', at: 0 },
    volumes: [
      {
        x: 0, y: 0, z: 0, w: 6, d: 0.4, h: 3.2,
        openings: [0, 1, 2].flatMap((r) =>
          [0, 1, 2, 3, 4, 5].map((c) => ({
            face: 'front' as const, u: 0.12 + c, v: 1.5 + r * 0.58, w: 0.76, h: 0.46, accent: r === 1 && c === 3,
          })),
        ),
      },
      { x: 0, y: 0.4, z: 0, w: 6, d: 0.7, h: 1.35 },
      { x: 0, y: 1.1, z: 0, w: 6, d: 0.7, h: 0.9 },
      { x: 0, y: 1.8, z: 0, w: 6, d: 0.7, h: 0.45 },
    ],
  })
}

// --- Küçük daire -----------------------------------------------------------

function kucukDairePerspective() {
  const v = new Perspective({ w: 5.4, h: 2.8, near: 1.6, far: 9, eye: 1.5 })
  v.shell()
  v.backRect(-2.2, 0.5, 2.2, 2.4)
  v.line([0, 0.5, 9], [0, 2.4, 9], { stroke: WHITE, width: 1 })
  // Sağ duvarda sürgülü paneller; ortadaki açık
  for (const [i, z] of [2.5, 4.1, 5.7].entries()) {
    const open = i === 1
    v.sideRect('right', z, 0, z + 1.6, 2.5, { fill: open ? GLASS : WHITE, width: 1.2 })
    if (open) for (const y of [0.6, 1.2, 1.8]) v.line([2.7, y, z], [2.7, y, z + 1.6], { stroke: WHITE, width: 1 })
  }
  v.line([2.7, 2.5, 2.5], [2.7, 2.5, 7.3], { stroke: ACCENT, width: 2 })
  v.box(-2.7, -1.1, 0, 0.45, 6.5, 9, { fill: TONE_1 })
  v.box(-2.6, -1.2, 0.45, 0.65, 6.6, 8.9)
  v.box(-2.7, -2.3, 0, 0.45, 2.8, 4.8, { fill: TONE_1 })
  v.box(-2.7, -1.9, 0.72, 0.76, 3, 4.4)
  v.person(0.6, 5.5)
  v.pendant(-2, 3.7, 0.9)
  return v.toSvg()
}

function kucukDairePlan() {
  const s = new Sheet()
  rect(s, 0, 0, 5.4, 12.5, { fill: WHITE, width: 6 })
  s.path([[1, 0], [4.4, 0]], { stroke: WHITE, width: 8 })
  s.path([[1, 0], [4.4, 0]], { width: 1 })
  s.path([[0.8, 12.5], [1.8, 12.5]], { stroke: WHITE, width: 8 })
  s.path([[0.8, 12.5], [1.8, 12.5]], { stroke: ACCENT, width: 3 })
  wall(s, 3.4, 10, 5.4, 10)
  wall(s, 3.4, 10, 3.4, 11.3)
  rect(s, 0.1, 0.2, 1.6, 4, { fill: TONE_1, width: 1 })
  rect(s, 0.1, 6.5, 0.8, 2.4, { fill: WHITE, width: 1 })
  rect(s, 0.9, 6.9, 0.8, 1.6, { fill: WHITE, width: 1 })
  s.path([[4.9, 2.5], [4.9, 9.5]], { stroke: ACCENT, width: 1.5, dash: '6 4' })
  for (let y = 2.5; y < 9.5; y += 1.4) rect(s, 4.95, y, 0.12, 1.4, { fill: INK, stroke: 'none' })
  return s.toSvg()
}

function kucukDaireWall() {
  const s = new Sheet()
  const H = 2.8
  rect(s, 0, -H, 12.5, H, { fill: WHITE, width: 6 })
  for (let i = 0; i < 5; i++) {
    const x = 2.5 + i * 1.6
    const open = i === 1 || i === 3
    rect(s, x, -2.5, 1.6, 2.5, { fill: open ? TONE_1 : WHITE, width: 1.2 })
    if (open) for (const y of [0.6, 1.2, 1.8]) s.path([[x, -y], [x + 1.6, -y]], { width: 1 })
  }
  s.path([[5.7, -0.75], [7.3, -0.75]], { stroke: ACCENT, width: 4 })
  s.path([[2.5, -2.55], [10.5, -2.55]], { width: 1 })
  standingFigure(s, 11.4, 0)
  return s.toSvg()
}

function kucukDaireDetail() {
  return drawAxonometric({
    ground: [],
    section: { axis: 'y', at: 0 },
    volumes: [
      {
        x: 0, y: 0, z: 0, w: 4.8, d: 0.6, h: 2.6,
        openings: [
          { face: 'front', u: 0.1, v: 0.1, w: 1.4, h: 2.4 },
          { face: 'front', u: 3.3, v: 0.1, w: 1.4, h: 2.4 },
          { face: 'front', u: 1.6, v: 1.3, w: 1.6, h: 1.2 },
        ],
      },
      {
        x: 1.6, y: 0.6, z: 0.72, w: 1.6, d: 0.8, h: 0.05,
        openings: [{ face: 'front', u: 0, v: 0, w: 1.6, h: 0.05, accent: true }],
      },
    ],
  })
}

// --- Sakin klinik ----------------------------------------------------------

function klinikPerspective() {
  const v = new Perspective({ w: 3.2, h: 3, near: 1.6, far: 11, eye: 1.55 })
  v.shell()
  v.backRect(-1, 0.8, 1, 2.4, { fill: TONE_2 })
  for (const z of [3.5, 6.5, 9.5]) v.sideRect('right', z, 0, z + 1.1, 2.2, { fill: TONE_1, width: 1.2 })
  // Kavisli sol duvar
  const curve = (z: number) => -1.6 + 0.5 * Math.sin((Math.PI * (z - 2.5)) / 7)
  const zs = Array.from({ length: 15 }, (_, i) => 9.5 - i * 0.5)
  for (let i = 0; i < zs.length - 1; i++) {
    const [z0, z1] = [zs[i], zs[i + 1]]
    v.sheet.poly([v.p(curve(z0), 0, z0), v.p(curve(z1), 0, z1), v.p(curve(z1), 3, z1), v.p(curve(z0), 3, z0)], {
      fill: WHITE, stroke: SOFT, width: 0.6,
    })
  }
  v.sheet.path(zs.map((z) => v.p(curve(z), 0.45, z)), { width: 1.2 })
  v.line([1.6, 2.75, 1.6], [1.6, 2.75, 11], { stroke: ACCENT, width: 2 })
  v.line([1.3, 3, 1.6], [1.3, 3, 11], { width: 1 })
  v.person(0.5, 6.5)
  return v.toSvg()
}

function klinikPlan() {
  const s = new Sheet()
  rect(s, 0, 0, 14, 15, { fill: WHITE, width: 6 })
  s.path([[2, 15], [3.6, 15]], { stroke: WHITE, width: 8 })
  s.path([[2, 15], [3.6, 15]], { width: 1 })
  wall(s, 9.5, 0, 9.5, 15)
  for (const y of [4, 8, 12]) wall(s, 9.5, y, 14, y)
  for (const y of [1.2, 5.2, 9.2, 13]) {
    s.path([[9.5, y], [9.5, y + 1]], { stroke: WHITE, width: 8 })
  }
  s.path(arc(4.5, 6, 4, Math.PI * 0.95, Math.PI * 2.05, 40), { width: 3 })
  s.path(arc(4.5, 11.5, 2.2, Math.PI * 1.1, Math.PI * 1.9, 20), { stroke: ACCENT, width: 5 })
  for (const [x, y] of [[1.5, 7], [1.5, 8.2], [1.5, 9.4]] as Pt[]) s.circle([x, y], 0.3, { fill: TONE_1, width: 1 })
  return s.toSvg()
}

function klinikSection() {
  const s = new Sheet()
  const W = 6
  const H = 3.4
  s.poly([[0, 0], [W, 0], [W, -H], [0, -H]], { fill: WHITE, width: 6 })
  const ceiling: Pt[] = [[0.6, -H], [0.6, -2.85], [0.9, -2.85], [0.9, -3.0], [W - 0.9, -3.0], [W - 0.9, -2.85], [W - 0.6, -2.85], [W - 0.6, -H]]
  s.path(ceiling, { width: 2 })
  for (const x0 of [0.75, W - 0.75]) {
    const dir = x0 < W / 2 ? 1 : -1
    for (const k of [0.6, 1.2, 1.8]) s.path([[x0, -2.95], [x0 + dir * k, -H + 0.05]], { stroke: ACCENT, width: 1.5, dash: '6 5' })
    s.circle([x0, -2.92], 0.06, { fill: ACCENT, stroke: 'none' })
  }
  rect(s, 2.2, -0.75, 2.2, 0.75, { fill: TONE_1, width: 1.5 })
  standingFigure(s, 1.4, 0)
  s.path([[-1, 0], [W + 1, 0]], { width: 3 })
  s.hatch([[-1, 0], [W + 1, 0], [W + 1, 0.8], [-1, 0.8]], 9, 45)
  return s.toSvg()
}

function klinikDetail() {
  return drawAxonometric({
    ground: [],
    section: { axis: 'y', at: 0 },
    volumes: [
      { x: 0, y: 0, z: 0, w: 4, d: 0.9, h: 1.1 },
      {
        x: 0, y: 0.9, z: 0, w: 4, d: 0.5, h: 0.75,
        openings: [{ face: 'front', u: 0, v: 0.08, w: 4, h: 0.05, accent: true }],
      },
      { x: 4, y: 0, z: 0, w: 1.2, d: 1.4, h: 0.75 },
    ],
  })
}

export const interiors: Record<string, DrawingSet> = {
  'prj-007': { kapak: kitapKafePerspective, 'galeri-1': kitapKafePlan, 'galeri-2': kitapKafeWall, 'galeri-3': kitapKafeDetail },
  'prj-008': { kapak: kucukDairePerspective, 'galeri-1': kucukDairePlan, 'galeri-2': kucukDaireWall, 'galeri-3': kucukDaireDetail },
  'prj-009': { kapak: klinikPerspective, 'galeri-1': klinikPlan, 'galeri-2': klinikSection, 'galeri-3': klinikDetail },
}
