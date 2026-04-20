"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Captions, Layers, Clock, Workflow, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GenerationOptions } from "@/types";

interface OptionsPanelProps {
  value: GenerationOptions;
  onChange: (opts: GenerationOptions) => void;
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-5 w-9 flex-shrink-0 rounded-full border transition-all duration-250",
        checked
          ? "border-gold-400/60 bg-gold-600/40"
          : "border-border-subtle bg-white/[0.06]",
      )}
    >
      <motion.span
        animate={{ x: checked ? 16 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        className={cn(
          "absolute top-0.5 block h-3.5 w-3.5 rounded-full",
          checked ? "bg-gold-300" : "bg-white/30",
        )}
      />
    </button>
  );
}

const OPTIONS_CONFIG = [
  {
    key: "autoCaption" as const,
    icon: Captions,
    label: "Auto-caption",
    description: "Generate burnt-in subtitles",
  },
  {
    key: "brandOverlay" as const,
    icon: Layers,
    label: "Brand overlay",
    description: "Apply your brand kit",
  },
  {
    key: "n8nDispatch" as const,
    icon: Workflow,
    label: "n8n dispatch",
    description: "Auto-push to n8n pipeline",
  },
];

export function OptionsPanel({ value, onChange }: OptionsPanelProps) {
  const [open, setOpen] = useState(false);

  const activeCount = [value.autoCaption, value.brandOverlay, value.n8nDispatch].filter(Boolean).length;

  return (
    <div className="mt-3">
      {/* Toggle trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 text-[11.5px] text-white/30 transition-colors hover:text-white/60"
      >
        <span>Options</span>
        {activeCount > 0 && (
          <span className="rounded-md border border-border-gold bg-gold-400/10 px-1.5 py-0.5 font-mono text-[9px] text-gold-400">
            {activeCount} active
          </span>
        )}
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.div>
      </button>

      {/* Panel */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        className="overflow-hidden"
      >
        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {OPTIONS_CONFIG.map(({ key, icon: Icon, label, description }) => (
            <button
              key={key}
              onClick={() => onChange({ ...value, [key]: !value[key] })}
              className={cn(
                "flex flex-col gap-2 rounded-xl border p-3.5 text-left transition-all duration-200",
                value[key]
                  ? "border-border-gold bg-gold-400/8 text-gold-300"
                  : "border-border-subtle bg-white/[0.03] text-white/40 hover:border-border-gold/50 hover:text-white/60",
              )}
            >
              <div className="flex items-center justify-between">
                <Icon className="h-4 w-4" />
                <Toggle
                  checked={value[key] as boolean}
                  onChange={(v) => onChange({ ...value, [key]: v })}
                />
              </div>
              <div>
                <p className="text-[12px] font-semibold leading-tight">{label}</p>
                <p className="mt-0.5 font-mono text-[9.5px] opacity-60">{description}</p>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
