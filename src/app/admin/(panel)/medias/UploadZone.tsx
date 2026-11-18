"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, Loader2 } from "lucide-react";
import { uploadFile } from "@/components/admin/MediaInput";

export default function UploadZone({ useBlob }: { useBlob: boolean }) {
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    setError("");
    try {
      for (const file of Array.from(files)) await uploadFile(file, useBlob);
      router.refresh();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
      if (ref.current) ref.current.value = "";
    }
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        onFiles(e.dataTransfer.files);
      }}
      className="rounded-2xl border-2 border-dashed border-dark-4 hover:border-accent/40 bg-dark-2 p-8 text-center transition"
    >
      <input ref={ref} type="file" multiple accept="image/*,video/mp4,video/webm,application/pdf" className="hidden" onChange={(e) => onFiles(e.target.files)} />
      <button type="button" onClick={() => ref.current?.click()} disabled={busy} className="inline-flex flex-col items-center gap-2 text-muted hover:text-accent">
        {busy ? <Loader2 size={28} className="animate-spin" /> : <UploadCloud size={28} />}
        <span className="text-sm">{busy ? "Envoi en cours…" : "Clique ou dépose des fichiers ici"}</span>
        <span className="text-[11px]">Images, vidéos MP4/WebM, PDF</span>
      </button>
      {error && <p className="text-xs text-red-400 mt-3">{error}</p>}
    </div>
  );
}
