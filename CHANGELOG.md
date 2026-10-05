# Değişiklik Günlüğü

Bu dosyada projedeki önemli değişiklikler listelenir.

## Yayınlanmamış

### Eklendi

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

- Ana sayfa sekme başlığı: "Dörtçatı Mimarlık — Mimarlık ve iç mimarlık | Konsept çalışma" (`index.html` ile aynı). Ana sayfa yer tutucu metni içerik kaynağından kaldırıldı.
- `ProjectCard` başlık düzeyini parametre olarak alır (Projeler'de h2, ana sayfada h3); `PageHeading` büyük "display" ölçeğini destekler.
- Projeler ve proje detay sayfaları kategori adını ortak `getCategory` ile bulur.
- Modal `<dialog>` eşitleme ve kaydırma kilidi `useModalDialog` kancasına taşındı; mobil menü ve görsel görüntüleyici bunu ortak kullanır.
- Yer tutucu sayfalar başlığı doğrudan alır; 404 görünümü `NotFoundView` bileşenine taşındı.
- İçerik tiplerinden kullanılmayan "Proje detayı" sayfa başlığı kaldırıldı (başlık artık proje adından gelir).
- ESLint ve `tsconfig.node.json` `scripts/` klasörünü de kapsıyor.
- `README.md`: konsept notu, kurulum, çalıştırma ve test komutları.
- `PROJE.md`: tasarım sistemi (fontlar, renk kodları, kontrast oranları), adres yapısı, klasör düzeni ve yayın ayrıntıları eklendi.
