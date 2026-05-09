"use client";

import React, { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import en from "../locales/en.json";
import vi from "../locales/vi.json";

type Locale = "en" | "vi";
type TranslationPrimitive = string;
type TranslationValue = TranslationPrimitive | TranslationMap | TranslationValue[];
type TranslationMap = { [key: string]: TranslationValue };

interface I18nContextType {
  locale: Locale;
  t: <T = string>(key: string) => T;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const dictionaries: Record<Locale, TranslationMap> = {
  en: en as TranslationMap,
  vi: vi as TranslationMap,
};

function getStoredLocale(): Locale {
  if (typeof window === "undefined") {
    return "en";
  }

  const saved = window.localStorage.getItem("locale");
  return saved === "vi" ? "vi" : "en";
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === "locale") {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorage);
  return () => window.removeEventListener("storage", handleStorage);
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore<Locale>(subscribe, getStoredLocale, () => "en");

  const handleSetLocale = useCallback((newLocale: Locale) => {
    window.localStorage.setItem("locale", newLocale);
    window.dispatchEvent(new StorageEvent("storage", { key: "locale", newValue: newLocale }));
  }, []);

  const t = useCallback(
    <T = string,>(path: string): T => {
      const keys = path.split(".");
      let current: TranslationValue | undefined = dictionaries[locale];

      for (const key of keys) {
        if (!current || typeof current === "string" || Array.isArray(current) || !(key in current)) {
          return path as T;
        }
        current = current[key];
      }

      return current as T;
    },
    [locale]
  );

  const value = useMemo(
    () => ({
      locale,
      t,
      setLocale: handleSetLocale,
    }),
    [handleSetLocale, locale, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
}
