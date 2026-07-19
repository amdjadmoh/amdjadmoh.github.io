import { prompt } from "@/data/site";

type Props = {
  command: string;
  title: string;
  description?: string;
};

export default function PageHeader({ command, title, description }: Props) {
  return (
    <div className="mb-10">
      <p className="mb-3 text-sm text-fg-dim">
        <span className="text-terminal">{prompt}:~$</span> {command}
      </p>
      <h1 className="group text-3xl font-extrabold tracking-tight sm:text-5xl">
        <span
          className="glitch glitch-hover text-terminal text-glow"
          data-text={title}
        >
          {title}
        </span>
      </h1>
      {description && (
        <p className="mt-4 max-w-2xl text-sm text-fg-dim sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
