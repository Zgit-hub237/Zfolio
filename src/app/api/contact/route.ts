import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "zegouloe237@gmail.com",
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;background:#1c1c1c;color:#e2e8f0;border-radius:12px;overflow:hidden;">
          <div style="background:#141414;padding:24px 32px;border-bottom:1px solid #2a2a2a;">
            <span style="color:#2ecc71;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:2px;">Portfolio — Nouveau message</span>
          </div>
          <div style="padding:32px;">
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
              <tr>
                <td style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1px;padding:6px 0;width:80px;">Nom</td>
                <td style="color:#e2e8f0;font-size:14px;padding:6px 0;">${name}</td>
              </tr>
              <tr>
                <td style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1px;padding:6px 0;">Email</td>
                <td style="color:#2ecc71;font-size:14px;padding:6px 0;">
                  <a href="mailto:${email}" style="color:#2ecc71;text-decoration:none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1px;padding:6px 0;">Sujet</td>
                <td style="color:#e2e8f0;font-size:14px;font-weight:600;padding:6px 0;">${subject}</td>
              </tr>
            </table>
            <div style="background:#141414;border-radius:8px;padding:20px;border-left:3px solid #2ecc71;">
              <p style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px 0;">Message</p>
              <p style="color:#e2e8f0;font-size:14px;line-height:1.7;margin:0;white-space:pre-wrap;">${message}</p>
            </div>
          </div>
          <div style="background:#141414;padding:16px 32px;text-align:center;border-top:1px solid #2a2a2a;">
            <span style="color:#555;font-size:11px;">Loé Zegou Megnizon — Portfolio</span>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ error: "Erreur d'envoi" }, { status: 500 });
  }
}
