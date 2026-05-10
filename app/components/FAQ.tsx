"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "../contexts/I18nProvider";

interface FaqItem {
  question: string;
  answer: string;
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useTranslation();
  const faqData = t<FaqItem[]>("faq.data");

  return (
    <section id="faq" className="relative w-full bg-[var(--background)] py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            {t("faq.title")}
          </h2>
          <p className="text-[var(--text-secondary)] text-lg">
            {t("faq.subtitle")}
          </p>
        </div>

        <div className="card-surface overflow-hidden rounded-3xl">
          {faqData.map((faq, i: number) => (
            <div key={i} className={i === 0 ? "" : "border-t border-[var(--border)]"}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-[var(--border-soft)]"
              >
                <span className="text-lg font-semibold text-[var(--text-primary)]">{faq.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  style={{ color: "var(--accent)", display: "inline-flex" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </motion.span>
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-6 pb-6 text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border)] pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
