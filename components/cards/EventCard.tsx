import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import type { EventItem } from "@/data/events";

export default function EventCard({ event, delay }: { event: EventItem; delay?: number }) {
  const dateLabel = new Date(event.date).toLocaleDateString("en-KE", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <GlassCard delay={delay} className="flex flex-col overflow-hidden !p-0">
      {event.image && (
        <div className="relative h-44 w-full overflow-hidden">
          <Image src={event.image} alt={event.title} fill className="object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-3 font-display text-lg font-semibold text-outpost-navy">
          {event.title}
        </h3>
        <div className="mb-4 space-y-1.5 text-sm text-outpost-navy/60">
          <p className="flex items-center gap-2">
            <Calendar size={14} /> {dateLabel}
          </p>
          {event.time && (
            <p className="flex items-center gap-2">
              <Clock size={14} /> {event.time}
            </p>
          )}
          {event.location && (
            <p className="flex items-center gap-2">
              <MapPin size={14} /> {event.location}
            </p>
          )}
        </div>
        {event.description && (
          <p className="mb-5 flex-1 text-sm leading-relaxed text-outpost-navy/70">
            {event.description}
          </p>
        )}
        {event.registration_url && (
          <Button href={event.registration_url} variant="secondary" size="sm" className="mt-auto">
            Register
          </Button>
        )}
      </div>
    </GlassCard>
  );
}
