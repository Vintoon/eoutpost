export interface GalleryImage {
  id: string;
  category: string;
  image: string;
  caption: string;
  span?: "row-span-2" | "col-span-2";
}

export const galleryCategories = [
  "All",
  "Evangelism",
  "Health Ministry",
  "Children's Ministry",
  "Family Seminars",
  "Camp Meetings",
];

export const galleryImages: GalleryImage[] = [
  { id: "g1", category: "Evangelism", image: "https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=800&auto=format&fit=crop", caption: "Open-air crusade in Nyeri", span: "row-span-2" },
  { id: "g2", category: "Health Ministry", image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=800&auto=format&fit=crop", caption: "Free community health screening" },
  { id: "g3", category: "Children's Ministry", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800&auto=format&fit=crop", caption: "Sabbath School craft day" },
  { id: "g4", category: "Family Seminars", image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=800&auto=format&fit=crop", caption: "Marriage enrichment weekend", span: "col-span-2" },
  { id: "g5", category: "Camp Meetings", image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=800&auto=format&fit=crop", caption: "Annual camp meeting under the stars" },
  { id: "g6", category: "Evangelism", image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800&auto=format&fit=crop", caption: "Door-to-door literature ministry" },
  { id: "g7", category: "Health Ministry", image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop", caption: "Cooking class on plant-based meals" },
  { id: "g8", category: "Children's Ministry", image: "https://images.unsplash.com/photo-1444840535719-195841cb6e2b?q=80&w=800&auto=format&fit=crop", caption: "Vacation Bible school", span: "row-span-2" },
  { id: "g9", category: "Camp Meetings", image: "https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?q=80&w=800&auto=format&fit=crop", caption: "Worship at sunrise" },
  { id: "g10", category: "Family Seminars", image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop", caption: "Parenting workshop" },
];
