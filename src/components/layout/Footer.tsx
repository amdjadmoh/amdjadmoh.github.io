import { prompt, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-bg-alt/60">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="text-sm">
          <p>
            <span className="text-fg-dim">{prompt}:~$</span>{" "}
            <span className="text-terminal">exit</span>
          </p>
          <p className="mt-1 text-fg-dim">logout</p>
          <p className="text-fg-dim">Connection to portfolio closed.</p>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-fg-dim">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {site.socials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target={s.url.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="transition-colors hover:text-terminal"
              >
                [{s.label.toLowerCase()}]
              </a>
            ))}
          </div>
          <p>
            © {new Date().getFullYear()} {site.name} — built with next.js &
            caffeine
          </p>
        </div>
      </div>
    </footer>
  );
}
