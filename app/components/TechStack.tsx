"use client";

import { motion } from "framer-motion";
import { useTranslation } from "../contexts/I18nProvider";

const TECH_ICONS = [
  (
    <svg key="1" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  (
    <svg key="2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2" />
      <path d="M12 7c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5z" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </svg>
  ),
  (
    <svg key="3" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z" />
      <circle cx="8" cy="8" r="1" />
      <circle cx="16" cy="10" r="1" />
      <circle cx="14" cy="16" r="1" />
      <circle cx="7" cy="15" r="1" />
    </svg>
  ),
  (
    <svg key="4" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3V2h10v1M21 8v7M3 8v7M7 21v1h10v-1M12 8v8M8 12h8" />
    </svg>
  ),
];

export function TechStack() {
  const { t } = useTranslation();
  const techCards = t("tech.cards") || [];
  const stats = t("tech.stats") || [];

  return (
    <section className="relative w-full bg-[var(--background)] py-32 md:py-48 overflow-hidden border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-8">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center p-3 rounded-2xl bg-[var(--panel)] border border-[var(--border)] mb-8"
          >
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
             </svg>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-tight"
          >
            {t("tech.title")}
          </motion.h2>
        </div>

        {/* Tech Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {techCards.map((tech: any, i: number) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (i * 0.1), duration: 0.5 }}
              viewport={{ once: true }}
              className="card-surface group relative p-8 rounded-[2rem] hover:border-[var(--accent)]/30 transition-all duration-500 flex flex-col items-start text-left overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 w-14 h-14 mb-8 rounded-2xl bg-[var(--panel)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] transition-colors group-hover:border-[var(--accent)]/30">
                {TECH_ICONS[i]}
              </div>
              <h3 className="relative z-10 text-xl font-bold text-[var(--text-primary)] mb-4">{tech.name}</h3>
              <p className="relative z-10 text-[var(--text-secondary)] text-sm leading-relaxed">{tech.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="card-surface rounded-[3rem] p-12 md:p-20 relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)]/5 blur-[140px] pointer-events-none" />
          
          <div className="relative z-10 text-center mb-16">
             <span className="text-xs font-bold uppercase tracking-[0.4em] text-[var(--text-muted)]">{t("tech.sysReq")}</span>
          </div>

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            {stats.map((stat: any, i: number) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (i * 0.1) }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <span className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-[var(--text-primary)]">
                  {stat.value}
                </span>
                <span className="text-[var(--text-muted)] font-bold text-[10px] uppercase tracking-[0.3em]">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
