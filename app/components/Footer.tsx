"use client";

import { motion } from "framer-motion";
import { useTranslation } from "../contexts/I18nProvider";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-[var(--background)] py-12 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[var(--accent)] flex items-center justify-center shadow-lg shadow-[var(--accent)]/20">
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                 </svg>
              </div>
              <span className="text-[var(--text-primary)] text-xl font-bold tracking-tight">XenSnip</span>
            </div>
            <p className="text-[var(--text-muted)] text-sm font-medium">
              &copy; {currentYear} XenSnip. {t("footer.description")}
            </p>
          </div>

          {/* Links & Tagline */}
          <div className="flex flex-col md:items-end gap-6">
            <div className="flex items-center gap-8">
              <a 
                href="https://github.com/BiViPi/xensnip" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-sm font-bold transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://github.com/BiViPi/xensnip/blob/main/LICENSE" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-sm font-bold transition-colors"
              >
                {t("footer.license")}
              </a>
              <a 
                href="#" 
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-sm font-bold transition-colors"
              >
                {t("footer.privacy")}
              </a>
            </div>
            <div className="text-[var(--accent)] text-[10px] uppercase tracking-[0.4em] font-black opacity-40">
              {t("footer.tagline")}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
