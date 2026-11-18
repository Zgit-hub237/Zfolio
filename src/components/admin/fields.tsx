import type { ReactNode } from "react";
import type { L } from "@/lib/db/schema";

export const inputCls =
  "w-full rounded-xl border border-dark-4 bg-dark px-3 py-2 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/15 transition";

export function Label({ children, hint }: { children: ReactNode; hint?: ReactNode }) {
  return (
    <span className="block mb-1.5">
      <span className="text-xs font-semibold text-foreground">{children}</span>
      {hint && <span className="block text-[11px] text-muted mt-0.5">{hint}</span>}
    </span>
  );
}

export function Input({
  name,
  label,
  defaultValue,
  hint,
  type = "text",
  placeholder,
  required,
}: {
  name: string;
  label: string;
  defaultValue?: string | number | null;
  hint?: ReactNode;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <Label hint={hint}>{label}</Label>
      <input name={name} type={type} defaultValue={defaultValue ?? ""} placeholder={placeholder} required={required} className={inputCls} />
    </label>
  );
}

export function Textarea({
  name,
  label,
  defaultValue,
  hint,
  rows = 4,
  placeholder,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  hint?: ReactNode;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <Label hint={hint}>{label}</Label>
      <textarea name={name} rows={rows} defaultValue={defaultValue ?? ""} placeholder={placeholder} className={inputCls} />
    </label>
  );
}

/** Champ bilingue : deux saisies côte à côte (FR / EN). Noms envoyés : `${name}_fr` et `${name}_en`. */
export function I18nField({
  name,
  label,
  value,
  hint,
  multiline,
  rows = 3,
}: {
  name: string;
  label: string;
  value?: L | null;
  hint?: ReactNode;
  multiline?: boolean;
  rows?: number;
}) {
  return (
    <div>
      <Label hint={hint}>{label}</Label>
      <div className="grid gap-2 md:grid-cols-2">
        {(["fr", "en"] as const).map((lng) => (
          <div key={lng} className="relative">
            <span className="absolute right-2 top-2 text-[10px] font-bold text-muted/70 uppercase pointer-events-none">{lng}</span>
            {multiline ? (
              <textarea name={`${name}_${lng}`} rows={rows} defaultValue={value?.[lng] ?? ""} className={`${inputCls} pr-8`} />
            ) : (
              <input name={`${name}_${lng}`} defaultValue={value?.[lng] ?? ""} className={`${inputCls} pr-8`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Checkbox({ name, label, defaultChecked, hint }: { name: string; label: string; defaultChecked?: boolean; hint?: string }) {
  return (
    <label className="flex items-start gap-2.5 cursor-pointer select-none">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="mt-0.5 h-4 w-4 accent-[#2ecc71]" />
      <span>
        <span className="text-sm text-foreground">{label}</span>
        {hint && <span className="block text-[11px] text-muted">{hint}</span>}
      </span>
    </label>
  );
}

export function Select({
  name,
  label,
  defaultValue,
  options,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <select name={name} defaultValue={defaultValue} className={inputCls}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Card({ title, description, children }: { title?: string; description?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-dark-4 bg-dark-2 p-5 sm:p-6">
      {title && <h2 className="font-display text-base font-bold text-foreground">{title}</h2>}
      {description && <p className="text-xs text-muted mt-1">{description}</p>}
      <div className={title || description ? "mt-5 space-y-4" : "space-y-4"}>{children}</div>
    </section>
  );
}

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">{title}</h1>
        {description && <p className="text-sm text-muted mt-1 max-w-2xl">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Flash({ saved, error }: { saved?: string; error?: string }) {
  if (error) {
    return <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>;
  }
  if (saved) {
    return <div className="mb-5 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent">Enregistré. Le site public est à jour.</div>;
  }
  return null;
}

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-[#0f0f0f] hover:bg-accent-dark disabled:opacity-60 transition";
export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-full border border-dark-4 px-4 py-2 text-sm text-muted hover:text-foreground hover:border-accent/40 transition";
