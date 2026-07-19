type Props = {
  title: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
};

export default function TerminalWindow({
  title,
  children,
  className,
  bodyClassName,
}: Props) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-border bg-panel/80 backdrop-blur-sm ${
        className ?? ""
      }`}
    >
      <div className="flex items-center gap-2 border-b border-border bg-bg-alt/70 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-danger/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-terminal/80" />
        <span className="ml-3 truncate text-xs text-fg-dim">{title}</span>
      </div>
      <div className={`p-5 sm:p-6 ${bodyClassName ?? ""}`}>{children}</div>
    </div>
  );
}
