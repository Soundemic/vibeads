"use client";

import { create } from "zustand";
import type { GenerationJob, GenerationOptions, GenerationStage, VideoPlatform } from "@/types";
import { generateJobId, sleep } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

interface GeneratorStore {
  phase: "idle" | "processing" | "result";
  job: GenerationJob | null;
  history: GenerationJob[];

  // Actions
  startGeneration: (url: string, platform: VideoPlatform, options: GenerationOptions) => Promise<void>;
  resetGenerator: () => void;
  dismissResult: () => void;
}

interface SidebarStore {
  collapsed: boolean;
  activeItem: string;
  toggleCollapsed: () => void;
  setActiveItem: (item: string) => void;
}

interface UIStore {
  activeTab: string;
  activeCategory: string;
  setActiveTab: (tab: string) => void;
  setActiveCategory: (cat: string) => void;
}

// ─── Stages config ───────────────────────────────────────────────────────────

const STAGE_SEQUENCE: Array<{ stage: GenerationStage; progress: number; durationMs: number }> = [
  { stage: "fetching",    progress: 15, durationMs: 900  },
  { stage: "parsing",     progress: 35, durationMs: 700  },
  { stage: "scripting",   progress: 60, durationMs: 1100 },
  { stage: "rendering",   progress: 85, durationMs: 1400 },
  { stage: "dispatching", progress: 100, durationMs: 600 },
];

// ─── Generator Store ─────────────────────────────────────────────────────────

export const useGeneratorStore = create<GeneratorStore>((set, get) => ({
  phase: "idle",
  job: null,
  history: [],

  startGeneration: async (url, platform, options) => {
    const job: GenerationJob = {
      id: generateJobId(),
      sourceUrl: url,
      platform,
      status: "fetching",
      progress: 0,
      stage: "fetching",
      createdAt: new Date(),
      updatedAt: new Date(),
      options,
    };

    set({ phase: "processing", job });

    for (const step of STAGE_SEQUENCE) {
      // Small jitter so it feels organic
      const jitter = Math.random() * 300;
      await sleep(step.durationMs + jitter);

      set((state) => ({
        job: state.job
          ? {
              ...state.job,
              stage: step.stage,
              progress: step.progress,
              status: step.stage === "dispatching" ? "dispatched" : "rendering",
              updatedAt: new Date(),
            }
          : null,
      }));
    }

    await sleep(400);

    set((state) => ({
      phase: "result",
      job: state.job
        ? {
            ...state.job,
            stage: "complete",
            status: "dispatched",
            progress: 100,
            outputUrl: `https://cdn.vibeads.io/outputs/${state.job.id}.mp4`,
            updatedAt: new Date(),
          }
        : null,
      history: state.job ? [state.job, ...state.history].slice(0, 50) : state.history,
    }));
  },

  resetGenerator: () => set({ phase: "idle", job: null }),
  dismissResult:  () => set({ phase: "idle", job: null }),
}));

// ─── Sidebar Store ────────────────────────────────────────────────────────────

export const useSidebarStore = create<SidebarStore>((set) => ({
  collapsed: false,
  activeItem: "studio",
  toggleCollapsed: () => set((s) => ({ collapsed: !s.collapsed })),
  setActiveItem: (item) => set({ activeItem: item }),
}));

// ─── UI Store ────────────────────────────────────────────────────────────────

export const useUIStore = create<UIStore>((set) => ({
  activeTab: "create",
  activeCategory: "all",
  setActiveTab:      (tab) => set({ activeTab: tab }),
  setActiveCategory: (cat) => set({ activeCategory: cat }),
}));
