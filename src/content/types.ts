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
  placeholderBody: string
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
}

export interface SiteContent {
  brand: Brand
  conceptNotice: string
  nav: NavItem[]
  primaryCta: CallToAction
  contact: ContactInfo
  /** Proje detayının başlığı projenin adından gelir; bu yüzden burada yer almaz. */
  pages: Record<Exclude<PageId, 'projectDetail'>, PageCopy>
  notFoundBody: string
  footer: FooterCopy
  error: ErrorCopy
  projectsPage: ProjectsPageCopy
  projectDetail: ProjectDetailCopy
  ui: UiCopy
}
