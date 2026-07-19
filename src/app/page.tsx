import Link from "next/link";
import BootSequence from "@/components/fx/BootSequence";
import HeroTerminal from "@/components/fx/HeroTerminal";
import RotatingRoles from "@/components/fx/RotatingRoles";
import Reveal from "@/components/fx/Reveal";
import TerminalWindow from "@/components/TerminalWindow";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import HeroEntrance from "@/components/fx/HeroEntrance";
import { site } from "@/data/site";
import { projects } from "@/data/projects";

const EXPLORE = [
  { href: "/about", name: "about/", desc: "who i am" },
  { href: "/skills", name: "skills/", desc: "the arsenal" },
  { href: "/blog", name: "blog/", desc: "writeups & notes" },
];

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <BootSequence />

      {/* ================= HERO ================= */}
      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 pt-20 sm:px-6">
        <HeroEntrance>
          <TerminalWindow
            title="amdjad@portfolio: ~"
            className="max-w-2xl box-glow"
          >
            <HeroTerminal />
          </TerminalWindow>

          <h1 className="group mt-10 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            <span
              className="glitch glitch-hover text-terminal text-glow"
              data-text={site.name}
            >
              {site.name}
            </span>
          </h1>

          <p className="mt-5 text-lg sm:text-xl">
            <span className="text-fg-dim">&gt; </span>
            <RotatingRoles roles={[...site.roles]} className="text-fg" />
          </p>

          <p className="mt-4 max-w-xl text-sm text-fg-dim sm:text-base">
            {site.tagline} Engineering student @ {site.school}. I build software
            and study how to break it — so I can build it better.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="rounded-sm border border-terminal px-5 py-2.5 text-sm text-terminal transition-all hover:bg-terminal hover:text-bg hover:box-glow"
            >
              [ cd ~/projects ]
            </Link>
            <Link
              href="/contact"
              className="rounded-sm border border-border px-5 py-2.5 text-sm text-fg-dim transition-all hover:border-border-bright hover:text-terminal"
            >
              [ cat contact.txt ]
            </Link>
          </div>
        </HeroEntrance>

        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-fg-dim">
          <div className="animate-bounce">▼ scroll --down</div>
        </div>
      </section>

      {/* ================= FEATURED PROJECTS ================= */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <SectionHeading
            command="ls -la ~/projects | grep featured"
            title="featured builds"
          />
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15} className="mt-8">
          <Link
            href="/projects"
            className="text-sm text-terminal underline-offset-4 hover:underline"
          >
            $ cd ~/projects — view all ({projects.length}) →
          </Link>
        </Reveal>
      </section>

      {/* ================= EXPLORE ================= */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Reveal>
          <TerminalWindow title="amdjad@portfolio: ~" className="mx-auto max-w-3xl">
            <p className="text-sm text-fg-dim">
              <span className="text-terminal">amdjad@portfolio:~$</span> ls -l ~/
            </p>
            <div className="mt-3 divide-y divide-border/60">
              {EXPLORE.map((e) => (
                <Link
                  key={e.href}
                  href={e.href}
                  className="group flex items-center justify-between py-3 text-sm"
                >
                  <span>
                    <span className="text-fg-dim">drwxr-xr-x </span>
                    <span className="font-bold text-terminal transition-all group-hover:text-glow">
                      {e.name}
                    </span>
                  </span>
                  <span className="text-xs text-fg-dim transition-colors group-hover:text-fg">
                    {e.desc} <span className="text-terminal">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </TerminalWindow>
        </Reveal>
      </section>

      {/* ================= CONTACT CTA ================= */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <TerminalWindow
            title="amdjad@portfolio: ~/contact"
            className="mx-auto max-w-3xl text-center"
            bodyClassName="py-10"
          >
            <p className="text-sm text-fg-dim">
              <span className="text-terminal">$</span> mail -s &quot;let&apos;s
              build something&quot;
            </p>
            <p className="mt-4 break-all text-xl font-bold text-terminal text-glow sm:text-2xl">
              {site.email}
            </p>
            <p className="mt-4 text-sm text-fg-dim">
              open to internships, ctf teams, collabs & interesting problems.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-block rounded-sm border border-terminal px-6 py-2.5 text-sm text-terminal transition-all hover:bg-terminal hover:text-bg hover:box-glow"
            >
              [ ./contact.sh ]
            </Link>
          </TerminalWindow>
        </Reveal>
      </section>
    </>
  );
}
