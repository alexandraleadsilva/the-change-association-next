import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
const COOKIE_NAME = "tca_session";

// In-memory OTP store (replace with database later)
const otpStore = new Map<string, { code: string; expires: number; email: string }>();

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function storeOTP(email: string, code: string) {
  otpStore.set(email.toLowerCase(), {
    code,
    expires: Date.now() + 10 * 60 * 1000, // 10 minutes
    email: email.toLowerCase(),
  });
}

export function verifyOTP(email: string, code: string): boolean {
  const stored = otpStore.get(email.toLowerCase());
  if (!stored) return false;
  if (Date.now() > stored.expires) {
    otpStore.delete(email.toLowerCase());
    return false;
  }
  if (stored.code !== code) return false;
  otpStore.delete(email.toLowerCase());
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
