-- Enoch's Outpost — Schema update v3
-- Adds: Events (a whole missing CMS section from the original brief), and
-- a real publish/unpublish workflow — until now every table's RLS was
-- "public can read everything", so anything an admin added went live
-- instantly with no way to save a draft first.

-- ---------- EVENTS ----------

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  date date not null,
  time text,
  location text,
  image text,
  registration_url text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;
drop policy if exists "public_read_events" on public.events;
create policy "public_read_events" on public.events for select using (published = true);
drop policy if exists "admin_write_events" on public.events;
create policy "admin_write_events" on public.events for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ---------- PUBLISH / UNPUBLISH on existing content tables ----------
-- Each table gets a `published` column (default true, so nothing already
-- live disappears). The public-read policy is narrowed to published = true;
-- the existing admin_write_<table> policy already grants admins full
-- SELECT/INSERT/UPDATE/DELETE (it's a `for all`), so logged-in admins keep
-- seeing everything, drafts included, in /admin.

alter table public.news add column if not exists published boolean not null default true;
alter table public.articles add column if not exists published boolean not null default true;
alter table public.bible_studies add column if not exists published boolean not null default true;
alter table public.sermons add column if not exists published boolean not null default true;
alter table public.books add column if not exists published boolean not null default true;
alter table public.gallery add column if not exists published boolean not null default true;

drop policy if exists "public_read_news" on public.news;
create policy "public_read_news" on public.news for select using (published = true);

drop policy if exists "public_read_articles" on public.articles;
create policy "public_read_articles" on public.articles for select using (published = true);

drop policy if exists "public_read_bible_studies" on public.bible_studies;
create policy "public_read_bible_studies" on public.bible_studies for select using (published = true);

drop policy if exists "public_read_sermons" on public.sermons;
create policy "public_read_sermons" on public.sermons for select using (published = true);

drop policy if exists "public_read_books" on public.books;
create policy "public_read_books" on public.books for select using (published = true);

drop policy if exists "public_read_gallery" on public.gallery;
create policy "public_read_gallery" on public.gallery for select using (published = true);
