-- =====================================================================
-- Enoch's Outpost — Schema update v2
-- Run once in Supabase SQL Editor, AFTER schema.sql.
-- Adds: audio sermons, Bible Studies table, editable homepage/about copy,
-- Storage buckets for real file uploads, and a purchases scaffold for
-- the future M-Pesa flow. Safe to re-run (everything is if-not-exists).
-- =====================================================================

-- ---------- SERMONS: support audio uploads alongside YouTube ----------

alter table public.sermons
  add column if not exists sermon_type text not null default 'youtube', -- 'youtube' | 'audio'
  add column if not exists audio_url text;

-- ---------- BIBLE STUDIES ----------

create table if not exists public.bible_studies (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text not null,
  lessons int not null default 1,
  image text,
  created_at timestamptz not null default now()
);

alter table public.bible_studies enable row level security;
drop policy if exists "public_read_bible_studies" on public.bible_studies;
create policy "public_read_bible_studies" on public.bible_studies for select using (true);
drop policy if exists "admin_write_bible_studies" on public.bible_studies;
create policy "admin_write_bible_studies" on public.bible_studies for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ---------- SITE CONTENT (editable homepage / about copy) ----------
-- Same key/value pattern as site_settings, but for long-form marketing
-- copy: hero heading, hero subtext, about mission/vision/history, and the
-- four ministry-area blurbs. Frontend falls back to hardcoded defaults
-- when a key is missing, exactly like site_settings does for contact info.

create table if not exists public.site_content (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

insert into public.site_content (key, value) values
  ('hero_eyebrow', 'Enoch''s Outpost Ministry'),
  ('hero_title', 'Pointing Hearts to Jesus and the Everlasting Gospel'),
  ('hero_subtitle', 'A Bible-based ministry serving Nyeri and beyond through prophecy, health, family, and children''s outreach.'),
  ('about_mission', 'To proclaim the everlasting gospel and the soon return of Jesus Christ through Bible truth, health education, and practical family ministry.'),
  ('about_vision', 'A community transformed by the character of God, prepared to meet Him in peace.'),
  ('about_history', 'Enoch''s Outpost began as a small group of believers in Nyeri committed to sharing present truth through evangelism, literature, and health outreach, and has since grown into a multi-ministry outreach.'),
  ('ministry_health_blurb', 'Biblical health principles, nutrition, and natural living for whole-person restoration.'),
  ('ministry_prophecy_blurb', 'Daniel, Revelation, the Sanctuary, and the Three Angels'' Messages explained simply.'),
  ('ministry_children_blurb', 'Bible stories, Sabbath resources, and devotionals that plant Scripture in young hearts.'),
  ('ministry_family_blurb', 'Marriage, parenting, and family worship resources for Christ-centered homes.')
on conflict (key) do nothing;

alter table public.site_content enable row level security;
drop policy if exists "public_read_site_content" on public.site_content;
create policy "public_read_site_content" on public.site_content for select using (true);
drop policy if exists "admin_write_site_content" on public.site_content;
create policy "admin_write_site_content" on public.site_content for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ---------- PURCHASES (scaffold only — not used until M-Pesa is added) ----------

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  book_id uuid references public.books(id) on delete set null,
  buyer_name text,
  buyer_email text,
  buyer_phone text,
  amount numeric not null default 0,
  transaction_id text,
  payment_status text not null default 'pending', -- pending | paid | failed
  created_at timestamptz not null default now()
);

alter table public.purchases enable row level security;
drop policy if exists "admin_manage_purchases" on public.purchases;
create policy "admin_manage_purchases" on public.purchases for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
-- No public read/insert policy yet on purpose: purchases will be created
-- server-side (service role) once the M-Pesa STK flow is built, not by
-- anonymous clients directly.

-- ---------- STORAGE BUCKETS (real file uploads) ----------
-- All four buckets are public-read (covers/thumbnails/gallery/audio are
-- meant to be publicly viewable/playable); the *ebook files themselves*
-- go in a separate private bucket so they are NOT publicly downloadable —
-- only a purchaser (via a future signed-URL flow) or an authenticated
-- admin can fetch them.

insert into storage.buckets (id, name, public)
values
  ('book-covers', 'book-covers', true),
  ('sermon-media', 'sermon-media', true),   -- thumbnails + audio files
  ('gallery-images', 'gallery-images', true),
  ('site-images', 'site-images', true),     -- news/testimonials/gardening/health/articles/bible studies images
  ('ebook-files', 'ebook-files', false)     -- private: not publicly downloadable
on conflict (id) do nothing;

drop policy if exists "public_read_public_buckets" on storage.objects;
create policy "public_read_public_buckets" on storage.objects for select
  using (bucket_id in ('book-covers', 'sermon-media', 'gallery-images', 'site-images'));

drop policy if exists "admin_write_public_buckets" on storage.objects;
create policy "admin_write_public_buckets" on storage.objects for all
  using (bucket_id in ('book-covers', 'sermon-media', 'gallery-images', 'site-images') and auth.role() = 'authenticated')
  with check (bucket_id in ('book-covers', 'sermon-media', 'gallery-images', 'site-images') and auth.role() = 'authenticated');

drop policy if exists "admin_only_ebook_files" on storage.objects;
create policy "admin_only_ebook_files" on storage.objects for all
  using (bucket_id = 'ebook-files' and auth.role() = 'authenticated')
  with check (bucket_id = 'ebook-files' and auth.role() = 'authenticated');
-- NOTE: this means only a logged-in admin can currently read ebook files
-- too (there's no "purchaser" role yet). That's intentional for now — the
-- secure-download-for-purchasers flow is part of the future M-Pesa phase.
