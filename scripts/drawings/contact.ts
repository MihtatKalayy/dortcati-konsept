/**
 * İletişim sayfası için stilize konum çizimi: gerçek bir haritayı göstermez;
 * düzensiz bir sokak dokusu ve vurgu renginde bir işaret.
 */
import { ACCENT, INK, type Pt, Sheet, SOFT, TONE_1, WHITE } from './sheet.ts'

export function locationDrawing(): string {
  const sheet = new Sheet()
  const W = 60
  const H = 40
  sheet.poly([[0, 0], [W, 0], [W, H], [0, H]], { fill: WHITE, stroke: 'none' })
  // Yapı adaları (sokak araları)
  const cols = [0, 9, 20, 27, 39, 48, W]
  const rows = [0, 8, 15, 26, 33, H]
  const street = 1.6
  for (let i = 0; i < cols.length - 1; i++) {
    for (let j = 0; j < rows.length - 1; j++) {
      const x0 = cols[i] + street / 2
      const x1 = cols[i + 1] - street / 2
      const y0 = rows[j] + street / 2
      const y1 = rows[j + 1] - street / 2
      const park = i === 1 && j === 3
      const block: Pt[] = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]
      sheet.poly(block, { fill: park ? WHITE : TONE_1, stroke: SOFT, width: 1 })
      if (park) {
        for (const [tx, ty] of [[x0 + 2.5, y0 + 2], [x0 + 6, y0 + 3.5], [x1 - 2.5, y1 - 2]] as Pt[])
          sheet.circle([tx, ty], 1.4, { fill: 'none', stroke: SOFT, width: 1 })
      } else if ((i + j) % 2 === 0) {
        sheet.hatch(block, 8, 45, { stroke: SOFT, width: 0.6 })
      }
    }
  }
  // Ana cadde
  sheet.path([[0, 15], [W, 15]], { stroke: INK, width: 3 })
  sheet.path([[27, 0], [27, H]], { stroke: INK, width: 3 })
  // İşaret
  const [mx, my] = [33, 20.5]
  sheet.circle([mx, my], 2.6, { fill: 'none', stroke: ACCENT, width: 2 })
  sheet.poly(
    [
      [mx, my + 3.2],
      [mx - 1.4, my - 0.4],
      [mx + 1.4, my - 0.4],
    ],
    { fill: ACCENT, stroke: 'none' },
  )
  sheet.circle([mx, my - 1.2], 1.6, { fill: ACCENT, stroke: 'none' })
  sheet.circle([mx, my - 1.2], 0.6, { fill: WHITE, stroke: 'none' })
  return sheet.toSvg(0)
}
