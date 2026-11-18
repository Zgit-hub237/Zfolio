import "server-only";
import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verify, hash } from "@node-rs/argon2";
import * as OTPAuth from "otpauth";
import { SESSION_COOKIE, verifySessionToken } from "./session";

/** L'admin est-il configuré (variables d'environnement présentes) ? */
export function adminConfigured() {
  return Boolean(
    process.env.ADMIN_EMAIL &&
      process.env.ADMIN_PASSWORD_HASH_B64 &&
      process.env.SESSION_SECRET &&
      process.env.SESSION_SECRET.length >= 32,
  );
}

export function totpEnabled() {
  return Boolean(process.env.ADMIN_TOTP_SECRET);
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

/** À appeler au début de chaque page et action du dashboard (défense en profondeur avec le middleware). */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

let dummyHash: Promise<string> | null = null;

/**
 * Vérifie email + mot de passe (+ code 2FA si activé).
 * Temps de réponse homogène : le hash est toujours vérifié, même si l'email est faux.
 */
export async function checkCredentials(email: string, password: string, otp: string): Promise<boolean> {
  if (!adminConfigured()) return false;
  const expectedEmail = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const given = Buffer.from(email.trim().toLowerCase());
  const wanted = Buffer.from(expectedEmail);
  const emailOk = given.length === wanted.length && timingSafeEqual(given, wanted);

  const stored = Buffer.from(process.env.ADMIN_PASSWORD_HASH_B64 ?? "", "base64").toString("utf8");
  let passwordOk = false;
  try {
    if (!dummyHash) dummyHash = hash("not-the-password");
    passwordOk = await verify(emailOk ? stored : await dummyHash, password);
  } catch {
    passwordOk = false;
  }
  if (!emailOk || !passwordOk) return false;

  if (totpEnabled()) {
    const totp = new OTPAuth.TOTP({ secret: OTPAuth.Secret.fromBase32(process.env.ADMIN_TOTP_SECRET!) });
    if (!/^\d{6}$/.test(otp) || totp.validate({ token: otp, window: 1 }) === null) return false;
  }
  return true;
}
