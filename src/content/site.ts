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
    projects: { heading: 'Projeler' },
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

  servicesPage: {
    heading: 'Hizmetler',
    documentTitle: 'Hizmetler',
    metaDescription:
      'Dörtçatı Mimarlık hizmetleri: mimari tasarım, iç mimarlık, uygulama ve şantiye yönetimi, renovasyon ve danışmanlık; çalışma süreci ve sık sorulan sorular. Konsept çalışma.',
    intro:
      'Bir projeye arsa seçiminden anahtar teslimine kadar her aşamada dahil olabiliyoruz. Aşağıda her hizmetin neleri kapsadığını ve birlikte nasıl çalıştığımızı bulabilirsiniz.',
    includesHeading: 'Kapsadığı işler',
    process: {
      heading: 'Çalışma süreci',
      intro: 'Her projenin temposu farklıdır; yine de çoğu iş aşağıdaki beş adımı izler.',
    },
    faq: { heading: 'Sık sorulan sorular' },
    closing: { heading: 'Projenizi dinlemek isteriz.', cta: 'İletişime geçin' },
  },

  about: {
    heading: 'Hakkımızda',
    documentTitle: 'Hakkımızda',
    metaDescription:
      'Dörtçatı Mimarlık’ın hikâyesi, tasarım ilkeleri ve kurgusal ekibi. Bu site bir konsept çalışmadır, gerçek bir firmayı temsil etmez.',
    lead: 'Dörtçatı, mimarlık ve iç mimarlığı tek masada buluşturan küçük bir ofis. Her ölçekte aynı soruyu soruyoruz: bu mekânda yaşamak nasıl hissettirecek?',
    story: {
      heading: 'Hikâyemiz',
      paragraphs: [
        'Ofisin adı, ilk ortak çalışmamızdan geliyor: aynı bahçeyi paylaşan dört küçük evin yenilenmesi. O işte her evin kendi çatısı altında farklı bir hayat sürdüğünü, ama bahçenin hepsini bir arada tuttuğunu gördük. O günden beri tasarıma tek tek yapılardan değil, aralarındaki ilişkilerden başlıyoruz.',
        'Bugün konut, ticari ve iç mekân projelerini aynı ekiple yürütüyoruz. Mimari tasarımı yapan kişi iç mekânın ayrıntısını da, şantiyedeki uygulamayı da takip ediyor. Bu sayede ilk eskizde verilen kararlar teslim gününe kadar kaybolmuyor.',
        'Küçük kalmayı bilerek seçtik. Aynı anda sınırlı sayıda projeye odaklanıyor, her işverenle doğrudan ve düzenli konuşuyoruz.',
      ],
    },
    principles: {
      heading: 'Tasarım ilkeleri',
      items: [
        {
          id: 'ilk-baglam',
          title: 'Bağlama saygı',
          body: 'Arsanın eğimi, mevcut ağaçlar, komşu yapılar ve iklim tasarımın başlangıç noktasıdır; onları değiştirmek yerine onlarla çalışırız.',
        },
        {
          id: 'ilk-yalinlik',
          title: 'Yalınlık',
          body: 'Az sayıda malzeme ve açık bir plan kurgusu, mekânı hem okunur hem de uzun yıllar kullanışlı kılar.',
        },
        {
          id: 'ilk-isik',
          title: 'Doğal ışık',
          body: 'Pencerelerin yerini ve boyutunu güneşin gün içindeki yoluna göre belirler, yapay ışığı bunu tamamlayacak şekilde tasarlarız.',
        },
        {
          id: 'ilk-malzeme',
          title: 'Uzun ömürlü malzeme',
          body: 'Zamanla güzelleşen, onarılabilen ve bölgede kolay bulunan malzemeleri tercih ederiz.',
        },
      ],
    },
    team: {
      heading: 'Ekip',
      note: 'Kurgusal ekip: kişiler, adlar ve unvanlar bu konsept çalışma için oluşturulmuştur.',
    },
    closing: {
      heading: 'İşlerimize göz atın ya da bize projenizden bahsedin.',
      projectsLink: 'Projeleri incele',
      contactLink: 'İletişime geçin',
    },
  },

  contactPage: {
    heading: 'İletişim',
    documentTitle: 'İletişim ve teklif',
    metaDescription:
      'Dörtçatı Mimarlık ile iletişim ve dört adımlı teklif formu. Bu site bir konsept çalışmadır; form hiçbir yere veri göndermez.',
    intro:
      'Projenizi birkaç adımda anlatın; size en uygun çalışma biçimini birlikte belirleyelim. Doğrudan ulaşmak isterseniz iletişim bilgilerimizi de bu sayfada bulabilirsiniz.',
    info: {
      heading: 'İletişim bilgileri',
      address: 'Adres',
      phone: 'Telefon',
      email: 'E-posta',
      hours: 'Çalışma saatleri',
      mapCaption: 'Konum örnektir.',
      mapAlt: 'Stilize konum çizimi: sokak ızgarası içinde vurgu renginde bir işaret. Gerçek bir haritayı göstermez.',
    },
    form: {
      heading: 'Teklif formu',
      conceptNote: 'Bu site bir konsept çalışmadır; girdiğiniz bilgiler hiçbir yere gönderilmez ve kaydedilmez.',
      progressLabel: 'Form adımları',
      stepPosition: (current, total) => `Adım ${current} / ${total}`,
      stepAnnouncement: (current, total, title) => `Adım ${current} / ${total}: ${title}`,
      steps: { project: 'Proje', details: 'Ayrıntılar', contact: 'İletişim', summary: 'Özet' },
      optional: '(isteğe bağlı)',
      fields: {
        projectType: { legend: 'Proje türü', otherOption: { id: 'diger', label: 'Diğer' } },
        services: { legend: 'İlgilendiğiniz hizmetler', hint: 'Birden fazla seçebilirsiniz.' },
        area: { label: 'Yaklaşık alan', hint: 'Metrekare olarak, tam sayı.', unit: 'm²' },
        province: { label: 'İl', placeholder: 'İl seçin' },
        budget: {
          legend: 'Yaklaşık proje bütçesi',
          hint: 'Uygulama dahil genel bir aralık seçmeniz yeterli; bu aralıklar bir fiyat listesi değildir.',
          options: [
            { id: 'butce-1', label: '1 milyon ₺ altı' },
            { id: 'butce-2', label: '1–3 milyon ₺' },
            { id: 'butce-3', label: '3–10 milyon ₺' },
            { id: 'butce-4', label: '10 milyon ₺ üzeri' },
            { id: 'butce-yok', label: 'Belirtmek istemiyorum' },
          ],
        },
        timing: {
          legend: 'Ne zaman başlamak istiyorsunuz?',
          options: [
            { id: 'zaman-hemen', label: 'Hemen' },
            { id: 'zaman-3ay', label: '3 ay içinde' },
            { id: 'zaman-6ay', label: '6 ay içinde' },
            { id: 'zaman-belirsiz', label: 'Henüz belli değil' },
          ],
        },
        description: {
          label: 'Proje açıklaması',
          hint: 'Arsa, mevcut durum veya beklentileriniz hakkında kısa bilgi.',
          counter: (count, max) => `${count} / ${max} karakter`,
        },
        fullName: { label: 'Ad soyad' },
        phone: { label: 'Telefon', hint: 'Örn. 0500 000 00 00' },
        email: { label: 'E-posta' },
        contactPreference: {
          legend: 'Size nasıl ulaşalım?',
          options: [
            { id: 'telefon', label: 'Telefon' },
            { id: 'eposta', label: 'E-posta' },
          ],
        },
        consent: {
          label: 'Bilgilendirme metnini okudum.',
          text: 'Örnek metin: Bu formda paylaştığınız bilgiler yalnızca talebinizi değerlendirmek için kullanılır ve üçüncü kişilerle paylaşılmaz. (Konsept çalışmada hiçbir bilgi gönderilmez veya saklanmaz.)',
          summaryLabel: 'Bilgilendirme metni',
          summaryValue: 'Okundu',
        },
      },
      errors: {
        required: 'Bu alan zorunludur.',
        invalidOption: 'Lütfen listeden bir seçenek seçin.',
        servicesRequired: 'En az bir hizmet seçin.',
        areaInvalid: 'Alanı pozitif bir tam sayı olarak girin.',
        areaRange: (min, max) =>
          `Alan ${min.toLocaleString('tr-TR')} ile ${max.toLocaleString('tr-TR')} m² arasında olmalıdır.`,
        descriptionTooLong: (max) => `Açıklama en fazla ${max} karakter olabilir.`,
        nameInvalid: 'Adınızı ve soyadınızı girin.',
        phoneInvalid: 'Geçerli bir telefon numarası girin (ör. 0500 000 00 00).',
        emailInvalid: 'Geçerli bir e-posta adresi girin.',
        consentRequired: 'Devam etmek için bilgilendirme metnini onaylayın.',
      },
      errorAnnouncement: (count) => (count === 1 ? '1 alanı kontrol edin.' : `${count} alanı kontrol edin.`),
      buttons: {
        next: 'İleri',
        back: 'Geri',
        submit: 'Talebi gönder',
        edit: 'Düzenle',
        editLabel: (step) => `${step} adımını düzenle`,
      },
      notProvided: 'Belirtilmedi',
      success: {
        heading: 'Teşekkürler',
        body: 'Formu eksiksiz doldurdunuz. Gerçek bir ofiste ekip, seçtiğiniz iletişim yolundan size dönüş yapardı.',
        note: 'Bu site bir konsept çalışmadır; talebiniz hiçbir yere gönderilmedi ve kaydedilmedi.',
        newRequest: 'Yeni talep oluştur',
        projectsLink: 'Projeleri incele',
      },
    },
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
    quoteCta: {
      text: 'Benzer bir proje mi düşünüyorsunuz?',
      button: 'Teklif alın',
    },
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
    routeAnnouncement: (pageHeading) => `${pageHeading} sayfası açıldı`,
    backToHome: 'Ana sayfaya dön',
  },
}
