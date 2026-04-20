"use client";

import { useState, useCallback } from "react";
import type { VideoMeta } from "@/types";

export function useVideoModal() {
  const [selectedVideo, setSelectedVideo] = useState<VideoMeta | null>(null);

  const open  = useCallback((video: VideoMeta) => setSelectedVideo(video), []);
  const close = useCallback(() => setSelectedVideo(null), []);

  return { selectedVideo, open, close };
}
