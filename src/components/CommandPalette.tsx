"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useFx } from "./fx/FxProvider";
import { site } from "@/data/site";

type Cmd = { id: string; label: string; hint: string; run: () => void };

export default function CommandPalette() {
  const router = useRouter();
  const {
    paletteOpen,
    setPaletteOpen,
    scanlines,
    matrix,
    toggleScanlines,
    toggleMatrix,
    triggerBreach,
  } = useFx();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const close = () => setPaletteOpen(false);

  const commands: Cmd[] = useMemo(
    () => [
      { id: "home", label: "cd ~/", hint: "home", run: () => router.push("/") },
      {
        id: "about",
        label: "cd ~/about",
        hint: "who i am",
        run: () => router.push("/about"),
      },
      {
        id: "projects",
        label: "cd ~/projects",
        hint: "things i built",
        run: () => router.push("/projects"),
      },
      {
        id: "skills",
        label: "cd ~/skills",
        hint: "the arsenal",
        run: () => router.push("/skills"),
      },
      {
        id: "blog",
        label: "cd ~/blog",
        hint: "writeups & notes",
        run: () => router.push("/blog"),
      },
      {
        id: "contact",
        label: "cd ~/contact",
        hint: "reach me",
        run: () => router.push("/contact"),
      },
      {
        id: "scan",
        label: `${scanlines ? "disable" : "enable"} scanlines`,
        hint: "crt fx",
        run: toggleScanlines,
      },
      {
        id: "matrix",
        label: `${matrix ? "disable" : "enable"} matrix rain`,
        hint: "background fx",
        run: toggleMatrix,
      },
      {
        id: "breach",
        label: "initiate fake breach",
        hint: "just for fun",
        run: triggerBreach,
      },
      {
        id: "email",
        label: "copy email address",
        hint: site.email,
        run: () => {
          navigator.clipboard?.writeText(site.email).catch(() => {});
        },
      },
      {
        id: "github",
        label: "open github profile",
        hint: "github.com/amdjadmoh",
        run: () => window.open("https://github.com/amdjadmoh", "_blank"),
      },
    ],
    [router, scanlines, matrix, toggleScanlines, toggleMatrix, triggerBreach]
  );

  const filtered = useMemo(
    () =>
      commands.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase())
      ),
    [commands, query]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(!paletteOpen);
      } else if (e.key === "Escape" && paletteOpen) {
        setPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen, setPaletteOpen]);

  useEffect(() => {
    if (paletteOpen) {
      setQuery("");
      setSelected(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [paletteOpen]);

  useEffect(() => setSelected(0), [query]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-idx="${selected}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[selected];
      if (cmd) {
        close();
        cmd.run();
      }
    }
  };

  return (
    <AnimatePresence>
      {paletteOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-bg/80 backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="mx-auto mt-[14vh] w-[min(92vw,36rem)] rounded-lg border border-border-bright bg-panel box-glow overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between border-b border-border px-4 py-2 text-[11px] text-fg-dim">
              <span>amdjad@portfolio — command palette</span>
              <span>[esc] to close</span>
            </div>
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="text-terminal">►</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="type a command..."
                spellCheck={false}
                className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-fg-dim/50"
              />
            </div>
            <div ref={listRef} className="max-h-72 overflow-y-auto py-1">
              {filtered.length === 0 && (
                <div className="px-4 py-3 text-sm text-fg-dim">
                  bash: {query}: command not found
                </div>
              )}
              {filtered.map((cmd, i) => (
                <button
                  key={cmd.id}
                  data-idx={i}
                  onClick={() => {
                    close();
                    cmd.run();
                  }}
                  onMouseEnter={() => setSelected(i)}
                  className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition-colors ${
                    i === selected
                      ? "bg-terminal/10 text-terminal"
                      : "text-fg"
                  }`}
                >
                  <span>
                    {i === selected ? "▸ " : "\u00a0\u00a0"}
                    {cmd.label}
                  </span>
                  <span className="text-xs text-fg-dim">{cmd.hint}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
