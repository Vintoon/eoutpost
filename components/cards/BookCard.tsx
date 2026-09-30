import Image from "next/image";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Book } from "@/data/books";

export default function BookCard({ book, delay }: { book: Book; delay?: number }) {
  return (
    <GlassCard delay={delay} className="flex flex-col overflow-hidden !p-0">
      <Link href={`/ebooks/${book.id}`} className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={book.cover}
          alt={book.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        <Badge className="absolute left-3 top-3 bg-white/85 text-outpost-navy">
          {book.category}
        </Badge>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-1 font-display text-lg font-semibold text-outpost-navy">
          {book.title}
        </h3>
        <p className="mb-4 text-sm text-outpost-navy/60">by {book.author}</p>
        <div className="mb-5 mt-auto flex items-center justify-between">
          <span className="font-display text-xl font-bold text-outpost-blue">
            KSh {book.price.toLocaleString()}
          </span>
          <span className="text-xs text-outpost-navy/50">{book.pages} pages</span>
        </div>
        <Button href={`/ebooks/${book.id}`} size="sm">
          Buy Now
        </Button>
      </div>
    </GlassCard>
  );
}
