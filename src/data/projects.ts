// ============================================================
//  projects.ts — curated from github.com/amdjadmoh
//  Add / edit entries here; the Projects page renders from this.
//  `url` is optional — defaults to github.com/amdjadmoh/<repo>.
// ============================================================

export type ProjectCategory = "security" | "web" | "network";

export type Project = {
  slug: string;
  name: string;
  repo: string; // github repo name under amdjadmoh/
  url?: string; // override the default repo link (e.g. subfolder)
  live?: string; // live demo / deployed site
  description: string;
  tech: string[];
  category: ProjectCategory;
  featured?: boolean;
  year: string;
};

export const projects: Project[] = [
  {
    slug: "suhayl",
    name: "Suhayl",
    repo: "Suhayl",
    live: "https://suhayl.online/",
    description:
      "Study-abroad university organizer — tracks applications, requirements and deadlines for students planning to study overseas.",
    tech: ["TypeScript", "React", "Next.js"],
    category: "web",
    featured: true,
    year: "2026",
  },
  {
    slug: "dockyard",
    name: "Dockyard",
    repo: "ctf-writeups",
    url: "https://github.com/amdjadmoh/ctf-writeups/tree/main/myChallenges/nmctf/dockyard",
    description:
      "CTF challenge I authored for NMCTF: a realistic container-escape scenario — SSH jumpbox, leaked Jenkins credentials, and a mounted Docker socket abused via the raw Engine API to loot a vault container.",
    tech: ["Docker", "Jenkins", "Linux", "Container Escape"],
    category: "security",
    year: "2026",
  },
  {
    slug: "cursed-arcade",
    name: "Cursed Arcade",
    repo: "ctf-writeups",
    url: "https://github.com/amdjadmoh/ctf-writeups/tree/main/myChallenges/nmctf/cursed-arcade",
    description:
      "OSINT challenge I authored for NMCTF",
    tech: ["OSINT", "Geolocation", "Social Media Recon"],
    category: "security",
    year: "2026",
  },
  {
    slug: "clinic-api",
    name: "Clinic Management API",
    repo: "clinic-management-api",
    description:
      "REST API for clinic managment : patients, appointments, medical records and staff.",
    tech: ["JavaScript", "Node.js", "Express"],
    category: "web",
    featured: true,
    year: "2024",
  },
  {
    slug: "charity-ims",
    name: "Charity Management Software",
    repo: "charity-association-management-software",
    description:
      "Management platform for a charity association : members, donations and activity tracking in one place.",
    tech: ["JavaScript", "Node.js"],
    category: "web",
    featured: true,
    year: "2025",
  },
  {
    slug: "gns3-dynrouting",
    name: "Dynamic Routing Interface",
    repo: "dyanmic-routing-configuation-interface-for-gns3-",
    description:
      "Configuration interface for dynamic routing labs on GNS3 — visualize the topology, push the config, watch it converge.",
    tech: ["JavaScript", "GNS3", "OSPF"],
    category: "network",
    year: "2024",
  },
];

export const projectUrl = (p: Project) =>
  p.url ?? `https://github.com/amdjadmoh/${p.repo}`;
