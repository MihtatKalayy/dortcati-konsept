import type { Ref } from 'react'
import { site } from '../../content/site'
import { paths } from '../../routes/paths'
import { ButtonLink } from '../ui/ButtonLink'

interface QuoteSuccessProps {
  headingRef: Ref<HTMLHeadingElement>
  onReset: () => void
}

export function QuoteSuccess({ headingRef, onReset }: QuoteSuccessProps) {
  const { success } = site.contactPage.form
  return (
    <div className="flex flex-col items-start gap-6">
      <h3 ref={headingRef} tabIndex={-1} className="text-h2 focus:outline-none">
        {success.heading}
      </h3>
      <p className="max-w-prose text-lead">{success.body}</p>
      <p className="max-w-prose border-l-4 border-accent pl-4 font-medium">{success.note}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-12 items-center justify-center border-2 border-accent bg-accent px-6 py-3 font-medium text-white transition-colors hover:border-accent-strong hover:bg-accent-strong"
        >
          {success.newRequest}
        </button>
        <ButtonLink to={paths.projects} variant="secondary">
          {success.projectsLink}
        </ButtonLink>
      </div>
    </div>
  )
}
