# Elite Law Firm — Redesign Spec (2026-05-17)

## Goal

Five user-requested changes to the Elite Law Firm site (Next.js 14 App Router, Tailwind, Framer Motion, bilingual AR/EN, RTL-first):

1. Moving client-logo marquee (placeholder content now, real logos swapped later).
2. Change founding year from 1995 → **2017** everywhere, including derived claims.
3. Dedicated `/contact` and `/services` routes instead of in-page scroll anchors.
4. Arabic mode must contain **zero English/Latin words** (one agreed exception: the language toggle "EN" label).
5. A detailed `/services` page with long-form, professional AR+EN copy for all six practice areas.

No automated test suite exists in this project; verification is a manual browser pass.

---

## 0. Typography (replaces Tajawal / Cormorant Garamond)

Current fonts (Tajawal AR, Cormorant Garamond EN) are replaced project-wide:

| Role | English (LTR) | Arabic (RTL) |
| --- | --- | --- |
| Titles / brand / `.numeral` headings | **Space Grotesk** 700 (bold) | **Aref Ruqaa** 700 — the الرقعة (Ruqʿah) calligraphic display style |
| Body / normal / UI text | **Inter** (400–600, readable) | **Almarai** (400/700) — clean professional Arabic sans, the Almarai-company style |

All four are `next/font/google` fonts. Implementation:
- `app/layout.tsx`: remove `Cormorant_Garamond` + `Tajawal`; add `Space_Grotesk` (latin, 400/500/700), `Inter` (latin, 400/500/600/700), `Almarai` (arabic+latin, 400/700/800), `Aref_Ruqaa` (arabic, 400/700). Expose CSS vars `--font-space`, `--font-inter`, `--font-almarai`, `--font-ruqaa` on `<html>`.
- `app/globals.css`: `html[dir='ltr'] body` → `var(--font-inter)`; `html[dir='rtl'] body` → `var(--font-almarai)`. `.numeral` (LTR default) → `var(--font-space)` 700; add `html[dir='rtl'] .numeral { font-family: var(--font-ruqaa); font-weight: 700; }`.
- **Legibility caveat:** Aref Ruqaa is calligraphic and weak for dense numerals. The Stats counters get an Arabic override to **Almarai 800** (via a `stat-num` class or `html[dir='rtl']` selector) so figures stay crisp; large hero/section headings keep Ruqaa.
- `tailwind.config.ts`: update `fontFamily` tokens (`sans` → Almarai/Inter stack, `display` → Space Grotesk, `arabic` → Almarai, `latin` → Inter) so any utility usage resolves to the new fonts.

## Architecture decision: shared layout

`Header`/`Footer` currently render only inside `app/page.tsx`. They move into `app/layout.tsx` so `/`, `/services`, and `/contact` all share the same chrome. `Header` becomes route-aware (via `usePathname`): in-page section links resolve to `#about` on home and `/#about` on subpages.

---

## File-by-file plan

### New files
- `app/services/page.tsx` — detailed practice-areas page.
- `app/contact/page.tsx` — dedicated contact page (reuses existing `Contact` component body).
- `components/ClientLogos.tsx` — infinite marquee of placeholder client name-plates.
- `public/clients/` — empty dir (real logos dropped here later; `.gitkeep`).

### Modified files
- `app/layout.tsx` — render `Header`/`Footer` around `{children}`; update `metadata` year strings; swap font imports per §0.
- `tailwind.config.ts` — update `fontFamily` tokens to the new fonts (§0).
- `app/page.tsx` — remove `Header`/`Footer` (now in layout); remove `<Contact />`; insert `<ClientLogos />` after `<Stats />`; keep `Services` as a preview with a "view all" link to `/services`.
- `components/Header.tsx` — route-aware links; brand + "since" string come from i18n (no hardcoded Latin); nav set Home/About/Services/Notable Cases/Clients/Contact; Services & Contact are real page links; "Book Consultation" → `/contact`.
- `components/Footer.tsx` — brand/"since"/ornament strings from i18n; quick links route-aware.
- `components/Hero.tsx` — eyebrow, trust strip, `EST · …`/`EL · LF` ornaments from i18n; primary CTA → `/contact`, secondary → `/services`.
- `components/About.tsx` — `EST · MCMXCV` ornament → i18n locale value.
- `components/Stats.tsx` — counters: years 30→**9**, cases 1200→**350**, clients 850→**200**, rate stays **96**.
- `components/Services.tsx` — add a footer "View all practice areas →" link to `/services` (stays a 6-card preview on home).
- `lib/i18n.ts` — add new keys (brand, since, trust badges, ornaments, clients heading, services-detail block, view-all link); fix all 1995→2017 and "quarter-century"/"ربع قرن" wording; remove now-unused `lang.en` if confirmed unused.
- `app/globals.css` — add marquee keyframes + `prefers-reduced-motion` fallback; update body + `.numeral` font-families per §0.

---

## 1. Client logo marquee (`ClientLogos.tsx`)

- Section placed on home after `<Stats />`. Heading from i18n: AR "موضع ثقة كبرى المؤسسات" / EN "Trusted by leading institutions".
- ~10 placeholder plates: a `card-elite`-style hairline frame containing a small gold monogram + a client name string (generic neutral names, e.g. "Holding Group", "National Bank", "Real-Estate Co." — AR equivalents in Arabic mode). Names live in i18n so they localize and are easy to replace.
- Track duplicated 2× for a seamless loop; CSS `@keyframes marquee` translate -50%; direction respects RTL (animation reverses under `html[dir='rtl']`).
- Pause on hover (`:hover { animation-play-state: paused }`). Edge fade via mask-image gradient on both inline edges.
- `@media (prefers-reduced-motion: reduce)` → no animation; plates wrap as a centered static grid.
- Swap path documented: replace plate inner content with `<Image src="/clients/<file>" />` once real assets exist.

## 2. Year cascade 1995 → 2017

All occurrences, both locales:
- Header "SINCE 1995" / Footer "SINCE 1995" → i18n `brand.since` = AR "منذ ٢٠١٧" / EN "SINCE 2017".
- Hero trust strip "1995 — 2026" → "2017 — 2026".
- Hero/About `EST · MCMXCV` → `EST · MMXVII` (EN) / "تأسس · ٢٠١٧" (AR); `EL · LF` → keep EN / "م · ن" (AR); Footer `EL · LF · MMXXVI` → keep EN / "م · ن · ٢٠٢٦" (AR).
- `app/layout.tsx` metadata: "Since 1995"/"since 1995" → 2017.
- i18n `ar.hero.eyebrow` "منذ عام ١٩٩٥ — القاهرة" → "منذ عام ٢٠١٧ — القاهرة".
- i18n `ar.about.p1` "تأسس … عام ١٩٩٥" → "٢٠١٧"; "ربع قرن" phrasing → "ما يقارب عقداً من التميّز".
- i18n `en.hero.eyebrow` "Cairo · Since 1995" → "Cairo · Since 2017".
- i18n `en.hero.subtitle` / `en.about.p1` "quarter-century" / "Founded in 1995" → "nearly a decade" / "Founded in 2017".
- i18n `ar/en.footer.tagline` "منذ ١٩٩٥" / "since 1995" → 2017.
- Stats counters (approved figures, easy to tweak): **9+** years · **350+** cases won · **200+** elite clients · **96%** success rate.

## 3. Routing & navigation

- `app/services/page.tsx`, `app/contact/page.tsx` created. Each renders shared chrome via layout.
- `Header` nav: Home (`/` or `#top`), About (anchor), Services (`/services`), Notable Cases (anchor), Clients (anchor), Contact (`/contact`). Anchor links prefixed with `/` when `usePathname() !== '/'`.
- `app/page.tsx` no longer renders `<Contact />`; keeps About/Cases/Testimonials sections + `ClientLogos` + Services preview.
- `Contact` component reused on `/contact` (its `id="contact"` is harmless; page wraps it with top padding so it clears the fixed header).
- Hero CTAs and "Book Consultation" buttons point at `/contact`; Hero "Explore practice areas" → `/services`; Services preview "view all" → `/services`.

## 4. Arabic = zero English

Every hardcoded Latin string becomes locale-driven through i18n:
- Brand name: AR "مكتب محاماة النخبة" / EN "Elite Law Firm" (Header + Footer + About image alt stays non-visible).
- Hero trust badges → i18n array. AR: "نقابة المحامين بالقاهرة" · "تحكيم غرفة التجارة الدولية" · "تصنيف ليجال ٥٠٠" · "٢٠١٧ — ٢٠٢٦". EN: "Cairo Bar Association" · "ICC Arbitration" · "Legal 500 · Recognised" · "2017 — 2026".
- Ornaments (`EST · …`, `EL · LF`, `EL · LF · MMXXVI`) → i18n locale values (Arabic forms above).
- Contact column micro-labels ("Direct line", "Phone", "Email", "Address") already conditionally rendered — moved into i18n for consistency.
- Email/phone values stay Latin-script inside `dir="ltr"` spans (they are addresses/numbers, not English words) — acceptable and unchanged.
- **Agreed exception:** `LanguageToggle` keeps literal "EN" (discoverability of the English switch). "العربية" stays as-is.
- Remove `dictionaries.*.lang.en` only if grep confirms it is unused (LanguageToggle uses literals).

## 5. Detailed services page (`/services`)

`app/services/page.tsx`: SectionHeader intro, then six `card-elite` long-form blocks (icon, title, 2–3 paragraphs, a "What we handle" bullet list), closing CTA → `/contact`. Content in new i18n block `servicesDetail.items[]` with `{ icon, title, intro, body, points[] }`. Draft copy below — user reviews specifics (court names, etc.) at spec-review.

### Drafted copy (review target)

**1. Corporate & Commercial / القانون التجاري والشركات** — EN: "We act as outside general counsel to founders, family enterprises and listed groups across the full corporate lifecycle — formation, capital structuring, governance and exit. Our commercial team drafts and negotiates the contracts that carry real risk: shareholders' agreements, M&A and joint-venture documentation, supply and distribution arrangements, and financing. Engagements are partner-led and built around the client's commercial objective, not the billable hour." Points: company formation & restructuring · shareholders' & founders' agreements · M&A and due diligence · commercial contracts & distribution · corporate governance & compliance · intellectual-property protection. AR mirror: "نعمل كمستشار قانوني خارجي للمؤسِّسين والشركات العائلية والمجموعات المقيّدة بالبورصة عبر دورة حياة الشركة كاملةً — التأسيس، هيكلة رأس المال، الحوكمة والخروج. يصوغ فريقنا التجاري ويتفاوض على العقود التي تحمل المخاطر الحقيقية: اتفاقيات المساهمين، وثائق الاستحواذ والمشروعات المشتركة، عقود التوريد والتوزيع، والتمويل. كل تكليف يُدار بإشراف شريك ويُبنى حول الهدف التجاري للعميل." نقاط: تأسيس وإعادة هيكلة الشركات · اتفاقيات المساهمين والمؤسِّسين · الاستحواذ والاندماج والفحص النافي للجهالة · العقود التجارية والتوزيع · حوكمة الشركات والامتثال · حماية الملكية الفكرية.

**2. Litigation & Arbitration / التقاضي والتحكيم** — EN: "We try and arbitrate high-value commercial disputes before the Egyptian courts at every degree — First Instance, Appeal, Cassation and the Administrative judiciary — and before domestic and international arbitral tribunals. Strategy is set early: we map the route to a result, control the evidentiary record, and pursue settlement when it serves the client and trial when it does not." Points: commercial & civil litigation · cassation & appellate advocacy · domestic & ICC/CRCICA arbitration · enforcement of judgments & awards · interim & precautionary measures · disputes risk assessment. AR mirror with equivalent court names (محكمة أول درجة، الاستئناف، النقض، القضاء الإداري؛ التحكيم المحلي ومركز القاهرة الإقليمي / غرفة التجارة الدولية).

**3. Personal Status / الأحوال الشخصية** — EN: "Family matters are handled with discretion and deep grounding in Egyptian personal-status law and Sharia jurisprudence: marriage and its contracts, divorce and khul', custody and visitation, alimony and nafaqa, guardianship, and inheritance and estate division — including cross-border and enforcement dimensions." Points: marriage contracts & disputes · divorce & khul' · custody, visitation & guardianship · alimony / nafaqa claims · inheritance & estate division · cross-border family enforcement. AR mirror.

**4. Real Estate & Investment / العقارات والاستثمار** — EN: "We advise on acquisition, development and disposal of real assets, and on structuring real-estate investment: title due diligence, sale and pre-emption, commercial and usufruct leasing, developer–purchaser disputes, and portfolio structuring for institutional and private investors." Points: title due diligence & registration · sale, purchase & pre-emption · commercial & usufruct leasing · developer / off-plan disputes · real-estate investment structuring · property-management counsel. AR mirror.

**5. Criminal Defence / القانون الجنائي** — EN: "We defend individuals and corporate officers at every stage — from inquiry and prosecution through trial and appeal — with particular strength in economic and white-collar matters: fraud, breach of trust, cheque offences, and tax and customs proceedings. The accused's procedural rights are protected to the highest standard." Points: economic & white-collar defence · fraud & breach-of-trust matters · cheque & financial-instrument offences · tax & customs proceedings · appeal & cassation in criminal matters · pre-trial & investigation representation. AR mirror.

**6. International Practice / القانون الدولي** — EN: "We structure and document cross-border transactions and protect clients before foreign and international fora: foreign-investment and joint-venture contracts, recognition and enforcement of foreign judgments and arbitral awards in Egypt, and coordination of multi-jurisdiction matters with trusted correspondent counsel." Points: cross-border transactions · foreign-investment & JV contracts · enforcement of foreign judgments/awards · international arbitration support · multi-jurisdiction coordination · treaty & regulatory advisory. AR mirror.

---

## globals.css additions

```css
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.marquee-track { animation: marquee 40s linear infinite; }
.marquee-wrap:hover .marquee-track { animation-play-state: paused; }
html[dir='rtl'] .marquee-track { animation-direction: reverse; }
@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; flex-wrap: wrap; justify-content: center; }
}
```
Edge fade via `mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)` on `.marquee-wrap`.

---

## Verification (manual browser pass — no test suite)

For `/`, `/services`, `/contact`, in both AR and EN:
- No Latin/English words visible in Arabic mode (except the agreed "EN" toggle and ltr email/phone values).
- "2017" everywhere; no "1995", "MCMXCV", "quarter-century", or "ربع قرن" remain (grep + visual).
- Stats animate to 9 / 350 / 200 / 96.
- Logo marquee scrolls smoothly, reverses correctly in RTL, pauses on hover, falls back to static grid under reduced-motion.
- Nav: Services/Contact load as routes; About/Cases/Clients scroll on home and deep-link as `/#…` from subpages; Book Consultation → `/contact`.
- Services page renders all six detailed blocks in both languages with no layout breakage; CTA reaches `/contact`.
- Language toggle + persistence still work across the new routes; `dir`/`lang` swap on `<html>`.
- Fonts load correctly: EN titles render in Space Grotesk bold, EN body in Inter; AR headings in Aref Ruqaa (Ruqʿah), AR body in Almarai; AR stat counters legible (Almarai 800, not calligraphic). No FOUT/missing-glyph boxes.

## Out of scope

Wiring the contact form to a real backend (still simulated); fetching real data/logos from elite-law.net (blocked by bot challenge); any redesign beyond the five requested changes.
