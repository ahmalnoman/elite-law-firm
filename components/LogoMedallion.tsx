'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function LogoMedallion() {
  const [paused, setPaused] = useState(false);
  const stage = useRef<HTMLDivElement>(null);

  const rx = useSpring(useMotionValue(0), { stiffness: 110, damping: 13, mass: 0.4 });
  const ry = useSpring(useMotionValue(0), { stiffness: 110, damping: 13, mass: 0.4 });
  const scale = useSpring(useMotionValue(1), { stiffness: 160, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    const el = stage.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 30);
    rx.set(-py * 30);
  };

  const enter = () => {
    setPaused(true);
    scale.set(1.05);
  };
  const leave = () => {
    setPaused(false);
    rx.set(0);
    ry.set(0);
    scale.set(1);
  };

  return (
    <div
      ref={stage}
      className="medallion-stage relative mx-auto aspect-square w-[18rem] sm:w-[22rem] lg:w-[24rem]"
      onPointerEnter={enter}
      onPointerLeave={leave}
      onPointerMove={onMove}
    >
      <div className="medallion-glow" aria-hidden />
      <div className="medallion-halo" aria-hidden />
      <div className="medallion-ring inset-[-3%]" aria-hidden />
      <div className="medallion-ring inset-[4%] opacity-60" aria-hidden />

      <motion.div
        className="absolute inset-[8%]"
        style={{ rotateX: rx, rotateY: ry, scale, transformStyle: 'preserve-3d' }}
      >
        <div className={`medallion-spin h-full w-full ${paused ? 'is-paused' : ''}`}>
          <div className="medallion-edge" aria-hidden />

          <div className="medallion-face" style={{ transform: 'translateZ(11px)' }}>
            <Image
              src="/logo.png"
              alt="Elite Law Firm"
              width={320}
              height={190}
              priority
              className="w-[62%] h-auto drop-shadow-[0_6px_22px_rgba(212,175,55,0.4)]"
            />
            <div className="medallion-sheen" aria-hidden />
          </div>

          <div
            className="medallion-face medallion-face--back"
            style={{ transform: 'rotateY(180deg) translateZ(11px)' }}
          >
            <Image
              src="/logo.png"
              alt=""
              width={320}
              height={190}
              className="w-[62%] h-auto opacity-60 [filter:grayscale(0.5)_sepia(0.6)_brightness(0.85)]"
            />
            <div className="medallion-sheen" aria-hidden />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
