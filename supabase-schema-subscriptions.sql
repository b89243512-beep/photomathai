-- Run this in Supabase SQL Editor
-- Adds subscription tracking columns to users table

ALTER TABLE public.users ADD COLUMN IF NOT EXISTS subscription_id text;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS subscription_status text;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS subscription_variant text;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS subscription_renews_at timestamptz;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS subscription_ends_at timestamptz;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS customer_id text;

CREATE INDEX IF NOT EXISTS users_subscription_id_idx ON public.users(subscription_id);
CREATE INDEX IF NOT EXISTS users_customer_id_idx ON public.users(customer_id);

-- Subscription events log (webhook history)
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
