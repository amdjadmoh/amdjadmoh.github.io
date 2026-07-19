"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TypeText from "./TypeText";
import { prompt } from "@/data/site";

declare global {
  interface Window {
    __amdjadReady?: boolean;
  }
}

const STEPS = [
  { cmd: "whoami", out: "mohamed amdjad mehdi", outClass: "text-fg" },
  {
    cmd: "cat interests.txt",
    out: "security · code · networks · devops · cloud · caffeine",
    outClass: "text-fg",
  },
];

export default function HeroTerminal() {
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(true);

  // wait for the init loader to finish (it runs on every home visit)
  useEffect(() => {
    if (window.__amdjadReady) {
      setReady(true);
      return;
    }
    const onReady = () => setReady(true);
    window.addEventListener("amdjad:ready", onReady);
    return () => window.removeEventListener("amdjad:ready", onReady);
  }, []);

  useEffect(() => {
    if (!typing && step < STEPS.length - 1) {
      const t = setTimeout(() => {
        setStep((s) => s + 1);
        setTyping(true);
      }, 380);
      return () => clearTimeout(t);
    }
  }, [typing, step]);

  if (!ready) return <div className="min-h-[7rem]" aria-hidden />;

  return (
    <div className="text-sm leading-7 sm:text-base">
      {STEPS.map((s, i) => {
        if (i > step) return null;
        const isCurrent = i === step;
        return (
          <div key={s.cmd}>
            <div>
              <span className="text-fg-dim">{prompt}:~$ </span>
              {isCurrent && typing ? (
                <TypeText
                  text={s.cmd}
                  speed={42}
                  cursor
                  onDone={() => setTyping(false)}
                  className="text-terminal"
                />
              ) : (
                <span className="text-terminal">{s.cmd}</span>
              )}
            </div>
            {(!isCurrent || !typing) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={s.outClass}
              >
                {s.out}
              </motion.div>
            )}
          </div>
        );
      })}
      {!typing && step === STEPS.length - 1 && (
        <div>
          <span className="text-fg-dim">{prompt}:~$ </span>
          <span className="animate-blink text-terminal">▊</span>
        </div>
      )}
    </div>
  );
}
