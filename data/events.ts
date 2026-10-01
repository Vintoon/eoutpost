export interface EventItem {
  id: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  location?: string;
  image?: string;
  registration_url?: string;
}

// No static demo events — Events is a brand-new section with nothing to
// show until an admin adds one. (Used only if Supabase is unreachable.)
export const events: EventItem[] = [];
