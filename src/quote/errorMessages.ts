import { site } from '../content/site'
import type { QuoteErrorCode } from '../content/types'
import { AREA_MAX, AREA_MIN, DESCRIPTION_MAX } from './quoteForm'

/** Hata kodunu içerik kaynağındaki mesaja çevirir. */
export function errorMessage(code: QuoteErrorCode): string {
  const errors = site.contactPage.form.errors
  switch (code) {
    case 'areaRange':
      return errors.areaRange(AREA_MIN, AREA_MAX)
    case 'descriptionTooLong':
      return errors.descriptionTooLong(DESCRIPTION_MAX)
    default:
      return errors[code]
  }
}
