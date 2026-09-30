import SectionTitle from "@/components/ui/SectionTitle";
import SermonCard from "@/components/cards/SermonCard";
import BookCard from "@/components/cards/BookCard";
import BibleStudyCard from "@/components/cards/BibleStudyCard";
import { Button } from "@/components/ui/Button";
import { getSermons, getBooks, getBibleStudies } from "@/lib/supabase/queries";

export default async function FeaturedResources() {
  const [sermons, books, bibleStudies] = await Promise.all([
    getSermons(),
    getBooks(),
    getBibleStudies(),
  ]);

  // Nothing has been added to any of these sections yet — skip the whole
  // block rather than showing empty "Featured X" headers with nothing under them.
  if (sermons.length === 0 && books.length === 0 && bibleStudies.length === 0) {
    return null;
  }

  return (
    <section className="relative bg-outpost-sand/40">
      <div className="section">
        <SectionTitle
          eyebrow="Featured"
          title="Explore Our Latest Resources"
          description="A glimpse of the sermons, Bible studies, and eBooks available to strengthen your walk with Christ."
        />

        {sermons.length > 0 && (
          <div className="mb-16">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-xl font-semibold text-outpost-navy">
                Latest Sermons
              </h3>
              <Button href="/sermons" variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sermons.slice(0, 3).map((s, i) => (
                <SermonCard key={s.id} sermon={s} delay={i * 0.1} />
              ))}
            </div>
          </div>
        )}

        {bibleStudies.length > 0 && (
          <div className="mb-16">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-xl font-semibold text-outpost-navy">
                Featured Bible Studies
              </h3>
              <Button href="/resources" variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {bibleStudies.slice(0, 3).map((s, i) => (
                <BibleStudyCard key={s.id} study={s} delay={i * 0.1} />
              ))}
            </div>
          </div>
        )}

        {books.length > 0 && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-xl font-semibold text-outpost-navy">
                Featured eBooks
              </h3>
              <Button href="/ebooks" variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {books.slice(0, 3).map((b, i) => (
                <BookCard key={b.id} book={b} delay={i * 0.1} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
