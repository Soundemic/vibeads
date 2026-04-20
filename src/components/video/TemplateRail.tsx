"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Flame, Zap } from "lucide-react";
import { useHoverVideo } from "@/hooks/useHoverVideo";
import { VIDEO_TEMPLATES } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { VideoTemplate } from "@/types";

function TemplateCard({ template, index }: { template: VideoTemplate; index: number }) {
  const { videoRef, isPlaying, onEnter, onLeave } = useHoverVideo();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={cn(
        "group relative flex w-[175px] flex-shrink-0 cursor-pointer flex-col",
        "overflow-hidden rounded-2xl border border-border-subtle bg-surface-1",
        "snap-start transition-all duration-300",
        "hover:-translate-y-1 hover:border-border-gold hover:shadow-card-hover",
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-surface-0">
        <div
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-opacity duration-300",
            isPlaying ? "opacity-0" : "opacity-100",
          )}
          style={{ backgroundImage: `url('${template.posterUrl}')` }}
        />
        <video
          ref={videoRef}
          src={template.srcUrl}
          muted
          loop
          playsInline
          preload="none"
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
            isPlaying ? "opacity-100" : "opacity-0",
          )}
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Category badge */}
        <div
          className={cn(
            "absolute left-2 top-2 flex items-center gap-1 rounded-md px-2 py-1",
            "font-mono text-[8.5px] uppercase tracking-wider backdrop-blur-md border",
            template.isHot
              ? "border-border-gold bg-gold-400/20 text-gold-300"
              : "border-white/10 bg-black/50 text-white/60",
          )}
        >
          {template.isHot && <Flame className="h-2.5 w-2.5" />}
          {template.category}
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="mb-1 text-[12.5px] font-600 text-white">{template.name}</p>
        <div className="flex items-center justify-between">
          <p className="font-mono text-[9.5px] text-white/30">
            {(template.uses / 1000).toFixed(1)}K uses
          </p>
          <div
            className={cn(
              "rounded-md px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide",
              "border border-border-gold bg-gold-400/10 text-gold-400",
            )}
          >
            Use →
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function TemplateRail() {
  const railRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!railRef.current) return;
    railRef.current.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  return (
    <section className="mb-12">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[18px] font-bold tracking-[-0.025em] text-white">
          Template{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #F0D080, #C9A84C)" }}
          >
            Library
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-border-subtle bg-white/[0.04] text-white/40 transition-all hover:border-border-gold hover:text-gold-400"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-border-subtle bg-white/[0.04] text-white/40 transition-all hover:border-border-gold hover:text-gold-400"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
          <button className="ml-1 font-mono text-[11px] uppercase tracking-wider text-gold-400/70 transition-colors hover:text-gold-300">
            See all →
          </button>
        </div>
      </div>

      {/* Rail */}
      <div
        ref={railRef}
        className="flex gap-3.5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {VIDEO_TEMPLATES.map((tmpl, i) => (
          <TemplateCard key={tmpl.id} template={tmpl} index={i} />
        ))}
      </div>
    </section>
  );
}
