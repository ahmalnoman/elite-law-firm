'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useI18n } from '@/app/providers';
import SectionHeader from '@/components/SectionHeader';
import Icon from '@/components/Icon';

export default function ServicesContent() {
  const { dict } = useI18n();
  const d = dict.servicesDetail;

  return (
    <div className="pt-28 lg:pt-32 pb-24">
      <div className="container mx-auto px-6 lg:px-10">
        <SectionHeader eyebrow={d.eyebrow} title={d.title} subtitle={d.subtitle} />

        <div className="space-y-8 max-w-5xl mx-auto">
          {d.items.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="card-elite p-8 lg:p-10 grid lg:grid-cols-12 gap-8"
            >
              <div className="lg:col-span-4">
                <div className="relative w-14 h-14 rounded-xl grid place-items-center mb-5 bg-ink-800 ring-1 ring-gold/25">
                  <Icon name={s.icon as any} className="text-gold" size={26} />
                </div>
                <div className="numeral text-xs text-gold tracking-[0.4em] mb-2">0{i + 1}</div>
                <h2 className="numeral text-3xl text-bone leading-snug">{s.title}</h2>
                <p className="text-bone/70 mt-4 leading-relaxed">{s.intro}</p>
              </div>

              <div className="lg:col-span-8">
                <p className="text-bone/75 leading-relaxed text-[15px]">{s.body}</p>
                <div className="hairline my-6 opacity-50" />
                <div className="text-xs uppercase tracking-widest text-gold mb-4">
                  {d.whatWeHandle}
                </div>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-bone/70 text-[15px]">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="card-elite mt-16 p-10 text-center max-w-3xl mx-auto">
          <h3 className="numeral text-3xl text-bone mb-3">{d.ctaTitle}</h3>
          <p className="text-bone/65 mb-7">{d.ctaBody}</p>
          <Link href="/contact" className="btn-gold">
            {d.ctaButton}
            <Icon name="arrow" size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
