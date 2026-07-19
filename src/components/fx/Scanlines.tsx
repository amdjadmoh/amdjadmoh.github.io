"use client";

import { useFx } from "./FxProvider";

export default function Scanlines() {
  const { scanlines } = useFx();
  if (!scanlines) return null;

  return (
    <div aria-hidden className="fixed inset-0 z-40 pointer-events-none">
      <div className="absolute inset-0 scanlines-overlay opacity-60" />
      <div className="absolute inset-0 vignette-overlay" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="scan-bar animate-scan-drift" />
      </div>
    </div>
  );
}
