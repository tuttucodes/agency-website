-- Kernel & Oak agency site — leads capture
-- Apply in Supabase SQL editor (Project → SQL Editor → New query)

create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text not null,
  email        text not null,
  company      text,
  scope        text[] not null default '{}',
  brief        text,
  ip           text,
  user_agent   text,
  source       text,
  status       text not null default 'new' check (status in ('new','contacted','qualified','won','lost'))
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx       on public.leads (lower(email));
create index if not exists leads_status_idx      on public.leads (status);

-- RLS: keep table locked down. Writes go through the Server Action
-- using the service_role key (which bypasses RLS by design).
alter table public.leads enable row level security;

-- Deny-by-default. No anon/authenticated policies — service_role only.
revoke all on public.leads from anon, authenticated;
