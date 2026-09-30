import SectionTitle from "@/components/ui/SectionTitle";
import NewsCard from "@/components/cards/NewsCard";
import { Button } from "@/components/ui/Button";
import { getNews } from "@/lib/supabase/queries";

export default async function NewsSection() {
  const news = await getNews();
  if (news.length === 0) return null;

  return (
    <section className="section">
      <SectionTitle
        eyebrow="Ministry News"
        title="What's Happening at Enoch's Outpost"
        description="Announcements, events, and updates from across the ministry."
      />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {news.slice(0, 3).map((item, i) => (
          <NewsCard key={item.id} item={item} delay={i * 0.1} />
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Button href="/news" variant="outline" size="sm">
          View All News
        </Button>
      </div>
    </section>
  );
}
