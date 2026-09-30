import Image from "next/image";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { BookOpen } from "lucide-react";
import type { BibleStudy } from "@/data/articles";

export default function BibleStudyCard({
  study,
  delay,
}: {
  study: BibleStudy;
  delay?: number;
}) {
  return (
    <GlassCard delay={delay} className="flex flex-col overflow-hidden !p-0">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image src={study.image} alt={study.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-outpost-navy/60 to-transparent" />
        <div className="absolute bottom-3 left-4 flex items-center gap-2 text-white">
          <BookOpen size={16} />
          <span className="text-xs font-medium">{study.lessons} Lessons</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 font-display text-lg font-semibold text-outpost-navy">
          {study.title}
        </h3>
        <p className="mb-5 text-sm leading-relaxed text-outpost-navy/70">{study.summary}</p>
        <Button variant="outline" size="sm" className="mt-auto">
          Start Study
        </Button>
      </div>
    </GlassCard>
  );
}
