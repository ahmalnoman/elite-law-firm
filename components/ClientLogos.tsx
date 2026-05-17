'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useI18n } from '@/app/providers';

type Client = { file: string; name: string };

const CLIENTS: Client[] = [
  { file: 'scslogo.png', name: 'SCS Logistics' },
  { file: 'Deutsche-Kraftlogo.png', name: 'Deutsche Kraft' },
  { file: 'GTE-Engineerin-And-Technical-Design-logo.png', name: 'GTE Engineering & Technical Design' },
  { file: 'lindacorlogo.png', name: 'Linda Cor' },
  { file: 'easywaylogo.png', name: 'Easyway' },
  { file: 'hrblogo.png', name: 'HRB' },
  { file: 'shakoshylogo.png', name: 'Shakoshy' },
  { file: 'kaiiznlogo.png', name: 'Kaiizn' },
];

// 3 copies → CSS shifts exactly one copy (-33.3333%) for a seamless loop.
// Track stays ~4.5–5.5k px wide — safely under iOS Safari's GPU layer limit
// (the previous 10k px track silently froze on iPhone).
const TRACK = [...CLIENTS, ...CLIENTS, ...CLIENTS];

function LogoTile({ client }: { client: Client }) {
  return (
    <div className="shrink-0 mx-4 select-none">
      <div className="relative h-20 w-40 sm:h-24 sm:w-48 rounded-xl border border-gold/25 bg-bone shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] ring-1 ring-gold/10 transition duration-300 hover:border-gold/55 hover:ring-gold/30">
        <Image
          src={`/clients/${client.file}`}
          alt={client.name}
          fill
          sizes="(max-width: 640px) 160px, 192px"
          className="object-contain p-4 sm:p-5"
        />
      </div>
    </div>
  );
}

export default function ClientLogos() {
  const { dict } = useI18n();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <section className="relative py-16">
      <div className="container mx-auto px-6 lg:px-10">
        <p className="text-center text-xs tracking-[0.3em] text-bone/45 mb-10 uppercase">
          {dict.clients.title}
        </p>
      </div>

      {reducedMotion ? (
        // Accessibility: no auto-scroll. One clean static, centred set —
        // each logo appears exactly once, never duplicated.
        <div className="container mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap justify-center gap-5">
            {CLIENTS.map((c) => (
              <LogoTile key={c.file} client={c} />
            ))}
          </div>
        </div>
      ) : (
        <div className="marquee-wrap overflow-hidden">
          <div className="marquee-track">
            {TRACK.map((c, i) => (
              <LogoTile key={`${c.file}-${i}`} client={c} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
