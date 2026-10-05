import type { FaqItem } from '../../content/types'

/**
 * Açılır-kapanır sorular. Yerel <details>/<summary>: fare, dokunma ve klavyeyle
 * (Enter/Boşluk) çalışır; açık/kapalı durumu tarayıcı tarafından ekran okuyucuya bildirilir.
 */
export function FaqList({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="border-t border-gray-200">
      {items.map((item) => (
        <details key={item.id} className="group border-b border-gray-200">
          <summary className="cursor-pointer list-none py-5 [&::-webkit-details-marker]:hidden">
            <span className="flex items-start justify-between gap-6">
              <span className="font-display text-h3">{item.question}</span>
              <span
                aria-hidden="true"
                className="mt-1 font-display text-h3 leading-none text-accent transition-transform group-open:rotate-45"
              >
                +
              </span>
            </span>
          </summary>
          <div className="flex max-w-prose flex-col gap-4 pb-8 text-gray-600">
            {item.answer.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  )
}
