import { DRAWING_HEIGHT, DRAWING_WIDTH } from './drawingSize'
import type { Project, ProjectCategory, ProjectImage } from './types'

export { DRAWING_HEIGHT, DRAWING_WIDTH }

/**
 * Proje ve kategori verisinin tek kaynağı. Tüm projeler kurgusaldır.
 * Görseller `scripts/drawings` ile üretilen özgün SVG çizimlerdir.
 */

export const categories: ProjectCategory[] = [
  { id: 'cat-konut', slug: 'konut', name: 'Konut' },
  { id: 'cat-ticari', slug: 'ticari', name: 'Ticari' },
  { id: 'cat-ic-mekan', slug: 'ic-mekan', name: 'İç Mekân' },
]

/** Kategoriyi id ile bulur; tanımsız id veri hatasıdır ve fırlatır. */
export function getCategory(id: string): ProjectCategory {
  const category = categories.find((c) => c.id === id)
  if (!category) throw new Error(`Tanımsız kategori: ${id}`)
  return category
}


type DrawingFile = 'kapak' | 'galeri-1' | 'galeri-2' | 'galeri-3'

// `no-inline`: küçük SVG'ler de ayrı dosya olarak kalır ve tembel yüklenebilir.
const drawingUrls = import.meta.glob<string>('../assets/projects/*/*.svg', {
  eager: true,
  query: '?url&no-inline',
  import: 'default',
})

function drawing(projectId: string, file: DrawingFile, caption: string, alt: string): ProjectImage {
  const src = drawingUrls[`../assets/projects/${projectId}/${file}.svg`]
  if (!src) throw new Error(`Çizim bulunamadı: ${projectId}/${file}.svg`)
  return { src, alt, caption, width: DRAWING_WIDTH, height: DRAWING_HEIGHT }
}

/** Mimari projeler için çizim seti: aksonometri (kapak), cephe, kesit, plan. */
function architecturalSet(id: string, alts: [string, string, string, string]) {
  return {
    cover: drawing(id, 'kapak', 'Aksonometri', alts[0]),
    gallery: [
      drawing(id, 'galeri-1', 'Cephe', alts[1]),
      drawing(id, 'galeri-2', 'Kesit', alts[2]),
      drawing(id, 'galeri-3', 'Plan', alts[3]),
    ],
  }
}

export const projects: Project[] = [
  {
    id: 'prj-001',
    slug: 'zeytinlik-evi',
    name: 'Zeytinlik Evi',
    categoryId: 'cat-konut',
    year: 2023,
    completedAt: '2023-05',
    location: 'Ege kıyısı',
    areaM2: 240,
    scope: ['Mimari tasarım', 'İç mimarlık', 'Peyzaj kurgusu'],
    summary: 'Zeytin ağaçlarının arasına, eğimi izleyerek üç kademede yerleşen alçak ve sakin bir yazlık ev.',
    description: [
      'Arazi denize doğru yumuşak bir eğimle iniyor ve üzerinde yaşlı zeytin ağaçları var. Evi tek bir büyük kütle olarak kurmak yerine üç alçak hacme böldük; her biri bir taş setin üzerine oturuyor ve eğimi izleyerek bir öncekinden biraz aşağıda konumlanıyor.',
      'Hacimlerin arasında kalan boşluklar avlu olarak kullanılıyor. Böylece ağaçların hiçbiri kesilmedi; her oda en az bir zeytin ağacına bakıyor. Yatak odaları üst sette, ortak yaşam alanı ortada, misafir bölümü en altta yer alıyor.',
      'Duvarlarda bölgede kolay bulunan taş ve kireç sıva, doğramalarda ahşap kullanıldı. Derin pencere boşlukları öğle güneşini içeri almadan sabah ve akşam ışığını odalara taşıyor.',
    ],
    ...architecturalSet('prj-001', [
      'Zeytinlik Evi aksonometrisi: taş setler üzerine kademeli oturan üç alçak, düz çatılı kütle ve aralarındaki zeytin ağaçları.',
      'Zeytinlik Evi güney cephesi: eğim boyunca basamaklanan üç kütle, geniş cam açıklıklar ve vurgu renginde giriş kapısı.',
      'Zeytinlik Evi kesiti: araziyi izleyerek kademelenen üç hacim ve en alttaki kütleye eğik açıyla giren güneş ışığı.',
      'Zeytinlik Evi vaziyet planı: üç dikdörtgen kütle, aralarındaki avlular ve çevredeki zeytin ağaçları.',
    ]),
    featured: true,
  },
  {
    id: 'prj-002',
    slug: 'avlulu-sira-evler',
    name: 'Avlulu Sıra Evler',
    categoryId: 'cat-konut',
    year: 2022,
    completedAt: '2022-09',
    location: "İç Anadolu'da bir ilçe merkezi",
    areaM2: 1180,
    scope: ['Mimari tasarım', 'Uygulama projesi'],
    summary: 'Altı aileye, sokakla ev arasında kendi avlusunu veren iki katlı sıra evler.',
    description: [
      'Dar ve uzun bir parselde altı konut istendi. Bölgenin geleneksel evlerinde olduğu gibi her konutun önüne duvarla çevrili küçük bir avlu yerleştirdik; sokaktan önce avluya, avludan eve girilerek mahremiyet korunuyor.',
      'Konutlar aynı ölçüde, beşik çatılı yalın kütlelerden oluşuyor. Tekrar eden çatılar sokak boyunca sakin bir ritim kuruyor; avlu kapıları ve pencere düzenindeki küçük farklar her evi ayırt edilebilir kılıyor.',
      'Zemin katta mutfak ve yaşama alanı avluya açılıyor, üst katta yatak odaları yer alıyor. Kalın duvarlar kışın ısıyı içeride tutarken avludaki ağaç yazın gölge sağlıyor.',
    ],
    ...architecturalSet('prj-002', [
      'Avlulu Sıra Evler aksonometrisi: beşik çatılı altı konut, önlerinde duvarla çevrili avlular ve avlulardaki ağaçlar.',
      'Avlulu Sıra Evler sokak cephesi: avlu duvarlarının ardında yükselen altı özdeş beşik çatılı ev.',
      'Avlulu Sıra Evler kesiti: yan yana dizilen altı iki katlı konutun üçgen çatı profilleri ve ara döşemeleri.',
      'Avlulu Sıra Evler planı: altı konut, her birinin önündeki avlu ve sokak boyunca uzanan avlu duvarı.',
    ]),
    featured: false,
  },
  {
    id: 'prj-003',
    slug: 'yamac-evi',
    name: 'Yamaç Evi',
    categoryId: 'cat-konut',
    year: 2024,
    completedAt: '2024-03',
    location: "Karadeniz'de bir yamaç",
    areaM2: 310,
    scope: ['Mimari tasarım', 'İç mimarlık'],
    summary: 'Dik bir yamaca yarım kat kaydırılmış iki ahşap kütleyle yerleşen, yağmura göre biçimlenmiş bir aile evi.',
    description: [
      'Arazi dik ve yılın büyük bölümünde yağış alıyor. Evi yamaçla kavga etmeden yerleştirmek için iki kütleye ayırdık ve bunları yarım kat farkla birbirine bağladık; böylece kazı azaldı ve iki kütle de zemine kendi kotundan oturuyor.',
      'Dik beşik çatılar yağmuru ve karı hızla uzaklaştırıyor, çatı altında kalan yüksek hacimler çalışma ve oyun alanı olarak kullanılıyor. Alt kütlede ortak yaşam alanı, üst kütlede yatak odaları bulunuyor.',
      'Cepheler düşey ahşap kaplamayla kaplandı; taş kaide nemi zeminden uzak tutuyor. Geniş pencereler vadiye yönlenirken arka cephe rüzgâra karşı daha kapalı tutuldu.',
    ],
    ...architecturalSet('prj-003', [
      'Yamaç Evi aksonometrisi: düşey ahşap kaplamalı, dik beşik çatılı iki kütle ve aralarındaki yarım kat fark; çevrede çam ağaçları.',
      'Yamaç Evi cephesi: eğimli zemin üzerinde yarım kat farkla yan yana duran iki üçgen çatılı ahşap kütle.',
      'Yamaç Evi kesiti: yamaca kademeli oturan iki hacim, çatı altındaki yüksek boşluklar ve pencereden giren ışık.',
      'Yamaç Evi planı: ortak duvarla birleşen iki dikdörtgen kütle ve çevresindeki ağaçlar.',
    ]),
    featured: false,
  },
  {
    id: 'prj-004',
    slug: 'liman-ofisleri',
    name: 'Liman Ofisleri',
    categoryId: 'cat-ticari',
    year: 2021,
    completedAt: '2021-11',
    location: 'Marmara kıyısında bir liman kenti',
    areaM2: 2400,
    scope: ['Mimari tasarım', 'Yeniden kullanım', 'İç mimarlık'],
    summary:
      'Testere dişi çatılı eski bir liman deposunu, tepe ışığını koruyarak paylaşımlı ofislere dönüştüren bir yeniden kullanım projesi.',
    description: [
      'Uzun süre boş kalmış yığma bir depo, birden fazla küçük ekibin paylaşacağı ofislere dönüştürüldü. Yapının en güçlü yanı, testere dişi çatıdan gelen eşit ve yumuşak ışıktı; tasarımın tamamı bu ışığı korumak üzerine kuruldu.',
      'Mevcut taş duvarlar ve çatı makasları olduğu gibi bırakıldı. İçeriye yapıdan bağımsız, hafif çelik bir asma kat yerleştirildi; asma kat çatıya değmiyor, böylece tepe pencereleri her iki kattan da görülebiliyor.',
      'Düşey dolaşım ve ıslak hacimler yapının yanına eklenen cam bir kulede toplandı. Bu sayede ana hacim bölünmeden kaldı; eski kapı açıklıkları limana bakan girişler olarak yeniden kullanıldı.',
    ],
    ...architecturalSet('prj-004', [
      'Liman Ofisleri aksonometrisi: taş duvarlı, altı dişli testere çatılı uzun depo ve yanına eklenen cam kule.',
      'Liman Ofisleri cephesi: taş duvarda sıralanan büyük kapı açıklıkları, üstte testere dişi çatı profili ve yanda cam kule.',
      'Liman Ofisleri kesiti: testere dişi çatı, bağımsız asma kat ve tepe penceresinden asma kata inen ışık.',
      'Liman Ofisleri planı: dikdörtgen depo hacmi, cepheye dizilen kapılar ve yandaki kule.',
    ]),
    featured: true,
  },
  {
    id: 'prj-005',
    slug: 'carsi-pasaji',
    name: 'Çarşı Pasajı',
    categoryId: 'cat-ticari',
    year: 2023,
    completedAt: '2023-04',
    location: 'Tarihi bir kent merkezi',
    areaM2: 860,
    scope: ['Mimari tasarım', 'Restorasyon danışmanlığı', 'Uygulama projesi'],
    summary:
      'İki sıra dükkânın arasındaki dar geçidi cam bir tonozla örterek gün boyu kullanılabilen bir çarşı sokağına dönüştüren proje.',
    description: [
      'Birbirine paralel iki sıra eski dükkân arasındaki dar geçit, yıllar içinde bir arka sokağa dönüşmüştü. Geçidi hafif bir cam tonozla örterek yağmurdan ve sıcaktan korunan, iki ucu açık bir pasaj elde ettik.',
      'Dükkânların cepheleri onarılarak ön sokağa yeniden açıldı; zemin katlarda vitrinler, üst katlarda atölye ve küçük ofisler yer alıyor. Pasaj içinde dükkânlar her iki yöne de açılabiliyor.',
      'Tonozun taşıyıcıları mevcut duvarlara yük bindirmeyecek şekilde kendi ayaklarına oturtuldu. Gün ışığı pasajın ortasına kadar iniyor; akşamları tonozun altına gizlenen aydınlatma sokağı aydınlatıyor.',
    ],
    ...architecturalSet('prj-005', [
      'Çarşı Pasajı aksonometrisi: iki sıra iki katlı dükkân ve aralarındaki geçidi örten cam tonoz; pasaj girişi vurgu renginde.',
      'Çarşı Pasajı sokak cephesi: zemin katta sıralı vitrinler, üst katta pencereler ve arkada yükselen tonoz.',
      'Çarşı Pasajı enine kesiti: iki dükkân sırası arasında cam tonozlu pasaj ve tonozdan pasaj zeminine inen gün ışığı.',
      'Çarşı Pasajı planı: bölmelere ayrılmış iki dükkân sırası ve aralarındaki üstü örtülü geçit.',
    ]),
    featured: false,
  },
  {
    id: 'prj-006',
    slug: 'bag-tadim-salonu',
    name: 'Bağ Tadım Salonu',
    categoryId: 'cat-ticari',
    year: 2024,
    completedAt: '2024-08',
    location: "Trakya'da bir bağ",
    areaM2: 520,
    scope: ['Mimari tasarım', 'Peyzaj kurgusu'],
    summary: 'Sıkıştırılmış toprak duvarlar ve geniş bir saçakla bağ sıralarına açılan tek katlı bir tadım salonu.',
    description: [
      'Küçük bir bağın ziyaretçilerini ağırlayacak bir tadım salonu istendi. Yapıyı bağ sıralarına paralel uzanan uzun ve alçak bir hacim olarak kurduk; arka ve yan duvarlar arazinin kendi toprağı sıkıştırılarak yapıldı.',
      'Bağa bakan cephe tümüyle camlı. Her yöne taşan ince ve geniş saçak yazın yüksek güneşi keserken kışın alçak güneşin salona girmesine izin veriyor.',
      'Toprak duvarlar saçağın altından çıkıp bağa doğru uzanarak bahçe duvarlarına dönüşüyor. Bu duvarlar rüzgârı kesiyor ve ziyaretçiyi salondan bağ sıralarına yönlendiriyor.',
    ],
    ...architecturalSet('prj-006', [
      'Bağ Tadım Salonu aksonometrisi: ince ve geniş bir saçağın altında camlı salon, bağa uzanan toprak duvarlar ve bağ sıraları.',
      'Bağ Tadım Salonu cephesi: iki toprak duvar arasında camlı cephe, üstte iki yana taşan ince saçak.',
      'Bağ Tadım Salonu kesiti: kalın toprak arka duvar, camlı ön cephe ve yaz güneşini kesen saçak.',
      'Bağ Tadım Salonu planı: uzun dikdörtgen salon, kesik çizgiyle gösterilen saçak sınırı ve bağa uzanan duvarlar.',
    ]),
    featured: false,
  },
  {
    id: 'prj-007',
    slug: 'kitap-kafe',
    name: 'Kitap Kafe',
    categoryId: 'cat-ic-mekan',
    year: 2022,
    completedAt: '2022-02',
    location: 'Bir üniversite semti',
    areaM2: 140,
    scope: ['İç mimarlık', 'Mobilya tasarımı', 'Uygulama'],
    summary: 'Kitap raflarının basamaklı oturma alanına dönüştüğü, okumak ve çalışmak için tasarlanmış bir kafe.',
    description: [
      'Tek ve uzun bir dükkân hacminde hem kitap satışı hem de kafe işletmesi istendi. Rafları ve oturma alanını birbirinden ayırmak yerine ikisini tek bir mobilyada birleştirdik: uzun duvar boyunca uzanan raflar aşağıda basamaklara dönüşüyor.',
      'Basamaklar gün içinde okuma alanı, akşamları söyleşiler için tribün olarak kullanılıyor. Ortadaki uzun ortak masa farklı kişileri yan yana çalışmaya davet ediyor; tezgâh arka tarafta konumlandı.',
      'Malzemeleri sınırlı tuttuk: açık renk ahşap, kireç badana ve siyah metal ayrıntılar. Masanın üzerindeki sarkıt aydınlatmalar akşamları mekânı daha küçük ve samimi parçalara bölüyor.',
    ],
    cover: drawing(
      'prj-007',
      'kapak',
      'İç perspektif',
      'Kitap Kafe iç perspektifi: solda raflardan inen oturma basamakları, ortada sarkıt lambalı uzun masa, arkada büyük pencere.',
    ),
    gallery: [
      drawing('prj-007', 'galeri-1', 'Plan', 'Kitap Kafe planı: sol duvar boyunca basamaklar, ortada uzun masa ve banklar, sağ arkada tezgâh.'),
      drawing('prj-007', 'galeri-2', 'İç cephe', 'Kitap Kafe raf duvarı görünüşü: kare bölmeli raflar, önlerinde üç basamaklı oturma alanı ve oturan kişiler.'),
      drawing('prj-007', 'galeri-3', 'Detay aksonometrisi', 'Kitap Kafe raf ve basamak modülünün aksonometrisi: arkada bölmeli raf, önde üç basamak.'),
    ],
    featured: true,
  },
  {
    id: 'prj-008',
    slug: 'kucuk-daire',
    name: 'Küçük Daire',
    categoryId: 'cat-ic-mekan',
    year: 2023,
    completedAt: '2023-10',
    location: 'Kent merkezinde bir apartman katı',
    areaM2: 68,
    scope: ['İç mimarlık', 'Mobilya tasarımı'],
    summary: 'Sürgülü paneller ve katlanır mobilyalarla gün içinde biçim değiştiren küçük bir şehir dairesi.',
    description: [
      'Eski bir apartmandaki küçük bir daire, tek kişinin hem yaşayacağı hem de evden çalışacağı bir mekâna dönüştürüldü. Bölme duvarlarını kaldırıp daireyi tek bir uzun hacim olarak açtık.',
      'Uzun duvar boyunca ilerleyen sürgülü paneller dolapları, çalışma masasını ve mutfak raflarını gizliyor. Paneller açıldığında daire bir atölyeye, kapandığında sakin bir yaşam alanına dönüşüyor.',
      'Yatak, pencere önündeki yükseltilmiş bir platformun üzerinde; platformun altı depolama alanı. Duvara katlanan masa ve sabit oturma bankı küçük alanı gün içinde farklı işlere uyarlıyor.',
    ],
    cover: drawing(
      'prj-008',
      'kapak',
      'İç perspektif',
      'Küçük Daire iç perspektifi: sağ duvar boyunca sürgülü paneller, biri açık; solda katlanır masa ve pencere önünde yatak platformu.',
    ),
    gallery: [
      drawing('prj-008', 'galeri-1', 'Plan', 'Küçük Daire planı: tek uzun hacim, sağ duvardaki panel rayı, solda yatak ve masa, girişte banyo.'),
      drawing('prj-008', 'galeri-2', 'İç cephe', 'Küçük Daire panel duvarı görünüşü: beş panelden ikisi açık, arkalarında raflar ve açılmış çalışma masası.'),
      drawing('prj-008', 'galeri-3', 'Detay aksonometrisi', 'Küçük Daire duvar dolabı aksonometrisi: dolap gövdesi ve öne açılan katlanır masa.'),
    ],
    featured: false,
  },
  {
    id: 'prj-009',
    slug: 'sakin-klinik',
    name: 'Sakin Klinik',
    categoryId: 'cat-ic-mekan',
    year: 2024,
    completedAt: '2024-06',
    location: 'Bir ilçe merkezi',
    areaM2: 210,
    scope: ['İç mimarlık', 'Aydınlatma tasarımı', 'Uygulama'],
    summary: 'Kavisli duvarlar ve dolaylı ışıkla bekleme sürecini sakinleştirmeyi amaçlayan bir klinik iç mekânı.',
    description: [
      'Bir ayakta tedavi kliniğinin iç mekânı yenilendi. Hastaların en çok zaman geçirdiği bekleme alanını köşeli koridorlardan ayırarak kavisli bir duvarla çevrili yumuşak bir mekân olarak tasarladık.',
      'Muayene odaları düz bir koridor boyunca sıralanıyor; kavisli duvar ziyaretçiyi girişten danışma bankosuna doğal biçimde yönlendiriyor. Danışma bankosu da aynı kavsi izliyor.',
      'Doğrudan tavan armatürleri yerine tavan kenarlarına gizlenen dolaylı aydınlatma kullanıldı. Parlak yüzeylerden kaçınıldı; açık tonlu, mat ve kolay temizlenen malzemeler seçildi.',
    ],
    cover: drawing(
      'prj-009',
      'kapak',
      'İç perspektif',
      'Sakin Klinik koridor perspektifi: solda kavisli duvar, sağda muayene odası kapıları ve tavan kenarı boyunca gizli ışık bandı.',
    ),
    gallery: [
      drawing('prj-009', 'galeri-1', 'Plan', 'Sakin Klinik planı: kavisli duvarla çevrili bekleme alanı, kavisli danışma bankosu ve sağda sıralanan muayene odaları.'),
      drawing('prj-009', 'galeri-2', 'Kesit', 'Sakin Klinik tavan kesiti: iki yandaki gizli ışık oyuklarından tavana yansıyan dolaylı ışık.'),
      drawing('prj-009', 'galeri-3', 'Detay aksonometrisi', 'Sakin Klinik danışma bankosu aksonometrisi: kademeli banko ve altındaki ince ışık bandı.'),
    ],
    featured: false,
  },
]
