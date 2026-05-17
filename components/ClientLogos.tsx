'use client';

import { useI18n } from '@/app/providers';

function Plate({ name }: { name: string }) {
  return (
    <div className="shrink-0 mx-3 flex items-center gap-3 rounded-xl border border-gold/15 bg-ink-800/60 px-7 py-5">
      <span className="grid place-items-center w-9 h-9 rounded-full border border-gold/40 text-gold text-sm numeral">
        {name.trim().charAt(0)}
      </span>
      <span className="whitespace-nowrap text-bone/70 text-sm tracking-wide">{name}</span>
    </div>
  );
}

export default function ClientLogos() {
  const { dict } = useI18n();
  const plates = [...dict.clients.names, ...dict.clients.names];

  return (
    <section className="relative py-16">
      <div className="container mx-auto px-6 lg:px-10">
        <p className="text-center text-xs tracking-[0.3em] text-bone/45 mb-10 uppercase">
          {dict.clients.title}
        </p>
      </div>
      <div className="marquee-wrap overflow-hidden">
        <div className="marquee-track">
          {plates.map((n, i) => (
            <Plate key={`${n}-${i}`} name={n} />
          ))}
        </div>
      </div>
    </section>
  );
}
