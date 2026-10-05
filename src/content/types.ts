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

export interface SiteContent {
  brand: Brand
  conceptNotice: string
  nav: NavItem[]
  primaryCta: CallToAction
  contact: ContactInfo
  pages: Record<PageId, PageCopy>
  notFoundBody: string
  footer: FooterCopy
  error: ErrorCopy
  ui: UiCopy
}
