import { cookies } from "next/headers";
import { signSession, verifySession, type Session } from "./jwt";
import { SESSION_COOKIE, sessionCookieOptions } from "./session-cookie";

export async function getSession(): Promise<Session | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}

export async function setSessionCookie(session: Session) {
  const token = await signSession(session);
  (await cookies()).set(SESSION_COOKIE, token, sessionCookieOptions);
}

export async function clearSessionCookie() {
  (await cookies()).set(SESSION_COOKIE, "", { ...sessionCookieOptions, maxAge: 0 });
}
