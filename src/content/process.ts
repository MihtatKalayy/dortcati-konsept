import type { ProcessStep } from './types'

/** Çalışma sürecinin adımları, sırasıyla. */
export const processSteps: ProcessStep[] = [
  {
    id: 'prc-001',
    title: 'Tanışma ve ihtiyaç analizi',
    body: 'Arsayı ya da mekânı birlikte geziyor, beklentilerinizi, kullanım alışkanlıklarınızı ve bütçe çerçevenizi dinliyoruz. Bu görüşmenin sonunda işin kapsamını yazılı olarak netleştiriyoruz.',
  },
  {
    id: 'prc-002',
    title: 'Konsept tasarım',
    body: 'Birkaç farklı yaklaşımı eskiz, çizim ve basit modellerle karşılaştırıyoruz. Birlikte bir yön seçiyor, ana kararları bu aşamada sabitliyoruz.',
  },
  {
    id: 'prc-003',
    title: 'Projelendirme',
    body: 'Seçilen konsepti ruhsat ve uygulama projelerine dönüştürüyor, mühendislik ekipleriyle koordinasyonu sağlıyoruz. Malzeme ve ayrıntı kararları bu aşamada kesinleşiyor.',
  },
  {
    id: 'prc-004',
    title: 'Uygulama',
    body: 'Yüklenici seçiminde destek veriyor, şantiyeyi düzenli ziyaretlerle takip ediyoruz. Sahada çıkan soruları çizimlerle yanıtlıyoruz.',
  },
  {
    id: 'prc-005',
    title: 'Teslim',
    body: 'Eksik listesini birlikte kapatıyor, kullanım ve bakım için gerekli bilgileri ve çizimleri size teslim ediyoruz.',
  },
]
