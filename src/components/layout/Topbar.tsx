"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store";

const TABS = ["Create", "Explore", "Templates", "Trending"];

export function Topbar() {
  const { activeTab, setActiveTab } = useUIStore();

  return (
    <header className="relative z-10 flex h-14 flex-shrink-0 items-center justify-between border-b border-border-subtle bg-surface-0/60 px-7 backdrop-blur-xl">
      <nav className="flex gap-1">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.toLowerCase();
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={cn(
                "relative rounded-xl px-4 py-2 text-[12.5px] font-medium transition-colors",
                isActive ? "text-gold-300" : "text-white/35 hover:text-white/70",
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="topbar-active"
                  className="absolute inset-0 rounded-xl border border-border-gold bg-gold-400/8"
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                />
              )}
              <span className="relative">{tab}</span>
            </button>
          );
        })}
      </nav>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-border-subtle bg-white/[0.04] px-3.5 py-2 text-[12px] text-white/40">
          <div className="h-3.5 w-3.5 rounded-[4px] bg-gold-gradient" />
          240 credits
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-border-gold bg-gold-gradient text-[11px] font-bold text-black shadow-gold-glow cursor-pointer">
          AK
        </div>
      </div>
    </header>
  );
}
