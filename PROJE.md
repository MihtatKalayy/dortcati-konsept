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
  Bu kurallar SPA yönlendirmesinden önce gelir ve şu adresleri kapsar: `/.well-known/*`, `/ai-catalog.json`, `/assets/*` (eski yayından kalmış derleme dosyaları) ve `/favicon.ico`. Adreste gerçekten bir dosya varsa o dosya sunulur.
- Önbellek: `/assets/*` (içerik özetli adlar) bir yıl ve `immutable`; `/` ve `/index.html` için `no-cache`.
- Güvenlik başlıkları: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`.
- Node sürümü: `22` (Vite 8 en az 22.12, React Router 8 en az 22.22 ister).
- Geçerli bir `llms.txt` dosyası yayınlanır.

### Kalite hedefleri

- Lighthouse **mobil** profilde **Performance, Accessibility, Best Practices ve SEO** için **90 ve üzeri**.
- Lighthouse **Agentic Browsing** denetimlerinde **hata olmaması**.

## Tasarım sistemi

Tüm belirteçler tek yerde, `src/styles/index.css` içindeki Tailwind `@theme` bloğunda tanımlıdır. Tailwind'in varsayılan renk ve font paleti kapatılmıştır; yalnızca aşağıdaki belirteçler kullanılabilir.

### Fontlar

| Rol | Font | Lisans | Kaynak |
| --- | --- | --- | --- |
| Başlıklar (`font-display`) | Fraunces (değişken, ağırlık 300–700) | SIL Open Font License 1.1 | [google/fonts](https://github.com/google/fonts/tree/main/ofl/fraunces) |
| Gövde metni (`font-sans`) | Inter (değişken, ağırlık 400–700) | SIL Open Font License 1.1 | [google/fonts](https://github.com/google/fonts/tree/main/ofl/inter) |

- Fontlar kendi sunucumuzdan yüklenir (`src/assets/fonts/`); harici font servisi kullanılmaz.
- Dosyalar fontTools ile Latin + Türkçe karakterlere (ç, ğ, ı, İ, ö, ş, ü, â, î, û, ₺ ve tipografik işaretler) daraltılmış tek birer woff2 alt kümesidir: Inter ≈ 27 KB, Fraunces ≈ 34 KB. Fraunces'in `opsz` ekseni 72'ye, `SOFT` ve `WONK` eksenleri 0'a sabitlenmiştir.
- `font-display: swap` kullanılır; iki dosya `index.html`'de önceden yüklenir (preload). Derlemede dosya adları içerik özetli (hash) olur.
- Lisans metinleri: `src/assets/fonts/Fraunces-OFL.txt`, `src/assets/fonts/Inter-OFL.txt`. Lisanslarda ayrılmış font adı (Reserved Font Name) tanımlı değildir.

### Renkler

| Belirteç | Kod | Kullanım |
| --- | --- | --- |
| `ink` | `#141414` | Siyaha yakın ana metin, footer zemini |
| `white` | `#FFFFFF` | Beyaz zemin, koyu zeminde metin |
| `paper` | `#F6F4EF` | Kırık beyaz sayfa zemini |
| `gray-100` | `#E6E5E1` | Zemin tonu |
| `gray-200` | `#D4D3CF` | Ayırıcı çizgiler |
| `gray-300` | `#B5B4B0` | Koyu zeminde ikincil metin |
| `gray-400` | `#8F8E8A` | Koyu zeminde küçük/ikincil metin |
| `gray-500` | `#6E6D69` | Açık zeminde en açık izinli metin tonu |
| `gray-600` | `#55544F` | Açık zeminde ikincil metin |
| `gray-700` | `#3D3C39` | Koyu zeminde ayırıcı çizgi |
| `gray-800` | `#292826` | Koyu ton |
| `accent` | `#B23A1D` | Tek vurgu rengi (kiremit): bağlantılar, önemli çağrılar, odak çerçevesi, etkin menü çizgisi |
| `accent-strong` | `#8F2E17` | Vurgu renginin üzerine gelme (hover) hâli |

Kurallar: açık zeminde (white, paper) metin için en açık `gray-500`; koyu zeminde (ink) metin için en koyu `gray-400`. Vurgu rengi koyu zeminde **metin olarak kullanılmaz** (3,08:1); orada yalnızca dekoratif çizgi ve odak çerçevesi olarak yer alır.

### Kontrast oranları (WCAG 2.x)

| Metin / zemin | Oran | AA (normal metin ≥ 4,5) |
| --- | --- | --- |
| ink / paper | 16,76:1 | Geçer |
| ink / white | 18,42:1 | Geçer |
| gray-600 / paper | 6,90:1 | Geçer |
| gray-500 / paper | 4,71:1 | Geçer |
| gray-500 / white | 5,18:1 | Geçer |
| accent / paper | 5,43:1 | Geçer |
| accent / white | 5,97:1 | Geçer |
| accent-strong / paper | 7,43:1 | Geçer |
| white / accent (buton) | 5,97:1 | Geçer |
| white / accent-strong (buton hover) | 8,17:1 | Geçer |
| white / ink | 18,42:1 | Geçer |
| gray-300 / ink | 8,88:1 | Geçer |
| gray-400 / ink | 5,62:1 | Geçer |
| accent / ink (yalnızca odak çerçevesi, metin değil) | 3,08:1 | Metin için kullanılmaz; UI bileşeni eşiği (≥ 3) geçer |

### Tipografi ölçeği

Başlıklar ekran genişliğine göre `clamp()` ile akıcı ölçeklenir:

| Belirteç | Boyut | Satır yüksekliği |
| --- | --- | --- |
| `text-display` | `clamp(2.75rem, 1.6rem + 5.5vw, 6.5rem)` | 1 |
| `text-h1` | `clamp(2.25rem, 1.5rem + 3.75vw, 4.5rem)` | 1,05 |
| `text-h2` | `clamp(1.75rem, 1.3rem + 2.25vw, 3rem)` | 1,1 |
| `text-h3` | `clamp(1.25rem, 1.1rem + 0.75vw, 1.75rem)` | 1,25 |
| `text-lead` | `clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)` | 1,55 |
| Gövde | `1.0625rem` (17 px) | 1,6 |

### Boşluk ve ızgara

- Temel boşluk ölçeği Tailwind'in 0,25 rem adımlarıdır.
- `gutter`: `clamp(1rem, 0.5rem + 2.5vw, 3rem)` — sayfa kenar boşluğu (360 px'te 16 px).
- `section`: `clamp(4rem, 2.5rem + 6vw, 9rem)` — bölümler arası dikey boşluk (`py-section`).
- `container-page` yardımcı sınıfı: en fazla `90rem` genişlik, ortalanmış, iki yanda `gutter` boşluğu.
- `container-prose`: okunabilir metin genişliği `42rem`.

## Adres yapısı

| Sayfa | Adres |
| --- | --- |
| Ana sayfa | `/` |
| Hakkımızda | `/hakkimizda` |
| Hizmetler | `/hizmetler`; her hizmetin çapası `#<hizmet-slug>` (ör. `/hizmetler#renovasyon`) |
| Projeler | `/projeler`; kategori filtresi `?kategori=<kategori-slug>` (ör. `/projeler?kategori=ic-mekan`). Geçersiz veya eksik değer "Tümü" gösterir. |
| Proje detayı | `/projeler/<proje-slug>` (ör. `/projeler/zeytinlik-evi`); olmayan slug 404 görünümü gösterir. |
| İletişim (teklif formu) | `/iletisim`; isteğe bağlı `?tur=<kategori-slug>` proje türünü önceden seçer (ör. `/iletisim?tur=konut`), geçersiz değer yok sayılır |
| 404 | Eşleşmeyen tüm adresler |

Adresler `src/routes/paths.ts` içinde tek yerde tanımlıdır. Sabit dosyalar: `/llms.txt`, `/robots.txt`, `/favicon.svg`, `/404.html` (Netlify'ın gerçek 404 yanıtlarının gövdesi).

## Klasör düzeni

```
.
├── index.html               # Dil, başlık, açıklama, tema rengi, favicon, font preload
├── netlify.toml             # Build, yönlendirme, 404 kuralları, başlıklar
├── scripts/drawings/        # Proje, Hakkımızda ve konum çizimlerini üreten betik (npm run cizimler)
├── public/                  # Olduğu gibi kopyalanan dosyalar
│   ├── 404.html
│   ├── favicon.svg
│   ├── llms.txt
│   └── robots.txt
└── src/
    ├── main.tsx             # Giriş noktası
    ├── assets/fonts/        # Alt kümelenmiş woff2 fontlar ve OFL lisansları
    ├── assets/projects/     # Üretilmiş SVG çizimler: <proje-id>/{kapak,galeri-1,galeri-2,galeri-3}.svg
    ├── assets/about/        # Hakkımızda çizimleri: atolye.svg, dort-cati.svg
    ├── assets/contact/      # Stilize konum çizimi: konum.svg
    ├── components/
    │   ├── layout/          # Layout, Header, MobileMenu, Footer, SkipLink, RouteChangeAnnouncer
    │   ├── about/           # TeamMemberCard
    │   ├── contact/         # ContactInfo
    │   ├── quote/           # QuoteForm, QuoteProgress, QuoteSummary, QuoteSuccess, fields (alan bileşenleri)
    │   ├── services/        # FaqList
    │   ├── projects/        # ProjectFilter, ProjectCard, Breadcrumb, ProjectFacts, ProjectGallery,
    │                        # ImageButton, ImageViewer (tam ekran), AdjacentProjects
    │   └── ui/              # styles.ts, PageHeading, ButtonLink, NotFoundView, TextLink, PageLoading, LogoMark
    ├── content/             # Tek içerik kaynağı: site.ts (metinler), projects.ts (proje ve kategori verisi),
    │                        # services.ts, process.ts, faq.ts, team.ts, provinces.ts (81 il),
    │                        # aboutImages.ts, contactImages.ts, drawingSize.ts,
    │                        # projectQueries.ts (saf sorgu işlevleri), format.ts, types.ts ve testler
    ├── hooks/               # useDocumentTitle, useMetaDescription, useModalDialog
    ├── pages/               # Her sayfa ayrı parça olarak yüklenir
    ├── quote/               # Teklif formunun saf durum/doğrulama işlevleri (quoteForm.ts), hata mesajları ve testleri
    ├── routes/              # Adresler (paths.ts) ve yönlendirici (router.tsx)
    └── styles/index.css     # Tailwind teması: tasarım belirteçleri, @font-face
```

## Proje verisi

`src/content/projects.ts` 3 kategori ve 9 kurgusal proje içerir. Her projenin sabit bir `id`'si (`prj-001` …) ve adres için ayrı bir `slug`'ı vardır; kategori bağlantısı `categoryId` ile kurulur. Sıralama: önce öne çıkanlar, sonra tamamlanma tarihine (`completedAt`, YYYY-AA) göre yeniden eskiye. Önceki/sonraki proje bu sıraya göre ve döngüsel olarak (ilkin öncesi son proje) bulunur.

| Proje | Kategori | Yıl | Alan | Öne çıkan |
| --- | --- | --- | --- | --- |
| Zeytinlik Evi | Konut | 2023 | 240 m² | Evet |
| Avlulu Sıra Evler | Konut | 2022 | 1.180 m² | |
| Yamaç Evi | Konut | 2024 | 310 m² | |
| Liman Ofisleri | Ticari | 2021 | 2.400 m² | Evet |
| Çarşı Pasajı | Ticari | 2023 | 860 m² | |
| Bağ Tadım Salonu | Ticari | 2024 | 520 m² | |
| Kitap Kafe | İç Mekân | 2022 | 140 m² | Evet |
| Küçük Daire | İç Mekân | 2023 | 68 m² | |
| Sakin Klinik | İç Mekân | 2024 | 210 m² | |

## Hizmet verisi

`src/content/services.ts` 5 hizmet içerir; her birinin sabit `id`'si (`svc-001` …), `slug`'ı, adı, tek cümlelik özeti ve ayrıntılı açıklaması vardır. Her hizmette 3–5 maddelik kapsam listesi (`includes`) de vardır. Ana sayfa yalnızca ad ve özeti kullanır ve her adı `/hizmetler#<slug>` çapasına bağlar; Hizmetler sayfası tamamını kullanır.

| id | Hizmet |
| --- | --- |
| `svc-001` | Mimari tasarım |
| `svc-002` | İç mimarlık |
| `svc-003` | Uygulama ve şantiye yönetimi |
| `svc-004` | Renovasyon ve yeniden kullanım |
| `svc-005` | Danışmanlık |

## Hizmetler ve Hakkımızda sayfaları

- **Çalışma süreci** (`process.ts`, sıralı liste): `prc-001` Tanışma ve ihtiyaç analizi, `prc-002` Konsept tasarım, `prc-003` Projelendirme, `prc-004` Uygulama, `prc-005` Teslim.
- **Sık sorulan sorular** (`faq.ts`): 5 soru; yerel `<details>`/`<summary>` ile açılır-kapanır (fare, dokunma, Enter/Boşluk; durum tarayıcı tarafından bildirilir). Cevaplar geneldir; kesin süre, fiyat veya garanti içermez (testle denetlenir).
- **Çapalar:** Hizmetler `/hizmetler#<slug>` ile açılır; sayfa geçişinde odak çapalanan hizmete taşınır. Header sabit (sticky) olmadığından başlık header'ın altında kalmaz; ek olarak `scroll-margin-top` verilmiştir.
- **Ekip** (`team.ts`, kurgusaldır): `ekp-001` Deniz Aksoy — Kurucu mimar; `ekp-002` Selin Karaca — İç mimar; `ekp-003` Kerem Ilgaz — Proje ve şantiye sorumlusu; `ekp-004` Ece Tunalı — Mimar. Fotoğraf yerine baş harfli soyut avatar; bölümde görünür "Kurgusal ekip" notu.
- **Tasarım ilkeleri:** Bağlama saygı, Yalınlık, Doğal ışık, Uzun ömürlü malzeme.
- Her iki sayfanın sekme başlığı ve açıklama meta etiketi kendine özgüdür.

## İletişim ve teklif formu

- **Yerleşim:** başlık ve giriş; geniş ekranda solda form, sağda iletişim bilgileri; mobilde önce form, sonra bilgiler. Harita gömülmez; yerine stilize konum çizimi ve "Konum örnektir." ibaresi.
- **Adımlar:** (1) Proje: proje türü (kategori verisinden id ile + "Diğer"), hizmetler (hizmet verisinden id ile, en az bir). (2) Ayrıntılar: yaklaşık alan (isteğe bağlı, 5–100.000 m² arası tam sayı), il (`provinces.ts`, 81 il, plaka koduyla), bütçe aralığı (genel aralıklar + "Belirtmek istemiyorum"), zamanlama, açıklama (isteğe bağlı, en fazla 1000 karakter, sayaçlı). (3) İletişim: ad soyad, telefon (Türkiye biçimleri; boşluk, tire, nokta, parantez ve +90/0090/0 önekleri toleranslı), e-posta, tercih edilen iletişim yolu, "örnek metin" olarak işaretli bilgilendirme onayı. (4) Özet: id'ler adlarıyla, her bölümde "Düzenle".
- **Durum:** `src/quote/quoteForm.ts` içinde saf işlevler. Değiştirme `quoteReducer` (update, next, back, goTo, submit, reset), okuma seçicilerle (`currentStepId`, `canGoToStep`, `firstInvalidField`, `buildSummary`). "İleri" yalnızca adım geçerliyse ilerler; "Geri" doğrulamasız döner; ilerleme göstergesinden yalnızca ulaşılmış adımlara gidilir ve ileri atlarken aradaki adımlar yeniden doğrulanır; gönderim tüm adımları yeniden doğrular ve gönderilmiş forma yapılan her eylem yok sayılır (çift tıklama tek işlenir).
- **Erişilebilirlik:** seçim grupları `fieldset`/`legend`; her alanın görünür etiketi; hatalar alanın altında ve `aria-describedby` ile bağlı, `aria-invalid`; hatalı denemede odak ilk hatalı alana; adım değişince forma kaydırılır, odak adım başlığına taşınır ve adım duyurulur; başarı ekranı duyurulur ve odak başlığına taşınır. Enter: 1–3. adımlarda "İleri" gibi doğrular, yalnızca özet adımında gönderim yapar; çok satırlı açıklamada yeni satır ekler.
- **Gizlilik:** form verisi yalnızca bellekte (`useReducer`) tutulur; ağ isteği, tarayıcı depolaması, çerez, adres çubuğu veya log yoktur. Adresten yalnızca `?tur=` kategori slug'ı okunur. Sayfa yenilenince veya terk edilince girilen bilgiler kaybolur (bilinçli tercih).

## Ana sayfa

- Bölümler: açılış (h1 = marka sloganı, alt metin, iki çağrı, öne çıkan ilk projenin cephe çizimi) → yaklaşım → öne çıkan projeler → hizmetler → kapanış çağrısı.
- Öne çıkan projeler `getFeaturedProjects(projects, 3)` ile, Projeler sayfasıyla aynı sırada seçilir. Kartlar kapak çizimini gösterdiği için açılış görseli aynı projenin galerisinden (cephe) gelir.
- Başlık ve açıklama meta etiketi içerik kaynağındadır ve `index.html` ile aynı tutulur (test). Diğer sayfalar açıklamayı değiştirmez; ana sayfadan ayrılınca önceki değer geri yüklenir.
- Hareket yalnızca üzerine gelme geçişleridir; hareketi azaltma tercihinde kapanır. Slider, otomatik video, istatistik, ödül, logo veya müşteri yorumu yoktur.

## Proje detay sayfası

- Sıra: yol göstergesi → başlık ve özet → kapak → künye (geniş ekranda açıklamanın solunda, mobilde üstünde) → açıklama (en fazla `42rem` satır genişliği) → galeri → önceki/sonraki proje.
- Künye bir tanım listesidir (`dl`/`dt`/`dd`); alan `Intl.NumberFormat('tr-TR')` ile biçimlenir (ör. `1.180 m²`).
- Görüntüleyici yerel modal `<dialog>` kullanır; harici galeri kütüphanesi yoktur. Görsel sırası: kapak, ardından galeri. Ok tuşları ve dokunmatik kaydırma döngüseldir.
- Önceki/sonraki proje, Projeler sayfasındaki "Tümü" sırasına göre ve döngüsel olarak belirlenir; eşleştirme id ile yapılır.

## Görsel kaynakları ve lisanslar

Bu çalışmada **fotoğraf kullanılmaz**. Tüm proje görselleri bu repo için özgün olarak üretilmiş çizimlerdir; gerçek bir yapıyı tasvir etmez ve üçüncü taraf kaynak içermez.

| Dosyalar | Kullanıldığı yer | Kaynak | Yazar | Lisans |
| --- | --- | --- | --- | --- |
| `src/assets/projects/prj-001` … `prj-006` / `kapak.svg` (aksonometri), `galeri-1.svg` (cephe), `galeri-2.svg` (kesit), `galeri-3.svg` (plan) | Proje kartları ve proje detayı | `scripts/drawings` betiğiyle kütle modellerinden üretildi | Dörtçatı konsept çalışması (özgün) | Repo ile aynı koşullar; üçüncü taraf hakkı yok |
| `src/assets/projects/prj-007` … `prj-009` / `kapak.svg` (iç perspektif), `galeri-1.svg` (plan), `galeri-2.svg` (iç cephe / kesit), `galeri-3.svg` (detay aksonometrisi) | Proje kartları ve proje detayı | `scripts/drawings` betiğiyle üretildi | Dörtçatı konsept çalışması (özgün) | Repo ile aynı koşullar; üçüncü taraf hakkı yok |
| `src/assets/about/atolye.svg` (atölye perspektifi), `dort-cati.svg` (ortak bahçeli dört ev aksonometrisi) | Hakkımızda sayfası | `scripts/drawings/about.ts` ile üretildi | Dörtçatı konsept çalışması (özgün) | Repo ile aynı koşullar; üçüncü taraf hakkı yok |
| `src/assets/contact/konum.svg` (stilize sokak dokusu ve işaret; gerçek harita değildir) | İletişim sayfası | `scripts/drawings/contact.ts` ile üretildi | Dörtçatı konsept çalışması (özgün) | Repo ile aynı koşullar; üçüncü taraf hakkı yok |
| `src/assets/fonts/*.woff2` | Tüm site | Google Fonts deposu (Fraunces, Inter) | Fraunces ve Inter proje yazarları | SIL OFL 1.1 |

Çizim kuralları:

- Tek tarz: beyaz zemin, siyaha yakın çizgi, nötr gri yüzeyler ve her çizimde yalnızca bir vurgu öğesi (giriş kapısı, kesit hattı, ışık yönü).
- Boyut: tüm çizimler 1200 × 800 (3:2); `<img>` etiketinde `width`/`height` verilir, böylece yüklenirken düzen kaymaz.
- Optimizasyon: koordinatlar tek ondalığa yuvarlanır, çizim başına ≈ 1–21 KB SVG. Derlemede ayrı dosya olarak (satır içine gömülmeden, `?no-inline`) ve içerik özetli adla yayınlanır.
- Yükleme: Projeler sayfasındaki ilk kart görseli ve proje detayındaki kapak öncelikli (`eager`, `fetchpriority="high"`), diğerleri tembel (`loading="lazy"`) yüklenir.
- Yeniden üretmek için: `npm run cizimler`. Her görselin alt metni `projects.ts` içindedir.

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
