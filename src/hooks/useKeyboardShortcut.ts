"use client";

import { useEffect, useRef } from "react";

type ModifierKey = "ctrl" | "meta" | "shift" | "alt";

interface ShortcutOptions {
  key: string;
  modifiers?: ModifierKey[];
  onTrigger: () => void;
  enabled?: boolean;
}

export function useKeyboardShortcut({
  key,
  modifiers = [],
  onTrigger,
  enabled = true,
}: ShortcutOptions) {
  const onTriggerRef = useRef(onTrigger);
  onTriggerRef.current = onTrigger;

  useEffect(() => {
    if (!enabled) return;

    const handler = (e: KeyboardEvent) => {
      const ctrl  = modifiers.includes("ctrl")  ? e.ctrlKey  : !e.ctrlKey;
      const meta  = modifiers.includes("meta")  ? e.metaKey  : !e.metaKey;
      const shift = modifiers.includes("shift") ? e.shiftKey : !e.shiftKey;
      const alt   = modifiers.includes("alt")   ? e.altKey   : !e.altKey;

      // Allow ctrl OR meta for cross-platform cmd/ctrl combos
      const cmdOrCtrl = modifiers.includes("ctrl") || modifiers.includes("meta")
        ? e.ctrlKey || e.metaKey
        : true;

      const allModifiers = modifiers.length === 0
        ? (!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey)
        : cmdOrCtrl && (modifiers.includes("shift") ? e.shiftKey : !e.shiftKey);

      if (e.key.toLowerCase() === key.toLowerCase() && allModifiers) {
        e.preventDefault();
        onTriggerRef.current();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [key, modifiers, enabled]);
}
