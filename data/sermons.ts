export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  duration: string;
  date: string;
  category: string;
  youtube_id: string;
  thumbnail: string;
  /** 'youtube' (default) or 'audio' — which player the card shows. */
  sermon_type?: "youtube" | "audio";
  /** Direct URL to an uploaded audio file, used when sermon_type is 'audio'. */
  audio_url?: string;
}

export const sermons: Sermon[] = [
  {
    id: "s1",
    title: "The Sanctuary and the Soon Coming of Christ",
    speaker: "Pastor Enoch Mwangi",
    duration: "48:12",
    date: "2026-08-10",
    category: "Prophecy",
    youtube_id: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1543968996-ee822b8176ba?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "s2",
    title: "Daniel 2: The God Who Reveals Mysteries",
    speaker: "Elder James Kariuki",
    duration: "52:30",
    date: "2026-07-28",
    category: "Prophecy",
    youtube_id: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "s3",
    title: "Health as a Ministry: Restoring the Temple",
    speaker: "Dr. Ruth Wanjiru",
    duration: "39:05",
    date: "2026-07-14",
    category: "Health",
    youtube_id: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1518606372608-25a70e5cf1cc?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "s4",
    title: "Raising Christ-Centered Homes",
    speaker: "Pastor & Mrs. Njenga",
    duration: "44:20",
    date: "2026-06-30",
    category: "Family Life",
    youtube_id: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "s5",
    title: "Sabbath Stories for Little Hearts",
    speaker: "Teacher Grace Achieng",
    duration: "28:15",
    date: "2026-06-16",
    category: "Children",
    youtube_id: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "s6",
    title: "Revelation 14: The Three Angels' Message",
    speaker: "Pastor Enoch Mwangi",
    duration: "56:44",
    date: "2026-05-25",
    category: "Prophecy",
    youtube_id: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1465146633011-14f8e0781093?q=80&w=800&auto=format&fit=crop",
  },
];

export const sermonCategories = [
  "All",
  "Prophecy",
  "Health",
  "Family Life",
  "Children",
];
