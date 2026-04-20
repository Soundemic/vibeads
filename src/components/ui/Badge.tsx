import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BadgeVariant = "gold" | "success" | "error" | "warning" | "muted" | "info";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
  dot?: boolean;
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  gold:    "border-border-gold bg-gold-400/10 text-gold-400",
  success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  error:   "border-red-500/30 bg-red-500/10 text-red-400",
  warning: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  muted:   "border-border-subtle bg-white/[0.04] text-white/30",
  info:    "border-blue-500/30 bg-blue-500/10 text-blue-400",
};

const DOT_STYLES: Record<BadgeVariant, string> = {
  gold:    "bg-gold-400",
  success: "bg-emerald-400",
  error:   "bg-red-400",
  warning: "bg-amber-400",
  muted:   "bg-white/30",
  info:    "bg-blue-400",
};

export function Badge({ children, variant = "muted", className, dot = false }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5",
        "font-mono text-[9.5px] font-semibold uppercase tracking-wider",
        VARIANT_STYLES[variant],
        className,
      )}
    >
      {dot && (
        <span className={cn("h-1.5 w-1.5 rounded-full", DOT_STYLES[variant])} />
      )}
      {children}
    </span>
  );
}
