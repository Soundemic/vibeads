// ─── Video ───────────────────────────────────────────────────────────────────

export type VideoPlatform =
  | "tiktok"
  | "instagram_reel"
  | "youtube_short"
  | "linkedin"
  | "twitter"
  | "custom_mp4";

export type VideoCategory = "product" | "news" | "lifestyle" | "tutorial" | "trending";

export type VideoStatus = "queued" | "fetching" | "scripting" | "rendering" | "dispatched" | "error";

export interface VideoMeta {
  id: string;
  title: string;
  category: VideoCategory;
  platform: VideoPlatform;
  status: VideoStatus;
  views: string;
  likes: string;
  duration: string;
  tag?: string;
  isHot?: boolean;
  srcUrl: string;
  posterUrl: string;
  sourceUrl?: string;
  createdAt: Date;
}

export interface GenerationJob {
  id: string;
  sourceUrl: string;
  platform: VideoPlatform;
  status: VideoStatus;
  progress: number;
  stage: GenerationStage;
  script?: string;
  outputUrl?: string;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
  options: GenerationOptions;
}

export interface GenerationOptions {
  autoCaption: boolean;
  brandOverlay: boolean;
  scheduleAt?: Date;
  n8nDispatch: boolean;
}

export type GenerationStage =
  | "idle"
  | "fetching"
  | "parsing"
  | "scripting"
  | "rendering"
  | "dispatching"
  | "complete"
  | "error";

// ─── Template ────────────────────────────────────────────────────────────────

export interface VideoTemplate {
  id: string;
  name: string;
  category: VideoCategory;
  uses: number;
  isHot: boolean;
  srcUrl: string;
  posterUrl: string;
  aspectRatio: "9:16" | "16:9" | "1:1";
}

// ─── UI State ────────────────────────────────────────────────────────────────

export interface SidebarState {
  collapsed: boolean;
  activeItem: string;
}

export interface GeneratorState {
  phase: "idle" | "processing" | "result";
  job: GenerationJob | null;
  history: GenerationJob[];
}

// ─── API ─────────────────────────────────────────────────────────────────────

export interface DispatchRequest {
  url: string;
  platform: VideoPlatform;
  options: GenerationOptions;
}

export interface DispatchResponse {
  jobId: string;
  status: VideoStatus;
  estimatedSeconds: number;
}
