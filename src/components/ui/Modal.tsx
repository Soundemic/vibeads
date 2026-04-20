"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}

const SIZE_MAP = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

export function Modal({ open, onClose, title, description, children, size = "md" }: ModalProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogPrimitive.Portal>
        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop */}
              <DialogPrimitive.Overlay asChild>
                <motion.div
                  key="overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
                />
              </DialogPrimitive.Overlay>

              {/* Content */}
              <DialogPrimitive.Content asChild>
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, scale: 0.94, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 8 }}
                    transition={{ duration: 0.3, ease: [0.34, 1.1, 0.64, 1] }}
                    className={cn(
                      "relative w-full overflow-hidden rounded-2xl",
                      "border border-border-gold",
                      "bg-surface-1/95 backdrop-blur-2xl",
                      "shadow-card",
                      SIZE_MAP[size],
                    )}
                  >
                    {/* Gold border pseudo */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-2xl"
                      style={{
                        padding: "1px",
                        background: "linear-gradient(135deg, #C9A84C 0%, rgba(201,168,76,0.2) 50%, #F0D080 100%)",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                    />

                    {/* Header */}
                    {(title || description) && (
                      <div className="border-b border-border-subtle px-6 py-5">
                        {title && (
                          <DialogPrimitive.Title className="text-[16px] font-bold text-white">
                            {title}
                          </DialogPrimitive.Title>
                        )}
                        {description && (
                          <DialogPrimitive.Description className="mt-1 text-[13px] text-white/40">
                            {description}
                          </DialogPrimitive.Description>
                        )}
                      </div>
                    )}

                    {/* Body */}
                    <div className="p-6">{children}</div>

                    {/* Close */}
                    <DialogPrimitive.Close asChild>
                      <button
                        className={cn(
                          "absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-lg",
                          "border border-border-subtle bg-white/[0.04] text-white/30",
                          "transition-all hover:border-border-gold hover:text-gold-400",
                        )}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </DialogPrimitive.Close>
                  </motion.div>
                </div>
              </DialogPrimitive.Content>
            </>
          )}
        </AnimatePresence>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
