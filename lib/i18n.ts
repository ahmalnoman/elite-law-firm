export type Locale = 'ar' | 'en';

export type Dict = {
  dir: 'rtl' | 'ltr';
  nav: {
    home: string;
    about: string;
    services: string;
    cases: string;
    testimonials: string;
    contact: string;
    book: string;
  };
  hero: {
    eyebrow: string;
    title1: string;
    title2: string;
    titleAccent: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    scrollHint: string;
  };
  stats: {
    years: string;
    cases: string;
    clients: string;
    rate: string;
  };
  about: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    p3: string;
    pillar1Title: string;
    pillar1Body: string;
    pillar2Title: string;
    pillar2Body: string;
    pillar3Title: string;
    pillar3Body: string;
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { title: string; body: string; icon: string }[];
  };
  cases: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { tag: string; title: string; body: string; outcome: string }[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    items: { quote: string; name: string; role: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    step: string;
    of: string;
    next: string;
    back: string;
    submit: string;
    success: string;
    successBody: string;
    step1Title: string;
    step2Title: string;
    step3Title: string;
    fields: {
      caseType: string;
      caseTypes: string[];
      message: string;
      name: string;
      email: string;
      phone: string;
      date: string;
      time: string;
      times: string[];
    };
  };
  footer: {
    tagline: string;
    quickLinks: string;
    practice: string;
    visit: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    hoursValue: string;
    rights: string;
  };
  lang: { ar: string; en: string };
};

export const dictionaries: Record<Locale, Dict> = {
  ar: {
    dir: 'rtl',
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'خدماتنا',
      cases: 'قضايا بارزة',
      testimonials: 'آراء العملاء',
      contact: 'تواصل معنا',
      book: 'احجز استشارة',
    },
    hero: {
      eyebrow: 'منذ عام ١٩٩٥ — القاهرة',
      title1: 'حيث تلتقي',
      titleAccent: 'الخبرة',
      title2: 'بالنخبة',
      subtitle:
        'مكتب محاماة النخبة. ربع قرن من التميّز في القانون التجاري والتقاضي وقضايا الأحوال الشخصية، نخدم نخبة من العملاء داخل مصر وخارجها بأعلى المعايير المهنية.',
      primaryCta: 'احجز استشارتك المجانية',
      secondaryCta: 'اكتشف خدماتنا',
      scrollHint: 'اكتشف المزيد',
    },
    stats: {
      years: 'عاماً من الخبرة',
      cases: 'قضية ناجحة',
      clients: 'عميل من النخبة',
      rate: 'نسبة نجاح',
    },
    about: {
      eyebrow: 'من نحن',
      title: 'إرثٌ قانوني يُكتب بحبر الثقة',
      p1: 'تأسس مكتب محاماة النخبة عام ١٩٩٥ على يد نخبة من أبرز القانونيين في مصر، ليُقدّم رؤية جديدة لمهنة المحاماة تجمع بين الأصالة الفقهية والذكاء التجاري الحديث.',
      p2: 'نؤمن أن كل قضية تحمل بصمة إنسانية فريدة، ولذلك نُكرّس لها وقتاً واستراتيجية وفريقاً متخصصاً، ولا نُغلق ملفها قبل أن نُحقق لعميلنا أفضل النتائج الممكنة.',
      p3: 'يتشرف المكتب بثقة كبرى الشركات والمؤسسات والشخصيات العامة، ويمتد نشاطه ليشمل القاهرة والإسكندرية والمحاكم الدولية.',
      pillar1Title: 'سرية مطلقة',
      pillar1Body: 'نحفظ أسرار عملائنا كما نحفظ شرف المهنة، بمعايير صارمة للخصوصية وحماية البيانات.',
      pillar2Title: 'حضور شخصي',
      pillar2Body: 'كل عميل يحظى بمحامٍ شريك يتولى قضيته بنفسه، لا فريق متبدّل بلا وجه.',
      pillar3Title: 'نتائج موثّقة',
      pillar3Body: 'أكثر من ١٢٠٠ حكم لصالح عملائنا، نُقدّمها بأرقام لا بأقوال.',
    },
    services: {
      eyebrow: 'مجالات الممارسة',
      title: 'خدمات قانونية تُليق بمقامك',
      subtitle: 'باقة متكاملة من الخدمات تُغطي كل احتياجاتك القانونية، تحت سقف واحد وبفريق واحد.',
      items: [
        {
          icon: 'briefcase',
          title: 'القانون التجاري والشركات',
          body: 'تأسيس الشركات، صياغة العقود، الاستحواذات والاندماجات، حوكمة الشركات، حماية الملكية الفكرية، والاستشارات الاستراتيجية لكبرى المؤسسات.',
        },
        {
          icon: 'scale',
          title: 'التقاضي والتحكيم',
          body: 'تمثيل العملاء أمام محاكم النقض والاستئناف والابتدائية والإدارية، إضافة إلى التحكيم التجاري المحلي والدولي.',
        },
        {
          icon: 'heart',
          title: 'الأحوال الشخصية',
          body: 'قضايا الزواج والطلاق والحضانة والنفقة والميراث، بحساسية إنسانية ومرجعية شرعية عميقة.',
        },
        {
          icon: 'building',
          title: 'العقارات والاستثمار',
          body: 'صفقات شراء وبيع العقارات، عقود الإيجار التجاري، نزاعات الملكية، وتنظيم محافظ الاستثمار العقاري.',
        },
        {
          icon: 'shield',
          title: 'القانون الجنائي',
          body: 'الدفاع في القضايا الجنائية بمختلف درجاتها، وضمان حقوق المتهم وفق أعلى المعايير الإجرائية.',
        },
        {
          icon: 'globe',
          title: 'القانون الدولي',
          body: 'صفقات عابرة للحدود، عقود الاستثمار الأجنبي، تنفيذ الأحكام الأجنبية، وتمثيل العملاء أمام الجهات الدولية.',
        },
      ],
    },
    cases: {
      eyebrow: 'قضايا بارزة',
      title: 'نتائج تتحدث عن نفسها',
      subtitle: 'لمحة من القضايا التي شرّفنا تمثيل أصحابها — أسماء العملاء محفوظة بسرية مطلقة.',
      items: [
        {
          tag: 'تجاري',
          title: 'نزاع مساهمين بقيمة ٤٢٠ مليون جنيه',
          body: 'تمثيل المساهم الأكبر في إحدى أكبر شركات المقاولات أمام محكمة استئناف القاهرة، وانتهى النزاع بتسوية صديّة لصالح موكلنا.',
          outcome: 'استرداد كامل + تعويض',
        },
        {
          tag: 'تحكيم',
          title: 'تحكيم دولي أمام غرفة باريس',
          body: 'الفوز بقضية تحكيم تجاري دولي ضد شركة أوروبية متعددة الجنسيات، بشأن خرق عقد توريد بقيمة ١٧ مليون يورو.',
          outcome: 'حكم نهائي لصالح الموكل',
        },
        {
          tag: 'أحوال شخصية',
          title: 'استرداد حضانة دولية',
          body: 'متابعة قضية حضانة دولية معقّدة امتدت بين ثلاث دول، انتهت باسترداد الأطفال وتثبيت الحضانة لصالح الأم.',
          outcome: 'حضانة كاملة + ولاية تعليم',
        },
      ],
    },
    testimonials: {
      eyebrow: 'آراء عملائنا',
      title: 'ثقتهم وسامُنا',
      items: [
        {
          quote:
            'تعاملت مع كبرى المكاتب في القاهرة، ولم أجد فريقاً يجمع بين الاحتراف والذوق الإنساني مثل النخبة. هم لا يكسبون القضية فقط، بل يكسبون ثقتك للأبد.',
          name: 'م. ك.',
          role: 'رئيس مجلس إدارة شركة قابضة',
        },
        {
          quote:
            'كانت قضيتي معقّدة وامتدت لسنوات. الأستاذ ومعاونوه أداروها بحكمة نادرة وبحضور قانوني مبهر. أنصح بهم بلا تردد.',
          name: 'د. س. ع.',
          role: 'استشاري طبي',
        },
        {
          quote:
            'ما يميّز هذا المكتب أنه يَصدُقك حتى لو لم يكن صدقُه في صالحك أولاً. هذا نادرٌ في زمننا.',
          name: 'أ. ر.',
          role: 'سيدة أعمال',
        },
      ],
    },
    contact: {
      eyebrow: 'احجز استشارتك',
      title: 'أول استشارة مجانية — والسريّة مضمونة',
      subtitle:
        'املأ النموذج وسيتواصل معك أحد شركاء المكتب خلال ٢٤ ساعة عمل. كل ما تُشاركنا به محميٌّ بالامتياز المهني.',
      step: 'الخطوة',
      of: 'من',
      next: 'التالي',
      back: 'السابق',
      submit: 'إرسال الطلب',
      success: 'تم إرسال طلبك بنجاح',
      successBody: 'شكراً لثقتك. سيتواصل معك أحد شركائنا خلال ٢٤ ساعة عمل على البيانات التي قدّمتها.',
      step1Title: 'طبيعة القضية',
      step2Title: 'بيانات التواصل',
      step3Title: 'الموعد المفضّل',
      fields: {
        caseType: 'نوع القضية',
        caseTypes: [
          'قانون تجاري وشركات',
          'تقاضي وتحكيم',
          'أحوال شخصية',
          'عقارات واستثمار',
          'جنائي',
          'قانون دولي',
          'استشارة عامة',
        ],
        message: 'وصف موجز للحالة',
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        date: 'التاريخ المفضّل',
        time: 'التوقيت المفضّل',
        times: ['صباحاً (٩ - ١٢)', 'ظهراً (١٢ - ٣)', 'عصراً (٣ - ٦)', 'مساءً (٦ - ٩)'],
      },
    },
    footer: {
      tagline: 'النخبة في المحاماة — منذ ١٩٩٥',
      quickLinks: 'روابط سريعة',
      practice: 'مجالات الممارسة',
      visit: 'زورونا',
      address: 'برج النيل، كورنيش النيل، جاردن سيتي، القاهرة، مصر',
      phone: '+٢٠ ٢ ٢٧٩٢ ٥٠٠٠',
      email: 'info@elite-law.net',
      hours: 'ساعات العمل',
      hoursValue: 'الأحد – الخميس: ٩ صباحاً – ٧ مساءً',
      rights: 'جميع الحقوق محفوظة لمكتب محاماة النخبة',
    },
    lang: { ar: 'العربية', en: 'English' },
  },
  en: {
    dir: 'ltr',
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Practice Areas',
      cases: 'Notable Cases',
      testimonials: 'Clients',
      contact: 'Contact',
      book: 'Book Consultation',
    },
    hero: {
      eyebrow: 'Cairo · Since 1995',
      title1: 'Where',
      titleAccent: 'expertise',
      title2: 'meets the elite',
      subtitle:
        'Elite Law Firm. A quarter-century of distinguished practice in corporate law, litigation and personal status — serving discerning clients across Egypt and beyond at the highest professional standards.',
      primaryCta: 'Book a free consultation',
      secondaryCta: 'Explore practice areas',
      scrollHint: 'Discover',
    },
    stats: {
      years: 'Years of practice',
      cases: 'Cases won',
      clients: 'Elite clients',
      rate: 'Success rate',
    },
    about: {
      eyebrow: 'About the firm',
      title: 'A legal legacy written in trust',
      p1: 'Founded in 1995 by a select group of Egypt’s leading jurists, Elite Law Firm was built on a single conviction — that law is a craft of both intellect and integrity, and that the finest clients deserve nothing less than the finest counsel.',
      p2: 'We believe every matter carries a uniquely human imprint. Each case is given time, strategy and a dedicated partner; nothing is closed until our client has secured the best outcome possible.',
      p3: 'The firm has been entrusted by leading corporations, institutions and public figures, with active practice spanning Cairo, Alexandria and international fora.',
      pillar1Title: 'Absolute confidentiality',
      pillar1Body: 'We protect our clients’ matters with the same care we hold for the honour of the profession.',
      pillar2Title: 'Partner-led counsel',
      pillar2Body: 'Every client is represented by a named partner — never a rotating team of unfamiliar faces.',
      pillar3Title: 'Proven outcomes',
      pillar3Body: 'Over 1,200 judgments delivered in our clients’ favour — measured, not merely claimed.',
    },
    services: {
      eyebrow: 'Practice areas',
      title: 'Counsel worthy of your standing',
      subtitle: 'A complete suite of legal services, delivered under a single roof by a single dedicated team.',
      items: [
        {
          icon: 'briefcase',
          title: 'Corporate & Commercial',
          body: 'Incorporation, drafting, M&A, corporate governance, intellectual property and strategic counsel to leading enterprises.',
        },
        {
          icon: 'scale',
          title: 'Litigation & Arbitration',
          body: 'Representation before Cassation, Appeal, First-Instance and Administrative courts, plus domestic and international commercial arbitration.',
        },
        {
          icon: 'heart',
          title: 'Personal Status',
          body: 'Marriage, divorce, custody, alimony and inheritance matters handled with deep jurisprudential grounding and human sensitivity.',
        },
        {
          icon: 'building',
          title: 'Real Estate & Investment',
          body: 'Property transactions, commercial leasing, ownership disputes and structuring of real-estate investment portfolios.',
        },
        {
          icon: 'shield',
          title: 'Criminal Defence',
          body: 'Defence in criminal matters at every degree, safeguarding the accused’s rights to the highest procedural standard.',
        },
        {
          icon: 'globe',
          title: 'International Practice',
          body: 'Cross-border transactions, foreign-investment contracts, enforcement of foreign judgments and representation before international bodies.',
        },
      ],
    },
    cases: {
      eyebrow: 'Notable matters',
      title: 'Outcomes that speak for themselves',
      subtitle: 'A glimpse of recent matters — client identities are protected under strict confidentiality.',
      items: [
        {
          tag: 'Commercial',
          title: 'EGP 420M shareholders dispute',
          body: 'Represented the majority shareholder of a leading construction group before the Cairo Court of Appeal; matter resolved by amicable settlement on our client’s terms.',
          outcome: 'Full recovery + damages',
        },
        {
          tag: 'Arbitration',
          title: 'International arbitration · ICC Paris',
          body: 'Won a major ICC arbitration against a European multinational over a €17M supply-contract breach.',
          outcome: 'Final award for client',
        },
        {
          tag: 'Family',
          title: 'Cross-border custody recovery',
          body: 'Coordinated a complex three-jurisdiction custody matter, securing the return of the children and confirming custody in favour of the mother.',
          outcome: 'Full custody + guardianship',
        },
      ],
    },
    testimonials: {
      eyebrow: 'Client voices',
      title: 'Trust, our highest decoration',
      items: [
        {
          quote:
            'I have engaged the largest firms in Cairo and never met a team that combines professionalism with such human grace. They don’t merely win the case — they earn your trust for life.',
          name: 'M. K.',
          role: 'Chairman, holding company',
        },
        {
          quote:
            'My matter was intricate and stretched over years. The partner and his team handled it with rare wisdom and commanding presence. I recommend them without reservation.',
          name: 'Dr. S. A.',
          role: 'Medical consultant',
        },
        {
          quote:
            'What sets this firm apart is candour — even when candour does not, at first, serve them. That is rare in our time.',
          name: 'A. R.',
          role: 'Business owner',
        },
      ],
    },
    contact: {
      eyebrow: 'Book a consultation',
      title: 'Your first consultation is complimentary — and confidential',
      subtitle:
        'Complete the form below and a partner will be in touch within one business day. Everything you share is protected by professional privilege.',
      step: 'Step',
      of: 'of',
      next: 'Continue',
      back: 'Back',
      submit: 'Submit request',
      success: 'Your request has been sent',
      successBody: 'Thank you for your trust. A partner will reach out within one business day on the details you provided.',
      step1Title: 'Nature of the matter',
      step2Title: 'Contact details',
      step3Title: 'Preferred timing',
      fields: {
        caseType: 'Type of matter',
        caseTypes: [
          'Corporate & Commercial',
          'Litigation & Arbitration',
          'Personal Status',
          'Real Estate & Investment',
          'Criminal Defence',
          'International Practice',
          'General consultation',
        ],
        message: 'Brief description',
        name: 'Full name',
        email: 'Email',
        phone: 'Phone',
        date: 'Preferred date',
        time: 'Preferred time',
        times: ['Morning (9–12)', 'Midday (12–3)', 'Afternoon (3–6)', 'Evening (6–9)'],
      },
    },
    footer: {
      tagline: 'The elite standard in counsel — since 1995',
      quickLinks: 'Quick links',
      practice: 'Practice areas',
      visit: 'Visit us',
      address: 'Nile Tower, Corniche El Nil, Garden City, Cairo, Egypt',
      phone: '+20 2 2792 5000',
      email: 'info@elite-law.net',
      hours: 'Working hours',
      hoursValue: 'Sun – Thu · 9 AM – 7 PM',
      rights: 'All rights reserved · Elite Law Firm',
    },
    lang: { ar: 'العربية', en: 'English' },
  },
};
