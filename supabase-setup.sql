-- ==========================================================
-- PhotoMath AI — Complete Supabase Setup
-- Run this in Supabase SQL Editor (dashboard → SQL → New query)
-- ==========================================================

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  google_id text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  name text,
  image text,
  plan text DEFAULT 'free' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  last_login_at timestamptz DEFAULT now() NOT NULL,
  -- Subscription fields
  subscription_id text,
  subscription_status text,
  subscription_variant text,
  subscription_renews_at timestamptz,
  subscription_ends_at timestamptz,
  customer_id text
);

CREATE INDEX IF NOT EXISTS users_google_id_idx ON public.users(google_id);
CREATE INDEX IF NOT EXISTS users_email_idx ON public.users(email);
CREATE INDEX IF NOT EXISTS users_subscription_id_idx ON public.users(subscription_id);
CREATE INDEX IF NOT EXISTS users_customer_id_idx ON public.users(customer_id);

-- 2. USAGE LOG
CREATE TABLE IF NOT EXISTS public.usage_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  action text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS usage_log_user_id_idx ON public.usage_log(user_id);
CREATE INDEX IF NOT EXISTS usage_log_created_at_idx ON public.usage_log(created_at);

-- 3. SOLUTIONS HISTORY
CREATE TABLE IF NOT EXISTS public.solutions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  question text,
  solution text,
  created_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS solutions_user_id_idx ON public.solutions(user_id);
CREATE INDEX IF NOT EXISTS solutions_created_at_idx ON public.solutions(created_at);

-- 4. SUBSCRIPTION EVENTS (webhook audit log)
CREATE TABLE IF NOT EXISTS public.subscription_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  event_name text NOT NULL,
  subscription_id text,
  payload jsonb,
  created_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS sub_events_user_id_idx ON public.subscription_events(user_id);
CREATE INDEX IF NOT EXISTS sub_events_created_at_idx ON public.subscription_events(created_at);

-- 5. DISABLE RLS on all tables (service_role key handles access)
-- If RLS is enabled but no policies exist, all queries will fail silently.
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_log DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.solutions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_events DISABLE ROW LEVEL SECURITY;
