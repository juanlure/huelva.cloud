import type { Category } from "@/lib/types";

export type BacklogIdea = {
  topic: string;
  angle: string;
  category: Category;
  neighborhood: string | null;
  dek?: string;
  body?: string;
};

export const BACKLOG_IDEAS: BacklogIdea[] = [
  {
    topic: "Apertura de la temporada de gurumelos",
    angle: "Sierra, primavera, producto de temporada",
    category: "eat",
    neighborhood: "aracena",
    dek: "Marzo y abril: el gurumelo sube con la lluvia. Guía de dónde pedirlos y cómo se comen.",
    body: "",
  },
  {
    topic: "Ruta de bares de la capital",
    angle: "Concepción, Pablo Rada, zona centro",
    category: "eat",
    neighborhood: "centro",
    dek: "El tapeo onubense: dónde, a qué hora y qué pedir.",
    body: "",
  },
  {
    topic: "Calendario de mareas y pesca",
    angle: "Lonja, temporadas, producto del día",
    category: "eat",
    neighborhood: "isla-cristina",
    dek: "Cómo leer la lonja y saber qué ha entrado hoy.",
    body: "",
  },
  {
    topic: "Mercado del Carmen en la capital",
    angle: "Producto fresco, puestos, horarios",
    category: "guides",
    neighborhood: "centro",
    dek: "El mercado de la capital: qué comprar y cuándo ir.",
    body: "",
  },
  {
    topic: "Conciertos de verano en la provincia",
    angle: "Agenda cultural, pueblos, fechas",
    category: "events",
    neighborhood: null,
    dek: "Música al aire libre en la provincia: de la capital a la sierra.",
    body: "",
  },
];
