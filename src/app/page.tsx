"use client";

import { Sidebar }           from "@/components/layout/Sidebar";
import { Topbar }            from "@/components/layout/Topbar";
import { HeroSection }       from "@/components/studio/HeroSection";
import { TemplateRail }      from "@/components/video/TemplateRail";
import { VideoGrid }         from "@/components/video/VideoGrid";
import { VideoModal }        from "@/components/video/VideoModal";
import { CommandPalette }    from "@/components/layout/CommandPalette";
import { useVideoModal }     from "@/hooks/useVideoModal";
import { useGeneratorStore } from "@/store";
import type { VideoMeta }    from "@/types";

export default function StudioPage() {
  const { selectedVideo, open: openModal, close: closeModal } = useVideoModal();
  const { startGeneration } = useGeneratorStore();

  const handleRemix = (video: VideoMeta) => {
    startGeneration(video.srcUrl, video.platform, {
      autoCaption:  true,
      brandOverlay: true,
      n8nDispatch:  true,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="noise-grain" aria-hidden />

      {/* Ambient orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="orb-drift absolute -left-20 -top-40 h-[650px] w-[650px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.14) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div className="orb-drift absolute -bottom-32 -right-20 h-[500px] w-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(100,50,200,0.09) 0%, transparent 70%)", filter: "blur(90px)", animationDelay: "-8s" }} />
        <div className="orb-drift absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)", filter: "blur(60px)", animationDelay: "-15s" }} />
      </div>

      {/* Global overlays */}
      <CommandPalette />
      <VideoModal video={selectedVideo} onClose={closeModal} onRemix={handleRemix} />

      {/* Shell */}
      <div className="relative z-10 flex h-screen overflow-hidden">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />

          <main className="flex-1 overflow-y-auto px-10 py-10">
            <div className="mx-auto max-w-[1200px]">
              <HeroSection />
              <TemplateRail />
              <VideoGrid onCardClick={openModal} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
