"use client";

import { useState } from "react";
import { site } from "@/data/site";

export default function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <button
      onClick={copy}
      className={`w-full rounded-sm border px-4 py-2 text-xs transition-colors ${
        copied
          ? "border-terminal bg-terminal font-bold text-bg"
          : "border-border text-fg-dim hover:border-border-bright hover:text-terminal"
      }`}
    >
      {copied ? "[ ✓ copied to clipboard ]" : "[ copy email address ]"}
    </button>
  );
}
