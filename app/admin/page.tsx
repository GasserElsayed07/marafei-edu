import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getLocale } from "@/lib/locale";
import { getSession } from "@/lib/session";
import { listUsers } from "@/lib/users";
import { UserManagement } from "./user-management";

export default function AdminPage() {
  return (
    <Suspense fallback={<main className="min-h-full bg-brand" />}>
      <AdminContent />
    </Suspense>
  );
}

async function AdminContent() {
  const session = await getSession();
  if (!session || session.role !== "admin") redirect("/sign-in/");

  const [locale, users] = await Promise.all([getLocale(), listUsers()]);

  return <UserManagement locale={locale} currentUserId={session.sub} users={users} />;
}
