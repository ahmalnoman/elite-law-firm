'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useI18n } from '@/app/providers';
import Icon from './Icon';

export default function Hero() {
  const { dict, locale } = useI18n();

  return (
    <section id="top" className="relative min-h-[100svh] flex items-center overflow-hidden pt-32 pb-24">
      {/* ambient gold spotlights */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(212,175,55,0.18), transparent 60%), radial-gradient(40% 30% at 80% 80%, rgba(201,169,97,0.10), transparent 70%)',
        }}
      />
      <div className="noise" />

      {/* Big watermark logo behind */}
      <div
        aria-hidden
        className="absolute inset-0 grid place-items-center opacity-[0.045] pointer-events-none"
      >
        <Image src="/logo.png" alt="" width={900} height={900} className="w-[80vmin] h-auto" priority />
      </div>

      <div className="container relative mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 items-center">
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <div className="eyebrow mb-6">{dict.hero.eyebrow}</div>

          <h1 className="numeral text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] leading-[1.05] text-bone">
            {dict.hero.title1}{' '}
            <span className="text-gold-gradient italic">{dict.hero.titleAccent}</span>
            <br />
            {dict.hero.title2}
          </h1>

          <p className="mt-7 text-lg lg:text-xl text-bone/70 max-w-2xl leading-relaxed">
            {dict.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="btn-gold">
              {dict.hero.primaryCta}
              <Icon name="arrow" className={locale === 'ar' ? 'rotate-180' : ''} size={18} />
            </Link>
            <Link href="/services" className="btn-ghost">
              {dict.hero.secondaryCta}
            </Link>
          </div>

          {/* Trust strip */}
          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 text-xs text-bone/55 tracking-widest">
            {dict.hero.trust.map((t, i) => (
              <span key={t} className="flex items-center gap-x-8">
                {i === 0 ? `★ ${t}` : t}
                {i < dict.hero.trust.length - 1 && (
                  <span className="hidden sm:inline text-bone/30">|</span>
                )}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right: emblem card */}
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <div className="relative mx-auto max-w-md card-elite p-10 text-center">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-ink border border-gold/40 text-[11px] tracking-[0.3em] text-gold">
              {dict.brand.est}
            </div>
            <div className="mx-auto w-44 h-44 relative grid place-items-center animate-floaty">
              <div className="absolute inset-0 rounded-full bg-gold/10 blur-2xl" />
              <Image src="/logo.png" alt="Elite Law Firm" width={300} height={170} className="relative z-10 w-full h-auto" />
            </div>
            <div className="ornament my-6 text-[10px] tracking-[0.35em]">{dict.brand.monogram}</div>
            <p className="text-bone/70 leading-relaxed">
              {locale === 'ar'
                ? 'الميزان عهدنا، والغار وسامُنا — والثقة لغتنا الأولى.'
                : 'The scales are our covenant, the laurel our honour — trust, our first language.'}
            </p>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute inset-x-0 bottom-6 mx-auto w-fit flex flex-col items-center gap-2 text-[11px] tracking-[0.3em] text-bone/55 hover:text-gold transition"
      >
        <span className="cue" />
        <span>{dict.hero.scrollHint}</span>
      </a>
    </section>
  );
}
