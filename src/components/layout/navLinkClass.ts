/** Menü bağlantıları için ortak sınıf; etkin sayfa vurgu rengiyle altı çizili gösterilir. */
export function navLinkClass({ isActive }: { isActive: boolean }): string {
  const base =
    'inline-flex min-h-11 items-center underline-offset-[0.4em] decoration-2 transition-colors hover:text-accent hover:underline'
  return isActive ? `${base} font-semibold underline decoration-accent` : base
}
