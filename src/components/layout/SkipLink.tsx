import { site } from '../../content/site'
import { MAIN_CONTENT_ID } from './ids'

export function SkipLink() {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="sr-only z-50 bg-ink px-4 py-3 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      {site.ui.skipToContent}
    </a>
  )
}
