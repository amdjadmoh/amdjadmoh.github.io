"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { prompt } from "@/data/site";
import { useFx } from "../fx/FxProvider";

const LINKS = [
  { href: "/", label: "~/" },
  { href: "/about", label: "~/about" },
  { href: "/projects", label: "~/projects" },
  { href: "/skills", label: "~/skills" },
  { href: "/blog", label: "~/blog" },
  { href: "/contact", label: "~/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { setPaletteOpen } = useFx();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-bg/85 backdrop-blur-md border-b border-border"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href="/"
            className="flex min-w-0 shrink-0 items-center gap-1.5 text-sm text-terminal text-glow-soft"
          >
            <span className="animate-blink">▊</span>
            <span className="truncate">{prompt}</span>
            <span className="hidden text-fg-dim min-[420px]:inline">:~$</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-sm border px-2.5 py-1 text-xs transition-colors ${
                  isActive(l.href)
                    ? "border-terminal bg-terminal font-bold text-bg"
                    : "border-transparent text-fg-dim hover:border-border hover:text-terminal"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden items-center gap-1.5 rounded-sm border border-border px-2 py-1 text-[11px] text-fg-dim transition-colors hover:border-border-bright hover:text-terminal sm:flex"
            >
              <span>ctrl</span>
              <span className="text-terminal">+</span>
              <span>K</span>
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="toggle menu"
              className="flex h-8 w-8 items-center justify-center rounded-sm border border-border text-terminal md:hidden"
            >
              {open ? "✕" : "≡"}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-md md:hidden"
          >
            <nav className="flex h-full flex-col items-start justify-center gap-5 px-10">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={l.href}
                    className={`text-2xl font-bold transition-colors ${
                      isActive(l.href)
                        ? "text-terminal text-glow"
                        : "text-fg-dim hover:text-terminal"
                    }`}
                  >
                    <span className="mr-2 text-terminal">
                      {isActive(l.href) ? "►" : "›"}
                    </span>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                onClick={() => {
                  setOpen(false);
                  setPaletteOpen(true);
                }}
                className="mt-6 rounded-sm border border-border px-3 py-1.5 text-sm text-fg-dim"
              >
                open command palette [ctrl+K]
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
