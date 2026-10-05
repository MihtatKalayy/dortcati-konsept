import type { ReactNode } from 'react'
import { Link } from 'react-router'

/** Vurgu renginde, altı çizili metin bağlantısı. */
export function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="mt-10 inline-block font-medium text-accent underline underline-offset-4 hover:text-accent-strong"
    >
      {children}
    </Link>
  )
}
