import type { SiteContent } from './types'

/**
 * Sitenin tek içerik kaynağı. Bileşenler metinleri buradan okur.
 * Firma, iletişim bilgileri ve tüm içerik kurgusaldır.
 */
export const site: SiteContent = {
  brand: {
    name: 'Dörtçatı Mimarlık',
    tagline: 'Yaşanacak mekânlar, sade çizgiler.',
    description:
      'Konut, ticari ve iç mekân projeleri üreten kurgusal bir mimarlık ve iç mimarlık ofisi.',
  },

  conceptNotice: 'Bu site bir konsept çalışmadır; gerçek bir firmayı temsil etmez.',

  nav: [
    { id: 'nav-projeler', label: 'Projeler', page: 'projects' },
    { id: 'nav-hizmetler', label: 'Hizmetler', page: 'services' },
    { id: 'nav-hakkimizda', label: 'Hakkımızda', page: 'about' },
    { id: 'nav-iletisim', label: 'İletişim', page: 'contact' },
  ],

  primaryCta: { label: 'Teklif Al', page: 'contact' },

  contact: {
    email: 'merhaba@dortcati.example',
    phone: '+90 000 000 00 00',
    phoneHref: '+900000000000',
    addressLines: ['Kurgu Sokak No: 4', 'Örnek Mahallesi, İstanbul'],
    hours: 'Hafta içi 09.00–18.00',
    placeholderNote: 'İletişim bilgileri yer tutucudur.',
  },

  pages: {
    about: { heading: 'Hakkımızda', documentTitle: 'Hakkımızda' },
    services: { heading: 'Hizmetler', documentTitle: 'Hizmetler' },
    projects: { heading: 'Projeler' },
    contact: { heading: 'İletişim', documentTitle: 'İletişim' },
    notFound: { heading: 'Sayfa bulunamadı', documentTitle: 'Sayfa bulunamadı' },
  },

  home: {
    documentTitle: 'Dörtçatı Mimarlık — Mimarlık ve iç mimarlık | Konsept çalışma',
    metaDescription:
      'Dörtçatı Mimarlık; konut, ticari ve iç mekân projeleri üreten kurgusal bir mimarlık ofisinin kurumsal sitesi. Bu site bir konsept çalışmadır, gerçek bir firmayı temsil etmez.',
    hero: {
      lead: 'Konut, ticari ve iç mekân projelerini ilk çizgiden şantiyenin son gününe kadar tek bir ekiple yürütüyoruz.',
      primaryCta: 'Projeleri incele',
      secondaryCta: 'Teklif al',
      imageCaption: (projectName, drawing) => `${projectName} — ${drawing}`,
    },
    intro: {
      heading: 'Yaklaşım',
      body: 'Her projeye arsayı, iklimi ve orada yaşayacak insanları dinleyerek başlıyoruz. Az sayıda malzeme, açık bir plan ve doğru yerleştirilmiş pencerelerle uzun yıllar rahatça kullanılacak mekânlar tasarlıyoruz.',
      link: 'Hakkımızda',
    },
    featured: { heading: 'Öne çıkan projeler', link: 'Tüm projeler' },
    services: { heading: 'Hizmetler', link: 'Hizmetleri gör' },
    closing: { heading: 'Aklınızdaki mekânı birlikte konuşalım.', cta: 'İletişime geçin' },
  },

  notFoundBody: 'Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.',

  footer: {
    navHeading: 'Sayfalar',
    contactHeading: 'İletişim',
    copyright: (year) => `© ${year} Dörtçatı Mimarlık — kurgusal bir ofis.`,
  },

  error: {
    heading: 'Bir şeyler ters gitti',
    body: 'Sayfa yüklenemedi. Bağlantınızı kontrol edip sayfayı yenilemeyi deneyin.',
    reload: 'Sayfayı yenile',
  },

  projectsPage: {
    intro:
      'Konut, ticari ve iç mekân ölçeğinde dokuz kurgusal proje. Görseller her proje için özgün olarak hazırlanmış mimari çizimlerdir.',
    filterLabel: 'Proje kategorileri',
    allLabel: 'Tümü',
    countUnit: 'proje',
    resultStatus: (count, categoryName) =>
      categoryName ? `${categoryName} kategorisinde ${count} proje` : `Tüm kategorilerde ${count} proje`,
    emptyResult: 'Bu kategoride henüz proje yok.',
    documentTitle: (categoryName) => (categoryName ? `${categoryName} projeleri` : 'Projeler'),
    meta: { category: 'Kategori', year: 'Yıl', location: 'Konum' },
  },

  projectDetail: {
    backToProjects: 'Tüm projeler',
    breadcrumbLabel: 'Konum yolu',
    factsHeading: 'Künye',
    facts: { category: 'Kategori', year: 'Yıl', location: 'Konum', area: 'Alan', scope: 'Kapsam' },
    descriptionHeading: 'Proje hakkında',
    galleryHeading: 'Çizimler',
    openImageHint: '(tam ekran aç)',
    viewer: {
      label: (projectName) => `${projectName} çizimleri`,
      close: 'Kapat',
      previous: 'Önceki görsel',
      next: 'Sonraki görsel',
      position: (current, total, caption) => `${current} / ${total} — ${caption}`,
    },
    adjacent: { label: 'Diğer projeler', previous: 'Önceki proje', next: 'Sonraki proje' },
  },

  ui: {
    skipToContent: 'İçeriğe geç',
    primaryNavLabel: 'Ana menü',
    footerNavLabel: 'Alt menü',
    homeLinkLabel: 'Dörtçatı Mimarlık, ana sayfa',
    menuOpen: 'Menü',
    menuClose: 'Kapat',
    mobileMenuLabel: 'Site menüsü',
    pageLoading: 'Sayfa yükleniyor…',
    placeholderBody: 'Bu sayfanın içeriği sonraki adımlarda eklenecek.',
    routeAnnouncement: (pageHeading) => `${pageHeading} sayfası açıldı`,
    backToHome: 'Ana sayfaya dön',
  },
}
