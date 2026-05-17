import type { Metadata } from 'next';
import { Space_Grotesk, Inter, Almarai, Aref_Ruqaa } from 'next/font/google';
import { I18nProvider } from './providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
  metadataBase: new URL('https://elite-law.net'),
  title: 'مكتب محاماة النخبة | Elite Law Firm — Since 2017',
  description:
    'مكتب محاماة النخبة — Premier law firm in Cairo since 2017. Corporate, litigation, arbitration and personal status counsel for discerning clients.',
  keywords: [
    'مكتب محاماة النخبة',
    'محاماة القاهرة',
    'محامي تجاري',
    'تحكيم دولي',
    'أحوال شخصية',
    'Elite Law',
    'Cairo law firm',
    'corporate lawyer Egypt',
    'litigation specialist',
  ],
  openGraph: {
    title: 'Elite Law Firm — Premier counsel since 2017',
    description: 'Distinguished legal counsel from Cairo to the world. مكتب محاماة النخبة.',
    type: 'website',
    images: ['/logo.png'],
  },
  icons: { icon: '/logo.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${spaceGrotesk.variable} ${inter.variable} ${almarai.variable} ${arefRuqaa.variable}`}
    >
      <body>
        <I18nProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
