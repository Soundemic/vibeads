"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-lg",
        "bg-[linear-gradient(110deg,#13131C_30%,#1A1A26_50%,#13131C_70%)]",
        "[background-size:300%_100%]",
        className
      )}
    />
  );
}

export function VideoCardSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-1"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Skeleton className="aspect-[9/16] w-full rounded-none" />
      <div className="space-y-2 p-3">
        <Skeleton className="h-2.5 w-full" />
        <Skeleton className="h-2 w-3/4" />
        <div className="flex items-center justify-between pt-1">
          <div className="flex gap-3">
            <Skeleton className="h-2 w-10" />
            <Skeleton className="h-2 w-10" />
          </div>
          <Skeleton className="h-5 w-14 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function TemplateSkeleton() {
  return (
    <div className="flex w-[175px] flex-shrink-0 flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-1">
      <Skeleton className="aspect-[9/16] w-full rounded-none" />
      <div className="space-y-2 p-3">
        <Skeleton className="h-2.5 w-3/4" />
        <Skeleton className="h-2 w-1/2" />
      </div>
    </div>
  );
}
