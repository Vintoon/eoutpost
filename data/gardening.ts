export interface GardeningTip {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  season?: string;
}

export const gardeningTips: GardeningTip[] = [
  {
    id: "gd1",
    title: "Starting a Kitchen Garden on a Small Plot",
    excerpt:
      "Simple steps to grow kale, spinach, and tomatoes even on a small piece of land, restoring the Eden pattern of self-reliance.",
    image:
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=800&auto=format&fit=crop",
    season: "Long Rains",
  },
  {
    id: "gd2",
    title: "Composting for Healthier Soil, Naturally",
    excerpt:
      "How to turn kitchen and garden waste into rich compost without chemical fertilizers.",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800&auto=format&fit=crop",
    season: "Year-Round",
  },
  {
    id: "gd3",
    title: "Growing Herbs for Home Remedies",
    excerpt:
      "A beginner's guide to cultivating mint, aloe vera, and rosemary for natural, biblical wellness at home.",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800&auto=format&fit=crop",
    season: "Short Rains",
  },
];
