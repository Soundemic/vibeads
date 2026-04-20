"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Check, Download, CalendarClock, Repeat2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { platformLabel, platformResolution } from "@/lib/utils";
import { useGeneratorStore } from "@/store";
import { OptionsPanel } from "./OptionsPanel";
import { JobHistory } from "./JobHistory";
import type { VideoPlatform, GenerationOptions } from "@/types";

const PLATFORMS: { value: VideoPlatform; label: string }[] = [
  { value: "tiktok",         label: "TikTok" },
  { value: "instagram_reel", label: "Instagram Reel" },
  { value: "youtube_short",  label: "YouTube Short" },
  { value: "linkedin",       label: "LinkedIn" },
  { value: "twitter",        label: "Twitter / X" },
  { value: "custom_mp4",     label: "Custom MP4" },
];

const QUICK_EXAMPLES = [
  { icon: "👟", label: "Nike product",   url: "https://nike.com/air-max-2025-launch" },
  { icon: "📰", label: "News article",   url: "https://techcrunch.com/2025/ai-trends" },
  { icon: "📦", label: "Amazon listing", url: "https://amazon.com/dp/B0CX9EXAMPLE" },
  { icon: "🎵", label: "TikTok remix",   url: "https://tiktok.com/@creator/video/123" },
];

const STAGE_SEQUENCE = ["fetching", "parsing", "scripting", "rendering", "dispatching"];
const STEP_NAMES     = ["Fetch & Analyse", "Script & Render", "Ready to Dispatch"];

function getStepIndex(stage: string): number {
  if (["fetching", "parsing"].includes(stage))     return 0;
  if (["scripting", "rendering"].includes(stage))  return 1;
  if (["dispatching", "complete"].includes(stage)) return 2;
  return 0;
}

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="mb-8 flex items-center justify-center">
      {STEP_NAMES.map((name, i) => {
        const done   = i < current;
        const active = i === current;
        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <motion.div
                animate={{
                  borderColor:     done || active ? "#C9A84C" : "rgba(255,255,255,0.08)",
                  backgroundColor: done ? "#C9A84C" : active ? "rgba(201,168,76,0.12)" : "rgba(255,255,255,0.03)",
                  boxShadow:       active ? "0 0 20px rgba(201,168,76,0.28)" : "none",
                }}
                transition={{ duration: 0.4 }}
                className="flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold"
              >
                {done
                  ? <Check className="h-4 w-4 text-black" />
                  : <span className={active ? "text-gold-400" : "text-white/20"}>{i + 1}</span>
                }
              </motion.div>
              <span className={cn(
                "text-[11px] font-medium transition-colors",
                active ? "text-gold-300" : done ? "text-white/50" : "text-white/20",
              )}>
                {name}
              </span>
            </div>
            {i < STEP_NAMES.length - 1 && (
              <motion.div
                animate={{ backgroundColor: done ? "#C9A84C" : "rgba(255,255,255,0.07)" }}
                transition={{ duration: 0.5 }}
                className="mx-4 mb-7 h-px w-20"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function GeneratorFlow() {
  const [url, setPlatform_url] = useState("");
  const [platform, setPlatform] = useState<VideoPlatform>("tiktok");
  const [urlError, setUrlError] = useState(false);
  const [options, setOptions]   = useState<GenerationOptions>({
    autoCaption:  true,
    brandOverlay: true,
    n8nDispatch:  true,
  });

  const { phase, job, startGeneration, dismissResult } = useGeneratorStore();

  const setUrl = setPlatform_url;

  const handleGenerate = async () => {
    const trimmed = url.trim();
    if (!trimmed) {
      setUrlError(true);
      setTimeout(() => setUrlError(false), 1400);
      return;
    }
    await startGeneration(trimmed, platform, options);
  };

  const currentStep = job ? getStepIndex(job.stage) : 0;

  return (
    <div className="mx-auto w-full max-w-[760px]">

      {/* ── Idle: Input ── */}
      <AnimatePresence mode="wait">
        {phase === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.32 }}
            className="mb-5"
          >
            <div
              className="relative mb-3 rounded-2xl"
              style={{
                background: urlError
                  ? "linear-gradient(135deg, #B84A30, rgba(184,74,48,0.3))"
                  : "linear-gradient(135deg, #C9A84C 0%, rgba(201,168,76,0.2) 40%, #F0D080 70%, rgba(201,168,76,0.12) 100%)",
                padding: "1.5px",
                transition: "background 0.3s",
              }}
            >
              <div className="flex items-center gap-0 rounded-[14px] bg-surface-1/90 px-5 py-1 backdrop-blur-2xl">
                <Search className="mr-3 h-[18px] w-[18px] flex-shrink-0 text-white/20" />

                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                  placeholder="Paste any URL — product, article, TikTok, Amazon listing…"
                  className="flex-1 bg-transparent py-3.5 text-[14px] text-white outline-none placeholder:text-white/20 caret-gold-400"
                />

                <div className="mx-3 h-7 w-px flex-shrink-0 bg-white/[0.06]" />

                <div className="relative flex-shrink-0">
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as VideoPlatform)}
                    className="appearance-none cursor-pointer bg-transparent py-2 pr-5 text-[12px] font-medium text-white/50 outline-none transition-colors hover:text-gold-400"
                  >
                    {PLATFORMS.map((p) => (
                      <option key={p.value} value={p.value} className="bg-surface-2 text-white">
                        {p.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 text-white/25" />
                </div>

                <div className="mx-3 h-7 w-px flex-shrink-0 bg-white/[0.06]" />

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleGenerate}
                  className="flex-shrink-0 rounded-[11px] bg-gold-gradient px-6 py-2.5 text-[13px] font-bold text-black shadow-gold-glow transition-shadow hover:shadow-gold-glow-lg"
                >
                  Generate →
                </motion.button>
              </div>
            </div>

            <OptionsPanel value={options} onChange={setOptions} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick examples + history */}
      <AnimatePresence>
        {phase === "idle" && (
          <motion.div
            key="examples"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-12 flex flex-wrap items-center justify-center gap-2"
          >
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/20">Try:</span>
            {QUICK_EXAMPLES.map((ex) => (
              <button
                key={ex.url}
                onClick={() => setUrl(ex.url)}
                className="flex items-center gap-1.5 rounded-lg border border-border-subtle bg-surface-2/40 px-3 py-1.5 text-[11.5px] text-white/35 transition-all hover:border-border-gold hover:text-gold-400"
              >
                <span>{ex.icon}</span> {ex.label}
              </button>
            ))}
            <div className="ml-2"><JobHistory /></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Processing ── */}
      <AnimatePresence mode="wait">
        {phase === "processing" && job && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            <StepIndicator current={currentStep} />
            <div className="relative overflow-hidden rounded-2xl border border-border-gold bg-surface-1/90 p-7 backdrop-blur-2xl">
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gold-400/6 blur-3xl" />
              <div className="absolute right-7 top-7 font-mono text-2xl font-medium text-gold-400">{job.progress}%</div>

              <p className="mb-1 font-mono text-[9.5px] uppercase tracking-[0.18em] text-gold-500">// Processing</p>
              <p className="mb-5 max-w-[75%] truncate font-mono text-[11px] text-white/35">
                {job.sourceUrl.replace(/^https?:\/\//, "")}
              </p>

              <div className="mb-5 h-[3px] overflow-hidden rounded-full bg-white/[0.05]">
                <motion.div
                  animate={{ width: `${job.progress}%` }}
                  transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #8B6420, #C9A84C, #F0D080)", backgroundSize: "300%", animation: "shimmer 1.8s linear infinite" }}
                />
              </div>

              <div className="flex flex-wrap gap-3">
                {STAGE_SEQUENCE.map((s, idx) => {
                  const ci   = STAGE_SEQUENCE.indexOf(job.stage);
                  const done   = idx < ci;
                  const active = idx === ci;
                  return (
                    <div key={s} className={cn(
                      "flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider transition-colors duration-300",
                      done && "text-gold-400", active && "text-gold-200", !done && !active && "text-white/15",
                    )}>
                      <motion.div
                        animate={{ scale: active ? [1,1.4,1] : 1, backgroundColor: done ? "#C9A84C" : active ? "#F0D080" : "rgba(255,255,255,0.12)" }}
                        transition={{ duration: active ? 0.9 : 0.3, repeat: active ? Infinity : 0 }}
                        className="h-1.5 w-1.5 rounded-full"
                      />
                      {s}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Result ── */}
        {phase === "result" && job && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <StepIndicator current={2} />
            <motion.div
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, ease: [0.34, 1.2, 0.64, 1] }}
              className="overflow-hidden rounded-2xl border border-border-gold bg-surface-1/90 backdrop-blur-2xl"
            >
              <div className="flex">
                <div className="relative flex w-28 flex-shrink-0 items-center justify-center bg-gradient-to-br from-gold-800 via-gold-700 to-surface-0">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/15">
                    <svg className="h-5 w-5 fill-gold-400" viewBox="0 0 20 20"><path d="M7 5l9 5-9 5V5z" /></svg>
                  </div>
                  <div className="absolute bottom-2.5 left-0 right-0 text-center font-mono text-[8px] text-gold-400/50">
                    {platformResolution(job.platform)}
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <span className="mb-2 inline-flex items-center gap-1 rounded-md border border-border-gold bg-gold-400/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-gold-400">
                      <Check className="h-2.5 w-2.5" /> Dispatched
                    </span>
                    <p className="mt-2 text-[14px] font-bold text-white">
                      {job.sourceUrl.replace(/^https?:\/\//, "").slice(0, 50)} — Ready
                    </p>
                    <p className="mt-1 font-mono text-[10px] text-white/30">
                      {platformLabel(job.platform)} · {platformResolution(job.platform)} · Auto-captioned
                    </p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-1.5 rounded-xl bg-gold-gradient px-4 py-2 text-[12px] font-bold text-black shadow-gold-glow">
                      <Download className="h-3.5 w-3.5" /> Download
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-1.5 rounded-xl border border-border-subtle px-3.5 py-2 text-[12px] font-medium text-white/50 hover:border-border-gold hover:text-gold-400 transition-colors">
                      <CalendarClock className="h-3.5 w-3.5" /> Schedule
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={dismissResult}
                      className="flex items-center gap-1.5 rounded-xl border border-border-subtle px-3.5 py-2 text-[12px] font-medium text-white/50 hover:border-border-gold hover:text-gold-400 transition-colors">
                      <Repeat2 className="h-3.5 w-3.5" /> New Video
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
