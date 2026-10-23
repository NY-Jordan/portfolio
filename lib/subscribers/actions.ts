"use server";

import { supabasePublic } from "@/lib/supabase/public";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface SubscribeState {
  status?: "success" | "duplicate" | "error";
}

export async function subscribeAction(
  _prevState: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (!EMAIL_RE.test(email)) {
    return { status: "error" };
  }

  const { error } = await supabasePublic.from("subscribers").insert({ email });

  if (error) {
    return { status: error.code === "23505" ? "duplicate" : "error" };
  }

  return { status: "success" };
}
