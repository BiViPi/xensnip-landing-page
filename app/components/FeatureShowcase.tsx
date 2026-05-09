"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "../contexts/I18nProvider";

const FEATURES_CONFIG = [
  { id: "capture", image: "/images/feature_capture.png" },
  { id: "annotate", image: "/images/feature_annotate.png" },
  { id: "redact", image: "/images/feature_redact.png" }
];

export function FeatureShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();

  const nextFeature = () => {
    setCurrentIndex((prev) => (prev + 1) % FEATURES_CONFIG.length);
  };

  const prevFeature = () => {
    setCurrentIndex((prev) => (prev - 1 + FEATURES_CONFIG.length) % FEATURES_CONFIG.length);
  };

  const featuresData = t("showcase.features");

  return (
    <section id="features" className="relative w-full py-24 md:py-32 overflow-hidden bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-16 md:mb-24 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
            {t("showcase.title")}
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            {t("showcase.subtitle")}
          </p>
        </div>

        {/* Hybrid Interactive Stage */}
        <div className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left: Interactive Card */}
          <div className="w-full lg:w-1/3 flex flex-col relative z-10">
            <div className="card-surface rounded-3xl p-8 relative min-h-[280px] flex flex-col justify-center transition-all duration-300">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center mb-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
                    {featuresData?.[FEATURES_CONFIG[currentIndex].id]?.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {featuresData?.[FEATURES_CONFIG[currentIndex].id]?.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="absolute -bottom-6 left-8 flex gap-3">
                <button 
                  onClick={prevFeature}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--panel)] border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--border-soft)] hover:scale-105 transition-all shadow-lg"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button 
                  onClick={nextFeature}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] hover:scale-105 transition-all shadow-lg shadow-[var(--accent)]/20"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>

            </div>
            
            {/* Indicators */}
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

          {/* Right: Pinned/Dynamic Scene */}
          <div className="w-full lg:w-2/3 relative aspect-video bg-[var(--surface)] rounded-3xl border border-[var(--border)] overflow-hidden flex items-center justify-center shadow-[var(--shadow-card)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-center p-8"
              >
                {/* Placeholder for actual image/video/interactive element */}
                <div className="w-full h-full rounded-xl border border-[var(--border)] border-dashed flex items-center justify-center bg-[var(--panel)]/50">
                  <span className="text-[var(--text-muted)] font-medium tracking-widest uppercase">
                    Visual: {FEATURES_CONFIG[currentIndex].id}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
