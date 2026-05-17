import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import ClientLogos from '@/components/ClientLogos';
import About from '@/components/About';
import Services from '@/components/Services';
import Cases from '@/components/Cases';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ClientLogos />
      <About />
      <Services />
      <Cases />
      <Testimonials />
    </>
  );
}
