"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearSessionCookie, getSession } from "@/lib/session";
import {
  createUser as createUserRecord,
  deleteUser as deleteUserRecord,
  updateUser as updateUserRecord,
  type FormState,
} from "@/lib/users";

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "admin") redirect("/sign-in/");
  return session;
}

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "");
}

export async function createUser(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const result = await createUserRecord({
    name: value(formData, "name"),
    email: value(formData, "email"),
    password: value(formData, "password"),
    role: value(formData, "role"),
  });
  if (!result.ok) return { error: result.error };
  revalidatePath("/admin");
  return { ok: true };
}

export async function updateUser(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const result = await updateUserRecord({
    id: value(formData, "id"),
    name: value(formData, "name"),
    email: value(formData, "email"),
    password: value(formData, "password"),
    role: value(formData, "role"),
  });
  if (!result.ok) return { error: result.error };
  revalidatePath("/admin");
  return { ok: true };
}

export async function deleteUser(_previous: FormState, formData: FormData): Promise<FormState> {
  const session = await requireAdmin();
  const result = await deleteUserRecord(value(formData, "id"), session.sub);
  if (!result.ok) return { error: result.error };
  revalidatePath("/admin");
  return { ok: true };
}

export async function signOut() {
  await clearSessionCookie();
  redirect("/sign-in/");
}
