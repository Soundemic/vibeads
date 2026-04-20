import { Clock, Plus, Calendar, CheckCircle2, Loader2 } from "lucide-react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const SCHEDULED = [
  { day: 0, time: "09:00", title: "Nike Air Max Launch Reel",    platform: "TikTok",   status: "scheduled" },
  { day: 0, time: "18:00", title: "Morning Routine Breakdown",   platform: "Instagram", status: "scheduled" },
  { day: 1, time: "12:00", title: "AI Tools Roundup",            platform: "YouTube",  status: "rendering" },
  { day: 2, time: "10:30", title: "Amazon Gadget Review",        platform: "TikTok",   status: "scheduled" },
  { day: 3, time: "15:00", title: "Q3 Market Report Summary",    platform: "LinkedIn", status: "scheduled" },
  { day: 4, time: "09:00", title: "Luxury Watch Breakdown",      platform: "Instagram", status: "scheduled" },
  { day: 4, time: "20:00", title: "Tech CEO Daily Routine",      platform: "TikTok",   status: "scheduled" },
  { day: 6, time: "11:00", title: "Best Earbuds 2025 Ranked",    platform: "YouTube",  status: "scheduled" },
];

const PLATFORM_DOTS: Record<string, string> = {
  TikTok:   "bg-pink-500",
  Instagram: "bg-purple-500",
  YouTube:  "bg-red-500",
  LinkedIn: "bg-blue-500",
};

export default function SchedulesPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-10 py-10">

      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-[28px] font-black tracking-tight text-white">
            Scheduled{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #F0D080, #C9A84C)" }}
            >
              Posts
            </span>
          </h1>
          <p className="mt-1.5 font-mono text-[11px] text-white/30 uppercase tracking-wider">
            // this week · 8 posts queued
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-gold-gradient px-5 py-2.5 text-[13px] font-bold text-black shadow-[0_0_20px_rgba(201,168,76,0.3)]">
          <Plus className="h-4 w-4" /> Schedule Post
        </button>
      </div>

      {/* Calendar week */}
      <div className="grid grid-cols-7 gap-3">
        {DAYS.map((day, dayIdx) => {
          const dayPosts = SCHEDULED.filter((s) => s.day === dayIdx);
          const isToday  = dayIdx === 1; // Tuesday = "today" in demo

          return (
            <div
              key={day}
              className={`min-h-[360px] rounded-2xl border p-3 ${
                isToday
                  ? "border-border-gold bg-gold-400/5"
                  : "border-white/[0.06] bg-surface-1/50"
              }`}
            >
              {/* Day header */}
              <div className="mb-3 flex items-center justify-between">
                <span
                  className={`text-[13px] font-bold ${
                    isToday ? "text-gold-300" : "text-white/50"
                  }`}
                >
                  {day}
                </span>
                {isToday && (
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shadow-[0_0_6px_rgba(201,168,76,0.8)]" />
                )}
              </div>

              {/* Posts */}
              <div className="space-y-2">
                {dayPosts.map((post, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/[0.06] bg-surface-2/80 p-2.5 cursor-pointer transition-colors hover:border-border-gold"
                  >
                    <div className="mb-1.5 flex items-center gap-1.5">
                      <div className={`h-1.5 w-1.5 rounded-full ${PLATFORM_DOTS[post.platform] ?? "bg-white/30"}`} />
                      <span className="font-mono text-[8.5px] text-white/30">{post.time}</span>
                      {post.status === "rendering" && (
                        <Loader2 className="ml-auto h-2.5 w-2.5 animate-spin text-gold-400" />
                      )}
                      {post.status === "scheduled" && (
                        <Clock className="ml-auto h-2.5 w-2.5 text-white/20" />
                      )}
                    </div>
                    <p className="line-clamp-2 text-[10.5px] font-medium leading-snug text-white/70">
                      {post.title}
                    </p>
                  </div>
                ))}

                {dayPosts.length === 0 && (
                  <div className="flex h-16 items-center justify-center">
                    <span className="font-mono text-[9px] text-white/15">No posts</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Upcoming list */}
      <div className="mt-8 rounded-2xl border border-white/[0.07] bg-surface-1/70 p-6 backdrop-blur-xl">
        <h2 className="mb-5 text-[14px] font-bold text-white">Upcoming Queue</h2>
        <div className="space-y-2">
          {SCHEDULED.slice(0, 5).map((post, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-xl border border-transparent px-4 py-3 transition-colors hover:border-border-gold hover:bg-gold-400/5"
            >
              <div className={`h-2 w-2 flex-shrink-0 rounded-full ${PLATFORM_DOTS[post.platform] ?? "bg-white/20"}`} />
              <div className="flex-1">
                <p className="text-[13px] font-medium text-white/80">{post.title}</p>
                <p className="font-mono text-[10px] text-white/30">
                  {DAYS[post.day]} · {post.time} · {post.platform}
                </p>
              </div>
              <span
                className={`rounded-md border px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider ${
                  post.status === "rendering"
                    ? "border-border-gold bg-gold-400/10 text-gold-400"
                    : "border-white/[0.08] bg-white/[0.04] text-white/30"
                }`}
              >
                {post.status}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
