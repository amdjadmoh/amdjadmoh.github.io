// ============================================================
//  timeline.ts — the journey log shown on /about.
// ============================================================

export type TimelineEntry = {
  year: string;
  title: string;
  text: string;
};

export const timeline: TimelineEntry[] = [
  {
    year: "2023",
    title: "Enrolled at ESI-SBA",
    text: "Started my computer science degree at the École Supérieure en Informatique de Sidi Bel Abbès. First real dives into programming, networks and systems.",
  },
  {
    year: "2024",
    title: "Full-stack beginnings",
    text: "Built my first real-world web apps in JavaScript . Learned how APIs and databases actually behave in production.",
  },
  {
    year: "2025",
    title: "Down the security rabbit hole",
    text: "Discovered TryHackMe and HackTheBox. First CTFs, first shells, first writeups. Networking classes suddenly became attack surfaces — GNS3 labs turned into tooling projects.",
  },
  {
    year: "2026",
    title: "From player to author",
    text: " authored 5 CTF challenges for NMCTF .",
  },
  {
    year: "now",
    title: "Breaking & building",
    text: "Splitting time between engineering coursework, CTF  and side projects. ",
  },
];
