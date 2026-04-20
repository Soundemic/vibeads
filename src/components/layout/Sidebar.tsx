"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid, Video, BarChart2, Clock, Workflow,
  Plug, User, Sparkles, ChevronLeft, ChevronRight, Circle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store";

const NAV_SECTIONS = [
  {
    label: "Create",
    items: [
      { id: "studio",    icon: Video,     label: "Studio",       badge: "HOT",  dot: false },
      { id: "videos",    icon: LayoutGrid, label: "My Videos",   badge: null,   dot: false },
      { id: "analytics", icon: BarChart2,  label: "Analytics",   badge: null,   dot: false },
    ],
  },
  {
    label: "Dispatch",
    items: [
      { id: "schedules",     icon: Clock,    label: "Schedules",    badge: null, dot: true },
      { id: "flows",         icon: Workflow, label: "n8n Flows",    badge: null, dot: false },
      { id: "integrations",  icon: Plug,     label: "Integrations", badge: null, dot: false },
    ],
  },
  {
    label: "Workspace",
    items: [
      { id: "profile",  icon: User,     label: "Profile",  badge: null,      dot: false },
      { id: "upgrade",  icon: Sparkles, label: "Upgrade",  badge: "PRO",     dot: false },
    ],
  },
];

export function Sidebar() {
  const { collapsed, activeItem, toggleCollapsed, setActiveItem } = useSidebarStore();

  return (
    <motion.aside
      animate={{ width: collapsed ? 62 : 220 }}
      transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "relative z-20 flex flex-shrink-0 flex-col overflow-hidden",
        "border-r border-border-subtle",
        "bg-surface-0/75 backdrop-blur-3xl",
      )}
    >
      {/* Logo */}
      <div className="flex h-14 flex-shrink-0 items-center border-b border-border-subtle px-4 gap-3">
        <div
          className={cn(
            "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-[8px]",
            "bg-gold-gradient text-[12px] font-black text-black shadow-gold-glow",
          )}
        >
          V
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden whitespace-nowrap bg-gold-gradient bg-clip-text text-[15.5px] font-bold text-transparent"
            >
              Vibeads
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <div className="flex flex-1 flex-col gap-0 overflow-y-auto overflow-x-hidden py-3 px-2">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} className="mb-1">
            <AnimatePresence>
              {!collapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-2 pb-1.5 pt-3 font-mono text-[8.5px] uppercase tracking-[0.2em] text-white/20"
                >
                  {section.label}
                </motion.p>
              )}
            </AnimatePresence>

            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={cn(
                    "relative mb-0.5 flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2.5",
                    "border text-left text-[12.5px] font-medium transition-all duration-200",
                    collapsed && "justify-center px-0",
                    isActive
                      ? "border-border-gold bg-gold-400/10 text-gold-300"
                      : "border-transparent text-white/40 hover:bg-white/[0.04] hover:text-white/70",
                  )}
                >
                  {/* Active left rail */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-rail"
                      className="absolute left-0 top-2 bottom-2 w-[2.5px] rounded-r-full bg-gold-400"
                    />
                  )}

                  <Icon
                    className={cn(
                      "h-[17px] w-[17px] flex-shrink-0 transition-opacity",
                      isActive ? "opacity-100" : "opacity-50",
                    )}
                  />

                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-1 items-center gap-auto overflow-hidden whitespace-nowrap"
                      >
                        {item.label}

                        {item.badge && (
                          <span className="ml-auto rounded-md bg-gold-gradient px-1.5 py-0.5 text-[8.5px] font-bold text-black">
                            {item.badge}
                          </span>
                        )}

                        {item.dot && (
                          <span className="ml-auto flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                        )}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={toggleCollapsed}
        className={cn(
          "m-2 flex items-center gap-2 rounded-xl border border-border-subtle",
          "bg-white/[0.03] px-3 py-2.5 text-[12px] text-white/30",
          "transition-all hover:bg-white/[0.06] hover:text-white/60",
          collapsed && "justify-center px-0",
        )}
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <>
            <ChevronLeft className="h-4 w-4" />
            <AnimatePresence>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[11.5px]"
              >
                Collapse
              </motion.span>
            </AnimatePresence>
          </>
        )}
      </button>
    </motion.aside>
  );
}
