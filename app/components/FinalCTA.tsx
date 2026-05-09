"use client";

import { motion } from "framer-motion";
import { useTranslation } from "../contexts/I18nProvider";

export function FinalCTA() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full py-32 md:py-48 overflow-hidden bg-[var(--background)]">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="card-surface rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--accent)]/10 blur-[100px] pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-4xl md:text-7xl font-bold text-[var(--text-primary)] mb-8 tracking-tighter leading-tight">
              {t("cta.title")}
            </h2>
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-16 max-w-2xl mx-auto leading-relaxed">
              {t("cta.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <motion.a
                href="https://github.com/BiViPi/xensnip/releases/latest"
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-6 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xl font-bold rounded-2xl transition-all shadow-2xl shadow-[var(--accent)]/40 flex items-center gap-3"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                {t("cta.download")}
              </motion.a>
              <motion.a
                href="https://github.com/BiViPi/xensnip"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                className="text-[var(--text-primary)] hover:text-[var(--accent)] text-lg font-bold flex items-center gap-2 transition-colors"
              >
                {t("cta.github")}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.a>
            </div>
            
            <div className="mt-16 pt-16 border-t border-[var(--border)]">
              <p className="text-sm text-[var(--text-muted)] uppercase tracking-[0.4em] font-bold">
                {t("cta.tags")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
