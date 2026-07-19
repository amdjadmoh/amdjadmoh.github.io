"use client";

import { motion } from "framer-motion";

type Props = {
  name: string;
  level: number;
  index: number;
};

export default function SkillBar({ name, level, index }: Props) {
  return (
    <div className="group">
      <div className="flex items-center justify-between text-xs sm:text-sm">
        <span className="text-fg transition-colors group-hover:text-terminal">
          {name}
        </span>
        <span className="text-fg-dim">{level}%</span>
      </div>
      <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-sm bg-terminal-dark/40">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.9,
            delay: index * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-full bg-terminal shadow-[0_0_10px_rgba(0,255,65,0.5)]"
        />
      </div>
    </div>
  );
}
