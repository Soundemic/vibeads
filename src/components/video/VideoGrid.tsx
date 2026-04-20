"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VideoCard } from "./VideoCard";
import { TRENDING_VIDEOS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useGeneratorStore } from "@/store";
import type { VideoCategory, VideoMeta } from "@/types";

const CATEGORIES: Array<{ value: "all" | VideoCategory; label: string }> = [
  { value: "all",       label: "All" },
  { value: "product",   label: "Product" },
  { value: "news",      label: "News" },
  { value: "lifestyle", label: "Lifestyle" },
];

function SkeletonCard({ delay }: { delay: number }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-1">
      <div
        className="aspect-[9/16] w-full"
        style={{
          background: "linear-gradient(110deg, #13131C 30%, #1A1A26 50%, #13131C 70%)",
          backgroundSize: "300% 100%",
          animation: `shimmer 1.5s ${delay}ms linear infinite`,
        }}
      />
      <div className="space-y-2 p-3">
        <div className="h-2.5 w-full rounded-md"
          style={{ background: "linear-gradient(110deg,#13131C 30%,#1A1A26 50%,#13131C 70%)", backgroundSize: "300% 100%", animation: "shimmer 1.5s 150ms linear infinite" }} />
        <div className="h-2 w-2/3 rounded-md"
          style={{ background: "linear-gradient(110deg,#13131C 30%,#1A1A26 50%,#13131C 70%)", backgroundSize: "300% 100%", animation: "shimmer 1.5s 300ms linear infinite" }} />
      </div>
    </div>
  );
}

interface VideoGridProps {
  onCardClick?: (video: VideoMeta) => void;
}

export function VideoGrid({ onCardClick }: VideoGridProps) {
  const [category, setCategory] = useState<"all" | VideoCategory>("all");
  const [loading, setLoading]   = useState(false);
  const { phase, job, startGeneration } = useGeneratorStore();

  const handleFilter = (cat: typeof category) => {
    if (cat === category) return;
    setLoading(true);
    setCategory(cat);
    setTimeout(() => setLoading(false), 700);
  };

  const filtered = useMemo(() => {
    const base = category === "all"
      ? TRENDING_VIDEOS
      : TRENDING_VIDEOS.filter((v) => v.category === category);

    if (phase === "result" && job) {
      const fresh: VideoMeta = {
        ...TRENDING_VIDEOS[0],
        id:     job.id,
        title:  job.sourceUrl.replace(/^https?:\/\//, "").slice(0, 48) + " — AI Generated",
        status: "dispatched",
        tag:    "New",
        isHot:  true,
      };
      return [fresh, ...base];
    }
    return base;
  }, [category, phase, job]);

  return (
    <section>
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[18px] font-bold tracking-[-0.025em] text-white">
          Trending{" "}
          <span className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #F0D080, #C9A84C)" }}>
            Right Now
          </span>
        </h2>
        <div className="flex gap-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleFilter(cat.value)}
              className={cn(
                "relative rounded-lg px-3.5 py-1.5 text-[11.5px] font-medium transition-colors",
                category === cat.value ? "text-gold-300" : "text-white/30 hover:text-white/60",
              )}
            >
              {category === cat.value && (
                <motion.div layoutId="category-active"
                  className="absolute inset-0 rounded-lg border border-border-gold bg-gold-400/8"
                  transition={{ duration: 0.22 }} />
              )}
              <span className="relative">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="skeletons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-3.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} delay={i * 50} />
            ))}
          </motion.div>
        ) : (
          <motion.div key={`grid-${category}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-3.5">
            {filtered.map((video, i) => (
              <VideoCard
                key={video.id}
                video={video}
                index={i}
                onClick={onCardClick}
                onRemix={(v) => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  startGeneration(v.srcUrl, v.platform, {
                    autoCaption: true, brandOverlay: true, n8nDispatch: true,
                  });
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
