"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects, type ProjectCategory } from "@/data/projects";

const FILTERS: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "all" },
  { id: "security", label: "security" },
  { id: "web", label: "web" },
  { id: "network", label: "network" },
];

export default function ProjectsExplorer() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  const visible =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-fg-dim">--filter=</span>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-sm border px-3 py-1 text-xs transition-colors ${
              filter === f.id
                ? "border-terminal bg-terminal font-bold text-bg"
                : "border-border text-fg-dim hover:border-border-bright hover:text-terminal"
            }`}
          >
            [{f.label}]
          </button>
        ))}
        <span className="ml-auto text-xs text-fg-dim">
          {visible.length} object{visible.length === 1 ? "" : "s"} found
        </span>
      </div>

      <motion.div layout className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              className="min-w-0"
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
