// ============================================================
//  site.ts — single source of truth for personal info.
//  Edit values here and they update across the whole site.
// ============================================================

export const site = {
  name: "Mohamed Amdjad Mehdi",
  handle: "amdjadmoh",
  firstName: "Amdjad",
  roles: [
    "backend developer",
    "cybersecurity student",
    "ctf player",
    "problem solver",
  ],
  tagline: "CompSci by day, breaking boxes by night.",
  email: "ma.mehdi@esi-sba.dz",
  school: "ESI-SBA — École Supérieure en Informatique",
  location: "Sidi Bel Abbès, Algeria",
  avatar: "https://avatars.githubusercontent.com/u/140427334?v=4",
  githubApi: "https://api.github.com/users/amdjadmoh",
  socials: [
    {
      id: "github",
      label: "GitHub",
      handle: "amdjadmoh",
      url: "https://github.com/amdjadmoh",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      handle: "mehdi-mohamed-amdjad",
      url: "https://www.linkedin.com/in/mehdi-mohamed-amdjad-237298285/",
    },
    {
      id: "tryhackme",
      label: "TryHackMe",
      handle: "4MJ4D",
      url: "https://tryhackme.com/p/4MJ4D",
    },
    {
      id: "hackthebox",
      label: "HackTheBox",
      handle: "amdjadmoh",
      url: "https://app.hackthebox.com/profile/amdjadmoh",
    },
    {
      id: "email",
      label: "Email",
      handle: "ma.mehdi@esi-sba.dz",
      url: "mailto:ma.mehdi@esi-sba.dz",
    },
  ],
} as const;

export const prompt = "amdjad@portfolio";
