import Image from "next/image";
import { Suspense } from "react";
import { LanguageSwitch } from "@/components/language-switch";
import { getCopy } from "@/lib/copy";
import { getLocale } from "@/lib/locale";
import { getMarafeiLogoSrc } from "@/lib/marafei-logo";
import { SignInForm } from "./sign-in-form";

export default function SignInPage() {
  return (
    <Suspense fallback={<main className="min-h-svh" />}>
      <SignInContent />
    </Suspense>
  );
}

async function SignInContent() {
  const locale = await getLocale();
  const copy = getCopy(locale);
  const logoSrc = getMarafeiLogoSrc();

  return (
    <main
      lang={locale === "ar" ? "ar" : "en"}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="grid min-h-svh place-items-center p-4"
    >
      <section className="w-full max-w-sm rounded-2xl border border-line bg-card p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between gap-3">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt={copy.appName}
              width={140}
              height={40}
              className="h-8 w-auto max-w-[9rem] object-contain object-start"
              priority
            />
          ) : (
            <p className="text-sm font-semibold text-brand">{copy.appName}</p>
          )}
          <LanguageSwitch locale={locale} tone="on-card" />
        </div>
        <h1 className="mb-3 text-base font-semibold">{copy.signIn}</h1>
        <SignInForm locale={locale} />
      </section>
    </main>
  );
}
