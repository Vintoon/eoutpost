-- =====================================================================
-- Enoch's Outpost Ministry — Supabase schema
-- Run this whole file once in Supabase: Dashboard > SQL Editor > New query
-- =====================================================================

create extension if not exists "pgcrypto";

-- ---------- CONTENT TABLES ----------

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text not null,
  content text,
  category text not null default 'General',
  read_time text default '5 min read',
  date date not null default current_date,
  image text,
  created_at timestamptz not null default now()
);

create table if not exists public.sermons (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  speaker text not null,
  duration text,
  date date not null default current_date,
  category text not null default 'General',
  youtube_id text,
  thumbnail text,
  created_at timestamptz not null default now()
);

create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text not null,
  price numeric not null default 0,
  category text not null default 'General',
  cover text,
  description text,
  pages int,
  file_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  category text not null default 'Evangelism',
  image text not null,
  caption text,
  created_at timestamptz not null default now()
);

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text not null,
  content text,
  image text,
  date date not null default current_date,
  created_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text,
  message text not null,
  image text,
  created_at timestamptz not null default now()
);

create table if not exists public.gardening_tips (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text not null,
  content text,
  image text,
  season text,
  created_at timestamptz not null default now()
);

create table if not exists public.health_articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text not null,
  content text,
  image text,
  category text,
  created_at timestamptz not null default now()
);

create table if not exists public.donation_channels (
  id uuid primary key default gen_random_uuid(),
  method text not null,
  details text not null,
  instructions text,
  created_at timestamptz not null default now()
);

-- key/value site settings (phone, whatsapp, email, youtube, address, etc.)
create table if not exists public.site_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (key, value) values
  ('phone', '+254110040420'),
  ('whatsapp', '+254110040420'),
  ('whatsappLink', 'https://wa.me/254110040420'),
  ('email', 'enochsoutpost@gmail.com'),
  ('youtube', 'https://www.youtube.com/@info.enochsoutpost'),
  ('youtubeHandle', '@info.enochsoutpost'),
  ('location', 'Nyeri, Kenya')
on conflict (key) do nothing;

-- ---------- VISITOR SUBMISSIONS ----------

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.prayer_requests (
  id uuid primary key default gen_random_uuid(),
  name text,
  message text not null,
  is_prayed boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- =====================================================================
-- ROW LEVEL SECURITY
-- Public (anon) can READ published content and INSERT into the three
-- submission tables above. Only authenticated users (your admin login,
-- created manually in Supabase Auth) can write to content tables or
-- read/manage submissions.
-- =====================================================================

alter table public.articles enable row level security;
alter table public.sermons enable row level security;
alter table public.books enable row level security;
alter table public.gallery enable row level security;
alter table public.news enable row level security;
alter table public.testimonials enable row level security;
alter table public.gardening_tips enable row level security;
alter table public.health_articles enable row level security;
alter table public.donation_channels enable row level security;
alter table public.site_settings enable row level security;
alter table public.contact_messages enable row level security;
alter table public.prayer_requests enable row level security;
alter table public.newsletter_subscribers enable row level security;

-- Public read access to content tables
do $$
declare t text;
begin
  foreach t in array array['articles','sermons','books','gallery','news','testimonials','gardening_tips','health_articles','donation_channels','site_settings']
  loop
    execute format('drop policy if exists "public_read_%1$s" on public.%1$s;', t);
    execute format('create policy "public_read_%1$s" on public.%1$s for select using (true);', t);
    execute format('drop policy if exists "admin_write_%1$s" on public.%1$s;', t);
    execute format('create policy "admin_write_%1$s" on public.%1$s for all using (auth.role() = ''authenticated'') with check (auth.role() = ''authenticated'');', t);
  end loop;
end $$;

-- Public can submit; only admins can read/manage submissions
drop policy if exists "public_insert_contact" on public.contact_messages;
create policy "public_insert_contact" on public.contact_messages for insert with check (true);
drop policy if exists "admin_manage_contact" on public.contact_messages;
create policy "admin_manage_contact" on public.contact_messages for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "public_insert_prayer" on public.prayer_requests;
create policy "public_insert_prayer" on public.prayer_requests for insert with check (true);
drop policy if exists "admin_manage_prayer" on public.prayer_requests;
create policy "admin_manage_prayer" on public.prayer_requests for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "public_insert_newsletter" on public.newsletter_subscribers;
create policy "public_insert_newsletter" on public.newsletter_subscribers for insert with check (true);
drop policy if exists "admin_manage_newsletter" on public.newsletter_subscribers;
create policy "admin_manage_newsletter" on public.newsletter_subscribers for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- =====================================================================
-- Seed a starter row in each content table so the CMS isn't empty.
-- Safe to delete/edit from the admin dashboard afterwards.
-- =====================================================================
insert into public.donation_channels (method, details, instructions) values
  ('M-Pesa Paybill', 'Paybill: 000000 · Account: ENOCHSOUTPOST', 'Go to M-Pesa > Lipa na M-Pesa > Pay Bill.'),
  ('WhatsApp / Direct Contact', '+254110040420', 'Message us directly to arrange a donation.')
on conflict do nothing;
