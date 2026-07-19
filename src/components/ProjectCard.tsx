"use client";

import { motion } from "framer-motion";
import { projectUrl, type Project } from "@/data/projects";
import TerminalWindow from "./TerminalWindow";

const displayUrl = (u: string) =>
  u.replace(/^https?:\/\//, "").replace(/\/$/, "");

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group h-full"
    >
      <TerminalWindow
        title={`~/projects/${project.repo}.md`}
        className="h-full transition-colors duration-300 group-hover:border-border-bright group-hover:box-glow"
        bodyClassName="flex h-full flex-col"
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-bold text-terminal">
            <span className="glitch glitch-hover" data-text={project.name}>
              {project.name}
            </span>
          </h3>
          <span className="shrink-0 text-[10px] text-fg-dim">
            {project.year}
          </span>
        </div>
        <p className="mt-3 flex-1 text-sm leading-6 text-fg/90">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-sm border border-border px-1.5 py-0.5 text-[10px] text-fg-dim"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 space-y-1.5 border-t border-border/60 pt-3 text-[11px]">
          <p className="flex items-center justify-between gap-3">
            <span className="shrink-0 text-fg-dim">
              {project.url ? "writeup:" : "repo:"}
            </span>
            <a
              href={projectUrl(project)}
              target="_blank"
              rel="noreferrer"
              className="truncate text-terminal/90 underline-offset-4 hover:underline"
            >
              {displayUrl(projectUrl(project))}
            </a>
          </p>
          {project.live && (
            <p className="flex items-center justify-between gap-3">
              <span className="shrink-0 text-fg-dim">live:</span>
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="truncate text-amber underline-offset-4 hover:underline"
              >
                {displayUrl(project.live)}
              </a>
            </p>
          )}
        </div>
        <div className="mt-3 text-xs">
          <span className="uppercase tracking-widest text-fg-dim/70">
            [{project.category}]
          </span>
        </div>
      </TerminalWindow>
    </motion.div>
  );
}
