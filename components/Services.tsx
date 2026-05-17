'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/app/providers';
import SectionHeader from './SectionHeader';
import Icon from './Icon';

export default function Services() {
  const { dict } = useI18n();

  return (
    <section id="services" className="relative py-24 lg:py-32 border-t border-gold/10">
      <div className="container mx-auto px-6 lg:px-10">
        <SectionHeader eyebrow={dict.services.eyebrow} title={dict.services.title} subtitle={dict.services.subtitle} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dict.services.items.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: (i % 3) * 0.08 }}
              className="card-elite p-7 group"
            >
              <div className="relative w-14 h-14 rounded-xl grid place-items-center mb-6 bg-ink-800 ring-1 ring-gold/25 group-hover:ring-gold transition">
                <span className="absolute inset-0 rounded-xl bg-gold/10 blur-xl opacity-0 group-hover:opacity-100 transition" />
                <Icon name={s.icon as any} className="text-gold relative z-10" size={26} />
              </div>
              <div className="numeral text-xs text-gold tracking-[0.4em] mb-2">0{i + 1}</div>
              <h3 className="numeral text-2xl text-bone mb-3 leading-snug">{s.title}</h3>
              <p className="text-bone/65 text-[15px] leading-relaxed">{s.body}</p>
              <div className="hairline mt-6 opacity-50" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
