// Minimal SEO data for existing guide pages

export const GUIDE_SEO: Record<
  string,
  { title: string; description: string; keywords: string[] }
> = {
  ahora: {
    title: "Huelva ahora: tiempo, viento y ocaso en vivo",
    description:
      "Temperatura, viento, minutos hasta el atardecer y cámaras DGT. El pulso en vivo de Huelva y la Costa de la Luz.",
    keywords: ["tiempo Huelva", "viento Punta Umbría", "playas Huelva hoy", "atardecer Huelva"],
  },
  marea: {
    title: "48 horas en Huelva: itinerario Costa de la Luz",
    description:
      "Qué ver en Huelva en un fin de semana: Muelle del Tinto, gamba blanca, La Rábida y una playa.",
    keywords: ["48 horas en Huelva", "qué ver en Huelva", "fin de semana Huelva"],
  },
  carta: {
    title: "Gamba blanca de Huelva: cómo pedirla y dónde comerla",
    description:
      "Guía de la gamba blanca, el choco de Punta Umbría, coquinas y Condado.",
    keywords: ["gamba blanca de Huelva", "dónde comer en Huelva", "choco Punta Umbría"],
  },
  kit: {
    title: "Cómo moverse por Huelva: horarios y transporte",
    description:
      "Manual onubense: Punta Umbría en 25 minutos, comida a las 14:00, poniente y levante.",
    keywords: ["cómo llegar a Huelva", "transporte Huelva", "Punta Umbría bus"],
  },
  rabida: {
    title: "Lugares colombinos: La Rábida, Palos y Moguer",
    description:
      "Ruta de Colón en Huelva: monasterio de La Rábida, Palos de la Frontera y Moguer.",
    keywords: ["lugares colombinos", "La Rábida", "Palos de la Frontera", "Moguer"],
  },
  orilla: {
    title: "Playas de Huelva y Costa de la Luz, según el viento",
    description:
      "Punta Umbría, Mazagón, El Portil, Isla Cristina y Matalascañas.",
    keywords: ["playas de Huelva", "Costa de la Luz", "Punta Umbría", "Mazagón"],
  },
  marisma: {
    title: "Visitar Doñana y El Rocío desde Huelva",
    description:
      "El Acebuche, El Rocío, dunas y épocas. Cómo entrar al Parque Nacional de Doñana.",
    keywords: ["Doñana", "visitar Doñana", "El Rocío", "El Acebuche"],
  },
  cafe: {
    title: "Café en Huelva: cómo pedir en la plaza",
    description:
      "Cortado, manteca colorá, café con hielo. El bar onubense.",
    keywords: ["desayuno Huelva", "Plaza de las Monjas", "manteca colorá"],
  },
  ocaso: {
    title: "Atardecer en Huelva: Muelle del Tinto y Costa de la Luz",
    description:
      "Dónde se pone el sol: Muelle de Riotinto, El Conquero, flecha del Portil, Mazagón.",
    keywords: ["atardecer Huelva", "Muelle del Tinto", "flecha del Portil"],
  },
  cuenca: {
    title: "Minas de Riotinto: tren, río rojo y Bella Vista",
    description:
      "Guía de la cuenca minera de Huelva: museo, ferrocarril turístico, Peña del Hierro.",
    keywords: ["Riotinto", "minas de Riotinto", "tren minero Riotinto"],
  },
  almanaque: {
    title: "Calendario de Huelva: Colombinas, Cinta, fresa y gurumelos",
    description:
      "Qué hacer en Huelva cada mes: Fiestas de la Cinta, Colombinas, El Rocío.",
    keywords: ["Colombinas", "Fiestas de la Cinta", "El Rocío fechas"],
  },
};

export const FAQ_HUELVA = [
  {
    q: "¿Qué ver en Huelva en un fin de semana?",
    a: "El Muelle del Tinto y el Barrio Reina Victoria el primer día; La Rábida, Palos y una playa (Punta Umbría o Mazagón) el segundo.",
  },
  {
    q: "¿Cuál es la mejor playa de Huelva?",
    a: "Depende del viento. Punta Umbría es la de los onubenses; Mazagón, pino y duna; Isla Cristina, lonja y gamba.",
  },
  {
    q: "¿Dónde comer gamba blanca de Huelva?",
    a: "En las lonjas de Isla Cristina, Punta Umbría, Ayamonte y la capital. Pídela a la plancha, con sal.",
  },
  {
    q: "¿Se puede visitar Doñana desde Huelva?",
    a: "Sí. El Acebuche (Matalascañas) y El Rocío son las puertas clásicas. Reserva visita, madruga.",
  },
  {
    q: "¿Qué son los lugares colombinos?",
    a: "El monasterio de La Rábida, Palos de la Frontera y Moguer: el estuario desde el que zarparon las naves.",
  },
  {
    q: "¿Qué ver en Riotinto?",
    a: "Museo minero, ferrocarril turístico, Peña del Hierro y Bella Vista. El río rojo es geología viva.",
  },
  {
    q: "¿Huelva es Costa de la Luz?",
    a: "Sí: más de 120 km de Atlántico, de Ayamonte a Doñana. Tres mil horas de sol.",
  },
  {
    q: "¿Qué comer además de la gamba?",
    a: "Choco frito en Punta Umbría, coquinas, mojama de Isla Cristina, jamón de Jabugo, vino del Condado.",
  },
];
