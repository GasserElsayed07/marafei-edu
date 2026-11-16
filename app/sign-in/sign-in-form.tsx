"use client";

import { useActionState } from "react";
import { getCopy } from "@/lib/copy";
import type { Locale } from "@/lib/locale";
import { signIn } from "./actions";

const fieldClass =
  "h-8 w-full rounded-lg border border-line bg-card px-2 text-sm text-foreground outline-none focus:border-brand";

export function SignInForm({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const [state, action, pending] = useActionState(signIn, null);

  return (
    <form action={action} className="grid gap-2">
      <label className="grid gap-1 text-xs text-muted">
        {copy.email}
        <input className={fieldClass} name="email" type="email" autoComplete="username" required />
      </label>
      <label className="grid gap-1 text-xs text-muted">
        {copy.password}
        <input
          className={fieldClass}
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </label>
      {state?.error ? <p className="text-xs text-danger">{copy.errors[state.error]}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-1 h-8 rounded-full bg-brand text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-60"
      >
        {copy.signIn}
      </button>
    </form>
  );
}
