import { createClient } from "@supabase/supabase-js";

/**
 * Anonymous, cookie-free Supabase client for public reads and the
 * anon-scoped RPCs (views/likes/subscribe). Unlike `lib/supabase/server.ts`,
 * this never touches `cookies()`, so it's safe to call from static
 * generation contexts (generateStaticParams, sitemap) that have no request
 * scope. RLS still applies — this client authenticates as the `anon` role.
 */
export const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
