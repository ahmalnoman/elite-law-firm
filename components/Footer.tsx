'use client';

import Image from 'next/image';
import { useI18n } from '@/app/providers';

export default function Footer() {
  const { dict } = useI18n();
  return (
    <footer className="relative border-t border-gold/15 mt-24">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
      />
      <div className="container mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3 mb-6">
            <Image src="/logo.png" alt="" width={48} height={48} className="opacity-95" />
            <div>
              <div className="numeral text-lg text-bone">Elite Law Firm</div>
              <div className="text-[11px] tracking-[0.3em] text-gold">SINCE 1995</div>
            </div>
          </div>
          <p className="text-bone/60 leading-relaxed max-w-xs">{dict.footer.tagline}</p>
        </div>

        <div className="lg:col-span-3">
          <h4 className="numeral text-gold text-sm tracking-[0.3em] mb-5 uppercase">{dict.footer.quickLinks}</h4>
          <ul className="space-y-2 text-bone/70">
            <li><a className="hover:text-gold transition" href="#about">{dict.nav.about}</a></li>
            <li><a className="hover:text-gold transition" href="#services">{dict.nav.services}</a></li>
            <li><a className="hover:text-gold transition" href="#cases">{dict.nav.cases}</a></li>
            <li><a className="hover:text-gold transition" href="#testimonials">{dict.nav.testimonials}</a></li>
            <li><a className="hover:text-gold transition" href="#contact">{dict.nav.contact}</a></li>
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

        <div className="lg:col-span-2">
          <h4 className="numeral text-gold text-sm tracking-[0.3em] mb-5 uppercase">{dict.footer.visit}</h4>
          <p className="text-bone/70 leading-relaxed">{dict.footer.address}</p>
          <p className="text-bone/70 mt-3" dir="ltr">{dict.footer.phone}</p>
          <p className="text-bone/70" dir="ltr">{dict.footer.email}</p>
        </div>
      </div>

      <div className="border-t border-gold/10">
        <div className="container mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-bone/45">
          <div>© {new Date().getFullYear()} {dict.footer.rights}</div>
          <div className="ornament text-[10px] tracking-[0.4em]">EL · LF · MMXXVI</div>
        </div>
      </div>
    </footer>
  );
}
