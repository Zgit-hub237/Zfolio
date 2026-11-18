import { Resend } from "resend";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { clientIp, countEvents, recordEvent } from "@/lib/rate-limit";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.email().max(200),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(5000),
  website: z.string().max(0).optional(), // pot de miel anti-robots : doit rester vide
});

/** Échappe le HTML pour éviter toute injection dans l'e-mail de notification. */
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Champs invalides" }, { status: 400 });
  const { name, email, subject, message } = parsed.data;

  const ip = await clientIp();
  if ((await countEvents("contact", ip, 60 * 60 * 1000)) >= 5) {
    return NextResponse.json({ error: "Trop de messages, réessaie plus tard." }, { status: 429 });
  }
  await recordEvent("contact", ip);

  let stored = false;
  try {
    const db = await getDb();
    if (db) {
      await db.insert(messages).values({ name, email, subject, message });
      stored = true;
    }
  } catch (err) {
    console.error("[contact] enregistrement :", err);
  }

  let mailed = false;
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>",
        to: process.env.CONTACT_TO_EMAIL || "zegouloe237@gmail.com",
        replyTo: email,
        subject: `[Portfolio] ${subject.replace(/[\r\n]+/g, " ")}`,
        html: `
          <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;background:#1c1c1c;color:#e2e8f0;border-radius:12px;overflow:hidden;">
            <div style="background:#141414;padding:24px 32px;border-bottom:1px solid #2a2a2a;">
              <span style="color:#2ecc71;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:2px;">Portfolio — Nouveau message</span>
            </div>
            <div style="padding:32px;">
              <p style="margin:0 0 6px;color:#888;font-size:12px;">Nom</p>
              <p style="margin:0 0 16px;font-size:14px;">${esc(name)}</p>
              <p style="margin:0 0 6px;color:#888;font-size:12px;">Email</p>
              <p style="margin:0 0 16px;font-size:14px;color:#2ecc71;">${esc(email)}</p>
              <p style="margin:0 0 6px;color:#888;font-size:12px;">Sujet</p>
              <p style="margin:0 0 16px;font-size:14px;font-weight:600;">${esc(subject)}</p>
              <div style="background:#141414;border-radius:8px;padding:20px;border-left:3px solid #2ecc71;">
                <p style="color:#e2e8f0;font-size:14px;line-height:1.7;margin:0;white-space:pre-wrap;">${esc(message)}</p>
              </div>
            </div>
          </div>
        `,
      });
      mailed = true;
    } catch (err) {
      console.error("[contact] e-mail :", err);
    }
  }

  if (!stored && !mailed) return NextResponse.json({ error: "Erreur d'envoi" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
