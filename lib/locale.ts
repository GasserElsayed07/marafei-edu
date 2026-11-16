import { cookies } from "next/headers";
import { LOCALE_COOKIE, type Locale } from "./locale-shared";

export type { Locale };

export async function getLocale(): Promise<Locale> {
  const value = (await cookies()).get(LOCALE_COOKIE)?.value;
  return value === "en" ? "en" : "ar";
}
