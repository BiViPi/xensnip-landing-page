"use client";

import Link from "next/link";
import { useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "../contexts/I18nProvider";
import { useTheme } from "../contexts/ThemeProvider";
import { MotionNav } from "./motion-compat";

export function Nav() {
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);
  const { t, locale, setLocale } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setHasScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <MotionNav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${
        hasScrolled 
          ? "py-4 bg-[var(--surface)]/70 backdrop-blur-[18px] border-b border-[var(--border)]" 
          : "py-8 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent)] flex items-center justify-center shadow-lg shadow-[var(--accent)]/20 group-hover:scale-110 transition-transform">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
               <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
               <circle cx="12" cy="13" r="3" />
             </svg>
          </div>
          <span className="text-xl font-bold text-[var(--text-primary)] tracking-tight">XenSnip</span>
        </Link>

        {/* Links - Desktop */}
        <div className="hidden md:flex items-center gap-10">
          <a href="#workflow" className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">{t("nav.workflow")}</a>
          <a href="#features" className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">{t("nav.features")}</a>
          <a href="#faq" className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">{t("nav.faq")}</a>
        </div>

        {/* CTA & Toggles */}
        <div className="flex items-center gap-6">
          {/* Theme & Lang Toggles */}
          <div className="flex items-center gap-4 border-r border-[var(--border)] pr-6">
            <button 
              onClick={toggleTheme} 
              className="rounded-xl p-2 text-[var(--text-muted)] transition-all hover:bg-[var(--border-soft)] hover:text-[var(--text-primary)]"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>
            <button 
              onClick={() => setLocale(locale === 'en' ? 'vi' : 'en')} 
              className="rounded-xl px-2.5 py-2 text-[var(--text-muted)] font-bold text-sm transition-all hover:bg-[var(--border-soft)] hover:text-[var(--text-primary)]"
            >
              {locale.toUpperCase()}
            </button>
          </div>

          <a 
            href="https://github.com/BiViPi/xensnip/releases/latest"
            className="lightning-hover relative hidden sm:inline-flex items-center justify-center rounded-2xl bg-[var(--accent)] px-6 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--accent-hover)] shadow-lg shadow-[0_14px_30px_-16px_rgba(82,102,235,0.65)] hover:shadow-[0_20px_36px_-14px_rgba(82,102,235,0.75)]"
          >
            <span className="pointer-events-none absolute inset-0 rounded-2xl border border-white/20" />
            <span className="relative z-10">{t("nav.download")}</span>
          </a>
        </div>
      </div>
    </MotionNav>
  );
}
