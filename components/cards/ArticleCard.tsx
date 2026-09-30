import Image from "next/image";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import type { Article } from "@/data/articles";

export default function ArticleCard({ article, delay }: { article: Article; delay?: number }) {
  return (
    <GlassCard delay={delay} className="flex flex-col overflow-hidden !p-0 sm:flex-row">
      <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-auto sm:w-48">
        <Image src={article.image} alt={article.title} fill className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Badge className="mb-3 w-fit">{article.category}</Badge>
        <h3 className="mb-2 font-display text-lg font-semibold text-outpost-navy">
          {article.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-outpost-navy/70">{article.excerpt}</p>
        <div className="mt-auto flex items-center gap-3 text-xs text-outpost-navy/50">
          <span>{article.read_time}</span>
          <span>•</span>
          <span>
            {new Date(article.date).toLocaleDateString("en-KE", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </GlassCard>
  );
}
