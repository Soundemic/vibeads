import type { VideoPlatform } from "@/types";

export const APP_NAME    = "Vibeads";
export const APP_VERSION = "1.0.0";
export const APP_URL     = process.env.NEXT_PUBLIC_APP_URL ?? "https://vibeads.io";

// ── Generation pipeline ──────────────────────────────────────────────────────

export const STAGE_DURATIONS_MS: Record<string, number> = {
  fetching:    900,
  parsing:     700,
  scripting:   1100,
  rendering:   1400,
  dispatching: 600,
};

export const MAX_JOB_HISTORY = 50;

export const PLATFORM_RESOLUTIONS: Record<VideoPlatform, string> = {
  tiktok:          "1080×1920",
  instagram_reel:  "1080×1920",
  youtube_short:   "1080×1920",
  linkedin:        "1920×1080",
  twitter:         "1280×720",
  custom_mp4:      "1920×1080",
};

export const PLATFORM_LABELS: Record<VideoPlatform, string> = {
  tiktok:          "TikTok",
  instagram_reel:  "Instagram Reel",
  youtube_short:   "YouTube Short",
  linkedin:        "LinkedIn",
  twitter:         "Twitter / X",
  custom_mp4:      "Custom MP4",
};

// ── Credits ──────────────────────────────────────────────────────────────────

export const CREDITS_PER_VIDEO = 5;
export const DEFAULT_CREDITS   = 240;

// ── Keyboard shortcuts ───────────────────────────────────────────────────────

export const SHORTCUTS = {
  focusInput:    { key: "k",   modifiers: ["ctrl"] as const },
  toggleSidebar: { key: "b",   modifiers: ["ctrl"] as const },
  openHistory:   { key: "h",   modifiers: ["ctrl", "shift"] as const },
  escape:        { key: "Escape", modifiers: [] as const },
} as const;
