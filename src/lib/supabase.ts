import { createClient } from "@supabase/supabase-js";

/**
 * Server-side admin client with service_role key.
 * Only use in server code (API routes, server components, auth callbacks).
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export interface DbUser {
  id: string;
  google_id: string;
  email: string;
  name: string | null;
  image: string | null;
  plan: "free" | "pro";
  created_at: string;
  last_login_at: string;
}

/** Upsert user on login — creates row if new, updates last_login_at if exists */
export async function upsertUser(params: {
  googleId: string;
  email: string;
  name?: string | null;
  image?: string | null;
}): Promise<DbUser | null> {
  const { data, error } = await supabaseAdmin
    .from("users")
    .upsert(
      {
        google_id: params.googleId,
        email: params.email,
        name: params.name ?? null,
        image: params.image ?? null,
        last_login_at: new Date().toISOString(),
      },
      { onConflict: "google_id" }
    )
    .select()
    .single();

  if (error) {
    console.error("upsertUser error:", error);
    return null;
  }
  return data as DbUser;
}

/** Get user by google_id */
export async function getUserByGoogleId(googleId: string): Promise<DbUser | null> {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("google_id", googleId)
    .single();

  if (error) return null;
  return data as DbUser;
}

/** Count today's usage for a user */
export async function getTodayUsage(userId: string, action: string = "solve"): Promise<number> {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const { count, error } = await supabaseAdmin
    .from("usage_log")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("action", action)
    .gte("created_at", todayStart.toISOString());

  if (error) {
    console.error("getTodayUsage error:", error);
    return 0;
  }
  return count ?? 0;
}

/** Log a usage event */
export async function logUsage(userId: string, action: string = "solve"): Promise<void> {
  const { error } = await supabaseAdmin
    .from("usage_log")
    .insert({ user_id: userId, action });
  if (error) console.error("logUsage error:", error);
}

/** Count total all-time usage for a user (for free-trial check) */
export async function getTotalUsage(userId: string, action: string = "solve"): Promise<number> {
  const { count, error } = await supabaseAdmin
    .from("usage_log")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("action", action);
  if (error) {
    console.error("getTotalUsage error:", error);
    return 0;
  }
  return count ?? 0;
}

/** Free users get 1 free solve before paywall */
export const FREE_TRIAL_SOLVES = 1;

/** Save a solution to history */
export async function saveSolution(params: {
  userId: string;
  question: string;
  solution: string;
}): Promise<void> {
  const { error } = await supabaseAdmin.from("solutions").insert({
    user_id: params.userId,
    question: params.question.slice(0, 2000),
    solution: params.solution.slice(0, 20000),
  });
  if (error) console.error("saveSolution error:", error);
}

/** Daily usage limits per plan. Free tier disabled — must upgrade to Pro. */
export const DAILY_LIMITS = {
  free: 0,
  pro: 1000,
} as const;
