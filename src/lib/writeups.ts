import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type WriteupMeta = {
  slug: string;
  title: string;
  date: string;
  platform: string;
  difficulty: string;
  tags: string[];
  excerpt: string;
};

const DIR = path.join(process.cwd(), "content", "writeups");

export function getAllWriteups(): WriteupMeta[] {
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((f) => {
      const raw = fs.readFileSync(path.join(DIR, f), "utf8");
      const { data } = matter(raw);
      return { slug: f.replace(/\.mdx$/, ""), ...data } as WriteupMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getLatestWriteups(n: number): WriteupMeta[] {
  return getAllWriteups().slice(0, n);
}

export function getWriteup(slug: string): {
  meta: WriteupMeta;
  content: string;
} {
  const raw = fs.readFileSync(path.join(DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  return { meta: { slug, ...data } as WriteupMeta, content };
}
