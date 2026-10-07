import type { ReactNode } from 'react'
import { site } from '../../content/site'
import type { QuoteErrorCode, QuoteOption } from '../../content/types'
import { errorMessage } from '../../quote/errorMessages'
import type { QuoteField } from '../../quote/quoteForm'

/** Alan kimlikleri: odak, etiket ve hata bağlantıları için ortak. */
const fieldId = (field: QuoteField) => `teklif-${field}`
const hintId = (field: QuoteField) => `${fieldId(field)}-ipucu`
const errorId = (field: QuoteField) => `${fieldId(field)}-hata`

function describedBy(field: QuoteField, hasHint: boolean, error?: QuoteErrorCode, extra?: string) {
  return [hasHint && hintId(field), extra, error && errorId(field)].filter(Boolean).join(' ') || undefined
}

const labelClass = 'block font-medium'
const hintClass = 'mt-1 text-sm text-gray-600'
const controlClass =
  'mt-2 block min-h-12 w-full border bg-white px-4 py-3 text-base text-ink aria-[invalid=true]:border-2 aria-[invalid=true]:border-accent'

function Optional({ show }: { show?: boolean }) {
  return show ? <span className="font-normal text-gray-600"> {site.contactPage.form.optional}</span> : null
}

function FieldError({ field, error }: { field: QuoteField; error?: QuoteErrorCode }) {
  if (!error) return null
  return (
    <p id={errorId(field)} className="mt-2 text-sm font-medium text-accent">
      {errorMessage(error)}
    </p>
  )
}

interface BaseProps {
  field: QuoteField
  label: string
  hint?: string
  error?: QuoteErrorCode
  optional?: boolean
}

interface TextFieldProps extends BaseProps {
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'tel' | 'email'
  inputMode?: 'text' | 'tel' | 'email' | 'numeric'
  autoComplete?: string
  suffix?: string
  maxLength?: number
}

export function TextField({ field, label, hint, error, optional, value, onChange, type = 'text', inputMode, autoComplete, suffix, maxLength }: TextFieldProps) {
  const input = (
    <input
      id={fieldId(field)}
      data-quote-field={field}
      type={type}
      inputMode={inputMode}
      autoComplete={autoComplete}
      maxLength={maxLength}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy(field, Boolean(hint), error)}
      className={`${controlClass} ${error ? '' : 'border-gray-500'} ${suffix ? 'mt-0 min-w-0 flex-1' : ''}`}
    />
  )
  return (
    <div>
      <label htmlFor={fieldId(field)} className={labelClass}>
        {label}
        <Optional show={optional} />
      </label>
      {hint && (
        <p id={hintId(field)} className={hintClass}>
          {hint}
        </p>
      )}
      {suffix ? (
        <div className="mt-2 flex max-w-xs items-stretch">
          {input}
          <span aria-hidden="true" className="flex items-center border border-l-0 border-gray-500 bg-paper px-4">
            {suffix}
          </span>
        </div>
      ) : (
        input
      )}
      <FieldError field={field} error={error} />
    </div>
  )
}

interface TextAreaFieldProps extends BaseProps {
  value: string
  onChange: (value: string) => void
  maxLength: number
  counter: string
}

export function TextAreaField({ field, label, hint, error, optional, value, onChange, maxLength, counter }: TextAreaFieldProps) {
  const counterId = `${fieldId(field)}-sayac`
  return (
    <div>
      <label htmlFor={fieldId(field)} className={labelClass}>
        {label}
        <Optional show={optional} />
      </label>
      {hint && (
        <p id={hintId(field)} className={hintClass}>
          {hint}
        </p>
      )}
      <textarea
        id={fieldId(field)}
        data-quote-field={field}
        rows={5}
        maxLength={maxLength}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(field, Boolean(hint), error, counterId)}
        className={`${controlClass} ${error ? '' : 'border-gray-500'} resize-y`}
      />
      <p id={counterId} className="mt-2 text-right text-sm text-gray-600 tabular-nums">
        {counter}
      </p>
      <FieldError field={field} error={error} />
    </div>
  )
}

interface SelectFieldProps extends BaseProps {
  value: string
  onChange: (value: string) => void
  options: readonly QuoteOption[]
  placeholder: string
  autoComplete?: string
}

export function SelectField({ field, label, hint, error, value, onChange, options, placeholder, autoComplete }: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={fieldId(field)} className={labelClass}>
        {label}
      </label>
      {hint && (
        <p id={hintId(field)} className={hintClass}>
          {hint}
        </p>
      )}
      <select
        id={fieldId(field)}
        data-quote-field={field}
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(field, Boolean(hint), error)}
        className={`${controlClass} ${error ? '' : 'border-gray-500'} max-w-sm`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldError field={field} error={error} />
    </div>
  )
}

interface ChoiceGroupProps extends BaseProps {
  type: 'radio' | 'checkbox'
  options: readonly QuoteOption[]
  /** Radyo için seçili id, onay kutusu için seçili id listesi. */
  selected: string | readonly string[]
  onToggle: (id: string) => void
}

/** Tek veya çoklu seçim grubu: fieldset + legend ile gruplanır. */
export function ChoiceGroup({ field, label, hint, error, optional, type, options, selected, onToggle }: ChoiceGroupProps) {
  const isChecked = (id: string) => (typeof selected === 'string' ? selected === id : selected.includes(id))
  return (
    <fieldset aria-describedby={describedBy(field, Boolean(hint), error)}>
      <legend className={labelClass}>
        {label}
        <Optional show={optional} />
      </legend>
      {hint && (
        <p id={hintId(field)} className={hintClass}>
          {hint}
        </p>
      )}
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option.id}
            className={`flex min-h-12 cursor-pointer items-center gap-3 border bg-white px-4 py-3 transition-colors has-[:checked]:border-2 has-[:checked]:border-ink ${
              error ? 'border-accent' : 'border-gray-300 hover:border-gray-500'
            }`}
          >
            <input
              type={type}
              name={fieldId(field)}
              value={option.id}
              data-quote-field={field}
              checked={isChecked(option.id)}
              onChange={() => onToggle(option.id)}
              aria-invalid={error ? true : undefined}
              className="size-5 shrink-0 accent-accent"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      <FieldError field={field} error={error} />
    </fieldset>
  )
}

/** Tek onay kutusu (bilgilendirme onayı). */
export function ConsentField({ field, label, text, error, checked, onChange }: BaseProps & { text: ReactNode; checked: boolean; onChange: (value: boolean) => void }) {
  const textId = `${fieldId(field)}-metin`
  return (
    <div>
      <p id={textId} className="border-l-4 border-gray-300 pl-4 text-sm text-gray-600">
        {text}
      </p>
      <label className="mt-4 flex min-h-12 cursor-pointer items-start gap-3">
        <input
          id={fieldId(field)}
          type="checkbox"
          data-quote-field={field}
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(field, false, error, textId)}
          className="mt-0.5 size-5 shrink-0 accent-accent"
        />
        <span className="font-medium">{label}</span>
      </label>
      <FieldError field={field} error={error} />
    </div>
  )
}
