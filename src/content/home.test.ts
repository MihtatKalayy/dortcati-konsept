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
})
