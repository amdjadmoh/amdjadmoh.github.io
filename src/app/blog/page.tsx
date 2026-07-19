import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/fx/Reveal";
import WriteupRow from "@/components/WriteupRow";
import { getAllWriteups } from "@/lib/writeups";

export const metadata: Metadata = {
  title: "blog",
  description:
    "CTF writeups, lab notes and build logs — everything broken or built gets documented.",
};

export default function BlogPage() {
  const writeups = getAllWriteups();

  return (
    <div className="mx-auto max-w-4xl px-4 pt-28 pb-20 sm:px-6">
      <PageHeader
        command="ls -lt /var/log/writeups/"
        title="writeups & notes"
        description="CTF walkthroughs, lab notes and dev logs. Documenting is how I make sure the lesson sticks."
      />
      <div className="grid gap-4">
        {writeups.map((w, i) => (
          <Reveal key={w.slug} delay={i * 0.07}>
            <WriteupRow w={w} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
