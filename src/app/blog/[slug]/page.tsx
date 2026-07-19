import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import TerminalWindow from "@/components/TerminalWindow";
import { getAllWriteups, getWriteup } from "@/lib/writeups";

export function generateStaticParams() {
  return getAllWriteups().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = getWriteup(slug);
    return { title: meta.title, description: meta.excerpt };
  } catch {
    return { title: "writeup not found" };
  }
}

export default async function WriteupPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let data: ReturnType<typeof getWriteup>;
  try {
    data = getWriteup(slug);
  } catch {
    notFound();
  }
  const { meta, content } = data;

  return (
    <div className="mx-auto max-w-4xl px-4 pt-28 pb-20 sm:px-6">
      <Link
        href="/blog"
        className="text-xs text-fg-dim transition-colors hover:text-terminal"
      >
        $ cd ~/blog ←
      </Link>

      <header className="mt-5 mb-8">
        <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider">
          <span className="rounded-sm border border-border px-1.5 py-0.5 text-amber">
            {meta.platform}
          </span>
          <span className="rounded-sm border border-border px-1.5 py-0.5 text-fg-dim">
            {meta.difficulty}
          </span>
          {meta.tags.map((t) => (
            <span key={t} className="text-terminal/70">
              #{t}
            </span>
          ))}
        </div>
        <h1 className="mt-3 text-2xl font-extrabold text-terminal text-glow sm:text-4xl">
          {meta.title}
        </h1>
        <p className="mt-2 text-xs text-fg-dim">
          published {meta.date} — {meta.excerpt}
        </p>
      </header>

      <TerminalWindow title={`vim ${slug}.md  —  [readonly]`}>
        <article className="writeup">
          <MDXRemote
            source={content}
            options={{ mdxOptions: { rehypePlugins: [rehypeHighlight] } }}
          />
        </article>
      </TerminalWindow>

      <p className="mt-6 text-center text-xs text-fg-dim">
        — EOF — <Link href="/blog" className="text-terminal hover:underline underline-offset-4">$ cd ~/blog</Link>
      </p>
    </div>
  );
}
