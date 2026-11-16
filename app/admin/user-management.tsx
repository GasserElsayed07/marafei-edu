"use client";

import { MoreVertical, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { LanguageSwitch } from "@/components/language-switch";
import { getCopy, type Copy } from "@/lib/copy";
import type { Locale } from "@/lib/locale-shared";
import type { PublicUser, UserError } from "@/lib/users";
import type { UserRole } from "@/lib/jwt";
import { createUser, deleteUser, signOut, updateUser } from "./actions";

const PAGE_SIZE = 10;
const fieldClass =
  "h-8 w-full rounded-lg border border-line bg-card px-2 text-sm text-foreground outline-none focus:border-brand";
const primaryClass =
  "inline-flex h-8 items-center justify-center gap-1 rounded-full bg-brand px-3 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-60";
const quietClass =
  "inline-flex h-8 items-center justify-center rounded-full px-3 text-sm text-foreground hover:bg-brand/10 disabled:opacity-40";

type Draft = { name: string; email: string; password: string; role: UserRole };

const emptyDraft: Draft = { name: "", email: "", password: "", role: "user" };

export function UserManagement({
  locale,
  currentUserId,
  users,
}: {
  locale: Locale;
  currentUserId: string;
  users: PublicUser[];
}) {
  const copy = getCopy(locale);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<PublicUser | null>(null);
  const [deleting, setDeleting] = useState<PublicUser | null>(null);
  const [menu, setMenu] = useState<{ user: PublicUser; top: number; left: number } | null>(null);
  const [createError, setCreateError] = useState<UserError | null>(null);
  const [updateError, setUpdateError] = useState<UserError | null>(null);
  const [deleteError, setDeleteError] = useState<UserError | null>(null);
  const [createPending, setCreatePending] = useState(false);
  const [updatePending, setUpdatePending] = useState(false);
  const [deletePending, setDeletePending] = useState(false);

  async function onCreate(formData: FormData) {
    setCreatePending(true);
    const result = await createUser(null, formData);
    setCreatePending(false);
    if (result && "error" in result) {
      setCreateError(result.error);
      return;
    }
    setCreateError(null);
    setDraft(emptyDraft);
    setCreating(false);
    router.refresh();
  }

  async function onUpdate(formData: FormData) {
    setUpdatePending(true);
    const result = await updateUser(null, formData);
    setUpdatePending(false);
    if (result && "error" in result) {
      setUpdateError(result.error);
      return;
    }
    setUpdateError(null);
    setEditing(null);
    router.refresh();
  }

  async function onDelete(formData: FormData) {
    setDeletePending(true);
    const result = await deleteUser(null, formData);
    setDeletePending(false);
    if (result && "error" in result) {
      setDeleteError(result.error);
      return;
    }
    setDeleteError(null);
    setDeleting(null);
    router.refresh();
  }

  useEffect(() => {
    if (!menu) return;
    function close() {
      setMenu(null);
    }
    window.addEventListener("resize", close);
    window.addEventListener("scroll", close, true);
    return () => {
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", close, true);
    };
  }, [menu]);

  const adminCount = users.filter((user) => user.role === "admin").length;
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return users;
    return users.filter(
      (user) => user.name.toLowerCase().includes(needle) || user.email.toLowerCase().includes(needle),
    );
  }, [query, users]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * PAGE_SIZE;
  const rows = filtered.slice(start, start + PAGE_SIZE);
  const from = filtered.length === 0 ? 0 : start + 1;
  const to = Math.min(start + PAGE_SIZE, filtered.length);
  const dateFormat = new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en", { dateStyle: "medium" });

  function openMenu(user: PublicUser, button: HTMLButtonElement) {
    const rect = button.getBoundingClientRect();
    const menuWidth = 144;
    const left = Math.max(8, Math.min(rect.right - menuWidth, window.innerWidth - menuWidth - 8));
    setMenu({ user, top: rect.bottom + 4, left });
  }

  return (
    <div
      lang={locale === "ar" ? "ar" : "en"}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="min-h-full w-full min-w-0 max-w-full"
    >
      <div className="overflow-x-clip">
      <header className="flex min-h-12 flex-wrap items-center gap-x-2 gap-y-2 bg-brand px-3 py-2 text-white">
        <div className="flex min-w-0 basis-full items-center gap-2 sm:basis-auto">
          <h1 className="min-w-0 truncate text-sm font-semibold">
            {locale === "ar" ? `${copy.users} ${copy.appName}` : `${copy.appName} ${copy.users}`}
          </h1>
          <a
            href="/MarafeiEducationPlatform/"
            className="inline-flex h-7 shrink-0 items-center rounded-full bg-white px-2.5 text-xs font-medium text-brand hover:bg-white/90"
          >
            {copy.openPlatform}
          </a>
        </div>
        <div className="ms-auto flex shrink-0 items-center gap-2">
          <LanguageSwitch locale={locale} />
          <form action={signOut}>
            <button
              type="submit"
              className="h-7 rounded-full bg-white/15 px-3 text-xs font-medium hover:bg-white/25"
            >
              {copy.signOut}
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto grid w-full min-w-0 max-w-5xl gap-2 p-3">
        <div className="flex flex-wrap items-center gap-2">
          <label className="relative min-w-0 flex-1 basis-full sm:basis-0">
            <span className="sr-only">{copy.search}</span>
            <Search className="pointer-events-none absolute start-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder={copy.search}
              className="h-8 w-full rounded-full border border-line bg-card ps-8 pe-3 text-sm outline-none focus:border-brand"
            />
          </label>
          <button type="button" className={`${primaryClass} w-full sm:w-auto`} onClick={() => setCreating(true)}>
            <Plus className="size-3.5" />
            {copy.addUser}
          </button>
        </div>

        <div className="min-w-0 overflow-hidden rounded-xl border border-line bg-card">
          <ul className="divide-y divide-line lg:hidden">
            {rows.length === 0 ? (
              <li className="px-3 py-3 text-center text-xs text-muted">{copy.noUsers}</li>
            ) : (
              rows.map((user) => (
                <li key={user.id} className="flex items-start gap-2 px-3 py-2">
                  <div className="min-w-0 flex-1">
                    <p className="break-words text-sm font-medium">{user.name}</p>
                    <p className="mt-0.5 break-all text-xs text-muted">{user.email}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          user.role === "admin" ? "badge-admin" : "badge-user"
                        }`}
                      >
                        {user.role === "admin" ? copy.admin : copy.user}
                      </span>
                      <span className="text-xs text-muted">{dateFormat.format(new Date(user.createdAt))}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-label={`${copy.actions}: ${user.name}`}
                    title={copy.actions}
                    className="group relative inline-flex size-7 shrink-0 items-center justify-center rounded-full hover:bg-brand/10"
                    onClick={(event) => openMenu(user, event.currentTarget)}
                  >
                    <MoreVertical className="size-4" />
                    <span className="pointer-events-none absolute bottom-full end-0 z-10 mb-1 hidden rounded bg-foreground px-1.5 py-0.5 text-[10px] whitespace-nowrap text-white group-hover:block group-focus-visible:block">
                      {copy.actions}
                    </span>
                  </button>
                </li>
              ))
            )}
          </ul>
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-brand/10 text-xs text-muted">
                <tr>
                  <th className="px-3 py-2 text-start font-medium">{copy.name}</th>
                  <th className="px-3 py-2 text-start font-medium">{copy.email}</th>
                  <th className="px-3 py-2 text-start font-medium">{copy.role}</th>
                  <th className="px-3 py-2 text-start font-medium">{copy.created}</th>
                  <th className="w-12 px-2 py-2">
                    <span className="sr-only">{copy.actions}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-3 py-3 text-center text-xs text-muted">
                      {copy.noUsers}
                    </td>
                  </tr>
                ) : (
                  rows.map((user) => (
                    <tr key={user.id} className="border-t border-line">
                      <td className="px-3 py-1.5">{user.name}</td>
                      <td className="break-all px-3 py-1.5">{user.email}</td>
                      <td className="px-3 py-1.5">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs ${
                            user.role === "admin" ? "badge-admin" : "badge-user"
                          }`}
                        >
                          {user.role === "admin" ? copy.admin : copy.user}
                        </span>
                      </td>
                      <td className="px-3 py-1.5 text-muted">{dateFormat.format(new Date(user.createdAt))}</td>
                      <td className="px-2 py-1.5 text-center">
                        <button
                          type="button"
                          aria-haspopup="menu"
                          aria-label={`${copy.actions}: ${user.name}`}
                          title={copy.actions}
                          className="group relative inline-flex size-7 items-center justify-center rounded-full hover:bg-brand/10"
                          onClick={(event) => openMenu(user, event.currentTarget)}
                        >
                          <MoreVertical className="size-4" />
                          <span className="pointer-events-none absolute bottom-full z-10 mb-1 hidden rounded bg-foreground px-1.5 py-0.5 text-[10px] text-white group-hover:block group-focus-visible:block">
                            {copy.actions}
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-3 py-2 text-xs text-muted">
            <p className="min-w-0">{copy.records(from, to, filtered.length)}</p>
            <div className="flex gap-1">
              <button
                type="button"
                className={quietClass}
                disabled={currentPage <= 1}
                onClick={() => setPage(currentPage - 1)}
              >
                {copy.previous}
              </button>
              <button
                type="button"
                className={quietClass}
                disabled={currentPage >= pageCount}
                onClick={() => setPage(currentPage + 1)}
              >
                {copy.next}
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>

      {menu ? (
        <button
          type="button"
          aria-label={copy.cancel}
          className="fixed inset-0 z-20 cursor-default"
          onClick={() => setMenu(null)}
        />
      ) : null}
      {menu ? (
        <div
          role="menu"
          className="fixed z-30 w-36 overflow-hidden rounded-lg border border-line bg-card py-1 text-sm shadow-sm"
          style={{ top: menu.top, left: menu.left }}
        >
          <button
            type="button"
            role="menuitem"
            className="block w-full px-3 py-1.5 text-start hover:bg-brand/10"
            onClick={() => {
              setEditing(menu.user);
              setMenu(null);
            }}
          >
            {copy.edit}
          </button>
          {menu.user.id !== currentUserId && (menu.user.role !== "admin" || adminCount > 1) ? (
            <button
              type="button"
              role="menuitem"
              className="block w-full px-3 py-1.5 text-start text-danger hover:bg-danger/10"
              onClick={() => {
                setDeleting(menu.user);
                setMenu(null);
              }}
            >
              {copy.delete}
            </button>
          ) : null}
        </div>
      ) : null}

      <UserDialog
        open={creating}
        title={copy.createTitle}
        copy={copy}
        action={onCreate}
        pending={createPending}
        error={createError}
        draft={draft}
        onDraft={setDraft}
        onClose={() => setCreating(false)}
      />
      <UserDialog
        open={editing !== null}
        title={copy.editTitle}
        copy={copy}
        action={onUpdate}
        pending={updatePending}
        error={updateError}
        userId={editing?.id}
        lockAdminRole={editing?.role === "admin" && adminCount <= 1}
        draft={
          editing
            ? { name: editing.name, email: editing.email, password: "", role: editing.role }
            : emptyDraft
        }
        passwordPlaceholder={copy.passwordOptional}
        onClose={() => setEditing(null)}
      />
      <ConfirmDialog
        user={deleting}
        copy={copy}
        action={onDelete}
        pending={deletePending}
        error={deleteError}
        onClose={() => setDeleting(null)}
      />
    </div>
  );
}

function UserDialog({
  open,
  title,
  copy,
  action,
  pending,
  error,
  draft,
  onDraft,
  userId,
  lockAdminRole,
  passwordPlaceholder,
  onClose,
}: {
  open: boolean;
  title: string;
  copy: Copy;
  action: (formData: FormData) => void | Promise<void>;
  pending: boolean;
  error: UserError | null;
  draft: Draft;
  onDraft?: (draft: Draft) => void;
  userId?: string;
  lockAdminRole?: boolean;
  passwordPlaceholder?: string;
  onClose: () => void;
}) {
  const ref = useDialog(open);
  const controlled = Boolean(onDraft);

  return (
    <dialog
      ref={ref}
      className="dialog-pop m-auto w-[min(100%-1.5rem,32rem)] rounded-xl border border-line bg-card p-3 text-foreground"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <form key={userId ?? "create"} action={action} className="grid gap-2">
        <h2 className="text-sm font-semibold">{title}</h2>
        {userId ? <input type="hidden" name="id" value={userId} /> : null}
        <div className="grid gap-2 sm:grid-cols-2">
          <label className="grid gap-1 text-xs text-muted">
            {copy.name}
            <input
              className={fieldClass}
              name="name"
              required
              value={controlled ? draft.name : undefined}
              defaultValue={controlled ? undefined : draft.name}
              onChange={onDraft ? (event) => onDraft({ ...draft, name: event.target.value }) : undefined}
            />
          </label>
          <label className="grid gap-1 text-xs text-muted">
            {copy.email}
            <input
              className={fieldClass}
              name="email"
              type="email"
              required
              value={controlled ? draft.email : undefined}
              defaultValue={controlled ? undefined : draft.email}
              onChange={onDraft ? (event) => onDraft({ ...draft, email: event.target.value }) : undefined}
            />
          </label>
          <label className="grid gap-1 text-xs text-muted">
            {copy.password}
            <input
              className={fieldClass}
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder={passwordPlaceholder}
              required={!passwordPlaceholder}
              value={controlled ? draft.password : undefined}
              onChange={
                onDraft ? (event) => onDraft({ ...draft, password: event.target.value }) : undefined
              }
            />
          </label>
          <label className="grid gap-1 text-xs text-muted">
            {copy.role}
            <select
              className={fieldClass}
              name="role"
              value={controlled ? draft.role : undefined}
              defaultValue={controlled ? undefined : draft.role}
              onChange={
                onDraft ? (event) => onDraft({ ...draft, role: event.target.value as UserRole }) : undefined
              }
            >
              <option value="admin">{copy.admin}</option>
              <option value="user" disabled={lockAdminRole}>
                {copy.user}
              </option>
            </select>
          </label>
        </div>
        {error ? <p className="text-xs text-danger">{copy.errors[error]}</p> : null}
        <div className="flex flex-wrap justify-end gap-2">
          <button type="button" className={quietClass} onClick={onClose}>
            {copy.cancel}
          </button>
          <button type="submit" className={primaryClass} disabled={pending}>
            {copy.save}
          </button>
        </div>
      </form>
    </dialog>
  );
}

function ConfirmDialog({
  user,
  copy,
  action,
  pending,
  error,
  onClose,
}: {
  user: PublicUser | null;
  copy: Copy;
  action: (formData: FormData) => void | Promise<void>;
  pending: boolean;
  error: UserError | null;
  onClose: () => void;
}) {
  const ref = useDialog(user !== null);

  return (
    <dialog
      ref={ref}
      className="m-auto w-[min(100%-1.5rem,24rem)] rounded-xl border border-line bg-card p-3 text-foreground"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <form action={action} className="grid gap-3">
        <h2 className="text-sm font-semibold">{copy.deleteTitle}</h2>
        <input type="hidden" name="id" value={user?.id ?? ""} />
        <p className="break-words text-sm">
          <strong className="text-brand">{user?.name}</strong> {copy.deleteWill}{" "}
          <strong className="text-danger">{copy.deleteVerb}</strong>
        </p>
        {error ? <p className="text-xs text-danger">{copy.errors[error]}</p> : null}
        <div className="flex flex-wrap justify-end gap-2">
          <button type="button" className={quietClass} onClick={onClose}>
            {copy.cancel}
          </button>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex h-8 items-center justify-center rounded-full bg-danger px-3 text-sm font-medium text-white disabled:opacity-60"
          >
            {copy.delete}
          </button>
        </div>
      </form>
    </dialog>
  );
}

function useDialog(open: boolean) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return ref;
}
