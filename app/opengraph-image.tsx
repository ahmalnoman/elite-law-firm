import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const runtime = 'nodejs';
export const alt = 'مكتب محاماة النخبة — Elite Law Firm';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// NOTE: text is kept Latin/numeric on purpose — the OG image renderer (Satori)
// does not shape Arabic glyphs. The Arabic identity is delivered via og:title /
// og:description, which WhatsApp/Facebook render as the caption text.
export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), 'public', 'logo.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background:
              'radial-gradient(60% 60% at 50% 28%, rgba(212,175,55,0.24), transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 24,
            display: 'flex',
            border: '1px solid rgba(201,169,97,0.35)',
            borderRadius: 16,
          }}
        />

        <img src={logoSrc} width={420} height={250} alt="" style={{ objectFit: 'contain' }} />

        <div
          style={{
            display: 'flex',
            width: 300,
            height: 2,
            margin: '34px 0 26px',
            background: 'linear-gradient(90deg, transparent, #c9a961, transparent)',
          }}
        />

        <div
          style={{
            display: 'flex',
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: 14,
            color: '#d4af37',
          }}
        >
          ELITE LAW FIRM
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 20,
            letterSpacing: 8,
            color: '#a88a47',
            marginTop: 16,
          }}
        >
          CAIRO · EST. 2017
        </div>
      </div>
    ),
    { ...size },
  );
}
