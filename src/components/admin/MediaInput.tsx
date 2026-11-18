"use client";

import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { Upload, Loader2, X } from "lucide-react";
import { inputCls, Label } from "./fields";
import { ALLOWED_TYPES, safeFileName } from "@/lib/admin/media-rules";
import { registerMedia } from "@/app/admin/(panel)/medias/actions";

export async function uploadFile(file: File, useBlob: boolean): Promise<string> {
  let url: string;
  let pathname: string;
  if (useBlob) {
    const res = await upload(`portfolio/${safeFileName(file.name)}`, file, {
      access: "public",
      handleUploadUrl: "/api/upload",
      contentType: file.type,
    });
    url = res.url;
    pathname = res.pathname;
  } else {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload-local", { method: "POST", body: fd });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error ?? "Échec de l'envoi");
    url = json.url;
    pathname = json.pathname;
  }
  await registerMedia({ url, pathname, contentType: file.type, size: file.size });
  return url;
}

/** Champ URL + bouton de téléversement + aperçu. */
export default function MediaInput({
  name,
  label,
  defaultValue,
  useBlob,
  accept = "image/*",
  hint,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  useBlob: boolean;
  accept?: string;
  hint?: string;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setError("");
    if (!(ALLOWED_TYPES as readonly string[]).includes(file.type)) {
      setError("Type de fichier non autorisé.");
      return;
    }
    setBusy(true);
    try {
      setValue(await uploadFile(file, useBlob));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const isImage = /\.(png|jpe?g|webp|gif|avif)(\?|$)/i.test(value) || value.startsWith("/images/") || value.startsWith("/logos/");
  const isVideo = /\.(mp4|webm)(\?|$)/i.test(value);

  return (
    <div>
      <Label hint={hint}>{label}</Label>
      <div className="flex gap-2">
        <input name={name} value={value} onChange={(e) => setValue(e.target.value)} placeholder="https://… ou /images/…" className={inputCls} />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-xl border border-dark-4 px-3 text-xs text-muted hover:text-accent hover:border-accent/40 transition disabled:opacity-60"
        >
          {busy ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
          {busy ? "Envoi…" : "Téléverser"}
        </button>
        {value && (
          <button type="button" onClick={() => setValue("")} aria-label="Vider" className="shrink-0 rounded-xl border border-dark-4 px-2 text-muted hover:text-red-400">
            <X size={14} />
          </button>
        )}
        <input ref={fileRef} type="file" accept={accept} className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      </div>
      {error && <p className="text-xs text-red-400 mt-1.5">{error}</p>}
      {value && isImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="mt-2 h-24 rounded-lg border border-dark-4 object-cover" />
      )}
      {value && isVideo && <video src={value} controls className="mt-2 h-32 rounded-lg border border-dark-4" />}
    </div>
  );
}
