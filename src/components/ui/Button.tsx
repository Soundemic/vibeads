"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

const buttonVariants = cva(
  // Base
  [
    "inline-flex items-center justify-center gap-2 font-semibold",
    "transition-all duration-200 select-none outline-none",
    "focus-visible:ring-2 focus-visible:ring-gold-400/50",
    "disabled:pointer-events-none disabled:opacity-40",
  ],
  {
    variants: {
      variant: {
        gold: [
          "bg-gold-gradient text-black shadow-gold-glow",
          "hover:shadow-gold-glow-lg hover:brightness-105",
          "active:scale-[0.97]",
        ],
        ghost: [
          "border border-border-subtle bg-transparent text-white/50",
          "hover:border-border-gold hover:text-gold-400",
          "active:scale-[0.97]",
        ],
        glass: [
          "border border-border-subtle bg-white/[0.04] text-white/60",
          "backdrop-blur-sm",
          "hover:bg-white/[0.08] hover:text-white",
          "active:scale-[0.97]",
        ],
        danger: [
          "border border-red-500/30 bg-red-500/10 text-red-400",
          "hover:bg-red-500/20 hover:text-red-300",
        ],
      },
      size: {
        sm:  "h-7  rounded-lg  px-3   text-[11.5px]",
        md:  "h-9  rounded-xl  px-4   text-[12.5px]",
        lg:  "h-11 rounded-xl  px-6   text-[13.5px]",
        xl:  "h-12 rounded-2xl px-8   text-[14px]",
        icon: "h-8  rounded-xl  w-8",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size:    "md",
    },
  }
);

interface ButtonProps
  extends ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
        whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...(props as ComponentPropsWithoutRef<typeof motion.button>)}
      >
        {loading ? (
          <svg
            className="h-3.5 w-3.5 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
        ) : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export { buttonVariants };
