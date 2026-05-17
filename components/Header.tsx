'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useI18n } from '@/app/providers';
import LanguageToggle from './LanguageToggle';
import Icon from './Icon';

export default function Header() {
  const { dict } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onHome = pathname === '/';
  const anchor = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  const links = [
    { href: anchor('about'), label: dict.nav.about },
    { href: '/services', label: dict.nav.services },
    { href: anchor('cases'), label: dict.nav.cases },
    { href: anchor('testimonials'), label: dict.nav.testimonials },
    { href: '/contact', label: dict.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ink/85 backdrop-blur-xl border-b border-gold/15 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-10 flex items-center justify-between gap-6">
        <Link href={onHome ? '#top' : '/'} className="flex items-center gap-3 group">
          <span className="relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-ink/70 ring-1 ring-gold/40 group-hover:ring-gold transition">
            <Image
              src="/logo.png"
              alt={dict.brand.name}
              width={48}
              height={48}
              className="object-contain p-1.5"
              priority
            />
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="numeral text-bone text-lg tracking-wide">{dict.brand.name}</span>
            <span className="text-[11px] text-gold tracking-[0.25em]">{dict.brand.since}</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative px-4 py-2 text-bone/80 hover:text-bone transition group"
            >
              {l.label}
              <span className="absolute inset-x-4 bottom-1 h-px bg-gold scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageToggle compact />
          <Link href="/contact" className="btn-gold !py-2.5 !px-5 text-sm">
            {dict.nav.book}
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="menu"
          className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-gold/30 text-gold"
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-500 ${
          open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-6 pt-4 pb-6 flex flex-col gap-2 bg-ink/95 backdrop-blur-xl border-t border-gold/15">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-bone/85 border-b border-gold/10 last:border-0"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex items-center justify-between mt-3">
            <LanguageToggle compact />
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-gold !py-2.5 !px-5 text-sm">
              {dict.nav.book}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
