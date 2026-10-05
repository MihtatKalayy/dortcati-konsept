/**
 * İç mekân çizimleri için tek kaçış noktalı perspektif yardımcıları.
 * Göz (0, eye, 0) noktasında, +z yönüne bakar. x sağa, y yukarı.
 */
import { ACCENT, GLASS, INK, type Pt, SOFT, Sheet, type Style, TONE_1, TONE_2, WHITE } from './sheet.ts'

export interface Room {
  w: number
  h: number
  /** Ön (kesit) düzlemi ve arka duvarın derinliği. */
  near: number
  far: number
  eye: number
}

export class Perspective {
  readonly sheet = new Sheet()
  readonly room: Room

  constructor(room: Room) {
    this.room = room
  }

  p(x: number, y: number, z: number): Pt {
    return [x / z, -(y - this.room.eye) / z]
  }

  /** Oda kabuğu: zemin, tavan, yan duvarlar ve arka duvar. */
  shell() {
    const { w, h, near, far } = this.room
    const [l, r] = [-w / 2, w / 2]
    const q = (pts: [number, number, number][], style: Style) => this.sheet.poly(pts.map(([x, y, z]) => this.p(x, y, z)), style)
    q([[l, 0, near], [r, 0, near], [r, 0, far], [l, 0, far]], { fill: TONE_1 })
    q([[l, h, near], [r, h, near], [r, h, far], [l, h, far]], { fill: WHITE })
    q([[l, 0, near], [l, h, near], [l, h, far], [l, 0, far]], { fill: WHITE })
    q([[r, 0, near], [r, h, near], [r, h, far], [r, 0, far]], { fill: WHITE })
    q([[l, 0, far], [r, 0, far], [r, h, far], [l, h, far]], { fill: WHITE })
    // Zemin derzleri
    for (let x = l + 0.6; x < r; x += 0.6) this.line([x, 0, near], [x, 0, far], { stroke: SOFT, width: 0.8 })
    // Kesit çerçevesi
    this.sheet.poly([this.p(l, 0, near), this.p(r, 0, near), this.p(r, h, near), this.p(l, h, near)], { fill: 'none', width: 6 })
  }

  line(a: [number, number, number], b: [number, number, number], style: Style = {}) {
    this.sheet.path([this.p(...a), this.p(...b)], style)
  }

  /** Arka duvarda dikdörtgen (pencere, kapı, pano). */
  backRect(x0: number, y0: number, x1: number, y1: number, style: Style = { fill: GLASS }) {
    const z = this.room.far
    this.sheet.poly([this.p(x0, y0, z), this.p(x1, y0, z), this.p(x1, y1, z), this.p(x0, y1, z)], style)
  }

  /** Yan duvarda dikdörtgen; side: 'left' | 'right'. */
  sideRect(side: 'left' | 'right', z0: number, y0: number, z1: number, y1: number, style: Style = { fill: GLASS }) {
    const x = side === 'left' ? -this.room.w / 2 : this.room.w / 2
    this.sheet.poly([this.p(x, y0, z0), this.p(x, y0, z1), this.p(x, y1, z1), this.p(x, y1, z0)], style)
  }

  /** Kutu (mobilya). Görünen yüzleri arkadan öne çizer. */
  box(x0: number, x1: number, y0: number, y1: number, z0: number, z1: number, front: Style = { fill: WHITE }) {
    const P = (x: number, y: number, z: number) => this.p(x, y, z)
    const side: Style = { fill: TONE_2 }
    if (x0 > 0) this.sheet.poly([P(x0, y0, z0), P(x0, y0, z1), P(x0, y1, z1), P(x0, y1, z0)], side)
    if (x1 < 0) this.sheet.poly([P(x1, y0, z0), P(x1, y0, z1), P(x1, y1, z1), P(x1, y1, z0)], side)
    if (y1 < this.room.eye) this.sheet.poly([P(x0, y1, z0), P(x1, y1, z0), P(x1, y1, z1), P(x0, y1, z1)], { fill: WHITE })
    if (y0 > this.room.eye) this.sheet.poly([P(x0, y0, z0), P(x1, y0, z0), P(x1, y0, z1), P(x0, y0, z1)], { fill: TONE_1 })
    this.sheet.poly([P(x0, y0, z0), P(x1, y0, z0), P(x1, y1, z0), P(x0, y1, z0)], front)
  }

  pendant(x: number, z: number, drop: number, accent = false) {
    const { h } = this.room
    this.line([x, h, z], [x, h - drop, z], { width: 1 })
    const [cx, cy] = this.p(x, h - drop, z)
    const s = 0.22 / z
    this.sheet.poly(
      [
        [cx - s * 0.4, cy],
        [cx + s * 0.4, cy],
        [cx + s, cy + s * 0.8],
        [cx - s, cy + s * 0.8],
      ],
      { fill: accent ? ACCENT : INK, stroke: 'none' },
    )
  }

  person(x: number, z: number, seated = false) {
    const P = (dx: number, y: number) => this.p(x + dx, y, z)
    const top = seated ? 1.25 : 1.72
    const r = 0.12 / z
    this.sheet.circle(P(0, top - 0.1), r, { fill: INK, stroke: 'none' })
    this.sheet.poly(
      seated
        ? [P(-0.2, 1.05), P(0.2, 1.05), P(0.18, 0.45), P(0.45, 0.45), P(0.45, 0), P(0.32, 0), P(0.32, 0.3), P(-0.16, 0.3)]
        : [P(-0.2, 1.48), P(0.2, 1.48), P(0.14, 0.88), P(0.1, 0), P(-0.1, 0), P(-0.14, 0.88)],
      { fill: INK, stroke: 'none' },
    )
  }

  toSvg() {
    return this.sheet.toSvg(48)
  }
}

/** Ortografik (plan, iç cephe) çizimler için küçük yardımcılar; y aşağı. */
export function rect(sheet: Sheet, x: number, y: number, w: number, h: number, style: Style = {}) {
  sheet.poly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], style)
}

export function wall(sheet: Sheet, x1: number, y1: number, x2: number, y2: number) {
  sheet.path([[x1, y1], [x2, y2]], { width: 6, stroke: INK })
}

export function arc(cx: number, cy: number, r: number, a0: number, a1: number, steps = 24): Pt[] {
  const pts: Pt[] = []
  for (let i = 0; i <= steps; i++) {
    const a = a0 + ((a1 - a0) * i) / steps
    pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r])
  }
  return pts
}

export function standingFigure(sheet: Sheet, x: number, floor: number, accent = false) {
  const color = accent ? ACCENT : INK
  sheet.circle([x, floor - 1.62], 0.12, { fill: color, stroke: 'none' })
  sheet.poly(
    [
      [x - 0.2, floor - 1.45],
      [x + 0.2, floor - 1.45],
      [x + 0.14, floor - 0.85],
      [x + 0.1, floor],
      [x - 0.1, floor],
      [x - 0.14, floor - 0.85],
    ],
    { fill: color, stroke: 'none' },
  )
}

export { ACCENT, GLASS, INK, SOFT, TONE_1, TONE_2, WHITE }
