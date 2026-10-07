# Değişiklik Günlüğü

Bu dosyada projedeki önemli değişiklikler listelenir.

## Yayınlanmamış

### Eklendi

- Open Graph ve Twitter kart etiketleri, 1200×630 paylaşım görseli (`public/og-image.png`, şablonu `scripts/og/og-image.html`).
- Projeler, proje detayı ve 404 sayfalarına özgü açıklama meta etiketi; sayfa başlığı ve açıklaması paylaşım etiketlerine de yansır. 404 görünümü `noindex` ekler.
- Sayfa parçası yüklenirken üstte ince ilerleme çubuğu ve `<main aria-busy>`.
- PROJE.md: Lighthouse önce/sonra puanları, ölçüm koşulları, paket boyutları ve açık kalan bulgular.
- İletişim sayfası: iletişim bilgileri, harita yerine stilize konum çizimi ("Konum örnektir"), konsept notu ve dört adımlı teklif formu (Proje, Ayrıntılar, İletişim, Özet); ilerleme göstergesi, alan altında hata mesajları, ilk hatalı alana odak, adım duyuruları, özet ve "Düzenle", başarı ekranı ve "Yeni talep oluştur".
- Teklif formu mantığı (`src/quote/quoteForm.ts`): saf durum, adım doğrulama, ileri/geri, ulaşılmış adıma dönme, gönderim ve özet üretimi; 28 birim testi.
- 81 il listesi (`src/content/provinces.ts`, plaka kodlarıyla) ve testleri.
- `?tur=<kategori-slug>` ön seçimi ve proje detay sayfasında projenin kategorisiyle formu açan "Teklif alın" çağrısı.
- Konum çizimi `scripts/drawings/contact.ts` ile üretilir (`npm run cizimler`).
- Hizmetler sayfası: giriş, numaralı hizmet listesi (ayrıntılı açıklama ve 3–5 maddelik kapsam; her hizmet `/hizmetler#<slug>` çapasıyla), 5 adımlı çalışma süreci (sıralı liste), yerel `<details>` ile 5 sık sorulan soru ve kapanış çağrısı.
- Hakkımızda sayfası: büyük puntolu açılış, ofisin hikâyesi, 4 tasarım ilkesi, baş harfli avatarlarla 4 kişilik kurgusal ekip ve görünür "Kurgusal ekip" notu, iki özgün çizim (atölye ve "dört çatı"), Projeler ve İletişim bağlantıları.
- İçerik verisi: hizmet kapsam maddeleri (`includes`), çalışma süreci (`process.ts`), sık sorulan sorular (`faq.ts`), ekip (`team.ts`), Hakkımızda çizimleri (`aboutImages.ts`); hepsi sabit id ile ve birim testleriyle (SSS cevaplarında kesin süre/fiyat/garanti olmadığı da denetlenir).
- Hakkımızda çizimleri `scripts/drawings/about.ts` ile üretilir (`npm run cizimler`).
- Ana sayfa: büyük tipografili açılış (h1, alt metin, "Projeleri incele" ve "Teklif al", öne çıkan projenin öncelikli yüklenen çizimi), yaklaşım paragrafı ve "Hakkımızda" bağlantısı, öne çıkan 3 proje (biri geniş, ikisi yan yana; mevcut kart bileşeniyle), numaralı hizmet özeti ve kapanış çağrısı.
- Hizmet verisi (`src/content/services.ts`): sabit id ve slug ile 5 hizmet; ad, tek cümlelik özet ve ayrıntılı açıklama; birim testleriyle.
- `getFeaturedProjects` ve `getCategory` yardımcıları; ana sayfa başlığı ve açıklama meta etiketinin `index.html` ile tutarlılığını denetleyen test.
- `ButtonLink` bileşeni ve sayfa açıkken açıklama meta etiketini değiştiren `useMetaDescription` kancası.
- Proje detay sayfası: yol göstergesi (Projeler › Kategori › Proje; kategori bağlantısı filtreli listeyi açar), başlık, özet, öncelikli yüklenen büyük kapak, tanım listesi olarak proje künyesi (alan Türkçe sayı biçimiyle), açıklama ve önceki/sonraki proje geçişi (Tümü sırasına göre, döngüsel).
- Editoryal galeri (biri tam genişlikte, ikisi yan yana) ve tam ekran görüntüleyici: yerel modal `<dialog>`, ok tuşları, önceki/sonraki düğmeleri, dokunmatik kaydırma, Escape ile kapanma, kapanınca odağın açan görsele dönmesi, konum ve çizim türünün ekran okuyucuya duyurulması.
- `formatArea` (Türkçe alan biçimi) ve gerçek veride önceki/sonraki geçişi için birim testleri.
- Proje ve kategori verisi (`src/content/projects.ts`): 3 kategoride 9 kurgusal proje; sabit id, slug, künye, özet, açıklama, kapak ve galeri görselleri.
- Saf sorgu işlevleri (`projectQueries.ts`): kategoriye göre süzme, sıralama, slug ile proje/kategori bulma, kategori sayımı, önceki/sonraki proje; birim testleriyle.
- Proje çizimleri: `scripts/drawings` ile üretilen 36 özgün SVG (aksonometri, cephe, kesit, plan, iç perspektif, detay); `npm run cizimler` komutu.
- Projeler sayfası: giriş metni, sayılı kategori filtresi (adres çubuğunda `?kategori=`), ekran okuyucuya duyurulan sonuç satırı, tamamı tıklanabilir proje kartları ve editoryal ızgara.
- Proje detay yer tutucusu: slug'a karşılık gelen projenin adı ve "Tüm projeler" bağlantısı; olmayan slug 404 görünümüne düşer.
- Proje iskeleti: Vite + React + TypeScript, Tailwind CSS, React Router, Vitest ve ESLint (jsx-a11y dahil).
- Tasarım sistemi: Tailwind temasında renk, tipografi, boşluk ve kapsayıcı belirteçleri; kendi sunucumuzdan yüklenen, Türkçe karakterlere daraltılmış Fraunces ve Inter fontları.
- Tek içerik kaynağı (`src/content/site.ts`) ve TypeScript tipleri: marka, menü, footer, iletişim yer tutucuları, konsept ibaresi, arayüz metinleri.
- Sayfa yönlendirme: Ana sayfa, Hakkımızda, Hizmetler, Projeler, Proje detayı, İletişim ve 404 yer tutucuları; sayfalar ayrı parçalar halinde yüklenir. Sayfa değişiminde en üste kaydırma, sekme başlığı, odak yönetimi ve ekran okuyucu duyurusu.
- Ortak yerleşim: header (etkin sayfa vurgusu, Teklif Al, mobilde tam ekran erişilebilir menü), footer (konsept ibaresi dahil), "İçeriğe geç" bağlantısı.
- `netlify.toml`: SPA yönlendirmesi, `/.well-known/*`, `/ai-catalog.json`, `/assets/*` ve `/favicon.ico` için gerçek 404, önbellek ve güvenlik başlıkları.
- `public/`: `robots.txt`, `llms.txt`, `404.html`, SVG favicon.
- İçerik kaynağı, sekme başlığı ve adres yardımcıları için birim testleri.
- `PROJE.md`: konsept özeti, stack, MVP kapsamı, kapsam dışı maddeler, mimari kararlar, görsel kaynakları tablosu ve yol haritası (yol haritası adım 1).
- `CHANGELOG.md`: değişiklik günlüğü.

### Değişti

- Fontlar `public/fonts/` altında sürümlü adlarla ve satır içi `FontFace` betiğiyle yüklenir (preload kaldırıldı): CLS her genişlikte 0, konsolda uyarı yok. `/fonts/*` için uzun önbellek ve gerçek 404 kuralı.
- Dokunma hedefleri en az 44 px (header logosu ve menü düğmesi, menü, footer, yol göstergesi, metin bağlantıları, iletişim bağlantıları; ana sayfadaki hizmet satırının tamamı tıklanabilir).
- Uzun kelimeler dar ekranda taşmaz (`overflow-wrap: anywhere`, başlıklarda heceleme).
- Çizim üreticisi ardışık aynı stildeki çizgileri birleştirir; çizimler %31 küçüldü (görünüm aynı).
- Kategoriler ayrı modülde (`content/categories.ts`); İletişim sayfası artık proje verisini yüklemez.
- Kullanılmayan dışa aktarımlar dosya içine alındı.
- Son yer tutucu kaldırıldı: `PlaceholderPage` bileşeni ve yer tutucu metni silindi; 404 görünümü kendi bileşeniyle çizilir.
- Proje detay sayfasına teklif çağrısı eklendi.
- Ana sayfadaki hizmet adları Hizmetler sayfasında ilgili hizmetin çapasına bağlanır.
- Sayfa geçişinde adreste çapa varsa odak h1 yerine çapalanan öğeye taşınır (`RouteChangeAnnouncer`).
- Hakkımızda ve Hizmetler sayfalarına özgü sekme başlığı ve açıklama meta etiketi; bu sayfaların yer tutucu metinleri kaldırıldı. Yer tutucu olarak yalnızca İletişim kaldı.
- Ortak metin stilleri `components/ui/styles.ts` içine, çizim boyutu sabitleri `content/drawingSize.ts` içine taşındı.
- Ana sayfa sekme başlığı: "Dörtçatı Mimarlık — Mimarlık ve iç mimarlık | Konsept çalışma" (`index.html` ile aynı). Ana sayfa yer tutucu metni içerik kaynağından kaldırıldı.
- `ProjectCard` başlık düzeyini parametre olarak alır (Projeler'de h2, ana sayfada h3); `PageHeading` büyük "display" ölçeğini destekler.
- Projeler ve proje detay sayfaları kategori adını ortak `getCategory` ile bulur.
- Modal `<dialog>` eşitleme ve kaydırma kilidi `useModalDialog` kancasına taşındı; mobil menü ve görsel görüntüleyici bunu ortak kullanır.
- Yer tutucu sayfalar başlığı doğrudan alır; 404 görünümü `NotFoundView` bileşenine taşındı.
- İçerik tiplerinden kullanılmayan "Proje detayı" sayfa başlığı kaldırıldı (başlık artık proje adından gelir).
- ESLint ve `tsconfig.node.json` `scripts/` klasörünü de kapsıyor.
- `README.md`: konsept notu, kurulum, çalıştırma ve test komutları.
- `PROJE.md`: tasarım sistemi (fontlar, renk kodları, kontrast oranları), adres yapısı, klasör düzeni ve yayın ayrıntıları eklendi.
