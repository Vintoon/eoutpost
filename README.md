# Enoch's Outpost Ministry — Website

A Next.js 15 website for Enoch's Outpost Ministry, built with TypeScript,
Tailwind CSS, Framer Motion, and Lucide icons — now with a Supabase-backed
content system and a full admin dashboard (CMS) at `/admin`.

The site works out of the box on built-in sample content even before you
connect Supabase. Once you connect it and add content in `/admin`, that
content automatically replaces the samples everywhere on the site.

## 1. Getting Started (frontend only, no Supabase yet)

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). The site, including
the new Donate, News, Testimonials, Gardening, and Health sections, will
render using the sample data in `/data` until Supabase is connected.

> If `npm run build` fails with a `next/font` error about fetching Google
> Fonts, the machine has no internet access to `fonts.googleapis.com`
> (common in sandboxed/offline environments). Not an issue on a normal dev
> machine or when deployed.

## 2. Connecting Supabase (required for the admin CMS + real content)

1. Go to [supabase.com](https://supabase.com), sign in, and click
   **New Project**. Pick any name/region and a database password (save it
   somewhere safe).
2. Once the project is ready, open **SQL Editor** in the left sidebar, click
   **New query**, paste in the entire contents of `supabase/schema.sql` from
   this project, and click **Run**. This creates every table (articles,
   sermons, eBooks, gallery, news, testimonials, gardening tips, health
   articles, donation channels, site settings, contact messages, prayer
   requests, newsletter subscribers) with the correct security rules.
3. Go to **Project Settings → API** and copy:
   - **Project URL**
   - **anon public** key
4. In this project, copy `.env.local.example` to `.env.local` and paste
   those two values in:

   ```bash
   cp .env.local.example .env.local
   ```

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   ```

5. Restart `npm run dev`. The site now reads/writes through Supabase.

### Creating your admin login

The admin dashboard uses Supabase Auth. There's no public sign-up screen on
purpose — you create your own login directly in Supabase:

1. In the Supabase dashboard, go to **Authentication → Users → Add user**.
2. Enter the email and password you want to log in with at `/admin/login`.
3. Set **Auto Confirm User** to on (so you don't need an email step), then
   create the user.
4. Go to `http://localhost:3000/admin/login` and sign in.

Add more admin users the same way any time.

## 3. The Admin Dashboard (`/admin`)

Once logged in you can manage, without touching code:

- **News** — homepage News segment and `/news`
- **Testimonials** — homepage Testimonials segment and `/testimonials`
- **Gardening** — homepage Gardening segment and `/gardening`
- **Health** — homepage Health segment and `/health`
- **Bible Studies / Articles** — `/resources`
- **Sermons** — `/sermons`
- **eBooks** — `/ebooks`
- **Gallery** — `/gallery`
- **Donation Channels** — `/donate` (M-Pesa, bank, etc.)
- **Messages & Prayer Requests** — everything submitted through the
  Contact form and the Prayer Request form
- **Newsletter** — everyone who has subscribed
- **Site Settings** — phone, WhatsApp, email, and YouTube details shown
  across the site (Footer, Contact page, floating WhatsApp button)

Each content page works the same way: **Add New** opens a form, existing
rows can be edited or deleted inline, and changes appear on the live site
immediately (content is fetched fresh on each page load).

## 4. Contact Details Currently Set

- Phone / WhatsApp: `+254110040420`
- Email: `enochsoutpost@gmail.com`
- YouTube: `https://www.youtube.com/@info.enochsoutpost`

These live in `lib/site-config.ts` as the default/fallback values, and can
be overridden from **Site Settings** in `/admin` once Supabase is connected.

> **Note on donations:** the M-Pesa Paybill/Till and bank account numbers in
> `data/donation.ts` and `supabase/schema.sql` are placeholders (`000000`).
> Update them from **Donation Channels** in `/admin` (or edit the SQL before
> running it) with your real paybill/till/account numbers before going live.

## Tech Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS**, custom brand palette (`tailwind.config.ts`)
- **Framer Motion** for animation
- **Lucide React** for icons
- **Supabase** (Postgres + Auth) for content and the admin CMS

## Project Structure

```
app/
  page.tsx              Home (Hero, About, Ministries, News, Resources,
                         Health, Gardening, Testimonials, Donate, CTA)
  donate/                /donate — donation channels
  news/ health/ gardening/ testimonials/   Dedicated listing pages
  about/ resources/ sermons/ ebooks/ gallery/ contact/
  admin/                 Admin CMS
    login/               Supabase Auth login
    layout.tsx           Auth guard + sidebar shell
    page.tsx             Dashboard overview
    news/ testimonials/ gardening/ health/ articles/ sermons/
    ebooks/ gallery/ donations/ messages/ newsletter/ settings/
components/
  layout/                Navbar, Footer
  home/                  Hero, AboutPreview, MinistryAreas, NewsSection,
                         FeaturedResources, HealthSection, GardeningSection,
                         TestimonialsSection, DonateSection
  cards/                 MinistryCard, SermonCard, BookCard, ArticleCard,
                         BibleStudyCard, GalleryCard, NewsCard,
                         TestimonialCard, GardeningCard, HealthCard
  cta/                   CTABanner, NewsletterCard
  contact/                ContactForm, WhatsAppButton
  admin/                  AdminGuard, Sidebar, CrudManager (generic CMS table+form)
  ui/                     Button, SectionTitle, GlassCard, Badge
data/                   Sample/fallback content (used until Supabase has rows)
lib/
  site-config.ts         Default contact details
  supabase/               client.ts (browser), server.ts (server), queries.ts
                         (Supabase-first, falls back to /data automatically)
supabase/schema.sql      Full database schema + security policies to run once
public/logo.png          Ministry logo
```

## Customizing

- **Colors**: `tailwind.config.ts` → `theme.extend.colors.outpost`
- **Fonts**: `app/layout.tsx` (Playfair Display + Inter via `next/font/google`)
- **Contact details default**: `lib/site-config.ts` (or `/admin/settings` once live)
- **Sample/fallback content**: everything under `/data`
- **Nav links**: `components/layout/Navbar.tsx`

## Deploying

Deploy to [Vercel](https://vercel.com) (or any Next.js host) and add the
same two `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
environment variables in the host's project settings. No other secrets are
needed — the Supabase **anon** key is safe to expose publicly; the actual
write protection comes from the Row Level Security policies in
`supabase/schema.sql`, which only allow content changes from a logged-in
admin.
