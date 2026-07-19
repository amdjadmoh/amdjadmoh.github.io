import Link from "next/link";
import type { WriteupMeta } from "@/lib/writeups";

export default function WriteupRow({ w }: { w: WriteupMeta }) {
  return (
    <Link
      href={`/blog/${w.slug}`}
      className="group block rounded-lg border border-border bg-panel/60 p-4 transition-colors hover:border-border-bright hover:bg-panel sm:p-5"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-fg-dim">
        <span className="text-terminal">-rw-r--r--</span>
        <span>{w.date}</span>
        <span className="rounded-sm border border-border px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-amber">
          {w.platform}
        </span>
        <span className="rounded-sm border border-border px-1.5 py-0.5 text-[10px] uppercase tracking-wider">
          {w.difficulty}
        </span>
      </div>
      <h3 className="mt-2 font-bold text-fg transition-colors group-hover:text-terminal">
        {w.title}
      </h3>
      <p className="mt-1 text-sm text-fg-dim">{w.excerpt}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {w.tags.map((t) => (
          <span key={t} className="text-[10px] text-terminal/70">
            #{t}
          </span>
        ))}
      </div>
    </Link>
  );
}
