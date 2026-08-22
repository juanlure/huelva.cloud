export type BarrioTag =
  | "playa"
  | "familias"
  | "noche"
  | "cultura"
  | "foodies"
  | "presupuesto"
  | "naturaleza"
  | "lujo";

export const BARRIO_TAG_LABEL: Record<BarrioTag, string> = {
  playa: "Playa",
  familias: "Familias",
  noche: "Noche",
  cultura: "Cultura",
  foodies: "Comer",
  presupuesto: "Presupuesto",
  naturaleza: "Naturaleza",
  lujo: "Sosiego",
};

export type Barrio = {
  id: string;
  name: string;
  area: string;
  vibe: string;
  stay: string;
  eat: string;
  secret: string;
  tags: BarrioTag[];
  lat: number;
  lng: number;
};

export const BARRIOS: Barrio[] = [
  {
    id: "centro",
    name: "Centro",
    area: "Huelva capital",
    vibe: "Plaza de las Monjas, Concepción, terrazas con toldo y el rumor de la ría a dos calles. Es Huelva andando: trámites, tapeo y el primer café.",
    stay: "Bien si no tienes coche y quieres todo a pie. Ruido de terraza hasta tarde en verano.",
    eat: "Tapeo clásico alrededor de Concepción y Pablo Rada. Pide gamba blanca a la plancha, no a la gabardina.",
    secret: "La merienda en el kiosco de la Plaza de las Monjas sigue siendo el ritual de las abuelas. Siéntate y mira.",
    tags: ["foodies", "cultura", "presupuesto"],
    lat: 37.2571,
    lng: -6.9495,
  },
  {
    id: "conquero",
    name: "El Conquero",
    area: "Huelva capital",
    vibe: "La loma con villas, pino y la mejor vista de la ría. Huelva se entiende desde arriba: marisma, luz y Atlántico al fondo.",
    stay: "Residencial, más silencio, más cuesta. Ideal si te gusta caminar al Parque Moret.",
    eat: "Pocas terrazas de revista. Baja al centro a comer y vuelve a dormir fresco.",
    secret: "El paseo del Moret al anochecer, cuando la ría se enciende y el silencio es de verdad.",
    tags: ["naturaleza", "familias", "lujo"],
    lat: 37.2704,
    lng: -6.9552,
  },
  {
    id: "reina-victoria",
    name: "Reina Victoria",
    area: "Huelva capital",
    vibe: "El barrio inglés de las minas: casas con porche, verjas y un aire de pueblo dentro de la ciudad. Lo llaman Barrio Obrero.",
    stay: "Bonito y pequeño. No hay oferta hotelera; es para pasear, no para instalarse.",
    eat: "Cero turismo. Un bar de barrio y a otra cosa.",
    secret: "Entra por la calle A y recorre el damero. Parece otra provincia.",
    tags: ["cultura", "familias"],
    lat: 37.2646,
    lng: -6.9412,
  },
  {
    id: "isla-chica",
    name: "Isla Chica",
    area: "Huelva capital",
    vibe: "El barrio más vivo: bloques, comercios, fútbol en la calle. El Huelva de cada día, con toda su gracia.",
    stay: "Céntrico, vivo, de precio razonable. El Huelva de cada día.",
    eat: "Bares de toda la vida, raciones generosas, desayuno de verdad.",
    secret: "Pregunta por el sitio donde desayunan los de la obra. Ahí está el café bueno.",
    tags: ["presupuesto", "foodies"],
    lat: 37.2584,
    lng: -6.9348,
  },
  {
    id: "pescaderia",
    name: "Pescadería",
    area: "Huelva capital",
    vibe: "La Huelva que mira a la ría: muelle, viento y el olor a marea. Barrio de pescadores reconvertido, todavía con carácter.",
    stay: "Buena base si te gusta caminar el Muelle del Tinto al atardecer.",
    eat: "Pescado fresco, sin teatro. Si el camarero te tutea, vas bien.",
    secret: "El Muelle de Riotinto al anochecer — la pasarela sobre el río Tinto, no el selfie del Colón.",
    tags: ["cultura", "foodies", "naturaleza"],
    lat: 37.2522,
    lng: -6.9448,
  },
  {
    id: "punta-umbria",
    name: "Punta Umbría",
    area: "Costa",
    vibe: "La playa de los onubenses. Choco, gamba, paseo marítimo y un verano que empieza en mayo.",
    stay: "Apartamento con cocina si vienes una semana. En agosto reserva con antelación.",
    eat: "Choco frito en el paseo. Gamba a la plancha. No pidas paella.",
    secret: "La flecha del Portil al atardecer, andando desde el pueblo, cuando el viento cae.",
    tags: ["playa", "foodies", "familias", "noche"],
    lat: 37.182,
    lng: -6.967,
  },
  {
    id: "mazagon",
    name: "Mazagón",
    area: "Costa",
    vibe: "Pinos, dunas y una playa ancha que no se llena igual. Más sosiego que Punta, más cerca de Doñana.",
    stay: "Parador o apartamento entre pinos. Silencio de verdad por la noche.",
    eat: "Menos oferta que Punta; elige un chiringuito de playa y no te muevas.",
    secret: "Camina hacia el este, hacia Doñana, hasta que se acaben las toallas.",
    tags: ["playa", "naturaleza", "lujo", "familias"],
    lat: 37.137,
    lng: -6.83,
  },
  {
    id: "matalascanas",
    name: "Matalascañas",
    area: "Costa / Doñana",
    vibe: "Urbanización frente a un parque nacional. Extraña y útil: toalla por la mañana, ciervos al atardecer.",
    stay: "Solo si tu plan es playa + Doñana. Fuera de temporada está casi vacío.",
    eat: "Turístico y práctico. Come bien y reserva el mejor tiempo para El Acebuche.",
    secret: "El Acebuche al amanecer, antes de que lleguen los autobuses.",
    tags: ["playa", "naturaleza", "familias"],
    lat: 37.016,
    lng: -6.555,
  },
  {
    id: "isla-cristina",
    name: "Isla Cristina",
    area: "Costa oeste",
    vibe: "Lonja, flota pesquera y gamba blanca con apellido. Ciudad marinera que no se disfraza de resort.",
    stay: "Buenos apartamentos frente a la playa de Central. El casco tiene más alma.",
    eat: "Aquí se come la gamba que sale del barco. Pregunta qué ha entrado hoy.",
    secret: "La subasta de la lonja, si te dejan mirar. Es el teatro verdadero de esta costa.",
    tags: ["playa", "foodies", "familias"],
    lat: 37.199,
    lng: -7.325,
  },
  {
    id: "ayamonte",
    name: "Ayamonte",
    area: "Frontera",
    vibe: "El Guadiana, Portugal al otro lado y un casco que se deja perder. Huelva se acaba aquí y empieza otra cosa.",
    stay: "Casco antiguo o Isla Canela si quieres playa-urbanización.",
    eat: "Marisco y frontera: un café en Vila Real de Santo António por la tarde, de vuelta a cenar.",
    secret: "El ferry peatonal al atardecer. Cinco minutos y estás en otro país.",
    tags: ["cultura", "foodies", "playa"],
    lat: 37.213,
    lng: -7.403,
  },
  {
    id: "moguer-palos",
    name: "Moguer y Palos",
    area: "Tierra llana",
    vibe: "Fresas, Colón y Juan Ramón. Pueblos blancos con más historia de la que caben en una placa.",
    stay: "Una noche si haces la ruta colombina. Desayuno en plaza y a La Rábida.",
    eat: "Vino del Condado, aceitunas, cocina casera. Nada de menú turístico de carabela.",
    secret: "La casa de Juan Ramón en Moguer, sin prisa. Luego el cementerio. Luego silencio.",
    tags: ["cultura", "foodies", "familias"],
    lat: 37.246,
    lng: -6.866,
  },
  {
    id: "aracena",
    name: "Sierra de Aracena",
    area: "Sierra",
    vibe: "Castaños, jamón de Jabugo y pueblos que huelen a encina. La otra Huelva: sierra, frío limpio, mesa seria.",
    stay: "Casa rural. En invierno chimenea; en octubre, castaña.",
    eat: "Jamón, setas, gurumelos en temporada. Un plato y agua, no un menú degustación.",
    secret: "Jabugo a primera hora. Entra en un secadero si te invitan: es el lujo de esta sierra.",
    tags: ["naturaleza", "foodies", "lujo"],
    lat: 37.891,
    lng: -6.561,
  },
];

export const NEIGHBORHOOD_COORDS: Record<string, { lat: number; lng: number }> =
  Object.fromEntries(BARRIOS.map((b) => [b.id, { lat: b.lat, lng: b.lng }]));
