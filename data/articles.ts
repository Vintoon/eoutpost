export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  read_time: string;
  date: string;
  image: string;
}

export const articles: Article[] = [
  {
    id: "a1",
    title: "Why the Sanctuary Message Still Matters Today",
    excerpt:
      "Rediscovering the ancient blueprint that reveals the plan of salvation from Genesis to Revelation.",
    category: "Prophecy",
    read_time: "6 min read",
    date: "2026-08-02",
    image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "a2",
    title: "Eight Laws of Natural Health, Explained Simply",
    excerpt:
      "A practical look at the NEWSTART principles and how they apply to modern African living.",
    category: "Health",
    read_time: "5 min read",
    date: "2026-07-19",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "a3",
    title: "Building a Worship Rhythm as a Family",
    excerpt:
      "Small, consistent habits that anchor a household in Christ, even on the busiest weeks.",
    category: "Family Life",
    read_time: "4 min read",
    date: "2026-07-05",
    image: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "a4",
    title: "Teaching Children the Sabbath Story",
    excerpt:
      "Creative, age-appropriate ways to help little ones fall in love with God's rest day.",
    category: "Children",
    read_time: "3 min read",
    date: "2026-06-21",
    image: "https://images.unsplash.com/photo-1490080892020-4870dd5a3a11?q=80&w=800&auto=format&fit=crop",
  },
];

export interface BibleStudy {
  id: string;
  title: string;
  summary: string;
  lessons: number;
  image: string;
}

export const bibleStudies: BibleStudy[] = [
  {
    id: "bs1",
    title: "Foundations of Faith",
    summary: "A 12-lesson introduction to the core doctrines of Scripture, ideal for new believers.",
    lessons: 12,
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "bs2",
    title: "Unlocking Daniel & Revelation",
    summary: "A guided verse-by-verse walk through the two great prophetic books of the Bible.",
    lessons: 24,
    image: "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "bs3",
    title: "The Character of God",
    summary: "An eight-week study exploring God's love, justice, and mercy through the Great Controversy theme.",
    lessons: 8,
    image: "https://images.unsplash.com/photo-1441829266145-9c1d6bdd06c8?q=80&w=800&auto=format&fit=crop",
  },
];
