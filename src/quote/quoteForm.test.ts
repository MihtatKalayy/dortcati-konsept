import { describe, expect, it } from 'vitest'
import {
  AREA_MAX,
  AREA_MIN,
  buildSummary,
  canGoToStep,
  createInitialState,
  DESCRIPTION_MAX,
  firstInvalidField,
  normalizePhone,
  quoteOptions,
  quoteReducer,
  type QuoteAction,
  type QuoteState,
  type QuoteValues,
  SUMMARY_STEP,
  validateArea,
  validateEmail,
  validateFullName,
  validateStep,
} from './quoteForm'

const valid: QuoteValues = {
  projectType: 'cat-konut',
  services: ['svc-001', 'svc-003'],
  area: '240',
  province: '35',
  budget: 'butce-2',
  timing: 'zaman-6ay',
  description: 'Bahçeli bir ev.',
  fullName: 'Ayşe Örnek',
  phone: '0500 000 00 00',
  email: 'ayse@ornek.example',
  contactPreference: 'eposta',
  consent: true,
}

const run = (state: QuoteState, ...actions: QuoteAction[]) => actions.reduce(quoteReducer, state)
const withValues = (values: Partial<QuoteValues>, base = createInitialState()): QuoteState =>
  run(base, ...Object.entries(values).map(([field, value]) => ({ type: 'update', field, value }) as QuoteAction))

describe('adım 1 — Proje', () => {
  it('geçerli giriş hata vermez', () => {
    expect(validateStep('project', valid)).toEqual({})
  })

  it('proje türü zorunlu ve listeden olmalı; "Diğer" geçerli', () => {
    expect(validateStep('project', { ...valid, projectType: '' }).projectType).toBe('required')
    expect(validateStep('project', { ...valid, projectType: 'cat-yok' }).projectType).toBe('invalidOption')
    expect(validateStep('project', { ...valid, projectType: 'diger' }).projectType).toBeUndefined()
  })

  it('en az bir geçerli hizmet gerekir', () => {
    expect(validateStep('project', { ...valid, services: [] }).services).toBe('servicesRequired')
    expect(validateStep('project', { ...valid, services: ['svc-yok'] }).services).toBe('invalidOption')
  })

  it('seçenekler kategori ve hizmet verisinden id ile gelir', () => {
    expect(quoteOptions.projectTypes.map((o) => o.id)).toEqual(['cat-konut', 'cat-ticari', 'cat-ic-mekan', 'diger'])
    expect(quoteOptions.services.map((o) => o.id)).toEqual(['svc-001', 'svc-002', 'svc-003', 'svc-004', 'svc-005'])
    expect(quoteOptions.provinces).toHaveLength(81)
  })
})

describe('adım 2 — Ayrıntılar', () => {
  it('geçerli giriş hata vermez; alan ve açıklama isteğe bağlı', () => {
    expect(validateStep('details', valid)).toEqual({})
    expect(validateStep('details', { ...valid, area: '', description: '' })).toEqual({})
  })

  it('alan: pozitif tam sayı ve makul sınırlar', () => {
    expect(validateArea('  ')).toBeUndefined()
    expect(validateArea('120')).toBeUndefined()
    expect(validateArea(String(AREA_MIN))).toBeUndefined()
    expect(validateArea(String(AREA_MAX))).toBeUndefined()
    for (const bad of ['abc', '12.5', '12,5', '-40', '0', '1e3']) expect(validateArea(bad)).toBe('areaInvalid')
    expect(validateArea(String(AREA_MIN - 1))).toBe('areaRange')
    expect(validateArea(String(AREA_MAX + 1))).toBe('areaRange')
  })

  it('il, bütçe ve zamanlama zorunlu ve listeden olmalı', () => {
    const errors = validateStep('details', { ...valid, province: '', budget: '', timing: '' })
    expect(errors).toEqual({ province: 'required', budget: 'required', timing: 'required' })
    expect(validateStep('details', { ...valid, province: '82' }).province).toBe('invalidOption')
    expect(validateStep('details', { ...valid, budget: 'butce-yok' }).budget).toBeUndefined()
  })

  it('açıklama karakter sınırını aşamaz', () => {
    expect(validateStep('details', { ...valid, description: 'a'.repeat(DESCRIPTION_MAX) }).description).toBeUndefined()
    expect(validateStep('details', { ...valid, description: 'a'.repeat(DESCRIPTION_MAX + 1) }).description).toBe(
      'descriptionTooLong',
    )
  })
})

describe('adım 3 — İletişim', () => {
  it('geçerli giriş hata vermez', () => {
    expect(validateStep('contact', valid)).toEqual({})
  })

  it('ad soyad', () => {
    expect(validateFullName('')).toBe('required')
    expect(validateFullName('  ')).toBe('required')
    expect(validateFullName('1')).toBe('nameInvalid')
    expect(validateFullName('a'.repeat(101))).toBe('nameInvalid')
    expect(validateFullName('Çağrı Işık')).toBeUndefined()
  })

  it('telefon: Türkiye biçimleri, boşluk ve tire toleranslı', () => {
    for (const ok of ['0500 000 00 00', '05000000000', '500 000 00 00', '+90 500 000 00 00', '+90-500-000-00-00', '0090 212 000 00 00', '(0312) 000 00 00', '905000000000', '0850 000 00 00']) {
      expect(normalizePhone(ok), ok).not.toBeNull()
    }
    expect(normalizePhone('0500 000 00 00')).toBe('5000000000')
    for (const bad of ['', '123', '0100 000 00 00', '+1 500 000 00 00', '0500 000 00 0', '0500 000 00 000', '05OO 000 00 00', '600 000 00 00']) {
      expect(normalizePhone(bad), bad).toBeNull()
    }
    expect(validateStep('contact', { ...valid, phone: '' }).phone).toBe('required')
    expect(validateStep('contact', { ...valid, phone: '123' }).phone).toBe('phoneInvalid')
  })

  it('e-posta', () => {
    expect(validateEmail('')).toBe('required')
    for (const bad of ['ayse', 'ayse@', 'ayse@ornek', 'ay se@ornek.com', '@ornek.com', 'ayse@ornek.c']) {
      expect(validateEmail(bad), bad).toBe('emailInvalid')
    }
    expect(validateEmail(' ayse@ornek.example ')).toBeUndefined()
  })

  it('iletişim tercihi ve onay zorunlu', () => {
    const errors = validateStep('contact', { ...valid, contactPreference: '', consent: false })
    expect(errors).toEqual({ contactPreference: 'required', consent: 'consentRequired' })
  })
})

describe('adım geçişleri', () => {
  it('başlangıçta adım 0, yalnızca adım 0 ulaşılmış', () => {
    const s = createInitialState()
    expect([s.step, s.maxStep, s.status]).toEqual([0, 0, 'editing'])
    expect(canGoToStep(s, 1)).toBe(false)
  })

  it('İleri yalnızca adım geçerliyse ilerler; hatada adım değişmez ve deneme sayısı artar', () => {
    const s = run(createInitialState(), { type: 'next' })
    expect(s.step).toBe(0)
    expect(s.errors).toEqual({ projectType: 'required', services: 'servicesRequired' })
    expect(s.validationAttempt).toBe(1)
    expect(firstInvalidField(s)).toBe('projectType')
  })

  it('alan değişince yalnızca o alanın hatası temizlenir', () => {
    const s = run(createInitialState(), { type: 'next' }, { type: 'update', field: 'projectType', value: 'cat-ticari' })
    expect(s.errors).toEqual({ services: 'servicesRequired' })
    expect(firstInvalidField(s)).toBe('services')
  })

  it('geçerli adımda ilerler; Geri doğrulamasız döner ve veriler korunur', () => {
    let s = withValues(valid)
    s = run(s, { type: 'next' }, { type: 'next' })
    expect([s.step, s.maxStep]).toEqual([2, 2])
    s = run(s, { type: 'update', field: 'email', value: 'hatalı' }, { type: 'back' })
    expect(s.step).toBe(1)
    expect(s.errors).toEqual({})
    expect(s.values.email).toBe('hatalı')
    expect(s.values.area).toBe('240')
  })

  it('henüz ulaşılmamış adıma atlanamaz', () => {
    let s = withValues(valid)
    s = run(s, { type: 'goTo', step: 2 })
    expect(s.step).toBe(0)
    s = run(s, { type: 'goTo', step: SUMMARY_STEP })
    expect(s.step).toBe(0)
    s = run(s, { type: 'goTo', step: -1 }, { type: 'goTo', step: 1.5 })
    expect(s.step).toBe(0)
  })

  it('özetten "Düzenle" ile geri gidilir, veriler korunur, ulaşılmış adımlara geri dönülebilir', () => {
    let s = run(withValues(valid), { type: 'next' }, { type: 'next' }, { type: 'next' })
    expect([s.step, s.maxStep]).toEqual([SUMMARY_STEP, SUMMARY_STEP])
    s = run(s, { type: 'goTo', step: 1 })
    expect(s.step).toBe(1)
    expect(s.values).toEqual(valid)
    expect(canGoToStep(s, SUMMARY_STEP)).toBe(true)
    s = run(s, { type: 'goTo', step: SUMMARY_STEP })
    expect(s.step).toBe(SUMMARY_STEP)
  })

  it('ileri adıma atlarken aradaki adımlar yeniden doğrulanır', () => {
    let s = run(withValues(valid), { type: 'next' }, { type: 'next' }, { type: 'next' }, { type: 'goTo', step: 1 })
    s = run(s, { type: 'update', field: 'province', value: '' }, { type: 'goTo', step: SUMMARY_STEP })
    expect(s.step).toBe(1)
    expect(s.errors).toEqual({ province: 'required' })
  })

  it('gönderim yalnızca özet adımında ve tüm adımlar geçerliyse olur; tekrar gönderim yok sayılır', () => {
    let s = withValues(valid)
    expect(run(s, { type: 'submit' }).status).toBe('editing')
    s = run(s, { type: 'next' }, { type: 'next' }, { type: 'next' }, { type: 'submit' })
    expect(s.status).toBe('submitted')
    const again = run(s, { type: 'submit' }, { type: 'next' }, { type: 'update', field: 'fullName', value: 'x' })
    expect(again).toBe(s)
  })

  it('özette geçersiz veri varsa ilk hatalı adıma döner', () => {
    let s = run(withValues(valid), { type: 'next' }, { type: 'next' }, { type: 'next' })
    s = { ...s, values: { ...s.values, phone: '12' } }
    s = run(s, { type: 'submit' })
    expect([s.step, s.status]).toEqual([2, 'editing'])
    expect(s.errors).toEqual({ phone: 'phoneInvalid' })
  })

  it('sıfırlama formu başa döndürür ve verileri siler', () => {
    const s = run(withValues(valid), { type: 'next' }, { type: 'reset' })
    expect(s).toEqual(createInitialState())
  })
})

describe('ön seçim parametresi', () => {
  it('geçerli kategori slug’ı proje türünü seçer', () => {
    expect(createInitialState('ic-mekan').values.projectType).toBe('cat-ic-mekan')
    expect(createInitialState('konut').values.projectType).toBe('cat-konut')
  })

  it('geçersiz veya boş değer yok sayılır', () => {
    for (const bad of [null, '', 'yok', 'cat-konut', 'Konut', 'diger']) {
      expect(createInitialState(bad).values.projectType).toBe('')
    }
  })

  it('sıfırlamada ön seçim korunabilir', () => {
    expect(quoteReducer(createInitialState(), { type: 'reset', projectTypeSlug: 'ticari' }).values.projectType).toBe(
      'cat-ticari',
    )
  })
})

describe('özet', () => {
  it('id’leri adlarıyla gösterir', () => {
    const [project, details, contact] = buildSummary(valid)
    expect(project.items.map((i) => i.value)).toEqual(['Konut', 'Mimari tasarım, Uygulama ve şantiye yönetimi'])
    expect(details.items.map((i) => i.value)).toEqual([
      '240 m²',
      'İzmir',
      '1–3 milyon ₺',
      '6 ay içinde',
      'Bahçeli bir ev.',
    ])
    expect(contact.items.map((i) => i.value)).toEqual([
      'Ayşe Örnek',
      '0500 000 00 00',
      'ayse@ornek.example',
      'E-posta',
      'Okundu',
    ])
    expect([project.step, details.step, contact.step]).toEqual([0, 1, 2])
  })

  it('boş isteğe bağlı alanlar "Belirtilmedi" olur; hizmetler veri sırasıyla listelenir', () => {
    const [project, details] = buildSummary({ ...valid, area: '', description: ' ', services: ['svc-005', 'svc-002'], projectType: 'diger' })
    expect(project.items[0].value).toBe('Diğer')
    expect(project.items[1].value).toBe('İç mimarlık, Danışmanlık')
    expect(details.items[0].value).toBe('Belirtilmedi')
    expect(details.items[4].value).toBe('Belirtilmedi')
  })
})
