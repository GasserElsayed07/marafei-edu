"use server";

import { redirect } from "next/navigation";
import { setSessionCookie } from "@/lib/session";
import { authenticate, type UserError } from "@/lib/users";

export async function signIn(
  _previous: { error: UserError } | null,
  formData: FormData,
): Promise<{ error: UserError } | null> {
  const result = await authenticate(String(formData.get("email") ?? ""), String(formData.get("password") ?? ""));
  if (!result.ok) return { error: result.error };
  await setSessionCookie({
    sub: result.data.id,
    email: result.data.email,
    name: result.data.name,
    role: result.data.role,
  });
  redirect(result.data.role === "admin" ? "/admin/" : "/MarafeiEducationPlatform/");
}
