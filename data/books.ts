export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  category: string;
  cover: string;
  description: string;
  pages: number;
}

export const books: Book[] = [
  {
    id: "b1",
    title: "Looking Unto Jesus",
    author: "Enoch Mwangi",
    price: 650,
    category: "Devotional",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
    description:
      "A 90-day devotional journey fixing our eyes on Christ amid the trials of daily life, drawn from the Gospels and the Psalms.",
    pages: 214,
  },
  {
    id: "b2",
    title: "The Sanctuary Unveiled",
    author: "Ruth Wanjiru",
    price: 900,
    category: "Prophecy",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=600&auto=format&fit=crop",
    description:
      "An in-depth study of the earthly and heavenly sanctuary and its significance for understanding end-time prophecy.",
    pages: 312,
  },
  {
    id: "b3",
    title: "Simple Foods, Strong Bodies",
    author: "Dr. James Kariuki",
    price: 750,
    category: "Health",
    cover: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop",
    description:
      "Biblical principles of nutrition paired with practical, affordable plant-based recipes for African households.",
    pages: 168,
  },
  {
    id: "b4",
    title: "Home Altars: Family Worship Reimagined",
    author: "Grace Achieng",
    price: 550,
    category: "Family Life",
    cover: "https://images.unsplash.com/photo-1476234251651-f353703a034d?q=80&w=600&auto=format&fit=crop",
    description:
      "Fifty-two weeks of guided family worship to help parents build a Christ-centered home, one evening at a time.",
    pages: 190,
  },
  {
    id: "b5",
    title: "Little Feet on the Narrow Path",
    author: "Teacher Mary Njoki",
    price: 480,
    category: "Children",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
    description:
      "Illustrated Bible stories and Sabbath School activities designed to plant Scripture deep in young hearts.",
    pages: 96,
  },
  {
    id: "b6",
    title: "Daniel and Revelation Made Plain",
    author: "Enoch Mwangi",
    price: 980,
    category: "Prophecy",
    cover: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=600&auto=format&fit=crop",
    description:
      "A verse-by-verse companion to the prophetic books, written for the everyday Bible student preparing for Christ's return.",
    pages: 356,
  },
];

export const bookCategories = [
  "All",
  "Devotional",
  "Prophecy",
  "Health",
  "Family Life",
  "Children",
];
