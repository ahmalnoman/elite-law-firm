# Elite Law Firm Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver the five approved changes — pro fonts, moving client-logo marquee, 1995→2017 cascade, dedicated `/services` and `/contact` routes, and zero-English Arabic mode — on the Next.js 14 App Router site.

**Architecture:** `Header`/`Footer` move into `app/layout.tsx` so all routes share chrome; new fonts wired via `next/font/google` + CSS vars + locale-aware `.numeral`; all hardcoded Latin strings move into the i18n dictionary; two new App Router pages reuse existing components.

**Tech Stack:** Next.js 14 (App Router, TS), Tailwind, Framer Motion, `next/font/google`.

**Verification model:** No automated test suite exists; the spec mandates a manual browser pass. Each task ends with `npx tsc --noEmit` (typecheck) and, where visual, a targeted browser check at the running dev server (`http://localhost:3000`, already running in background — restart with `npm run dev` if down). Commits are the checkpoint mechanism.

**Spec:** `docs/superpowers/specs/2026-05-17-elite-law-redesign-design.md`

---

## File Structure

- Create: `app/services/page.tsx`, `app/contact/page.tsx`, `components/ClientLogos.tsx`, `public/clients/.gitkeep`
- Modify: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `tailwind.config.ts`, `lib/i18n.ts`, `components/Header.tsx`, `components/Footer.tsx`, `components/Hero.tsx`, `components/About.tsx`, `components/Stats.tsx`, `components/Services.tsx`

**Decision:** `dictionaries.*.lang` is unused (LanguageToggle uses literals) but left in place — removing it is churn with no benefit (YAGNI). The `lang` toggle keeps the literal "EN" (agreed exception).

---

### Task 1: Initialize git for checkpoints

**Files:** none (repo init)

- [ ] **Step 1: Init repo and make a baseline commit**

```bash
cd "/Users/kaiizneglap-0011/Desktop/elite-law 2"
git init
printf "node_modules\n.next\n" > .gitignore
git add .gitignore .eslintrc.json README.md app components lib public next-env.d.ts next.config.mjs package.json package-lock.json postcss.config.mjs tailwind.config.ts tsconfig.json docs
git commit -m "chore: baseline before redesign"
```

- [ ] **Step 2: Verify**

Run: `git log --oneline -1`
Expected: one commit "chore: baseline before redesign".

---

### Task 2: Typography CSS + Tailwind tokens + marquee keyframes

**Files:**
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts:36-41`

- [ ] **Step 1: Replace body font rules in `app/globals.css`**

Replace lines 24-29:

```css
html[dir='rtl'] body {
  font-family: var(--font-tajawal), system-ui, sans-serif;
}
html[dir='ltr'] body {
  font-family: var(--font-cormorant), Georgia, serif;
}
```

with:

```css
html[dir='rtl'] body {
  font-family: var(--font-almarai), system-ui, sans-serif;
}
html[dir='ltr'] body {
  font-family: var(--font-inter), system-ui, sans-serif;
}
```

- [ ] **Step 2: Replace the `.numeral` block in `app/globals.css`**

Replace:

```css
.numeral {
  font-family: var(--font-cormorant), Georgia, serif;
  font-weight: 600;
  letter-spacing: -0.02em;
}
```

with:

```css
.numeral {
  font-family: var(--font-space), system-ui, sans-serif;
  font-weight: 700;
  letter-spacing: -0.02em;
}
html[dir='rtl'] .numeral {
  font-family: var(--font-ruqaa), Georgia, serif;
  font-weight: 700;
  letter-spacing: 0;
}
html[dir='rtl'] .stat-num {
  font-family: var(--font-almarai), system-ui, sans-serif;
  font-weight: 800;
}

/* Client logo marquee */
.marquee-wrap {
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 42s linear infinite;
}
.marquee-wrap:hover .marquee-track { animation-play-state: paused; }
html[dir='rtl'] .marquee-track { animation-direction: reverse; }
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }
}
```

- [ ] **Step 3: Update `fontFamily` tokens in `tailwind.config.ts` (lines 36-41)**

Replace:

```ts
      fontFamily: {
        sans: ['var(--font-tajawal)', 'system-ui', 'sans-serif'],
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        arabic: ['var(--font-tajawal)', 'system-ui', 'sans-serif'],
        latin: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
```

with:

```ts
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-almarai)', 'system-ui', 'sans-serif'],
        latin: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
```

- [ ] **Step 4: Typecheck and commit**

```bash
npx tsc --noEmit
git add app/globals.css tailwind.config.ts
git commit -m "style: swap to Space Grotesk/Inter (EN) + Aref Ruqaa/Almarai (AR), add marquee CSS"
```
Expected: `tsc` exits 0 (no output).

---

### Task 3: Wire new fonts + shared Header/Footer + 2017 metadata in `app/layout.tsx`

**Files:**
- Modify: `app/layout.tsx` (full rewrite)

- [ ] **Step 1: Replace the entire contents of `app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import { Space_Grotesk, Inter, Almarai, Aref_Ruqaa } from 'next/font/google';
import { I18nProvider } from './providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const almarai = Almarai({
  subsets: ['arabic'],
  weight: ['300', '400', '700', '800'],
  variable: '--font-almarai',
  display: 'swap',
});

const arefRuqaa = Aref_Ruqaa({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-ruqaa',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'مكتب محاماة النخبة | Elite Law Firm — Since 2017',
  description:
    'مكتب محاماة النخبة — Premier law firm in Cairo since 2017. Corporate, litigation, arbitration and personal status counsel for discerning clients.',
  keywords: [
    'مكتب محاماة النخبة',
    'محاماة القاهرة',
    'محامي تجاري',
    'تحكيم دولي',
    'أحوال شخصية',
    'Elite Law',
    'Cairo law firm',
    'corporate lawyer Egypt',
    'litigation specialist',
  ],
  openGraph: {
    title: 'Elite Law Firm — Premier counsel since 2017',
    description: 'Distinguished legal counsel from Cairo to the world. مكتب محاماة النخبة.',
    type: 'website',
    images: ['/logo.png'],
  },
  icons: { icon: '/logo.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${spaceGrotesk.variable} ${inter.variable} ${almarai.variable} ${arefRuqaa.variable}`}
    >
      <body>
        <I18nProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Typecheck and commit**

```bash
npx tsc --noEmit
git add app/layout.tsx
git commit -m "feat: shared Header/Footer in layout, new font vars, 2017 metadata"
```
Expected: `tsc` exits 0. (Browser will be broken until Task 4 removes the duplicate Header/Footer from page.tsx — that is expected and fixed next.)

---

### Task 4: i18n dictionary — new keys, 2017 cascade, full services copy

**Files:**
- Modify: `lib/i18n.ts`

- [ ] **Step 1: Extend the `Dict` type**

In `lib/i18n.ts`, inside `export type Dict = {`, immediately after the line `dir: 'rtl' | 'ltr';` add:

```ts
  brand: {
    name: string;
    since: string;
    est: string;
    monogram: string;
    monogramYear: string;
  };
```

In the `nav: { ... }` object the existing keys are kept (no change).

In the `hero: { ... }` block, after `scrollHint: string;` add:

```ts
    trust: string[];
```

In the `stats: { ... }` block — no change.

In the `services: { ... }` block, after `subtitle: string;` add:

```ts
    viewAll: string;
```

After the entire `services: { ... };` member, add a new member:

```ts
  servicesDetail: {
    eyebrow: string;
    title: string;
    subtitle: string;
    whatWeHandle: string;
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
    items: { icon: string; title: string; intro: string; body: string; points: string[] }[];
  };
  clients: {
    title: string;
    names: string[];
  };
```

In the `contact: { ... }` block, after `subtitle: string;` add:

```ts
    directLine: string;
    phoneLabel: string;
    emailLabel: string;
    addressLabel: string;
```

- [ ] **Step 2: Add the new Arabic keys**

In `dictionaries.ar`, immediately after the line `    dir: 'rtl',` add:

```ts
    brand: {
      name: 'مكتب محاماة النخبة',
      since: 'منذ ٢٠١٧',
      est: 'تأسس · ٢٠١٧',
      monogram: 'م · ن',
      monogramYear: 'م · ن · ٢٠٢٦',
    },
```

In `dictionaries.ar.hero`, after `scrollHint: 'اكتشف المزيد',` add:

```ts
      trust: ['نقابة المحامين بالقاهرة', 'تحكيم غرفة التجارة الدولية', 'تصنيف ليجال ٥٠٠', '٢٠١٧ — ٢٠٢٦'],
```

In `dictionaries.ar.services`, after the `subtitle:` line add:

```ts
      viewAll: 'كل مجالات الممارسة',
```

In `dictionaries.ar.contact`, after the `subtitle:` line add:

```ts
      directLine: 'تواصل مباشر',
      phoneLabel: 'هاتف',
      emailLabel: 'البريد',
      addressLabel: 'العنوان',
```

After the closing `},` of `dictionaries.ar.services` (before `cases:`), insert:

```ts
    servicesDetail: {
      eyebrow: 'مجالات الممارسة',
      title: 'خدماتنا القانونية بالتفصيل',
      subtitle: 'ست تخصّصات وفريقٌ واحدٌ متفرّغ — وما يتضمّنه كل تكليفٍ فعلياً.',
      whatWeHandle: 'ما نتولّاه',
      ctaTitle: 'ناقش قضيتك بسريّةٍ تامّة',
      ctaBody: 'أول استشارةٍ مجانيةٌ ومحميّةٌ بالامتياز المهني.',
      ctaButton: 'احجز استشارة',
      items: [
        {
          icon: 'briefcase',
          title: 'القانون التجاري والشركات',
          intro: 'نعمل كمستشارٍ قانونيٍّ خارجيٍّ للمؤسِّسين والشركات العائلية والمجموعات المُقيَّدة بالبورصة عبر دورة حياة الشركة كاملةً.',
          body: 'من التأسيس وهيكلة رأس المال إلى الحوكمة والخروج، يصوغ فريقنا التجاري ويتفاوض على العقود التي تحمل المخاطر الحقيقية: اتفاقيات المساهمين، ووثائق الاستحواذ والمشروعات المشتركة، وعقود التوريد والتوزيع، وترتيبات التمويل. كل تكليفٍ يُدار بإشراف شريكٍ ويُبنى حول الهدف التجاري للعميل لا حول ساعات العمل.',
          points: ['تأسيس الشركات وإعادة الهيكلة', 'اتفاقيات المساهمين والمؤسِّسين', 'الاستحواذ والاندماج والفحص النافي للجهالة', 'العقود التجارية والتوزيع', 'حوكمة الشركات والامتثال', 'حماية الملكية الفكرية'],
        },
        {
          icon: 'scale',
          title: 'التقاضي والتحكيم',
          intro: 'نُمثِّل عملاءنا في النزاعات التجارية عالية القيمة أمام المحاكم المصرية بكل درجاتها وأمام هيئات التحكيم المحلية والدولية.',
          body: 'نضع الاستراتيجية مبكراً: نرسم الطريق إلى النتيجة، ونُحكم السيطرة على ملف الإثبات، ونسعى إلى التسوية حين تخدم العميل وإلى المرافعة حين لا تخدمه. تمتد ممارستنا أمام محاكم أول درجة والاستئناف والنقض والقضاء الإداري، وأمام مركز القاهرة الإقليمي وغرفة التجارة الدولية.',
          points: ['التقاضي التجاري والمدني', 'الطعن بالنقض والمرافعة الاستئنافية', 'التحكيم المحلي والدولي', 'تنفيذ الأحكام وقرارات التحكيم', 'الإجراءات والتدابير التحفظية', 'تقييم مخاطر النزاعات'],
        },
        {
          icon: 'heart',
          title: 'الأحوال الشخصية',
          intro: 'نتولّى قضايا الأسرة بسريّةٍ تامّةٍ ومرجعيّةٍ عميقةٍ في قانون الأحوال الشخصية المصري والفقه الشرعي.',
          body: 'نُعالج عقود الزواج ومنازعاته، والطلاق والخلع، والحضانة والرؤية والولاية، ودعاوى النفقة، والميراث وقسمة التركات — بما في ذلك الأبعاد العابرة للحدود وتنفيذ أحكام الأسرة الأجنبية في مصر.',
          points: ['عقود الزواج ومنازعاته', 'الطلاق والخلع', 'الحضانة والرؤية والولاية', 'دعاوى النفقة', 'الميراث وقسمة التركات', 'تنفيذ أحكام الأسرة عبر الحدود'],
        },
        {
          icon: 'building',
          title: 'العقارات والاستثمار',
          intro: 'نقدّم المشورة في اقتناء الأصول العقارية وتطويرها والتصرّف فيها، وفي هيكلة الاستثمار العقاري.',
          body: 'نتولّى الفحص القانوني للملكية والتسجيل، والبيع والشراء والشُّفعة، والإيجار التجاري وحق الانتفاع، ومنازعات المطوّر والمشتري، وهيكلة المحافظ العقارية للمستثمرين من المؤسسات والأفراد.',
          points: ['الفحص القانوني للملكية والتسجيل', 'البيع والشراء والشُّفعة', 'الإيجار التجاري وحق الانتفاع', 'منازعات البيع على الخارطة والمطوّرين', 'هيكلة الاستثمار العقاري', 'استشارات إدارة الممتلكات'],
        },
        {
          icon: 'shield',
          title: 'القانون الجنائي',
          intro: 'ندافع عن الأفراد ومسؤولي الشركات في كل مرحلة — من التحقيق والاتهام إلى المحاكمة والطعن.',
          body: 'نتميّز بقوّةٍ خاصّةٍ في القضايا الاقتصادية وجرائم ذوي الياقات البيضاء: النصب وخيانة الأمانة وجرائم الشيكات والإجراءات الضريبية والجمركية، مع صون حقوق المتهم الإجرائية بأعلى المعايير.',
          points: ['الدفاع في القضايا الاقتصادية', 'النصب وخيانة الأمانة', 'جرائم الشيكات والأوراق المالية', 'الإجراءات الضريبية والجمركية', 'الطعن والنقض في المواد الجنائية', 'التمثيل أمام النيابة ومرحلة التحقيق'],
        },
        {
          icon: 'globe',
          title: 'القانون الدولي',
          intro: 'نُهيكل ونُوثّق الصفقات العابرة للحدود ونحمي العملاء أمام الجهات الأجنبية والدولية.',
          body: 'نُعدّ عقود الاستثمار الأجنبي والمشروعات المشتركة، ونتولّى الاعتراف بالأحكام وقرارات التحكيم الأجنبية وتنفيذها في مصر، وننسّق المسائل متعددة الولايات القضائية مع مكاتب مراسلةٍ موثوقة.',
          points: ['الصفقات العابرة للحدود', 'عقود الاستثمار الأجنبي والمشروعات المشتركة', 'تنفيذ الأحكام وقرارات التحكيم الأجنبية', 'دعم التحكيم الدولي', 'التنسيق متعدد الولايات القضائية', 'الاستشارات التعاهدية والتنظيمية'],
        },
      ],
    },
    clients: {
      title: 'موضع ثقة كبرى المؤسسات',
      names: ['مجموعة قابضة', 'بنك وطني', 'شركة عقارية', 'شركاء الطاقة', 'استثمارات رأس المال', 'مجموعة صناعية', 'بيت تجاري', 'شركة تأمين', 'هيئة التنمية', 'مجموعة لوجستية'],
    },
```

- [ ] **Step 3: Add the new English keys**

In `dictionaries.en`, immediately after `    dir: 'ltr',` add:

```ts
    brand: {
      name: 'Elite Law Firm',
      since: 'SINCE 2017',
      est: 'EST · MMXVII',
      monogram: 'EL · LF',
      monogramYear: 'EL · LF · MMXXVI',
    },
```

In `dictionaries.en.hero`, after `scrollHint: 'Discover',` add:

```ts
      trust: ['Cairo Bar Association', 'ICC Arbitration', 'Legal 500 · Recognised', '2017 — 2026'],
```

In `dictionaries.en.services`, after the `subtitle:` line add:

```ts
      viewAll: 'View all practice areas',
```

In `dictionaries.en.contact`, after the `subtitle:` line add:

```ts
      directLine: 'Direct line',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      addressLabel: 'Address',
```

After the closing `},` of `dictionaries.en.services` (before `cases:`), insert:

```ts
    servicesDetail: {
      eyebrow: 'Practice areas',
      title: 'Counsel, in depth',
      subtitle: 'Six disciplines, one dedicated team — what each engagement actually involves.',
      whatWeHandle: 'What we handle',
      ctaTitle: 'Discuss your matter in confidence',
      ctaBody: 'Your first consultation is complimentary and protected by professional privilege.',
      ctaButton: 'Book a consultation',
      items: [
        {
          icon: 'briefcase',
          title: 'Corporate & Commercial',
          intro: 'We act as outside general counsel to founders, family enterprises and listed groups across the full corporate lifecycle.',
          body: "From formation and capital structuring to governance and exit, our commercial team drafts and negotiates the contracts that carry real risk: shareholders' agreements, M&A and joint-venture documentation, supply and distribution arrangements, and financing. Engagements are partner-led and built around the client's commercial objective, not the billable hour.",
          points: ['Company formation & restructuring', "Shareholders' & founders' agreements", 'M&A and due diligence', 'Commercial contracts & distribution', 'Corporate governance & compliance', 'Intellectual-property protection'],
        },
        {
          icon: 'scale',
          title: 'Litigation & Arbitration',
          intro: 'We litigate and arbitrate high-value commercial disputes before the Egyptian courts at every degree and before domestic and international arbitral tribunals.',
          body: 'Strategy is set early: we map the route to a result, control the evidentiary record, and pursue settlement when it serves the client and trial when it does not. Our practice spans First Instance, Appeal, Cassation and the Administrative judiciary, and the CRCICA and ICC.',
          points: ['Commercial & civil litigation', 'Cassation & appellate advocacy', 'Domestic & international arbitration', 'Enforcement of judgments & awards', 'Interim & precautionary measures', 'Disputes risk assessment'],
        },
        {
          icon: 'heart',
          title: 'Personal Status',
          intro: 'Family matters are handled with discretion and a deep grounding in Egyptian personal-status law and Sharia jurisprudence.',
          body: 'We act on marriage and its contracts, divorce and khulʿ, custody, visitation and guardianship, alimony (nafaqa) claims, and inheritance and estate division — including cross-border dimensions and enforcement of foreign family judgments in Egypt.',
          points: ['Marriage contracts & disputes', 'Divorce & khulʿ', 'Custody, visitation & guardianship', 'Alimony / nafaqa claims', 'Inheritance & estate division', 'Cross-border family enforcement'],
        },
        {
          icon: 'building',
          title: 'Real Estate & Investment',
          intro: 'We advise on the acquisition, development and disposal of real assets, and on structuring real-estate investment.',
          body: 'Our work spans title due diligence and registration, sale, purchase and pre-emption, commercial and usufruct leasing, developer–purchaser disputes, and portfolio structuring for institutional and private investors.',
          points: ['Title due diligence & registration', 'Sale, purchase & pre-emption', 'Commercial & usufruct leasing', 'Developer / off-plan disputes', 'Real-estate investment structuring', 'Property-management counsel'],
        },
        {
          icon: 'shield',
          title: 'Criminal Defence',
          intro: 'We defend individuals and corporate officers at every stage — from inquiry and prosecution through trial and appeal.',
          body: "We are particularly strong in economic and white-collar matters: fraud, breach of trust, cheque offences, and tax and customs proceedings, protecting the accused's procedural rights to the highest standard.",
          points: ['Economic & white-collar defence', 'Fraud & breach-of-trust matters', 'Cheque & financial-instrument offences', 'Tax & customs proceedings', 'Appeal & cassation in criminal matters', 'Pre-trial & investigation representation'],
        },
        {
          icon: 'globe',
          title: 'International Practice',
          intro: 'We structure and document cross-border transactions and protect clients before foreign and international fora.',
          body: 'This includes foreign-investment and joint-venture contracts, recognition and enforcement of foreign judgments and arbitral awards in Egypt, and coordination of multi-jurisdiction matters with trusted correspondent counsel.',
          points: ['Cross-border transactions', 'Foreign-investment & JV contracts', 'Enforcement of foreign judgments/awards', 'International arbitration support', 'Multi-jurisdiction coordination', 'Treaty & regulatory advisory'],
        },
      ],
    },
    clients: {
      title: 'Trusted by leading institutions',
      names: ['Holding Group', 'National Bank', 'Real-Estate Co.', 'Energy Partners', 'Capital Investments', 'Industrial Group', 'Trading House', 'Insurance Co.', 'Development Authority', 'Logistics Group'],
    },
```

- [ ] **Step 4: Apply the 2017 cascade (8 string replacements in `lib/i18n.ts`)**

| Find | Replace |
| --- | --- |
| `eyebrow: 'منذ عام ١٩٩٥ — القاهرة',` | `eyebrow: 'منذ عام ٢٠١٧ — القاهرة',` |
| `ربع قرن من التميّز` | `قرابة عقدٍ من التميّز` |
| `تأسس مكتب محاماة النخبة عام ١٩٩٥` | `تأسس مكتب محاماة النخبة عام ٢٠١٧` |
| `tagline: 'النخبة في المحاماة — منذ ١٩٩٥',` | `tagline: 'النخبة في المحاماة — منذ ٢٠١٧',` |
| `eyebrow: 'Cairo · Since 1995',` | `eyebrow: 'Cairo · Since 2017',` |
| `A quarter-century of distinguished practice` | `Nearly a decade of distinguished practice` |
| `Founded in 1995 by a select group` | `Founded in 2017 by a select group` |
| `The elite standard in counsel — since 1995` | `The elite standard in counsel — since 2017` |

- [ ] **Step 5: Typecheck and commit**

```bash
npx tsc --noEmit
git add lib/i18n.ts
git commit -m "feat: i18n brand/trust/clients/servicesDetail keys + 1995→2017 cascade"
```
Expected: `tsc` exits 0.

---

### Task 5: Header — route-aware links, i18n brand, page routes

**Files:**
- Modify: `components/Header.tsx` (full rewrite)

- [ ] **Step 1: Replace the entire contents of `components/Header.tsx`**

```tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useI18n } from '@/app/providers';
import LanguageToggle from './LanguageToggle';
import Icon from './Icon';

export default function Header() {
  const { dict } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onHome = pathname === '/';
  const anchor = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  const links = [
    { href: anchor('about'), label: dict.nav.about },
    { href: '/services', label: dict.nav.services },
    { href: anchor('cases'), label: dict.nav.cases },
    { href: anchor('testimonials'), label: dict.nav.testimonials },
    { href: '/contact', label: dict.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ink/85 backdrop-blur-xl border-b border-gold/15 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-10 flex items-center justify-between gap-6">
        <Link href={onHome ? '#top' : '/'} className="flex items-center gap-3 group">
          <span className="relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-ink/70 ring-1 ring-gold/40 group-hover:ring-gold transition">
            <Image
              src="/logo.png"
              alt={dict.brand.name}
              width={48}
              height={48}
              className="object-contain p-1.5"
              priority
            />
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="numeral text-bone text-lg tracking-wide">{dict.brand.name}</span>
            <span className="text-[11px] text-gold tracking-[0.25em]">{dict.brand.since}</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative px-4 py-2 text-bone/80 hover:text-bone transition group"
            >
              {l.label}
              <span className="absolute inset-x-4 bottom-1 h-px bg-gold scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageToggle compact />
          <Link href="/contact" className="btn-gold !py-2.5 !px-5 text-sm">
            {dict.nav.book}
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="menu"
          className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-gold/30 text-gold"
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-500 ${
          open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-6 pt-4 pb-6 flex flex-col gap-2 bg-ink/95 backdrop-blur-xl border-t border-gold/15">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-bone/85 border-b border-gold/10 last:border-0"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex items-center justify-between mt-3">
            <LanguageToggle compact />
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-gold !py-2.5 !px-5 text-sm">
              {dict.nav.book}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Typecheck and commit**

```bash
npx tsc --noEmit
git add components/Header.tsx
git commit -m "feat: route-aware Header with i18n brand and /services /contact links"
```
Expected: `tsc` exits 0.

---

### Task 6: Footer — i18n brand/ornament, route-aware quick links

**Files:**
- Modify: `components/Footer.tsx`

- [ ] **Step 1: Replace imports + add pathname helper**

Replace lines 1-7:

```tsx
'use client';

import Image from 'next/image';
import { useI18n } from '@/app/providers';

export default function Footer() {
  const { dict } = useI18n();
```

with:

```tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/app/providers';

export default function Footer() {
  const { dict } = useI18n();
  const pathname = usePathname();
  const onHome = pathname === '/';
  const anchor = (id: string) => (onHome ? `#${id}` : `/#${id}`);
```

- [ ] **Step 2: Replace the brand block (lines 18-21 in the original)**

Replace:

```tsx
            <div>
              <div className="numeral text-lg text-bone">Elite Law Firm</div>
              <div className="text-[11px] tracking-[0.3em] text-gold">SINCE 1995</div>
            </div>
```

with:

```tsx
            <div>
              <div className="numeral text-lg text-bone">{dict.brand.name}</div>
              <div className="text-[11px] tracking-[0.3em] text-gold">{dict.brand.since}</div>
            </div>
```

- [ ] **Step 3: Replace the quick-links list**

Replace:

```tsx
          <ul className="space-y-2 text-bone/70">
            <li><a className="hover:text-gold transition" href="#about">{dict.nav.about}</a></li>
            <li><a className="hover:text-gold transition" href="#services">{dict.nav.services}</a></li>
            <li><a className="hover:text-gold transition" href="#cases">{dict.nav.cases}</a></li>
            <li><a className="hover:text-gold transition" href="#testimonials">{dict.nav.testimonials}</a></li>
            <li><a className="hover:text-gold transition" href="#contact">{dict.nav.contact}</a></li>
          </ul>
```

with:

```tsx
          <ul className="space-y-2 text-bone/70">
            <li><Link className="hover:text-gold transition" href={anchor('about')}>{dict.nav.about}</Link></li>
            <li><Link className="hover:text-gold transition" href="/services">{dict.nav.services}</Link></li>
            <li><Link className="hover:text-gold transition" href={anchor('cases')}>{dict.nav.cases}</Link></li>
            <li><Link className="hover:text-gold transition" href={anchor('testimonials')}>{dict.nav.testimonials}</Link></li>
            <li><Link className="hover:text-gold transition" href="/contact">{dict.nav.contact}</Link></li>
          </ul>
```

- [ ] **Step 4: Replace the ornament line**

Replace:

```tsx
          <div className="ornament text-[10px] tracking-[0.4em]">EL · LF · MMXXVI</div>
```

with:

```tsx
          <div className="ornament text-[10px] tracking-[0.4em]">{dict.brand.monogramYear}</div>
```

- [ ] **Step 5: Typecheck and commit**

```bash
npx tsc --noEmit
git add components/Footer.tsx
git commit -m "feat: Footer i18n brand/ornament + route-aware quick links"
```
Expected: `tsc` exits 0.

---

### Task 7: Hero — i18n trust strip/ornaments, route CTAs

**Files:**
- Modify: `components/Hero.tsx`

- [ ] **Step 1: Add `Link` import**

Replace line 4 `import Image from 'next/image';` with:

```tsx
import Image from 'next/image';
import Link from 'next/link';
```

- [ ] **Step 2: Replace the CTA buttons (lines 53-59)**

Replace:

```tsx
            <a href="#contact" className="btn-gold">
              {dict.hero.primaryCta}
              <Icon name="arrow" className={locale === 'ar' ? 'rotate-180' : ''} size={18} />
            </a>
            <a href="#services" className="btn-ghost">
              {dict.hero.secondaryCta}
            </a>
```

with:

```tsx
            <Link href="/contact" className="btn-gold">
              {dict.hero.primaryCta}
              <Icon name="arrow" className={locale === 'ar' ? 'rotate-180' : ''} size={18} />
            </Link>
            <Link href="/services" className="btn-ghost">
              {dict.hero.secondaryCta}
            </Link>
```

- [ ] **Step 3: Replace the trust strip (lines 62-71)**

Replace:

```tsx
          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 text-xs text-bone/55 tracking-widest uppercase">
            <span>★ Cairo Bar Association</span>
            <span className="hidden sm:inline">|</span>
            <span>ICC Arbitration</span>
            <span className="hidden sm:inline">|</span>
            <span>Legal 500 · Recognised</span>
            <span className="hidden sm:inline">|</span>
            <span>1995 — 2026</span>
          </div>
```

with:

```tsx
          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 text-xs text-bone/55 tracking-widest">
            {dict.hero.trust.map((t, i) => (
              <span key={t} className="flex items-center gap-x-8">
                {i === 0 ? `★ ${t}` : t}
                {i < dict.hero.trust.length - 1 && (
                  <span className="hidden sm:inline text-bone/30">|</span>
                )}
              </span>
            ))}
          </div>
```

- [ ] **Step 4: Replace the `EST · MCMXCV` badge (line 83)**

Replace:

```tsx
              EST · MCMXCV
```

with:

```tsx
              {dict.brand.est}
```

- [ ] **Step 5: Replace the `EL · LF` ornament (line 89)**

Replace:

```tsx
            <div className="ornament my-6 text-[10px] tracking-[0.35em]">EL · LF</div>
```

with:

```tsx
            <div className="ornament my-6 text-[10px] tracking-[0.35em]">{dict.brand.monogram}</div>
```

- [ ] **Step 6: Typecheck and commit**

```bash
npx tsc --noEmit
git add components/Hero.tsx
git commit -m "feat: Hero i18n trust strip/ornaments, /contact /services CTAs"
```
Expected: `tsc` exits 0.

---

### Task 8: About — i18n founding ornament

**Files:**
- Modify: `components/About.tsx:38`

- [ ] **Step 1: Replace the ornament line (`components/About.tsx:38`)**

Replace:

```tsx
              <div className="ornament text-[10px] tracking-[0.35em]">EST · MCMXCV</div>
```

with:

```tsx
              <div className="ornament text-[10px] tracking-[0.35em]">{dict.brand.est}</div>
```

`About` already destructures `dict` from `useI18n()` (line 8), so no import change is needed.

- [ ] **Step 2: Typecheck and commit**

```bash
npx tsc --noEmit
git add components/About.tsx
git commit -m "feat: About founding ornament from i18n"
```
Expected: `tsc` exits 0.

---

### Task 9: Stats — 2017 figures + crisp Arabic numerals

**Files:**
- Modify: `components/Stats.tsx`

- [ ] **Step 1: Add `stat-num` class to the Counter span (line 20)**

Replace:

```tsx
    <span ref={ref} className="numeral text-5xl sm:text-6xl text-gold-gradient">
```

with:

```tsx
    <span ref={ref} className="numeral stat-num text-5xl sm:text-6xl text-gold-gradient">
```

- [ ] **Step 2: Replace the `items` array (lines 29-34)**

Replace:

```tsx
  const items = [
    { value: 30, suffix: '+', label: dict.stats.years },
    { value: 1200, suffix: '+', label: dict.stats.cases },
    { value: 850, suffix: '+', label: dict.stats.clients },
    { value: 96, suffix: '%', label: dict.stats.rate },
  ];
```

with:

```tsx
  const items = [
    { value: 9, suffix: '+', label: dict.stats.years },
    { value: 350, suffix: '+', label: dict.stats.cases },
    { value: 200, suffix: '+', label: dict.stats.clients },
    { value: 96, suffix: '%', label: dict.stats.rate },
  ];
```

- [ ] **Step 3: Typecheck and commit**

```bash
npx tsc --noEmit
git add components/Stats.tsx
git commit -m "feat: 2017 stat figures (9/350/200/96) + Almarai numerals in AR"
```
Expected: `tsc` exits 0.

---

### Task 10: ClientLogos marquee component

**Files:**
- Create: `components/ClientLogos.tsx`
- Create: `public/clients/.gitkeep`

- [ ] **Step 1: Create `public/clients/.gitkeep`**

```bash
mkdir -p "public/clients" && : > "public/clients/.gitkeep"
```

- [ ] **Step 2: Create `components/ClientLogos.tsx`**

```tsx
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
```

> The track is the names listed twice; `@keyframes marquee` translates `-50%` so the second copy lands exactly where the first began — a seamless loop. To use real logos later, replace the `<span>`s inside `Plate` with `<Image src="/clients/<file>.svg" .../>`.

- [ ] **Step 3: Typecheck and commit**

```bash
npx tsc --noEmit
git add components/ClientLogos.tsx public/clients/.gitkeep
git commit -m "feat: add ClientLogos marquee (placeholder plates)"
```
Expected: `tsc` exits 0.

---

### Task 11: Services preview — "view all" link

**Files:**
- Modify: `components/Services.tsx`

- [ ] **Step 1: Add `Link` import**

Replace lines 3-5:

```tsx
import { motion } from 'framer-motion';
import { useI18n } from '@/app/providers';
import SectionHeader from './SectionHeader';
```

with:

```tsx
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useI18n } from '@/app/providers';
import SectionHeader from './SectionHeader';
```

- [ ] **Step 2: Add the link after the grid**

Replace lines 36-37:

```tsx
        </div>
      </div>
    </section>
```

with:

```tsx
        </div>
        <div className="mt-14 text-center">
          <Link href="/services" className="btn-ghost">
            {dict.services.viewAll}
            <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
    </section>
```

- [ ] **Step 3: Typecheck and commit**

```bash
npx tsc --noEmit
git add components/Services.tsx
git commit -m "feat: Services preview links to /services"
```
Expected: `tsc` exits 0.

---

### Task 12: Home page — drop chrome/Contact, add ClientLogos

**Files:**
- Modify: `app/page.tsx` (full rewrite)

- [ ] **Step 1: Replace the entire contents of `app/page.tsx`**

```tsx
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import ClientLogos from '@/components/ClientLogos';
import About from '@/components/About';
import Services from '@/components/Services';
import Cases from '@/components/Cases';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ClientLogos />
      <About />
      <Services />
      <Cases />
      <Testimonials />
    </>
  );
}
```

> `Header`/`Footer`/`<main>` now live in `app/layout.tsx`; `Contact` moved to its own route.

- [ ] **Step 2: Typecheck and commit**

```bash
npx tsc --noEmit
git add app/page.tsx
git commit -m "feat: home page = landing only, with ClientLogos, no inline Contact"
```
Expected: `tsc` exits 0.

---

### Task 13: `/contact` route

**Files:**
- Create: `app/contact/page.tsx`

- [ ] **Step 1: Create `app/contact/page.tsx`**

```tsx
import Contact from '@/components/Contact';

export default function ContactPage() {
  return (
    <div className="pt-28 lg:pt-32">
      <Contact />
    </div>
  );
}
```

> `Contact` is a `'use client'` component and renders its own `<section id="contact">`; the wrapper padding clears the fixed header.

- [ ] **Step 2: Typecheck and commit**

```bash
npx tsc --noEmit
git add app/contact/page.tsx
git commit -m "feat: dedicated /contact route"
```
Expected: `tsc` exits 0.

---

### Task 14: `/services` detailed route

**Files:**
- Create: `app/services/page.tsx`

- [ ] **Step 1: Create `app/services/page.tsx`**

```tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useI18n } from '@/app/providers';
import SectionHeader from '@/components/SectionHeader';
import Icon from '@/components/Icon';

export default function ServicesPage() {
  const { dict } = useI18n();
  const d = dict.servicesDetail;

  return (
    <div className="pt-28 lg:pt-32 pb-24">
      <div className="container mx-auto px-6 lg:px-10">
        <SectionHeader eyebrow={d.eyebrow} title={d.title} subtitle={d.subtitle} />

        <div className="space-y-8 max-w-5xl mx-auto">
          {d.items.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="card-elite p-8 lg:p-10 grid lg:grid-cols-12 gap-8"
            >
              <div className="lg:col-span-4">
                <div className="relative w-14 h-14 rounded-xl grid place-items-center mb-5 bg-ink-800 ring-1 ring-gold/25">
                  <Icon name={s.icon as any} className="text-gold" size={26} />
                </div>
                <div className="numeral text-xs text-gold tracking-[0.4em] mb-2">0{i + 1}</div>
                <h2 className="numeral text-3xl text-bone leading-snug">{s.title}</h2>
                <p className="text-bone/70 mt-4 leading-relaxed">{s.intro}</p>
              </div>

              <div className="lg:col-span-8">
                <p className="text-bone/75 leading-relaxed text-[15px]">{s.body}</p>
                <div className="hairline my-6 opacity-50" />
                <div className="text-xs uppercase tracking-widest text-gold mb-4">
                  {d.whatWeHandle}
                </div>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-bone/70 text-[15px]">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="card-elite mt-16 p-10 text-center max-w-3xl mx-auto">
          <h3 className="numeral text-3xl text-bone mb-3">{d.ctaTitle}</h3>
          <p className="text-bone/65 mb-7">{d.ctaBody}</p>
          <Link href="/contact" className="btn-gold">
            {d.ctaButton}
            <Icon name="arrow" size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck and commit**

```bash
npx tsc --noEmit
git add app/services/page.tsx
git commit -m "feat: detailed /services route with AR+EN long-form copy"
```
Expected: `tsc` exits 0.

---

### Task 15: Full verification pass

**Files:** none (verification only)

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: build completes with no type errors and lists routes `/`, `/contact`, `/services`.

- [ ] **Step 2: Start dev server if not running**

Run: `npm run dev` (background) then open `http://localhost:3000`.

- [ ] **Step 3: Manual browser checklist — perform every check**

On `/`, `/services`, `/contact`, toggling AR and EN each time:
- [ ] Arabic mode shows **no Latin/English words** anywhere except the "EN" toggle label and `dir="ltr"` phone/email values.
- [ ] No "1995", "MCMXCV", "quarter-century", or "ربع قرن" anywhere (also run: `grep -rn "1995\|MCMXCV\|quarter-century\|ربع قرن" app components lib` → expect no matches).
- [ ] EN titles render in **Space Grotesk bold**, EN body in **Inter**; AR headings in **Aref Ruqaa** (calligraphic), AR body in **Almarai**; AR stat counters are crisp (Almarai 800), not calligraphic.
- [ ] Stats animate to **9+ / 350+ / 200+ / 96%**.
- [ ] Client marquee scrolls smoothly, **pauses on hover**, **reverses** under RTL, and (DevTools → Rendering → emulate `prefers-reduced-motion: reduce`) falls back to a static centered grid.
- [ ] Nav: Services → `/services`, Contact → `/contact`; About/Notable Cases/Clients scroll on home and become `/#…` deep links from the subpages; "Book Consultation" → `/contact`; logo → home.
- [ ] `/services` shows all six blocks with intro/body/points in both languages, no overflow; CTA button reaches `/contact`.
- [ ] `/contact` shows the 3-step form clear of the fixed header; language persists across route changes; `<html>` `dir`/`lang` flip on toggle.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: verified redesign — fonts, marquee, 2017, routes, AR-only" --allow-empty
```

---

## Self-Review

**Spec coverage:** §0 typography → Tasks 2,3. §1 marquee → Tasks 2 (CSS), 10, 12. §2 year cascade → Tasks 3 (metadata), 4 (i18n), 7 (trust strip), 9 (stats). §3 routing → Tasks 3,5,6,12,13,14. §4 Arabic-no-English → Tasks 4,5,6,7,8 (+ verification grep). §5 detailed services → Tasks 4,14. Verification → Task 15. All spec sections mapped.

**Placeholder scan:** No "TBD"/"handle edge cases"/missing-code patterns. Every code step shows complete, copy-pasteable content. Full AR+EN service copy is inline (no "AR mirror" shorthand).

**Type consistency:** `dict.brand.{name,since,est,monogram,monogramYear}`, `dict.hero.trust[]`, `dict.services.viewAll`, `dict.servicesDetail.{eyebrow,title,subtitle,whatWeHandle,ctaTitle,ctaBody,ctaButton,items[].{icon,title,intro,body,points[]}}`, `dict.clients.{title,names[]}`, `dict.contact.{directLine,phoneLabel,emailLabel,addressLabel}` are defined in Task 4 Step 1 and consumed with identical names in Tasks 5–14. `anchor()` helper signature identical in Header and Footer. `stat-num` class defined in Task 2, applied in Task 9.

> Note: `dict.contact.{directLine,phoneLabel,emailLabel,addressLabel}` are added to the type/dictionaries for completeness per spec §4, but `components/Contact.tsx` already renders these as already-localized ternaries (no English-in-Arabic leak). Rewiring Contact.tsx to read them is optional polish and intentionally omitted to limit churn (YAGNI); the keys exist if a future task wants them.
