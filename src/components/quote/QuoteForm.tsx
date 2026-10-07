import { type FormEvent, useEffect, useReducer, useRef } from 'react'
import { provincesByName } from '../../content/provinces'
import { site } from '../../content/site'
import {
  createInitialState,
  currentStepId,
  DESCRIPTION_MAX,
  firstInvalidField,
  QUOTE_STEPS,
  quoteOptions,
  quoteReducer,
  type QuoteField,
  type QuoteValues,
  SUMMARY_STEP,
} from '../../quote/quoteForm'
import { ChoiceGroup, ConsentField, SelectField, TextAreaField, TextField } from './fields'
import { QuoteProgress } from './QuoteProgress'
import { QuoteSuccess } from './QuoteSuccess'
import { QuoteSummary } from './QuoteSummary'

const provinceOptions = provincesByName.map((p) => ({ id: p.code, label: p.name }))

interface QuoteFormProps {
  /** Adresteki ön seçim (kategori slug'ı); geçersizse yok sayılır. */
  projectTypeSlug: string | null
}

/**
 * Dört adımlı teklif formu. Durum yalnızca bellekte (useReducer) tutulur;
 * hiçbir ağ isteği yapılmaz, tarayıcı depolamasına veya adrese yazılmaz.
 */
export function QuoteForm({ projectTypeSlug }: QuoteFormProps) {
  const copy = site.contactPage.form
  const f = copy.fields
  const [state, dispatch] = useReducer(quoteReducer, projectTypeSlug, createInitialState)
  const { values, errors } = state
  const stepId = currentStepId(state)

  const topRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)
  const liveRef = useRef<HTMLParagraphElement>(null)
  const announce = (message: string) => {
    if (liveRef.current) liveRef.current.textContent = message
  }

  // Adım veya durum değişince: forma kaydır, odağı başlığa taşı, duyur.
  const stepKey = `${state.status}:${state.step}`
  const previousStepKey = useRef(stepKey)
  useEffect(() => {
    if (previousStepKey.current === stepKey) return
    previousStepKey.current = stepKey
    topRef.current?.scrollIntoView({ block: 'start' })
    if (state.status === 'submitted') {
      successRef.current?.focus({ preventScroll: true })
      announce(`${copy.success.heading}. ${copy.success.note}`)
    } else {
      headingRef.current?.focus({ preventScroll: true })
      announce(copy.stepAnnouncement(state.step + 1, QUOTE_STEPS.length, copy.steps[stepId]))
    }
  })

  // Başarısız doğrulamada odak ilk hatalı alana (radyo/onay grubunda seçili ya da ilk seçeneğe).
  const previousAttempt = useRef(state.validationAttempt)
  useEffect(() => {
    if (previousAttempt.current === state.validationAttempt) return
    previousAttempt.current = state.validationAttempt
    const field = firstInvalidField(state)
    if (!field) return
    const inputs = [...document.querySelectorAll<HTMLElement>(`[data-quote-field="${field}"]`)]
    const target = inputs.find((el) => (el as HTMLInputElement).checked) ?? inputs[0]
    target?.focus()
    announce(copy.errorAnnouncement(Object.keys(state.errors).length))
  })

  const update = <K extends QuoteField>(field: K, value: QuoteValues[K]) => dispatch({ type: 'update', field, value })
  const toggleService = (id: string) =>
    update('services', values.services.includes(id) ? values.services.filter((s) => s !== id) : [...values.services, id])

  // Enter (örtük gönderim) ve düğmeler: 1–3. adımda "İleri", özette "Talebi gönder".
  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    dispatch({ type: state.step === SUMMARY_STEP ? 'submit' : 'next' })
  }

  const buttonBase = 'inline-flex min-h-12 items-center justify-center border-2 px-6 py-3 font-medium transition-colors'

  return (
    <div ref={topRef} className="scroll-mt-6">
      <h2 id="teklif-formu" className="text-h2">
        {copy.heading}
      </h2>
      <p className="mt-4 max-w-prose border-l-4 border-accent pl-4 text-sm font-medium">{copy.conceptNote}</p>
      <p ref={liveRef} role="status" aria-atomic="true" className="sr-only" />

      <div className="mt-10 border border-gray-200 bg-white p-5 sm:p-8">
        {state.status === 'submitted' ? (
          <QuoteSuccess headingRef={successRef} onReset={() => dispatch({ type: 'reset', projectTypeSlug })} />
        ) : (
          <>
            <QuoteProgress state={state} onGoTo={(step) => dispatch({ type: 'goTo', step })} />
            <form noValidate aria-labelledby="teklif-formu teklif-adim" onSubmit={onSubmit} className="mt-10">
              <p className="text-sm text-gray-600">{copy.stepPosition(state.step + 1, QUOTE_STEPS.length)}</p>
              <h3 id="teklif-adim" ref={headingRef} tabIndex={-1} className="mt-1 text-h3 focus:outline-none">
                {copy.steps[stepId]}
              </h3>

              <div className="mt-8 flex flex-col gap-10">
                {stepId === 'project' && (
                  <>
                    <ChoiceGroup
                      field="projectType"
                      type="radio"
                      label={f.projectType.legend}
                      options={quoteOptions.projectTypes}
                      selected={values.projectType}
                      onToggle={(id) => update('projectType', id)}
                      error={errors.projectType}
                    />
                    <ChoiceGroup
                      field="services"
                      type="checkbox"
                      label={f.services.legend}
                      hint={f.services.hint}
                      options={quoteOptions.services}
                      selected={values.services}
                      onToggle={toggleService}
                      error={errors.services}
                    />
                  </>
                )}

                {stepId === 'details' && (
                  <>
                    <TextField
                      field="area"
                      label={f.area.label}
                      hint={f.area.hint}
                      optional
                      value={values.area}
                      onChange={(v) => update('area', v)}
                      inputMode="numeric"
                      autoComplete="off"
                      suffix={f.area.unit}
                      error={errors.area}
                    />
                    <SelectField
                      field="province"
                      label={f.province.label}
                      placeholder={f.province.placeholder}
                      options={provinceOptions}
                      value={values.province}
                      onChange={(v) => update('province', v)}
                      autoComplete="address-level1"
                      error={errors.province}
                    />
                    <ChoiceGroup
                      field="budget"
                      type="radio"
                      label={f.budget.legend}
                      hint={f.budget.hint}
                      options={quoteOptions.budgets}
                      selected={values.budget}
                      onToggle={(id) => update('budget', id)}
                      error={errors.budget}
                    />
                    <ChoiceGroup
                      field="timing"
                      type="radio"
                      label={f.timing.legend}
                      options={quoteOptions.timings}
                      selected={values.timing}
                      onToggle={(id) => update('timing', id)}
                      error={errors.timing}
                    />
                    <TextAreaField
                      field="description"
                      label={f.description.label}
                      hint={f.description.hint}
                      optional
                      value={values.description}
                      onChange={(v) => update('description', v)}
                      maxLength={DESCRIPTION_MAX}
                      counter={f.description.counter(values.description.length, DESCRIPTION_MAX)}
                      error={errors.description}
                    />
                  </>
                )}

                {stepId === 'contact' && (
                  <>
                    <TextField
                      field="fullName"
                      label={f.fullName.label}
                      value={values.fullName}
                      onChange={(v) => update('fullName', v)}
                      autoComplete="name"
                      error={errors.fullName}
                    />
                    <TextField
                      field="phone"
                      label={f.phone.label}
                      hint={f.phone.hint}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={values.phone}
                      onChange={(v) => update('phone', v)}
                      error={errors.phone}
                    />
                    <TextField
                      field="email"
                      label={f.email.label}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(v) => update('email', v)}
                      error={errors.email}
                    />
                    <ChoiceGroup
                      field="contactPreference"
                      type="radio"
                      label={f.contactPreference.legend}
                      options={quoteOptions.contactPreferences}
                      selected={values.contactPreference}
                      onToggle={(id) => update('contactPreference', id)}
                      error={errors.contactPreference}
                    />
                    <ConsentField
                      field="consent"
                      label={f.consent.label}
                      text={f.consent.text}
                      checked={values.consent}
                      onChange={(v) => update('consent', v)}
                      error={errors.consent}
                    />
                  </>
                )}

                {stepId === 'summary' && (
                  <QuoteSummary values={values} onEdit={(step) => dispatch({ type: 'goTo', step })} />
                )}
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-6">
                {state.step > 0 ? (
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'back' })}
                    className={`${buttonBase} border-ink text-ink hover:bg-ink hover:text-white`}
                  >
                    <span aria-hidden="true">←&nbsp;</span>
                    {copy.buttons.back}
                  </button>
                ) : (
                  <span />
                )}
                <button
                  type="submit"
                  className={`${buttonBase} border-accent bg-accent text-white hover:border-accent-strong hover:bg-accent-strong`}
                >
                  {state.step === SUMMARY_STEP ? copy.buttons.submit : copy.buttons.next}
                  {state.step !== SUMMARY_STEP && <span aria-hidden="true">&nbsp;→</span>}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
