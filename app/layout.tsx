import type { Metadata } from 'next';
import { Space_Grotesk, Inter, Almarai, Aref_Ruqaa } from 'next/font/google';
import { I18nProvider } from './providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE } from '@/lib/site';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const almarai = Almarai({
  subsets: ['arabic'],
  weight: ['300', '400', '700', '800'],
  variable: '--font-almarai',
  display: 'swap',
});

const arefRuqaa = Aref_Ruqaa({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-ruqaa',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'مكتب محاماة النخبة | Elite Law Firm — محاماة في القاهرة منذ ٢٠١٧',
    template: '%s | مكتب محاماة النخبة — Elite Law Firm',
  },
  description: `${SITE.descriptionAr} ${SITE.descriptionEn}`,
  applicationName: SITE.nameEn,
  authors: [{ name: SITE.nameEn, url: SITE.url }],
  creator: SITE.nameEn,
  publisher: SITE.nameEn,
  category: 'Legal',
  keywords: [
    'مكتب محاماة النخبة',
    'محامي القاهرة',
    'مكتب محاماة في مصر',
    'محامي تجاري',
    'محامي شركات',
    'تقاضي وتحكيم',
    'تحكيم دولي',
    'أحوال شخصية',
    'محامي عقارات',
    'محامي جنائي',
    'استشارات قانونية القاهرة',
    'Elite Law Firm',
    'Cairo law firm',
    'lawyer in Cairo',
    'corporate lawyer Egypt',
    'litigation and arbitration Egypt',
    'family law Egypt',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Elite Law Firm — مكتب محاماة النخبة',
    url: SITE.url,
    locale: 'ar_EG',
    alternateLocale: 'en_US',
    title: 'مكتب محاماة النخبة | Elite Law Firm — القاهرة منذ ٢٠١٧',
    description: SITE.descriptionAr,
    // og:image is provided automatically by app/opengraph-image.tsx
  },
  twitter: {
    card: 'summary_large_image',
    title: 'مكتب محاماة النخبة | Elite Law Firm',
    description: SITE.descriptionAr,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: { icon: '/logo.png', shortcut: '/logo.png', apple: '/logo.png' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  '@id': `${SITE.url}/#legalservice`,
  name: SITE.nameEn,
  alternateName: SITE.nameAr,
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  image: `${SITE.url}/logo.png`,
  description: SITE.descriptionEn,
  telephone: SITE.phone,
  email: SITE.email,
  priceRange: SITE.priceRange,
  foundingDate: String(SITE.foundingYear),
  knowsLanguage: SITE.languages,
  areaServed: { '@type': 'Country', name: 'Egypt' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.streetAddress,
    addressLocality: SITE.addressLocality,
    addressRegion: SITE.addressRegion,
    addressCountry: SITE.addressCountry,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: SITE.geo.lat,
    longitude: SITE.geo.lng,
  },
  hasMap: SITE.mapUrl,
  openingHours: SITE.openingHours,
  sameAs: SITE.sameAs,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${spaceGrotesk.variable} ${inter.variable} ${almarai.variable} ${arefRuqaa.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <I18nProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
