"use client";

import { useTranslation } from "../contexts/I18nProvider";
import { MotionDiv, MotionH2 } from "./motion-compat";

interface TechCard {
  name: string;
  desc: string;
}

interface TechStat {
  label: string;
  value: string;
}

const TECH_ICONS = [
  (
    <svg key="1" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 4.5 7.5v9L12 21l7.5-4.5v-9L12 3Z" />
      <path d="M9 9h6l-3 6" />
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
      <circle cx="6" cy="7" r="1.75" />
      <circle cx="18" cy="7" r="1.75" />
      <circle cx="12" cy="17" r="1.75" />
      <path d="M7.5 8.5 10.7 14" />
      <path d="M16.5 8.5 13.3 14" />
      <path d="M8.5 7h7" />
    </svg>
  ),
  (
    <svg key="4" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8V6.5A2.5 2.5 0 0 1 6.5 4H8" />
      <path d="M20 8V6.5A2.5 2.5 0 0 0 17.5 4H16" />
      <path d="M4 16v1.5A2.5 2.5 0 0 0 6.5 20H8" />
      <path d="M20 16v1.5A2.5 2.5 0 0 1 17.5 20H16" />
      <path d="M8 9h8" />
      <path d="M8 12h8" />
      <path d="M8 15h5" />
    </svg>
  ),
];

export function TechStack() {
  const { t } = useTranslation();
  const techCards = t<TechCard[]>("tech.cards");
  const stats = t<TechStat[]>("tech.stats");

  return (
    <section className="relative w-full bg-[var(--background)] py-32 md:py-48 overflow-hidden border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-8">
        
        {/* Header */}
        <div className="text-center mb-24">
          <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-surface mb-8 inline-flex items-center justify-center rounded-2xl p-3"
          >
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
             </svg>
          </MotionDiv>
          <MotionH2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-tight"
          >
            {t("tech.title")}
          </MotionH2>
        </div>

        {/* Tech Cards Grid */}
        <div className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_0.9fr]">
          {techCards.map((tech, i: number) => (
            <MotionDiv
              key={tech.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (i * 0.1), duration: 0.5 }}
              viewport={{ once: true }}
              className="card-surface group relative p-8 rounded-[2rem] hover:border-[var(--accent)]/30 transition-all duration-500 flex flex-col items-start text-left overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="card-surface relative z-10 mb-8 flex h-14 w-14 items-center justify-center rounded-2xl text-[var(--accent)] transition-colors group-hover:border-[var(--accent)]/30">
                {TECH_ICONS[i]}
              </div>
              <h3 className="relative z-10 text-xl font-bold text-[var(--text-primary)] mb-4">{tech.name}</h3>
              <p className="relative z-10 text-[var(--text-secondary)] text-sm leading-relaxed">{tech.desc}</p>
            </MotionDiv>
          ))}
        </div>

        {/* Stats Section */}
        <MotionDiv 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="card-surface rounded-[3rem] p-12 md:p-20 relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-[var(--accent)]/10 blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 text-center mb-16">
             <span className="text-xs font-bold uppercase tracking-[0.4em] text-[var(--text-muted)]">{t("tech.sysReq")}</span>
          </div>

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            {stats.map((stat, i: number) => (
              <MotionDiv 
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
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>

      </div>
    </section>
  );
}
