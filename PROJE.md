# Dörtçatı Mimarlık — Konsept Kurumsal Web Sitesi

## Özet

Bu repo, **Dörtçatı Mimarlık** adında **kurgusal** bir mimarlık ve iç mimarlık ofisi için hazırlanan kurumsal web sitesinin kaynak kodunu barındırır.

> **Bu site bir konsept çalışmadır; gerçek bir firmayı temsil etmez.** Gerçek bir müşteri, gerçek bir firma veya gerçek bir proje yoktur. Sitedeki tüm firma, proje, kişi ve iletişim bilgileri kurgusaldır.

Çalışmanın amacı, portföyü inceleyen potansiyel müşterilere çok sayfalı, proje galerili ve teklif formlu bir kurumsal sitenin uçtan uca nasıl tasarlanıp geliştirilebileceğini göstermektir.

## Stack

| Alan | Seçim |
| --- | --- |
| Arayüz kütüphanesi | React |
| Dil | TypeScript |
| Derleme aracı | Vite |
| Stil | Tailwind CSS |
| Sayfa yönlendirme | React Router |
| Test | Vitest |
| Yayın (deploy) | Netlify |
| Backend | Yok |

## MVP kapsamı

### Sayfalar

- Ana sayfa
- Hakkımızda
- Hizmetler
- Projeler
- Proje detayı
- İletişim (teklif formu dahil)
- 404

### İçerik

- **3 kategoride toplam 9 kurgusal proje.** Kategoriler: **Konut**, **Ticari**, **İç Mekân**.

### Sayfa ayrıntıları

- **Projeler**
  - Kategori filtresi.
  - Proje kartları.
- **Proje detayı**
  - Görsel galerisi; tam ekran görüntüleme dahil.
  - Proje künyesi: yıl, konum, alan, kapsam.
  - Açıklama.
  - Önceki / sonraki proje geçişi.
- **Hizmetler**
  - 4–6 hizmet.
  - Çalışma süreci adımları.
- **Hakkımızda**
  - Ofisin hikâyesi.
  - Yaklaşımı.
  - Kurgusal ekip.
- **İletişim**
  - İletişim bilgileri.
  - Çok adımlı teklif formu:
    1. Proje türü
    2. Kapsam
    3. Yaklaşık alan
    4. Bütçe aralığı
    5. Zamanlama
    6. İletişim bilgileri
    7. Özet ve gönderim

## Kapsam dışı

- Backend / veritabanı
- Yönetim paneli
- Blog
- Çoklu dil
- Üyelik
- Gerçek harita gömme
- Canlı sohbet

## Mimari kararlar

### İçerik kaynağı ve kimlikler

- Proje, kategori, hizmet ve ekip verisi **tek bir içerik kaynağında** tutulur.
- Her kaydın **sabit bir `id`'si** ve adreste kullanılmak üzere **ayrı bir `slug`'ı** vardır.
- Kayıtlar arası eşleştirme (ör. projenin kategorisi, önceki/sonraki proje) **her zaman `id` ile** yapılır; slug yalnızca adres içindir ve değişebilir.

### Site metinleri

- Site metinleri bileşenlere gömülmez; **içerik kaynağından okunur**.

### Filtre durumu

- Projeler sayfasındaki filtre durumu **adres çubuğunda** (sorgu parametresi) tutulur.
- Bağlantı paylaşıldığında aynı filtrelenmiş görünüm açılır.

### Teklif formu ve kişisel veri

- Form **yalnızca ön yüzde doğrulama** yapar; **hiçbir yere veri göndermez**.
- Kişisel veri **tarayıcı depolamasına (localStorage, sessionStorage, IndexedDB, çerez), adrese veya loga yazılmaz**.
- Adımlar arası durum **yalnızca bellekte** tutulur; sayfa yenilenince veya terk edilince kaybolur.
- Doğrulama kuralları **saf işlevler** olarak yazılır ve **Vitest ile test edilir**.

### Kurgusal içerik ilkeleri

- Firma adı, proje adları, konumlar, ekip üyeleri ve iletişim bilgileri **kurgusaldır**.
- Gerçek firma, kişi, kurum, ödül veya müşteri adı **kullanılmaz**.
- Uydurma istatistik, referans logosu, ödül veya müşteri yorumu **gösterilmez**.

### Görseller

- Gerçek ve tanınabilir yapıların fotoğrafları kurgusal firmanın işi gibi **sunulmaz**.
- Proje görselleri şu iki kaynaktan birinden gelir:
  - özgün illüstrasyon / çizim tarzı görseller, veya
  - belirli bir yapıyı tanıtmayan, **ticari kullanıma uygun ücretsiz lisanslı** genel mekân görselleri.
- Ekip için **gerçek insan fotoğrafı kullanılmaz** (illüstrasyon, baş harf rozeti vb. tercih edilir).
- Kullanılan her görselin kaynağı ve lisansı aşağıdaki **Görsel kaynakları ve lisanslar** bölümünde listelenir.

### Konsept ibaresi

- **Footer'da** ve teklif formunun **gönderim ekranında** şu ibare yer alır:
  > Bu site bir konsept çalışmadır; gerçek bir firmayı temsil etmez.

### Tasarım yönü

- Renk: siyah, beyaz ve **tek bir vurgu rengi**.
- Büyük tipografi, bol boşluk; sade ve editoryal bir görünüm.
- **Mobil öncelikli** tasarım.

### Yayın ayarları (Netlify)

Yayın ayarları `netlify.toml` ile repoda tutulur:

- Tek sayfa uygulaması (SPA) yönlendirmesi: bilinmeyen sayfa adresleri `index.html`'e yönlendirilir.
- Var olmayan statik dosya adresleri (ör. `/.well-known/` altı) HTML yerine **gerçek 404** döner.
- Geçerli bir `llms.txt` dosyası yayınlanır.

### Kalite hedefleri

- Lighthouse **mobil** profilde **Performance, Accessibility, Best Practices ve SEO** için **90 ve üzeri**.
- Lighthouse **Agentic Browsing** denetimlerinde **hata olmaması**.

## Görsel kaynakları ve lisanslar

Henüz görsel eklenmedi. Görsel eklendikçe her biri aşağıdaki tabloya işlenir.

| Dosya | Kullanıldığı yer | Kaynak | Yazar | Lisans |
| --- | --- | --- | --- | --- |
| — | — | — | — | — |

## Yol haritası

1. Dokümanlar (`PROJE.md`, `CHANGELOG.md`)
2. İskelet, tasarım sistemi, sayfa yönlendirme, Netlify ayarı
3. Proje verisi ve Projeler sayfası
4. Proje detayı ve galeri
5. Ana sayfa
6. Hakkımızda ve Hizmetler
7. İletişim ve teklif formu
8. Cila, denetim, SEO, performans
9. Yayın
