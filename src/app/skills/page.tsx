import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import TerminalWindow from "@/components/TerminalWindow";
import SkillBar from "@/components/SkillBar";
import Reveal from "@/components/fx/Reveal";
import { skillGroups } from "@/data/skills";

export const metadata: Metadata = {
  title: "skills",
  description:
    "The arsenal — offensive & defensive security tools, development stack and networking skills.",
};

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-20 sm:px-6">
      <PageHeader
        command="apt list --installed"
        title="the arsenal"
        description="Everything currently installed in my head. Levels are honest, self-assessed, and constantly being upgraded."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {skillGroups.map((g, gi) => (
          <Reveal
            key={g.id}
            delay={gi * 0.1}
            className={
              skillGroups.length % 2 === 1 && gi === skillGroups.length - 1
                ? "lg:col-span-2"
                : ""
            }
          >
            <TerminalWindow title={`$ ${g.command}`} className="h-full">
              <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-amber">
                {g.title}
              </h3>
              <div className="space-y-4">
                {g.skills.map((s, i) => (
                  <SkillBar
                    key={s.name}
                    name={s.name}
                    level={s.level}
                    index={i}
                  />
                ))}
              </div>
            </TerminalWindow>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8">
        <p className="text-xs text-fg-dim">
          {"// note: the progress bar never reaches 100% — that's the point."}
        </p>
      </Reveal>
    </div>
  );
}
