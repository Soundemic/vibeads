"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Eye, Heart, Play, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHoverVideo } from "@/hooks/useHoverVideo";
import type { VideoMeta } from "@/types";

interface VideoCardProps {
  video: VideoMeta;
  index?: number;
  onClick?: (video: VideoMeta) => void;
  onRemix?: (video: VideoMeta) => void;
}

export function VideoCard({ video, index = 0, onClick, onRemix }: VideoCardProps) {
  const { videoRef, isPlaying, onEnter, onLeave } = useHoverVideo();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={() => onClick?.(video)}
      className={cn(
        "group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl",
        "border border-border-subtle bg-surface-1",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1.5 hover:border-border-gold hover:shadow-card-hover",
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-surface-0">
        <div
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-opacity duration-300",
            isPlaying ? "opacity-0" : "opacity-100",
          )}
          style={{ backgroundImage: `url('${video.posterUrl}')` }}
        />
        <video
          ref={videoRef}
          src={video.srcUrl}
          muted
          loop
          playsInline
          preload="none"
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
            isPlaying ? "opacity-100" : "opacity-0",
          )}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Tag */}
        <div
          className={cn(
            "absolute left-2.5 top-2.5 z-10 rounded-md px-2 py-1",
            "border text-[9px] font-semibold uppercase tracking-wider backdrop-blur-md font-mono",
            video.isHot
              ? "border-border-gold bg-gold-400/20 text-gold-200"
              : "border-white/10 bg-black/50 text-white/70",
          )}
        >
          {video.isHot && <Sparkles className="mr-1 inline h-2.5 w-2.5" />}
          {video.tag}
        </div>

        {/* Duration */}
        <div className="absolute bottom-2.5 right-2.5 z-10 rounded-md bg-black/70 px-1.5 py-0.5 font-mono text-[10px] text-white/80 backdrop-blur-sm">
          {video.duration}
        </div>

        {/* Play ring */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 z-10 flex items-center justify-center"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md">
                <Play className="h-4 w-4 fill-white text-white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sound bars */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              className="absolute right-2.5 top-2.5 z-10 flex items-center gap-1"
            >
              {[1, 2, 3].map((bar) => (
                <motion.div
                  key={bar}
                  className="w-0.5 rounded-full bg-gold-400"
                  animate={{ height: ["4px", "12px", "6px", "14px", "4px"] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: bar * 0.15, ease: "easeInOut" }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2.5 p-3">
        <p className="line-clamp-2 text-[12.5px] font-semibold leading-snug text-white">
          {video.title}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-mono text-[10px] text-white/40">
              <Eye className="h-3 w-3" />{video.views}
            </span>
            <span className="flex items-center gap-1 font-mono text-[10px] text-white/40">
              <Heart className="h-3 w-3" />{video.likes}
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={(e) => { e.stopPropagation(); onRemix?.(video); }}
            className={cn(
              "rounded-md border border-border-gold bg-gold-400/10 px-2 py-1",
              "font-mono text-[10px] font-semibold text-gold-400",
              "transition-colors hover:bg-gold-400/20 hover:text-gold-200",
            )}
          >
            Remix →
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
