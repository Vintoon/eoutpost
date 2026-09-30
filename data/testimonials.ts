export interface Testimonial {
  id: string;
  name: string;
  location: string;
  message: string;
  image?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Grace Njeri",
    location: "Nyeri",
    message:
      "The sanctuary Bible studies from Enoch's Outpost transformed how I read Scripture. I finally understand the plan of salvation from beginning to end.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "t2",
    name: "Samuel Mwangi",
    location: "Karatina",
    message:
      "The health seminar changed my family's eating habits completely. My blood pressure has normalized and I feel stronger than I have in years.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "t3",
    name: "Esther Wambui",
    location: "Nairobi",
    message:
      "I submitted a prayer request during a very dark season and the team followed up with genuine care. This ministry truly points people to Jesus.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
  },
];
