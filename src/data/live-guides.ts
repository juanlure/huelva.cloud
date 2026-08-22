export type LiveGuideId = "marea" | "carta" | "kit" | "rabida" | "orilla" | "marisma";

export type LiveGuide = {
  id: LiveGuideId;
  title: string;
  dek: string;
  image: string;
  minutes: string;
  articleSlug: string;
};

export const LIVE_GUIDES: LiveGuide[] = [
  {
    id: "marea",
    title: "48 horas al ritmo de la marea",
    dek: "Elige días, ritmo y sabor. La guía te arma el plan y tú vas tachando.",
    image: "/media/muelle.jpg",
    minutes: "Se construye",
    articleSlug: "48-horas-en-huelva",
  },
  {
    id: "carta",
    title: "La carta de la lonja",
    dek: "Qué pedir, dónde no engañan, con qué vino. Un recetario que responde.",
    image: "/media/playa.jpg",
    minutes: "5 min de mesa",
    articleSlug: "recetario-gamba-choco",
  },
  {
    id: "kit",
    title: "Kit de supervivencia onubense",
    dek: "Bus, viento, slang, horarios. Si vienes de Málaga con la maleta equivocada.",
    image: "/media/aracena.jpg",
    minutes: "Consulta",
    articleSlug: "manual-supervivencia-onubense",
  },
  {
    id: "rabida",
    title: "El camino de Colón, sin placa",
    dek: "Rábida, Palos, Moguer, el muelle. Un recorrido con paradas, no un folleto.",
    image: "/media/rocio.jpg",
    minutes: "Medio día",
    articleSlug: "colon-sin-placa",
  },
  {
    id: "orilla",
    title: "Qué playa, con este viento",
    dek: "Punta, Mazagón, Isla, Matalascañas. Filtros de verdad, no de folleto.",
    image: "/media/playa.jpg",
    minutes: "2 min",
    articleSlug: "playas-costa-de-la-luz",
  },
  {
    id: "marisma",
    title: "Doñana, sin calor de más",
    dek: "Época, aves, El Rocío, lo que no se pisa. La marisma se visita con regla.",
    image: "/media/donana.jpg",
    minutes: "Media jornada",
    articleSlug: "donana-sin-calor",
  },
];

export function liveGuideByArticle(slug: string) {
  return LIVE_GUIDES.find((g) => g.articleSlug === slug) ?? null;
}

export type MareaFlavor = "ria" | "playa" | "colon" | "sierra";
export type MareaPace = "pie" | "mixto" | "coche";
export type MareaDays = 1 | 2 | 3;

export type PlanStop = {
  id: string;
  title: string;
  slot: string;
  minutes: number;
  note: string;
  lat: number;
  lng: number;
  car?: boolean;
};

export type DayPlan = { label: string; stops: PlanStop[] };

const STOP = {
  monjas: {
    id: "monjas",
    title: "Plaza de las Monjas",
    slot: "Mañana",
    minutes: 40,
    note: "Café, tostada, kiosco. Huelva se entiende sentado, no corriendo.",
    lat: 37.257,
    lng: -6.9508,
  },
  mercado: {
    id: "carmen",
    title: "Mercado del Carmen",
    slot: "Mañana",
    minutes: 35,
    note: "Pescado del día. Pregunta, no señales con el dedo al escaparate de Instagram.",
    lat: 37.2591,
    lng: -6.9472,
  },
  reina: {
    id: "reina",
    title: "Barrio Reina Victoria",
    slot: "Mediodía",
    minutes: 30,
    note: "Diez minutos de Inglaterra minera. Se visita; no se busca hotel.",
    lat: 37.2646,
    lng: -6.9412,
  },
  gamba: {
    id: "gamba",
    title: "Gamba a la plancha",
    slot: "Comida",
    minutes: 90,
    note: "Plancha y sal. Si te la ponen a la gabardina como dogma, cambia de mesa.",
    lat: 37.2562,
    lng: -6.9518,
  },
  muelle: {
    id: "muelle",
    title: "Muelle de Riotinto",
    slot: "Atardecer",
    minutes: 50,
    note: "Hierro sobre el Tinto. El selfie es opcional; el silencio, no.",
    lat: 37.2618,
    lng: -6.9415,
  },
  conquero: {
    id: "conquero",
    title: "El Conquero / Moret",
    slot: "Tarde",
    minutes: 70,
    note: "Sube. Industria y marisma en la misma frase. Baja cuando se encienda el Polo.",
    lat: 37.2705,
    lng: -6.955,
  },
  cinta: {
    id: "cinta",
    title: "Santuario de la Cinta",
    slot: "Tarde",
    minutes: 40,
    note: "La virgen de Huelva y el mirador. Vale la cuesta.",
    lat: 37.2732,
    lng: -6.9381,
  },
  rabida: {
    id: "rabida",
    title: "La Rábida",
    slot: "Mañana",
    minutes: 70,
    note: "Monasterio pequeño. Basta. Las carabelas, si viajas con niños.",
    lat: 37.207,
    lng: -6.923,
    car: true,
  },
  palos: {
    id: "palos",
    title: "Palos de la Frontera",
    slot: "Mediodía",
    minutes: 45,
    note: "San Jorge y el pueblo. Colón salió de aquí, no de una tienda de imanes.",
    lat: 37.2276,
    lng: -6.8932,
    car: true,
  },
  moguer: {
    id: "moguer",
    title: "Moguer · Juan Ramón",
    slot: "Tarde",
    minutes: 60,
    note: "Casa-museo en una hora. Mejor sabor que cualquier placa.",
    lat: 37.2744,
    lng: -6.8386,
    car: true,
  },
  punta: {
    id: "punta",
    title: "Punta Umbría",
    slot: "Tarde-noche",
    minutes: 180,
    note: "Choco, paseo, la playa de los onubenses. Agosto, reserva.",
    lat: 37.182,
    lng: -6.967,
    car: true,
  },
  mazagon: {
    id: "mazagon",
    title: "Mazagón",
    slot: "Tarde",
    minutes: 150,
    note: "Pino, duna, menos altavoz. El Parador existe por una razón.",
    lat: 37.137,
    lng: -6.83,
    car: true,
  },
  isla: {
    id: "isla",
    title: "Isla Cristina",
    slot: "Comida",
    minutes: 120,
    note: "Lonja y gamba con apellido. Si vienes a comer mar, ven aquí.",
    lat: 37.199,
    lng: -7.325,
    car: true,
  },
  aracena: {
    id: "aracena",
    title: "Aracena",
    slot: "Día",
    minutes: 240,
    note: "Gruta, plaza, jamón. Otra provincia a una hora.",
    lat: 37.891,
    lng: -6.561,
    car: true,
  },
  riotinto: {
    id: "riotinto",
    title: "Riotinto",
    slot: "Día",
    minutes: 210,
    note: "Paisaje de Marte que fue de Gales. El tren, si te gusta el hierro.",
    lat: 37.694,
    lng: -6.594,
    car: true,
  },
} satisfies Record<string, PlanStop>;

export function buildMarea(days: MareaDays, pace: MareaPace, flavor: MareaFlavor): DayPlan[] {
  const walk = pace === "pie";
  const day1city: PlanStop[] = [STOP.monjas, STOP.mercado, STOP.reina, STOP.gamba, STOP.conquero, STOP.muelle];
  const colon: PlanStop[] = walk
    ? [STOP.monjas, STOP.gamba, STOP.muelle]
    : [STOP.rabida, STOP.palos, STOP.moguer];
  const playa: PlanStop[] =
    flavor === "playa"
      ? [STOP.monjas, STOP.punta]
      : [STOP.mazagon];
  const sierra: PlanStop[] = [STOP.aracena];

  if (days === 1) {
    if (flavor === "colon") return [{ label: "Hoy", stops: colon }];
    if (flavor === "playa") return [{ label: "Hoy", stops: [STOP.monjas, STOP.gamba, STOP.punta] }];
    if (flavor === "sierra") return [{ label: "Hoy", stops: walk ? day1city : sierra }];
    return [{ label: "Hoy", stops: day1city }];
  }

  if (days === 2) {
    if (flavor === "sierra") {
      return [
        { label: "Día 1 · Capital", stops: day1city },
        { label: "Día 2 · Sierra", stops: walk ? [STOP.cinta, STOP.muelle] : sierra },
      ];
    }
    if (flavor === "colon") {
      return [
        { label: "Día 1 · Capital", stops: day1city },
        { label: "Día 2 · Colón", stops: colon },
      ];
    }
    if (flavor === "playa") {
      return [
        { label: "Día 1 · Capital", stops: day1city },
        { label: "Día 2 · Orilla", stops: playa },
      ];
    }
    return [
      { label: "Día 1 · Ría", stops: day1city },
      { label: "Día 2 · Punta", stops: [STOP.punta] },
    ];
  }

  return [
    { label: "Día 1 · Capital", stops: day1city },
    {
      label: flavor === "sierra" ? "Día 2 · Sierra" : flavor === "colon" ? "Día 2 · Colón" : "Día 2 · Costa",
      stops: flavor === "sierra" ? (walk ? [STOP.cinta] : [STOP.aracena]) : flavor === "colon" ? colon : [STOP.isla],
    },
    {
      label: "Día 3 · Cierre",
      stops: flavor === "sierra" ? [STOP.riotinto] : [STOP.mazagon],
    },
  ];
}

export const GAMBA_SPECIES = [
  {
    id: "gamba",
    name: "Gamba blanca",
    when: "Todo el año; el banco, entre siete y treinta millas.",
    order: "A la plancha, sal. Cocida si es del día. Gabardina es fiesta, no dogma.",
    flag: "Si es roja y te la venden «de Huelva», estás comprando un apellido.",
    pair: "Condado de Huelva, blanco, frío.",
  },
  {
    id: "choco",
    name: "Choco",
    when: "La costa, sobre todo Punta.",
    order: "Frito, en el centro de la mesa. Tierno, sin pasta de harina.",
    flag: "Si está goma, cambia de mesa. No es negociable.",
    pair: "Caña o el mismo Condado.",
  },
  {
    id: "coquinas",
    name: "Coquinas",
    when: "Mejor de noviembre a abril.",
    order: "A la marinera, cuando hay. Pregunta si han entrado.",
    flag: "Fuera de temporada, no insistas. El congelador se nota.",
    pair: "Manzanilla o Condado joven.",
  },
  {
    id: "acedias",
    name: "Acedías",
    when: "Lonja de Isla y Punta.",
    order: "Fritas, enteras. Se comen con los dedos.",
    flag: "Si el tamaño es de sello y el precio de gala, sal.",
    pair: "Blanco del Condado.",
  },
  {
    id: "urta",
    name: "Urta",
    when: "Se cuela de Cádiz; aquí también se come.",
    order: "A la roteña, para compartir.",
    flag: "No la pidas el mismo día que la gamba de culto. Elige religión.",
    pair: "Un tinto ligero o el Condado con cuerpo.",
  },
  {
    id: "jamon",
    name: "Jamón de Jabugo",
    when: "Cuando subas a la sierra.",
    order: "Loncha fina, a temperatura de sala. No de nevera.",
    flag: "No lo pidas junto a la gamba en el mismo acto.",
    pair: "Un vino de la sierra, o nada. El jamón se basta.",
  },
] as const;

export const CARTA_PLACES = [
  { id: "capital", label: "Capital" },
  { id: "punta", label: "Punta Umbría" },
  { id: "isla", label: "Isla Cristina" },
  { id: "mercado", label: "Mercado" },
] as const;

export const CARTA_WANT = [
  { id: "plancha", label: "Plancha y sal" },
  { id: "cocida", label: "Cocida del día" },
  { id: "fiesta", label: "Fiesta / gabardina" },
  { id: "choco", label: "Choco" },
] as const;

export function cartaAdvice(place: string, want: string) {
  if (place === "isla" && want === "plancha") {
    return {
      say: "«La gamba que ha entrado hoy, a la plancha. De la lonja, no de la cámara.»",
      where: "Isla Cristina. Pregunta lonja antes de sentarte.",
      skip: "La carta plastificada con foto. Si el camarero no sabe el barco, hay otra mesa.",
    };
  }
  if (place === "punta" && want === "choco") {
    return {
      say: "«Un choco frito para el centro y una caña.»",
      where: "Paseo de Punta, temporada. Fuera de agosto, todavía hay sitio.",
      skip: "El sitio con menú de paella en tres idiomas.",
    };
  }
  if (place === "mercado") {
    return {
      say: "«¿Qué ha entrado? Para llevar, sin adorno.»",
      where: "Mercado del Carmen. Mañana. Domingo, cerrado.",
      skip: "Comprar gamba ya cocida a precio de gala a las 13:30.",
    };
  }
  if (want === "fiesta") {
    return {
      say: "«Gabardina, pero que se vea la gamba. Y un Condado.»",
      where: "Vale en feria y en antojo. No es el rito diario.",
      skip: "Hacer de la gabardina tu única anécdota de Huelva.",
    };
  }
  return {
    say: "«Gamba blanca a la plancha. Si no hay, choco. Nada de sangría.»",
    where: "Alrededor de Concepción y Pablo Rada, o donde el precio no sea de gala.",
    skip: "Comparar con Málaga. El camarero ya lo ha oído.",
  };
}

export const DESTINOS = [
  { id: "punta", name: "Punta Umbría", how: "Bus urbano/metropolitano en temporada. En agosto, más frecuencia de la que crees. Coche si vas con nevera.", time: "25 min" },
  { id: "mazagon", name: "Mazagón", how: "Coche. El bus existe, pero el pino pide maletero.", time: "35 min" },
  { id: "isla", name: "Isla Cristina", how: "Coche por la A-49. Tren, no.", time: "50 min" },
  { id: "aracena", name: "Aracena", how: "Coche. Curvas y castaño. En invierno, madruga.", time: "1 h 10" },
  { id: "rabida", name: "La Rábida / Palos", how: "Coche o bus comarcal. A pie desde la capital, no.", time: "20 min" },
  { id: "sevilla", name: "Sevilla (aeropuerto)", how: "El aeropuerto «de Huelva» no existe. Vuelas a SVQ y bajas en bus o alquilas.", time: "1 h 15" },
  { id: "centro", name: "Moverse por la capital", how: "Se anda. Aparcar en agosto es deporte. Parkings cubiertos y el Muelle evitan la discusión.", time: "a pie" },
] as const;

export const SLANG = [
  { word: "Onubense", sense: "De Huelva. De Onuba. No «huelveño» en voz alta el primer día." },
  { word: "Choco", sense: "Sepia. En Punta es religión. En la capital también, un poco menos ruidosa." },
  { word: "Gamba blanca", sense: "La de aquí. La roja es de otro sitio, aunque el cartel mienta." },
  { word: "La Cinta", sense: "La virgen, el santuario, septiembre. No es un adorno." },
  { word: "Colombinas", sense: "La feria de Huelva. No es la Feria de Abril. No lo mezcles." },
  { word: "Illó / miarma", sense: "Se oyen. No hace falta que los estrenes el primer café." },
  { word: "El Polo", sense: "El Polo Químico. Se ve, se huele a veces, está en la biografía. Sin discurso." },
  { word: "Poniente", sense: "El viento que arregla o estropea la playa. Pregunta en el chiringuito, no en el hotel." },
] as const;

export const COLON_STOPS: PlanStop[] = [
  {
    id: "rabida-m",
    title: "Monasterio de La Rábida",
    slot: "Parada 1",
    minutes: 50,
    note: "Pequeño, blanco, suficiente. Colón durmió aquí; tú no hace falta que te eternices.",
    lat: 37.207,
    lng: -6.923,
  },
  {
    id: "carabelas",
    title: "Muelle de las Carabelas",
    slot: "Parada 2",
    minutes: 40,
    note: "Réplicas. Ve si viajas con niños. Si no, el estuario te sobra y está bien.",
    lat: 37.2095,
    lng: -6.926,
  },
  {
    id: "palos-m",
    title: "Palos · San Jorge",
    slot: "Parada 3",
    minutes: 40,
    note: "De esta iglesia salió la expedición. El pueblo sigue siendo pueblo.",
    lat: 37.2276,
    lng: -6.8932,
  },
  {
    id: "moguer-m",
    title: "Moguer · Juan Ramón",
    slot: "Parada 4",
    minutes: 55,
    note: "Casa-museo. Una hora. Platero está en la estatua; tú, en la sombra.",
    lat: 37.2744,
    lng: -6.8386,
  },
  {
    id: "muelle-m",
    title: "Vuelta · Muelle del Tinto",
    slot: "Cierre",
    minutes: 40,
    note: "El hierro, el atardecer. Colón ya no está. La ría sí.",
    lat: 37.2618,
    lng: -6.9415,
  },
];

export type PlayaTag = "familias" | "chiringuito" | "duna" | "lonja" | "quieta" | "viento";

export const PLAYAS = [
  {
    id: "punta",
    name: "Punta Umbría",
    dek: "La playa de los onubenses. Choco, paseo, agosto imposible sin reserva.",
    image: "/media/playa.jpg",
    tags: ["chiringuito", "familias", "lonja"] as PlayaTag[],
    wind: "Con levante cambia el baño; pregunta en el chiringuito.",
    lat: 37.182,
    lng: -6.967,
  },
  {
    id: "mazagon",
    name: "Mazagón",
    dek: "Pino, duna, menos altavoz. El Parador no es casualidad.",
    image: "/media/playa.jpg",
    tags: ["duna", "quieta", "familias"] as PlayaTag[],
    wind: "Aguanta mejor el poniente. Arenales largos.",
    lat: 37.137,
    lng: -6.83,
  },
  {
    id: "matalascanas",
    name: "Matalascañas",
    dek: "Urbanización pegada a Doñana. Fuera de temporada, pueblo fantasma con toalla.",
    image: "/media/donana.jpg",
    tags: ["familias", "duna"] as PlayaTag[],
    wind: "Abierta, atlántica, sin privilegios.",
    lat: 36.966,
    lng: -6.513,
  },
  {
    id: "isla",
    name: "Isla Cristina",
    dek: "Flota pesquera. Si vienes por la gamba, la orilla es la consecuencia.",
    image: "/media/playa.jpg",
    tags: ["lonja", "chiringuito"] as PlayaTag[],
    wind: "La lonja manda más que el oleaje.",
    lat: 37.199,
    lng: -7.325,
  },
  {
    id: "elportil",
    name: "El Portil",
    dek: "Laguna, paseo, menos escena. Bien para no coincidir con el altavoz.",
    image: "/media/playa.jpg",
    tags: ["quieta", "familias", "duna"] as PlayaTag[],
    wind: "La laguna corta el golpe. Sitio de poniente razonable.",
    lat: 37.216,
    lng: -7.05,
  },
];

export const DONANA_SEASONS = [
  { id: "otono", label: "Otoño", note: "Aves, menos calor, el mejor momento si no vienes a toalla." },
  { id: "invierno", label: "Invierno", note: "Marisma llena, frío húmedo, prismáticos." },
  { id: "primavera", label: "Primavera", note: "Nidificación. Respeta el camino. El Rocío se llena." },
  { id: "verano", label: "Verano", note: "Calor de verdad. Madruga. La duna, temprano o nada." },
] as const;

export const DONANA_PATHS = [
  {
    id: "acebuche",
    title: "El Acebuche",
    note: "Centro de visitantes, observatorios, el lince en cartel y a veces en valla. Base seria.",
    lat: 37.048,
    lng: -6.58,
  },
  {
    id: "rocio",
    title: "El Rocío",
    note: "Ermita blanca, arena en la calle, caballos. No es un parque temático.",
    lat: 37.131,
    lng: -6.485,
  },
  {
    id: "duna",
    title: "Dunas y playa de Doñana",
    note: "Solo por los accesos. Fuera de senda no hay foto que lo justifique.",
    lat: 36.96,
    lng: -6.45,
  },
];
