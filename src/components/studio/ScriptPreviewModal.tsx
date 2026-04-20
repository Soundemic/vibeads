"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Copy, Check, Edit3, Play, X } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { VideoPlatform } from "@/types";
import { platformLabel } from "@/lib/utils";

interface ScriptSection {
  label: string;
  duration: string;
  content: string;
  color: string;
}

function generateScript(url: string, platform: VideoPlatform): ScriptSection[] {
  const domain = url.replace(/^https?:\/\//, "").split("/")[0];
  const platformName = platformLabel(platform);

  return [
    {
      label: "Hook",
      duration: "0–3s",
      content: `🔥 Stop scrolling. This from ${domain} just changed everything — and most people haven't seen it yet.`,
      color: "border-l-gold-400",
    },
    {
      label: "Point 1",
      duration: "3–18s",
      content: `Here's what's actually happening. The team behind this dropped something that no one expected. And it solves a problem we've all been complaining about for years.`,
      color: "border-l-blue-400",
    },
    {
      label: "Point 2",
      duration: "18–33s",
      content: `The real kicker? The price point is unreal for what you're getting. I've compared it against three competitors and there's no contest. Not even close.`,
      color: "border-l-emerald-400",
    },
    {
      label: "Point 3",
      duration: "33–48s",
      content: `I've been testing it for two weeks. Here's my honest take — what works, what doesn't, and who it's actually for. No sponsor, no affiliate link.`,
      color: "border-l-purple-400",
    },
    {
      label: "CTA",
      duration: "48–60s",
      content: `Link in bio for the full breakdown. Follow for more ${platformName} content like this — I drop these every week.`,
      color: "border-l-gold-400",
    },
  ];
}

interface ScriptPreviewModalProps {
  open: boolean;
  onClose: () => void;
  onApprove: () => void;
  sourceUrl: string;
  platform: VideoPlatform;
}

export function ScriptPreviewModal({
  open,
  onClose,
  onApprove,
  sourceUrl,
  platform,
}: ScriptPreviewModalProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [sections, setSections] = useState<ScriptSection[]>(() =>
    generateScript(sourceUrl, platform)
  );
  const [editBuffer, setEditBuffer] = useState("");
  const [copied, setCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const handleCopyAll = () => {
    const full = sections.map((s) => `[${s.label} — ${s.duration}]\n${s.content}`).join("\n\n");
    navigator.clipboard.writeText(full).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEdit = (i: number) => {
    setEditingIndex(i);
    setEditBuffer(sections[i].content);
  };

  const handleSaveEdit = (i: number) => {
    setSections((prev) => prev.map((s, idx) => idx === i ? { ...s, content: editBuffer } : s));
    setEditingIndex(null);
  };

  const handleRegenerate = () => {
    setRegenerating(true);
    setTimeout(() => {
      setSections(generateScript(sourceUrl, platform));
      setRegenerating(false);
    }, 1200);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="AI-Generated Script"
      description={`${platformLabel(platform)} · 60s · Auto-generated from ${sourceUrl.replace(/^https?:\/\//, "").slice(0, 40)}`}
      size="lg"
    >
      {/* Toolbar */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-gold-400" />
          <span className="font-mono text-[11px] text-gold-400 uppercase tracking-wider">
            Script ready — review before rendering
          </span>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={handleCopyAll}>
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy all"}
          </Button>
          <Button variant="ghost" size="sm" loading={regenerating} onClick={handleRegenerate}>
            <Sparkles className="h-3.5 w-3.5" />
            Regenerate
          </Button>
        </div>
      </div>

      {/* Script sections */}
      <div className="space-y-3 mb-6">
        <AnimatePresence mode="wait">
          {regenerating ? (
            <motion.div
              key="regen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-20 rounded-xl border border-border-subtle bg-surface-2 animate-shimmer"
                  style={{
                    background: "linear-gradient(110deg, #13131C 30%, #1A1A26 50%, #13131C 70%)",
                    backgroundSize: "300% 100%",
                    animationDelay: `${i * 80}ms`,
                  }}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="sections"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              {sections.map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className={cn(
                    "group relative rounded-xl border border-border-subtle bg-surface-2/50 p-4",
                    "border-l-2",
                    section.color,
                    "hover:border-border-gold/50 transition-colors",
                  )}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-white/40">
                        {section.label}
                      </span>
                      <span className="rounded-md border border-border-subtle bg-surface-3 px-1.5 py-0.5 font-mono text-[8.5px] text-white/25">
                        {section.duration}
                      </span>
                    </div>
                    {editingIndex !== i && (
                      <button
                        onClick={() => handleEdit(i)}
                        className="opacity-0 group-hover:opacity-100 flex items-center gap-1 rounded-lg border border-border-subtle bg-surface-3 px-2 py-1 font-mono text-[9.5px] text-white/40 transition-all hover:border-border-gold hover:text-gold-400"
                      >
                        <Edit3 className="h-3 w-3" /> Edit
                      </button>
                    )}
                  </div>

                  {editingIndex === i ? (
                    <div className="space-y-2">
                      <textarea
                        value={editBuffer}
                        onChange={(e) => setEditBuffer(e.target.value)}
                        rows={3}
                        className="w-full resize-none rounded-lg border border-border-gold bg-surface-3 p-3 text-[13px] text-white outline-none placeholder:text-white/20 caret-gold-400"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <Button variant="gold" size="sm" onClick={() => handleSaveEdit(i)}>
                          <Check className="h-3.5 w-3.5" /> Save
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setEditingIndex(null)}>
                          <X className="h-3.5 w-3.5" /> Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[13px] leading-relaxed text-white/70">{section.content}</p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-between border-t border-border-subtle pt-5">
        <div className="font-mono text-[10px] text-white/25">
          ~{sections.reduce((a, s) => a + s.content.split(" ").length, 0)} words · estimated 60s
        </div>
        <div className="flex gap-2.5">
          <Button variant="ghost" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="gold" size="md" onClick={() => { onApprove(); onClose(); }}>
            <Play className="h-4 w-4" />
            Render Video →
          </Button>
        </div>
      </div>
    </Modal>
  );
}
