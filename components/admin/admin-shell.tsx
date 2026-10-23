import Link from "next/link";

import { Button } from "@/components/ui/button";
import { signOut } from "@/app/admin/(protected)/actions";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-6 py-8 lg:px-8">
      <header className="flex items-center justify-between border-b border-border pb-6">
        <Link href="/admin" className="font-display text-lg font-semibold tracking-tight">
          Admin
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/articles/new"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            New article
          </Link>
          <form action={signOut}>
            <Button type="submit" variant="outline" size="sm">
              Log out
            </Button>
          </form>
        </div>
      </header>
      <main className="flex-1 py-10">{children}</main>
    </div>
  );
}
