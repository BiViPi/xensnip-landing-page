"use client";

import { useScroll, useTransform, motion, MotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useTranslation } from "../contexts/I18nProvider";

// ─── UTILS ───────────────────────────────────────────────────────────────────

function createRange(start: number, end: number, fadeOutStart: number, endLimit: number) {
  return [
    Math.max(0, start),
    Math.max(start + 0.001, end),
    Math.max(end + 0.002, fadeOutStart),
    Math.max(fadeOutStart + 0.001, endLimit)
  ];
}

// ─── BEAT DATA ───────────────────────────────────────────────────────────────

type BeatVisual = "after" | "before" | "proof";

interface BeatDef {
  id: string;
  visual: BeatVisual;
  scrollRange: [number, number];
}

const BEATS_CONFIG: BeatDef[] = [
  { id: "why", visual: "before", scrollRange: [0.15, 0.30] },
  { id: "gap", visual: "before", scrollRange: [0.30, 0.45] },
  { id: "answer", visual: "after", scrollRange: [0.45, 0.60] },
  { id: "evidence", visual: "proof", scrollRange: [0.60, 0.85] },
  { id: "result", visual: "after", scrollRange: [0.85, 1.00] }
];

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function Typewriter({ text, start }: { text: string; start: boolean }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const visibleText = useMemo(() => text.slice(0, visibleCount), [text, visibleCount]);

  useEffect(() => {
    if (!start) return;
    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= text.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [start, text]);

  return (
    <p className="mt-8 text-center text-lg md:text-xl text-[var(--text-secondary)] font-medium">
      {visibleText}
      <span className="animate-pulse">|</span>
    </p>
  );
}

function IntroScreen({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.08, 0.14], [1, 1, 0]);
  const scale = useTransform(progress, [0, 0.14], [1, 0.95]);
  const y = useTransform(progress, [0, 0.14], [0, -40]);
  const [started, setStarted] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const time = setTimeout(() => setStarted(true), 800);
    return () => clearTimeout(time);
  }, []);

  return (
    <motion.div 
      style={{ opacity, scale, y, pointerEvents: opacity.get() > 0 ? "auto" : "none" }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--background)] z-50 px-6"
    >
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold text-[var(--text-primary)] text-center"
      >
        {t("hero.welcome")}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <Typewriter text={t("hero.subtitle")} start={started} />
      </motion.div>
    </motion.div>
  );
}

function SplitTextSide({ progress }: { progress: MotionValue<number> }) {
  const { t } = useTranslation();
  const beatsData = t("hero.beats");
  
  return (
    <div className="relative h-full flex flex-col justify-center">
      {BEATS_CONFIG.map((beat, index) => {
        const beatContent = beatsData?.[beat.id];
        const [start, end] = beat.scrollRange;
        const fadeInEnd = start + 0.05;
        const fadeOutStart = end - 0.05;
        const range = createRange(start, fadeInEnd, fadeOutStart, end);
        
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(progress, range, [0, 1, 1, 0]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const y = useTransform(progress, range, [40, 0, 0, -40]);
        
        return (
          <motion.div 
            key={beat.id}
            style={{ opacity, y, pointerEvents: opacity.get() > 0.5 ? "auto" : "none" }}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col"
          >
            <span className="text-sm font-bold text-[var(--accent)] uppercase mb-4">
              {beatContent?.label}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight mb-8 max-w-[20ch]">
              {beatContent?.title}
            </h2>
            <ul className="space-y-4">
              {beatContent?.bullets?.map((bullet: string, i: number) => {
                const bulletStart = start + (i * 0.02);
                const bulletRange = createRange(bulletStart, bulletStart + 0.03, fadeOutStart, end);
                
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const bOpacity = useTransform(progress, bulletRange, [0, 1, 1, 0]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const bX = useTransform(progress, bulletRange, [-20, 0, 0, -20]);

                return (
                  <motion.li 
                    key={i}
                    style={{ opacity: bOpacity, x: bX }}
                    className="flex items-start text-[var(--text-secondary)] text-lg"
                  >
                    <span className="mr-3 mt-2 h-2 w-2 rounded-full bg-[var(--accent)] shrink-0" />
                    <span>{bullet}</span>
                  </motion.li>
                );
              })}
            </ul>

            {beat.id === "result" && (
              <motion.div 
                className="mt-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
              >
                <a href="https://github.com/BiViPi/xensnip/releases/latest" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-full transition-colors shadow-lg shadow-[var(--accent)]/10 hover:scale-105">
                  {t("cta.download")}
                </a>
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

function SplitVisualSide({ progress }: { progress: MotionValue<number> }) {
  const { t } = useTranslation();
  const beatsData = t("hero.beats");
  
  return (
    <div className="relative h-full flex items-center justify-center w-full">
      {BEATS_CONFIG.map((beat) => {
        const beatContent = beatsData?.[beat.id];
        const [start, end] = beat.scrollRange;
        const fadeInEnd = start + 0.05;
        const fadeOutStart = end - 0.05;
        const range = createRange(start, fadeInEnd, fadeOutStart, end);
        
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(progress, range, [0, 1, 1, 0]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const scale = useTransform(progress, range, [0.95, 1, 1, 0.95]);

        const imgSrc = beat.visual === "before" ? "/images/before_polished.png" : "/images/after_polished.png";

        return (
          <motion.div 
            key={beat.id}
            style={{ opacity, scale }}
            className="absolute inset-0 flex items-center justify-center w-full"
          >
            <div className="relative w-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-[var(--shadow-card)]">
              <Image
                src={imgSrc}
                alt={beatContent?.label || ""}
                width={1200}
                height={800}
                className="w-full h-auto"
                priority
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── MAIN ORCHESTRATOR ───────────────────────────────────────────────────────

export function HeroScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const { t } = useTranslation();

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
    mass: 0.5
  });

  return (
    <motion.section
      id="workflow"
      ref={containerRef}
      className="relative h-[600vh] bg-[var(--background)]"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center">
        
        <IntroScreen progress={smoothProgress} />

        <div className="w-full max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 h-full relative z-10">
          <div className="h-full relative">
            <SplitTextSide progress={smoothProgress} />
          </div>
          <div className="hidden lg:block h-full relative">
            <SplitVisualSide progress={smoothProgress} />
          </div>
        </div>

        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50 z-0"
          style={{ 
            opacity: useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0.5, 0, 0, 0]) 
          }}
        >
          <span className="text-xs font-semibold uppercase text-[var(--text-muted)] mb-4">{t("hero.scroll")}</span>
          <div className="w-[1px] h-12 bg-[var(--border)] overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-[var(--accent)]"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}
