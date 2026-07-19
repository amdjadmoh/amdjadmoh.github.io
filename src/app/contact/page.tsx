import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import TerminalWindow from "@/components/TerminalWindow";
import Reveal from "@/components/fx/Reveal";
import ContactForm from "@/components/ContactForm";
import CopyEmailButton from "@/components/CopyEmailButton";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "contact",
  description:
    "Get in touch — internships, CTF teams, collabs or just a good security conversation.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-20 sm:px-6">
      <PageHeader
        command="./contact.sh --interactive"
        title="contact"
        description="Internships, CTF teams, collabs, or just a good security conversation — my inbox is open."
      />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <TerminalWindow title={`mail -s "hello" ${site.email}`}>
            <ContactForm />
          </TerminalWindow>
        </Reveal>

        <Reveal delay={0.1}>
          <TerminalWindow title="$ cat /etc/socials.conf" className="h-full">
            <div className="space-y-3">
              {site.socials.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target={s.url.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-sm border border-border px-3 py-2.5 text-sm transition-colors hover:border-border-bright hover:bg-terminal/5"
                >
                  <span className="text-fg-dim transition-colors group-hover:text-terminal">
                    {s.label.toLowerCase()}:
                  </span>
                  <span className="truncate pl-3 text-fg transition-colors group-hover:text-terminal">
                    {s.handle} <span className="text-terminal">→</span>
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-6">
              <CopyEmailButton />
            </div>
            <p className="mt-5 text-[11px] leading-5 text-fg-dim">
              avg response time: &lt; 24h — faster if the subject contains
              &quot;ctf&quot; or &quot;internship&quot;.
            </p>
          </TerminalWindow>
        </Reveal>
      </div>
    </div>
  );
}
