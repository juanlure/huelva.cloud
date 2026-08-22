/** Atlas gastronómico e histórico de Huelva. Síntesis editorial, sellos reales. */

export const MESA_TERRITORIOS = [
  {
    id: "costa",
    name: "La costa",
    kicker: "Atlántico · lonja",
    lede: "Golfo de Cádiz, entre Guadiana y Guadalquivir. La mesa se decide a las cuatro, cuando entra el barco.",
    image: "/media/gamba.jpg",
    imageAlt: "Gamba blanca de Huelva",
  },
  {
    id: "condado",
    name: "El Condado",
    kicker: "Zalema · fresa · garbanzo",
    lede: "Tierra llana entre ría y sierra. Vino, vinagre, garbanzo de Escacena, el fresón de Moguer y Palos.",
    image: "/media/rabida.jpg",
    imageAlt: "La Rábida y el Condado, Huelva",
  },
  {
    id: "sierra",
    name: "La sierra",
    kicker: "Dehesa · Jabugo · gurumelo",
    lede: "Aracena y Picos de Aroche. Castaño, dehesa, el frío que cura el jamón. Otra provincia, el mismo mapa.",
    image: "/media/jabugo.jpg",
    imageAlt: "Bodega de jamón de Jabugo",
  },
] as const;

export type MesaProducto = {
  id: string;
  territorio: "costa" | "condado" | "sierra";
  name: string;
  sello: string | null;
  latin?: string;
  when: string;
  how: string;
  note: string;
};

export const MESA_PRODUCTOS: MesaProducto[] = [
  {
    id: "gamba",
    territorio: "costa",
    name: "Gamba blanca",
    sello: null,
    latin: "Parapenaeus longirostris",
    when: "Todo el año. Lonjas de Isla Cristina, Ayamonte, Punta Umbría y la capital. FAO 27.9.a, Golfo de Cádiz.",
    how: "A la plancha, sal gorda, plancha muy caliente, gamba seca. La gabardina es fiesta; la plancha es el rito.",
    note: "Rosa claro parduzco, casi transparente en crudo. Bigote largo, veta oscura. Vive en fondos de arena, entre 100 y 450 metros. No tiene IGP: se reconoce en la lonja, no en una etiqueta de escaparate.",
  },
  {
    id: "choco",
    territorio: "costa",
    name: "Choco",
    sello: null,
    when: "Punta Umbría, todo el año. Mejor entre semana.",
    how: "Frito, tierno, sin pasta de harina. Al centro de la mesa. Papas con choco, el guiso de la casa.",
    note: "Sepia de esta costa. Institución de Punta. El punto se nota al primer bocado: si está duro, cambia de casa.",
  },
  {
    id: "coquinas",
    territorio: "costa",
    name: "Coquinas",
    sello: null,
    when: "De noviembre a abril, si el mar quiere.",
    how: "Al ajillo o a la marinera. Condado blanco, pan. Pregunta si han entrado.",
    note: "Bivalvo de la orilla. En su temporada no hay mejor tapa. Fuera de temporada, no insistas.",
  },
  {
    id: "acedias",
    territorio: "costa",
    name: "Acedías",
    sello: null,
    when: "Lonja de Isla y Punta.",
    how: "Fritas, enteras, con los dedos.",
    note: "El brillo lo dice. Una buena casa las pone con orgullo, no escondidas en una fritura anónima.",
  },
  {
    id: "atun",
    territorio: "costa",
    name: "Atún y mojama",
    sello: "IGP Mojama de Isla Cristina",
    when: "Ronqueo cuando hay pieza. Mojama, todo el año.",
    how: "Atún en adobo o a la plancha. Mojama, loncha fina, aceite, tomate.",
    note: "Isla Cristina cura el atún al aire atlántico. La IGP es de la mojama, no de cualquier cecina.",
  },
  {
    id: "guiso",
    territorio: "costa",
    name: "Guiso marinero",
    sello: "IGP Garbanzo de Escacena (cuando lleva garbanzo)",
    when: "Invierno y primavera. Feria del guiso en Islantilla, mayo.",
    how: "Papas con choco. Garbanzos con langostinos y almejas. Pide el de la casa.",
    note: "Cocina de faena larga, no de revista. En Ayamonte, a veces, almendra: la otra acera del Guadiana.",
  },
  {
    id: "condado",
    territorio: "condado",
    name: "Vino del Condado",
    sello: "DOP Condado de Huelva",
    when: "El blanco, siempre frío. El naranja, de sobremesa.",
    how: "Zalema. Blanco joven con la gamba. Generoso o naranja si la mesa se alarga.",
    note: "Hay también DO Vinagre del Condado y Vino Naranja del Condado. El maridaje de esta costa no se improvisa con otra geografía.",
  },
  {
    id: "fresa",
    territorio: "condado",
    name: "Fresa de Moguer y Palos",
    sello: null,
    when: "Marzo a mayo, en su punto.",
    how: "Al natural, o con un Condado joven. En el campo, si te invitan.",
    note: "Huelva es la huerta temprana de Europa. El olor de abril no se finge.",
  },
  {
    id: "garbanzo",
    territorio: "condado",
    name: "Garbanzo de Escacena",
    sello: "IGP",
    when: "Potaje de invierno y primavera.",
    how: "Con langostinos y almejas, o con bacalao. El garbanzo manda el caldo.",
    note: "Sello real. El mar y el campo en el mismo plato: eso es el Condado.",
  },
  {
    id: "jabugo",
    territorio: "sierra",
    name: "Jamón de Jabugo",
    sello: "DOP Jabugo",
    when: "Octubre a marzo, la luz de la sierra. El jamón, todo el año a temperatura de sala.",
    how: "Loncha fina, nunca de nevera. El jamón se basta. Un vino de guarda, o nada.",
    note: "Dehesa, bellota, el frío que cura. DOP de esta sierra, no un sello de aeropuerto.",
  },
  {
    id: "gurumelo",
    territorio: "sierra",
    name: "Gurumelo",
    sello: null,
    latin: "Amanita ponderosa",
    when: "Primavera, si el año acompaña.",
    how: "Revuelto, o a la plancha. Pregunta en Aracena. No se improvisan.",
    note: "La seta de esta sierra. Blanca, carnosa, de temporada corta. El almanaque la espera.",
  },
  {
    id: "castana",
    territorio: "sierra",
    name: "Castaña, migas, ajo gañán",
    sello: null,
    when: "Otoño e invierno.",
    how: "Migas con el frío. Ajo gañán. Piñonate de postre. Un aguardiente artesano, si lo hay.",
    note: "Cocina de montaña. No es un adorno del litoral: es la otra Huelva, completa.",
  },
];

export const SELLOS = [
  { name: "DOP Jabugo", what: "Jamón ibérico de esta sierra" },
  { name: "DOP Condado de Huelva", what: "Vinos de zalema, blancos y generosos" },
  { name: "DO Vinagre del Condado", what: "El vinagre de esta tierra llana" },
  { name: "Vino Naranja del Condado", what: "El de sobremesa" },
  { name: "IGP Mojama de Isla Cristina", what: "Atún curado al aire atlántico" },
  { name: "IGP Garbanzo de Escacena", what: "El garbanzo del potaje onubense" },
];

export const HISTORIA = [
  {
    year: "s. X a.C.",
    title: "Onuba",
    body: "Asentamiento fenicio y tartesio en la ría. Onoba, Onuba Aestuaria: fortaleza de Baal, puerto entre el Tinto y el Odiel. Estrabón y Plinio la citan. Huelva no nace en 1492: lleva tres mil años mirando al agua.",
  },
  {
    year: "Tartessos",
    title: "El reino del metal",
    body: "La ría onubense está ligada a Tartessos: comercio, bronce, el mito de Argantonio. Isla de Saltés se ha propuesto como capital. Lo seguro: aquí se fundía el metal y se recibía el Mediterráneo.",
  },
  {
    year: "s. I",
    title: "Onuba Aestuaria",
    body: "Roma romaniza el puerto. Factorías, acueducto de Fuente Vieja, necrópolis. La minería de la cuenca ya se mueve. El nombre Aestuaria habla de los esteros: Huelva es estuario desde entonces.",
  },
  {
    year: "713–1262",
    title: "Walba, taifa, Alfonso X",
    body: "Conquista árabe, reino taifa de Huelva (1012), toma de Alfonso X en 1262. El nombre se hace Huelva. El puerto no deja de ser puerto.",
  },
  {
    year: "3 ago 1492",
    title: "Palos, La Rábida, las naves",
    body: "Zarpan de Palos de la Frontera. Colón había dormido en La Rábida. Martín Alonso Pinzón, los marineros onubenses, la Fontanilla. Moguer da hombres y da a Juan Ramón siglos después. El estuario es el decorado de aquella salida.",
  },
  {
    year: "1755",
    title: "El terremoto de Lisboa",
    body: "La ciudad se viene abajo. La Torre de la Higuera, en Matalascañas, queda volcada en la arena. Huelva se reconstruye mirando otra vez a la ría.",
  },
  {
    year: "1873–1916",
    title: "Riotinto y el hierro británico",
    body: "Rio Tinto Company Limited compra las minas en 1873. Ferrocarril, Muelle de Riotinto (1874–76), Casa Colón (1883), Barrio Reina Victoria (1916). Bella Vista, en la cuenca. El legado británico no es un adorno: es arquitectura, fútbol y un muelle que todavía se recorre al atardecer.",
  },
  {
    year: "1889",
    title: "El Decano",
    body: "En Casa Colón nace el Huelva Recreation Club, hoy Real Club Recreativo de Huelva: el club de fútbol más antiguo de España. El 23 de diciembre. El césped de esta ciudad tiene fecha.",
  },
  {
    year: "1880–",
    title: "Colombinas y la Cinta",
    body: "Las Fiestas Colombinas —fiesta mayor, interés turístico— recuerdan la gesta y a los marineros de esta ría. En septiembre, la Virgen de la Cinta: santuario gótico-mudéjar, la fiesta que mira a Huelva de verdad.",
  },
  {
    year: "1956",
    title: "Juan Ramón",
    body: "Nobel de Literatura. Nació en Moguer en 1881. Platero y yo es de esta tierra llana, de estas calles blancas. La casa-museo se visita en una hora y deja el sabor exacto.",
  },
  {
    year: "1980–",
    title: "Doñana y el mapa de ahora",
    body: "Parque Nacional, Reserva de la Biosfera de las Marismas del Odiel, Universidad (1993). Huelva.cloud escribe la provincia en este presente: costa, marisma, sierra, en el mismo mapa.",
  },
];

export const HISTORIA_LUGARES = [
  {
    name: "Monasterio de La Rábida",
    dek: "Mudéjar, franciscano. Colón durmió aquí. El estuario se ve desde el pinar.",
  },
  {
    name: "Iglesia de San Jorge, Palos",
    dek: "De aquí salió la expedición. Pueblo, no parking de placa.",
  },
  {
    name: "Muelle de Riotinto",
    dek: "1876. Hierro sobre el Tinto. BIC. El atardecer de la capital.",
  },
  {
    name: "Barrio Reina Victoria",
    dek: "1916. Casas inglesas de la compañía. Conjunto histórico. Diez minutos y otra arquitectura.",
  },
  {
    name: "Casa Colón",
    dek: "1883. Pabellón británico. Aquí nació el Recreativo.",
  },
  {
    name: "Santuario de la Cinta",
    dek: "Siglo XV, gótico-mudéjar. Colón vino antes y después. Septiembre es su mes.",
  },
];
