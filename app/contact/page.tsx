import type { Metadata } from 'next';
import Contact from '@/components/Contact';

export const metadata: Metadata = {
  title: 'تواصل معنا · Contact',
  description:
    'احجز استشارتك القانونية الأولى مجاناً مع مكتب محاماة النخبة بالقاهرة — هاتف وواتساب +20 11 4610 8044. Book a free first legal consultation with Elite Law Firm, Cairo.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'تواصل معنا — مكتب محاماة النخبة | Contact — Elite Law Firm',
    description:
      'أول استشارة مجانية والسريّة مضمونة. Your first consultation is complimentary and confidential — call, WhatsApp, or book online.',
    url: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="pt-28 lg:pt-32">
      <Contact />
    </div>
  );
}
