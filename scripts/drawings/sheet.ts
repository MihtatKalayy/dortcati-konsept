/**
 * Çizim sayfası: model koordinatlarında (ekran yönünde, y aşağı) şekilleri
 * toplar, sonunda tümünü sabit boyutlu bir SVG'ye sığdırır. Çizgi kalınlıkları
 * ölçekten bağımsızdır (piksel).
 */
export type Pt = readonly [number, number]

export interface Style {
  fill?: string
  stroke?: string
  width?: number
  dash?: string
}

type Item =
  | { type: 'path'; pts: Pt[]; closed: boolean; style: Style }
  | { type: 'circle'; c: Pt; r: number; style: Style }
  | { type: 'hatch'; clip: Pt[]; spacing: number; angle: number; style: Style }

// Tasarım sistemi renkleri (src/styles/index.css ile aynı)
export const INK = '#141414'
export const ACCENT = '#b23a1d'
export const WHITE = '#ffffff'
export const GLASS = '#3d3c39'
export const TONE_1 = '#e6e5e1'
export const TONE_2 = '#d4d3cf'
export const SOFT = '#8f8e8a'

export const SHEET_WIDTH = 1200
export const SHEET_HEIGHT = 800

const num = (n: number) => {
  const s = n.toFixed(1)
  return s.endsWith('.0') ? s.slice(0, -2) : s
}

function styleAttrs(style: Style, closed: boolean): string {
  const fill = style.fill ?? (closed ? WHITE : 'none')
  const stroke = style.stroke ?? INK
  const parts = [`fill="${fill}"`]
  if (stroke === 'none') parts.push('stroke="none"')
  else {
    parts.push(`stroke="${stroke}"`)
    parts.push(`stroke-width="${num(style.width ?? 1.5)}"`)
    if (style.dash) parts.push(`stroke-dasharray="${style.dash}"`)
  }
  return parts.join(' ')
}

export class Sheet {
  private items: Item[] = []

  path(pts: Pt[], style: Style = {}) {
    this.items.push({ type: 'path', pts, closed: false, style })
  }

  poly(pts: Pt[], style: Style = {}) {
    this.items.push({ type: 'path', pts, closed: true, style })
  }

  circle(c: Pt, r: number, style: Style = {}) {
    this.items.push({ type: 'circle', c, r, style })
  }

  /** Bir çokgenin içini verilen açıda paralel çizgilerle tarar (aralık piksel). */
  hatch(clip: Pt[], spacing: number, angle: number, style: Style = {}) {
    this.items.push({ type: 'hatch', clip, spacing, angle, style })
  }

  toSvg(margin = 64): string {
    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity
    const grow = ([x, y]: Pt, r = 0) => {
      minX = Math.min(minX, x - r)
      minY = Math.min(minY, y - r)
      maxX = Math.max(maxX, x + r)
      maxY = Math.max(maxY, y + r)
    }
    for (const item of this.items) {
      if (item.type === 'circle') grow(item.c, item.r)
      else for (const p of item.type === 'path' ? item.pts : item.clip) grow(p)
    }
    if (!Number.isFinite(minX)) throw new Error('Boş çizim')

    const scale = Math.min(
      (SHEET_WIDTH - 2 * margin) / (maxX - minX),
      (SHEET_HEIGHT - 2 * margin) / (maxY - minY),
    )
    const offX = (SHEET_WIDTH - (maxX - minX) * scale) / 2
    const offY = (SHEET_HEIGHT - (maxY - minY) * scale) / 2
    const tx = ([x, y]: Pt): Pt => [(x - minX) * scale + offX, (y - minY) * scale + offY]
    const d = (pts: Pt[], closed: boolean) =>
      pts.map((p, i) => `${i ? 'L' : 'M'}${tx(p).map(num).join(' ')}`).join('') + (closed ? 'Z' : '')

    const out: string[] = []
    let clipId = 0
    for (const item of this.items) {
      if (item.type === 'path') {
        out.push(`<path d="${d(item.pts, item.closed)}" ${styleAttrs(item.style, item.closed)}/>`)
      } else if (item.type === 'circle') {
        const [cx, cy] = tx(item.c)
        out.push(
          `<circle cx="${num(cx)}" cy="${num(cy)}" r="${num(item.r * scale)}" ${styleAttrs(item.style, true)}/>`,
        )
      } else {
        const id = `t${clipId++}`
        const screen = item.clip.map(tx)
        const xs = screen.map((p) => p[0])
        const ys = screen.map((p) => p[1])
        const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)]
        const rad = (item.angle * Math.PI) / 180
        const [dx, dy] = [Math.cos(rad), Math.sin(rad)]
        const [nx, ny] = [-dy, dx]
        const cx = (x0 + x1) / 2
        const cy = (y0 + y1) / 2
        const reach = Math.hypot(x1 - x0, y1 - y0) / 2 + 1
        const lines: string[] = []
        for (let k = -reach; k <= reach; k += item.spacing) {
          const px = cx + nx * k
          const py = cy + ny * k
          lines.push(
            `M${num(px - dx * reach)} ${num(py - dy * reach)}L${num(px + dx * reach)} ${num(py + dy * reach)}`,
          )
        }
        out.push(
          `<clipPath id="${id}"><path d="${screen.map((p, i) => `${i ? 'L' : 'M'}${num(p[0])} ${num(p[1])}`).join('')}Z"/></clipPath>`,
          `<path clip-path="url(#${id})" d="${lines.join('')}" ${styleAttrs({ stroke: SOFT, width: 1, ...item.style, fill: 'none' }, false)}/>`,
        )
      }
    }

    return (
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SHEET_WIDTH} ${SHEET_HEIGHT}" width="${SHEET_WIDTH}" height="${SHEET_HEIGHT}">` +
      `<rect width="${SHEET_WIDTH}" height="${SHEET_HEIGHT}" fill="${WHITE}"/>` +
      `<g stroke-linejoin="round" stroke-linecap="round">${out.join('')}</g></svg>\n`
    )
  }
}
