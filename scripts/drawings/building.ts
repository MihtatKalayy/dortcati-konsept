/**
 * Kütle modeli ve bu modelden üretilen dört çizim türü:
 * aksonometri (izometrik), cephe, kesit ve plan.
 * Birimler metre; z yukarı, y cepheye (izleyiciye) doğru artar.
 */
import { ACCENT, GLASS, INK, type Pt, SOFT, Sheet, TONE_1, TONE_2, WHITE } from './sheet.ts'

export type Axis = 'x' | 'y'

export type Roof =
  | { type: 'flat' }
  | { type: 'shed'; axis: Axis; rise: number }
  | { type: 'gable'; axis: Axis; rise: number }
  | { type: 'saw'; count: number; rise: number }
  | { type: 'barrel'; axis: Axis; rise: number }

export type Material = 'plain' | 'stone' | 'wood' | 'earth' | 'glass'

export interface Opening {
  face: 'front' | 'right'
  /** Yüzey üzerindeki yatay konum (yüzeyin sol/arka kenarından). */
  u: number
  /** Yüzeyin alt kenarından yükseklik. */
  v: number
  w: number
  h: number
  accent?: boolean
}

export interface Volume {
  x: number
  y: number
  z: number
  w: number
  d: number
  h: number
  roof?: Roof
  material?: Material
  openings?: Opening[]
  /** Kesitte gösterilecek ara döşemeler (hacmin tabanına göre). */
  floors?: number[]
  /** false: planda kesik çizgiyle gösterilir (saçak, istinat duvarı gibi). */
  plan?: boolean
}

export type TreeKind = 'round' | 'olive' | 'cypress' | 'pine'

export interface Tree {
  x: number
  y: number
  kind: TreeKind
  height: number
}

export interface Building {
  /** Aksonometride çizim sırası: arkadan öne. */
  volumes: Volume[]
  trees?: Tree[]
  /** Cephe ve kesitte zemin çizgisi [yatay konum, kot]. */
  ground: Pt[]
  section: { axis: Axis; at: number; ground?: Pt[]; people?: Pt[]; light?: Pt[] }
  elevationPeople?: number[]
  partitions?: [number, number, number, number][]
  site?: { x: number; y: number; w: number; d: number }
  /** Aksonometride yerdeki ince çizgiler (bağ sıraları, döşeme derzi vb.). */
  groundLines?: [number, number, number, number][]
}

/** Hacmin (x, y) noktasındaki çatı üst kotu. */
export function heightAt(v: Volume, x: number, y: number): number {
  const top = v.z + v.h
  const roof = v.roof ?? { type: 'flat' }
  const fx = (x - v.x) / v.w
  const fy = (y - v.y) / v.d
  switch (roof.type) {
    case 'flat':
      return top
    case 'shed':
      return top + roof.rise * (roof.axis === 'x' ? fx : fy)
    case 'gable': {
      const t = roof.axis === 'x' ? fy : fx
      return top + roof.rise * (1 - Math.abs(t - 0.5) * 2)
    }
    case 'saw': {
      const tooth = (fx * roof.count) % 1
      return top + roof.rise * (fx >= 1 ? 1 : tooth)
    }
    case 'barrel': {
      const t = (roof.axis === 'x' ? fy : fx) * 2 - 1
      return top + roof.rise * Math.sqrt(Math.max(0, 1 - t * t))
    }
  }
}

// --- Aksonometri ---------------------------------------------------------

const C = Math.cos(Math.PI / 6)
const S = 0.5
const iso = (x: number, y: number, z: number): Pt => [(x - y) * C, (x + y) * S - z]

const FACE_FILL = { top: WHITE, front: TONE_1, right: TONE_2 }

function materialLines(
  sheet: Sheet,
  material: Material | undefined,
  map: (u: number, v: number) => Pt,
  len: number,
  height: number,
) {
  const soft = { stroke: SOFT, width: 1 }
  if (material === 'wood') {
    for (let u = 0.3; u < len; u += 0.3) sheet.path([map(u, 0), map(u, height)], soft)
  } else if (material === 'earth') {
    let v = 0.22
    let i = 0
    while (v < height) {
      sheet.path([map(0, v), map(len, v)], soft)
      v += i++ % 3 === 0 ? 0.38 : 0.22
    }
  } else if (material === 'stone') {
    let row = 0
    for (let v = 0.4; v < height; v += 0.4, row++) {
      sheet.path([map(0, v), map(len, v)], soft)
      for (let u = row % 2 ? 0.45 : 0.9; u < len; u += 0.9) sheet.path([map(u, v - 0.4), map(u, v)], soft)
    }
  } else if (material === 'glass') {
    for (let u = 1.2; u < len; u += 1.2) sheet.path([map(u, 0), map(u, height)], { stroke: WHITE, width: 1 })
  }
}

function openingsOn(sheet: Sheet, v: Volume, face: Opening['face'], map: (u: number, h: number) => Pt) {
  for (const o of v.openings ?? []) {
    if (o.face !== face) continue
    sheet.poly([map(o.u, o.v), map(o.u + o.w, o.v), map(o.u + o.w, o.v + o.h), map(o.u, o.v + o.h)], {
      fill: o.accent ? ACCENT : GLASS,
      stroke: INK,
      width: 1,
    })
  }
}

function isoTree(sheet: Sheet, t: Tree) {
  const base = iso(t.x, t.y, 0)
  const soft = { stroke: SOFT, width: 1.2, fill: WHITE }
  sheet.path([base, iso(t.x, t.y, t.height * 0.45)], { stroke: SOFT, width: 1.5 })
  treeShape(sheet, iso(t.x, t.y, t.height * 0.7), t, soft)
}

function treeShape(sheet: Sheet, c: Pt, t: Tree, style: { stroke: string; width: number; fill: string }) {
  const [cx, cy] = c
  if (t.kind === 'cypress') {
    const pts: Pt[] = []
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 16)
      pts.push([cx + Math.cos(a) * t.height * 0.14, cy + Math.sin(a) * t.height * 0.42])
    sheet.poly(pts, style)
  } else if (t.kind === 'pine') {
    const h = t.height * 0.75
    sheet.poly(
      [
        [cx, cy - h * 0.6],
        [cx + h * 0.28, cy + h * 0.4],
        [cx - h * 0.28, cy + h * 0.4],
      ],
      style,
    )
  } else {
    const r = t.height * (t.kind === 'olive' ? 0.34 : 0.3)
    sheet.circle(c, r, style)
    if (t.kind === 'olive') sheet.circle([cx + r * 0.35, cy - r * 0.2], r * 0.55, { ...style, fill: 'none' })
  }
}

export function drawAxonometric(b: Building): string {
  const sheet = new Sheet()
  if (b.site) {
    const { x, y, w, d } = b.site
    sheet.poly([iso(x, y, 0), iso(x + w, y, 0), iso(x + w, y + d, 0), iso(x, y + d, 0)], {
      fill: 'none',
      stroke: SOFT,
      width: 1,
    })
  }
  for (const [x1, y1, x2, y2] of b.groundLines ?? []) sheet.path([iso(x1, y1, 0), iso(x2, y2, 0)], { stroke: SOFT, width: 1 })

  const trees = [...(b.trees ?? [])]
  const drawTreesBehind = (limit: number) => {
    while (trees.length && trees[0].x + trees[0].y <= limit) isoTree(sheet, trees.shift()!)
  }
  trees.sort((a, c) => a.x + a.y - (c.x + c.y))

  for (const v of b.volumes) {
    drawTreesBehind(v.x + v.y)
    isoVolume(sheet, v)
  }
  drawTreesBehind(Infinity)
  return sheet.toSvg()
}

function isoVolume(sheet: Sheet, v: Volume) {
  const { x, y, z, w, d, h } = v
  const roof = v.roof ?? { type: 'flat' }
  const hasRidge = roof.type === 'gable' || roof.type === 'saw' || roof.type === 'barrel'
  // Eğimli üst yüzeyler yalnızca 'shed' ve 'flat' için gövdeye dahildir.
  const top = (px: number, py: number) => (hasRidge ? z + h : heightAt(v, px, py))
  const fill = (face: keyof typeof FACE_FILL) => (v.material === 'glass' && face !== 'top' ? TONE_2 : FACE_FILL[face])

  // Sağ yüz (x + w)
  const rightMap = (u: number, hh: number) => iso(x + w, y + u, z + hh)
  sheet.poly([iso(x + w, y, z), iso(x + w, y + d, z), iso(x + w, y + d, top(x + w, y + d)), iso(x + w, y, top(x + w, y))], {
    fill: fill('right'),
  })
  materialLines(sheet, v.material, rightMap, d, Math.min(top(x + w, y), top(x + w, y + d)) - z)
  openingsOn(sheet, v, 'right', rightMap)

  // Ön yüz (y + d)
  const frontMap = (u: number, hh: number) => iso(x + u, y + d, z + hh)
  sheet.poly([iso(x, y + d, z), iso(x + w, y + d, z), iso(x + w, y + d, top(x + w, y + d)), iso(x, y + d, top(x, y + d))], {
    fill: fill('front'),
  })
  materialLines(sheet, v.material, frontMap, w, Math.min(top(x, y + d), top(x + w, y + d)) - z)
  openingsOn(sheet, v, 'front', frontMap)

  // Üst yüz
  sheet.poly([iso(x, y, top(x, y)), iso(x + w, y, top(x + w, y)), iso(x + w, y + d, top(x + w, y + d)), iso(x, y + d, top(x, y + d))], {
    fill: FACE_FILL.top,
  })

  const t = z + h
  const roofStyle = { fill: TONE_1 }
  const tiles = { stroke: SOFT, width: 0.8 }
  if (roof.type === 'gable' && roof.axis === 'x') {
    const ym = y + d / 2
    const r = t + roof.rise
    sheet.poly([iso(x, y, t), iso(x + w, y, t), iso(x + w, ym, r), iso(x, ym, r)], roofStyle)
    sheet.poly([iso(x, y + d, t), iso(x + w, y + d, t), iso(x + w, ym, r), iso(x, ym, r)], { fill: WHITE })
    for (let u = 0.6; u < w; u += 0.6) sheet.path([iso(x + u, y + d, t), iso(x + u, ym, r)], tiles)
    sheet.poly([iso(x + w, y, t), iso(x + w, y + d, t), iso(x + w, ym, r)], { fill: TONE_2 })
  } else if (roof.type === 'gable') {
    const xm = x + w / 2
    const r = t + roof.rise
    sheet.poly([iso(x, y, t), iso(x, y + d, t), iso(xm, y + d, r), iso(xm, y, r)], roofStyle)
    sheet.poly([iso(x + w, y, t), iso(x + w, y + d, t), iso(xm, y + d, r), iso(xm, y, r)], { fill: WHITE })
    for (let u = 0.6; u < d; u += 0.6) sheet.path([iso(x + w, y + u, t), iso(xm, y + u, r)], tiles)
    const gableMap = (u: number, hh: number) => iso(x + u, y + d, t + hh)
    sheet.poly([iso(x, y + d, t), iso(x + w, y + d, t), iso(xm, y + d, r)], { fill: TONE_1 })
    if (v.material === 'wood')
      for (let u = 0.3; u < w; u += 0.3) {
        const hh = roof.rise * (1 - Math.abs(u / w - 0.5) * 2)
        sheet.path([gableMap(u, 0), gableMap(u, hh)], { stroke: SOFT, width: 1 })
      }
  } else if (roof.type === 'saw') {
    const tw = w / roof.count
    for (let i = 0; i < roof.count; i++) {
      const x0 = x + i * tw
      const x1 = x0 + tw
      const r = t + roof.rise
      sheet.poly([iso(x0, y, t), iso(x1, y, r), iso(x1, y + d, r), iso(x0, y + d, t)], { fill: WHITE })
      sheet.poly([iso(x1, y, t), iso(x1, y + d, t), iso(x1, y + d, r), iso(x1, y, r)], { fill: GLASS })
      for (let u = 1.5; u < d; u += 1.5) sheet.path([iso(x1, y + u, t), iso(x1, y + u, r)], { stroke: WHITE, width: 1 })
      sheet.poly([iso(x0, y + d, t), iso(x1, y + d, t), iso(x1, y + d, r)], { fill: TONE_1 })
    }
  } else if (roof.type === 'barrel') {
    const n = 14
    const prof: [number, number][] = []
    for (let i = 0; i <= n; i++) {
      const a = Math.PI - (Math.PI * i) / n
      prof.push([(Math.cos(a) + 1) / 2, Math.sin(a)])
    }
    const along = roof.axis === 'x'
    const P = (s: number, f: number, zz: number) => (along ? iso(x + s * w, y + f * d, zz) : iso(x + f * w, y + s * d, zz))
    for (let i = 0; i < n; i++) {
      const [f0, z0] = prof[i]
      const [f1, z1] = prof[i + 1]
      sheet.poly([P(0, f0, t + z0 * roof.rise), P(1, f0, t + z0 * roof.rise), P(1, f1, t + z1 * roof.rise), P(0, f1, t + z1 * roof.rise)], {
        fill: TONE_1,
        stroke: SOFT,
        width: 1,
      })
    }
    sheet.poly(
      prof.map(([f, zz]) => P(1, f, t + zz * roof.rise)),
      { fill: TONE_2 },
    )
  }
}

// --- Cephe -----------------------------------------------------------------

function silhouette(v: Volume, along: Axis, samples: number, at?: number): Pt[] {
  const len = along === 'x' ? v.w : v.d
  const start = along === 'x' ? v.x : v.y
  const pts: Pt[] = []
  for (let i = 0; i <= samples; i++) {
    const s = start + (len * i) / samples
    let top = -Infinity
    if (at !== undefined) top = along === 'x' ? heightAt(v, s, at) : heightAt(v, at, s)
    else for (let k = 0; k <= 10; k++) {
      const q = (along === 'x' ? v.y : v.x) + ((along === 'x' ? v.d : v.w) * k) / 10
      top = Math.max(top, along === 'x' ? heightAt(v, Math.min(s, v.x + v.w - 1e-6), q) : heightAt(v, q, s))
    }
    pts.push([s, -top])
  }
  pts.push([start + len, -v.z], [start, -v.z])
  return pts
}

function groundBand(sheet: Sheet, ground: Pt[]) {
  const depth = Math.min(...ground.map((p) => p[1])) - 1.6
  const poly: Pt[] = [...ground.map(([s, z]): Pt => [s, -z]), [ground[ground.length - 1][0], -depth], [ground[0][0], -depth]]
  sheet.poly(poly, { fill: WHITE, stroke: 'none' })
  sheet.hatch(poly, 9, 45)
  sheet.path(ground.map(([s, z]): Pt => [s, -z]), { width: 3 })
}

export function person(sheet: Sheet, s: number, z: number, accent = false) {
  const color = accent ? ACCENT : INK
  sheet.circle([s, -(z + 1.62)], 0.12, { fill: color, stroke: 'none' })
  sheet.poly(
    [
      [s - 0.2, -(z + 1.45)],
      [s + 0.2, -(z + 1.45)],
      [s + 0.14, -(z + 0.85)],
      [s + 0.1, -z],
      [s - 0.1, -z],
      [s - 0.14, -(z + 0.85)],
    ],
    { fill: color, stroke: 'none' },
  )
}

function elevationTree(sheet: Sheet, s: number, z: number, t: Tree) {
  sheet.path([[s, -z], [s, -(z + t.height * 0.45)]], { stroke: SOFT, width: 1.5 })
  treeShape(sheet, [s, -(z + t.height * 0.7)], t, { stroke: SOFT, width: 1.2, fill: 'none' })
}

function groundAt(ground: Pt[], s: number): number {
  for (let i = 0; i < ground.length - 1; i++) {
    const [a, za] = ground[i]
    const [c, zc] = ground[i + 1]
    if (s >= a && s <= c) return c === a ? Math.max(za, zc) : za + ((zc - za) * (s - a)) / (c - a)
  }
  return ground[ground.length - 1][1]
}

export function drawElevation(b: Building): string {
  const sheet = new Sheet()
  const vols = [...b.volumes].sort((a, c) => a.y + a.d - (c.y + c.d))
  for (const t of (b.trees ?? []).filter((tr) => tr.y < Math.min(...b.volumes.map((v) => v.y + v.d))))
    elevationTree(sheet, t.x, groundAt(b.ground, t.x), t)
  for (const v of vols) {
    sheet.poly(silhouette(v, 'x', 160), { fill: WHITE })
    const map = (u: number, hh: number): Pt => [v.x + u, -(v.z + hh)]
    const eave = Math.min(heightAt(v, v.x, v.y + v.d), heightAt(v, v.x + v.w, v.y + v.d)) - v.z
    if (v.material && v.material !== 'plain') materialLines(sheet, v.material === 'glass' ? 'plain' : v.material, map, v.w, Math.min(eave, v.h))
    if (v.roof && v.roof.type !== 'flat' && !(v.roof.type === 'gable' && v.roof.axis === 'y'))
      sheet.path([map(0, v.h), map(v.w, v.h)])
    openingsOn(sheet, v, 'front', map)
  }
  for (const t of (b.trees ?? []).filter((tr) => tr.y >= Math.min(...b.volumes.map((v) => v.y + v.d))))
    elevationTree(sheet, t.x, groundAt(b.ground, t.x), t)
  groundBand(sheet, b.ground)
  for (const s of b.elevationPeople ?? []) person(sheet, s, groundAt(b.ground, s))
  return sheet.toSvg()
}

// --- Kesit -----------------------------------------------------------------

export function drawSection(b: Building): string {
  const sheet = new Sheet()
  const { axis, at } = b.section
  // axis 'y': y = at düzleminde kesilir, yatay eksen x. axis 'x': x = at, yatay eksen y.
  const along: Axis = axis === 'y' ? 'x' : 'y'
  const near = (v: Volume) => (axis === 'y' ? v.y : v.x)
  const far = (v: Volume) => (axis === 'y' ? v.y + v.d : v.x + v.w)

  const behind = b.volumes.filter((v) => far(v) < at).sort((a, c) => far(a) - far(c))
  for (const v of behind) sheet.poly(silhouette(v, along, 160), { fill: WHITE, stroke: SOFT, width: 1 })

  const cut = b.volumes.filter((v) => near(v) <= at && far(v) >= at)
  for (const v of cut) {
    const outline = silhouette(v, along, 200, at)
    sheet.poly(outline, { fill: WHITE, width: 5 })
    const start = along === 'x' ? v.x : v.y
    const len = along === 'x' ? v.w : v.d
    for (const f of v.floors ?? []) sheet.path([[start, -(v.z + f)], [start + len, -(v.z + f)]], { width: 4 })
  }
  groundBand(sheet, b.section.ground ?? b.ground)
  for (const [s, z] of b.section.people ?? []) person(sheet, s, z)
  if (b.section.light) {
    sheet.path(b.section.light.map(([s, z]): Pt => [s, -z]), { stroke: ACCENT, width: 2.5, dash: '10 7' })
    const [s, z] = b.section.light[b.section.light.length - 1]
    sheet.circle([s, -z], 0.18, { fill: ACCENT, stroke: 'none' })
  }
  return sheet.toSvg()
}

// --- Plan ------------------------------------------------------------------

export function drawPlan(b: Building): string {
  const sheet = new Sheet()
  if (b.site) {
    const { x, y, w, d } = b.site
    sheet.poly([[x, y], [x + w, y], [x + w, y + d], [x, y + d]], { fill: 'none', stroke: SOFT, width: 1 })
  }
  for (const t of b.trees ?? []) {
    const r = t.kind === 'cypress' ? 0.6 : t.height * 0.3
    sheet.circle([t.x, t.y], r, { fill: 'none', stroke: SOFT, width: 1.2 })
    sheet.circle([t.x, t.y], 0.08, { fill: SOFT, stroke: 'none' })
  }
  const rect = (v: Volume): Pt[] => [[v.x, v.y], [v.x + v.w, v.y], [v.x + v.w, v.y + v.d], [v.x, v.y + v.d]]
  for (const v of b.volumes.filter((vol) => vol.plan === false))
    sheet.poly(rect(v), { fill: 'none', stroke: SOFT, width: 1.2, dash: '8 6' })
  for (const v of b.volumes.filter((vol) => vol.plan !== false)) sheet.poly(rect(v), { fill: WHITE, width: 6 })
  for (const [x1, y1, x2, y2] of b.partitions ?? []) sheet.path([[x1, y1], [x2, y2]], { width: 3 })
  for (const v of b.volumes.filter((vol) => vol.plan !== false)) {
    for (const o of v.openings ?? []) {
      if (o.v > 1.2) continue // yalnızca kesit düzlemine (≈1 m) denk gelen açıklıklar
      const seg: [Pt, Pt] =
        o.face === 'front'
          ? [[v.x + o.u, v.y + v.d], [v.x + o.u + o.w, v.y + v.d]]
          : [[v.x + v.w, v.y + o.u], [v.x + v.w, v.y + o.u + o.w]]
      sheet.path(seg, { stroke: WHITE, width: 8 })
      sheet.path(seg, { stroke: o.accent ? ACCENT : INK, width: o.accent ? 3 : 1 })
    }
  }
  // Kesit hattı (vurgu rengi)
  const xs = b.volumes.flatMap((v) => [v.x, v.x + v.w])
  const ys = b.volumes.flatMap((v) => [v.y, v.y + v.d])
  const { axis, at } = b.section
  const line: [Pt, Pt] =
    axis === 'y'
      ? [[Math.min(...xs) - 1.5, at], [Math.max(...xs) + 1.5, at]]
      : [[at, Math.min(...ys) - 1.5], [at, Math.max(...ys) + 1.5]]
  sheet.path(line, { stroke: ACCENT, width: 2, dash: '14 6 3 6' })
  for (const p of line) sheet.circle(p, 0.35, { fill: ACCENT, stroke: 'none' })
  return sheet.toSvg()
}
