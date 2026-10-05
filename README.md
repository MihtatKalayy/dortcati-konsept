# Dörtçatı Mimarlık — Konsept Kurumsal Site

> **Bu site bir konsept çalışmadır; gerçek bir firmayı temsil etmez.**
> Dörtçatı Mimarlık kurgusal bir mimarlık ve iç mimarlık ofisidir. Firma, proje, kişi ve iletişim bilgilerinin tamamı kurgusaldır.

Çok sayfalı, proje galerili ve teklif formlu bir kurumsal sitenin portföy amaçlı örneğidir. Kapsam, mimari kararlar ve tasarım sistemi için [PROJE.md](./PROJE.md), değişiklikler için [CHANGELOG.md](./CHANGELOG.md) dosyasına bakın.

## Stack

React · TypeScript · Vite · Tailwind CSS · React Router · Vitest · ESLint — yayın: Netlify (backend yok).

## Gereksinimler

- Node.js 22.22 veya üzeri
- npm

## Kurulum

```bash
npm ci
```

## Komutlar

| Komut | Açıklama |
| --- | --- |
| `npm run dev` | Geliştirme sunucusu (http://localhost:5173) |
| `npm run build` | Tip kontrolü + üretim derlemesi (`dist/`) |
| `npm run preview` | Üretim derlemesini yerelde önizleme |
| `npm run typecheck` | TypeScript tip kontrolü |
| `npm run lint` | ESLint |
| `npm test` | Vitest testleri |
| `npm run cizimler` | Proje çizimlerini (`src/assets/projects`) yeniden üretir |

## Yayın

Netlify ayarları `netlify.toml` dosyasındadır: build komutu `npm run build`, yayın dizini `dist`.
