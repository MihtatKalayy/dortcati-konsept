import type { ReactNode } from 'react'

interface PageHeadingProps {
  children: ReactNode
  /** display: ana sayfa açılışı gibi en büyük başlık ölçeği. */
  size?: 'h1' | 'display'
}

/**
 * Sayfanın tek h1 başlığı. Sayfa geçişinde odak buraya taşınır,
 * bu yüzden programatik odak alabilir (tabIndex -1).
 */
export function PageHeading({ children, size = 'h1' }: PageHeadingProps) {
  const scale = size === 'display' ? 'max-w-[14ch] text-display' : 'max-w-[18ch] text-h1'
  return (
    <h1 tabIndex={-1} className={`${scale} focus:outline-none`}>
      {children}
    </h1>
  )
}
