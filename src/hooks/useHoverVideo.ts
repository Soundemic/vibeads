"use client";

import { useCallback, useRef, useState } from "react";

export function useHoverVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const onEnter = useCallback(() => {
    clearTimeout(timeoutRef.current);
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false)); // Blocked by browser policy
    }
  }, []);

  const onLeave = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    // Slight delay before resetting so the fade-out animation completes
    timeoutRef.current = setTimeout(() => {
      if (video) {
        video.currentTime = 0;
        setIsPlaying(false);
      }
    }, 300);
  }, []);

  return { videoRef, isPlaying, onEnter, onLeave };
}
