'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/app/providers';

const MAP_LINK = 'https://maps.app.goo.gl/sfVgV5yHc85f9Abi8';

export default function Footer() {
  const { dict, locale } = useI18n();
  const pathname = usePathname();
  const onHome = pathname === '/';
  const anchor = (id: string) => (onHome ? `#${id}` : `/#${id}`);
  const mapEmbed = `https://maps.google.com/maps?q=30.1055267,31.3689567&z=16&hl=${locale}&output=embed`;

  return (
    <footer className="relative border-t border-gold/15 mt-24">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
      />
      <div className="container mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3">
          <div className="flex items-center gap-4 mb-6">
            <span className="relative inline-flex items-center justify-center w-[72px] h-[72px] rounded-full bg-ink/70 ring-1 ring-gold/40">
              <Image src="/logo.png" alt={dict.brand.name} width={72} height={72} className="object-contain p-2" />
            </span>
            <div>
              <div className="numeral text-xl text-bone">{dict.brand.name}</div>
              <div className="text-[11px] tracking-[0.3em] text-gold">{dict.brand.since}</div>
            </div>
          </div>
          <p className="text-bone/60 leading-relaxed max-w-xs">{dict.footer.tagline}</p>
        </div>

        <div className="lg:col-span-2">
          <h4 className="numeral text-gold text-sm tracking-[0.3em] mb-5 uppercase">{dict.footer.quickLinks}</h4>
          <ul className="space-y-2 text-bone/70">
            <li><Link className="hover:text-gold transition" href={anchor('about')}>{dict.nav.about}</Link></li>
            <li><Link className="hover:text-gold transition" href="/services">{dict.nav.services}</Link></li>
            <li><Link className="hover:text-gold transition" href={anchor('cases')}>{dict.nav.cases}</Link></li>
            <li><Link className="hover:text-gold transition" href={anchor('testimonials')}>{dict.nav.testimonials}</Link></li>
            <li><Link className="hover:text-gold transition" href="/contact">{dict.nav.contact}</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="numeral text-gold text-sm tracking-[0.3em] mb-5 uppercase">{dict.footer.practice}</h4>
          <ul className="space-y-2 text-bone/70">
            {dict.services.items.map((s) => (
              <li key={s.title}>{s.title}</li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h4 className="numeral text-gold text-sm tracking-[0.3em] mb-5 uppercase">{dict.footer.visit}</h4>
          <a
            href={MAP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-bone/70 leading-relaxed hover:text-gold transition"
          >
            {dict.footer.address}
          </a>
          <a
            href={`tel:${dict.footer.phoneHref}`}
            className="block text-bone/70 mt-3 hover:text-gold transition"
            dir="ltr"
          >
            {dict.footer.phone}
          </a>
          <a
            href={`https://wa.me/${dict.footer.phoneHref.replace(/[^\d]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-bone/70 hover:text-gold transition"
            dir="ltr"
          >
            {dict.footer.whatsapp}
          </a>
          <a
            href={`mailto:${dict.footer.email}`}
            className="block text-bone/70 hover:text-gold transition"
            dir="ltr"
          >
            {dict.footer.email}
          </a>

          <a
            href={MAP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${dict.footer.visit} — ${dict.footer.address}`}
            className="group relative mt-5 block rounded-xl overflow-hidden border border-gold/20 ring-1 ring-gold/10 max-w-sm"
          >
            <iframe
              src={mapEmbed}
              title="Elite Law Firm — location"
              className="w-full h-[140px] pointer-events-none"
              style={{
                filter: 'grayscale(0.35) invert(0.92) contrast(0.95) hue-rotate(180deg)',
                opacity: 0.9,
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <span
              aria-hidden
              className="absolute inset-0 ring-1 ring-inset ring-gold/10 group-hover:ring-gold/40 transition"
            />
          </a>
        </div>
      </div>

      <div className="border-t border-gold/10">
        <div className="container mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-bone/45">
          <div>© {new Date().getFullYear()} {dict.footer.rights}</div>
          <div className="ornament text-[10px] tracking-[0.4em]">{dict.brand.monogramYear}</div>
        </div>
      </div>
    </footer>
  );
}
