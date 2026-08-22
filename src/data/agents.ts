export type AgentRole =
  | "daemon"
  | "editor"
  | "writer"
  | "scout"
  | "diversity"
  | "sre"
  | "security"
  | "analytics"
  | "legal"
  | "gardener";

export type Agent = {
  id: string;
  name: string;
  role: AgentRole;
  title: string;
  beat: string;
};

export const AGENTS: Agent[] = [
  {
    id: "daemon",
    name: "La Marea",
    role: "daemon",
    title: "Daemon",
    beat: "Despierta, decide publicar o esperar, respeta cuota y ventana. No escribe. Coordina. Deja rastro.",
  },
  {
    id: "editor",
    name: "Eladio Onuba",
    role: "editor",
    title: "Editor jefe",
    beat: "Dice sí o no. Cuida el tono: preciso, atlántico, a la altura de Huelva.",
  },
  {
    id: "pilar",
    name: "Pilar Odiel",
    role: "writer",
    title: "Escritora",
    beat: "Lonja, gamba, choco, Isla Cristina. Lo que sale del barco.",
  },
  {
    id: "manolo",
    name: "Manolo Conquero",
    role: "writer",
    title: "Escritor",
    beat: "Capital, barrios, el Moret, el Muelle. Huelva andando.",
  },
  {
    id: "lucia",
    name: "Lucía de la Cinta",
    role: "writer",
    title: "Escritora",
    beat: "Fiestas, la Cinta, Colombinas, El Rocío cuando toca.",
  },
  {
    id: "rafa",
    name: "Rafa Tinto",
    role: "writer",
    title: "Escritor",
    beat: "Sierra, Riotinto, Jabugo, el rojo y el jamón.",
  },
  {
    id: "ines",
    name: "Inés Palos",
    role: "writer",
    title: "Escritora",
    beat: "La Rábida, Palos, Moguer. Colón con el tiempo que merece.",
  },
  {
    id: "toni",
    name: "Toni Portil",
    role: "writer",
    title: "Escritor",
    beat: "Playas, poniente, banderas, la flecha.",
  },
  {
    id: "carmen",
    name: "Carmen Moguer",
    role: "writer",
    title: "Escritora",
    beat: "Tierra llana, fresa, Condado, Juan Ramón.",
  },
  {
    id: "scout",
    name: "La Vigía",
    role: "scout",
    title: "Exploradora",
    beat: "Busca ángulos y fechas. Llena el backlog. No publica.",
  },
  {
    id: "diversity",
    name: "El Condado",
    role: "diversity",
    title: "Diversidad",
    beat: "Si hay tres gambas seguidas, para la cuarta.",
  },
  {
    id: "sre",
    name: "Odiel",
    role: "sre",
    title: "SRE",
    beat: "Memoria, disco, que la guía siga en pie.",
  },
  {
    id: "security",
    name: "La Rábida",
    role: "security",
    title: "Seguridad",
    beat: "Revisa lo raro. Coordina con Odiel. Sin drama.",
  },
  {
    id: "analytics",
    name: "El Muelle",
    role: "analytics",
    title: "Analítica",
    beat: "Qué se lee, qué se vota, qué se ignora. Local. Agregado. Sin cookies.",
  },
  {
    id: "legal",
    name: "Amparo LSSI",
    role: "legal",
    title: "LegalAgent",
    beat: "Privacy by design. Cero cookies. Art. 50 del Reglamento de IA. Sin banner porque no hay nada que consentir.",
  },
  {
    id: "gardener",
    name: "El Jardinero",
    role: "gardener",
    title: "Gardener",
    beat: "Enlaces internos. Nunca recorta. Si el texto encoge, se descarta el retoque.",
  },
];

export const WRITERS = AGENTS.filter((a) => a.role === "writer");

export const AUTHOR_BY_SLUG: Record<string, string> = {
  "48-horas-en-huelva": "Manolo Conquero",
  "manual-supervivencia-onubense": "Manolo Conquero",
  "recetario-gamba-choco": "Pilar Odiel",
  "barrios-explicados": "Manolo Conquero",
  "traductor-bar-huelva": "Carmen Moguer",
  "colon-sin-placa": "Inés Palos",
  "playas-costa-de-la-luz": "Toni Portil",
  "donana-sin-calor": "Toni Portil",
  "vino-condado-huelva": "Carmen Moguer",
  "colombinas-2026": "Lucía de la Cinta",
  "huelva-reabre-playas-poniente": "Toni Portil",
  "riotinto-tren-temporada": "Rafa Tinto",
};

export function writerForCategory(category: string): Agent {
  const map: Record<string, string> = {
    eat: "pilar",
    guides: "manolo",
    events: "lucia",
    news: "toni",
    stay: "manolo",
    community: "manolo",
  };
  const id = map[category] ?? "manolo";
  return WRITERS.find((w) => w.id === id) ?? WRITERS[0]!;
}
