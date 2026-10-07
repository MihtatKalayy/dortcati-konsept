/** Yönlendirilebilir sayfaların sabit kimlikleri. */
export type PageId =
  | 'home'
  | 'about'
  | 'services'
  | 'projects'
  | 'projectDetail'
  | 'contact'
  | 'notFound'

/** Menüde gösterilebilen, parametre almayan sayfalar. */
export type StaticPageId = Exclude<PageId, 'projectDetail' | 'notFound'>

export interface Brand {
  name: string
  tagline: string
  description: string
}

export interface NavItem {
  /** Sabit kimlik; eşleştirmeler bu alanla yapılır. */
  id: string
  label: string
  page: StaticPageId
}

export interface CallToAction {
  label: string
  page: StaticPageId
}

export interface ContactInfo {
  email: string
  phone: string
  /** `tel:` bağlantısı için boşluksuz biçim. */
  phoneHref: string
  addressLines: string[]
  hours: string
  placeholderNote: string
}

export interface PageCopy {
  /** Sayfanın ana başlığı (h1). */
  heading: string
  /** Sekme başlığı; boşsa marka adı ve slogan kullanılır. */
  documentTitle?: string
}

export interface UiCopy {
  skipToContent: string
  primaryNavLabel: string
  footerNavLabel: string
  homeLinkLabel: string
  menuOpen: string
  menuClose: string
  mobileMenuLabel: string
  pageLoading: string
  routeAnnouncement: (pageHeading: string) => string
  backToHome: string
}

export interface FooterCopy {
  navHeading: string
  contactHeading: string
  copyright: (year: number) => string
}

export interface ErrorCopy {
  heading: string
  body: string
  reload: string
}

export interface ProjectCategory {
  /** Sabit kimlik; projeler kategoriye bu alanla bağlanır. */
  id: string
  /** Adreste (?kategori=) kullanılan kısa ad. */
  slug: string
  name: string
}

export interface ProjectImage {
  src: string
  alt: string
  /** Çizim türü (ör. "Kesit"). */
  caption: string
  width: number
  height: number
}

export interface Project {
  /** Sabit kimlik; eşleştirmeler her zaman bu alanla yapılır. */
  id: string
  /** Adres için kısa ad; değişebilir. */
  slug: string
  name: string
  categoryId: ProjectCategory['id']
  year: number
  /** Sıralama için tamamlanma tarihi, YYYY-AA biçiminde. */
  completedAt: string
  /** Genel ve kurgusal konum; açık adres değildir. */
  location: string
  /** Yaklaşık kapalı alan, metrekare. */
  areaM2: number
  scope: string[]
  summary: string
  description: string[]
  cover: ProjectImage
  gallery: ProjectImage[]
  featured: boolean
}

export interface ProjectsPageCopy {
  intro: string
  filterLabel: string
  allLabel: string
  /** Filtre seçeneklerindeki sayının ekran okuyucu için birimi. */
  countUnit: string
  /** Sonuç satırı; filtre değişince ekran okuyucuya da duyurulur. */
  resultStatus: (count: number, categoryName: string | null) => string
  emptyResult: string
  documentTitle: (categoryName: string | null) => string
  meta: { category: string; year: string; location: string }
}

export interface ProjectDetailCopy {
  backToProjects: string
  /** Proje kategorisi seçili olarak teklif formunu açan çağrı. */
  quoteCta: { text: string; button: string }
  breadcrumbLabel: string
  factsHeading: string
  facts: { category: string; year: string; location: string; area: string; scope: string }
  descriptionHeading: string
  galleryHeading: string
  /** Görsel düğmesinin ekran okuyucu eki (alt metnin ardından okunur). */
  openImageHint: string
  viewer: {
    label: (projectName: string) => string
    close: string
    previous: string
    next: string
    position: (current: number, total: number, caption: string) => string
  }
  adjacent: { label: string; previous: string; next: string }
}

export interface Service {
  /** Sabit kimlik; eşleştirmeler bu alanla yapılır. */
  id: string
  /** Adres için kısa ad (Hizmetler sayfasında bağlantı hedefi olarak). */
  slug: string
  name: string
  /** Tek cümlelik özet. */
  summary: string
  /** Ayrıntılı açıklama paragrafları. */
  description: string[]
  /** Hizmetin kapsadığı işler (3–5 kısa madde). */
  includes: string[]
}

export interface ProcessStep {
  /** Sabit kimlik. */
  id: string
  title: string
  body: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string[]
}

export interface TeamMember {
  /** Sabit kimlik. Ekip kurgusaldır. */
  id: string
  name: string
  role: string
  bio: string
}

export interface Principle {
  id: string
  title: string
  body: string
}

export interface ServicesPageCopy {
  heading: string
  documentTitle: string
  metaDescription: string
  intro: string
  includesHeading: string
  process: { heading: string; intro: string }
  faq: { heading: string }
  closing: { heading: string; cta: string }
}

export interface AboutPageCopy {
  heading: string
  documentTitle: string
  metaDescription: string
  lead: string
  story: { heading: string; paragraphs: string[] }
  principles: { heading: string; items: Principle[] }
  team: { heading: string; note: string }
  closing: { heading: string; projectsLink: string; contactLink: string }
}

export type QuoteStepId = 'project' | 'details' | 'contact' | 'summary'

export type QuoteErrorCode =
  | 'required'
  | 'invalidOption'
  | 'servicesRequired'
  | 'areaInvalid'
  | 'areaRange'
  | 'descriptionTooLong'
  | 'nameInvalid'
  | 'phoneInvalid'
  | 'emailInvalid'
  | 'consentRequired'

export interface QuoteOption {
  /** Sabit kimlik; form durumunda bu değer tutulur. */
  id: string
  label: string
}

export interface ContactPageCopy {
  heading: string
  documentTitle: string
  metaDescription: string
  intro: string
  info: {
    heading: string
    address: string
    phone: string
    email: string
    hours: string
    mapCaption: string
    mapAlt: string
  }
  form: {
    heading: string
    conceptNote: string
    progressLabel: string
    stepPosition: (current: number, total: number) => string
    stepAnnouncement: (current: number, total: number, title: string) => string
    steps: Record<QuoteStepId, string>
    optional: string
    fields: {
      projectType: { legend: string; otherOption: QuoteOption }
      services: { legend: string; hint: string }
      area: { label: string; hint: string; unit: string }
      province: { label: string; placeholder: string }
      budget: { legend: string; hint: string; options: QuoteOption[] }
      timing: { legend: string; options: QuoteOption[] }
      description: { label: string; hint: string; counter: (count: number, max: number) => string }
      fullName: { label: string }
      phone: { label: string; hint: string }
      email: { label: string }
      contactPreference: { legend: string; options: QuoteOption[] }
      consent: { label: string; text: string; summaryLabel: string; summaryValue: string }
    }
    errors: {
      required: string
      invalidOption: string
      servicesRequired: string
      areaInvalid: string
      areaRange: (min: number, max: number) => string
      descriptionTooLong: (max: number) => string
      nameInvalid: string
      phoneInvalid: string
      emailInvalid: string
      consentRequired: string
    }
    errorAnnouncement: (count: number) => string
    buttons: { next: string; back: string; submit: string; edit: string; editLabel: (step: string) => string }
    notProvided: string
    success: { heading: string; body: string; note: string; newRequest: string; projectsLink: string }
  }
}

export interface HomeCopy {
  /** Sekme başlığı (ana sayfa marka adını kendisi taşır). */
  documentTitle: string
  /** index.html'deki açıklama meta etiketiyle aynı olmalıdır (testle denetlenir). */
  metaDescription: string
  hero: {
    lead: string
    primaryCta: string
    secondaryCta: string
    /** Hero görselinin altyazısı: proje adı ve çizim türü. */
    imageCaption: (projectName: string, drawing: string) => string
  }
  intro: { heading: string; body: string; link: string }
  featured: { heading: string; link: string }
  services: { heading: string; link: string }
  closing: { heading: string; cta: string }
}

export interface SiteContent {
  brand: Brand
  conceptNotice: string
  nav: NavItem[]
  primaryCta: CallToAction
  contact: ContactInfo
  /** Proje detayının başlığı projenin adından gelir; bu yüzden burada yer almaz. */
  pages: Record<'projects' | 'notFound', PageCopy>
  home: HomeCopy
  servicesPage: ServicesPageCopy
  about: AboutPageCopy
  contactPage: ContactPageCopy
  notFoundBody: string
  footer: FooterCopy
  error: ErrorCopy
  projectsPage: ProjectsPageCopy
  projectDetail: ProjectDetailCopy
  ui: UiCopy
}
