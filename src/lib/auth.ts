import crypto from "crypto";
import { cookies } from "next/headers";
import { getDb } from "./mongodb";

const COOKIE_NAME = "doctor_session";
const SESSION_MAX_AGE_DAYS = 7;

export function hashPassword(password: string, salt?: string) {
  const effectiveSalt = salt || crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .scryptSync(password, effectiveSalt, 64)
    .toString("hex");
  return { hash, salt: effectiveSalt };
}

export function verifyPassword(password: string, salt: string, expectedHash: string): boolean {
  try {
    const { hash } = hashPassword(password, salt);
    const hashBuf = Buffer.from(hash);
    const expectedBuf = Buffer.from(expectedHash || "");
    if (hashBuf.length !== expectedBuf.length) {
      return false;
    }
    return crypto.timingSafeEqual(hashBuf, expectedBuf);
  } catch {
    return false;
  }
}

export async function createSession(doctorId: string, email: string, name: string) {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_DAYS * 24 * 60 * 60 * 1000);

  const db = await getDb();
  await db.collection("sessions").insertOne({
    token,
    doctorId,
    email,
    name,
    createdAt: new Date(),
    expiresAt,
  });

  return { token, expiresAt };
}

export async function getSession() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) return null;

    const db = await getDb();
    const session = await db.collection("sessions").findOne({
      token,
      expiresAt: { $gt: new Date() },
    });

    if (!session) return null;

    return {
      doctorId: session.doctorId,
      email: session.email,
      name: session.name,
    };
  } catch (error) {
    console.error("Error retrieving session:", error);
    return null;
  }
}

export async function destroySession(token?: string) {
  try {
    const db = await getDb();
    if (token) {
      await db.collection("sessions").deleteOne({ token });
    }
  } catch (error) {
    console.error("Error destroying session:", error);
  }
}

export { COOKIE_NAME };

