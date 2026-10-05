# Değişiklik Günlüğü

Bu dosyada projedeki önemli değişiklikler listelenir.

## Yayınlanmamış

### Eklendi

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

- `README.md`: konsept notu, kurulum, çalıştırma ve test komutları.
- `PROJE.md`: tasarım sistemi (fontlar, renk kodları, kontrast oranları), adres yapısı, klasör düzeni ve yayın ayrıntıları eklendi.
