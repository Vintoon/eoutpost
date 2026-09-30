import Image from "next/image";
import GlassCard from "@/components/ui/GlassCard";
import type { NewsItem } from "@/data/news";

export default function NewsCard({ item, delay }: { item: NewsItem; delay?: number }) {
  return (
    <GlassCard delay={delay} className="flex flex-col overflow-hidden !p-0">
      <div className="relative h-44 w-full overflow-hidden">
        <Image src={item.image} alt={item.title} fill className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-outpost-blue">
          {new Date(item.date).toLocaleDateString("en-KE", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <h3 className="mb-2 font-display text-lg font-semibold text-outpost-navy">
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed text-outpost-navy/70">{item.excerpt}</p>
      </div>
    </GlassCard>
  );
}
