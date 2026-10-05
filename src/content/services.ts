import type { Service } from './types'

/** Hizmet verisinin tek kaynağı. Ana sayfa ad ve özeti, Hizmetler sayfası tamamını kullanır. */
export const services: Service[] = [
  {
    id: 'svc-001',
    slug: 'mimari-tasarim',
    name: 'Mimari tasarım',
    summary: 'Arsayı ve ihtiyaç programını okuyarak ön tasarımdan uygulama projesine kadar yapının tamamını tasarlıyoruz.',
    description: [
      'Tasarıma arsanın eğimini, yönünü, iklimini ve çevresindeki yapıları inceleyerek başlıyoruz. İhtiyaç programını sizinle birlikte netleştirdikten sonra birkaç farklı yerleşim seçeneğini kütle çalışmaları ve çizimlerle karşılaştırıyoruz.',
      'Seçilen fikir; avan, ruhsat ve uygulama projesi aşamalarında ayrıntılandırılıyor. Statik, mekanik ve elektrik proje ekipleriyle aynı model üzerinde çalışarak sahada çıkabilecek çakışmaları çizim aşamasında çözüyoruz.',
    ],
  },
  {
    id: 'svc-002',
    slug: 'ic-mimarlik',
    name: 'İç mimarlık',
    summary: 'Mekânın planını, malzemesini, ışığını ve mobilyasını tek bir bütün olarak ele alıyoruz.',
    description: [
      'İç mekân tasarımında önce mekânın nasıl kullanılacağını anlamaya çalışıyoruz: gün içinde kimlerin, hangi saatlerde, ne yaptığını. Plan kararları bu gözlemlerden doğuyor; malzeme ve renk seçimleri de planı destekleyecek şekilde sınırlı tutuluyor.',
      'Sabit mobilyaları, aydınlatmayı ve depolama çözümlerini mekâna özel olarak tasarlıyor; üretim çizimlerini atölyelerle birlikte hazırlıyoruz.',
    ],
  },
  {
    id: 'svc-003',
    slug: 'uygulama-ve-santiye-yonetimi',
    name: 'Uygulama ve şantiye yönetimi',
    summary: 'Tasarımın sahada doğru uygulanması için süreci yüklenicilerle birlikte planlıyor ve düzenli olarak denetliyoruz.',
    description: [
      'Uygulama başlamadan önce iş programını, malzeme listelerini ve teklif dosyalarını hazırlıyor, yüklenici seçiminde karşılaştırmalı değerlendirme sunuyoruz.',
      'Şantiye süresince düzenli saha ziyaretleri yapıyor, ayrıntıların çizimlere uygun uygulanmasını takip ediyor ve kararları tutanak altına alıyoruz. Teslimde eksik listesini birlikte kapatıyoruz.',
    ],
  },
  {
    id: 'svc-004',
    slug: 'renovasyon',
    name: 'Renovasyon ve yeniden kullanım',
    summary: 'Mevcut yapıların değerini koruyarak onları bugünün ihtiyaçlarına uyarlıyoruz.',
    description: [
      'Eski bir yapıyı dönüştürmeden önce rölöve ve durum tespiti yapıyoruz: hangi duvarların taşıyıcı olduğunu, hangi malzemelerin korunabileceğini ve yapının asıl karakterini neyin oluşturduğunu belirliyoruz.',
      'Yeni eklemeleri mevcut yapıdan okunabilir biçimde ayırıyor, gerektiğinde ileride sökülebilecek hafif sistemler kullanıyoruz. Amaç yapıyı yenilemek kadar ömrünü uzatmaktır.',
    ],
  },
  {
    id: 'svc-005',
    slug: 'danismanlik',
    name: 'Danışmanlık',
    summary: 'Arsa seçimi, fizibilite ve tasarım kararları öncesinde bağımsız bir mimari görüş sunuyoruz.',
    description: [
      'Bir arsa ya da yapı almadan önce, mevcut imar koşullarında neler yapılabileceğini ve yaklaşık hangi büyüklükte bir yapının sığabileceğini gösteren kısa çalışmalar hazırlıyoruz.',
      'Başka bir ekiple yürüyen projelerde de belirli konularda — plan kurgusu, malzeme seçimi, gün ışığı — ikinci bir göz olarak destek veriyoruz.',
    ],
  },
]
