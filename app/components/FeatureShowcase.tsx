"use client";

import Image from "next/image";
import { useTranslation } from "../contexts/I18nProvider";

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

function RedactIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3l18 18" />
      <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.11 11 8-1.04 2.96-3.22 5.24-5.96 6.42" />
      <path d="M6.23 6.23A11.2 11.2 0 0 0 1 12c1.73 4.89 6 8 11 8 1.71 0 3.34-.36 4.82-1.01" />
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
  focusTitle: string;
  focusPoints: string[];
  boundariesTitle: string;
  boundariesDescription: string;
  detectionBadge: string;
  annotationLabel: string;
  privacyBadge: string;
  privacyModes: string[];
  privacyClearLabel: string;
  privacyMaskedLabel: string;
  beforeLabel: string;
  afterLabel: string;
}

const heroToolbar = ["Arrow", "Text", "Shape", "Highlight", "Blur"];
const tileClassName =
  "card-surface relative overflow-hidden rounded-[28px] bg-[var(--surface-elevated)]";

export function FeatureShowcase() {
  const { t } = useTranslation();
  const featuresData = t<Record<string, FeatureContent>>("showcase.features");
  const support = t<SupportContent>("showcase.support");

  return (
    <section id="features" className="relative w-full overflow-hidden bg-[var(--background)] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-20 h-[34rem] bg-[radial-gradient(circle_at_28%_42%,rgba(82,102,235,0.12),transparent_26%),radial-gradient(circle_at_76%_62%,rgba(82,102,235,0.10),transparent_24%)] blur-3xl" />
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-16 text-center md:mb-20">
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-[var(--text-primary)] md:text-5xl">
            {t("showcase.title")}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-[var(--text-secondary)] md:text-xl">
            {t("showcase.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          <article className={`${tileClassName} min-h-[460px] p-7 md:p-10 lg:col-span-6 lg:row-span-2`}>
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(82,102,235,0.2),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_30%)]" />
            <div className="relative z-10 max-w-md">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <CaptureIcon />
              </div>
              <h3 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] md:text-4xl">
                {featuresData?.capture?.title}
              </h3>
              <p className="mt-4 max-w-[34ch] text-base leading-7 text-[var(--text-secondary)] md:text-lg">
                {featuresData?.capture?.description}
              </p>
            </div>

            <div className="absolute inset-x-0 bottom-0 top-[38%]">
              <div className="absolute inset-x-10 bottom-8 top-0 rounded-[32px] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))] shadow-[0_28px_48px_-28px_rgba(0,0,0,0.65)]" />
              <div className="absolute inset-x-14 bottom-12 top-6 overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--bright-rim)]">
                <div className="flex h-11 items-center gap-2 border-b border-[var(--border)] bg-[var(--surface)] px-4">
                  <span className="h-3 w-3 rounded-full bg-[#ff6b6b]/70" />
                  <span className="h-3 w-3 rounded-full bg-[#ffd166]/70" />
                  <span className="h-3 w-3 rounded-full bg-[#80ed99]/70" />
                  <div className="ml-4 h-6 flex-1 rounded-full bg-[var(--border-soft)]/80" />
                </div>

                <div className="border-b border-[var(--border)] px-5 py-3">
                  <div className="flex flex-wrap gap-2">
                    {heroToolbar.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-1 text-[11px] font-medium text-[var(--text-muted)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid h-[calc(100%-92px)] grid-cols-[78px_minmax(0,1fr)] bg-[var(--panel)]">
                  <div className="border-r border-[var(--border)] bg-[var(--surface)]/90 px-3 py-4">
                    <div className="space-y-2">
                      {[0, 1, 2, 3, 4].map((item) => (
                        <div key={item} className="h-8 rounded-xl bg-[var(--border-soft)]/70" />
                      ))}
                    </div>
                  </div>
                  <div className="relative">
                    <Image
                      src="/images/feature_capture.png"
                      alt={featuresData?.capture?.title || ""}
                      fill
                      className="object-cover object-top"
                      priority
                    />
                    <div className="absolute inset-x-8 top-7 h-9 rounded-xl border border-[var(--accent)]/35 bg-[var(--accent)]/12 shadow-[0_0_24px_rgba(82,102,235,0.16)]" />
                    <div className="absolute bottom-10 left-8 right-16 rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(16,17,23,0.18),rgba(16,17,23,0.45))] p-4 backdrop-blur-sm">
                      <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold text-[var(--accent)]/82">
                        <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                        XenSnip
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-16 rounded-2xl bg-white/7" />
                        <div className="h-16 rounded-2xl bg-white/10" />
                        <div className="h-16 rounded-2xl bg-white/7" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article className={`${tileClassName} min-h-[220px] p-7 md:p-8 lg:col-span-6`}>
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(82,102,235,0.18),transparent_36%)]" />
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

              <div className="relative mt-8 h-28 overflow-hidden rounded-[22px] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(82,102,235,0.05),rgba(82,102,235,0.01))]">
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
              </div>
            </div>
          </article>

          <article className={`${tileClassName} min-h-[180px] p-7 md:p-8 lg:col-span-6`}>
            <div className="relative z-10 flex h-full flex-col justify-between gap-8 md:flex-row md:items-end">
              <div className="max-w-[16rem]">
                <div className="mb-5 text-[11px] font-medium text-[var(--text-muted)]">
                  {support?.focusLabel}
                </div>
                <div className="space-y-4">
                  {support?.focusPoints?.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-[15px] text-[var(--text-secondary)]">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-muted)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]/75" />
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="max-w-[22rem] md:text-right">
                <h3 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] md:text-[2rem]">
                  {support?.focusTitle}
                </h3>
              </div>
            </div>
          </article>

          <article className={`${tileClassName} min-h-[240px] p-7 md:p-8 lg:col-span-4`}>
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="max-w-[22ch]">
                <h3 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                  {support?.boundariesTitle}
                </h3>
                <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">
                  {support?.boundariesDescription}
                </p>
              </div>

              <div className="relative mt-8 h-28">
                <div className="absolute bottom-0 right-2 h-24 w-32 rounded-[22px] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(243,244,246,0.9))] shadow-[var(--bright-rim)] dark:bg-[linear-gradient(180deg,rgba(248,249,250,0.95),rgba(226,232,240,0.86))]">
                  <div className="flex h-6 items-center gap-1 px-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b6b]/75" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ffd166]/75" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#80ed99]/75" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-28 w-44 rounded-[22px] border border-[var(--border)] bg-[var(--panel)] shadow-[0_18px_36px_-24px_rgba(0,0,0,0.7),var(--bright-rim)]">
                  <Image
                    src="/images/feature_capture.png"
                    alt={support?.boundariesTitle || ""}
                    fill
                    className="rounded-[22px] object-cover object-left-top opacity-85"
                  />
                  <div className="absolute inset-4 rounded-[18px] border-2 border-[var(--accent)] bg-[var(--accent)]/8 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
                    <div className="absolute -right-3 -top-3 rounded-full bg-[var(--accent)] px-3 py-1 text-[10px] font-medium text-white shadow-[0_12px_24px_-14px_rgba(82,102,235,0.9)]">
                      {support?.detectionBadge}
                    </div>
                    {["-top-1.5 -left-1.5", "-top-1.5 -right-1.5", "-bottom-1.5 -left-1.5", "-bottom-1.5 -right-1.5"].map((position) => (
                      <span
                        key={position}
                        className={`absolute h-3 w-3 rounded-full border-2 border-[var(--accent)] bg-white ${position}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article className={`${tileClassName} min-h-[240px] p-7 md:p-8 lg:col-span-8`}>
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(82,102,235,0.12),transparent_42%)]" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="max-w-[24rem]">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <RedactIcon />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                    {featuresData?.redact?.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">
                    {featuresData?.redact?.description}
                  </p>
                </div>

                <div className="inline-flex w-fit rounded-full border border-[var(--border)] bg-[var(--surface)]/88 p-1 shadow-[0_12px_24px_-18px_rgba(0,0,0,0.55),var(--bright-rim)]">
                  {support?.privacyModes?.map((mode, index) => (
                    <span
                      key={mode}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        index === 0
                          ? "bg-[var(--accent)]/14 text-[var(--accent)]"
                          : "text-[var(--text-muted)]"
                      }`}
                    >
                      {mode}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative mt-8 overflow-hidden rounded-[24px] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] shadow-[0_22px_42px_-30px_rgba(0,0,0,0.75),var(--bright-rim)]">
                <div className="grid gap-px bg-[var(--border)] md:grid-cols-2">
                  <div className="bg-[var(--surface-elevated)] px-5 py-5">
                    <div className="mb-3 text-[11px] font-medium text-[var(--text-muted)]">
                      {support?.privacyClearLabel}
                    </div>
                    <div className="space-y-3">
                      <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)]/72 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                        <div className="mb-2 text-[10px] font-medium text-[var(--text-muted)]">API Key</div>
                        <div className="font-mono text-sm text-[var(--text-secondary)]">sk-live-51NxA...8f92a1</div>
                      </div>
                      <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)]/72 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                        <div className="mb-2 text-[10px] font-medium text-[var(--text-muted)]">Email</div>
                        <div className="font-mono text-sm text-[var(--text-secondary)]">ops@xensnip.app</div>
                      </div>
                    </div>
                  </div>

                  <div className="relative overflow-hidden bg-[var(--surface-elevated)] px-5 py-5">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(82,102,235,0.08),transparent_62%)]" />
                    <div className="mb-3 text-[11px] font-medium text-[var(--text-muted)]">
                      {support?.privacyMaskedLabel}
                    </div>
                    <div className="relative space-y-3">
                      <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)]/62 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                        <div className="mb-2 text-[10px] font-medium text-[var(--text-muted)]">API Key</div>
                        <div className="font-mono text-sm text-transparent select-none">sk-live-51NxA...8f92a1</div>
                        <div className="absolute inset-x-4 bottom-3 top-7 overflow-hidden rounded-xl border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.04))] shadow-[var(--bright-rim)] backdrop-blur-xl">
                          <div className="absolute inset-0 opacity-15 mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
                          <div className="absolute inset-0 blur-[12px]" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.14), rgba(82,102,235,0.18), rgba(255,255,255,0.08))" }} />
                        </div>
                      </div>

                      <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)]/62 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                        <div className="mb-2 text-[10px] font-medium text-[var(--text-muted)]">Email</div>
                        <div className="font-mono text-sm text-transparent select-none">ops@xensnip.app</div>
                        <div className="absolute inset-x-4 bottom-3 top-7 grid grid-cols-11 gap-1 rounded-xl">
                          {Array.from({ length: 22 }).map((_, index) => (
                            <span
                              key={index}
                              className="h-3 rounded-[4px] bg-[var(--accent)]/18 shadow-[0_0_10px_rgba(82,102,235,0.08)]"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pointer-events-none absolute right-4 top-4">
                      <span className="rounded-full border border-[var(--accent)]/22 bg-[var(--accent)]/12 px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] shadow-[0_0_20px_rgba(82,102,235,0.14)]">
                        {support?.privacyBadge}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
