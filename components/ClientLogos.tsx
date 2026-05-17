'use client';

import Image from 'next/image';
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

// Each group holds the unique set once. The CSS sizes a group to at least the
// viewport (min-width:100vw) so two identical groups + a -50% shift loop
// seamlessly with no gap, while keeping the track small enough for iOS Safari
// (the old 48-tile track exceeded mobile GPU layer limits and froze).
const GROUP = CLIENTS;

function LogoTile({ client }: { client: Client }) {
  return (
    <div className="shrink-0 select-none">
      <div className="relative h-20 w-40 sm:h-24 sm:w-48 rounded-xl border border-gold/25 bg-bone shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] ring-1 ring-gold/10 transition duration-300 hover:border-gold/55 hover:ring-gold/30 hover:-translate-y-0.5">
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

function Group({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {GROUP.map((c, i) => (
        <LogoTile key={`${c.file}-${i}`} client={c} />
      ))}
    </div>
  );
}

export default function ClientLogos() {
  const { dict } = useI18n();

  return (
    <section className="relative py-16">
      <div className="container mx-auto px-6 lg:px-10">
        <p className="text-center text-xs tracking-[0.3em] text-bone/45 mb-10 uppercase">
          {dict.clients.title}
        </p>
      </div>
      <div className="marquee-wrap overflow-hidden">
        <div className="marquee-track">
          <Group />
          <Group hidden />
        </div>
      </div>
    </section>
  );
}
