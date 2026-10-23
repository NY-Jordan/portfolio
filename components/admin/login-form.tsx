"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { signIn, type LoginState } from "@/app/admin/login/actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="label-mono text-muted-foreground">
          Email
        </label>
        <Input id="email" name="email" type="email" required autoComplete="username" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="label-mono text-muted-foreground">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
        />
      </div>
      {state.error ? <Alert variant="error">{state.error}</Alert> : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
