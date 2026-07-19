"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  cursor?: boolean;
  onDone?: () => void;
};

export default function TypeText({
  text,
  speed = 28,
  startDelay = 0,
  className,
  cursor = false,
  onDone,
}: Props) {
  const [len, setLen] = useState(0);
  const [started, setStarted] = useState(false);
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLen(text.length);
      setStarted(true);
      if (!doneRef.current) {
        doneRef.current = true;
        onDoneRef.current?.();
      }
      return;
    }
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay, text]);

  useEffect(() => {
    if (!started) return;
    if (len >= text.length) {
      if (!doneRef.current) {
        doneRef.current = true;
        onDoneRef.current?.();
      }
      return;
    }
    const t = setTimeout(() => setLen((l) => l + 1), speed);
    return () => clearTimeout(t);
  }, [started, len, text.length, speed]);

  return (
    <span className={className}>
      {text.slice(0, len)}
      {cursor && (
        <span className="animate-blink text-terminal" aria-hidden>
          ▊
        </span>
      )}
    </span>
  );
}
