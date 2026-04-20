"use client";

import { motion, AnimatePresence } from "framer-motion";
import { History, CheckCircle2, Loader2, AlertCircle, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { platformLabel } from "@/lib/utils";
import { useGeneratorStore } from "@/store";

const STATUS_CONFIG = {
  dispatched: { icon: CheckCircle2, color: "text-emerald-400", label: "Done" },
  rendering:  { icon: Loader2,      color: "text-gold-400",    label: "Rendering", spin: true },
  queued:     { icon: Loader2,      color: "text-white/30",    label: "Queued", spin: true },
  error:      { icon: AlertCircle,  color: "text-red-400",     label: "Error" },
  fetching:   { icon: Loader2,      color: "text-gold-400",    label: "Fetching", spin: true },
  scripting:  { icon: Loader2,      color: "text-gold-300",    label: "Scripting", spin: true },
} as const;

export function JobHistory() {
  const [open, setOpen] = useState(false);
  const { history } = useGeneratorStore();

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "flex items-center gap-2 rounded-xl border border-border-subtle bg-white/[0.04]",
          "px-3.5 py-2 text-[12px] text-white/40 transition-all",
          "hover:border-border-gold hover:text-gold-400",
        )}
      >
        <History className="h-3.5 w-3.5" />
        History
        {history.length > 0 && (
          <span className="rounded-md bg-gold-400/15 px-1.5 font-mono text-[9px] text-gold-400">
            {history.length}
          </span>
        )}
      </button>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className={cn(
                "fixed right-0 top-0 z-50 flex h-full w-[380px] flex-col",
                "border-l border-border-gold bg-surface-1/95 backdrop-blur-2xl",
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border-subtle px-6 py-5">
                <div>
                  <h2 className="text-[15px] font-bold text-white">Job History</h2>
                  <p className="mt-0.5 font-mono text-[10px] text-white/30">
                    {history.length} job{history.length !== 1 ? "s" : ""} dispatched
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-border-subtle text-white/30 transition-all hover:border-border-gold hover:text-gold-400"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Jobs list */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
                {history.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <History className="mb-3 h-8 w-8 text-white/10" />
                    <p className="text-[13px] text-white/20">No jobs yet</p>
                    <p className="mt-1 font-mono text-[11px] text-white/15">
                      Generate your first video above
                    </p>
                  </div>
                ) : (
                  history.map((job) => {
                    const cfg = STATUS_CONFIG[job.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.queued;
                    const Icon = cfg.icon;

                    return (
                      <motion.div
                        key={job.id}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={cn(
                          "flex items-start gap-3 rounded-xl border border-border-subtle bg-surface-2/50 p-3.5",
                          "transition-colors hover:border-border-gold",
                        )}
                      >
                        <div className={cn("mt-0.5 flex-shrink-0", cfg.color)}>
                          <Icon className={cn("h-4 w-4", "spin" in cfg && cfg.spin && "animate-spin")} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[12.5px] font-semibold text-white">
                            {job.sourceUrl.replace(/^https?:\/\//, "").slice(0, 40)}
                          </p>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="font-mono text-[9.5px] text-white/30">
                              {platformLabel(job.platform)}
                            </span>
                            <span className="h-1 w-1 rounded-full bg-white/20" />
                            <span className={cn("font-mono text-[9.5px]", cfg.color)}>
                              {cfg.label}
                            </span>
                          </div>
                          <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
                            <div
                              className="h-full rounded-full bg-gold-gradient transition-all duration-500"
                              style={{ width: `${job.progress}%` }}
                            />
                          </div>
                        </div>
                        <span className="flex-shrink-0 font-mono text-[9px] text-white/20">
                          {job.progress}%
                        </span>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
