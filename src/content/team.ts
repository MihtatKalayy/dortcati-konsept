import type { TeamMember } from './types'

/** Ekip kurgusaldır; adlar ve unvanlar bu konsept çalışma için oluşturulmuştur. */
export const team: TeamMember[] = [
  {
    id: 'ekp-001',
    name: 'Deniz Aksoy',
    role: 'Kurucu mimar',
    bio: 'Konut projelerinde arazi ve iklimle kurulan ilişkiye odaklanıyor; ofisin tasarım yönünü belirliyor.',
  },
  {
    id: 'ekp-002',
    name: 'Selin Karaca',
    role: 'İç mimar',
    bio: 'Mekâna özel mobilya, malzeme ve aydınlatma tasarımını yürütüyor; atölyelerle üretim sürecini takip ediyor.',
  },
  {
    id: 'ekp-003',
    name: 'Kerem Ilgaz',
    role: 'Proje ve şantiye sorumlusu',
    bio: 'Uygulama projelerini koordine ediyor, şantiyede çizimlerin doğru uygulanmasını takip ediyor.',
  },
  {
    id: 'ekp-004',
    name: 'Ece Tunalı',
    role: 'Mimar',
    bio: 'Yeniden kullanım ve renovasyon projelerinde rölöve, durum tespiti ve tasarım çalışmalarında yer alıyor.',
  },
]

/** Baş harfler (Türkçe büyük harf kurallarıyla): "Ece Tunalı" → "ET". */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0].toLocaleUpperCase('tr'))
    .join('')
}
