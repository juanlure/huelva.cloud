export const CATEGORIES = [
  "guides",
  "news",
  "events",
  "eat",
  "stay",
  "community",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABEL: Record<Category, string> = {
  guides: "Guías",
  news: "Actualidad",
  events: "Agenda",
  eat: "Comer y beber",
  stay: "Dónde dormir",
  community: "La calle",
};

export const PLACE_KINDS = [
  "playa",
  "comer",
  "cultura",
  "mercado",
  "barrio",
  "naturaleza",
  "mirador",
] as const;

export type PlaceKind = (typeof PLACE_KINDS)[number];

export const PLACE_KIND_LABEL: Record<PlaceKind, string> = {
  playa: "Playa",
  comer: "Comer",
  cultura: "Cultura",
  mercado: "Mercado",
  barrio: "Barrio",
  naturaleza: "Naturaleza",
  mirador: "Mirador",
};

export type Article = {
  id: number;
  slug: string;
  title: string;
  dek: string;
  body: string;
  category: Category;
  readMinutes: number;
  featured: boolean;
  source: "editorial" | "community" | "daemon";
  author: string | null;
  neighborhood: string | null;
  publishedAt: string;
  votes: number;
};

export type Place = {
  id: number;
  name: string;
  kind: PlaceKind;
  lat: number;
  lng: number;
  blurb: string;
  neighborhood: string | null;
  hours: string | null;
  votes: number;
};

export type CityEvent = {
  id: number;
  title: string;
  dek: string;
  startsOn: string;
  endsOn: string | null;
  venue: string;
  neighborhood: string | null;
  lat: number | null;
  lng: number | null;
  source: "editorial" | "community";
  votes: number;
};

export type CollabSpot = {
  id: number;
  name: string;
  blurb: string;
  photoUrl: string | null;
  linkUrl: string | null;
  linkType: "web" | "whatsapp";
  activeUntil: string;
};
