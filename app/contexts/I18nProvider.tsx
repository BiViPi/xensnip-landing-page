"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en.json';
import vi from '../locales/vi.json';

type Locale = 'en' | 'vi';
type Translations = typeof en;

interface I18nContextType {
  locale: Locale;
  t: (key: string) => any;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const dictionaries = {
  en,
  vi
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale;
    if (saved && (saved === 'en' || saved === 'vi')) {
      setLocale(saved);
    }
    setMounted(true);
  }, []);

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  // Simple dot-notation key resolver: e.g. "nav.workflow"
  const t = (path: string): any => {
    const keys = path.split('.');
    let current: any = dictionaries[locale];
    for (const key of keys) {
      if (current[key] === undefined) {
        return path; // fallback to key
      }
      current = current[key];
    }
    return current;
  };

  // Prevent hydration mismatch by rendering default initially
  if (!mounted) {
    return (
      <I18nContext.Provider value={{ locale: 'en', t, setLocale: handleSetLocale }}>
        {children}
      </I18nContext.Provider>
    );
  }

  return (
    <I18nContext.Provider value={{ locale, t, setLocale: handleSetLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
}
