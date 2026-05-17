'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/app/providers';
import SectionHeader from './SectionHeader';

export default function Cases() {
  const { dict } = useI18n();

  return (
    <section id="cases" className="relative py-24 lg:py-32 border-t border-gold/10">
      <div className="container mx-auto px-6 lg:px-10">
        <SectionHeader eyebrow={dict.cases.eyebrow} title={dict.cases.title} subtitle={dict.cases.subtitle} />

        <div className="grid lg:grid-cols-3 gap-6">
          {dict.cases.items.map((c, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="card-elite p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] tracking-[0.3em] text-gold border border-gold/40 rounded-full px-3 py-1">
                  {c.tag}
                </span>
                <span className="numeral text-3xl text-gold/40">#{(i + 1).toString().padStart(2, '0')}</span>
              </div>
              <h3 className="numeral text-2xl text-bone leading-snug mb-4">{c.title}</h3>
              <p className="text-bone/65 text-[15px] leading-relaxed flex-1">{c.body}</p>
              <div className="hairline my-6" />
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-gold animate-glow" />
                <span className="text-gold tracking-wide">{c.outcome}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
