'use client';

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useI18n } from '@/app/providers';

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 1.8, ease: [0.2, 0.7, 0.2, 1] });
    return controls.stop;
  }, [inView, to, mv]);

  return (
    <span ref={ref} className="numeral stat-num text-5xl sm:text-6xl text-gold-gradient">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function Stats() {
  const { dict } = useI18n();
  const items = [
    { value: 9, suffix: '+', label: dict.stats.years },
    { value: 350, suffix: '+', label: dict.stats.cases },
    { value: 200, suffix: '+', label: dict.stats.clients },
    { value: 96, suffix: '%', label: dict.stats.rate },
  ];

  return (
    <section className="relative py-20">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="card-elite p-10 lg:p-14 relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-50"
            style={{
              background:
                'radial-gradient(circle at 20% 0%, rgba(212,175,55,0.18), transparent 50%), radial-gradient(circle at 80% 100%, rgba(201,169,97,0.10), transparent 50%)',
            }}
          />
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            {items.map((it, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <Counter to={it.value} suffix={it.suffix} />
                <div className="text-bone/65 text-sm tracking-wide">{it.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
