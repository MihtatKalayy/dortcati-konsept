import { site } from '../../content/site'
import { canGoToStep, QUOTE_STEPS, type QuoteState } from '../../quote/quoteForm'

interface QuoteProgressProps {
  state: QuoteState
  onGoTo: (step: number) => void
}

/**
 * Adım göstergesi. Etkin adım aria-current="step" ile işaretlenir; ulaşılmış
 * adımlar düğmedir, henüz gelinmemiş adımlar tıklanamaz.
 */
export function QuoteProgress({ state, onGoTo }: QuoteProgressProps) {
  const { steps, progressLabel } = site.contactPage.form
  return (
    <nav aria-label={progressLabel}>
      <ol className="grid grid-cols-4 gap-1.5 sm:gap-3">
        {QUOTE_STEPS.map((id, index) => {
          const current = index === state.step
          const reached = index <= state.maxStep
          const content = (
            <>
              <span className="block font-display text-xl tabular-nums sm:text-2xl">{index + 1}</span>
              <span className="block text-[0.8125rem] leading-tight break-words sm:text-sm">{steps[id]}</span>
            </>
          )
          const base = 'block w-full border-t-4 pt-2 text-left'
          return (
            <li key={id}>
              {canGoToStep(state, index) ? (
                <button
                  type="button"
                  onClick={() => onGoTo(index)}
                  className={`${base} cursor-pointer border-ink underline-offset-4 hover:text-accent hover:underline`}
                >
                  {content}
                </button>
              ) : (
                <span
                  aria-current={current ? 'step' : undefined}
                  className={`${base} ${current ? 'border-accent font-semibold text-ink' : reached ? 'border-ink' : 'border-gray-300 text-gray-600'}`}
                >
                  {content}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
