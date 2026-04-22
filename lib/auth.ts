import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { sql } from "@vercel/postgres";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
const COOKIE_NAME = "tca_session";

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function storeOTP(email: string, code: string) {
  const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  const emailLower = email.toLowerCase();

  // Delete any existing OTP for this email
  await sql`DELETE FROM otp_codes WHERE email = ${emailLower}`;

  // Insert new OTP
  await sql`INSERT INTO otp_codes (email, code, expires_at) VALUES (${emailLower}, ${code}, ${expires.toISOString()})`;
}

export async function verifyOTP(email: string, code: string): Promise<boolean> {
  const emailLower = email.toLowerCase();

  const { rows } = await sql`
    SELECT code, expires_at FROM otp_codes
    WHERE email = ${emailLower}
    ORDER BY expires_at DESC
    LIMIT 1
  `;

  if (rows.length === 0) return false;

  const stored = rows[0];

  // Check expiry
  if (new Date() > new Date(stored.expires_at)) {
    await sql`DELETE FROM otp_codes WHERE email = ${emailLower}`;
    return false;
  }

  // Check code
  if (stored.code !== code) return false;

  // Valid -- delete the OTP
  await sql`DELETE FROM otp_codes WHERE email = ${emailLower}`;
  return true;
}

export async function createSession(email: string): Promise<string> {
  const token = await new SignJWT({ email: email.toLowerCase() })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .setIssuedAt()
    .sign(secret);
  return token;
}

export async function getSession(): Promise<{ email: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return { email: payload.email as string };
  } catch {
    return null;
  }
}

export function getSessionCookieName() {
  return COOKIE_NAME;
}
