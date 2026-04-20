"use client";

import type { ReactNode } from "react";
import { Sidebar }        from "./Sidebar";
import { Topbar }         from "./Topbar";
import { CommandPalette } from "./CommandPalette";

interface AppShellProps {
  children: ReactNode;
}

/**
 * AppShell wraps every page in the sidebar + topbar chrome.
 * Used by app/layout.tsx for sub-pages (analytics, videos, etc.).
 */
export function AppShell({ children }: AppShellProps) {
  return (
    <>
      {/* Film grain */}
      <div className="noise-grain" aria-hidden />

      {/* Ambient orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="orb-drift absolute -left-20 -top-40 h-[600px] w-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div className="orb-drift absolute -bottom-24 -right-16 h-[450px] w-[450px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(100,50,200,0.08) 0%, transparent 70%)", filter: "blur(90px)", animationDelay: "-8s" }} />
      </div>

      {/* ⌘K palette */}
      <CommandPalette />

      {/* Shell grid */}
      <div className="relative z-10 flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
