import type { FaqItem } from './types'

/** Sık sorulan sorular. Cevaplar geneldir; kesin süre, fiyat veya garanti içermez. */
export const faqItems: FaqItem[] = [
  {
    id: 'sss-sure',
    question: 'Bir proje ne kadar sürer?',
    answer: [
      'Süre; projenin ölçeğine, izin süreçlerine ve karar alma hızına göre büyük ölçüde değişir. Küçük bir iç mekân düzenlemesiyle yeni bir yapı arasında ciddi fark vardır.',
      'İlk görüşmeden sonra projenize özel, aşamalara bölünmüş tahmini bir iş programı paylaşıyor ve süreç boyunca güncel tutuyoruz.',
    ],
  },
  {
    id: 'sss-ilk-gorusme',
    question: 'İlk görüşme nasıl geçer?',
    answer: [
      'İlk görüşmede ihtiyaçlarınızı, beklentilerinizi ve elinizdeki bilgileri (tapu, mevcut çizimler, fotoğraflar) konuşuyoruz. Mümkünse arsayı ya da mekânı birlikte geziyoruz.',
      'Görüşmenin amacı birbirimizi tanımak ve işin kapsamını anlamaktır; sonrasında size yazılı bir çalışma önerisi gönderiyoruz.',
    ],
  },
  {
    id: 'sss-sehir-disi',
    question: 'Şehir dışındaki projelerde çalışıyor musunuz?',
    answer: [
      'Evet. Uzaktaki projelerde görüşmelerin bir kısmını çevrim içi yapıyor, kritik aşamalarda sahaya gidiyoruz. Uygulama aşamasında gerektiğinde yerel bir ekiple birlikte çalışıyoruz.',
    ],
  },
  {
    id: 'sss-butce',
    question: 'Bütçe nasıl belirlenir?',
    answer: [
      'Proje bütçesi; alan, kapsam, malzeme seçimleri ve uygulama koşullarına bağlıdır. Konsept aşamasında farklı seçeneklerin bütçeye etkisini birlikte değerlendiriyoruz.',
      'Tasarım hizmeti için önerimizi, işin kapsamı netleştikten sonra yazılı olarak sunuyoruz.',
    ],
  },
  {
    id: 'sss-asama',
    question: 'Projeye hangi aşamada dahil olabilirsiniz?',
    answer: [
      'En verimli başlangıç, arsa ya da mekân seçilmeden veya seçildikten hemen sonradır; ancak devam eden bir projeye iç mimarlık, uygulama takibi ya da danışmanlık için de katılabiliyoruz.',
    ],
  },
]
