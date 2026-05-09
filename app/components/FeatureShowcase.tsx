"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "../contexts/I18nProvider";

function CaptureIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function AnnotateIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

function RedactIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3l18 18" />
      <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.11 11 8-1.04 2.96-3.22 5.24-5.96 6.42" />
      <path d="M6.23 6.23A11.2 11.2 0 0 0 1 12c1.73 4.89 6 8 11 8 1.71 0 3.34-.36 4.82-1.01" />
      <path d="M10.58 10.58A2 2 0 0 0 14 12" />
    </svg>
  );
}

const FEATURES_CONFIG = [
  { id: "capture", image: "/images/feature_capture.png", icon: <CaptureIcon /> },
  { id: "annotate", image: "/images/feature_annotate.png", icon: <AnnotateIcon /> },
  { id: "redact", image: "/images/feature_redact.png", icon: <RedactIcon /> },
];

interface FeatureContent {
  title: string;
  description: string;
}

export function FeatureShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();

  const nextFeature = () => {
    setCurrentIndex((prev) => (prev + 1) % FEATURES_CONFIG.length);
  };

  const prevFeature = () => {
    setCurrentIndex((prev) => (prev - 1 + FEATURES_CONFIG.length) % FEATURES_CONFIG.length);
  };

  const featuresData = t<Record<string, FeatureContent>>("showcase.features");

  return (
    <section id="features" className="relative w-full overflow-hidden bg-[var(--background)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-16 text-center md:mb-24">
          <h2 className="mb-6 text-3xl font-bold text-[var(--text-primary)] md:text-5xl">
            {t("showcase.title")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[var(--text-secondary)] md:text-xl">
            {t("showcase.subtitle")}
          </p>
        </div>

        <div className="relative grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div className="relative z-10 flex w-full flex-col">
            <div className="card-surface relative flex min-h-[280px] flex-col justify-center rounded-3xl p-8 ring-1 ring-[rgba(82,102,235,0.18)] transition-all duration-300">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)]">
                    {FEATURES_CONFIG[currentIndex].icon}
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-[var(--text-primary)]">
                    {featuresData?.[FEATURES_CONFIG[currentIndex].id]?.title}
                  </h3>
                  <p className="leading-relaxed text-[var(--text-secondary)]">
                    {featuresData?.[FEATURES_CONFIG[currentIndex].id]?.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="absolute -bottom-6 left-8 flex gap-3">
                <button
                  onClick={prevFeature}
                  className="card-surface flex h-12 w-12 items-center justify-center rounded-2xl text-[var(--text-primary)] transition-all hover:-translate-y-0.5 hover:bg-[var(--border-soft)]"
                  aria-label="Previous feature"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={nextFeature}
                  className="lightning-hover relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)] text-white transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-hover)] shadow-lg shadow-[0_16px_28px_-16px_rgba(82,102,235,0.75)]"
                  aria-label="Next feature"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-12 flex gap-2 pl-8">
              {FEATURES_CONFIG.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? "w-8 bg-[var(--accent)]" : "w-3 bg-[var(--border)]"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="card-surface relative aspect-video w-full overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <div className="absolute inset-0">
                  <Image
                    src={FEATURES_CONFIG[currentIndex].image}
                    alt={featuresData?.[FEATURES_CONFIG[currentIndex].id]?.title || ""}
                    fill
                    className="object-contain p-6 md:p-8"
                    priority={currentIndex === 0}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
