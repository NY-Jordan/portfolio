import { requireAdminUser } from "@/lib/admin/auth";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminUser();

  return <AdminShell>{children}</AdminShell>;
}
