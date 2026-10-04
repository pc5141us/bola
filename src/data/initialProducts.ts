import { Product, Order } from '@/types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'لابتوب لينوفو ThinkPad T14 Gen 2 (فرز أول استيراد)',
    partNumber: '20W0004QUS',
    category: 'laptops',
    categoryName: 'لابتوبات',
    price: 18500,
    salePrice: 17200,
    condition: 'imported',
    stock: 4,
    lowStockThreshold: 3,
    description: 'لابتوب الأعمال الاحترافي لينوفو ثينك باد T14 الجيل الثاني بحالة كالجديد فرز أول. مجهز بمعالج Core i7 وسرعة أداء فائقة، هيكل متين يتحمل العمل الشاق والمعامل والميدان.',
    mainImage: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=80'
    ],
    specs: [
      { key: 'المعالج', value: 'Intel Core i7-1165G7 (Up to 4.70 GHz)' },
      { key: 'الذاكرة العشوائية (RAM)', value: '16GB DDR4 3200MHz' },
      { key: 'التخزين', value: '512GB M.2 NVMe SSD Super Fast' },
      { key: 'الشاشة', value: '14" FHD (1920x1080) IPS Anti-glare' },
      { key: 'كارت الشاشة', value: 'Intel Iris Xe Graphics' },
      { key: 'البطارية', value: 'ساعة العمل 6-8 ساعات حقيقية' }
    ],
    compatibility: [
      'يدعم محطات التوصيل Lenovo Thunderbolt Dock & Type-C Docks',
      'متوافق مع أنظمة Windows 11 Pro و Linux Ubuntu',
      'يدعم الشحن السريع بقوة 65W Type-C Power Delivery'
    ],
    isBestSeller: true,
    isNewArrival: false,
    rating: 4.9,
    reviewsCount: 28,
    createdAt: '2026-09-15'
  },
  {
    id: 'prod-2',
    name: 'ماذربورد ايسوس ROG Strix Z790-E Gaming WiFi (جديد)',
    partNumber: '90MB1CM0-M0EAY0',
    category: 'motherboards',
    categoryName: 'لوحات أم',
    price: 16900,
    condition: 'new',
    stock: 2,
    lowStockThreshold: 3,
    description: 'لوحة أم عالي الأداء مع دعم معالجات الجيل 13 و 14 من إنتل، ذاكرة DDR5، وتبريد احترافي لكسر السرعة والألعاب الفائقة.',
    mainImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80'
    ],
    specs: [
      { key: 'السوكيت (Socket)', value: 'LGA 1700' },
      { key: 'الشريحة (Chipset)', value: 'Intel Z790' },
      { key: 'دعم الذاكرة', value: '4x DDR5 DIMM Up to 192GB (7800+ OC)' },
      { key: 'منافذ PCIe', value: '1x PCIe 5.0 x16, PCIe 4.0' },
      { key: 'التخزين M.2', value: '5x M.2 Slots (1x PCIe 5.0 NVMe)' },
      { key: 'الاتصال الشبكي', value: 'Intel 2.5Gb Ethernet & WiFi 6E Bluetooth 5.3' }
    ],
    compatibility: [
      'معالجات Intel Core i9 / i7 / i5 الجيل 12 / 13 / 14',
      'ذواكر DDR5 High Speed',
      'كروت الشاشة الحديثة RTX 4090 / RTX 4080 PCIe 5.0'
    ],
    isBestSeller: true,
    isNewArrival: true,
    rating: 5.0,
    reviewsCount: 14,
    createdAt: '2026-09-28'
  },
  {
    id: 'prod-3',
    name: 'محول تكنو كابل احترافي 7-in-1 Type-C Hub إلى HDMI 4K و USB 3.0',
    partNumber: 'HUB-TC7IN1-PRO',
    category: 'cables',
    categoryName: 'كابلات ومحولات',
    price: 850,
    salePrice: 699,
    condition: 'new',
    stock: 15,
    lowStockThreshold: 5,
    description: 'هاب وتوصيلة احترافية متعدد المنافذ مصنوعة من الألومنيوم المقوى لتبديد الحرارة، تتيح ربط اللابتوب بالشاشات الخارجية والكروت وقوارئ الكروت وشحن 100W.',
    mainImage: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80'
    ],
    specs: [
      { key: 'نوع المنفذ الرئيسي', value: 'USB Type-C / Thunderbolt 3 & 4' },
      { key: 'منفذ العرض', value: 'HDMI 4K @ 60Hz Ultra HD' },
      { key: 'منافذ USB', value: '3x USB 3.0 (5Gbps Transfer)' },
      { key: 'منفذ الشحن', value: 'Type-C Power Delivery 100W Pass-through' },
      { key: 'قوارئ الكروت', value: 'SD & MicroSD Card Reader Slot' },
      { key: 'مادة الصنع', value: 'سبيكة الألومنيوم الرمادي الفضائي' }
    ],
    compatibility: [
      'متوافق مع MacBook Pro / Air M1, M2, M3',
      'لابتوبات Dell XPS, HP Spectre, Lenovo ThinkPad, ASUS ZenBook',
      'الأجهزة اللوحية iPad Pro / iPad Air / Samsung Galaxy Tab S'
    ],
    isBestSeller: true,
    isNewArrival: false,
    rating: 4.8,
    reviewsCount: 52,
    createdAt: '2026-08-10'
  },
  {
    id: 'prod-4',
    name: 'وحدة تخزين سامسونج NVMe SSD 990 PRO سعة 1TB مع هيكل تبريد',
    partNumber: 'MZ-V9P1T0CW',
    category: 'storage',
    categoryName: 'فلاشات وتخزين',
    price: 4900,
    condition: 'new',
    stock: 8,
    lowStockThreshold: 4,
    description: 'أسرع هارد PCIe 4.0 NVMe SSD من سامسونج يصل لسرعات قراءة 7450 ميجابايت/ثانية مع مشتت حراري مدمج للحفاظ على أعلى أداء أثناء الضغط العالي.',
    mainImage: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800&auto=format&fit=crop&q=80'
    ],
    specs: [
      { key: 'السعة', value: '1TB (1000 Gigabytes)' },
      { key: 'سرعة القراءة المتتابعة', value: '7,450 MB/s' },
      { key: 'سرعة الكتابة المتتابعة', value: '6,900 MB/s' },
      { key: 'المواصفة الشكلية', value: 'M.2 2280 PCIe Gen 4.0 x4' },
      { key: 'التبريد', value: 'مشتت حراري مدمج Heatsink' },
      { key: 'الضمان', value: 'ضمان 5 سنوات أو 600 TBW' }
    ],
    compatibility: [
      'بلايستيشن 5 (PlayStation 5 Expansion Compatible)',
      'اللوحات الأم الحديثة بدعم M.2 NVMe PCIe 4.0 / 3.0',
      'لابتوبات الألعاب عالية الأداء'
    ],
    isBestSeller: true,
    isNewArrival: true,
    rating: 4.95,
    reviewsCount: 41,
    createdAt: '2026-09-25'
  },
  {
    id: 'prod-5',
    name: 'شاحن انكر GaNPrime 65W Type-C ثلاثي المنافذ جداري',
    partNumber: 'A2668G11',
    category: 'chargers',
    categoryName: 'شواحن وإكسسوارات',
    price: 1650,
    salePrice: 1450,
    condition: 'new',
    stock: 12,
    lowStockThreshold: 3,
    description: 'شاحن سريع نتريد الجاليوم (GaN) فائق الصغر بقوة 65 واط لشحن اللابتوب والموبايل والتابلت في نفس الوقت بسرعة فائقة وحماية كاملة.',
    mainImage: 'https://images.unsplash.com/photo-1622445268465-8438165a248a?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1622445268465-8438165a248a?w=800&auto=format&fit=crop&q=80'
    ],
    specs: [
      { key: 'القدرة الإجمالية', value: '65W Max' },
      { key: 'عدد المنافذ', value: '2x USB-C + 1x USB-A' },
      { key: 'تقنية الشحن', value: 'GaNPrime & PowerIQ 4.0' },
      { key: 'الحماية', value: 'ActiveShield 2.0 لمراقبة الحرارة 3 ملايين مرة يومياً' },
      { key: 'الوزن', value: '132 جرام (أصغر بنسبة 53% من الشواحن العادية)' }
    ],
    compatibility: [
      'شحن لابتوبات MacBook, Dell, HP, Lenovo 65W Type-C',
      'هواتف iPhone 15 / 16, Samsung S24 / S23 Ultra',
      'أجهزة iPad Pro والأجهزة اللوحية'
    ],
    isBestSeller: false,
    isNewArrival: true,
    rating: 4.7,
    reviewsCount: 19,
    createdAt: '2026-09-20'
  },
  {
    id: 'prod-6',
    name: 'لابتوب ديل Dell XPS 15 9520 (استيراد فرز أول لمس)',
    partNumber: 'XPS9520-7492SLV',
    category: 'laptops',
    categoryName: 'لابتوبات',
    price: 29500,
    salePrice: 28000,
    condition: 'imported',
    stock: 1,
    lowStockThreshold: 2,
    description: 'تحفة ديل الهندسية XPS 15 بشاشة 3.5K OLED لمس، معالج Core i7 الجيل 12، وكارت شاشة RTX 3050. شاسيه ألومنيوم كامل وألياف كربونية.',
    mainImage: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=80'
    ],
    specs: [
      { key: 'المعالج', value: 'Intel Core i7-12700H (14 Cores 20 Threads)' },
      { key: 'الرام', value: '32GB DDR5 4800MHz' },
      { key: 'التخزين', value: '1TB M.2 PCIe Gen4 SSD' },
      { key: 'الشاشة', value: '15.6" 3.5K (3456x2160) OLED Touchscreen' },
      { key: 'كارت الشاشة', value: 'NVIDIA GeForce RTX 3050 4GB GDDR6' },
      { key: 'الصوت', value: 'Quad-speaker design with Waves Nx 3D' }
    ],
    compatibility: [
      'برامج الجرافيك والمونتاج Adobe Premiere / After Effects / AutoCAD',
      'برمجة وتطوير الذكاء الاصطناعي',
      'محطات الشحن والتوصيل Thunderbolt 4'
    ],
    isBestSeller: true,
    isNewArrival: false,
    rating: 5.0,
    reviewsCount: 35,
    createdAt: '2026-07-14'
  },
  {
    id: 'prod-7',
    name: 'ماذربورد Gigabyte B650 AORUS ELITE AX (جديد AM5)',
    partNumber: 'B650 AORUS ELITE AX',
    category: 'motherboards',
    categoryName: 'لوحات أم',
    price: 9800,
    condition: 'new',
    stock: 5,
    lowStockThreshold: 3,
    description: 'اللوحة المثالية لمعالجات AMD Ryzen 7000 و 9000 بأسكوت AM5، مع مراحل طاقة قوية 14+2+1 لتشغيل مستقر وتبريد حراري متطور M.2 Thermal Guard.',
    mainImage: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80'
    ],
    specs: [
      { key: 'السوكيت (Socket)', value: 'AMD Socket AM5' },
      { key: 'الشريحة (Chipset)', value: 'AMD B650' },
      { key: 'دعم الذاكرة', value: '4x DDR5 Up to 8000MHz+ (EXPO Support)' },
      { key: 'منافذ M.2', value: '1x PCIe 5.0 M.2 + 2x PCIe 4.0 M.2' },
      { key: 'الشبكة واللاسلكي', value: '2.5GbE LAN & Wi-Fi 6E 802.11ax' }
    ],
    compatibility: [
      'معالجات AMD Ryzen 9000 / 8000 / 7000 Series',
      'ذواكر AMD EXPO DDR5',
      'كروت شاشة NVIDIA RTX 40 & AMD Radeon RX 7000'
    ],
    isBestSeller: false,
    isNewArrival: true,
    rating: 4.85,
    reviewsCount: 16,
    createdAt: '2026-09-29'
  },
  {
    id: 'prod-8',
    name: 'فلاشة سان ديسك Extreme PRO USB 3.2 سعة 256GB معدنية',
    partNumber: 'SDCZ880-256G-G46',
    category: 'storage',
    categoryName: 'فلاشات وتخزين',
    price: 1250,
    salePrice: 1050,
    condition: 'new',
    stock: 20,
    lowStockThreshold: 5,
    description: 'فلاشة فائقة السرعة تماثل أداء هارد SSD بحجم جيبك. سرعات نقل تصل لـ 420 ميجابايت/ثانية في هيكل معدني متين غير قابل للكسر.',
    mainImage: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800&auto=format&fit=crop&q=80'
    ],
    specs: [
      { key: 'السعة', value: '256GB Solid State Flash' },
      { key: 'سرعة القراءة', value: 'Up to 420 MB/s' },
      { key: 'سرعة الكتابة', value: 'Up to 380 MB/s' },
      { key: 'الواجهة', value: 'USB 3.2 Gen 1 (USB 3.0/2.0 Backward Compatible)' },
      { key: 'التشفير', value: 'تشفير بيانات SanDisk SecureAccess 128-bit AES' }
    ],
    compatibility: [
      'أجهزة الكمبيوتر واللابتوب منفذ USB-A',
      'أجهزة التلفزيون الذكية والسيارات والأجهزة الصوتية',
      'أنظمة Windows / macOS / Linux'
    ],
    isBestSeller: true,
    isNewArrival: false,
    rating: 4.9,
    reviewsCount: 67,
    createdAt: '2026-08-01'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-9821',
    trackingNumber: 'TH-2026-9821',
    customer: {
      fullName: 'أحمد محمود القاضي',
      phone: '01012345678',
      whatsappPhone: '01012345678',
      city: 'القاهرة - المعادي',
      address: 'شارع 9، عمارة 45، الشقة 12',
      notes: 'يرجى الاتصال قبل الوصول بساعة'
    },
    items: [
      { product: INITIAL_PRODUCTS[0], quantity: 1 },
      { product: INITIAL_PRODUCTS[2], quantity: 1 }
    ],
    totalAmount: 17899,
    shippingFee: 60,
    paymentMethod: 'cod',
    status: 'pending',
    createdAt: '2026-10-03T14:30:00Z',
    updatedAt: '2026-10-03T14:30:00Z'
  },
  {
    id: 'ORD-9820',
    trackingNumber: 'TH-2026-9820',
    customer: {
      fullName: 'مهندس حسام الشريف',
      phone: '01122334455',
      whatsappPhone: '01122334455',
      city: 'الإسكندرية - سموحة',
      address: 'شارع فوزي معاذ، برج الأطباء، الدور 5',
      notes: 'دفع عبر فودافون كاش'
    },
    items: [
      { product: INITIAL_PRODUCTS[1], quantity: 1 }
    ],
    totalAmount: 16960,
    shippingFee: 60,
    paymentMethod: 'vodafone_cash',
    status: 'shipped',
    createdAt: '2026-10-02T10:15:00Z',
    updatedAt: '2026-10-03T09:00:00Z'
  }
];
