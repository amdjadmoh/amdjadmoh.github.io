import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[85vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
      <p className="text-xs uppercase tracking-[0.35em] text-fg-dim">
        error 0x194
      </p>
      <h1 className="mt-4 text-4xl font-extrabold sm:text-7xl">
        <span
          className="glitch glitch-on text-danger"
          data-text="ACCESS DENIED"
        >
          ACCESS DENIED
        </span>
      </h1>
      <p className="mt-6 text-sm leading-7 text-fg-dim">
        the page you requested does not exist on this server.
        <br />
        this incident has been logged. (not really.)
      </p>
      <Link
        href="/"
        className="mt-9 rounded-sm border border-terminal px-6 py-2.5 text-sm text-terminal transition-all hover:bg-terminal hover:text-bg hover:box-glow"
      >
        $ cd ~/
      </Link>
      <p className="mt-5 text-[11px] text-fg-dim/60">
        tip: press <span className="text-terminal">ctrl+k</span> to navigate
        like a pro
      </p>
    </div>
  );
}
