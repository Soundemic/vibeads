"use client";

import { useEffect, useRef, useState } from "react";

interface MousePosition {
  x: number;   // -1 to 1
  y: number;   // -1 to 1
  rx: number;  // raw px
  ry: number;  // raw px
}

export function useMouseParallax() {
  const [mouse, setMouse] = useState<MousePosition>({ x: 0, y: 0, rx: 0, ry: 0 });
  const frameRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current = {
        x: (e.clientX / window.innerWidth)  * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };

    // Lerp toward target for smooth trailing effect
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      const cur = currentRef.current;
      const tgt = targetRef.current;

      const nextX = lerp(cur.x, tgt.x, 0.05);
      const nextY = lerp(cur.y, tgt.y, 0.05);

      if (Math.abs(nextX - cur.x) > 0.0005 || Math.abs(nextY - cur.y) > 0.0005) {
        currentRef.current = { x: nextX, y: nextY };
        setMouse({
          x: nextX,
          y: nextY,
          rx: ((nextX + 1) / 2) * window.innerWidth,
          ry: ((nextY + 1) / 2) * window.innerHeight,
        });
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return mouse;
}
