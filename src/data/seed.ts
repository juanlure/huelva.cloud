import type { Category, PlaceKind } from "@/lib/types";

export type SeedArticle = {
  slug: string;
  title: string;
  dek: string;
  body: string;
  category: Category;
  readMinutes: number;
  featured: boolean;
  source: "editorial" | "community";
  neighborhood: string | null;
  publishedAt: string;
  votes: number;
};

export type SeedPlace = {
  name: string;
  kind: PlaceKind;
  lat: number;
  lng: number;
  blurb: string;
  neighborhood: string | null;
  hours: string | null;
  votes: number;
};

export type SeedEvent = {
  title: string;
  dek: string;
  startsOn: string;
  endsOn: string | null;
  venue: string;
  neighborhood: string | null;
  lat: number | null;
  lng: number | null;
  source: "editorial" | "community";
  votes: number;
};

export const SEED_ARTICLES: SeedArticle[] = [
  {
    slug: "48-horas-en-huelva",
    title: "48 horas en Huelva (al ritmo de la marea)",
    dek: "Dos días de ría, gamba, Colón sin prisa y una playa elegida con criterio. Sin autobús turístico.",
    category: "guides",
    readMinutes: 10,
    featured: true,
    source: "editorial",
    neighborhood: "centro",
    publishedAt: "2026-08-12T08:00:00Z",
    votes: 42,
    body: `## Día 1 — La ciudad que mira al río

Empieza en la **Plaza de las Monjas**. Café con leche, tostada de tomate si insistes, o manteca colorá si quieres entrar en materia. Huelva no es una ciudad de casco medieval de postal: es un puerto que se ha ido haciendo a sí mismo. Eso se entiende andando hacia el **Muelle de Riotinto**, la pasarela de hierro sobre el Tinto. Ve al atardecer. No hace falta filtro.

Antes, un desvío al **Barrio Reina Victoria** (Barrio Obrero). Casas inglesas de las minas, porches y verjas. Diez minutos y otra provincia. Luego **Casa Colón** por fuera —el interior cuando hay exposición— y a comer.

## Dónde comer el primer día

Pide **gamba blanca a la plancha**. Si te la ponen a la gabardina, estás en el sitio equivocado o es un capricho, no un rito. Acompañamiento: pimientos asados o nada. El vino: un Condado de Huelva, blanco, frío. Si el camarero te recomienda el de la casa y no es un tetrabrik, hazle caso.

Por la tarde, **El Conquero** y el Parque Moret. Sube. Mira la ría, el Polo, las marismas. Huelva se explica desde arriba: industria y marisma en la misma frase, sin complejos. Baja cuando se enciendan las luces.

## Día 2 — Palos, La Rábida, y una playa

Coche o bus hacia **La Rábida**. El monasterio es pequeño y basta. Al lado, las réplicas de las carabelas: ve si viajas con niños; si no, el estuario te sobra. **Palos de la Frontera** para la iglesia de San Jorge y el ambiente de pueblo. **Moguer** si te queda Juan Ramón: la casa-museo se visita en una hora y deja mejor sabor que cualquier placa.

Por la tarde, elige playa:

- **Punta Umbría** si quieres choco, paseo y gente.
- **Mazagón** si quieres pino, duna y menos altavoz.
- **Isla Cristina** si tu plan es lonja y gamba con apellido.

Duerme pronto. El Atlántico madruga y el primer baño, en septiembre, todavía es de verdad.`,
  },
  {
    slug: "manual-supervivencia-onubense",
    title: "Manual de supervivencia onubense",
    dek: "Transporte, horarios, viento, slang y cómo no parecer que llegas de Málaga con la maleta equivocada.",
    category: "guides",
    readMinutes: 9,
    featured: true,
    source: "editorial",
    neighborhood: "centro",
    publishedAt: "2026-08-08T08:00:00Z",
    votes: 37,
    body: `## Moverse

La capital se anda. El área metropolitana, no. Para **Punta Umbría** hay bus y, en verano, más frecuencia de la que crees. Para **Mazagón, Isla Cristina, Aracena, Riotinto**: coche. El tren te deja en Huelva y se acaba el cuento. El aeropuerto «de Huelva» no existe; se vuela a Sevilla y se baja en bus o se alquila.

Aparcar en el centro es un deporte de agosto. El Muelle y los parkings cubiertos evitan la discusión de pareja.

## Horarios

Comida: 14:00, no 13:00. Cena: 21:30. Los chiringuitos de playa se adelantan un poco. Los domingos por la tarde la ciudad se apaga; la costa, no.

Agosto es Colombinas y calor. Septiembre es el mes secreto: el agua sigue, las toallas se van.

## El viento y el Polo

Huelva huele, a veces, a industria. Es el Polo Químico, está a la vista, y los onubenses lo tienen integrado en la biografía. No hace falta un discurso. Si el viento viene de levante, la playa de Punta cambia; si es poniente, otra. Pregunta en el chiringuito, no en el hotel.

## Palabras

- **Onubense**: de Huelva. De Onuba.
- **Choco**: sepia.
- **Gamba blanca**: la de aquí. La roja es de otro sitio.
- **La Cinta**: la virgen, el santuario, la fiesta de septiembre.
- **Colombinas**: la feria. No es la Feria de Abril.
- **Miarma, illo**: se oyen, sí. No hace falta que los estrenes el primer día.

## Lo que no hace falta

No hace falta decir que Huelva es «la gran desconocida». Se sabe. Tampoco hace falta comparar cada plaza con Sevilla. Sevilla queda a una hora y tiene otro trabajo.`,
  },
  {
    slug: "recetario-gamba-choco",
    title: "El recetario de la gamba blanca (y del choco)",
    dek: "Qué pedir, cómo se come, dónde no engañan y por qué la gabardina no es un sacramento.",
    category: "eat",
    readMinutes: 8,
    featured: true,
    source: "editorial",
    neighborhood: "punta-umbria",
    publishedAt: "2026-08-18T08:00:00Z",
    votes: 55,
    body: `## La gamba

La **gamba blanca de Huelva** vive en un banco de arena atlántico, entre siete y treinta millas. Sale por las lonjas de **Isla Cristina, Punta Umbría, Ayamonte y Huelva**. En crudo es pálida, casi de cristal. En cocida, se pone firme y rosa suave. Si es roja y te la venden como «de Huelva», estás comprando un apellido.

### Cómo pedirla

- **A la plancha**, con sal. Fin.
- **Cocida**, si es del día y el punto es el de la casa.
- **Gabardina** (rebozada) es fiesta, no dogma.

Se pelan en la mesa. Las cabezas se chupan. Nadie te mira. El pan está para eso.

### Dónde

En **Isla Cristina** pregunta qué ha entrado en lonja. En **Punta Umbría**, el paseo en temporada. En la capital, sitios de toda la vida alrededor de Concepción y Pablo Rada. Si el precio parece de gala y el camarero no sabe de dónde sale, sal.

## El choco

El choco es sepia. En Punta se fríe y se pone en el centro de la mesa como si fuera el motivo del viaje, que lo es. Tierno, sin pasta de harina. Si está goma, cambia de mesa.

Hay choco en salsa, hay huevas, hay puntillitas. Empieza por el frito. Bebe vino blanco del Condado o una caña. No pidas sangría.

## Lo demás que importa

**Coquinas** a la marinera, cuando hay. **Choquitos**, **acedías**, **urta** a la roteña (sí, se cuela de Cádiz, y aquí también se come). **Mojama** como tapa, no como souvenir. Y el **jamón de Jabugo** cuando subas a la sierra: no lo pidas junto a la gamba en el mismo acto. Son dos religiones. Respétalas por separado.`,
  },
  {
    slug: "barrios-explicados",
    title: "Barrios, explicados (y pueblos que importan)",
    dek: "Centro, Conquero, Reina Victoria, Punta, Mazagón, Isla Cristina. Elige Huelva con criterio.",
    category: "guides",
    readMinutes: 10,
    featured: true,
    source: "editorial",
    neighborhood: null,
    publishedAt: "2026-08-05T08:00:00Z",
    votes: 33,
    body: `## En la capital

**Centro.** Para vivir la ciudad a pie. Terrazas, trámites, el primer tapeo. Ruido de verano.

**El Conquero.** La loma. Vistas, pinos, Parque Moret. Dormir mejor, cenar abajo.

**Reina Victoria.** El barrio inglés de Riotinto. Se visita, no se «elige para alojarse» — no hay hoteles dentro, y mejor.

**Pescadería.** La Huelva de la ría y el muelle. Viento, atardecer, menos postal.

**Isla Chica.** La más poblada, la más cotidiana. Ven a desayunar como la gente; no vengas buscando boutique.

## En la costa

**Punta Umbría** es la playa de los onubenses. Choco, gamba, paseo, agosto imposible sin reserva.

**Mazagón** es pino y duna. Más quieta. El Parador existe por una razón.

**Matalascañas** es extraña y útil: urbanización pegada a Doñana. Fuera de temporada, un pueblo fantasma con toalla.

**Isla Cristina** es flota pesquera. Si vienes por la gamba, ven aquí.

**Ayamonte** es frontera. El Guadiana, el ferry, Portugal a cinco minutos.

## Tierra adentro

**Moguer y Palos** son Colón y Juan Ramón y fresas. Una mañana.

**Aracena y Jabugo** son la otra provincia: jamón, castaño, frío de verdad en enero.

**Riotinto** es el paisaje que parece de Marte y fue de Gales. El ferrocarril turístico, si te gusta el hierro.

No intentes hacer costa y sierra el mismo día. Huelva es ancha. Trátala como tal.`,
  },
  {
    slug: "traductor-bar-huelva",
    title: "Traductor del bar onubense",
    dek: "Cómo pedir el café, la caña y el pescado sin que te expliquen el menú como a un crucerista.",
    category: "guides",
    readMinutes: 7,
    featured: true,
    source: "editorial",
    neighborhood: "centro",
    publishedAt: "2026-08-01T08:00:00Z",
    votes: 28,
    body: `## Café

Huelva no tiene el diccionario de Málaga (nadie te va a hablar de pitufos). Aquí:

- **Café solo**, **cortado**, **con leche**. Sin teatro.
- **Manchado** si lo quieres casi solo.
- En verano, **café con hielo**: te traen el vaso de hielo aparte. Lo tiras tú. Es un rito andaluz, no un fallo del servicio.

La tostada: aceite y tomate, o manteca. Manteca colorá si estás a lo que estás.

## Caña y vino

Caña corta. Doble si tienes sed de verdad. El vino blanco del **Condado de Huelva** está para beberse, no para coleccionar. Un fino de la costa oeste también aparece. Si pides tinto en agosto a las 15:00, que sea con conocimiento de causa.

## La comanda

- **Una gamba** (a la plancha).
- **Un choco** (frito).
- **Unas coquinas**.
- **Una ración de jamón** (cuando toque sierra).
- **Para picar**: aceitunas, mojama, queso.

«El menú del día» en un sitio de pescado suele ser una trampa de turista. Carta corta, pizarra, lo que ha entrado.

## La cuenta

Se pide en barra o al camarero, sin palmas. En muchos bares todavía se fía el café de los de siempre. Tú no eres de siempre. Paga, da las gracias, y si vuelves mañana ya eres casi de la casa.`,
  },
  {
    slug: "colon-sin-placa",
    title: "Colón sin placa: La Rábida, Palos y el estuario",
    dek: "La ruta colombina hecha con respeto y sin souvenir de carabela. Qué ver de verdad y qué saltarte.",
    category: "guides",
    readMinutes: 9,
    featured: true,
    source: "editorial",
    neighborhood: "moguer-palos",
    publishedAt: "2026-07-28T08:00:00Z",
    votes: 24,
    body: `Huelva no es «el sitio de Colón» como un parque temático. Es el estuario desde el que un puñado de marineros de Palos y Moguer se echaron al mar. La diferencia se nota si vas sin prisa.

## La Rábida

El monasterio es pequeño, mudéjar, silencioso. Basta. El error es tratarlo como un check-in entre dos playas. Entra, mira el claustro, sal al pinar. El monumento a Colón del otro lado de la ría (la «estatua colosal») se ve mejor de lejos que de cerca.

Las **réplicas de las carabelas** (Muelle de las Carabelas) funcionan con niños. Con adultos, depende de tu tolerancia a la madera barnizada. El paisaje del estuario —el Odiel, los eucaliptos, la luz— es el verdadero decorado.

## Palos de la Frontera

La iglesia de **San Jorge**. La fuente de la Fontanilla. Un pueblo que sigue siendo pueblo. Come aquí, no en el parking del monasterio.

## Moguer

Juan Ramón Jiménez no es un extra del folleto. La **casa-museo** y el recinto de Platero se visitan en una hora. Moguer tiene plaza, vino y menos colas. Si te interesa la palabra más que la carabela, quédate aquí.

## Cómo no hacerlo

No hagas «ruta colombina express» en 90 minutos con autobús. No compres una carabela de plástico. No intentes un atardecer en La Rábida y cena en Punta Umbría y copa en la capital. Elige un eje y camínalo.`,
  },
  {
    slug: "playas-costa-de-la-luz",
    title: "Playas de la Costa de la Luz: cuál elegir",
    dek: "Punta, Portil, Mazagón, Matalascañas, Isla Cristina, Canela. Atlántico, no Mediterráneo: el agua está más fría y más honesta.",
    category: "guides",
    readMinutes: 8,
    featured: false,
    source: "editorial",
    neighborhood: "punta-umbria",
    publishedAt: "2026-08-15T08:00:00Z",
    votes: 41,
    body: `El Atlántico de Huelva no es la Costa del Sol. El agua está más fría, el viento manda, y la toalla no se clava a dos metros de un chiringuito de DJ. Eso es el encanto.

## Punta Umbría

La de los onubenses. Paseo, choco, familia, agosto al límite. La flecha hacia El Portil es el paseo que hay que hacer.

## El Portil

Más bajo, más duna, el lagoon detrás. Buena para quien huye del paseo sin irse a otra comarca.

## Mazagón

Pinos hasta la arena. Playa ancha. Elige este si tu idea de vacaciones incluye silencio después de las 23:00.

## Matalascañas

Larga, servida, extraña. Detrás, Doñana. Úsala como cama de parque nacional, no como destino en sí.

## Isla Cristina / Punta del Moral / Isla Canela

Gamba, marisma, urbanizaciones de distinto grado de alma. Isla Cristina gana en carácter. Canela gana en toalla nueva.

## Normas no escritas

Bandera roja se respeta: hay corriente. El poniente tumba sombrillas. No hay espeto de sardina como religión (eso es Málaga). Hay choco y hay gamba. El atardecer se mira al oeste, que es donde se pone el sol de verdad.`,
  },
  {
    slug: "donana-sin-calor",
    title: "Doñana sin morir de calor",
    dek: "Cuándo ir, por qué puerta entrar y cómo no convertir el parque en un safari de autobús.",
    category: "guides",
    readMinutes: 8,
    featured: false,
    source: "editorial",
    neighborhood: "matalascanas",
    publishedAt: "2026-08-10T08:00:00Z",
    votes: 19,
    body: `Doñana en agosto a las 13:00 es una mala idea. Doñana al amanecer en mayo, octubre o un invierno claro es otra cosa.

## Puertas

**El Acebuche** (Matalascañas) es la entrada clásica, con centro de visitantes y linces en cautela (los de la exposición, no los del monte). **El Rocío** es el pueblo-santuario: arena en las calles, hermandades y marisma. **La aldea** en palo y caballo no se entiende en una mañana de julio entre helados.

## Cómo entrar al parque

Visitas concertadas, 4x4, pasarelas públicas. No se entra «a ver qué hay» con el coche de alquiler. Reserva. Lleva agua, sombrero, prismáticos. El lince no sale a saludar. Los ciervos, a veces sí, al atardecer.

## El Rocío

Si no vas a la romería, ve un día laborable. La ermita, la marisma, un café. La romería es un país aparte: milonga, polvo, fe y logística. No se improvisa.

## Combinar

Duerme en Mazagón o Matalascañas. Playa por la tarde, parque por la mañana. No hagas Doñana + Riotinto + Jabugo. Huelva se merece tres viajes, no un infarto.`,
  },
  {
    slug: "vino-condado-huelva",
    title: "Condado de Huelva: el vino que nadie pide (y debería)",
    dek: "Blancos atlánticos, naranja histórico y bodegas de pueblo. Una guía corta para beber aquí, no para coleccionar.",
    category: "eat",
    readMinutes: 7,
    featured: false,
    source: "editorial",
    neighborhood: "moguer-palos",
    publishedAt: "2026-08-21T08:00:00Z",
    votes: 16,
    body: `El Condado no es Jerez, y no tiene que serlo. Hay **blancos jóvenes** que aguantan una gamba mejor que muchos albariños de carta. Hay vinos históricos de naranja y hay bodegas en Bollullos, Rociana, Moguer, Palos.

Pide el blanco de la casa en un sitio que no sea una cadena. Si está frío y huele a algo, adelante. Si quieres ir un paso más allá, una visita a bodega en la tierra llana se hace en una mañana, entre fresas y moscatel.

No hace falta hablar de maridajes. Gamba y blanco. Jamón y un trago más serio, ya en la sierra. Dos geografías, dos copas.`,
  },
  {
    slug: "colombinas-2026",
    title: "Colombinas 2026: cómo entrar y cómo salir",
    dek: "La feria de Huelva no es la de Sevilla. Casetas, calor, Recinto Ferial y un centro que se enciende.",
    category: "events",
    readMinutes: 6,
    featured: false,
    source: "editorial",
    neighborhood: "centro",
    publishedAt: "2026-07-22T08:00:00Z",
    votes: 22,
    body: `Las **Colombinas** cierran julio y abren agosto. El Recinto Ferial es el de siempre: casetas, rebujito, polvo y familia. El centro se llena de veladores. No esperes el glamour de la Feria de Abril; espera una feria de capital de provincia que se quiere mucho.

## Cómo ir

A pie o en bus lanzadera. El coche es un error. Reserva restaurante si quieres gamba esa semana: la ciudad está en otra frecuencia.

## Qué vestir

Gente de traje de flamenca, gente de camisa, gente de chándal. Nadie te echa. El calor, sí.

## Qué no hacer

No intentes «hacer Colombinas» y «hacer Doñana» el mismo fin de semana. Elige.`,
  },
  {
    slug: "huelva-reabre-playas-poniente",
    title: "Las playas del poniente, a pleno agosto",
    dek: "Punta Umbría, El Portil y la flecha siguen en bandera verde la mayor parte del día. El viento, como siempre, manda más que el ayuntamiento.",
    category: "news",
    readMinutes: 4,
    featured: false,
    source: "editorial",
    neighborhood: "punta-umbria",
    publishedAt: "2026-08-22T07:30:00Z",
    votes: 14,
    body: `Agosto en la costa onubense es una negociación con el poniente. Este fin de semana las banderas en **Punta Umbría** y **El Portil** han salido verdes por la mañana y amarillas cuando ha picao el viento, que es el patrón de siempre.

No hay cierre generalizado. Hay sentido común: si el chiringuito recoge sombrillas, tú también. El agua sigue fría para quien viene del Mediterráneo y perfecta para quien se ha criado aquí.

Si buscas menos gente, **Mazagón** hacia el este, andando, sigue siendo la válvula. Lleva agua. No hay kiosco en la duna.`,
  },
  {
    slug: "riotinto-tren-temporada",
    title: "El tren de Riotinto mantiene la temporada hasta octubre",
    dek: "El ferrocarril turístico de las minas alarga horarios de sábado. El paisaje rojo no necesita filtro. El casco, sí necesita agua.",
    category: "news",
    readMinutes: 4,
    featured: false,
    source: "editorial",
    neighborhood: null,
    publishedAt: "2026-08-20T09:00:00Z",
    votes: 11,
    body: `El **ferrocarril turístico minero** de Riotinto sigue con plazas de cara a septiembre y octubre, los dos mejores meses para subir a la cuenca: menos calor, misma tierra colorada.

El viaje no es un documental: es un tren viejo en un paisaje que parece de otro planeta y fue de una compañía británica. Combínalo con el museo minero. No lo combies con playa el mismo día.

Agua, sombrero, calzado cerrado. El rojo mancha.`,
  },
  {
    slug: "choco-en-la-ribera",
    title: "El choco de las cinco en la Ribera",
    dek: "Un vecino de Punta avisa: entre semana, a media tarde, el frito sale mejor que el sábado a las tres.",
    category: "community",
    readMinutes: 3,
    featured: false,
    source: "community",
    neighborhood: "punta-umbria",
    publishedAt: "2026-08-19T16:20:00Z",
    votes: 27,
    body: `Va en serio: el choco de **Punta Umbría** el sábado a las 15:30 es una cola y un aceite cansado. El miércoles a las 17:30, con el paseo a media máquina, es otra cosa.

Pide ración para compartir. Si está tierno, pide otra. Si está goma, cambia. No hay lealtad que justifique un choco malo.

Firmado: alguien que vive aquí y está harto de ver a la gente sentarse en el primer velador.`,
  },
];

export const SEED_PLACES: SeedPlace[] = [
  {
    name: "Muelle de Riotinto",
    kind: "mirador",
    lat: 37.2618,
    lng: -6.9415,
    blurb: "La pasarela de hierro sobre el Tinto. Atardecer obligatorio, selfie opcional.",
    neighborhood: "pescaderia",
    hours: "Siempre abierto",
    votes: 48,
  },
  {
    name: "Plaza de las Monjas",
    kind: "barrio",
    lat: 37.257,
    lng: -6.9508,
    blurb: "El salón de estar de la capital. Café, kiosco, sombra.",
    neighborhood: "centro",
    hours: "Mejor de 9 a 13 y de 18 a 21",
    votes: 22,
  },
  {
    name: "Barrio Reina Victoria",
    kind: "barrio",
    lat: 37.2646,
    lng: -6.9412,
    blurb: "Casas inglesas de las minas. Un damero que no parece Huelva y lo es.",
    neighborhood: "reina-victoria",
    hours: "Paseo de día",
    votes: 31,
  },
  {
    name: "Parque Moret / El Conquero",
    kind: "naturaleza",
    lat: 37.2705,
    lng: -6.955,
    blurb: "Pino, cuesta y la mejor vista de la ría. Huelva se entiende desde aquí.",
    neighborhood: "conquero",
    hours: "De amanecer a noche",
    votes: 36,
  },
  {
    name: "Casa Colón",
    kind: "cultura",
    lat: 37.2568,
    lng: -6.9505,
    blurb: "Pabellón inglés, exposiciones y el recuerdo de cuando Huelva era puerto del imperio minero.",
    neighborhood: "centro",
    hours: "Consultar exposiciones",
    votes: 15,
  },
  {
    name: "Catedral de la Merced",
    kind: "cultura",
    lat: 37.2575,
    lng: -6.9528,
    blurb: "Barroco de pueblo grande. Entra si está abierta; no hace falta cola.",
    neighborhood: "centro",
    hours: "Culto y mañanas",
    votes: 8,
  },
  {
    name: "Santuario de la Cinta",
    kind: "cultura",
    lat: 37.2732,
    lng: -6.9381,
    blurb: "La virgen de Huelva, el mirador y septiembre. Vale la subida.",
    neighborhood: "conquero",
    hours: "Mañana y tarde",
    votes: 18,
  },
  {
    name: "Mercado del Carmen",
    kind: "mercado",
    lat: 37.2591,
    lng: -6.9472,
    blurb: "Pescado, fruta y el pulso de entre semana. Domingo, cerrado.",
    neighborhood: "centro",
    hours: "L-S mañana; algunos puestos hasta mediodía",
    votes: 20,
  },
  {
    name: "Playa de Punta Umbría",
    kind: "playa",
    lat: 37.175,
    lng: -6.98,
    blurb: "La playa de los onubenses. Choco cerca, viento de poniente, agosto lleno.",
    neighborhood: "punta-umbria",
    hours: "Bandera según viento",
    votes: 52,
  },
  {
    name: "Flecha del Portil",
    kind: "playa",
    lat: 37.21,
    lng: -7.045,
    blurb: "Arena, marisma y atardecer. Anda desde Punta cuando caiga el viento.",
    neighborhood: "punta-umbria",
    hours: "Siempre; respeta nidos en primavera",
    votes: 29,
  },
  {
    name: "Playa de Mazagón",
    kind: "playa",
    lat: 37.137,
    lng: -6.83,
    blurb: "Pinos hasta la duna. Más ancha, más quieta, más Doñana.",
    neighborhood: "mazagon",
    hours: "Todo el día",
    votes: 34,
  },
  {
    name: "Matalascañas",
    kind: "playa",
    lat: 37.016,
    lng: -6.555,
    blurb: "Toalla delante, Doñana detrás. Extraña y útil.",
    neighborhood: "matalascanas",
    hours: "Temporada alta servida",
    votes: 12,
  },
  {
    name: "Playa de Isla Cristina",
    kind: "playa",
    lat: 37.191,
    lng: -7.33,
    blurb: "Marinera, con lonja cerca. La gamba no es un eslogan.",
    neighborhood: "isla-cristina",
    hours: "Todo el día",
    votes: 26,
  },
  {
    name: "Lonja de Isla Cristina",
    kind: "mercado",
    lat: 37.199,
    lng: -7.321,
    blurb: "Donde se decide el día. Mirar la subasta es una lección de costa.",
    neighborhood: "isla-cristina",
    hours: "Madrugada / mañana, según marea",
    votes: 21,
  },
  {
    name: "Monasterio de La Rábida",
    kind: "cultura",
    lat: 37.2075,
    lng: -6.9255,
    blurb: "Pequeño, mudéjar, suficiente. El estuario es el verdadero decorado.",
    neighborhood: "moguer-palos",
    hours: "Horario de visita turística",
    votes: 25,
  },
  {
    name: "Muelle de las Carabelas",
    kind: "cultura",
    lat: 37.21,
    lng: -6.922,
    blurb: "Réplicas de las naves. Ideal con niños; el paisaje vale para todos.",
    neighborhood: "moguer-palos",
    hours: "Diurno, temporada",
    votes: 13,
  },
  {
    name: "Casa Museo Juan Ramón Jiménez",
    kind: "cultura",
    lat: 37.2755,
    lng: -6.8385,
    blurb: "Moguer en una hora. Platero sin prisa.",
    neighborhood: "moguer-palos",
    hours: "Cerrado lunes (confirma)",
    votes: 17,
  },
  {
    name: "Centro El Acebuche (Doñana)",
    kind: "naturaleza",
    lat: 37.108,
    lng: -6.485,
    blurb: "La puerta clásica del parque. Madruga. El lince no tiene horario de oficina.",
    neighborhood: "matalascanas",
    hours: "Diurno; rutas concertadas",
    votes: 23,
  },
  {
    name: "Minas de Riotinto",
    kind: "naturaleza",
    lat: 37.696,
    lng: -6.594,
    blurb: "Tierra colorada, tren minero, paisaje que no necesita filtro.",
    neighborhood: null,
    hours: "Tren y museo, reserva en temporada",
    votes: 30,
  },
  {
    name: "Gruta de las Maravillas",
    kind: "naturaleza",
    lat: 37.891,
    lng: -6.561,
    blurb: "Aracena bajo tierra. Fresca en agosto. Reserva.",
    neighborhood: "aracena",
    hours: "Visitas guiadas",
    votes: 19,
  },
  {
    name: "Jabugo",
    kind: "comer",
    lat: 37.77,
    lng: -6.729,
    blurb: "El pueblo del jamón. Ve temprano, antes del souvenir.",
    neighborhood: "aracena",
    hours: "Comercios de mañana",
    votes: 40,
  },
  {
    name: "El Rocío",
    kind: "cultura",
    lat: 37.141,
    lng: -6.476,
    blurb: "Arena, ermita y marisma. Laborable, no romería, si es tu primer día.",
    neighborhood: "matalascanas",
    hours: "Pueblo siempre; ermita según culto",
    votes: 16,
  },
  {
    name: "Ferry Ayamonte–Vila Real",
    kind: "mirador",
    lat: 37.213,
    lng: -7.403,
    blurb: "Cinco minutos y Portugal. El Guadiana al atardecer.",
    neighborhood: "ayamonte",
    hours: "Según tabla de ferry",
    votes: 14,
  },
  {
    name: "Paseo de la Ribera",
    kind: "comer",
    lat: 37.181,
    lng: -6.966,
    blurb: "Choco frito, gamba y el ritual de Punta. Mejor entre semana a media tarde.",
    neighborhood: "punta-umbria",
    hours: "Comida y cena en temporada",
    votes: 44,
  },
  {
    name: "Tapeo en Concepción",
    kind: "comer",
    lat: 37.2564,
    lng: -6.9518,
    blurb: "El eje de cañas de la capital. Gamba, pimientos, poco teatro.",
    neighborhood: "centro",
    hours: "14:00 y 21:00",
    votes: 27,
  },
];

export const SEED_EVENTS: SeedEvent[] = [
  {
    title: "Veladas de septiembre en el Muelle",
    dek: "Música al aire libre cuando el hierro todavía está caliente y el Tinto ya no ciega.",
    startsOn: "2026-09-05",
    endsOn: "2026-09-07",
    venue: "Muelle de Riotinto",
    neighborhood: "pescaderia",
    lat: 37.2618,
    lng: -6.9415,
    source: "editorial",
    votes: 9,
  },
  {
    title: "Fiestas de la Cinta",
    dek: "La virgen de Huelva, romería chica y el santuario lleno. Septiembre onubense de verdad.",
    startsOn: "2026-09-08",
    endsOn: "2026-09-08",
    venue: "Santuario de la Cinta",
    neighborhood: "conquero",
    lat: 37.2732,
    lng: -6.9381,
    source: "editorial",
    votes: 18,
  },
  {
    title: "Feria de la gamba en Punta Umbría",
    dek: "El santo extraoficial de la costa. Plancha, cola y poco romanticismo: se viene a comer.",
    startsOn: "2026-09-12",
    endsOn: "2026-09-14",
    venue: "Paseo de la Ribera",
    neighborhood: "punta-umbria",
    lat: 37.181,
    lng: -6.966,
    source: "editorial",
    votes: 21,
  },
  {
    title: "Jornadas del jamón en la sierra",
    dek: "Jabugo y alrededores cuando el turista de playa ya se ha ido. Mejor momento para un secadero.",
    startsOn: "2026-10-03",
    endsOn: "2026-10-05",
    venue: "Jabugo / Aracena",
    neighborhood: "aracena",
    lat: 37.77,
    lng: -6.729,
    source: "editorial",
    votes: 12,
  },
  {
    title: "Mercadillo de atardecer en El Conquero",
    dek: "Propuesta vecinal: bancos, vinilo y vista a la ría. Si cuaja, se queda.",
    startsOn: "2026-08-29",
    endsOn: null,
    venue: "Parque Moret",
    neighborhood: "conquero",
    lat: 37.2705,
    lng: -6.955,
    source: "community",
    votes: 7,
  },
];
