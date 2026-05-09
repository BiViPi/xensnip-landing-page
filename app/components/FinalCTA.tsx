"use client";

import { useTranslation } from "../contexts/I18nProvider";
import { MotionA, MotionDiv } from "./motion-compat";

export function FinalCTA() {
  const { t, locale } = useTranslation();

  return (
    <section className="relative w-full py-32 md:py-48 overflow-hidden bg-[var(--background)] border-t border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="card-surface rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--accent)]/10 blur-[100px] pointer-events-none" />
          
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 tracking-tight leading-[1.1]">
              {t("cta.title")}
            </h2>
            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-12 max-w-xl mx-auto leading-relaxed">
              {t("cta.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
              <MotionA
                href="https://github.com/BiViPi/xensnip/releases/latest"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="lightning-hover relative flex items-center gap-3 overflow-hidden rounded-2xl bg-[var(--accent)] px-8 py-4 text-lg font-bold text-white transition-all shadow-2xl shadow-[var(--accent)]/40 group"
              >
                {/* Resting-state lighting */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/5 to-white/10" />
                {/* Hover lighting */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/8 to-white/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                {/* Bright Rim */}
                <div className="absolute inset-0 border border-white/30 rounded-2xl pointer-events-none" />
                
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span className="relative z-10">{t("cta.download")}</span>
              </MotionA>
              
              <MotionA
                href="https://github.com/BiViPi/xensnip"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 3 }}
                className="text-[var(--text-primary)] hover:text-[var(--accent)] text-lg font-bold flex items-center gap-2 transition-all"
              >
                {t("cta.github")}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </MotionA>
            </div>
            
            <div className="mt-16 pt-12 border-t border-[var(--border)]">
              <p
                className={`text-[var(--text-muted)] opacity-60 ${
                  locale === "en"
                    ? "text-[10px] uppercase tracking-[0.5em] font-black"
                    : "text-[11px] font-semibold"
                }`}
              >
                {t("cta.tags")}
              </p>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
