import { getSupabaseServerClient } from "@/lib/supabase/server";
import { newsItems, type NewsItem } from "@/data/news";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { gardeningTips, type GardeningTip } from "@/data/gardening";
import { healthTips, type HealthTip } from "@/data/health";
import { donationChannels, type DonationChannel } from "@/data/donation";
import { articles, bibleStudies, type Article, type BibleStudy } from "@/data/articles";
import { sermons, type Sermon } from "@/data/sermons";
import { books, type Book } from "@/data/books";
import { galleryImages, type GalleryImage } from "@/data/gallery";
import { events, type EventItem } from "@/data/events";
import { siteConfig } from "@/lib/site-config";
import { siteContentDefaults } from "@/lib/site-content-defaults";

/**
 * Every getX() below tries Supabase first (so content managed in /admin shows
 * up live) and falls back to the static seed data in /data only when
 * Supabase isn't configured yet or a query genuinely fails — NOT when a
 * table legitimately has zero rows. An admin clearing out a section (e.g.
 * deleting every sermon) is a real, intentional state and must render as
 * empty, not silently revert to the old placeholder demo content.
 */
async function fetchOrFallback<T>(
  table: string,
  fallback: T[],
  orderBy = "created_at",
  ascending = false
): Promise<T[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return fallback;
  try {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order(orderBy, { ascending });
    if (error) return fallback;
    return (data as T[]) ?? [];
  } catch {
    return fallback;
  }
}

export const getNews = () => fetchOrFallback<NewsItem>("news", newsItems, "date");
export const getTestimonials = () => fetchOrFallback<Testimonial>("testimonials", testimonials, "created_at");
export const getGardeningTips = () => fetchOrFallback<GardeningTip>("gardening_tips", gardeningTips, "created_at");
export const getHealthTips = () => fetchOrFallback<HealthTip>("health_articles", healthTips, "created_at");
export const getDonationChannels = () => fetchOrFallback<DonationChannel>("donation_channels", donationChannels, "created_at");
export const getArticles = () => fetchOrFallback<Article>("articles", articles, "date");
export const getSermons = () => fetchOrFallback<Sermon>("sermons", sermons, "date");
export const getBooks = () => fetchOrFallback<Book>("books", books, "created_at");
export const getGalleryImages = () => fetchOrFallback<GalleryImage>("gallery", galleryImages, "created_at");
export const getBibleStudies = () => fetchOrFallback<BibleStudy>("bible_studies", bibleStudies, "created_at");
export const getEvents = () => fetchOrFallback<EventItem>("events", events, "date", true);

/** site_settings is a key/value table; falls back to lib/site-config.ts. */
export async function getSiteSettings() {
  const supabase = getSupabaseServerClient();
  const fallback = { ...siteConfig };
  if (!supabase) return fallback;
  try {
    const { data, error } = await supabase.from("site_settings").select("key,value");
    if (error || !data || data.length === 0) return fallback;
    const map = Object.fromEntries(data.map((r: { key: string; value: string }) => [r.key, r.value]));
    return { ...fallback, ...map };
  } catch {
    return fallback;
  }
}

/**
 * site_content is a key/value table for editable homepage/about copy
 * (hero heading, mission/vision, ministry-area blurbs). Falls back to
 * lib/site-content-defaults.ts, same pattern as getSiteSettings above.
 */
export async function getSiteContent() {
  const supabase = getSupabaseServerClient();
  const fallback = { ...siteContentDefaults };
  if (!supabase) return fallback;
  try {
    const { data, error } = await supabase.from("site_content").select("key,value");
    if (error || !data || data.length === 0) return fallback;
    const map = Object.fromEntries(data.map((r: { key: string; value: string }) => [r.key, r.value]));
    return { ...fallback, ...map };
  } catch {
    return fallback;
  }
}
