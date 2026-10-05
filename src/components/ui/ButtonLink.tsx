import type { ReactNode } from 'react'
import { Link } from 'react-router'

interface ButtonLinkProps {
  to: string
  variant?: 'primary' | 'secondary'
  children: ReactNode
}

const variants = {
  primary: 'border-accent bg-accent text-white hover:border-accent-strong hover:bg-accent-strong',
  secondary: 'border-ink text-ink hover:bg-ink hover:text-white',
}

/** Buton görünümlü sayfa bağlantısı. */
export function ButtonLink({ to, variant = 'primary', children }: ButtonLinkProps) {
  return (
    <Link
      to={to}
      className={`inline-flex min-h-12 items-center justify-center border-2 px-6 py-3 font-medium transition-colors ${variants[variant]}`}
    >
      {children}
    </Link>
  )
}
