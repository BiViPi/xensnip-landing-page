"use client";

import { useScroll, useTransform, motion, MotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";

// ─── UTILS ───────────────────────────────────────────────────────────────────

/** Safely creates an interpolation range ensuring strictly increasing values */
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
  label: string;
  title: string;
  bullets: string[];
  visual: BeatVisual;
  scrollRange: [number, number]; // [start, end] percentage
}

const BEATS: BeatDef[] = [
  {
    id: "why",
    label: "Why",
    title: "A screenshot is meant to help something land.",
    bullets: [
      "Screenshots are communication artifacts — someone else has to understand them.",
      "The goal is not just capture. The goal is clarity.",
      "Most screenshots fail before they leave the folder."
    ],
    visual: "after",
    scrollRange: [0.15, 0.30]
  },
  {
    id: "gap",
    label: "The gap",
    title: "Capturing is easy. Making it clear enough to share is where it breaks.",
    bullets: [
      "Raw screenshots carry noise: irrelevant UI, personal info, no context.",
      "Annotation tools are scattered across different apps.",
      "Every export step is a friction point."
    ],
    visual: "before",
    scrollRange: [0.30, 0.45]
  },
  {
    id: "answer",
    label: "The answer",
    title: "XenSnip is one Windows workflow, not a patchwork of tools.",
    bullets: [
      "Capture, polish, annotate, and export in one place.",
      "Local-first. No upload, no account, no cloud dependency.",
      "Built specifically for Windows."
    ],
    visual: "after",
    scrollRange: [0.45, 0.60]
  },
  {
    id: "evidence",
    label: "The evidence",
    title: "Every part of the interface is there for a reason.",
    bullets: [
      "Bottom toolbar: style, ratio, beautify, copy, export.",
      "Right sidebar: annotate, redact, protect what matters.",
      "Left sidebar: sessions, presets, continuity across captures."
    ],
    visual: "proof",
    scrollRange: [0.60, 0.85]
  },
  {
    id: "result",
    label: "The result",
    title: "One local workflow for screenshots that need to be understood.",
    bullets: [
      "No more fragmented tools.",
      "No more screenshot cleanup after the fact.",
      "Just capture, polish, share."
    ],
    visual: "after",
    scrollRange: [0.85, 1.00]
  }
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
    <p className="mt-8 text-center text-lg md:text-xl text-slate-400 font-medium">
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

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div 
      style={{ opacity, scale, y, pointerEvents: opacity.get() > 0 ? "auto" : "none" }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 z-50 px-6"
    >
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-50 text-center"
      >
        Welcome to XenSnip.
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <Typewriter text="You're in the right place to take better screenshots." start={started} />
      </motion.div>
    </motion.div>
  );
}

function SplitTextSide({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="relative h-full flex flex-col justify-center">
      {BEATS.map((beat, index) => {
        const [start, end] = beat.scrollRange;
        // Fade in takes 5% of scroll, fade out takes 5%
        const fadeInEnd = start + 0.05;
        const fadeOutStart = end - 0.05;
        
        // Ensure strictly increasing array for Framer Motion
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
            <span className="text-sm font-bold tracking-widest text-emerald-400 uppercase mb-4">
              {beat.label}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-50 leading-tight mb-8 max-w-[20ch]">
              {beat.title}
            </h2>
            <ul className="space-y-4">
              {beat.bullets.map((bullet, i) => {
                // Stagger bullets within the fade-in window
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
                    className="flex items-start text-slate-300 text-lg"
                  >
                    <span className="mr-3 mt-2 h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
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
                <a href="#" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-full transition-colors">
                  Download for Windows
                </a>
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

function Callout({ label, body, progress, start, end, className }: { label: string, body: string, progress: MotionValue<number>, start: number, end: number, className: string }) {
  const range = createRange(start, start + 0.03, end - 0.03, end);
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const scale = useTransform(progress, range, [0.9, 1, 1, 0.9]);
  
  return (
    <motion.div 
      style={{ opacity, scale }}
      className={`absolute z-20 backdrop-blur-xl bg-slate-900/80 border border-slate-700/50 shadow-2xl rounded-xl p-4 w-64 ${className}`}
    >
      <h4 className="text-slate-50 font-semibold text-sm mb-1">{label}</h4>
      <p className="text-slate-400 text-xs leading-relaxed">{body}</p>
    </motion.div>
  );
}

function SplitVisualSide({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="relative h-full flex items-center justify-center w-full">
      {BEATS.map((beat) => {
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
            <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 shadow-[0_0_100px_-20px_rgba(0,0,0,0.5)]">
              <Image
                src={imgSrc}
                alt={beat.label}
                width={1200}
                height={800}
                className="w-full h-auto"
                priority
              />
              
              {/* Overlay Callouts specifically for the Proof beat */}
              {beat.visual === "proof" && (
                <>
                  <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px]" />
                  <Callout 
                    progress={progress} start={0.65} end={0.85}
                    label="Style and export in one pass" 
                    body="Shape, polish, copy, and export stay in the same editing moment."
                    className="bottom-6 left-1/2 -translate-x-1/2"
                  />
                  <Callout 
                    progress={progress} start={0.70} end={0.85}
                    label="Annotate and protect what matters" 
                    body="Explanation and privacy controls show up where clarity needs them."
                    className="top-1/4 right-6"
                  />
                  <Callout 
                    progress={progress} start={0.75} end={0.85}
                    label="Keep the session in view" 
                    body="Presets and continuity stay close without crowding the main canvas."
                    className="top-1/3 left-6"
                  />
                </>
              )}
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

  // Apply a gentle spring to smooth out the mouse wheel steps
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
    mass: 0.5
  });

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-slate-950">
      {/* The Sticky Viewport Container */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center">
        
        {/* Layer 1: Intro Scene */}
        <IntroScreen progress={smoothProgress} />

        {/* Layer 2: The Split Layout Journey */}
        <div className="w-full max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 h-full relative z-10">
          
          {/* Left Column: Typography & Story */}
          <div className="h-full relative">
            <SplitTextSide progress={smoothProgress} />
          </div>

          {/* Right Column: Visual Evidence */}
          <div className="hidden lg:block h-full relative">
            <SplitVisualSide progress={smoothProgress} />
          </div>
          
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50 z-0"
          style={{ 
            opacity: useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0.5, 0, 0, 0]) 
          }}
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-4">Scroll</span>
          <div className="w-[1px] h-12 bg-slate-800 overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-slate-400"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
