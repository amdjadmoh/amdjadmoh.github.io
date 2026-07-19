import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import TerminalWindow from "@/components/TerminalWindow";
import Reveal from "@/components/fx/Reveal";
import Counter from "@/components/Counter";
import { site } from "@/data/site";
import { timeline } from "@/data/timeline";

export const metadata: Metadata = {
  title: "about",
  description:
    "whoami --verbose — Mohamed Amdjad Mehdi, developer and cybersecurity student at ESI-SBA.",
};

const FACTS: [string, string][] = [
  ["location", site.location],
  ["education", site.school],
  ["focus", "offensive security + full-stack dev"],
  ["tryhackme", "[4MJ4D]"],
  ["hackthebox", "[amdjadmoh]"],
  ["status", "open to internships "],
];

const STATS: { label: string; value: number; suffix: string }[] = [
  { label: "public repos", value: 23, suffix: "+" },
  { label: "ctf challenges authored", value: 2, suffix: "" },
  { label: "ctf platforms", value: 2, suffix: "" },
  { label: "cups of coffee", value: 9999, suffix: "+" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-20 sm:px-6">
      <PageHeader
        command="whoami --verbose"
        title="about"
        description="Developer by craft, security student by obsession. The longer version of the answer to 'so, what do you do?'"
      />

      {/* ID card + bio */}
      <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
        <Reveal>
          <TerminalWindow title="id_card.dat" className="h-full">
            <div className="flex flex-col items-center text-center">
              <Image
                src={site.avatar}
                alt={site.name}
                width={128}
                height={128}
                className="rounded-lg border border-terminal box-glow"
              />
              <h2 className="mt-4 text-lg font-bold text-terminal text-glow-soft">
                {site.name}
              </h2>
              <p className="text-xs text-fg-dim">uid=1337({site.handle})</p>
            </div>
            <dl className="mt-6 space-y-2.5 text-xs sm:text-sm">
              {FACTS.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <dt className="shrink-0 text-fg-dim">{k}:</dt>
                  <dd className="text-right text-fg">{v}</dd>
                </div>
              ))}
            </dl>
          </TerminalWindow>
        </Reveal>

        <Reveal delay={0.1}>
          <TerminalWindow title="$ cat README.md" className="h-full">
            <div className="space-y-4 text-sm leading-7 text-fg/90">
              <p>
                <span className="text-terminal">&gt;</span> I&apos;m Amdjad — a
                computer science student at{" "}
                <span className="text-terminal">ESI-SBA</span> (Sidi Bel Abbès,
                Algeria) who fell in love with two things that feed each other:{" "}
                <span className="text-amber">building software</span> and{" "}
                <span className="text-amber">breaking it</span>.
              </p>
              <p>
                <span className="text-terminal">&gt;</span> On the dev side I
                ship full-stack apps , APIs, dashboards, tools people actually
                use. On the security side I grind CTFs on TryHackMe and
                HackTheBox, write up every box I own, and author challenges of
                my own 
              </p>
              
              <p className="text-fg-dim">
                <span className="text-terminal">&gt;</span> currently:
                coursework by day, labs & writeups by night. looking for
                internships where breaking things is a feature, not a bug.
              </p>
            </div>
          </TerminalWindow>
        </Reveal>
      </div>

      {/* stats */}
      <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="rounded-lg border border-border bg-panel/60 p-5 text-center transition-colors hover:border-border-bright">
              <div className="text-2xl font-extrabold text-terminal text-glow-soft sm:text-3xl">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-widest text-fg-dim">
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* timeline */}
      <div className="mt-16">
        <Reveal>
          <h2 className="text-2xl font-bold text-fg sm:text-3xl">
            <span className="text-terminal">#</span> journey.log
          </h2>
          <p className="mt-2 text-sm text-fg-dim">
            <span className="text-terminal">$</span> cat /var/log/journey.log
          </p>
        </Reveal>
        <div className="relative mt-8 ml-2 space-y-10 border-l border-border pl-6">
          {timeline.map((t, i) => (
            <Reveal key={t.year + t.title} delay={i * 0.05}>
              <div className="relative">
                <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-terminal shadow-[0_0_10px_rgba(0,255,65,0.8)]" />
                <span className="rounded-sm border border-border px-1.5 py-0.5 text-xs text-amber">
                  {t.year}
                </span>
                <h3 className="mt-2 font-bold text-terminal">{t.title}</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-fg-dim">
                  {t.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* goals */}
      <Reveal className="mt-16">
        <TerminalWindow title="$ sudo cat /etc/goals" className="mx-auto max-w-3xl">
          <p className="text-sm leading-7 text-fg/90">
            [sudo] password for amdjad:{" "}
            <span className="text-fg-dim">********</span>
            <br />
            Become the developer who thinks like an attacker , and the security
            engineer who can actually ship. 
          </p>
        </TerminalWindow>
      </Reveal>
    </div>
  );
}
