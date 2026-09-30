import Image from "next/image";
import GlassCard from "@/components/ui/GlassCard";
import { Quote } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

export default function TestimonialCard({ item, delay }: { item: Testimonial; delay?: number }) {
  return (
    <GlassCard delay={delay} className="flex flex-col items-start">
      <Quote size={28} className="mb-4 text-outpost-gold" />
      <p className="mb-6 text-sm italic leading-relaxed text-outpost-navy/80">
        &ldquo;{item.message}&rdquo;
      </p>
      <div className="mt-auto flex items-center gap-3">
        {item.image ? (
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
            <Image src={item.image} alt={item.name} fill className="object-cover" />
          </div>
        ) : (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-outpost-gradient text-sm font-semibold text-white">
            {item.name.charAt(0)}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-outpost-navy">{item.name}</p>
          <p className="text-xs text-outpost-navy/50">{item.location}</p>
        </div>
      </div>
    </GlassCard>
  );
}
