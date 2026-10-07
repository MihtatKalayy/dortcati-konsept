import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { textLinkClass } from './styles'

/** Vurgu renginde, altı çizili metin bağlantısı. */
export function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className={`mt-10 ${textLinkClass}`}
    >
      {children}
    </Link>
  )
}
