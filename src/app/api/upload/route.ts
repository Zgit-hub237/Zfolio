import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { ALLOWED_TYPES, MAX_UPLOAD_BYTES } from "@/lib/admin/media-rules";

/**
 * Téléversement direct navigateur → Vercel Blob.
 * Ce point d'accès ne fait que délivrer un jeton d'envoi, uniquement à l'admin connecté.
 * (Hors de /api/admin car Vercel Blob rappelle cette route sans cookie une fois l'envoi terminé.)
 */
export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;
  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        if (!(await isAdmin())) throw new Error("Non autorisé");
        return {
          allowedContentTypes: [...ALLOWED_TYPES],
          maximumSizeInBytes: MAX_UPLOAD_BYTES,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {
        // Le fichier est enregistré dans la médiathèque par le dashboard après l'envoi.
      },
    });
    return NextResponse.json(json);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
