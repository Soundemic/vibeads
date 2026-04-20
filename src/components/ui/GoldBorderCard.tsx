"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GoldBorderCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  borderIntensity?: "subtle" | "default" | "strong";
  animate?: boolean;
}

const BORDER_GRADIENTS = {
  subtle:  "linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.08), rgba(201,168,76,0.2))",
  default: "linear-gradient(135deg, #C9A84C 0%, rgba(201,168,76,0.2) 40%, #F0D080 70%, rgba(201,168,76,0.15) 100%)",
  strong:  "linear-gradient(135deg, #F0D080 0%, #C9A84C 35%, rgba(201,168,76,0.4) 65%, #F0D080 100%)",
};

export function GoldBorderCard({
  children,
  className,
  hoverEffect = true,
  borderIntensity = "default",
  animate = false,
}: GoldBorderCardProps) {
  const Wrapper = animate ? motion.div : "div";

  return (
    <Wrapper
      className={cn(
        "relative rounded-2xl",
        hoverEffect && "transition-shadow duration-300",
        className
      )}
      {...(animate && {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit:    { opacity: 0, y: -8 },
        transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
      })}
    >
      {/* Gradient border via pseudo-layer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          padding: "1px",
          background: BORDER_GRADIENTS[borderIntensity],
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Glass background */}
      <div
        className={cn(
          "relative h-full w-full overflow-hidden rounded-2xl",
          "bg-surface-1/80 backdrop-blur-2xl",
        )}
      >
        {children}
      </div>
    </Wrapper>
  );
}
