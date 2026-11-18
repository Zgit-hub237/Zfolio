/**
 * Jetons de session admin (JWT HS256 signé). Compatible Edge : utilisé par le middleware.
 */
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "zf_admin";
export const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 h

function secretKey(): Uint8Array | null {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) return null;
  return new TextEncoder().encode(secret);
}

/** Empreinte courte du hash du mot de passe : changer le mot de passe invalide toutes les sessions. */
async function passwordFingerprint(): Promise<string> {
  const data = new TextEncoder().encode(process.env.ADMIN_PASSWORD_HASH_B64 ?? "");
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest).slice(0, 8), (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function createSessionToken(): Promise<string> {
  const key = secretKey();
  if (!key) throw new Error("SESSION_SECRET manquant ou trop court (32 caractères minimum).");
  return new SignJWT({ pfp: await passwordFingerprint() })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("admin")
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(key);
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  const key = secretKey();
  if (!token || !key) return false;
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"], subject: "admin" });
    return payload.pfp === (await passwordFingerprint());
  } catch {
    return false;
  }
}

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge: SESSION_TTL_SECONDS,
};
