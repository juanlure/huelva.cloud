export type LiveGuideId =
  | "marea"
  | "carta"
  | "kit"
  | "rabida"
  | "orilla"
  | "marisma"
  | "cafe"
  | "ocaso"
  | "cuenca"
  | "almanaque"
  | "ahora";

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
    id: "ahora",
    title: "Ahora mismo",
    dek: "Viento, temperatura, ocaso y el consejo de esta hora. Datos reales, provincia en vivo.",
    image: "/media/muelle.jpg",
    minutes: "En vivo",
    articleSlug: "ocaso-en-huelva",
  },
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
    dek: "Qué pedir, con qué vino, en qué mesa. El recetario de la gamba blanca.",
    image: "/media/gamba.jpg",
    minutes: "5 min de mesa",
    articleSlug: "recetario-gamba-choco",
  },
  {
    id: "kit",
    title: "Manual onubense",
    dek: "Cómo moverse, a qué hora sentarse, qué viento sopla y las palabras de la casa.",
    image: "/media/monjas.jpg",
    minutes: "Consulta",
    articleSlug: "manual-supervivencia-onubense",
  },
  {
    id: "rabida",
    title: "El camino de Colón",
    dek: "Rábida, Palos, Moguer y el muelle. Un recorrido con el tiempo que merece.",
    image: "/media/rabida.jpg",
    minutes: "Medio día",
    articleSlug: "colon-sin-placa",
  },
  {
    id: "orilla",
    title: "Qué playa, con este viento",
    dek: "Punta, Mazagón, Isla, Matalascañas. Elige orilla según el viento y el día.",
    image: "/media/mazagon.jpg",
    minutes: "2 min",
    articleSlug: "playas-costa-de-la-luz",
  },
  {
    id: "marisma",
    title: "Doñana, a su hora",
    dek: "Época, aves, El Rocío, las sendas. La marisma se visita con respeto y con luz.",
    image: "/media/donana.jpg",
    minutes: "Media jornada",
    articleSlug: "donana-sin-calor",
  },
  {
    id: "cafe",
    title: "El café de las Monjas",
    dek: "Cómo se pide el café, la tostada y la caña en Huelva. La frase de la casa, lista para decir.",
    image: "/media/monjas.jpg",
    minutes: "2 min de barra",
    articleSlug: "traductor-bar-huelva",
  },
  {
    id: "ocaso",
    title: "Dónde se pone el sol",
    dek: "Muelle, flecha, Conquero, Guadiana. Elige hora y orilla: Huelva mira al oeste de verdad.",
    image: "/media/muelle.jpg",
    minutes: "Al atardecer",
    articleSlug: "ocaso-en-huelva",
  },
  {
    id: "cuenca",
    title: "La cuenca roja",
    dek: "Riotinto: el río, el tren, el pueblo británico. Un paisaje que parece de otro planeta y es de aquí.",
    image: "/media/riotinto.jpg",
    minutes: "Un día",
    articleSlug: "riotinto-la-cuenca",
  },
  {
    id: "almanaque",
    title: "El año onubense",
    dek: "Fresas, Colombinas, la Cinta, gurumelos, el primer baño. Qué toca cada mes.",
    image: "/media/rocio.jpg",
    minutes: "Consulta",
    articleSlug: "almanaque-onubense",
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
    note: "Pescado del día. Pregunta qué ha entrado. El mercado es la primera mesa.",
    lat: 37.2591,
    lng: -6.9472,
  },
  reina: {
    id: "reina",
    title: "Barrio Reina Victoria",
    slot: "Mediodía",
    minutes: 30,
    note: "Diez minutos de Inglaterra minera. Un damero único, para recorrerlo despacio.",
    lat: 37.2646,
    lng: -6.9412,
  },
  gamba: {
    id: "gamba",
    title: "Gamba a la plancha",
    slot: "Comida",
    minutes: 90,
    note: "Plancha y sal. El producto que da nombre a esta costa.",
    lat: 37.2562,
    lng: -6.9518,
  },
  muelle: {
    id: "muelle",
    title: "Muelle de Riotinto",
    slot: "Atardecer",
    minutes: 50,
    note: "Hierro sobre el Tinto. El atardecer más noble de la capital.",
    lat: 37.2618,
    lng: -6.9415,
  },
  conquero: {
    id: "conquero",
    title: "El Conquero / Moret",
    slot: "Tarde",
    minutes: 70,
    note: "Sube. Marisma, pino y la ría en una sola mirada. Baja cuando se enciendan las luces.",
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
    when: "Todo el año. Lonjas de Isla Cristina, Ayamonte, Punta Umbría y la capital. FAO 27.9.a.",
    order: "A la plancha, sal. Cocida si es del día. Gabardina es fiesta, no dogma.",
    flag: "Rosa claro parduzco, casi transparente. Bigote largo, veta oscura. Pídela por su nombre.",
    pair: "Condado de Huelva, blanco, frío.",
  },
  {
    id: "choco",
    name: "Choco",
    when: "La costa, sobre todo Punta.",
    order: "Frito, en el centro de la mesa. Tierno, sin pasta de harina.",
    flag: "Pídelo tierno, limpio, sin harina de más. El punto se nota al primer bocado.",
    pair: "Caña o el mismo Condado.",
  },
  {
    id: "coquinas",
    name: "Coquinas",
    when: "Mejor de noviembre a abril.",
    order: "A la marinera, cuando hay. Pregunta si han entrado.",
    flag: "En su temporada, no hay mejor tapa. Pregunta si han entrado.",
    pair: "Manzanilla o Condado joven.",
  },
  {
    id: "acedias",
    name: "Acedías",
    when: "Lonja de Isla y Punta.",
    order: "Fritas, enteras. Se comen con los dedos.",
    flag: "El tamaño y el brillo lo dicen todo. Una buena casa te las pone con orgullo.",
    pair: "Blanco del Condado.",
  },
  {
    id: "urta",
    name: "Urta",
    when: "Golfo de Cádiz. En las lonjas onubenses también entra.",
    order: "A la roteña, para compartir.",
    flag: "Comparte mesa. Gamba y urta pueden convivir; el ritmo, no la prisa.",
    pair: "Un tinto ligero o el Condado con cuerpo.",
  },
  {
    id: "jamon",
    name: "Jamón de Jabugo",
    when: "Cuando subas a la sierra.",
    order: "Loncha fina, a temperatura de sala. No de nevera.",
    flag: "La sierra es otra mesa. Loncha fina, temperatura de sala. El jamón se basta.",
    pair: "Un vino de la sierra, o nada. El jamón se basta.",
  },
  {
    id: "mojama",
    name: "Mojama de Isla Cristina",
    when: "Todo el año. IGP de esta lonja.",
    order: "Loncha fina, aceite, tomate. No es un adorno: es atún curado al aire.",
    flag: "La IGP es de Isla Cristina. Pídela por su pueblo.",
    pair: "Condado, o una caña corta.",
  },
  {
    id: "gurumelo",
    name: "Gurumelo",
    when: "Primavera, si el año acompaña. Sierra de Aracena.",
    order: "Revuelto o a la plancha. Pregunta si han salido.",
    flag: "La seta de esta sierra. No se improvisan en agosto.",
    pair: "Un tinto de guarda, o el vino de la casa serrana.",
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
      say: "«La gamba que ha entrado hoy, a la plancha. De la lonja.»",
      where: "Isla Cristina. Pregunta qué barco, siéntate con calma.",
      skip: "La pizarra corta gana a cualquier carta ilustrada.",
    };
  }
  if (place === "punta" && want === "choco") {
    return {
      say: "«Un choco frito para el centro y una caña.»",
      where: "Paseo de Punta, en temporada. Entre semana, todavía mejor.",
      skip: "El Condado o la caña: déjales el maridaje a ellos.",
    };
  }
  if (place === "mercado") {
    return {
      say: "«¿Qué ha entrado? Para llevar, así, sin adorno.»",
      where: "Mercado del Carmen. Mañana. Domingo, cerrado.",
      skip: "La gamba se elige con luz. Madruga un poco.",
    };
  }
  if (want === "fiesta") {
    return {
      say: "«Gabardina, pero que se vea la gamba. Y un Condado.»",
      where: "Vale en feria y en antojo. Un capricho bien hecho.",
      skip: "Después, vuelve a la plancha. Es el rito de esta costa.",
    };
  }
  return {
    say: "«Gamba blanca a la plancha. Si no hay, choco. Un Condado, frío.»",
    where: "Concepción, Pablo Rada, o cualquier casa que nombre el origen.",
    skip: "Huelva se defiende sola. No hace falta comparar.",
  };
}

export const DESTINOS = [
  { id: "punta", name: "Punta Umbría", how: "Bus metropolitano en temporada, con buena frecuencia en verano. Coche si vas con nevera y tiempo.", time: "25 min" },
  { id: "mazagon", name: "Mazagón", how: "Coche, por pinos. El bus existe; el maletero ayuda.", time: "35 min" },
  { id: "isla", name: "Isla Cristina", how: "Coche por la A-49. Un trayecto de costa oeste, cómodo.", time: "50 min" },
  { id: "aracena", name: "Aracena", how: "Coche. Curvas, castaño, otra temperatura. En invierno, madruga.", time: "1 h 10" },
  { id: "rabida", name: "La Rábida / Palos", how: "Coche o bus comarcal. Veinte minutos y el estuario.", time: "20 min" },
  { id: "sevilla", name: "Aeropuerto de Sevilla", how: "Se vuela a SVQ y se baja a Huelva en bus o con coche de alquiler. Un traslado sencillo.", time: "1 h 15" },
  { id: "centro", name: "Moverse por la capital", how: "Se anda, y se anda bien. Parkings cubiertos junto al Muelle si vienes en coche.", time: "a pie" },
] as const;

export const SLANG = [
  { word: "Onubense", sense: "De Huelva. De Onuba, el nombre fenicio y romano. El gentilicio de la casa." },
  { word: "Onuba", sense: "Onoba, Onuba Aestuaria. Fortaleza de Baal, puerto entre Tinto y Odiel." },
  { word: "El Decano", sense: "El Recreativo de Huelva, 1889, Casa Colón. El club de fútbol más antiguo de España." },
  { word: "Zalema", sense: "La uva del Condado. El blanco que va con la gamba." },
  { word: "Gurumelo", sense: "Amanita ponderosa. La seta de la sierra, en primavera." },
  { word: "Mojama", sense: "Atún curado. En Isla Cristina tiene IGP." },
  { word: "Choco", sense: "Sepia. En Punta es institución. En la capital, también se celebra." },
  { word: "Gamba blanca", sense: "La de estos bancos de arena. Pálida, de cristal, única." },
  { word: "La Cinta", sense: "La virgen, el santuario, septiembre. La fiesta que mira a la ría." },
  { word: "Colombinas", sense: "La feria de Huelva. Alegre, de casa, a finales de julio." },
  { word: "Illó / miarma", sense: "Se oyen. Llegan solas, con los días y la mesa." },
  { word: "Poniente", sense: "El viento que ordena la playa. Pregunta en el chiringuito: es la meteorología local." },
] as const;

export const COLON_STOPS: PlanStop[] = [
  {
    id: "rabida-m",
    title: "Monasterio de La Rábida",
    slot: "Parada 1",
    minutes: 50,
    note: "Mudéjar, íntimo, suficiente. El claustro y el pinar. Colón durmió aquí antes de zarpar.",
    lat: 37.207,
    lng: -6.923,
  },
  {
    id: "carabelas",
    title: "Muelle de las Carabelas",
    slot: "Parada 2",
    minutes: 40,
    note: "Réplicas de las naves. Con niños, emocionan. El estuario es el decorado de todos.",
    lat: 37.2095,
    lng: -6.926,
  },
  {
    id: "palos-m",
    title: "Palos · San Jorge",
    slot: "Parada 3",
    minutes: 40,
    note: "De esta iglesia salió la expedición, el 3 de agosto de 1492. Martín Alonso Pinzón, la Fontanilla, el pueblo. Palos no es un anexo.",
    lat: 37.2276,
    lng: -6.8932,
  },
  {
    id: "moguer-m",
    title: "Moguer · Juan Ramón",
    slot: "Parada 4",
    minutes: 55,
    note: "Casa-museo. Una hora. Nobel de 1956, nacido en 1881. Platero, la plaza, el silencio que le sienta.",
    lat: 37.2744,
    lng: -6.8386,
  },
  {
    id: "muelle-m",
    title: "Vuelta · Muelle del Tinto",
    slot: "Cierre",
    minutes: 40,
    note: "El hierro, el atardecer. La ría, todavía. El cierre que merece el día.",
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
    image: "/media/punta.jpg",
    tags: ["duna", "quieta", "familias"] as PlayaTag[],
    wind: "Aguanta mejor el poniente. Arenales largos.",
    lat: 37.137,
    lng: -6.83,
  },
  {
    id: "matalascanas",
    name: "Matalascañas",
    dek: "La orilla de Doñana. Fuera de temporada, una calma rara y preciosa.",
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
    image: "/media/isla.jpg",
    tags: ["lonja", "chiringuito"] as PlayaTag[],
    wind: "La lonja manda más que el oleaje.",
    lat: 37.199,
    lng: -7.325,
  },
  {
    id: "elportil",
    name: "El Portil",
    dek: "Laguna, paseo, menos escena. Bien para no coincidir con el altavoz.",
    image: "/media/mazagon.jpg",
    tags: ["quieta", "familias", "duna"] as PlayaTag[],
    wind: "La laguna corta el golpe. Sitio de poniente razonable.",
    lat: 37.216,
    lng: -7.05,
  },
  {
    id: "maneli",
    name: "Cuesta Maneli",
    dek: "La que buscan los foros. Pasarela, duna, Doñana. Salvaje, entre Mazagón y Matalascañas.",
    image: "/media/mazagon.jpg",
    tags: ["duna", "quieta"] as PlayaTag[],
    wind: "Abierta. El parque manda más que el chiringuito.",
    lat: 37.058,
    lng: -6.55,
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

export const CAFE_DRINKS = [
  { id: "solo", label: "Solo", say: "un café solo" },
  { id: "cortado", label: "Cortado", say: "un cortado" },
  { id: "leche", label: "Con leche", say: "un café con leche" },
  { id: "manchado", label: "Manchado", say: "un manchado" },
  { id: "hielo", label: "Con hielo", say: "un café con hielo" },
] as const;

export const CAFE_BREAD = [
  { id: "aceite", label: "Aceite", say: "tostada de aceite" },
  { id: "tomate", label: "Tomate", say: "tostada de tomate" },
  { id: "manteca", label: "Manteca colorá", say: "tostada de manteca colorá" },
  { id: "lomo", label: "Lomo", say: "tostada de lomo" },
  { id: "nada", label: "Sin tostada", say: null },
] as const;

export function cafePhrase(drink: string, bread: string) {
  const d = CAFE_DRINKS.find((x) => x.id === drink) ?? CAFE_DRINKS[2];
  const b = CAFE_BREAD.find((x) => x.id === bread) ?? CAFE_BREAD[0];
  const ice =
    drink === "hielo"
      ? " El hielo viene aparte: lo tiras tú. Es el rito, no un olvido."
      : "";
  if (!b.say) {
    return {
      say: `«${d.say.charAt(0).toUpperCase()}${d.say.slice(1)}.»`,
      where: "Plaza de las Monjas, o cualquier barra que abra con la ciudad.",
      note: `En Huelva el café se pide por su nombre.${ice}`,
    };
  }
  return {
    say: `«${d.say.charAt(0).toUpperCase()}${d.say.slice(1)} y una ${b.say}.»`,
    where:
      bread === "manteca"
        ? "Las Monjas, por la mañana. La manteca colorá es de esta tierra."
        : "Plaza de las Monjas, kiosco, sombra. El desayuno de la capital.",
    note:
      drink === "hielo"
        ? "Vaso de hielo aparte. Lo tiras tú. Un rito andaluz, bien hecho."
        : "Caña corta si es mediodía. Condado si la mesa ya es de verdad.",
  };
}

export const OCASO_SPOTS = [
  {
    id: "muelle",
    title: "Muelle de Riotinto",
    area: "Capital",
    when: "Todo el año. En verano, a partir de las 20:30; en invierno, a las 18:00 ya es cobre.",
    note: "Hierro sobre el Tinto. El atardecer más noble de la ciudad. Veinte minutos a pie desde las Monjas.",
    lat: 37.2618,
    lng: -6.9415,
    tag: "capital" as const,
  },
  {
    id: "conquero",
    title: "El Conquero / Parque Moret",
    area: "Capital",
    when: "Mejor de octubre a mayo, cuando el aire está limpio.",
    note: "La ría entera, pino y altura. Huelva se entiende desde aquí, con el sol cayendo al oeste.",
    lat: 37.2705,
    lng: -6.955,
    tag: "capital" as const,
  },
  {
    id: "flecha",
    title: "Flecha del Portil",
    area: "Costa",
    when: "De abril a octubre. El poniente a veces ayuda; a veces tumba.",
    note: "Arena, marisma y agua a ambos lados. Anda desde Punta cuando caiga el viento.",
    lat: 37.21,
    lng: -7.045,
    tag: "costa" as const,
  },
  {
    id: "mazagon",
    title: "Mazagón, hacia el este",
    area: "Costa",
    when: "Todo el año. Las noches de septiembre son las más largas de luz.",
    note: "Pinos hasta la duna. Camina hasta que se acaben las toallas. El sol se pone en el mar.",
    lat: 37.137,
    lng: -6.83,
    tag: "costa" as const,
  },
  {
    id: "guadiana",
    title: "Ferry de Ayamonte",
    area: "Frontera",
    when: "La tabla del ferry manda. El atardecer sobre el Guadiana es un privilegio breve.",
    note: "Cinco minutos y Portugal. La luz del río es otra: ancha, lenta, de frontera.",
    lat: 37.213,
    lng: -7.403,
    tag: "frontera" as const,
  },
  {
    id: "isla",
    title: "Lonja de Isla Cristina",
    area: "Costa oeste",
    when: "Tardes de mar en calma. El puerto se dora.",
    note: "No es un mirador de postal: es una flota que vuelve. El sol, el cobre de los barcos, la gamba que entra.",
    lat: 37.199,
    lng: -7.321,
    tag: "costa" as const,
  },
];

export const CUENCA_STOPS: PlanStop[] = [
  {
    id: "museo",
    title: "Museo Minero",
    slot: "Mañana",
    minutes: 75,
    note: "La compañía británica, 1873. El ferrocarril, la cuenca explicada. Empieza aquí: el paisaje luego se lee solo.",
    lat: 37.694,
    lng: -6.593,
    car: true,
  },
  {
    id: "tren",
    title: "Ferrocarril turístico",
    slot: "Mediodía",
    minutes: 90,
    note: "Un tren viejo en tierra colorada. Reserva en temporada. Agua, sombrero, calzado cerrado. El rojo mancha.",
    lat: 37.696,
    lng: -6.594,
    car: true,
  },
  {
    id: "pena",
    title: "Peña del Hierro",
    slot: "Tarde",
    minutes: 60,
    note: "El corte en la tierra. Corta y enorme. NASA estudió estas aguas; tú, míralas con respeto.",
    lat: 37.726,
    lng: -6.557,
    car: true,
  },
  {
    id: "bella",
    title: "Bella Vista",
    slot: "Tarde",
    minutes: 40,
    note: "El barrio inglés de la cuenca. Porches, césped. El mismo linaje que Reina Victoria (1916), en su origen.",
    lat: 37.691,
    lng: -6.599,
    car: true,
  },
  {
    id: "rio",
    title: "El cauce del Tinto",
    slot: "Cierre",
    minutes: 30,
    note: "El río baja rojo hacia Huelva. No es un vino: es hierro, bacterias, geología viva. La postal más extraña de Europa.",
    lat: 37.68,
    lng: -6.56,
    car: true,
  },
];

export const ALMANAQUE = [
  {
    id: "01",
    month: "Enero",
    table: "Jamón de Jabugo, gurumelos si el año acompaña",
    light: "Sierra fría, capital clara",
    rite: "Gruta de las Maravillas. Chimenea. Pocas toallas.",
  },
  {
    id: "02",
    month: "Febrero",
    table: "Fresón temprano, todavía de olor",
    light: "Días que se alargan",
    rite: "Carnaval de Isla Cristina. La costa oeste se disfraza con oficio.",
  },
  {
    id: "03",
    month: "Marzo",
    table: "Primeras coquinas, si el mar quiere",
    light: "Equinoccio sobre la ría",
    rite: "Semana Santa en la capital. Silencio, incienso, la Cinta al fondo.",
  },
  {
    id: "04",
    month: "Abril",
    table: "Fresa en su punto. Condado nuevo",
    light: "Doñana se llena de aves",
    rite: "Acebuche al amanecer. La marisma, verde.",
  },
  {
    id: "05",
    month: "Mayo",
    table: "Fresa y gamba, ya juntas",
    light: "El primer baño serio",
    rite: "El Rocío, cuando cae. Fe, arena, hermandad. Un país aparte.",
  },
  {
    id: "06",
    month: "Junio",
    table: "Choco de Punta, gamba a la plancha",
    light: "San Juan, hogueras en la orilla",
    rite: "La costa se enciende. Reserva si vienes a Punta.",
  },
  {
    id: "07",
    month: "Julio",
    table: "Lonja a pleno. Condado frío",
    light: "Tres mil horas, en su mitad",
    rite: "Colombinas: casetas, Recinto Ferial, la ciudad de gala.",
  },
  {
    id: "08",
    month: "Agosto",
    table: "Gamba, choco, helado de la casa",
    light: "El poniente manda la playa",
    rite: "Atlántico de verdad. Mazagón si buscas orilla ancha.",
  },
  {
    id: "09",
    month: "Septiembre",
    table: "El mejor mes de mesa y baño",
    light: "El agua sigue; la toalla, no tanto",
    rite: "Fiestas de la Cinta. La virgen de Huelva, el santuario, la loma.",
  },
  {
    id: "10",
    month: "Octubre",
    table: "Setas, castaña, jamón de nuevo",
    light: "Riotinto, suave. Doñana, clara",
    rite: "Sube a la cuenca o a Aracena. La provincia se abre hacia el norte.",
  },
  {
    id: "11",
    month: "Noviembre",
    table: "Gurumelos, caza de temporada, Condado de guarda",
    light: "Playas vacías, luz baja",
    rite: "Paseo en el Muelle con abrigo. Huelva, íntima.",
  },
  {
    id: "12",
    month: "Diciembre",
    table: "Jamón, marisco de fiesta, manteca",
    light: "Noches tempranas, ría en calma",
    rite: "Navidad en las Monjas. La sierra, si quieres frío limpio.",
  },
] as const;
