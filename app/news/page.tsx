import SectionTitle from "@/components/ui/SectionTitle";
import NewsCard from "@/components/cards/NewsCard";
import { getNews } from "@/lib/supabase/queries";

export const metadata = { title: "News | Enoch's Outpost Ministry" };

export default async function NewsPage() {
  const news = await getNews();
  return (
    <section className="section !pt-40">
      <SectionTitle
        eyebrow="Ministry News"
        title="Latest Updates"
        description="Announcements, events, and stories from across Enoch's Outpost Ministry."
      />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((item, i) => (
          <NewsCard key={item.id} item={item} delay={i * 0.08} />
        ))}
      </div>
      {news.length === 0 && (
        <p className="py-16 text-center text-outpost-navy/60">No news items have been added yet.</p>
      )}
    </section>
  );
}
