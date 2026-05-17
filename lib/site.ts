// Single source of truth for SEO / structured data.
// IMPORTANT: keep these facts accurate and identical to what is shown on the
// site and on Google Business Profile — consistent NAP (name, address, phone)
// is what drives local search ranking.

export const SITE = {
  url: 'https://elite-law.net',

  nameEn: 'Elite Law Firm',
  nameAr: 'مكتب محاماة النخبة',

  descriptionAr:
    'مكتب محاماة النخبة — مكتب محاماة رائد في القاهرة منذ ٢٠١٧: القانون التجاري والشركات، التقاضي والتحكيم، الأحوال الشخصية، العقارات، والقانون الجنائي والدولي.',
  descriptionEn:
    'Elite Law Firm — a premier Cairo law firm since 2017: corporate & commercial, litigation & arbitration, personal status, real estate, criminal and international practice.',

  phone: '+201146108044',
  email: 'info@elite-law.net',

  // VERIFY these match your real office details before relying on local SEO.
  streetAddress: 'Nile Tower, Corniche El Nil, Garden City',
  addressLocality: 'Cairo',
  addressRegion: 'Cairo Governorate',
  postalCode: '',
  addressCountry: 'EG',
  geo: { lat: 30.1055267, lng: 31.3689567 },

  mapUrl: 'https://maps.app.goo.gl/sfVgV5yHc85f9Abi8',
  foundingYear: 2017,
  // Schema.org opening-hours short form (Su–Th, 09:00–19:00).
  openingHours: 'Su-Th 09:00-19:00',
  priceRange: '$$$',
  languages: ['ar', 'en'],

  // Add real social / directory profiles here when available — they feed the
  // Knowledge Panel via schema "sameAs".
  sameAs: [] as string[],
} as const;
