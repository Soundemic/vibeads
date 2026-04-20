import { TrendingUp, Eye, Heart, Zap, ArrowUpRight, ArrowDownRight } from "lucide-react";

const METRICS = [
  { label: "Total Views",       value: "2.4M",  delta: "+18%",  up: true,  icon: Eye },
  { label: "Total Likes",       value: "184K",  delta: "+22%",  up: true,  icon: Heart },
  { label: "Videos Generated",  value: "1,247", delta: "+31%",  up: true,  icon: Zap },
  { label: "Avg. Engagement",   value: "7.6%",  delta: "-0.4%", up: false, icon: TrendingUp },
];

const PLATFORM_BREAKDOWN = [
  { platform: "TikTok",         views: "1.2M", pct: 50, color: "bg-pink-500" },
  { platform: "Instagram Reel", views: "680K", pct: 28, color: "bg-purple-500" },
  { platform: "YouTube Short",  views: "340K", pct: 14, color: "bg-red-500" },
  { platform: "LinkedIn",       views: "120K", pct: 5,  color: "bg-blue-500" },
  { platform: "Twitter / X",    views: "60K",  pct: 3,  color: "bg-white" },
];

const TOP_VIDEOS = [
  { title: "Morning Routine That Made Me $1M",        views: "8.7M", likes: "720K", platform: "TikTok" },
  { title: "GRWM: Tech CEO Daily Routine Edition",    views: "6.3M", likes: "512K", platform: "Instagram" },
  { title: "10 AI Tools Changing Everything in 2025", views: "5.1M", likes: "441K", platform: "YouTube" },
  { title: "Why ChatGPT Competitors Are Winning",     views: "4.6M", likes: "389K", platform: "TikTok" },
  { title: "Amazon's Viral $12 Kitchen Gadget",       views: "3.2M", likes: "267K", platform: "Instagram" },
];

export default function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-[1200px] space-y-8 px-10 py-10">

      {/* Page header */}
      <div>
        <h1 className="text-[28px] font-black tracking-tight text-white">
          Analytics{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #F0D080, #C9A84C)" }}
          >
            Overview
          </span>
        </h1>
        <p className="mt-1.5 font-mono text-[11px] text-white/30 uppercase tracking-wider">
          // last 30 days · all platforms
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-4 gap-4">
        {METRICS.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              className="rounded-2xl border border-white/[0.07] bg-surface-1/70 p-5 backdrop-blur-xl"
            >
              <div className="mb-3 flex items-center justify-between">
                <Icon className="h-4 w-4 text-white/30" />
                <span
                  className={`flex items-center gap-0.5 font-mono text-[10.5px] font-semibold ${
                    m.up ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {m.up
                    ? <ArrowUpRight className="h-3 w-3" />
                    : <ArrowDownRight className="h-3 w-3" />
                  }
                  {m.delta}
                </span>
              </div>
              <p
                className="text-[30px] font-black tracking-tight"
                style={{ backgroundImage: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                {m.value}
              </p>
              <p className="mt-1 font-mono text-[10px] text-white/30 uppercase tracking-wider">{m.label}</p>
            </div>
          );
        })}
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-[1fr_1.6fr] gap-4">

        {/* Platform breakdown */}
        <div className="rounded-2xl border border-white/[0.07] bg-surface-1/70 p-6 backdrop-blur-xl">
          <h2 className="mb-5 text-[14px] font-bold text-white">Platform Breakdown</h2>
          <div className="space-y-4">
            {PLATFORM_BREAKDOWN.map((p) => (
              <div key={p.platform}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[12.5px] font-medium text-white/70">{p.platform}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-white/40">{p.views}</span>
                    <span className="w-8 text-right font-mono text-[11px] text-gold-400">{p.pct}%</span>
                  </div>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className={`h-full rounded-full ${p.color} opacity-70`}
                    style={{ width: `${p.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top videos */}
        <div className="rounded-2xl border border-white/[0.07] bg-surface-1/70 p-6 backdrop-blur-xl">
          <h2 className="mb-5 text-[14px] font-bold text-white">Top Performing Videos</h2>
          <div className="space-y-1">
            {TOP_VIDEOS.map((v, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-colors hover:border-border-gold hover:bg-gold-400/5"
              >
                <span className="w-5 flex-shrink-0 font-mono text-[11px] text-white/20">{i + 1}</span>
                <p className="flex-1 truncate text-[12.5px] font-medium text-white/80">{v.title}</p>
                <span className="flex-shrink-0 rounded-md border border-border-subtle bg-surface-3 px-2 py-0.5 font-mono text-[9.5px] text-white/30">
                  {v.platform}
                </span>
                <span className="w-14 flex-shrink-0 text-right font-mono text-[11px] text-white/50">{v.views}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
