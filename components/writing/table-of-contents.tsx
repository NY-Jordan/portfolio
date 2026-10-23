import type { TocEntry } from "@/lib/writing/doc-analysis";

export function TableOfContents({
  toc,
  label,
}: {
  toc: TocEntry[];
  label: string;
}) {
  if (toc.length === 0) return null;

  return (
    <nav className="flex flex-col gap-3">
      <h2 className="label-mono text-muted-foreground">{label}</h2>
      <ul className="flex flex-col gap-2 border-l border-border pl-4 text-sm">
        {toc.map((entry) => (
          <li key={entry.id} className={entry.depth === 3 ? "pl-3" : undefined}>
            <a
              href={`#${entry.id}`}
              className="text-muted-foreground transition-colors hover:text-accent"
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
