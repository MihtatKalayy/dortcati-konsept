/**
 * Teklif formunun durumu ve kuralları. Arayüzden bağımsız, saf işlevlerdir:
 * değiştirme `quoteReducer` ile, okuma seçici işlevlerle yapılır.
 * Form verisi yalnızca bellekte tutulur; hiçbir yere yazılmaz veya gönderilmez.
 */
import { formatArea } from '../content/format'
import { categories } from '../content/categories'
import { provinces } from '../content/provinces'
import { services } from '../content/services'
import { site } from '../content/site'
import type { QuoteErrorCode, QuoteStepId } from '../content/types'

export const QUOTE_STEPS: readonly QuoteStepId[] = ['project', 'details', 'contact', 'summary']
export const SUMMARY_STEP = QUOTE_STEPS.length - 1

export const AREA_MIN = 5
export const AREA_MAX = 100_000
export const DESCRIPTION_MAX = 1000
const NAME_MAX = 100
const EMAIL_MAX = 254

const fields = site.contactPage.form.fields

/** Seçenek kümeleri kendi kaynaklarından id ile okunur. */
export const quoteOptions = {
  projectTypes: [...categories.map((c) => ({ id: c.id, label: c.name })), fields.projectType.otherOption],
  services: services.map((s) => ({ id: s.id, label: s.name })),
  provinces: provinces.map((p) => ({ id: p.code, label: p.name })),
  budgets: fields.budget.options,
  timings: fields.timing.options,
  contactPreferences: fields.contactPreference.options,
}

export interface QuoteValues {
  projectType: string
  services: string[]
  /** Kullanıcının yazdığı ham metin; doğrulamada tam sayıya çevrilir. */
  area: string
  province: string
  budget: string
  timing: string
  description: string
  fullName: string
  phone: string
  email: string
  contactPreference: string
  consent: boolean
}

export type QuoteField = keyof QuoteValues
type QuoteErrors = Partial<Record<QuoteField, QuoteErrorCode>>

/** Her adımın alanları, ekrandaki sırayla (ilk hatalı alanı bulmak için). */
const STEP_FIELDS: Record<QuoteStepId, readonly QuoteField[]> = {
  project: ['projectType', 'services'],
  details: ['area', 'province', 'budget', 'timing', 'description'],
  contact: ['fullName', 'phone', 'email', 'contactPreference', 'consent'],
  summary: [],
}

export interface QuoteState {
  /** Etkin adımın sırası (0'dan başlar). */
  step: number
  /** Şimdiye kadar ulaşılan en ileri adım; ilerleme göstergesinden yalnızca buraya kadar gidilebilir. */
  maxStep: number
  values: QuoteValues
  errors: QuoteErrors
  status: 'editing' | 'submitted'
  /** Başarısız her doğrulama denemesinde artar; arayüz odağı ilk hatalı alana taşımak için izler. */
  validationAttempt: number
}

const emptyValues: QuoteValues = {
  projectType: '',
  services: [],
  area: '',
  province: '',
  budget: '',
  timing: '',
  description: '',
  fullName: '',
  phone: '',
  email: '',
  contactPreference: '',
  consent: false,
}

// --- Doğrulama kuralları ----------------------------------------------------

const hasOption = (options: readonly { id: string }[], id: string) => options.some((o) => o.id === id)

function requireOption(value: string, options: readonly { id: string }[]): QuoteErrorCode | undefined {
  if (!value) return 'required'
  return hasOption(options, value) ? undefined : 'invalidOption'
}

export function validateArea(raw: string): QuoteErrorCode | undefined {
  const value = raw.trim()
  if (!value) return undefined
  if (!/^\d+$/.test(value)) return 'areaInvalid'
  const n = Number(value)
  if (n === 0) return 'areaInvalid'
  return n < AREA_MIN || n > AREA_MAX ? 'areaRange' : undefined
}

/**
 * Türkiye telefon numarasını 10 haneli ulusal biçime çevirir (5XXXXXXXXX gibi);
 * geçersizse null. Boşluk, tire, nokta ve parantez yok sayılır; +90, 0090, 90 ve 0 önekleri kabul edilir.
 */
export function normalizePhone(raw: string): string | null {
  const compact = raw.replace(/[\s\-.()]/g, '')
  if (!/^\+?\d+$/.test(compact)) return null
  const digits = compact.replace(/^\+/, '')
  let national: string
  if (compact.startsWith('+')) {
    if (!digits.startsWith('90')) return null
    national = digits.slice(2)
  } else if (digits.startsWith('0090')) national = digits.slice(4)
  else if (digits.length === 12 && digits.startsWith('90')) national = digits.slice(2)
  else if (digits.length === 11 && digits.startsWith('0')) national = digits.slice(1)
  else national = digits
  return /^[2-58]\d{9}$/.test(national) ? national : null
}

export function validateEmail(raw: string): QuoteErrorCode | undefined {
  const value = raw.trim()
  if (!value) return 'required'
  if (value.length > EMAIL_MAX || !/^[^\s@]+@[^\s@]+\.[^\s@.]{2,}$/.test(value)) return 'emailInvalid'
  return undefined
}

export function validateFullName(raw: string): QuoteErrorCode | undefined {
  const value = raw.trim()
  if (!value) return 'required'
  const letters = value.replace(/[^\p{L}]/gu, '')
  if (letters.length < 2 || value.length > NAME_MAX) return 'nameInvalid'
  return undefined
}

function compact(errors: QuoteErrors): QuoteErrors {
  return Object.fromEntries(Object.entries(errors).filter(([, code]) => code !== undefined)) as QuoteErrors
}

export function validateStep(step: QuoteStepId, v: QuoteValues): QuoteErrors {
  switch (step) {
    case 'project':
      return compact({
        projectType: requireOption(v.projectType, quoteOptions.projectTypes),
        services:
          v.services.length === 0
            ? 'servicesRequired'
            : v.services.every((id) => hasOption(quoteOptions.services, id))
              ? undefined
              : 'invalidOption',
      })
    case 'details':
      return compact({
        area: validateArea(v.area),
        province: requireOption(v.province, quoteOptions.provinces),
        budget: requireOption(v.budget, quoteOptions.budgets),
        timing: requireOption(v.timing, quoteOptions.timings),
        description: v.description.length > DESCRIPTION_MAX ? 'descriptionTooLong' : undefined,
      })
    case 'contact':
      return compact({
        fullName: validateFullName(v.fullName),
        phone: !v.phone.trim() ? 'required' : normalizePhone(v.phone) ? undefined : 'phoneInvalid',
        email: validateEmail(v.email),
        contactPreference: requireOption(v.contactPreference, quoteOptions.contactPreferences),
        consent: v.consent ? undefined : 'consentRequired',
      })
    case 'summary':
      return {}
  }
}

const isEmpty = (errors: QuoteErrors) => Object.keys(errors).length === 0

// --- Durum ----------------------------------------------------------------

/** Başlangıç durumu. `projectTypeSlug` geçerli bir kategori slug'ıysa proje türü seçili gelir. */
export function createInitialState(projectTypeSlug: string | null = null): QuoteState {
  const category = projectTypeSlug ? categories.find((c) => c.slug === projectTypeSlug) : undefined
  return {
    step: 0,
    maxStep: 0,
    values: { ...emptyValues, services: [], projectType: category?.id ?? '' },
    errors: {},
    status: 'editing',
    validationAttempt: 0,
  }
}

export type QuoteAction =
  | { type: 'update'; field: QuoteField; value: QuoteValues[QuoteField] }
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'goTo'; step: number }
  | { type: 'submit' }
  | { type: 'reset'; projectTypeSlug?: string | null }

function failed(state: QuoteState, step: number, errors: QuoteErrors): QuoteState {
  return { ...state, step, errors, validationAttempt: state.validationAttempt + 1 }
}

/** `from` adımından başlayarak `to` adımına kadar (hariç) doğrular; ilk hatalı adımda durur. */
function advance(state: QuoteState, from: number, to: number): QuoteState {
  for (let i = from; i < to; i++) {
    const errors = validateStep(QUOTE_STEPS[i], state.values)
    if (!isEmpty(errors)) return failed(state, i, errors)
  }
  return { ...state, step: to, maxStep: Math.max(state.maxStep, to), errors: {} }
}

export function quoteReducer(state: QuoteState, action: QuoteAction): QuoteState {
  if (action.type === 'reset') return createInitialState(action.projectTypeSlug ?? null)
  if (state.status === 'submitted') return state

  switch (action.type) {
    case 'update': {
      const errors = { ...state.errors }
      delete errors[action.field]
      return { ...state, values: { ...state.values, [action.field]: action.value }, errors }
    }
    case 'next':
      return state.step >= SUMMARY_STEP ? state : advance(state, state.step, state.step + 1)
    case 'back':
      return state.step === 0 ? state : { ...state, step: state.step - 1, errors: {} }
    case 'goTo': {
      const target = action.step
      if (!Number.isInteger(target) || target < 0 || target > state.maxStep || target === state.step) return state
      // Geri gitmek serbesttir; ulaşılmış bir ileri adıma giderken aradaki adımlar yeniden doğrulanır.
      return target < state.step ? { ...state, step: target, errors: {} } : advance(state, state.step, target)
    }
    case 'submit': {
      if (state.step !== SUMMARY_STEP) return state
      const checked = advance(state, 0, SUMMARY_STEP)
      return checked.step === SUMMARY_STEP ? { ...checked, status: 'submitted' } : checked
    }
  }
}

// --- Seçiciler --------------------------------------------------------------

export const currentStepId = (state: QuoteState): QuoteStepId => QUOTE_STEPS[state.step]

/** İlerleme göstergesinde bir adıma gidilebilir mi (yalnızca ulaşılmış adımlar). */
export const canGoToStep = (state: QuoteState, step: number): boolean =>
  state.status === 'editing' && step !== state.step && step >= 0 && step <= state.maxStep

/** Etkin adımın ilk hatalı alanı (ekran sırasıyla). */
export function firstInvalidField(state: QuoteState): QuoteField | undefined {
  return STEP_FIELDS[currentStepId(state)].find((field) => state.errors[field])
}

interface SummarySection {
  step: number
  title: string
  items: { label: string; value: string }[]
}

const labelOf = (options: readonly { id: string; label: string }[], id: string, fallback: string) =>
  options.find((o) => o.id === id)?.label ?? fallback

/** Özet: id'ler adlarıyla, boş isteğe bağlı alanlar "Belirtilmedi" olarak. */
export function buildSummary(v: QuoteValues): SummarySection[] {
  const { steps, notProvided } = site.contactPage.form
  const or = (value: string) => value.trim() || notProvided
  const selectedServices = quoteOptions.services.filter((s) => v.services.includes(s.id)).map((s) => s.label)

  return [
    {
      step: 0,
      title: steps.project,
      items: [
        { label: fields.projectType.legend, value: labelOf(quoteOptions.projectTypes, v.projectType, notProvided) },
        { label: fields.services.legend, value: selectedServices.join(', ') || notProvided },
      ],
    },
    {
      step: 1,
      title: steps.details,
      items: [
        { label: fields.area.label, value: v.area.trim() ? formatArea(Number(v.area.trim())) : notProvided },
        { label: fields.province.label, value: labelOf(quoteOptions.provinces, v.province, notProvided) },
        { label: fields.budget.legend, value: labelOf(quoteOptions.budgets, v.budget, notProvided) },
        { label: fields.timing.legend, value: labelOf(quoteOptions.timings, v.timing, notProvided) },
        { label: fields.description.label, value: or(v.description) },
      ],
    },
    {
      step: 2,
      title: steps.contact,
      items: [
        { label: fields.fullName.label, value: or(v.fullName) },
        { label: fields.phone.label, value: or(v.phone) },
        { label: fields.email.label, value: or(v.email) },
        {
          label: fields.contactPreference.legend,
          value: labelOf(quoteOptions.contactPreferences, v.contactPreference, notProvided),
        },
        { label: fields.consent.summaryLabel, value: v.consent ? fields.consent.summaryValue : notProvided },
      ],
    },
  ]
}
