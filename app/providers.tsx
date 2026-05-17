'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { dictionaries, type Dict, type Locale } from '@/lib/i18n';

type Ctx = {
  locale: Locale;
  dict: Dict;
  setLocale: (l: Locale) => void;
  toggle: () => void;
};

const I18nCtx = createContext<Ctx | null>(null);

const STORAGE_KEY = 'elite-law-locale';

function applyDirection(locale: Locale) {
  const dir = dictionaries[locale].dir;
  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ar');

  useEffect(() => {
    const stored = (typeof window !== 'undefined' && (localStorage.getItem(STORAGE_KEY) as Locale)) || 'ar';
    setLocaleState(stored);
    applyDirection(stored);
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, l);
    applyDirection(l);
  }, []);

  const toggle = useCallback(() => {
    setLocale(locale === 'ar' ? 'en' : 'ar');
  }, [locale, setLocale]);

  return (
    <I18nCtx.Provider value={{ locale, dict: dictionaries[locale], setLocale, toggle }}>
      {children}
    </I18nCtx.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
