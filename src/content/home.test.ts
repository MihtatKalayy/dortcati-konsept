import { describe, expect, it } from 'vitest'
import indexHtml from '../../index.html?raw'
import { site } from './site'

describe('ana sayfa meta bilgileri', () => {
  it('başlık ve açıklama "konsept çalışma" ifadesini içerir', () => {
    expect(site.home.documentTitle.toLocaleLowerCase('tr')).toContain('konsept çalışma')
    expect(site.home.metaDescription.toLocaleLowerCase('tr')).toContain('konsept çalışma')
  })

  it('index.html başlığı ve açıklaması içerik kaynağıyla aynı', () => {
    expect(indexHtml).toContain(`<title>${site.home.documentTitle}</title>`)
    expect(indexHtml.replace(/\s+/g, ' ')).toContain(`content="${site.home.metaDescription}"`)
  })

  it('Open Graph ve Twitter etiketleri ana sayfa başlığı ve açıklamasıyla aynı', () => {
    const html = indexHtml.replace(/\s+/g, ' ')
    for (const key of ['property="og:title"', 'name="twitter:title"']) {
      expect(html).toContain(`${key} content="${site.home.documentTitle}"`)
    }
    for (const key of ['property="og:description"', 'name="twitter:description"']) {
      expect(html).toContain(`${key} content="${site.home.metaDescription}"`)
    }
    expect(html).toContain('property="og:image" content="/og-image.png"')
    expect(html).toContain('name="twitter:card" content="summary_large_image"')
  })
})
