import { LoginForm } from "@/components/admin/login-form";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-6">
      <div className="flex w-full max-w-sm flex-col gap-8">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Admin login
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
