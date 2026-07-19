"use client";

import { useEffect, useRef } from "react";
import { useFx } from "./FxProvider";

const CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789<>/\\{}[]$#@*+-=;:";

export default function MatrixRain() {
  const { matrix, breach } = useFx();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!matrix) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fontSize = 14;
    let raf = 0;
    let last = 0;
    let columns = 0;
    let drops: number[] = [];
    let speeds: number[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.ceil(window.innerWidth / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -100);
      speeds = Array.from({ length: columns }, () => 0.4 + Math.random() * 0.9);
    };

    resize();
    window.addEventListener("resize", resize);

    const color = breach ? "#ff3355" : "#00ff41";
    const speedMul = breach ? 2.4 : 1;
    const interval = breach ? 33 : 70;

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < interval) return;
      last = t;

      ctx.fillStyle = "rgba(5, 8, 5, 0.14)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.font = `${fontSize}px monospace`;
      ctx.fillStyle = color;

      for (let i = 0; i < columns; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        drops[i] += speeds[i] * speedMul;
        if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.976) {
          drops[i] = 0;
        }
      }
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [matrix, breach]);

  if (!matrix) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-700 ${
        breach ? "opacity-30" : "opacity-[0.13]"
      }`}
    />
  );
}
