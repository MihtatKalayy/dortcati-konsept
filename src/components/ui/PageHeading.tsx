import type { ReactNode } from 'react'

interface PageHeadingProps {
  children: ReactNode
}

/**
 * Sayfanın tek h1 başlığı. Sayfa geçişinde odak buraya taşınır,
 * bu yüzden programatik odak alabilir (tabIndex -1).
 */
export function PageHeading({ children }: PageHeadingProps) {
  return (
    <h1 tabIndex={-1} className="max-w-[18ch] text-h1 focus:outline-none">
      {children}
    </h1>
  )
}
