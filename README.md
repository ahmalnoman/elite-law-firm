# Elite Law Firm — مكتب محاماة النخبة

A sleek, elite redesign of **elite-law.net**, built with Next.js 14 (App Router), Tailwind CSS, and Framer Motion. Arabic-first (RTL) with a bilingual Arabic / English toggle, dark-luxury **black + gold** aesthetic, smooth scroll animations, animated counters, testimonial carousel, notable-cases showcase, and a 3-step consultation booking form.

The original logo from elite-law.net is preserved as the brand mark.

## What's included

- **Hero** — cinematic black + gold landing with the firm emblem, ornamental ruler, and animated scroll cue
- **Stats strip** — animated counters (years of practice, cases won, elite clients, success rate)
- **About** — three pillars (confidentiality, partner-led counsel, proven outcomes) + the firm's story
- **Practice Areas** — six services with gold-iconography cards: Corporate & Commercial, Litigation & Arbitration, Personal Status, Real Estate & Investment, Criminal Defence, International Practice
- **Notable Cases** — three flagship matters (commercial / arbitration / family)
- **Testimonials** — auto-rotating carousel with dot navigation
- **Contact** — 3-step consultation booking form (case type → contact details → preferred date/time) with progress bar, success state, and direct-line contact card
- **Footer** — quick links, practice areas, address, hours

## Tech

| | |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS + custom dark-luxury tokens |
| Animation | Framer Motion |
| Fonts | Tajawal (Arabic) + Cormorant Garamond (Latin) |
| i18n | Custom lightweight provider, persisted to `localStorage`, swaps `dir` + `lang` on the `<html>` element |

## Run locally

```bash
cd elite-law
npm install
npm run dev
```

Then open http://localhost:3000

## Build for production

```bash
npm run build
npm start
```

## Project structure

```
elite-law/
├─ app/
│  ├─ layout.tsx         # root layout, fonts, providers
│  ├─ page.tsx           # home composition
│  ├─ providers.tsx      # I18n provider (Arabic/English + RTL/LTR)
│  └─ globals.css        # design tokens, buttons, cards, animations
├─ components/
│  ├─ Header.tsx         # sticky nav + mobile menu + language toggle
│  ├─ Hero.tsx           # cinematic hero with watermark logo + emblem card
│  ├─ Stats.tsx          # animated counters in a card
│  ├─ About.tsx          # firm story + three pillars
│  ├─ Services.tsx       # six practice-area cards
│  ├─ Cases.tsx          # notable matters
│  ├─ Testimonials.tsx   # auto-rotating quote carousel
│  ├─ Contact.tsx        # 3-step booking form + direct-line card
│  ├─ Footer.tsx         # site footer
│  ├─ SectionHeader.tsx  # shared eyebrow + title + subtitle
│  ├─ LanguageToggle.tsx # sliding-pill AR/EN switcher
│  └─ Icon.tsx           # inline SVG icon set
├─ lib/
│  └─ i18n.ts            # all Arabic + English copy in one strongly-typed dictionary
├─ public/
│  └─ logo.png           # original Elite Law Firm emblem
├─ tailwind.config.ts
├─ next.config.mjs
└─ package.json
```

## Editing copy

All site copy (Arabic + English) lives in `lib/i18n.ts`. Edit the `dictionaries.ar` and `dictionaries.en` objects — TypeScript will enforce that both locales stay in sync.

## Brand tokens

Defined in `tailwind.config.ts` (and CSS variables in `app/globals.css`):

- `ink` — `#0a0a0a` → `#2a2a2a` (the deep blacks)
- `gold` — `#c9a961` (primary) with `gold.50` → `gold.900` ramp; bright accent `#d4af37`
- `bone` — `#f5f1e8` (warm off-white text)
- Gradient utilities: `bg-gold-gradient`, `text-gold-gradient`, `bg-radial-gold`, `bg-noise`

## Connecting the form to a backend

The booking form currently simulates a submission for the demo. To wire it up to a real backend, edit `components/Contact.tsx` → the `submit` function and `POST` the `form` state to your endpoint (e.g. `/api/consultation`, a CRM webhook, or an email service like Resend).

## Deployment

Works out of the box on Vercel, Netlify, Cloudflare Pages, or any Node host. For Vercel:

```bash
npx vercel
```

---

© Elite Law Firm — مكتب محاماة النخبة. Logo and brand mark belong to the firm.
