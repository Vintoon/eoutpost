export interface HealthTip {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  category?: string;
}

export const healthTips: HealthTip[] = [
  {
    id: "h1",
    title: "The Eight Laws of Health, Applied Daily",
    excerpt:
      "Nutrition, exercise, water, sunlight, temperance, air, rest, and trust in God — practical ways to live them out this week.",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop",
    category: "Wellness",
  },
  {
    id: "h2",
    title: "Simple Plant-Based Meals for Busy Families",
    excerpt:
      "Affordable, nutritious recipes rooted in whole foods that any Kenyan household can prepare in under 30 minutes.",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop",
    category: "Nutrition",
  },
  {
    id: "h3",
    title: "Managing Stress Through Rest and Prayer",
    excerpt:
      "Biblical rhythms of rest, Sabbath, and prayer as a foundation for mental and emotional wellbeing.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop",
    category: "Mental Health",
  },
];
