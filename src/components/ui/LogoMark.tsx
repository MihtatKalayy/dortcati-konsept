/** Dört çatı biçiminden oluşan basit logo işareti (dekoratif). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" className={className}>
      <path d="M2 14 9 6l7 8M16 14l7-8 7 8M2 30l7-8 7 8M16 30l7-8 7 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" />
    </svg>
  )
}
