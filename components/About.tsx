'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useI18n } from '@/app/providers';

export default function About() {
  const { dict } = useI18n();
  const pillars = [
    { title: dict.about.pillar1Title, body: dict.about.pillar1Body },
    { title: dict.about.pillar2Title, body: dict.about.pillar2Body },
    { title: dict.about.pillar3Title, body: dict.about.pillar3Body },
  ];

  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-14 items-center">
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden card-elite">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, #2a2a2a 0%, #121212 60%, #0a0a0a 100%)',
              }}
            />
            <div className="absolute inset-0 grid place-items-center">
              <Image src="/logo.png" alt="Elite" width={420} height={240} className="opacity-90 w-3/4 h-auto" />
            </div>
            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-ink to-transparent">
              <div className="ornament text-[10px] tracking-[0.35em]">EST · MCMXCV</div>
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-7">
          <div className="eyebrow mb-4">{dict.about.eyebrow}</div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="numeral text-4xl lg:text-5xl xl:text-6xl text-bone leading-tight"
          >
            {dict.about.title}
          </motion.h2>

          <div className="hairline my-8 w-32" />

          <div className="space-y-5 text-bone/75 text-lg leading-relaxed">
            <p>{dict.about.p1}</p>
            <p>{dict.about.p2}</p>
            <p>{dict.about.p3}</p>
          </div>

          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="card-elite p-5"
              >
                <div className="numeral text-3xl text-gold-gradient mb-2">0{i + 1}</div>
                <h3 className="text-bone text-base font-semibold mb-2">{p.title}</h3>
                <p className="text-bone/60 text-sm leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
