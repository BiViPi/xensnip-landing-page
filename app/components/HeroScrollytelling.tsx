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

function BackgroundPopover() {
  return (
    <div className="w-[24rem] rounded-[28px] border border-[#d6dae5] bg-[linear-gradient(180deg,#fbfcff_0%,#f1f4fb_100%)] p-4 shadow-[0_30px_60px_-26px_rgba(10,18,38,0.48),inset_0_1px_0_rgba(255,255,255,0.96)]">
      <div className="mb-3 text-[13px] font-bold text-[#1e2330]">Background</div>
      <div className="mb-4 grid grid-cols-3 gap-2 rounded-2xl bg-[#eef1f7] p-1">
        <div className="rounded-xl bg-[#5b4ff4] px-3 py-2 text-center text-[11px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
          Gradient
        </div>
        <div className="rounded-xl px-3 py-2 text-center text-[11px] font-medium text-[#697387]">Solid</div>
        <div className="rounded-xl px-3 py-2 text-center text-[11px] font-medium text-[#697387]">Image</div>
      </div>
      <div className="grid grid-cols-6 gap-3">
        {[
          "from-[#854dff] via-[#d946ef] to-[#fbbf24]",
          "from-[#4f46e5] via-[#3b82f6] to-[#67e8f9]",
          "from-[#f59e0b] via-[#fdba74] to-[#fde68a]",
          "from-[#a855f7] via-[#22d3ee] to-[#4ade80]",
          "from-[#4f46e5] via-[#22d3ee] to-[#34d399]",
          "from-[#38bdf8] via-[#8b5cf6] to-[#d946ef]",
        ].map((gradient) => (
          <div key={gradient} className={`aspect-square rounded-[18px] bg-gradient-to-br ${gradient} shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]`} />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-[78px_minmax(0,1fr)] gap-3">
        <div className="rounded-[22px] border border-[#d8dde9] bg-white/70 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
          <div className="rounded-[18px] bg-[#5b4ff4] px-3 py-6 text-center text-[12px] font-semibold text-white">Linear</div>
          <div className="mt-2 rounded-[18px] px-3 py-6 text-center text-[12px] font-medium text-[#7b8598]">Radial</div>
        </div>
        <div className="rounded-[22px] border border-[#d8dde9] bg-white/76 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-[#e4e7f0] bg-[radial-gradient(circle,#ffffff_0%,#f4f7fc_70%)]">
            <div className="relative h-16 w-16 rounded-full border-[10px] border-[#e6eaf3]">
              <div className="absolute inset-[-10px] rounded-full border-[10px] border-transparent border-t-[#55d2ff] border-r-[#6a5cff]" />
              <div className="absolute right-[-3px] top-[38px] h-3.5 w-3.5 rounded-full border-2 border-[#6a5cff] bg-white" />
              <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c5cbda]" />
            </div>
          </div>
          <div className="mt-3 text-center text-[11px] tracking-[0.18em] text-[#7a8292]">ANGLE 135°</div>
          <div className="mt-1 text-center text-[10px] text-[#9ba3b2]">Drag to rotate</div>
        </div>
      </div>
    </div>
  );
}

function RedactionPopover() {
  return (
    <div className="w-[15rem] rounded-[24px] border border-[#d8dde9] bg-[linear-gradient(180deg,#fbfcff_0%,#f1f4fb_100%)] p-4 shadow-[0_26px_48px_-24px_rgba(10,18,38,0.42),inset_0_1px_0_rgba(255,255,255,0.96)]">
      <div className="flex items-center justify-between">
        <div className="text-[12px] font-semibold text-[#202636]">Redact</div>
        <div className="rounded-full border border-[var(--accent)]/18 bg-[var(--accent)]/8 px-2.5 py-1 text-[10px] font-medium text-[var(--accent)]">Sensitive</div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 rounded-2xl bg-[#eef1f7] p-1">
        <div className="rounded-xl bg-[var(--accent)]/14 px-2 py-2 text-center text-[11px] font-semibold text-[var(--accent)]">Blur</div>
        <div className="rounded-xl px-2 py-2 text-center text-[11px] font-medium text-[#6f7787]">Pixelate</div>
      </div>
      <div className="mt-4 space-y-3">
        <div>
          <div className="mb-1 text-[10px] font-medium text-[#8a93a3]">Strength</div>
          <div className="relative h-2 rounded-full bg-[#dde3ef]">
            <div className="absolute inset-y-0 left-0 w-3/4 rounded-full bg-[linear-gradient(90deg,#55d2ff,#6a5cff)]" />
            <div className="absolute left-3/4 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/35 bg-white shadow-[0_6px_18px_-8px_rgba(255,255,255,0.75)]" />
          </div>
        </div>
        <div className="rounded-[18px] border border-[#dde3ef] bg-white/76 p-3">
          <div className="mb-1 text-[10px] font-medium text-[#8a93a3]">Preview</div>
          <div className="rounded-xl border border-[#dde3ef] bg-white/84 px-3 py-2 font-mono text-[11px] text-[#7b8392] blur-[2px]">
            sk-live-51NxA...8f92a1
          </div>
        </div>
      </div>
    </div>
  );
}

function OCRPopover() {
  return (
    <div className="w-[14.5rem] rounded-[24px] border border-[#d8dde9] bg-[linear-gradient(180deg,#fbfcff_0%,#f3f6fb_100%)] p-4 shadow-[0_28px_52px_-24px_rgba(8,12,24,0.42),inset_0_1px_0_rgba(255,255,255,0.96)]">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[12px] font-semibold text-[#202636]">Extract Text</div>
          <div className="mt-0.5 text-[10px] text-[#8b93a4]">Local OCR</div>
        </div>
        <div className="rounded-full border border-[#d7ddea] bg-white/78 px-2.5 py-1 text-[10px] font-medium text-[#5d6576]">Copied</div>
      </div>
      <div className="mt-4 rounded-[18px] border border-[#dce2ef] bg-white/84 p-3">
        <div className="space-y-2 text-[11px] leading-5 text-[#3a4250]">
          <div>Invoice #A4510</div>
          <div>Amount Due: $184.90</div>
          <div>Payment Status: Pending</div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-[18px] border border-[#dce2ef] bg-white/76 px-3 py-2">
        <div className="text-[11px] font-medium text-[#667085]">Copy to clipboard</div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6a5cff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      </div>
    </div>
  );
}

function getBeatImageSrc(beatId: string, visual: BeatVisual) {
  if (beatId === "why") return "/images/hero_why_snipping_tool.png";
  if (beatId === "gap") return "/images/hero_gap_patchwork_tools.png";
  if (visual === "before") return "/images/before_polished.png";
  if (visual === "proof") return "/images/proof_polished.png";
  return "/images/after_polished.png";
}

const BEATS_CONFIG: BeatDef[] = [
  { id: "why", visual: "before", scrollRange: [0.15, 0.30] },
  { id: "gap", visual: "before", scrollRange: [0.30, 0.45] },
  { id: "answer", visual: "after", scrollRange: [0.45, 0.60] },
  { id: "evidence", visual: "after", scrollRange: [0.60, 0.85] },
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
                  src={getBeatImageSrc(beat.id, beat.visual)}
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
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const backgroundOpacity = useTransform(progress, [start + 0.015, start + 0.045, end - 0.04, end], [0, 1, 1, 0]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const backgroundY = useTransform(progress, [start + 0.015, start + 0.05], [26, 0]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const redactOpacity = useTransform(progress, [start + 0.055, start + 0.085, end - 0.035, end], [0, 1, 1, 0]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const redactY = useTransform(progress, [start + 0.055, start + 0.09], [20, 0]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const ocrOpacity = useTransform(progress, [start + 0.095, start + 0.125, end - 0.03, end], [0, 1, 1, 0]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const ocrY = useTransform(progress, [start + 0.095, start + 0.13], [18, 0]);

        const imgSrc = getBeatImageSrc(beat.id, beat.visual);

        return (
          <MotionDiv
            key={beat.id}
            style={{ opacity, scale, x, y }}
            className="absolute inset-0 flex items-center justify-center w-full"
          >
            <div className="relative w-full overflow-visible">
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
              {beat.id === "evidence" && (
                <div className="pointer-events-none absolute inset-0 overflow-visible">
                  <MotionDiv
                    style={{ opacity: backgroundOpacity, y: backgroundY, x: -10 }}
                    className="absolute -bottom-24 left-[-8%] z-30 scale-[0.74] origin-bottom-left"
                  >
                    <BackgroundPopover />
                  </MotionDiv>
                  <MotionDiv
                    style={{ opacity: redactOpacity, y: redactY, x: 8 }}
                    className="absolute right-[-5%] top-[0%] z-40 scale-[0.88] origin-top-right"
                  >
                    <RedactionPopover />
                  </MotionDiv>
                  <MotionDiv
                    style={{ opacity: ocrOpacity, y: ocrY, x: 10 }}
                    className="absolute -bottom-[10%] right-[-10%] z-40 scale-[0.92] origin-bottom-right"
                  >
                    <OCRPopover />
                  </MotionDiv>
                </div>
              )}
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
