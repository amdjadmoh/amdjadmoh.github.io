"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function HeroEntrance({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="[&>*]:will-change-transform"
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={item}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
