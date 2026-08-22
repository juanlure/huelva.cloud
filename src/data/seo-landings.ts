export type SeoLanding = {
  slug: string;
  h1: string;
  title: string;
  description: string;
  kicker: string;
  lede: string;
  image: string;
  imageAlt: string;
  keywords: string[];
  guideId: string;
  sections: { h: string; p: string }[];
  faqs: { q: string; a: string }[];
};

export const SEO_LANDINGS: SeoLanding[] = [
  {
    slug: "gamba-blanca-de-huelva",
    h1: "Gamba blanca de Huelva",
    title: "Gamba blanca de Huelva: cómo pedirla, dónde comerla y por qué es la de referencia",
    description:
      "Guía de referencia de la gamba blanca de Huelva (IGP): a la plancha, en Isla Cristina, Punta Umbría y la capital. Cómo distinguirla y qué vino pedir.",
    kicker: "Producto · IGP",
    lede: "La gamba blanca de Huelva es el marisco de esta costa: rosa claro, casi transparente en crudo, dulce a la plancha con sal. Huelva.cloud es la guía de referencia para pedirla bien.",
    image: "/media/gamba.jpg",
    imageAlt: "Gamba blanca de Huelva IGP",
    keywords: [
      "gamba blanca de Huelva",
      "dónde comer gamba blanca",
      "IGP gamba blanca",
      "marisco Huelva",
      "choco Punta Umbría",
      "lonja Isla Cristina",
    ],
    guideId: "carta",
    sections: [
      {
        h: "Qué es la gamba blanca de Huelva",
        p: "No es un eslogan: es Indicación Geográfica Protegida. Sale de las lonjas de Isla Cristina, Punta Umbría, Ayamonte y la capital. En crudo, un rosa parduzco casi de cristal. En la plancha, dulce, con el yodo justo. Si la ves naranja de paquete, no es esta.",
      },
      {
        h: "Cómo pedirla",
        p: "A la plancha, con sal. Ración para compartir. El camarero de aquí no espera un discurso: «gamba blanca a la plancha». Si está en su punto, pide otra. El Condado frío aguanta el yodo; la caña, si la mesa es de mediodía.",
      },
      {
        h: "Dónde comer gamba blanca",
        p: "Isla Cristina si vienes por la flota. Punta Umbría si quieres choco y gamba en la misma sobremesa. La capital, en el entorno de Concepción y Pablo Rada. Ayamonte, con el Guadiana al lado. La guía viva de la lonja te dicta la frase según el pueblo.",
      },
      {
        h: "Gamba, choco y coquinas",
        p: "La mesa onubense no es un solo plato. El choco frito de Punta, las coquinas cuando el mar quiere, el vino del Condado. Huelva.cloud junta producto, sitio y hora: no es un recetario de revista, es la carta de esta costa.",
      },
    ],
    faqs: [
      {
        q: "¿Cuál es la mejor gamba blanca de Huelva?",
        a: "La de lonja del día, a la plancha, en Isla Cristina, Punta Umbría o la capital. El IGP garantiza origen; el punto lo pone la plancha.",
      },
      {
        q: "¿Gamba blanca o langostino?",
        a: "No es lo mismo. La blanca de Huelva es más fina, más dulce, de este caladero. El langostino es otra pieza.",
      },
    ],
  },
  {
    slug: "playas-de-huelva",
    h1: "Playas de Huelva y la Costa de la Luz",
    title: "Playas de Huelva: Punta Umbría, Mazagón, Isla Cristina y Matalascañas",
    description:
      "Guía de las playas de Huelva y la Costa de la Luz. Punta Umbría, El Portil, Mazagón, Matalascañas e Isla Cristina, según el viento de hoy.",
    kicker: "Costa de la Luz · 122 km",
    lede: "Las playas de Huelva son Atlántico de verdad: ciento veintidós kilómetros de Costa de la Luz, de Ayamonte a Doñana. El poniente y el levante mandan el baño. Esta es la guía de referencia.",
    image: "/media/mazagon.jpg",
    imageAlt: "Playa de la Costa de la Luz con pino y duna",
    keywords: [
      "playas de Huelva",
      "Costa de la Luz",
      "Punta Umbría playa",
      "Mazagón",
      "Matalascañas",
      "Isla Cristina playa",
      "El Portil",
      "mejores playas Huelva",
    ],
    guideId: "orilla",
    sections: [
      {
        h: "Punta Umbría",
        p: "La playa de los onubenses. Paseo, choco, agosto con reserva. Con levante el baño cambia: pregunta en el chiringuito. Fuera de agosto, es otra costa, más noble.",
      },
      {
        h: "Mazagón y El Portil",
        p: "Mazagón es pino, duna y el Parador. Aguanta mejor el poniente. El Portil, laguna y menos altavoz. Si buscas orilla ancha sin escena, estas dos.",
      },
      {
        h: "Matalascañas e Isla Cristina",
        p: "Matalascañas es la orilla de Doñana: atlántica, sin privilegios, preciosa fuera de temporada. Isla Cristina es flota primero y toalla después: vienes por la gamba y el mar es la consecuencia.",
      },
      {
        h: "El viento decide",
        p: "Huelva.cloud no te recita un ranking eterno. Lee el parte real —levante, poniente, calma— y te dice qué orilla toca hoy. Eso es una guía viva, no un folleto.",
      },
    ],
    faqs: [
      {
        q: "¿Cuál es la mejor playa de Huelva?",
        a: "Según el viento. Punta Umbría es la de casa; Mazagón, pino y duna; Matalascañas, Doñana; Isla Cristina, lonja. La guía de la orilla usa el parte de ahora.",
      },
      {
        q: "¿Huelva es Costa de la Luz?",
        a: "Sí. Más de 120 km de Atlántico andaluz, de la frontera portuguesa a las dunas de Doñana. Tres mil horas de sol.",
      },
    ],
  },
  {
    slug: "donana",
    h1: "Doñana desde Huelva",
    title: "Visitar Doñana y El Rocío desde Huelva: Acebuche, sendas y épocas",
    description:
      "Guía de referencia para visitar el Parque Nacional de Doñana desde Huelva: El Acebuche, El Rocío, dunas, aves y cómo entrar con respeto.",
    kicker: "Parque Nacional",
    lede: "Doñana se visita desde Huelva: El Acebuche, El Rocío, la marisma y las dunas. No es un parque temático. Huelva.cloud te dice la época, la puerta y la hora.",
    image: "/media/donana.jpg",
    imageAlt: "Caballos en las marismas de Doñana",
    keywords: [
      "Doñana",
      "visitar Doñana",
      "Parque Nacional de Doñana",
      "El Acebuche",
      "El Rocío",
      "Doñana desde Huelva",
    ],
    guideId: "marisma",
    sections: [
      {
        h: "Cómo entrar a Doñana",
        p: "El Acebuche, junto a Matalascañas, es la puerta seria: centro de visitantes, observatorios, sendas. El Rocío es la aldea: arena en la calle, ermita blanca, caballos. Las dos son Huelva. Reserva visita guiada si quieres el interior del parque.",
      },
      {
        h: "Cuándo ir",
        p: "Otoño e invierno claro: aves y marisma. Primavera: nidificación, respeto máximo. Verano: calor de verdad, madrugón o nada. Mayo junta a veces El Rocío: elige si buscas parque o romería.",
      },
      {
        h: "Reglas que no son folclore",
        p: "Permanece en la senda. Sin drones. Agua, sombrero. Fuera de camino no hay foto que lo justifique. Doñana se cuida así, y Huelva lo sabe.",
      },
    ],
    faqs: [
      {
        q: "¿Se puede visitar Doñana desde Huelva capital?",
        a: "Sí. Coche hacia Matalascañas (Acebuche) o El Rocío. Media jornada si madrugas. No lo improvises en agosto a las tres.",
      },
      {
        q: "¿Doñana y El Rocío son lo mismo?",
        a: "No. El Rocío es la aldea, al borde del parque. Doñana es el territorio. Se visitan juntos, con dos ritmos.",
      },
    ],
  },
  {
    slug: "lugares-colombinos",
    h1: "Lugares colombinos",
    title: "Lugares colombinos: La Rábida, Palos de la Frontera y Moguer",
    description:
      "Ruta de los lugares colombinos en Huelva: monasterio de La Rábida, Palos de la Frontera y Moguer. El estuario desde el que zarparon las naves.",
    kicker: "La Rábida · Palos · Moguer",
    lede: "Los lugares colombinos de Huelva son La Rábida, Palos de la Frontera y Moguer: el estuario de las naves, no un parking de placa. Un medio día con calma.",
    image: "/media/rabida.jpg",
    imageAlt: "Monasterio de La Rábida, Palos de la Frontera",
    keywords: [
      "lugares colombinos",
      "La Rábida",
      "Palos de la Frontera",
      "Moguer",
      "Colón Huelva",
      "monasterio de La Rábida",
    ],
    guideId: "rabida",
    sections: [
      {
        h: "La Rábida",
        p: "El monasterio de Santa María de La Rábida mira al estuario. Franciscanos, claustro, el silencio de quien espera un barco. No corras. El paisaje explica más que el cartel.",
      },
      {
        h: "Palos de la Frontera",
        p: "De aquí salieron las naves. Iglesia, fontanilla, el pueblo. Palos no es un anexo de la capital: es el muelle de aquella historia, todavía con ría.",
      },
      {
        h: "Moguer y Juan Ramón",
        p: "Moguer es Platero y la casa de Juan Ramón Jiménez. El vino, las calles blancas, la otra orilla del mito. La guía del camino de Colón tacha paradas: Rábida, Palos, Moguer, el muelle.",
      },
    ],
    faqs: [
      {
        q: "¿Qué ver en los lugares colombinos?",
        a: "Monasterio de La Rábida, Palos de la Frontera y Moguer. Medio día con coche. Sin prisa de sello.",
      },
      {
        q: "¿Se puede ir a La Rábida desde Huelva sin coche?",
        a: "Hay bus, pero el ritmo bueno es mixto o coche. La guía 48 horas lo encaja en el segundo día.",
      },
    ],
  },
  {
    slug: "minas-de-riotinto",
    h1: "Minas de Riotinto",
    title: "Minas de Riotinto: tren, río rojo, Peña del Hierro y Bella Vista",
    description:
      "Guía de la cuenca minera de Riotinto en Huelva: museo, ferrocarril turístico, Peña del Hierro, barrio inglés y el paisaje rojo del Tinto.",
    kicker: "Cuenca minera",
    lede: "Las minas de Riotinto son una de las geografías más extrañas de Europa: el río rojo, el tren, Bella Vista. Un día en coche, sin playa. Huelva, también, es esto.",
    image: "/media/riotinto.jpg",
    imageAlt: "Corta minera de Riotinto, Huelva",
    keywords: [
      "minas de Riotinto",
      "Riotinto Huelva",
      "tren minero Riotinto",
      "Peña del Hierro",
      "río Tinto",
      "Bella Vista Riotinto",
    ],
    guideId: "cuenca",
    sections: [
      {
        h: "El orden del día",
        p: "Museo minero primero: la compañía británica, el ferrocarril, la cuenca explicada. Luego el tren turístico —reserva en temporada, agua, calzado cerrado—. Peña del Hierro es el corte en la tierra. Bella Vista, el barrio inglés.",
      },
      {
        h: "El río rojo",
        p: "El Tinto baja rojo por el hierro y por una vida microbiana que ha interesado hasta a la NASA. No es un vino. Es geología viva, de esta provincia.",
      },
      {
        h: "Cómo ir",
        p: "Coche. Un día entero. Octubre y primavera son dulces; en agosto, madruga. No lo combines con baño: son dos Huelvas y las dos merecen su luz.",
      },
    ],
    faqs: [
      {
        q: "¿Qué ver en Riotinto en un día?",
        a: "Museo, tren, Peña del Hierro y Bella Vista. La guía de la cuenca roja va tachando paradas.",
      },
      {
        q: "¿El río Tinto se puede bañar?",
        a: "No es una playa. Se mira. El baño de Huelva está en la Costa de la Luz.",
      },
    ],
  },
  {
    slug: "jamon-de-jabugo",
    h1: "Jamón de Jabugo",
    title: "Jamón de Jabugo y Sierra de Aracena: guía de la otra Huelva",
    description:
      "Jamón de Jabugo DOP, Aracena, Gruta de las Maravillas y la sierra de Huelva. La otra provincia: castaño, frío limpio y mesa de guarda.",
    kicker: "DOP Jabugo · Sierra",
    lede: "El jamón de Jabugo es la otra Huelva: sierra, castaño, DOP. Aracena, la Gruta de las Maravillas, el pueblo blanco. No es un adorno del litoral: es la provincia hacia el norte.",
    image: "/media/jabugo.jpg",
    imageAlt: "Bodega de jamón de Jabugo en la sierra de Huelva",
    keywords: [
      "jamón de Jabugo",
      "DOP Jabugo",
      "Sierra de Aracena",
      "Gruta de las Maravillas",
      "qué ver en Aracena",
      "Jabugo Huelva",
    ],
    guideId: "almanaque",
    sections: [
      {
        h: "Jabugo, no un sello",
        p: "La Denominación de Origen Protegida Jabugo es de esta sierra. El jamón se entiende en bodega y en mesa, no en escaparate de aeropuerto. Octubre a marzo es la luz de la sierra; el verano, si subes, es otra hora.",
      },
      {
        h: "Aracena",
        p: "Castillo, pueblo blanco, la Gruta de las Maravillas. Aracena es la capital de esta Huelva interior. Un día de coche desde la costa. No lo improvises con bañador.",
      },
      {
        h: "Mesa de guarda",
        p: "Jamón, gurumelos si el año acompaña, castaña, Condado de guarda. El almanaque onubense te dice el mes: enero es sierra; octubre abre el norte.",
      },
    ],
    faqs: [
      {
        q: "¿Se puede visitar Jabugo desde Huelva capital?",
        a: "Sí, coche hacia la Sierra de Aracena. Un día. Combínalo con Aracena y la Gruta, no con la playa.",
      },
      {
        q: "¿Jabugo y jamón ibérico son lo mismo?",
        a: "Jabugo es DOP de esta sierra. El ibérico es una categoría más ancha. Aquí el nombre tiene pueblo.",
      },
    ],
  },
  {
    slug: "el-rocio",
    h1: "El Rocío",
    title: "El Rocío, Huelva: la aldea, la ermita y Doñana al lado",
    description:
      "Guía de El Rocío en Huelva: ermita, arena en la calle, caballos y el Parque Nacional de Doñana. Cómo ir en laborable y en romería.",
    kicker: "Almonte · Doñana",
    lede: "El Rocío es la aldea de arena, la ermita blanca y Doñana al borde. Un martes no es una romería. Huelva.cloud te dice cuál de las dos buscas.",
    image: "/media/rocio.jpg",
    imageAlt: "Ermita de El Rocío, Almonte, Huelva",
    keywords: [
      "El Rocío",
      "ermita del Rocío",
      "Romería del Rocío",
      "Almonte",
      "El Rocío Huelva",
      "visitar El Rocío",
    ],
    guideId: "marisma",
    sections: [
      {
        h: "La aldea",
        p: "Calles de arena, hermandades, caballos, la ermita. El Rocío no se recorre como un centro histórico: se anda despacio, se mira la marisma, se entra a la ermita sin prisa de foto.",
      },
      {
        h: "Romería y laborable",
        p: "La romería es un país. Un martes de febrero es otro. Elige. Si vienes por Doñana, el Acebuche está cerca; si vienes por la Blanca Paloma, quédate en la aldea.",
      },
    ],
    faqs: [
      {
        q: "¿Cuándo es la Romería del Rocío?",
        a: "Pentecostés, fecha móvil. El almanaque onubense lo señala cuando toca. El resto del año la aldea sigue ahí.",
      },
      {
        q: "¿Cómo llegar a El Rocío desde Huelva?",
        a: "Coche hacia Almonte. Un rato. No es un barrio de la capital: es otra geografía.",
      },
    ],
  },
  {
    slug: "punta-umbria",
    h1: "Punta Umbría",
    title: "Punta Umbría, Huelva: playa, choco, gamba y cómo llegar",
    description:
      "Guía de Punta Umbría: la playa de los onubenses, el choco, la gamba blanca, el paseo y el camino desde Huelva capital (25 minutos).",
    kicker: "Costa · 25 min",
    lede: "Punta Umbría es la playa de Huelva: veinticinco minutos, choco frito, gamba y un paseo que en agosto pide reserva. Fuera de temporada, es la orilla más honesta de la casa.",
    image: "/media/playa.jpg",
    imageAlt: "Pasarela y playa de la Costa de la Luz en Huelva",
    keywords: [
      "Punta Umbría",
      "playa Punta Umbría",
      "choco Punta Umbría",
      "cómo llegar a Punta Umbría",
      "Punta Umbría Huelva",
    ],
    guideId: "orilla",
    sections: [
      {
        h: "Cómo llegar",
        p: "Desde la capital, unos 25 minutos. Bus o coche. El domingo tarde la costa sigue cuando Huelva se apaga: elige orilla.",
      },
      {
        h: "Qué pedir",
        p: "Choco frito —el miércoles a las 17:30, no el sábado a las 15:30—. Gamba blanca a la plancha. La carta de la lonja te arma la frase.",
      },
      {
        h: "El viento",
        p: "Con levante el baño cambia. La guía viva de la orilla lee el parte y te dice si toca Punta, Mazagón o El Portil.",
      },
    ],
    faqs: [
      {
        q: "¿Cuánto se tarda de Huelva a Punta Umbría?",
        a: "Unos 25 minutos. Es la playa de la capital, no un destino lejano.",
      },
      {
        q: "¿Dónde comer choco en Punta Umbría?",
        a: "En el paseo, fuera del mediodía de sábado en agosto. La guía de la carta marca hora y mesa.",
      },
    ],
  },
  {
    slug: "48-horas-en-huelva",
    h1: "48 horas en Huelva",
    title: "48 horas en Huelva: itinerario de la Costa de la Luz, gamba y Colón",
    description:
      "Qué ver en Huelva en un fin de semana: Muelle del Tinto, gamba blanca, La Rábida y una playa. Itinerario interactivo de 48 horas.",
    kicker: "Itinerario",
    lede: "48 horas en Huelva bastan si no las malgastas: el muelle, la gamba, La Rábida y una playa según el viento. Huelva.cloud arma el plan y tú vas tachando.",
    image: "/media/muelle.jpg",
    imageAlt: "Muelle de Riotinto al atardecer, Huelva",
    keywords: [
      "48 horas en Huelva",
      "fin de semana Huelva",
      "itinerario Huelva",
      "qué ver en Huelva en dos días",
      "escapada Huelva",
    ],
    guideId: "marea",
    sections: [
      {
        h: "Día 1 · Capital y ría",
        p: "Plaza de las Monjas, mercado, Barrio Reina Victoria, Muelle de Riotinto al ocaso. Gamba a las 14:00, no a las 13:00. El Conquero si quieres la ría desde arriba.",
      },
      {
        h: "Día 2 · Colón o playa",
        p: "La Rábida, Palos y Moguer por la mañana; orilla por la tarde, según el viento. O al revés si el ocaso del muelle te enganchó. La guía de 48 horas se construye: uno, dos o tres días, a pie o con coche.",
      },
    ],
    faqs: [
      {
        q: "¿Qué ver en Huelva en un fin de semana?",
        a: "Muelle del Tinto, una mesa de gamba, lugares colombinos y una playa. La guía viva de 48 horas arma el orden.",
      },
      {
        q: "¿Hace falta coche?",
        a: "La capital, a pie. Rábida y playas, mixto o coche. El manual onubense te dice los tiempos.",
      },
    ],
  },
  {
    slug: "costa-de-la-luz",
    h1: "Costa de la Luz, Huelva",
    title: "Costa de la Luz en Huelva: playas, gamba, Doñana y tres mil horas de sol",
    description:
      "La Costa de la Luz de Huelva: 122 km de Atlántico, gamba blanca, Doñana, Punta Umbría, Mazagón e Isla Cristina. Guía de referencia.",
    kicker: "Atlántico · Onuba",
    lede: "La Costa de la Luz en Huelva es Atlántico andaluz: tres mil horas de sol, gamba blanca, Doñana al este y Portugal al oeste. Huelva.cloud es su guía de referencia.",
    image: "/media/mazagon.jpg",
    imageAlt: "Costa de la Luz, playa de pino y duna en Huelva",
    keywords: [
      "Costa de la Luz",
      "Costa de la Luz Huelva",
      "turismo Costa de la Luz",
      "playas Costa de la Luz",
      "Andalucía Atlántico",
    ],
    guideId: "orilla",
    sections: [
      {
        h: "De Ayamonte a Doñana",
        p: "Isla Canela y el Guadiana, Isla Cristina y la flota, Punta Umbría, Mazagón, Matalascañas. Un litoral sin el ruido de otras costas. El poniente es de aquí.",
      },
      {
        h: "Mesa y luz",
        p: "Gamba, choco, Condado, el ocaso en el Muelle de Riotinto. La Costa de la Luz no es solo toalla: es una provincia que se come y se mira al oeste.",
      },
    ],
    faqs: [
      {
        q: "¿Dónde está la Costa de la Luz?",
        a: "En el Atlántico andaluz. Huelva tiene más de 120 km, de la frontera con Portugal a Doñana.",
      },
      {
        q: "¿Qué distingue a la Costa de la Luz?",
        a: "Atlántico, poniente, gamba blanca, Doñana. Tres mil horas de sol y una mesa propia. No es un eslogan: es esta orilla.",
      },
    ],
  },
];

export function landingBySlug(slug: string) {
  return SEO_LANDINGS.find((l) => l.slug === slug) ?? null;
}
