"use client";

import Link from "next/link";
import { useScroll, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "../contexts/I18nProvider";
import { useTheme } from "../contexts/ThemeProvider";
import { MotionNav, MotionDiv } from "./motion-compat";

export function Nav() {
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { t, locale, setLocale } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setHasScrolled(latest > 50);
    });
  }, [scrollY]);

  // Close mobile menu on scroll or resize to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <MotionNav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${
          hasScrolled || isOpen
            ? "py-3 bg-[var(--surface)]/80 backdrop-blur-[20px] border-b border-[var(--border)] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15),inset_0_-1px_0_rgba(255,255,255,0.06)]"
            : "py-4 md:py-8 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group z-[101]" onClick={() => setIsOpen(false)}>
            <img
              src="/logo.svg"
              alt="XenSnip logo"
              width={28}
              height={28}
              className="group-hover:scale-110 transition-transform duration-200"
            />
            <span className="text-xl font-bold text-[var(--text-primary)] tracking-tight">XenSnip</span>
          </Link>

          {/* Links - Desktop */}
          <div className="hidden md:flex items-center gap-10">
            <a href="#workflow" className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">{t("nav.workflow")}</a>
            <a href="#features" className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">{t("nav.features")}</a>
            <a href="#faq" className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">{t("nav.faq")}</a>
          </div>

          {/* CTA & Toggles */}
          <div className="flex items-center gap-4 lg:gap-6 z-[101]">
            {/* Theme & Lang Toggles */}
            <div className="flex items-center gap-2 md:gap-4 border-r border-[var(--border)] pr-4 md:pr-6">
              <button 
                onClick={toggleTheme} 
                className="rounded-xl p-2 text-[var(--text-muted)] transition-all hover:bg-[var(--border-soft)] hover:text-[var(--text-primary)]"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                )}
              </button>
              <button 
                onClick={() => setLocale(locale === 'en' ? 'vi' : 'en')} 
                className="rounded-xl px-2 py-1.5 text-[var(--text-muted)] font-bold text-xs md:text-sm transition-all hover:bg-[var(--border-soft)] hover:text-[var(--text-primary)]"
              >
                {locale.toUpperCase()}
              </button>
            </div>

            <a 
              href="https://github.com/BiViPi/xensnip/releases/latest"
              className="lightning-hover relative hidden sm:inline-flex items-center justify-center rounded-2xl bg-[var(--accent)] px-5 py-2 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--accent-hover)] shadow-lg shadow-[0_10px_24px_-12px_rgba(82,102,235,0.65)]"
            >
              <span className="pointer-events-none absolute inset-0 rounded-2xl border border-white/20" />
              <span className="relative z-10">{t("nav.download")}</span>
            </a>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl hover:bg-[var(--border-soft)] text-[var(--text-primary)] z-[101] relative transition-colors"
              aria-label="Toggle menu"
            >
              <span className={`w-5 h-[2px] bg-current rounded transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
              <span className={`w-5 h-[2px] bg-current rounded my-1 transition-all duration-300 ${isOpen ? "opacity-0 scale-0" : ""}`} />
              <span className={`w-5 h-[2px] bg-current rounded transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
            </button>
          </div>
        </div>
      </MotionNav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-0 pt-20 pb-8 bg-[var(--surface)]/95 backdrop-blur-[24px] border-b border-[var(--border)] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.15)] z-[90] flex flex-col px-6 gap-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              <a 
                href="#workflow" 
                onClick={() => setIsOpen(false)}
                className="text-base font-semibold text-[var(--text-primary)] py-3 px-4 rounded-2xl hover:bg-[var(--border-soft)] transition-colors"
              >
                {t("nav.workflow")}
              </a>
              <a 
                href="#features" 
                onClick={() => setIsOpen(false)}
                className="text-base font-semibold text-[var(--text-primary)] py-3 px-4 rounded-2xl hover:bg-[var(--border-soft)] transition-colors"
              >
                {t("nav.features")}
              </a>
              <a 
                href="#faq" 
                onClick={() => setIsOpen(false)}
                className="text-base font-semibold text-[var(--text-primary)] py-3 px-4 rounded-2xl hover:bg-[var(--border-soft)] transition-colors"
              >
                {t("nav.faq")}
              </a>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-[var(--border)]">
              <a
                href="https://github.com/BiViPi/xensnip/releases/latest"
                className="lightning-hover relative flex items-center justify-center rounded-2xl bg-[var(--accent)] py-4 text-base font-bold text-white shadow-xl shadow-[var(--accent)]/20 active:scale-98 transition-all"
              >
                <span className="pointer-events-none absolute inset-0 rounded-2xl border border-white/20" />
                <span className="relative z-10">{t("cta.download")}</span>
              </a>
              <a
                href="https://github.com/BiViPi/xensnip"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] py-4 text-base font-semibold text-[var(--text-primary)] active:bg-[var(--border-soft)] transition-all"
              >
                GitHub
              </a>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
}

