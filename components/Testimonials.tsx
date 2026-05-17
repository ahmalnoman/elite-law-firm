'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useI18n } from '@/app/providers';
import SectionHeader from './SectionHeader';

export default function Testimonials() {
  const { dict } = useI18n();
  const [i, setI] = useState(0);
  const items = dict.testimonials.items;

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % items.length), 7000);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <section id="testimonials" className="relative py-24 lg:py-32 border-t border-gold/10">
      <div className="container mx-auto px-6 lg:px-10">
        <SectionHeader eyebrow={dict.testimonials.eyebrow} title={dict.testimonials.title} />

        <div className="max-w-4xl mx-auto card-elite p-10 lg:p-16 relative overflow-hidden">
          {/* Decorative quotation mark */}
          <div className="absolute -top-4 start-8 numeral text-[8rem] leading-none text-gold/15 select-none pointer-events-none">
            ”
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55 }}
              className="relative z-10"
            >
              <p className="numeral text-2xl lg:text-3xl text-bone leading-relaxed">
                “{items[i].quote}”
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold-gradient grid place-items-center text-ink font-bold">
                  {items[i].name.charAt(0)}
                </div>
                <div>
                  <div className="text-bone font-medium">{items[i].name}</div>
                  <div className="text-bone/55 text-sm">{items[i].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* dots */}
          <div className="flex justify-center gap-2 mt-10">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Testimonial ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-10 bg-gold' : 'w-3 bg-gold/30'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
