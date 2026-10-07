/**
 * Sayfa parçası yüklenirken üstte görünen ince ilerleme çubuğu (görsel; ekran okuyucu
 * için <main> aria-busy ile işaretlenir). Kısa geçişlerde yanıp sönmesin diye gecikmeyle görünür;
 * hareketi azaltma tercihinde geçiş animasyonu genel kuralla kapanır.
 */
export function NavigationProgress({ active }: { active: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`fixed top-0 left-0 z-50 h-1 bg-accent transition-[width,opacity] ${
        active ? 'w-4/5 opacity-100 delay-150 duration-[2500ms] ease-out' : 'w-0 opacity-0 duration-0'
      }`}
    />
  )
}
