"use client";

import { useScroll, useTransform, MotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect, useMemo, type RefObject } from "react";
import Image from "next/image";
import { useTranslation } from "../contexts/I18nProvider";
import { MotionDiv, MotionH1, MotionLi, MotionSection } from "./motion-compat";

// ─── UTILS ───────────────────────────────────────────────────────────────────

// ─── BEAT DATA ───────────────────────────────────────────────────────────────

type BeatVisual = "after" | "before" | "proof";

interface BeatDef {
  id: string;
  visual: BeatVisual;
  scrollRange: [number, number];
}

interface BeatContent {
  label: string;
  title: string;
  bullets: string[];
}

function getBeatImageSrc(visual: BeatVisual) {
  if (visual === "before") return "/images/before_polished.png";
  if (visual === "proof") return "/images/proof_polished.png";
  return "/images/after_polished.png";
}

const BEATS_CONFIG: BeatDef[] = [
  { id: "why", visual: "before", scrollRange: [0.15, 0.30] },
  { id: "gap", visual: "before", scrollRange: [0.30, 0.45] },
  { id: "answer", visual: "after", scrollRange: [0.45, 0.60] },
  { id: "evidence", visual: "proof", scrollRange: [0.60, 0.85] },
  { id: "result", visual: "after", scrollRange: [0.85, 1.00] }
];

const INTRO_PIVOT_START = 0.12;
const INTRO_PIVOT_MID = 0.14;
const INTRO_PIVOT_END = 0.19;

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
  const opacity = useTransform(
    progress,
    [0, INTRO_PIVOT_START, INTRO_PIVOT_MID, INTRO_PIVOT_END],
    [1, 1, 0.9, 0]
  );
  const scale = useTransform(progress, [0, INTRO_PIVOT_END], [1, 0.97]);
  const y = useTransform(progress, [0, INTRO_PIVOT_END], [0, -28]);
  const headlineX = useTransform(
    progress,
    [0, INTRO_PIVOT_START, INTRO_PIVOT_MID, INTRO_PIVOT_END],
    [0, 0, -72, -220]
  );
  const headlineY = useTransform(
    progress,
    [0, INTRO_PIVOT_START, INTRO_PIVOT_MID, INTRO_PIVOT_END],
    [0, 0, -18, -52]
  );
  const headlineScale = useTransform(
    progress,
    [0, INTRO_PIVOT_START, INTRO_PIVOT_MID, INTRO_PIVOT_END],
    [1, 1, 0.92, 0.76]
  );
  const subtitleOpacity = useTransform(progress, [0, INTRO_PIVOT_START, INTRO_PIVOT_END], [1, 1, 0]);
  const [started, setStarted] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const time = setTimeout(() => setStarted(true), 800);
    return () => clearTimeout(time);
  }, []);

  return (
    <MotionDiv
      style={{ opacity, scale, y, pointerEvents: opacity.get() > 0 ? "auto" : "none" }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--background)] z-50 px-6"
    >
      <MotionH1
        style={{ x: headlineX, y: headlineY, scale: headlineScale, transformOrigin: "center center" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center text-5xl font-bold tracking-tighter text-[var(--text-primary)] md:text-7xl lg:text-8xl whitespace-nowrap"
      >
        {t("hero.welcome")}
      </MotionH1>
      <MotionDiv
        style={{ opacity: subtitleOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <Typewriter text={t("hero.subtitle")} start={started} />
      </MotionDiv>
    </MotionDiv>
  );
}

function SplitTextSide({ progress }: { progress: MotionValue<number> }) {
  const { t } = useTranslation();
  const beatsData = t<Record<string, BeatContent>>("hero.beats");

  return (
    <div className="relative h-full flex flex-col justify-center">
      {BEATS_CONFIG.map((beat) => {
        const beatContent = beatsData?.[beat.id];
        const [start, end] = beat.scrollRange;
        const fadeOutStart = end - 0.05;

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(progress, [start, start + 0.02, end - 0.02, end], [0, 1, 1, 0]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const y = useTransform(progress, [start, start + 0.02, end - 0.02, end], [30, 0, 0, -30]);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const progressLineHeight = useTransform(progress, [start, end - 0.04], ["0%", "100%"]);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const x = useTransform(
          progress,
          beat.id === "why"
            ? [INTRO_PIVOT_MID, start, fadeOutStart, end]
            : [start, start + 0.04, end - 0.04, end],
          beat.id === "why"
            ? [56, 0, 0, -150]
            : [-36, 0, 0, -36]
        );

        return (
          <MotionDiv
            key={beat.id}
            style={{ opacity, x, y, pointerEvents: opacity.get() > 0.5 ? "auto" : "none" }}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col"
          >
            <span className="text-sm font-bold text-[var(--accent)] uppercase mb-4 tracking-widest">
              {beatContent?.label}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight mb-8 max-w-[20ch] tracking-tight">
              {beatContent?.title}
            </h2>

            <div className="relative pl-8">
              <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-[var(--border)] opacity-30" />
              <MotionDiv
                style={{ height: progressLineHeight }}
                className="absolute left-0 top-2 w-[1px] bg-[var(--accent)] origin-top shadow-[0_0_8px_rgba(82,102,235,0.8)]"
              />

              <ul className="space-y-6">
                {beatContent?.bullets?.map((bullet: string, i: number) => {
                  const bulletStart = start + (i * 0.04);
                  const bulletActiveStart = bulletStart;
                  const bulletActiveEnd = bulletStart + 0.05;

                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  const bOpacity = useTransform(
                    progress,
                    [start, bulletActiveStart, bulletActiveStart + 0.01, bulletActiveEnd, end],
                    [0, 0.3, 1, 1, 0.3]
                  );

                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  const bX = useTransform(progress, [bulletActiveStart, bulletActiveStart + 0.02], [-10, 0]);

                  return (
                    <MotionLi
                      key={i}
                      style={{ opacity: bOpacity, x: bX }}
                      className="relative flex items-start text-[var(--text-secondary)] text-lg transition-colors duration-300"
                    >
                      <span className="mt-1">{bullet}</span>
                    </MotionLi>
                  );
                })}
              </ul>
            </div>

            <div className="mt-10 lg:hidden">
              <div className="card-surface overflow-hidden rounded-2xl">
                <Image
                  src={getBeatImageSrc(beat.visual)}
                  alt={beatContent?.label || ""}
                  width={1200}
                  height={800}
                  className="h-auto w-full"
                />
              </div>
            </div>

            {beat.id === "result" && (
              <MotionDiv
                className="mt-12"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={opacity.get() > 0.8 ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                transition={{ type: "spring", damping: 12, stiffness: 100 }}
              >
                <div className="relative group inline-block">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent)] to-indigo-400 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200 animate-pulse" />
                  <a href="https://github.com/BiViPi/xensnip/releases/latest" className="lightning-hover relative inline-flex items-center justify-center rounded-2xl bg-[var(--accent)] px-10 py-5 text-lg font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105 shadow-xl shadow-indigo-500/20 active:scale-95">
                    <span className="pointer-events-none absolute inset-0 rounded-2xl border border-white/20" />
                    <span className="relative z-10">{t("cta.download")}</span>
                  </a>
                </div>
              </MotionDiv>
            )}
          </MotionDiv>
        );
      })}
    </div>
  );
}

function SplitVisualSide({ progress }: { progress: MotionValue<number> }) {
  const { t } = useTranslation();
  const beatsData = t<Record<string, BeatContent>>("hero.beats");

  return (
    <div className="relative h-full flex items-center justify-center w-full">
      {BEATS_CONFIG.map((beat) => {
        const beatContent = beatsData?.[beat.id];
        const [start, end] = beat.scrollRange;

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(progress, [start, start + 0.02, end - 0.02, end], [0, 1, 1, 0]);
        const isFinal = beat.id === "result";
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const scale = useTransform(progress, [start, start + 0.02, end - 0.02, end], [isFinal ? 1 : 0.95, isFinal ? 1.05 : 1, isFinal ? 1.05 : 1, 0.95]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const y = useTransform(progress, [start, start + 0.02, end - 0.02, end], [60, 0, 0, -60]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const x = useTransform(
          progress,
          beat.id === "why"
            ? [start, start + 0.05, end - 0.03, end]
            : [start, start + 0.03, end - 0.03, end],
          beat.id === "why"
            ? ["20%", "0%", "0%", "20%"]
            : ["20%", "0%", "0%", "20%"]
        );

        const imgSrc = getBeatImageSrc(beat.visual);

        return (
          <MotionDiv
            key={beat.id}
            style={{ opacity, scale, x, y }}
            className="absolute inset-0 flex items-center justify-center w-full"
          >
            <div className="card-surface relative w-full overflow-hidden rounded-2xl">
              <Image
                src={imgSrc}
                alt={beatContent?.label || ""}
                width={1200}
                height={800}
                className="w-full h-auto"
                priority
              />
            </div>
          </MotionDiv>
        );
      })}
    </div>
  );
}

// ─── MAIN ORCHESTRATOR ───────────────────────────────────────────────────────

export function HeroScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef as RefObject<HTMLElement>,
    offset: ["start start", "end end"]
  });
  const { t } = useTranslation();

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 120,
    mass: 0.5
  });

  return (
    <MotionSection
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

        <MotionDiv
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50 z-0"
          style={{
            opacity: useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0.5, 0, 0, 0])
          }}
        >
          <span className="text-xs font-semibold uppercase text-[var(--text-muted)] mb-4">{t("hero.scroll")}</span>
          <div className="w-[1px] h-12 bg-[var(--border)] overflow-hidden relative">
            <MotionDiv
              className="absolute top-0 left-0 w-full h-1/2 bg-[var(--accent)]"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </div>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
