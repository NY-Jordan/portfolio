"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { subscribeAction, type SubscribeState } from "@/lib/subscribers/actions";

const initialState: SubscribeState = {};

export function SubscribeForm({
  title,
  placeholder,
  cta,
  successMessage,
  duplicateMessage,
  errorMessage,
}: {
  title: string;
  placeholder: string;
  cta: string;
  successMessage: string;
  duplicateMessage: string;
  errorMessage: string;
}) {
  const [state, formAction, pending] = useActionState(subscribeAction, initialState);

  return (
    <div className="flex flex-col gap-3">
      <p className="label-mono text-muted-foreground">{title}</p>
      <form action={formAction} className="flex flex-wrap gap-2">
        <Input
          type="email"
          name="email"
          placeholder={placeholder}
          required
          className="h-10 w-56"
        />
        <Button type="submit" size="sm" disabled={pending}>
          {cta}
        </Button>
      </form>
      {state.status === "success" ? (
        <Alert variant="success" className="w-fit">
          {successMessage}
        </Alert>
      ) : null}
      {state.status === "duplicate" ? (
        <Alert variant="success" className="w-fit">
          {duplicateMessage}
        </Alert>
      ) : null}
      {state.status === "error" ? (
        <Alert variant="error" className="w-fit">
          {errorMessage}
        </Alert>
      ) : null}
    </div>
  );
}
