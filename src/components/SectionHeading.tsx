import { prompt } from "@/data/site";

type Props = {
  command: string;
  title: string;
};

export default function SectionHeading({ command, title }: Props) {
  return (
    <div>
      <p className="text-sm text-fg-dim">
        <span className="text-terminal">{prompt}:~$</span> {command}
      </p>
      <h2 className="mt-2 text-2xl font-bold text-fg sm:text-3xl">
        <span className="text-terminal">#</span> {title}
      </h2>
    </div>
  );
}
