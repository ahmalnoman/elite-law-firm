import type { Metadata } from 'next';
import { Cormorant_Garamond, Tajawal } from 'next/font/google';
import { I18nProvider } from './providers';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '700', '800'],
  variable: '--font-tajawal',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'مكتب محاماة النخبة | Elite Law Firm — Since 1995',
  description:
    'مكتب محاماة النخبة — Premier law firm in Cairo since 1995. Corporate, litigation, arbitration and personal status counsel for discerning clients.',
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
    title: 'Elite Law Firm — Premier counsel since 1995',
    description: 'Distinguished legal counsel from Cairo to the world. مكتب محاماة النخبة.',
    type: 'website',
    images: ['/logo.png'],
  },
  icons: { icon: '/logo.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${cormorant.variable} ${tajawal.variable}`}>
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
