export const FAQ_HUELVA = [
  {
    q: "¿Qué ver en Huelva en un fin de semana?",
    a: "El Muelle del Tinto y el Barrio Reina Victoria el primer día; La Rábida, Palos y una playa (Punta Umbría o Mazagón) el segundo. La guía de 48 horas de Huelva.cloud arma el plan al ritmo que elijas.",
  },
  {
    q: "¿Cuál es la mejor playa de Huelva?",
    a: "Depende del viento. Punta Umbría es la de los onubenses; Mazagón, pino y duna; Cuesta Maneli, la que buscan los foros, al borde de Doñana; Isla Cristina, lonja y gamba. La guía viva de la orilla usa el parte real.",
  },
  {
    q: "¿Dónde comer gamba blanca de Huelva?",
    a: "En las lonjas de Isla Cristina, Punta Umbría, Ayamonte y la capital. Pídela a la plancha, con sal. El recetario de la lonja te dicta la frase.",
  },
  {
    q: "¿Se puede visitar Doñana desde Huelva?",
    a: "Sí. El Acebuche (Matalascañas) y El Rocío son las puertas clásicas. Reserva visita, madruga, permanece en la senda. Mayo, octubre y el invierno claro son mejores que el mediodía de agosto.",
  },
  {
    q: "¿Qué son los lugares colombinos?",
    a: "El monasterio de La Rábida, Palos de la Frontera y Moguer: el estuario desde el que zarparon las naves. Un medio día con calma, no un sello de parking.",
  },
  {
    q: "¿Qué ver en Riotinto?",
    a: "Museo minero, ferrocarril turístico, Peña del Hierro y Bella Vista. El río rojo es geología viva. Un día en coche, sin combinarse con playa.",
  },
  {
    q: "¿Huelva es Costa de la Luz?",
    a: "Sí: más de 120 km de Atlántico, de Ayamonte a Doñana. Tres mil horas de sol. El poniente y el levante mandan el baño.",
  },
  {
    q: "¿Qué comer además de la gamba?",
    a: "Choco frito en Punta Umbría, coquinas de noviembre a abril, mojama de Isla Cristina (IGP), garbanzo de Escacena, jamón de Jabugo, vino del Condado, gurumelos en primavera, fresas de Moguer.",
  },
];

export const TOPIC_HUB = [
  {
    slug: "que-ver",
    title: "Qué ver en Huelva",
    dek: "Capital, ría, Colón, playas, Doñana, Riotinto y sierra. El mapa de la provincia.",
    href: "/que-ver" as const,
    keywords: ["qué ver en Huelva", "qué hacer en Huelva", "imprescindibles Huelva"],
  },
  {
    slug: "playas",
    title: "Playas de la Costa de la Luz",
    dek: "Punta Umbría, El Portil, Mazagón, Matalascañas, Isla Cristina. Según el viento de ahora.",
    href: "/g/$id" as const,
    id: "orilla",
    keywords: ["playas de Huelva", "Costa de la Luz", "Punta Umbría", "Mazagón"],
  },
  {
    slug: "gamba",
    title: "Gamba blanca de Huelva",
    dek: "Cómo pedirla, dónde sale, con qué vino. El producto que da nombre a esta costa.",
    href: "/g/$id" as const,
    id: "carta",
    keywords: ["gamba blanca de Huelva", "choco Punta Umbría", "marisco Huelva"],
  },
  {
    slug: "donana",
    title: "Doñana y El Rocío",
    dek: "Puertas, épocas, sendas. El parque y la aldea, a su hora.",
    href: "/g/$id" as const,
    id: "marisma",
    keywords: ["Doñana", "El Rocío", "Parque Nacional de Doñana", "El Acebuche"],
  },
  {
    slug: "colon",
    title: "Lugares colombinos",
    dek: "La Rábida, Palos de la Frontera, Moguer. El estuario de las naves.",
    href: "/g/$id" as const,
    id: "rabida",
    keywords: ["lugares colombinos", "La Rábida", "Palos de la Frontera", "Moguer"],
  },
  {
    slug: "riotinto",
    title: "Riotinto y la cuenca",
    dek: "El río rojo, el tren, Bella Vista. Un paisaje de otro planeta, de aquí.",
    href: "/g/$id" as const,
    id: "cuenca",
    keywords: ["Riotinto", "minas de Riotinto", "tren minero", "Peña del Hierro"],
  },
  {
    slug: "jabugo",
    title: "Jabugo y Sierra de Aracena",
    dek: "Jamón, castaño, Gruta de las Maravillas. La otra Huelva.",
    href: "/barrios" as const,
    keywords: ["jamón de Jabugo", "Sierra de Aracena", "Gruta de las Maravillas"],
  },
  {
    slug: "48h",
    title: "48 horas en Huelva",
    dek: "El plan se arma: días, ritmo, sabor. Tachas paradas.",
    href: "/g/$id" as const,
    id: "marea",
    keywords: ["48 horas en Huelva", "fin de semana Huelva", "escapada Huelva"],
  },
];

export const ESCUCHA = [
  {
    id: "donana",
    where: "X · prensa local",
    title: "Doñana, otra vez en el centro",
    dek: "El deslinde y el parque ocupan la conversación pública. Quien visita, que lo haga por la senda y a su hora.",
    href: "/g/$id" as const,
    idGuide: "marisma",
  },
  {
    id: "jabugo",
    where: "X · Huelva Información",
    title: "Jabugo une mesa y cultura",
    dek: "La sierra no es solo el jamón: exposiciones, hostelería, el pueblo a primera hora.",
    href: "/barrios" as const,
  },
  {
    id: "puerto",
    where: "Puerto de Huelva",
    title: "El muelle de viajeros, 1885",
    dek: "La ría como tránsito: Corrales, Aljaraque, Punta Umbría. El hierro de la capital sigue siendo el atardecer.",
    href: "/g/$id" as const,
    idGuide: "ocaso",
  },
  {
    id: "rocio",
    where: "X · rocieros",
    title: "La Blanca Paloma, siempre",
    dek: "Aunque no sea romería, El Rocío está en la boca de la provincia. Un laborable explica la aldea mejor que un sábado de helado.",
    href: "/g/$id" as const,
    idGuide: "marisma",
  },
];

export const GUIDE_SEO: Record<
  string,
  { title: string; description: string; keywords: string[] }
> = {
  ahora: {
    title: "Tiempo en Huelva ahora: viento, playas y ocaso en vivo",
    description:
      "Temperatura, poniente o levante, minutos hasta el atardecer y cámaras DGT. El pulso en vivo de Huelva y la Costa de la Luz.",
    keywords: ["tiempo Huelva", "viento Punta Umbría", "playas Huelva hoy", "atardecer Huelva"],
  },
  marea: {
    title: "48 horas en Huelva: itinerario de la Costa de la Luz",
    description:
      "Qué ver en Huelva en un fin de semana: Muelle del Tinto, gamba blanca, La Rábida y una playa. Plan interactivo.",
    keywords: ["48 horas en Huelva", "qué ver en Huelva", "fin de semana Huelva", "itinerario Huelva"],
  },
  carta: {
    title: "Gamba blanca de Huelva: cómo pedirla y dónde comerla",
    description:
      "Guía de la gamba blanca, el choco de Punta Umbría, coquinas y Condado. La frase de la lonja, lista para la mesa.",
    keywords: ["gamba blanca de Huelva", "dónde comer en Huelva", "choco Punta Umbría", "marisco Huelva"],
  },
  kit: {
    title: "Cómo moverse por Huelva: horarios, bus y palabras",
    description:
      "Manual onubense: Punta Umbría en 25 minutos, comida a las 14:00, poniente y el diccionario de la casa.",
    keywords: ["cómo llegar a Huelva", "transporte Huelva", "Punta Umbría bus", "onubense"],
  },
  rabida: {
    title: "Lugares colombinos: La Rábida, Palos y Moguer",
    description:
      "Ruta de Colón en Huelva: monasterio de La Rábida, Palos de la Frontera y Moguer. Medio día con el estuario.",
    keywords: ["lugares colombinos", "La Rábida", "Palos de la Frontera", "Moguer", "Colón Huelva"],
  },
  orilla: {
    title: "Playas de Huelva y la Costa de la Luz, según el viento",
    description:
      "Punta Umbría, Mazagón, El Portil, Isla Cristina y Matalascañas. Elige orilla con el parte real de hoy.",
    keywords: ["playas de Huelva", "Costa de la Luz", "Punta Umbría", "Mazagón", "Matalascañas", "Isla Cristina"],
  },
  marisma: {
    title: "Visitar Doñana y El Rocío desde Huelva",
    description:
      "El Acebuche, El Rocío, dunas y épocas. Cómo entrar al Parque Nacional de Doñana con respeto y con luz.",
    keywords: ["Doñana", "visitar Doñana", "El Rocío", "El Acebuche", "Parque Nacional de Doñana"],
  },
  cafe: {
    title: "Café en Huelva: cómo pedir en la Plaza de las Monjas",
    description:
      "Cortado, manteca colorá, café con hielo. El traductor del bar onubense.",
    keywords: ["desayuno Huelva", "Plaza de las Monjas", "manteca colorá", "café Huelva"],
  },
  ocaso: {
    title: "Atardecer en Huelva: Muelle del Tinto y la Costa de la Luz",
    description:
      "Dónde se pone el sol hoy: Muelle de Riotinto, El Conquero, flecha del Portil, Mazagón y Ayamonte.",
    keywords: ["atardecer Huelva", "Muelle del Tinto", "flecha del Portil", "ocaso Costa de la Luz"],
  },
  cuenca: {
    title: "Minas de Riotinto: tren, río rojo y Bella Vista",
    description:
      "Guía de la cuenca minera de Huelva: museo, ferrocarril turístico, Peña del Hierro y el paisaje rojo.",
    keywords: ["Riotinto", "minas de Riotinto", "tren minero Riotinto", "Peña del Hierro"],
  },
  almanaque: {
    title: "Calendario de Huelva: Colombinas, Cinta, fresa y gurumelos",
    description:
      "Qué hacer en Huelva cada mes: Fiestas de la Cinta, Colombinas, El Rocío, fresas y jamón de Jabugo.",
    keywords: ["Colombinas", "Fiestas de la Cinta", "El Rocío fechas", "fresas de Huelva"],
  },
};
