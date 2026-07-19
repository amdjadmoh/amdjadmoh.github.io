"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useFx } from "./FxProvider";

const SEQ = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

export default function KonamiEasterEgg() {
  const { breach, triggerBreach } = useFx();
  const idx = useRef(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === SEQ[idx.current]) {
        idx.current += 1;
        if (idx.current === SEQ.length) {
          idx.current = 0;
          triggerBreach();
        }
      } else {
        idx.current = k === SEQ[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [triggerBreach]);

  return (
    <AnimatePresence>
      {breach && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[85] pointer-events-none flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-danger/5" />
          <div className="text-center animate-flicker px-4">
            <div
              className="glitch glitch-on text-danger text-3xl sm:text-5xl font-extrabold tracking-widest"
              data-text="!! SYSTEM BREACH !!"
            >
              !! SYSTEM BREACH !!
            </div>
            <div className="mt-4 text-terminal text-xs sm:text-sm">
              konami accepted — root access granted (not really)
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
