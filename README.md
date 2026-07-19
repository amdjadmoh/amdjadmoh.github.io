# ~/amdjad.sh — portfolio

Cyber-terminal themed portfolio for **Mohamed Amdjad Mehdi** — developer & cybersecurity student @ ESI-SBA.

Built with **Next.js 16** (App Router) · **Tailwind CSS v4** · **Framer Motion** · **MDX**.

## run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

Deploy: push to GitHub → import on **Vercel** → done.

## where to edit content

| What | File |
|---|---|
| Name, email, socials, roles, tagline | `src/data/site.ts` |
| Projects (descriptions, tags, featured) | `src/data/projects.ts` |
| Skills & levels | `src/data/skills.ts` |
| About-page timeline | `src/data/timeline.ts` |
| Blog posts / writeups | `content/writeups/*.mdx` (one file per post, frontmatter on top) |

## the fun stuff

- **Boot sequence** on first visit (any key to skip)
- **Ctrl+K** — command palette (navigate, toggle scanlines/matrix, fake breach)
- **Konami code** — ↑ ↑ ↓ ↓ ← → ← → B A
- Matrix rain, CRT scanlines, glitch hovers, typed terminals, scroll reveals
- Respects `prefers-reduced-motion`; FX toggles persist in localStorage

## writeup frontmatter template

```mdx
---
title: "THM: BoxName — full walkthrough"
date: "2026-06-01"
platform: "TryHackMe"
difficulty: "easy"
tags: ["thm", "web"]
excerpt: "One-line summary shown on the index."
---
```
