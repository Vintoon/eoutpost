import SectionTitle from "@/components/ui/SectionTitle";
import EventCard from "@/components/cards/EventCard";
import { getEvents } from "@/lib/supabase/queries";

export const metadata = { title: "Events | Enoch's Outpost Ministry" };

export default async function EventsPage() {
  const events = await getEvents();
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => e.date >= today);
  const past = events.filter((e) => e.date < today);

  return (
    <>
      <section className="relative overflow-hidden bg-outpost-gradient pt-40 pb-20 text-center text-white">
        <div className="absolute inset-0 bg-outpost-radiance" />
        <div className="section relative">
          <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-outpost-light">
            Join Us
          </span>
          <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold sm:text-5xl">
            Upcoming Events
          </h1>
        </div>
      </section>

      <section className="section !pt-16">
        {events.length === 0 ? (
          <p className="py-16 text-center text-outpost-navy/60">
            No events have been scheduled yet. Check back soon.
          </p>
        ) : (
          <>
            {upcoming.length > 0 ? (
              <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {upcoming.map((e, i) => (
                  <EventCard key={e.id} event={e} delay={i * 0.08} />
                ))}
              </div>
            ) : (
              <p className="mb-16 py-6 text-center text-outpost-navy/60">
                No upcoming events right now — check back soon.
              </p>
            )}

            {past.length > 0 && (
              <div>
                <SectionTitle eyebrow="Past" title="Previous Events" />
                <div className="grid grid-cols-1 gap-6 opacity-70 sm:grid-cols-2 lg:grid-cols-3">
                  {past.map((e, i) => (
                    <EventCard key={e.id} event={e} delay={i * 0.06} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
