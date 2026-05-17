'use client';

import { motion } from 'framer-motion';

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'start';
}) {
  return (
    <div className={`max-w-3xl mx-auto ${align === 'center' ? 'text-center' : 'text-start'} mb-14`}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6 }}
        className={`eyebrow ${align === 'center' ? 'mx-auto' : ''}`}
      >
        {eyebrow}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="numeral text-4xl sm:text-5xl lg:text-6xl text-bone mt-4 leading-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-bone/65 mt-5 text-lg"
        >
          {subtitle}
        </motion.p>
      )}
      <div className="hairline mt-8 w-40 mx-auto" />
    </div>
  );
}
