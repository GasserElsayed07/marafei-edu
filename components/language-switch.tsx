"use client";

import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, type Locale } from "@/lib/locale-shared";

export function LanguageSwitch({
  locale,
  tone = "on-brand",
}: {
  locale: Locale;
  tone?: "on-brand" | "on-card";
}) {
  const router = useRouter();
  const onBrand = tone === "on-brand";

  function choose(next: Locale) {
    if (next === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  }

  return (
    <div
      role="tablist"
      aria-label={locale === "ar" ? "اللغة" : "Language"}
      className={`relative grid h-7 w-24 grid-cols-2 rounded-lg p-0.5 text-xs font-semibold ${
        onBrand ? "bg-white/20" : "bg-brand/10"
      }`}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute top-0.5 bottom-0.5 w-[calc(50%-0.125rem)] rounded-md transition-[inset-inline-start] duration-200 ease-out ${
          onBrand ? "bg-white" : "bg-brand"
        }`}
        style={{ insetInlineStart: locale === "ar" ? "0.125rem" : "50%" }}
      />
      <button
        type="button"
        role="tab"
        aria-selected={locale === "ar"}
        onClick={() => choose("ar")}
        className={`relative z-10 rounded-md ${
          locale === "ar" ? (onBrand ? "text-brand" : "text-white") : onBrand ? "text-white" : "text-foreground"
        }`}
      >
        ع
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={locale === "en"}
        onClick={() => choose("en")}
        className={`relative z-10 rounded-md ${
          locale === "en" ? (onBrand ? "text-brand" : "text-white") : onBrand ? "text-white" : "text-foreground"
        }`}
      >
        EN
      </button>
    </div>
  );
}
