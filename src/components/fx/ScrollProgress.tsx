"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 inset-x-0 h-[3px] origin-left bg-terminal z-[60] shadow-[0_0_12px_rgba(0,255,65,0.7)]"
    />
  );
}
