export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  date: string;
}

export const newsItems: NewsItem[] = [
  {
    id: "n1",
    title: "Annual Camp Meeting Set for December",
    excerpt:
      "Save the date — our annual camp meeting returns this December with guest speakers, youth programs, and baptisms.",
    image:
      "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=800&auto=format&fit=crop",
    date: "2026-09-10",
  },
  {
    id: "n2",
    title: "New Health Outreach Launched in Nyeri County",
    excerpt:
      "Our Health Ministry team began free monthly community health screenings and cooking demonstrations.",
    image:
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=800&auto=format&fit=crop",
    date: "2026-08-22",
  },
  {
    id: "n3",
    title: "Building Fund Update: Phase Two Underway",
    excerpt:
      "Thanks to your generous giving, construction on our new fellowship hall has begun. Here's the latest progress.",
    image:
      "https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=800&auto=format&fit=crop",
    date: "2026-08-01",
  },
];
