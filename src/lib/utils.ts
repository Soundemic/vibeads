import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { VideoPlatform } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

export function platformLabel(p: VideoPlatform): string {
  const map: Record<VideoPlatform, string> = {
    tiktok: "TikTok",
    instagram_reel: "Instagram Reel",
    youtube_short: "YouTube Short",
    linkedin: "LinkedIn",
    twitter: "Twitter / X",
    custom_mp4: "Custom MP4",
  };
  return map[p];
}

export function platformResolution(p: VideoPlatform): string {
  const vertical: VideoPlatform[] = ["tiktok", "instagram_reel", "youtube_short"];
  return vertical.includes(p) ? "1080×1920" : "1920×1080";
}

export function generateJobId(): string {
  return `vb-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}
