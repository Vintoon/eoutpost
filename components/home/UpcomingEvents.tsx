import SectionTitle from "@/components/ui/SectionTitle";
import EventCard from "@/components/cards/EventCard";
import { Button } from "@/components/ui/Button";
import { getEvents } from "@/lib/supabase/queries";

export default async function UpcomingEvents() {
  const events = await getEvents();
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => e.date >= today).slice(0, 3);

  if (upcoming.length === 0) return null;

  return (
    <section className="section">
      <div className="mb-6 flex items-center justify-between">
        <SectionTitle eyebrow="Join Us" title="Upcoming Events" />
        <Button href="/events" variant="ghost" size="sm">
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {upcoming.map((e, i) => (
          <EventCard key={e.id} event={e} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}
