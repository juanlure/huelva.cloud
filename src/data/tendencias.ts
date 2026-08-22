/** Síntesis editorial de X, prensa local y foros. Captura: 22 ago 2026, noche. */

export type TendenciaLink =
  | { to: "/agenda" }
  | { to: "/pulse" }
  | { to: "/g/$id"; id: string }
  | { to: "/$slug"; slug: string };

export type Tendencia = {
  id: string;
  heat: string;
  where: string;
  title: string;
  dek: string;
  link: TendenciaLink;
};

export const TENDENCIAS_AS_OF = "22 ago 2026 · noche";

export const TENDENCIAS: Tendencia[] = [
  {
    id: "feria",
    heat: "Esta semana",
    where: "X · Huelva Información",
    title: "Jamón y marisco en Ayamonte",
    dek: "26 al 28 de agosto, Plaza de España, a partir de las 20:00. Gamba blanca y jamón en la misma mesa. Lo que se busca ahora.",
    link: { to: "/agenda" },
  },
  {
    id: "recre",
    heat: "Ahora",
    where: "X · Recre",
    title: "El Decano, en el césped",
    dek: "Sábado noche: Mérida–Recreativo. Cuando el Decano juega, Huelva habla de fútbol. El resto de la provincia, de playa.",
    link: { to: "/pulse" },
  },
  {
    id: "maneli",
    heat: "Foros",
    where: "TripAdvisor · X",
    title: "Cuesta Maneli, la orilla que se busca",
    dek: "Pasarela, duna, Doñana. La playa que los foros ponen primera. Salvaje, al este de Matalascañas.",
    link: { to: "/$slug", slug: "cuesta-maneli" },
  },
  {
    id: "donana",
    heat: "Prensa",
    where: "X · Huelva Información",
    title: "Doñana, otra vez en el centro",
    dek: "El deslinde ocupa la conversación pública. Quien visita, que lo haga por la senda, a su hora. El parque no es un atajo.",
    link: { to: "/g/$id", id: "marisma" },
  },
  {
    id: "rocio",
    heat: "X",
    where: "rocieros",
    title: "La Blanca Paloma, siempre",
    dek: "Venida, Almonte, la aldea. Aunque no sea romería, El Rocío está en la boca de la provincia.",
    link: { to: "/$slug", slug: "el-rocio" },
  },
  {
    id: "jabugo",
    heat: "Hoy",
    where: "X · hostelería",
    title: "Jabugo une mesa y cultura",
    dek: "La sierra no es solo el jamón: exposición, plaza, el pueblo a primera hora. La otra Huelva.",
    link: { to: "/$slug", slug: "jamon-de-jabugo" },
  },
  {
    id: "muelle",
    heat: "Puerto",
    where: "Puerto de Huelva",
    title: "El muelle de viajeros, 1885",
    dek: "La ría como tránsito: Corrales, Aljaraque, Punta Umbría. El hierro de la capital sigue siendo el atardecer.",
    link: { to: "/g/$id", id: "ocaso" },
  },
  {
    id: "matalascanas",
    heat: "Viajes",
    where: "X · foros",
    title: "Matalascañas, Acebuche y la torre caída",
    dek: "Doñana a un paso, Cuesta Maneli, la Torre de la Higuera volcada en la arena. El este de la costa, esta semana.",
    link: { to: "/g/$id", id: "orilla" },
  },
];

export const TICKER_NOW = [
  "Ayamonte · feria",
  "Gamba blanca",
  "El Decano",
  "Cuesta Maneli",
  "Doñana",
  "El Rocío",
  "Jabugo",
  "Muelle de viajeros",
  "Punta Umbría",
  "Costa de la Luz",
];
