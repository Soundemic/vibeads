"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Repeat2, Eye, Heart, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { platformLabel } from "@/lib/utils";
import type { VideoMeta } from "@/types";

interface VideoModalProps {
  video: VideoMeta | null;
  onClose: () => void;
  onRemix: (video: VideoMeta) => void;
}

export function VideoModal({ video, onClose, onRemix }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!video) return;
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = true;
    vid.play()
      .then(() => setPlaying(true))
      .catch(() => {});

    return () => {
      vid.pause();
      vid.currentTime = 0;
      setPlaying(false);
    };
  }, [video]);

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setMuted(vid.muted);
  };

  return (
    <AnimatePresence>
      {video && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.32, ease: [0.34, 1.1, 0.64, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-8"
          >
            <div className="flex h-full max-h-[85vh] max-w-4xl gap-6">

              {/* Video */}
              <div className="relative aspect-[9/16] h-full overflow-hidden rounded-2xl border border-border-gold bg-surface-0">
                <video
                  ref={videoRef}
                  src={video.srcUrl}
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                />

                {/* Controls */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button
                    onClick={toggleMute}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-black/50 text-white backdrop-blur-md transition-all hover:border-gold-400/40 hover:text-gold-400"
                  >
                    {muted
                      ? <VolumeX className="h-3.5 w-3.5" />
                      : <Volume2 className="h-3.5 w-3.5" />
                    }
                  </button>
                </div>

                {/* Tag */}
                {video.isHot && (
                  <div className="absolute left-3 top-3 rounded-md border border-border-gold bg-gold-400/20 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-gold-300">
                    🔥 {video.tag}
                  </div>
                )}
              </div>

              {/* Info panel */}
              <div className="flex w-80 flex-shrink-0 flex-col gap-5">
                {/* Close */}
                <div className="flex justify-end">
                  <button
                    onClick={onClose}
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-border-subtle bg-white/[0.05] text-white/30 transition-all hover:border-border-gold hover:text-gold-400"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Metadata */}
                <div className="flex-1 rounded-2xl border border-border-gold bg-surface-1/90 p-5 backdrop-blur-xl">
                  <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-gold-500">
                    // video details
                  </div>
                  <h3 className="mb-4 text-[15px] font-bold leading-snug text-white">
                    {video.title}
                  </h3>

                  <div className="space-y-3">
                    {[
                      { label: "Platform", value: platformLabel(video.platform) },
                      { label: "Duration", value: video.duration },
                      { label: "Category", value: video.category },
                      { label: "Status",   value: "Dispatched ✓" },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between border-b border-border-subtle pb-3 last:border-0 last:pb-0">
                        <span className="font-mono text-[10px] text-white/30">{label}</span>
                        <span className="text-[12px] font-medium text-white/70">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex gap-4">
                    <div className="flex items-center gap-1.5 text-[12px] text-white/40">
                      <Eye className="h-3.5 w-3.5" /> {video.views}
                    </div>
                    <div className="flex items-center gap-1.5 text-[12px] text-white/40">
                      <Heart className="h-3.5 w-3.5" /> {video.likes}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2.5">
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold-gradient py-3 text-[13px] font-bold text-black shadow-gold-glow"
                  >
                    <Download className="h-4 w-4" /> Download MP4
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={() => { onRemix(video); onClose(); }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-border-gold bg-gold-400/8 py-3 text-[13px] font-semibold text-gold-300 transition-colors hover:bg-gold-400/15"
                  >
                    <Repeat2 className="h-4 w-4" /> Remix this Video
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
