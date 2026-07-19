// ============================================================
//  skills.ts — the arsenal. Levels are 0–100, edit freely.
// ============================================================

export type Skill = { name: string; level: number };
export type SkillGroup = {
  id: string;
  title: string;
  command: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "security",
    title: "security",
    command: "apt list --installed | grep sec",
    skills: [
      { name: "Network Security", level: 70 },
            { name: "Network forensics", level: 70 },

                  { name: "Web Application Security", level: 65 },

      { name: "OSINT & Reconnaissance", level: 60 },
            { name: "Linux Privilege Escalation", level: 58 },

      { name: "Penetration Testing", level: 54 },

    ],
  },
  {
    id: "dev",
    title: "development",
    command: "apt list --installed | grep dev",
    skills: [
            { name: "Databases (SQL & NoSQL)", level: 71 },
      { name: "TypeScript / JavaScript", level: 70 },
            { name: "Node.js / Express", level: 68 },
      { name: "Python", level: 65 },
      { name: "React / Next.js", level: 45 },
    ],
  },
  {
    id: "devops",
    title: "devops & cloud",
    command: "apt list --installed | grep ops",
    skills: [
      { name: "Git", level: 70 },
      { name: "Docker", level: 65 },
      { name: "CI/CD Pipelines", level: 60 },
      { name: "Jenkins", level: 55 },
      { name: "Kubernetes", level: 45 },
      { name: "Cloud Fundamentals", level: 40 },
    ],
  },
  {
    id: "network",
    title: "networking",
    command: "apt list --installed | grep net",
    skills: [
      { name: "TCP/IP & OSI Model", level: 92 },
      { name: "Subnetting & IP Addressing", level: 90 },
      { name: "Routing (RIP / OSPF / BGP)", level: 88 },
      { name: "Switching & VLANs", level: 86 },
      { name: "Network Design & Architecture", level: 84 },
      { name: "Packet Analysis", level: 82 },
    ],
  },
];
