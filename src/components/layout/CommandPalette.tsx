"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Video, LayoutGrid, BarChart2, Clock, Workflow, Plug, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import { useSidebarStore } from "@/store";

interface Command {
  id:       string;
  label:    string;
  category: string;
  icon:     React.ElementType;
  action:   () => void;
  shortcut?: string;
}

export function CommandPalette() {
  const [open, setOpen]     = useState(false);
  const [query, setQuery]   = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef            = useRef<HTMLInputElement>(null);
  const { setActiveItem }   = useSidebarStore();

  // ⌘K to open
  useKeyboardShortcut({
    key: "k",
    modifiers: ["ctrl"],
    onTrigger: () => setOpen((o) => !o),
  });

  // Escape to close
  useKeyboardShortcut({
    key: "Escape",
    onTrigger: () => setOpen(false),
    enabled: open,
  });

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelected(0);
    }
  }, [open]);

  const COMMANDS: Command[] = [
    { id: "studio",       label: "Go to Studio",       category: "Navigate", icon: Video,     action: () => { setActiveItem("studio");       setOpen(false); } },
    { id: "videos",       label: "My Videos",          category: "Navigate", icon: LayoutGrid, action: () => { setActiveItem("videos");       setOpen(false); } },
    { id: "analytics",   label: "Analytics",          category: "Navigate", icon: BarChart2,  action: () => { setActiveItem("analytics");   setOpen(false); } },
    { id: "schedules",   label: "Schedules",          category: "Navigate", icon: Clock,      action: () => { setActiveItem("schedules");   setOpen(false); } },
    { id: "flows",       label: "n8n Flows",          category: "Navigate", icon: Workflow,   action: () => { setActiveItem("flows");       setOpen(false); } },
    { id: "integrations", label: "Integrations",      category: "Navigate", icon: Plug,       action: () => { setActiveItem("integrations"); setOpen(false); } },
    { id: "new-video",   label: "Generate New Video", category: "Actions",  icon: Sparkles,   action: () => { setActiveItem("studio");       setOpen(false); }, shortcut: "G" },
  ];

  const filtered = query.trim()
    ? COMMANDS.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.category.toLowerCase().includes(query.toLowerCase())
      )
    : COMMANDS;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && filtered[selected]) {
      filtered[selected].action();
    }
  };

  const grouped = filtered.reduce<Record<string, Command[]>>((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {});

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cp-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
          />

          {/* Palette */}
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
            <motion.div
              key="cp"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -6 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className={cn(
                "w-full max-w-lg overflow-hidden rounded-2xl",
                "border border-border-gold bg-surface-1/95 backdrop-blur-2xl",
                "shadow-[0_24px_64px_rgba(0,0,0,0.6)]",
              )}
              onKeyDown={handleKeyDown}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 border-b border-border-subtle px-4 py-3.5">
                <Search className="h-4 w-4 flex-shrink-0 text-white/30" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
                  placeholder="Search commands…"
                  className="flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-white/25 caret-gold-400"
                />
                <kbd className="rounded-md border border-border-subtle bg-surface-3 px-2 py-0.5 font-mono text-[10px] text-white/25">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[320px] overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <div className="py-10 text-center font-mono text-[12px] text-white/25">
                    No commands found
                  </div>
                ) : (
                  Object.entries(grouped).map(([category, cmds]) => (
                    <div key={category} className="mb-2">
                      <p className="mb-1 px-2 font-mono text-[9px] uppercase tracking-widest text-white/20">
                        {category}
                      </p>
                      {cmds.map((cmd) => {
                        const globalIdx = filtered.indexOf(cmd);
                        const Icon = cmd.icon;
                        return (
                          <button
                            key={cmd.id}
                            onClick={cmd.action}
                            onMouseEnter={() => setSelected(globalIdx)}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                              selected === globalIdx
                                ? "bg-gold-400/10 text-gold-300"
                                : "text-white/60 hover:bg-white/[0.04]",
                            )}
                          >
                            <Icon className="h-4 w-4 flex-shrink-0 opacity-70" />
                            <span className="flex-1 text-[13px] font-medium">{cmd.label}</span>
                            {cmd.shortcut && (
                              <kbd className="rounded border border-border-subtle bg-surface-3 px-1.5 py-0.5 font-mono text-[9.5px] text-white/25">
                                {cmd.shortcut}
                              </kbd>
                            )}
                            {selected === globalIdx && (
                              <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 text-gold-400" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer hint */}
              <div className="flex items-center gap-4 border-t border-border-subtle px-4 py-2.5">
                {[
                  { key: "↑↓", desc: "navigate" },
                  { key: "↵",  desc: "select" },
                  { key: "⌘K", desc: "toggle" },
                ].map(({ key, desc }) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <kbd className="rounded border border-border-subtle bg-surface-3 px-1.5 py-0.5 font-mono text-[9.5px] text-white/25">
                      {key}
                    </kbd>
                    <span className="font-mono text-[9.5px] text-white/20">{desc}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
