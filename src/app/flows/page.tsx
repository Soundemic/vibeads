"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Workflow, Play, Pause, CheckCircle2, AlertCircle,
  Clock, Zap, ArrowRight, Plus, ExternalLink,
} from "lucide-react";

const FLOWS = [
  {
    id: "f1",
    name: "Link → TikTok Dispatch",
    description: "Fetches URL → generates script via Claude → renders → posts to TikTok automatically",
    status: "active",
    lastRun: "2 min ago",
    runs: 1247,
    successRate: 98.4,
    trigger: "Webhook",
    nodes: 8,
  },
  {
    id: "f2",
    name: "Trending Scraper → Auto-Remix",
    description: "Polls TikTok trending every hour, remixes top 3 videos into new content",
    status: "active",
    lastRun: "47 min ago",
    runs: 312,
    successRate: 94.2,
    trigger: "Schedule",
    nodes: 12,
  },
  {
    id: "f3",
    name: "Amazon → Multi-Platform",
    description: "Converts Amazon product listings to vertical video and dispatches across all platforms",
    status: "paused",
    lastRun: "3 hours ago",
    runs: 89,
    successRate: 91.0,
    trigger: "Webhook",
    nodes: 11,
  },
  {
    id: "f4",
    name: "News Article → LinkedIn Clip",
    description: "Monitors RSS feeds, converts breaking news to professional LinkedIn video summaries",
    status: "error",
    lastRun: "1 day ago",
    runs: 204,
    successRate: 87.5,
    trigger: "Schedule",
    nodes: 9,
  },
];

const EXECUTION_LOG = [
  { flow: "Link → TikTok Dispatch",    time: "2m ago",    status: "success", duration: "4.2s" },
  { flow: "Trending Scraper",           time: "47m ago",   status: "success", duration: "12.1s" },
  { flow: "Link → TikTok Dispatch",    time: "1h ago",    status: "success", duration: "3.8s" },
  { flow: "Link → TikTok Dispatch",    time: "2h ago",    status: "success", duration: "5.1s" },
  { flow: "Amazon → Multi-Platform",   time: "3h ago",    status: "warning", duration: "8.7s" },
  { flow: "News → LinkedIn",           time: "1d ago",    status: "error",   duration: "—" },
];

const STATUS_CONFIG = {
  active:  { color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-500/30", dot: "bg-emerald-400", label: "Active" },
  paused:  { color: "text-white/40",    bg: "bg-white/5 border-white/10",             dot: "bg-white/30",    label: "Paused" },
  error:   { color: "text-red-400",     bg: "bg-red-500/10 border-red-500/30",        dot: "bg-red-400",     label: "Error" },
};

const LOG_STATUS = {
  success: { icon: CheckCircle2, color: "text-emerald-400" },
  warning: { icon: AlertCircle,  color: "text-amber-400" },
  error:   { icon: AlertCircle,  color: "text-red-400" },
};

export default function FlowsPage() {
  const [activeFlow, setActiveFlow] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-[1200px] px-10 py-10">

      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-[28px] font-black tracking-tight text-white">
            n8n{" "}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #F0D080, #C9A84C)" }}>
              Automation Flows
            </span>
          </h1>
          <p className="mt-1.5 font-mono text-[11px] text-white/30 uppercase tracking-wider">
            // {FLOWS.filter(f => f.status === "active").length} active · {FLOWS.length} total flows
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://n8n.io"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-border-subtle bg-white/[0.04] px-4 py-2.5 text-[12.5px] text-white/50 transition-all hover:border-border-gold hover:text-gold-400"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open n8n Dashboard
          </a>
          <button className="flex items-center gap-2 rounded-xl bg-gold-gradient px-5 py-2.5 text-[13px] font-bold text-black shadow-[0_0_20px_rgba(201,168,76,0.3)]">
            <Plus className="h-4 w-4" /> New Flow
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="mb-8 grid grid-cols-4 gap-4">
        {[
          { label: "Total Executions",  value: "1,852", icon: Zap },
          { label: "Active Flows",      value: "2",     icon: Play },
          { label: "Avg Success Rate",  value: "92.8%", icon: CheckCircle2 },
          { label: "Last Execution",    value: "2m ago", icon: Clock },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label}
              className="flex items-center gap-4 rounded-2xl border border-border-subtle bg-surface-1/70 px-5 py-4 backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-gold bg-gold-400/10">
                <Icon className="h-4 w-4 text-gold-400" />
              </div>
              <div>
                <p className="text-[20px] font-black text-white">{stat.value}</p>
                <p className="font-mono text-[9.5px] uppercase tracking-wider text-white/30">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-[1fr_340px] gap-6">

        {/* Flow cards */}
        <div className="space-y-3">
          {FLOWS.map((flow, i) => {
            const cfg = STATUS_CONFIG[flow.status as keyof typeof STATUS_CONFIG];
            const isSelected = activeFlow === flow.id;

            return (
              <motion.div
                key={flow.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setActiveFlow(isSelected ? null : flow.id)}
                className={`cursor-pointer overflow-hidden rounded-2xl border transition-all duration-200 ${
                  isSelected
                    ? "border-border-gold bg-gold-400/5"
                    : "border-border-subtle bg-surface-1/70 hover:border-border-gold/50"
                }`}
              >
                <div className="p-5">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-border-gold bg-gold-400/10">
                        <Workflow className="h-4 w-4 text-gold-400" />
                      </div>
                      <div>
                        <h3 className="text-[14px] font-bold text-white">{flow.name}</h3>
                        <p className="mt-0.5 text-[12px] text-white/40">{flow.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-shrink-0 items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider ${cfg.bg} ${cfg.color}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                        {cfg.label}
                      </span>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className={`flex h-7 w-7 items-center justify-center rounded-lg border transition-all ${
                          flow.status === "active"
                            ? "border-border-gold bg-gold-400/10 text-gold-400 hover:bg-gold-400/20"
                            : "border-border-subtle bg-white/5 text-white/30 hover:border-border-gold hover:text-gold-400"
                        }`}
                      >
                        {flow.status === "active"
                          ? <Pause className="h-3 w-3" />
                          : <Play className="h-3 w-3" />
                        }
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {[
                      { label: "Runs",    value: flow.runs.toLocaleString() },
                      { label: "Success", value: `${flow.successRate}%` },
                      { label: "Nodes",   value: String(flow.nodes) },
                      { label: "Trigger", value: flow.trigger },
                      { label: "Last run", value: flow.lastRun },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="font-mono text-[9px] uppercase tracking-wider text-white/25">{label}</p>
                        <p className="mt-0.5 text-[12.5px] font-semibold text-white/70">{value}</p>
                      </div>
                    ))}

                    {/* Success rate bar */}
                    <div className="ml-auto flex-1 max-w-[120px]">
                      <div className="mb-1 flex justify-between">
                        <span className="font-mono text-[9px] text-white/25">Success rate</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full bg-gold-gradient"
                          style={{ width: `${flow.successRate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded node diagram */}
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-border-gold/40 bg-black/20 px-5 py-4"
                  >
                    <p className="mb-3 font-mono text-[9.5px] uppercase tracking-wider text-gold-400/70">
                      // Pipeline nodes
                    </p>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {["Webhook", "Validate", "Fetch URL", "Claude Script", "Render", "Dispatch", "n8n Notify", "Done"].slice(0, flow.nodes).map((node, ni) => (
                        <div key={ni} className="flex items-center gap-2 flex-shrink-0">
                          <div className="rounded-lg border border-border-gold bg-gold-400/8 px-3 py-1.5 font-mono text-[10px] text-gold-300 whitespace-nowrap">
                            {node}
                          </div>
                          {ni < flow.nodes - 1 && <ArrowRight className="h-3 w-3 flex-shrink-0 text-white/20" />}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Execution log */}
        <div className="rounded-2xl border border-border-subtle bg-surface-1/70 p-5 backdrop-blur-xl">
          <h2 className="mb-4 text-[14px] font-bold text-white">Execution Log</h2>
          <div className="space-y-2">
            {EXECUTION_LOG.map((entry, i) => {
              const { icon: Icon, color } = LOG_STATUS[entry.status as keyof typeof LOG_STATUS];
              return (
                <div key={i}
                  className="flex items-start gap-3 rounded-xl border border-transparent p-3 transition-colors hover:border-border-subtle hover:bg-white/[0.03]">
                  <Icon className={`mt-0.5 h-3.5 w-3.5 flex-shrink-0 ${color}`} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-medium text-white/70">{entry.flow}</p>
                    <div className="mt-0.5 flex items-center gap-2">
                      <span className="font-mono text-[9.5px] text-white/25">{entry.time}</span>
                      {entry.duration !== "—" && (
                        <>
                          <span className="text-white/15">·</span>
                          <span className="font-mono text-[9.5px] text-white/25">{entry.duration}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
