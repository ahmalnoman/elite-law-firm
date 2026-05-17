'use client';

import { useI18n } from '@/app/providers';

export default function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useI18n();

  return (
    <div
      role="group"
      aria-label="Language switcher"
      className={`relative inline-flex items-center rounded-full border border-gold/30 bg-ink/60 backdrop-blur-md p-1 ${compact ? 'text-xs' : 'text-sm'}`}
    >
      <button
        onClick={() => setLocale('ar')}
        className={`relative z-10 px-3 py-1.5 rounded-full transition-colors duration-300 ${locale === 'ar' ? 'text-ink' : 'text-bone/70 hover:text-bone'}`}
        aria-pressed={locale === 'ar'}
      >
        العربية
      </button>
      <button
        onClick={() => setLocale('en')}
        className={`relative z-10 px-3 py-1.5 rounded-full transition-colors duration-300 ${locale === 'en' ? 'text-ink' : 'text-bone/70 hover:text-bone'}`}
        aria-pressed={locale === 'en'}
      >
        EN
      </button>
      {/* sliding pill */}
      <span
        aria-hidden="true"
        className="absolute top-1 bottom-1 rounded-full bg-gold-gradient shadow-gold-soft transition-all duration-300"
        style={{
          insetInlineStart: locale === 'ar' ? '4px' : 'calc(50% + 0px)',
          width: 'calc(50% - 4px)',
        }}
      />
    </div>
  );
}
