import type { L } from "@/lib/db/schema";

/** Petites aides pour lire un FormData de façon sûre (longueurs bornées, URL filtrées). */
const MAX = 20_000;

export const str = (fd: FormData, key: string, max = 2_000) => String(fd.get(key) ?? "").trim().slice(0, max);
export const longStr = (fd: FormData, key: string) => str(fd, key, MAX * 5);
export const bool = (fd: FormData, key: string) => fd.get(key) === "on" || fd.get(key) === "true";
export const int = (fd: FormData, key: string, fallback = 0, min = -1_000_000, max = 1_000_000) => {
  const n = Number.parseInt(String(fd.get(key) ?? ""), 10);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
};
export const l = (fd: FormData, key: string, max = MAX): L => ({ fr: str(fd, `${key}_fr`, max), en: str(fd, `${key}_en`, max) });
export const list = (fd: FormData, key: string) =>
  str(fd, key, MAX)
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 100);

/**
 * N'accepte que des liens sûrs : http(s), mailto:, tel: ou chemin relatif au site.
 * Bloque notamment les URL `javascript:` qui permettraient une injection de script via un lien.
 */
export function safeUrl(value: string, { allowMail = false } = {}): string | null {
  const v = value.trim();
  if (!v) return null;
  if (v.startsWith("/") && !v.startsWith("//")) return v;
  try {
    const u = new URL(v);
    const ok = u.protocol === "https:" || u.protocol === "http:" || (allowMail && (u.protocol === "mailto:" || u.protocol === "tel:"));
    return ok ? u.toString() : null;
  } catch {
    return null;
  }
}

export const url = (fd: FormData, key: string) => safeUrl(str(fd, key, 2_000));

export function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
