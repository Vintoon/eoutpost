import Image from "next/image";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import type { GardeningTip } from "@/data/gardening";

export default function GardeningCard({ item, delay }: { item: GardeningTip; delay?: number }) {
  return (
    <GlassCard delay={delay} className="flex flex-col overflow-hidden !p-0">
      <div className="relative h-44 w-full overflow-hidden">
        <Image src={item.image} alt={item.title} fill className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        {item.season && <Badge className="mb-3 w-fit">{item.season}</Badge>}
        <h3 className="mb-2 font-display text-lg font-semibold text-outpost-navy">
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed text-outpost-navy/70">{item.excerpt}</p>
      </div>
    </GlassCard>
  );
}
