import Link from "next/link";
import type { ReactNode } from "react";
import { Pencil } from "lucide-react";

export type Row = { id: number; title: string; meta?: ReactNode; badges?: string[]; muted?: boolean };

/** Liste simple d'éléments éditables. */
export default function ListTable({ rows, basePath, empty = "Aucun élément." }: { rows: Row[]; basePath: string; empty?: string }) {
  if (rows.length === 0) return <p className="text-sm text-muted">{empty}</p>;
  return (
    <ul className="divide-y divide-dark-4 rounded-2xl border border-dark-4 bg-dark-2 overflow-hidden">
      {rows.map((r) => (
        <li key={r.id}>
          <Link href={`${basePath}/${r.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-dark-3 transition group">
            <div className={`flex-1 min-w-0 ${r.muted ? "opacity-50" : ""}`}>
              <p className="text-sm font-semibold text-foreground truncate group-hover:text-accent">{r.title}</p>
              {r.meta && <p className="text-xs text-muted truncate">{r.meta}</p>}
            </div>
            <div className="hidden sm:flex flex-wrap justify-end gap-1">
              {r.badges?.map((b) => (
                <span key={b} className="px-2 py-0.5 rounded-md bg-dark-4 text-[10px] text-muted uppercase tracking-wide">
                  {b}
                </span>
              ))}
            </div>
            <Pencil size={14} className="text-muted group-hover:text-accent shrink-0" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
