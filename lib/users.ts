import { compare, hash } from "bcryptjs";
import { connectDb } from "./db";
import { UserModel } from "./user-model";
import type { UserRole } from "./jwt";

export type FormState = { error: UserError } | { ok: true } | null;

export type UserError =
  | "unavailable"
  | "invalid"
  | "invalid-credentials"
  | "email-taken"
  | "last-admin"
  | "cannot-delete-self"
  | "not-found"
  | "password-short"
  | "password-long";

export type PublicUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
};

type UserResult<T> = { ok: true; data: T } | { ok: false; error: UserError };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function passwordError(password: string, required: boolean): UserError | null {
  if (!password) return required ? "password-short" : null;
  if (password.length < 8) return "password-short";
  if (password.length > 72) return "password-long";
  return null;
}

function readIdentity(name: string, email: string, role: string) {
  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();
  const cleanRole: UserRole | null = role === "admin" || role === "user" ? role : null;
  if (!cleanName || cleanName.length > 80 || !EMAIL_PATTERN.test(cleanEmail) || !cleanRole) {
    return null;
  }
  return { name: cleanName, email: cleanEmail, role: cleanRole };
}

function toPublicUser(user: {
  _id: { toString(): string };
  name: string;
  email: string;
  role: UserRole;
  createdAt?: Date;
}): PublicUser {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: (user.createdAt ?? new Date()).toISOString(),
  };
}

async function ready() {
  if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) return false;
  try {
    await connectDb();
    return true;
  } catch {
    return false;
  }
}

export async function authenticate(email: string, password: string): Promise<UserResult<PublicUser>> {
  if (!(await ready())) return { ok: false, error: "unavailable" };
  const user = await UserModel.findOne({ email: email.trim().toLowerCase() }).select("+passwordHash");
  if (!user) return { ok: false, error: "invalid-credentials" };
  const matches = await compare(password, user.passwordHash);
  if (!matches) return { ok: false, error: "invalid-credentials" };
  return { ok: true, data: toPublicUser(user) };
}

export async function listUsers(): Promise<PublicUser[]> {
  await connectDb();
  const users = await UserModel.find().sort({ createdAt: -1 }).lean();
  return users.map((user) => toPublicUser(user));
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
  role: string;
}): Promise<UserResult<PublicUser>> {
  if (!(await ready())) return { ok: false, error: "unavailable" };
  const identity = readIdentity(input.name, input.email, input.role);
  const passwordProblem = passwordError(input.password, true);
  if (!identity || passwordProblem) return { ok: false, error: passwordProblem ?? "invalid" };
  const existing = await UserModel.exists({ email: identity.email });
  if (existing) return { ok: false, error: "email-taken" };
  const passwordHash = await hash(input.password, 12);
  const user = await UserModel.create({ ...identity, passwordHash });
  return { ok: true, data: toPublicUser(user) };
}

export async function updateUser(input: {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}): Promise<UserResult<PublicUser>> {
  if (!(await ready())) return { ok: false, error: "unavailable" };
  const identity = readIdentity(input.name, input.email, input.role);
  const passwordProblem = passwordError(input.password, false);
  if (!identity || passwordProblem) return { ok: false, error: passwordProblem ?? "invalid" };

  const current = await UserModel.findById(input.id);
  if (!current) return { ok: false, error: "not-found" };
  if (current.role === "admin" && identity.role !== "admin") {
    const admins = await UserModel.countDocuments({ role: "admin" });
    if (admins <= 1) return { ok: false, error: "last-admin" };
  }
  const emailOwner = await UserModel.exists({ email: identity.email, _id: { $ne: current._id } });
  if (emailOwner) return { ok: false, error: "email-taken" };

  const update: { name: string; email: string; role: UserRole; passwordHash?: string } = identity;
  if (input.password) update.passwordHash = await hash(input.password, 12);
  const saved = await UserModel.findByIdAndUpdate(current._id, update, { new: true });
  if (!saved) return { ok: false, error: "not-found" };
  return { ok: true, data: toPublicUser(saved) };
}

export async function deleteUser(id: string, actorId: string): Promise<UserResult<null>> {
  if (!(await ready())) return { ok: false, error: "unavailable" };
  if (id === actorId) return { ok: false, error: "cannot-delete-self" };
  const current = await UserModel.findById(id);
  if (!current) return { ok: false, error: "not-found" };
  if (current.role === "admin") {
    const admins = await UserModel.countDocuments({ role: "admin" });
    if (admins <= 1) return { ok: false, error: "last-admin" };
  }
  await current.deleteOne();
  return { ok: true, data: null };
}
