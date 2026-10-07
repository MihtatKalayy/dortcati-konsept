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
    includes: [
      'Arsa ve çevre analizi',
      'Kütle ve yerleşim seçenekleri',
      'Avan ve ruhsat projesi',
      'Uygulama projesi ve ayrıntılar',
      'Mühendislik ekipleriyle koordinasyon',
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
    includes: [
      'Mekân kurgusu ve plan',
      'Malzeme, renk ve doku seçimi',
      'Aydınlatma tasarımı',
      'Mekâna özel mobilya ve üretim çizimleri',
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
    includes: [
      'İş programı ve metraj',
      'Teklif dosyası ve yüklenici değerlendirmesi',
      'Düzenli saha ziyaretleri',
      'Teslim öncesi eksik listesi',
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
    includes: [
      'Rölöve ve durum tespiti',
      'Korunacak öğelerin belirlenmesi',
      'Yeni kullanıma uyarlama projesi',
      'Mevcut yapıyla uyumlu ek tasarımı',
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
    includes: [
      'Arsa ve yapı alım öncesi ön değerlendirme',
      'Fizibilite ve kapasite çalışması',
      'Tasarım süreçlerinde ikinci görüş',
    ],
  },
]
