-- Run this in Supabase SQL Editor
-- Public schema, simple users table + usage tracking

CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  google_id text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  name text,
  image text,
  plan text DEFAULT 'free' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  last_login_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS users_google_id_idx ON public.users(google_id);
CREATE INDEX IF NOT EXISTS users_email_idx ON public.users(email);

-- Usage log for rate limiting / analytics
CREATE TABLE IF NOT EXISTS public.usage_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  action text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS usage_log_user_id_idx ON public.usage_log(user_id);
CREATE INDEX IF NOT EXISTS usage_log_created_at_idx ON public.usage_log(created_at);

-- Solution history (optional, for user's solved problems)
CREATE TABLE IF NOT EXISTS public.solutions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  question text,
  solution text,
  created_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS solutions_user_id_idx ON public.solutions(user_id);
CREATE INDEX IF NOT EXISTS solutions_created_at_idx ON public.solutions(created_at);
