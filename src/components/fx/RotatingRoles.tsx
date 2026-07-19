"use client";

import { useEffect, useState } from "react";

type Props = {
  roles: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  holdMs?: number;
};

export default function RotatingRoles({
  roles,
  className,
  typeSpeed = 60,
  deleteSpeed = 30,
  holdMs = 1700,
}: Props) {
  const [index, setIndex] = useState(0);
  const [len, setLen] = useState(0);
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">(
    "typing"
  );
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const current = roles[index];

  useEffect(() => {
    if (reduced) return;
    let t: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (len < current.length) {
        t = setTimeout(() => setLen((l) => l + 1), typeSpeed);
      } else {
        setPhase("holding");
      }
    } else if (phase === "holding") {
      t = setTimeout(() => setPhase("deleting"), holdMs);
    } else {
      if (len > 0) {
        t = setTimeout(() => setLen((l) => l - 1), deleteSpeed);
      } else {
        setIndex((i) => (i + 1) % roles.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(t);
  }, [phase, len, current, roles.length, typeSpeed, deleteSpeed, holdMs, reduced]);

  return (
    <span className={className}>
      {reduced ? roles[0] : current.slice(0, len)}
      <span className="animate-blink text-terminal" aria-hidden>
        ▊
      </span>
    </span>
  );
}
