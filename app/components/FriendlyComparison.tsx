"use client";

import { motion } from "framer-motion";
import { useTranslation } from "../contexts/I18nProvider";

// Data fetched from i18n
// Comparison data includes highlights directly or via index logic

export function FriendlyComparison() {
  const { t } = useTranslation();
  
  const headers = t("comparison.headers") || {};
  const data = t("comparison.data") || [];

  return (
    <section className="relative w-full bg-[var(--background)] py-24 md:py-32 border-t border-[var(--border)]">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            {t("comparison.title")}
          </h2>
          <p className="text-[var(--text-secondary)] text-lg">
            {t("comparison.subtitle")}
          </p>
        </div>

        <div className="card-surface overflow-hidden rounded-3xl">
          <div className="grid grid-cols-3 bg-[var(--panel)] border-b border-[var(--border)] p-6 text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">
            <div>{headers.feature || "Feature"}</div>
            <div className="text-center">{headers.generic || "Generic Tools"}</div>
            <div className="text-right text-[var(--accent)]">{headers.xensnip || "XenSnip"}</div>
          </div>

          <div className="divide-y divide-[var(--border)] bg-[var(--surface)]">
            {data.map((item: any, index: number) => {
              // highlight 1st and last elements as originally designed
              const highlight = index === 0 || index === data.length - 1;
              return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`grid grid-cols-3 p-6 items-center transition-colors hover:bg-[var(--border-soft)] ${highlight ? "bg-[var(--accent-soft)]" : ""}`}
              >
                <div className="text-[var(--text-primary)] font-medium">{item.feature}</div>
                <div className="text-center text-[var(--text-secondary)]">{item.others}</div>
                <div className={`text-right font-bold ${highlight ? "text-[var(--accent)]" : "text-[var(--text-primary)]"}`}>
                  {item.xensnip}
                </div>
              </motion.div>
            )})}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-[var(--text-muted)] italic opacity-70">
            * Comparison based on standard features found in popular Windows screenshot utilities.
          </p>
        </div>
      </div>
    </section>
  );
}
