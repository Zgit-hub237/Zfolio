"use client";

import { useRef, useState } from "react";
import { Bold, Code, Heading2, ImagePlus, Italic, Link2, List, Loader2, Quote } from "lucide-react";
import Markdown from "@/components/blog/Markdown";
import { inputCls, Label } from "./fields";
import { uploadFile } from "./MediaInput";

/** Éditeur Markdown avec barre d'outils, insertion d'image et aperçu. */
export default function MarkdownEditor({ name, defaultValue, useBlob }: { name: string; defaultValue: string; useBlob: boolean }) {
  const [value, setValue] = useState(defaultValue);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [busy, setBusy] = useState(false);
  const area = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const wrap = (before: string, after = before, placeholder = "texte") => {
    const el = area.current;
    if (!el) return;
    const { selectionStart: a, selectionEnd: b } = el;
    const selected = value.slice(a, b) || placeholder;
    const next = value.slice(0, a) + before + selected + after + value.slice(b);
    setValue(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(a + before.length, a + before.length + selected.length);
    });
  };
  const linePrefix = (prefix: string) => {
    const el = area.current;
    if (!el) return;
    const start = value.lastIndexOf("\n", el.selectionStart - 1) + 1;
    setValue(value.slice(0, start) + prefix + value.slice(start));
    requestAnimationFrame(() => el.focus());
  };
  const insertImage = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    try {
      const url = await uploadFile(file, useBlob);
      wrap("![", `](${url})`, file.name.replace(/\.[^.]+$/, ""));
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const tools = [
    { icon: Heading2, label: "Titre", run: () => linePrefix("## ") },
    { icon: Bold, label: "Gras", run: () => wrap("**") },
    { icon: Italic, label: "Italique", run: () => wrap("_") },
    { icon: Link2, label: "Lien", run: () => wrap("[", "](https://)", "texte du lien") },
    { icon: List, label: "Liste", run: () => linePrefix("- ") },
    { icon: Quote, label: "Citation", run: () => linePrefix("> ") },
    { icon: Code, label: "Code", run: () => wrap("\n```bash\n", "\n```\n", "commande") },
  ];

  return (
    <div>
      <Label hint="Markdown : ## titre, **gras**, - liste, ```code```, ![image](lien)">Contenu</Label>
      <div className="rounded-xl border border-dark-4 overflow-hidden">
        <div className="flex flex-wrap items-center gap-1 border-b border-dark-4 bg-dark-3 px-2 py-1.5">
          {(["write", "preview"] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setTab(k)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${tab === k ? "bg-dark text-accent" : "text-muted hover:text-foreground"}`}
            >
              {k === "write" ? "Écrire" : "Aperçu"}
            </button>
          ))}
          <span className="w-px h-5 bg-dark-4 mx-1" />
          {tools.map(({ icon: Icon, label, run }) => (
            <button key={label} type="button" title={label} onClick={run} disabled={tab !== "write"} className="p-1.5 rounded-lg text-muted hover:text-accent disabled:opacity-40">
              <Icon size={15} />
            </button>
          ))}
          <button type="button" title="Insérer une image" onClick={() => fileRef.current?.click()} disabled={tab !== "write" || busy} className="p-1.5 rounded-lg text-muted hover:text-accent disabled:opacity-40">
            {busy ? <Loader2 size={15} className="animate-spin" /> : <ImagePlus size={15} />}
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => insertImage(e.target.files?.[0])} />
        </div>
        <textarea
          ref={area}
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={22}
          className={`${inputCls} !rounded-none !border-0 font-mono text-[13px] leading-relaxed ${tab === "write" ? "" : "hidden"}`}
        />
        {tab === "preview" && (
          <div className="min-h-[420px] bg-dark p-5">{value.trim() ? <Markdown>{value}</Markdown> : <p className="text-sm text-muted">Rien à afficher.</p>}</div>
        )}
      </div>
    </div>
  );
}
