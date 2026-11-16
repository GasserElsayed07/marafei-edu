import { jwtVerify, SignJWT } from "jose";

export type UserRole = "admin" | "user";

export type Session = {
  sub: string;
  email: string;
  name: string;
  role: UserRole;
};

function secretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

export async function signSession(session: Session) {
  const key = secretKey();
  if (!key) throw new Error("JWT_SECRET is not set");
  return new SignJWT({
    email: session.email,
    name: session.name,
    role: session.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.sub)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function verifySession(token: string): Promise<Session | null> {
  const key = secretKey();
  if (!key) return null;
  try {
    const { payload } = await jwtVerify(token, key);
    const role = payload.role;
    if ((role !== "admin" && role !== "user") || typeof payload.sub !== "string") {
      return null;
    }
    if (typeof payload.email !== "string" || typeof payload.name !== "string") {
      return null;
    }
    return { sub: payload.sub, email: payload.email, name: payload.name, role };
  } catch {
    return null;
  }
}
