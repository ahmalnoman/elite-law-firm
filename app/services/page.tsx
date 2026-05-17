import type { Metadata } from 'next';
import ServicesContent from '@/components/ServicesContent';

export const metadata: Metadata = {
  title: 'مجالات الممارسة · Practice Areas',
  description:
    'خدماتنا القانونية بالتفصيل: القانون التجاري والشركات، التقاضي والتحكيم، الأحوال الشخصية، العقارات والاستثمار، القانون الجنائي والدولي — مكتب محاماة النخبة بالقاهرة. Detailed legal practice areas at Elite Law Firm, Cairo.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'مجالات الممارسة — مكتب محاماة النخبة | Practice Areas — Elite Law Firm',
    description:
      'ست تخصّصات قانونية وفريق واحد متفرّغ. Six legal disciplines, one dedicated team — corporate, litigation, arbitration, personal status, real estate, criminal and international.',
    url: '/services',
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
