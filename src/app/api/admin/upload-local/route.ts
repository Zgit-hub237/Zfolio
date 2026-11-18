import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { isAllowedType, MAX_LOCAL_UPLOAD_BYTES, safeFileName } from "@/lib/admin/media-rules";

/** Téléversement de secours en développement local (sans Vercel Blob) : écrit dans public/uploads. */
export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production" || process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "Indisponible" }, { status: 404 });
  }
  if (!(await isAdmin())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
  if (!isAllowedType(file.type)) return NextResponse.json({ error: "Type de fichier non autorisé" }, { status: 400 });
  if (file.size > MAX_LOCAL_UPLOAD_BYTES) return NextResponse.json({ error: "Fichier trop volumineux (50 Mo max en local)" }, { status: 400 });

  const name = `${randomBytes(6).toString("hex")}-${safeFileName(file.name)}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({ url: `/uploads/${name}`, pathname: `uploads/${name}` });
}
