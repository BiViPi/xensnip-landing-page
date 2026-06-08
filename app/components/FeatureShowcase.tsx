"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "../contexts/I18nProvider";
import { MotionArticle, MotionDiv, MotionSection, MotionSpan } from "./motion-compat";
import perspectiveFrameImg from "../../public/images/feature_perspective_frame.png";

function CaptureIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function AnnotateIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}



function PerspectiveIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 7 9-4 9 4-9 4-9-4Z" />
      <path d="M3 7v10l9 4 9-4V7" />
      <path d="M12 11v10" />
    </svg>
  );
}

function MergeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 7h6a4 4 0 1 1 0 8H8" />
      <path d="m11 10-3-3-3 3" />
      <path d="m5 17 3 3 3-3" />
    </svg>
  );
}

interface FeatureContent {
  title: string;
  description: string;
}

interface SupportContent {
  precisionLabel: string;
  precisionHint: string;
  focusLabel: string;
  focusPoints: string[];
  annotationLabel: string;
  perspectiveBadge: string;
  perspectiveModes: string[];
  perspectiveHint: string;
  mergeBadge: string;
  mergeHint: string;
  privacyBadge: string;
  privacyModes: string[];
  privacyClearLabel: string;
  privacyMaskedLabel: string;
  beforeLabel: string;
  afterLabel: string;
}

const tileClassName =
  "card-system-template relative overflow-hidden rounded-[28px]";

const featureTileHoverShadow =
  "0 18px 38px -20px rgba(0,0,0,0.22), 0 12px 28px -22px rgba(82,102,235,0.18), var(--bright-rim)";

type CardId = "capture" | "annotate" | "merge" | "perspective";

const glowPositions: Record<CardId, { left: string; top: string; size: string }> = {
  capture: { left: "12%", top: "20%", size: "24rem" },
  annotate: { left: "65%", top: "18%", size: "18rem" },
  merge: { left: "50%", top: "24%", size: "24rem" },
  perspective: { left: "50%", top: "68%", size: "22rem" },
};

export function FeatureShowcase() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const featuresData = t<Record<string, FeatureContent>>("showcase.features");
  const support = t<SupportContent>("showcase.support");
  const [activeCard, setActiveCard] = useState<CardId>("capture");


  const sectionVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
      },
    },
  };

  const tileVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const hoverTransition = {
    duration: prefersReducedMotion ? 0 : 0.28,
    ease: [0.16, 1, 0.3, 1],
  };

  return (
    <MotionSection
      id="features"
      className="relative w-full overflow-hidden bg-[var(--background)] py-24 md:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <MotionDiv
          animate={glowPositions[activeCard]}
          transition={{ duration: prefersReducedMotion ? 0 : 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(82,102,235,0.18),rgba(82,102,235,0.08)_38%,transparent_72%)] blur-3xl"
          style={{ width: glowPositions[activeCard].size, height: glowPositions[activeCard].size }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <MotionDiv className="mb-16 text-center md:mb-20" variants={tileVariants}>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-[var(--text-primary)] md:text-5xl">
            {t("showcase.title")}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-[var(--text-secondary)] md:text-xl">
            {t("showcase.subtitle")}
          </p>
        </MotionDiv>

        <MotionDiv className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6" variants={sectionVariants}>
          <MotionArticle
            variants={tileVariants}
            onHoverStart={() => setActiveCard("merge")}
            className={`${tileClassName} min-h-[420px] p-7 md:min-h-[480px] lg:min-h-[500px] md:p-10 lg:col-span-12`}
            whileHover={
              prefersReducedMotion
                ? undefined
                : {
                    scale: 1.015,
                    y: -4,
                    boxShadow: featureTileHoverShadow,
                  }
            }
            transition={hoverTransition}
          >
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(82,102,235,0.2),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_30%)]" />
            <MotionDiv
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-[-20%] w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)]"
              initial={{ x: "-160%" }}
              whileHover={prefersReducedMotion ? undefined : { x: "360%" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
            <MotionDiv
              className="relative z-10 max-w-md lg:max-w-[22rem]"
              whileHover={prefersReducedMotion ? undefined : { x: 4, y: -2 }}
              transition={hoverTransition}
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/84 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                <MergeIcon />
                {support?.mergeBadge}
              </div>
              <h3 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] md:text-4xl">
                {featuresData?.merge?.title}
              </h3>
              <p className="mt-4 max-w-[34ch] text-base leading-7 text-[var(--text-secondary)] md:text-lg">
                {featuresData?.merge?.description}
              </p>
            </MotionDiv>

            <div className="relative z-10 mt-10 lg:absolute lg:bottom-8 lg:right-8 lg:top-8 lg:mt-0 lg:w-[min(60%,48rem)]">
              <div className="lg:h-full rounded-[32px] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))] p-4 shadow-[0_28px_48px_-28px_rgba(0,0,0,0.65)]">
                <div className="relative aspect-video lg:aspect-auto lg:h-full w-full overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--bright-rim)]">
                  <video
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={featuresData?.merge?.title || "Drag to Merge demo"}
                  >
                    <source src="/images/merge-by-drag.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </MotionArticle>

          <MotionArticle
            variants={tileVariants}
            onHoverStart={() => setActiveCard("annotate")}
            className={`${tileClassName} min-h-[160px] p-5 md:min-h-[170px] md:p-6 lg:col-span-6`}
            whileHover={
              prefersReducedMotion
                ? undefined
                : {
                    scale: 1.015,
                    y: -4,
                    boxShadow: featureTileHoverShadow,
                  }
            }
            transition={hoverTransition}
          >
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(82,102,235,0.18),transparent_36%)]" />
            <MotionDiv
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-[-20%] w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)]"
              initial={{ x: "-160%" }}
              whileHover={prefersReducedMotion ? undefined : { x: "340%" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  <AnnotateIcon />
                  {support?.precisionLabel}
                </div>
                <h3 className="max-w-[14ch] text-2xl font-bold tracking-tight text-[var(--text-primary)] md:text-[2rem]">
                  {featuresData?.annotate?.title}
                </h3>
                <p className="mt-3 max-w-[34ch] text-base leading-7 text-[var(--text-secondary)]">
                  {featuresData?.annotate?.description}
                </p>
              </div>

              <div className="relative mt-4 h-20 overflow-hidden rounded-[22px] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(82,102,235,0.05),rgba(82,102,235,0.01))]">
                <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "linear-gradient(rgba(82,102,235,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(82,102,235,0.08) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
                <div className="absolute inset-y-0 left-[42%] w-px bg-[var(--accent)]/65 shadow-[0_0_16px_rgba(82,102,235,0.65)]" />
                <div className="absolute inset-x-0 top-[55%] h-px bg-[var(--accent)]/65 shadow-[0_0_16px_rgba(82,102,235,0.65)]" />
                <div className="absolute left-[42%] top-[55%] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--accent)] bg-[var(--surface-elevated)]" />
                <div className="absolute right-4 top-4 flex items-center gap-3 rounded-2xl border border-[var(--accent)]/30 bg-[var(--surface-elevated)]/88 px-4 py-3 shadow-[0_18px_28px_-20px_rgba(82,102,235,0.7)] backdrop-blur-sm">
                  <span className="border-r border-[var(--accent)]/20 pr-3 text-[11px] font-medium text-[var(--text-muted)]">
                    {support?.annotationLabel}
                  </span>
                  <span className="text-2xl font-light text-[var(--text-secondary)]">10x</span>
                </div>
                <div className="absolute bottom-3 left-[42%] -translate-x-1/2 rounded-full border border-white/6 bg-[var(--surface)]/90 px-3 py-1 text-xs text-[var(--text-muted)] shadow-[0_10px_20px_-14px_rgba(0,0,0,0.7)]">
                  {support?.precisionHint}
                </div>
                <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 480 112" preserveAspectRatio="none">
                  <motion.path
                    d="M78 88 C132 82, 162 54, 214 48"
                    stroke="rgba(82,102,235,0.88)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    animate={prefersReducedMotion ? { pathLength: 1, opacity: 0.55 } : { pathLength: [0, 1, 1], opacity: [0.2, 0.9, 0.45] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M214 48 L246 36"
                    stroke="rgba(82,102,235,0.88)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    animate={prefersReducedMotion ? { pathLength: 1, opacity: 0.55 } : { pathLength: [0, 1, 1], opacity: [0.2, 0.9, 0.45] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  />
                  <motion.path
                    d="M214 48 L236 62"
                    stroke="rgba(82,102,235,0.88)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    animate={prefersReducedMotion ? { pathLength: 1, opacity: 0.55 } : { pathLength: [0, 1, 1], opacity: [0.2, 0.9, 0.45] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.28 }}
                  />
                </svg>
              </div>
            </div>
          </MotionArticle>

          <MotionArticle
            variants={tileVariants}
            onHoverStart={() => setActiveCard("capture")}
            className={`${tileClassName} min-h-[160px] p-5 md:min-h-[170px] md:p-6 lg:col-span-6`}
            whileHover={
              prefersReducedMotion
                ? undefined
                : {
                    scale: 1.015,
                    y: -4,
                    boxShadow: featureTileHoverShadow,
                  }
            }
            transition={hoverTransition}
          >
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(82,102,235,0.16),transparent_42%)]" />
            <MotionDiv
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-[-20%] w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)]"
              initial={{ x: "-160%" }}
              whileHover={prefersReducedMotion ? undefined : { x: "340%" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="max-w-[20rem]">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/84 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  <CaptureIcon />
                  {support?.focusLabel}
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] md:text-[2rem]">
                  {featuresData?.capture?.title}
                </h3>
                <p className="mt-3 max-w-[32ch] text-base leading-7 text-[var(--text-secondary)]">
                  {featuresData?.capture?.description}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {support?.focusPoints?.map((item) => (
                  <div
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/84 px-3 py-2 text-sm text-[var(--text-secondary)] shadow-[0_16px_30px_-22px_rgba(0,0,0,0.45)]"
                  >
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-muted)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]/75" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-3.5 rounded-[24px] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(82,102,235,0.05),rgba(82,102,235,0.01))] px-3.5 py-3 shadow-[0_22px_38px_-26px_rgba(0,0,0,0.45),var(--bright-rim)]">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    {support?.precisionLabel}
                  </span>
                  <span className="rounded-full border border-[var(--border)] bg-[var(--surface)]/92 px-3 py-1 text-xs text-[var(--text-muted)]">
                    {support?.precisionHint}
                  </span>
                </div>
                <div className="mt-3 h-px bg-[linear-gradient(90deg,transparent,rgba(82,102,235,0.35),transparent)]" />
                <div className="mt-3 text-sm leading-5 text-[var(--text-secondary)]">
                  Clean targeting, smart window edges, and less corrective cropping after capture.
                </div>
              </div>
            </div>
          </MotionArticle>

          <MotionArticle
            variants={tileVariants}
            onHoverStart={() => setActiveCard("perspective")}
            className={`${tileClassName} min-h-[240px] p-7 md:p-10 lg:col-span-12`}
            whileHover={
              prefersReducedMotion
                ? undefined
                : {
                    scale: 1.015,
                    y: -4,
                    boxShadow: featureTileHoverShadow,
                  }
            }
            transition={hoverTransition}
          >
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(82,102,235,0.2),transparent_48%)]" />
            <MotionDiv
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-[-20%] w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)]"
              initial={{ x: "-160%" }}
              whileHover={prefersReducedMotion ? undefined : { x: "340%" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="max-w-[48rem]">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/84 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    <PerspectiveIcon />
                    {support?.perspectiveBadge}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                    {featuresData?.perspective?.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">
                    {featuresData?.perspective?.description}
                  </p>
                </div>

                <div className="inline-flex w-fit rounded-full border border-[var(--border)] bg-[var(--surface)]/88 p-1 shadow-[0_12px_24px_-18px_rgba(0,0,0,0.55),var(--bright-rim)]">
                  {support?.perspectiveModes?.map((mode, index) => (
                    <MotionSpan
                      key={mode}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        index === 1
                          ? "bg-[var(--accent)] text-white"
                          : "text-[var(--text-muted)]"
                      }`}
                      animate={index === 1 ? { scale: prefersReducedMotion ? 1 : [1, 1.03, 1] } : { scale: 1 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {mode}
                    </MotionSpan>
                  ))}
                </div>
              </div>

              <div className="relative mt-8 overflow-hidden rounded-[24px] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] shadow-[0_22px_42px_-30px_rgba(0,0,0,0.75),var(--bright-rim)]">
                <div className="relative w-full overflow-hidden">
                  <Image
                    src={perspectiveFrameImg}
                    alt={featuresData?.perspective?.title || ""}
                    className="w-full h-auto object-contain block"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,11,17,0.02),rgba(9,11,17,0.28))] pointer-events-none" />
                  <div className="absolute bottom-4 left-4 rounded-full border border-white/18 bg-[rgba(12,16,26,0.52)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/84 backdrop-blur-md">
                    {support?.perspectiveHint}
                  </div>
                </div>
              </div>
            </div>
          </MotionArticle>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
