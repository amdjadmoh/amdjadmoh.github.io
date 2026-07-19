"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import TypeText from "./TypeText";
import { prompt } from "@/data/site";

declare global {
  interface Window {
    __amdjadReady?: boolean;
    __amdjadPlayed?: boolean;
  }
}

const TASKS = [
  "loading kernel modules",
  "mounting /dev/projects",
  "decrypting writeups",
  "starting devops daemon",
  "compiling the arsenal",
  "establishing encrypted tunnel",
];

export default function BootSequence() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [cmdTyped, setCmdTyped] = useState(false);
  const [progress, setProgress] = useState(0);
  const [granted, setGranted] = useState(false);
  const finishedRef = useRef(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    window.__amdjadPlayed = true;
    window.__amdjadReady = true;
    window.dispatchEvent(new Event("amdjad:ready"));
    setShow(false);
  }, []);

  // play on fresh site entry only — window flags reset on full page load,
  // so client-side navigation back to home skips the loader.
  useEffect(() => {
    setMounted(true);
    if (window.__amdjadPlayed) {
      finish();
      return;
    }
    window.__amdjadReady = false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    setShow(true);
  }, [finish]);

  // progress ticker
  useEffect(() => {
    if (!show || !cmdTyped) return;
    if (progress >= 100) {
      setGranted(true);
      return;
    }
    const t = setTimeout(() => {
      setProgress((p) => Math.min(100, p + Math.ceil(Math.random() * 3)));
    }, 36);
    return () => clearTimeout(t);
  }, [show, cmdTyped, progress]);

  // hold on ACCESS GRANTED, then enter automatically
  useEffect(() => {
    if (!granted) return;
    const t = setTimeout(finish, 850);
    return () => clearTimeout(t);
  }, [granted, finish]);

  // skip on any key
  useEffect(() => {
    if (!show) return;
    const skip = () => finish();
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, [show, finish]);

  if (!mounted) return null;

  const task =
    TASKS[
      Math.min(TASKS.length - 1, Math.floor((progress / 100) * TASKS.length))
    ];

  // portal to <body>: escapes the page-transition's filter/transform
  // containing block so `fixed` really means "the viewport".
  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex cursor-pointer select-none flex-col items-center justify-center bg-bg p-6"
          onClick={finish}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full max-w-3xl text-center">
            <p className="text-left text-sm text-fg-dim sm:text-base">
              <span className="text-terminal">{prompt}:~$ </span>
              <TypeText
                text="./init_portfolio.sh"
                speed={55}
                cursor
                onDone={() => setCmdTyped(true)}
                className="text-terminal"
              />
            </p>

            <div className="mt-10 sm:mt-14">
              {granted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-4xl font-extrabold tracking-widest text-amber sm:text-6xl"
                >
                  ACCESS GRANTED
                </motion.div>
              ) : (
                <div className="text-7xl font-extrabold text-terminal text-glow sm:text-9xl">
                  {progress}
                  <span className="align-top text-3xl sm:text-5xl">%</span>
                </div>
              )}
            </div>

            {/* responsive bar — scales to any screen width */}
            <div
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              className="mx-auto mt-8 h-3 w-full max-w-xl border border-border bg-terminal-dark/30 sm:mt-10"
            >
              <div
                className="h-full bg-terminal shadow-[0_0_14px_rgba(0,255,65,0.6)] transition-[width] duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-6 h-5 text-xs text-fg-dim sm:text-sm">
              {cmdTyped && !granted && (
                <>
                  [ ok ] {task}...
                  <span className="animate-blink text-terminal">▊</span>
                </>
              )}
            </p>

            <p className="mt-10 text-[10px] uppercase tracking-[0.3em] text-fg-dim/50">
              tap or press any key to skip
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
