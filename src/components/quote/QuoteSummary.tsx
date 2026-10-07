import { site } from '../../content/site'
import { buildSummary, type QuoteValues } from '../../quote/quoteForm'

interface QuoteSummaryProps {
  values: QuoteValues
  onEdit: (step: number) => void
}

/** Girilen bilgilerin okunur özeti; her bölümün yanında o adıma dönen "Düzenle". */
export function QuoteSummary({ values, onEdit }: QuoteSummaryProps) {
  const { buttons } = site.contactPage.form
  return (
    <div className="flex flex-col gap-10">
      {buildSummary(values).map((section) => (
        <div key={section.step}>
          <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink pb-2">
            <h4 className="font-display text-xl">{section.title}</h4>
            <button
              type="button"
              onClick={() => onEdit(section.step)}
              aria-label={buttons.editLabel(section.title)}
              className="min-h-11 px-1 font-medium text-accent underline underline-offset-4 hover:text-accent-strong"
            >
              {buttons.edit}
            </button>
          </div>
          <dl>
            {section.items.map((item) => (
              <div key={item.label} className="grid grid-cols-[minmax(0,1fr)] gap-1 border-b border-gray-200 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] sm:gap-6">
                <dt className="text-gray-600">{item.label}</dt>
                <dd className="break-words whitespace-pre-line">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  )
}
