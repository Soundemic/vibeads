import { Search, Filter, Download, Trash2, MoreHorizontal } from "lucide-react";
import { TRENDING_VIDEOS } from "@/lib/data";

const STATUS_STYLES: Record<string, string> = {
  dispatched: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  rendering:  "border-border-gold bg-gold-400/10 text-gold-400",
  queued:     "border-white/10 bg-white/5 text-white/40",
  error:      "border-red-500/30 bg-red-500/10 text-red-400",
};

export default function VideosPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-10 py-10">

      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-[28px] font-black tracking-tight text-white">
            My{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #F0D080, #C9A84C)" }}
            >
              Videos
            </span>
          </h1>
          <p className="mt-1.5 font-mono text-[11px] text-white/30 uppercase tracking-wider">
            // {TRENDING_VIDEOS.length} videos · all platforms
          </p>
        </div>

        {/* Search + filter */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-surface-1/70 px-3.5 py-2.5 backdrop-blur-xl">
            <Search className="h-3.5 w-3.5 text-white/30" />
            <input
              type="text"
              placeholder="Search videos…"
              className="w-48 bg-transparent text-[13px] text-white outline-none placeholder:text-white/25 caret-gold-400"
            />
          </div>
          <button className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-surface-1/70 px-3.5 py-2.5 text-[13px] text-white/50 backdrop-blur-xl transition-colors hover:border-border-gold hover:text-gold-400">
            <Filter className="h-3.5 w-3.5" /> Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-surface-1/70 backdrop-blur-xl">
        {/* Table header */}
        <div className="grid grid-cols-[auto_1fr_120px_100px_100px_80px] items-center gap-4 border-b border-white/[0.06] px-5 py-3">
          {["", "Title", "Platform", "Views", "Status", ""].map((h) => (
            <span key={h} className="font-mono text-[9.5px] uppercase tracking-wider text-white/25">
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {TRENDING_VIDEOS.map((video) => (
          <div
            key={video.id}
            className="group grid grid-cols-[auto_1fr_120px_100px_100px_80px] items-center gap-4 border-b border-white/[0.04] px-5 py-3.5 last:border-0 transition-colors hover:bg-gold-400/[0.04]"
          >
            {/* Thumbnail */}
            <div
              className="h-10 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-cover bg-center border border-white/[0.06]"
              style={{ backgroundImage: `url('${video.posterUrl}')` }}
            />

            {/* Title */}
            <div>
              <p className="truncate text-[13px] font-medium text-white/80">{video.title}</p>
              <p className="font-mono text-[10px] text-white/25">{video.duration} · {video.category}</p>
            </div>

            {/* Platform */}
            <span className="font-mono text-[11px] text-white/40 capitalize">
              {video.platform.replace("_", " ")}
            </span>

            {/* Views */}
            <span className="font-mono text-[12px] text-white/60">{video.views}</span>

            {/* Status */}
            <span
              className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${
                STATUS_STYLES[video.status] ?? STATUS_STYLES.queued
              }`}
            >
              {video.status}
            </span>

            {/* Actions */}
            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-transparent text-white/30 transition-all hover:border-border-gold hover:text-gold-400">
                <Download className="h-3.5 w-3.5" />
              </button>
              <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-transparent text-white/30 transition-all hover:border-red-500/40 hover:text-red-400">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-transparent text-white/30 transition-all hover:border-border-subtle hover:text-white/60">
                <MoreHorizontal className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
