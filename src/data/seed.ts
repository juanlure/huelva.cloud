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
    slug: "ayamonte-feria-jamon-marisco-2026",
    title: "Ayamonte arranca este martes su Feria del Jamón y el Marisco",
    dek: "Plaza de España, del 26 al 28 de agosto. Gamba blanca, jamón ibérico y vino del Condado desde las 20:00. Entrada libre.",
    category: "news",
    readMinutes: 4,
    featured: true,
    source: "editorial",
    neighborhood: "ayamonte",
    publishedAt: "2026-08-23T08:00:00Z",
    votes: 34,
    body: `La **Feria del Jamón y el Marisco de Ayamonte** vuelve este martes 26 de agosto a la Plaza de España. Tres días de gamba blanca, jamón ibérico y producto onubense, con casetas que abren a partir de las 20:00.

## El plato fuerte

Gamba blanca de Isla Cristina, jamón de Jabugo, vino del Condado. La feria es un muestrario accesible de lo que da esta provincia: costa y sierra en la misma mesa.

Música en vivo cada noche. La Plaza de España se llena, así que conviene llegar temprano si quieres mesa cerca.

## Horario

Martes 26 a jueves 28 de agosto, desde las 20:00 hasta cierre. Entrada libre. Ayamonte está a 55 km de la capital.`,
  },
  {
    slug: "recre-arranca-temporada-septiembre",
    title: "El Recre arranca en casa el 1 de septiembre",
    dek: "Primera jornada del Decano en el Nuevo Colombino frente al Real Murcia. Domingo a las 18:00, con el calor ya bajando.",
    category: "news",
    readMinutes: 3,
    featured: false,
    source: "editorial",
    neighborhood: "centro",
    publishedAt: "2026-08-22T18:30:00Z",
    votes: 28,
    body: `El **Recreativo de Huelva** debuta en casa este domingo 1 de septiembre a las 18:00 frente al Real Murcia. Primera jornada de liga, Nuevo Colombino, y ganas de empezar bien.

El Decano viene de una pretemporada correcta y una plantilla que apunta a pelear arriba. El domingo, con el calor de agosto ya aflojando, el estadio espera el primer lleno de la temporada.

Entradas en taquilla y online. Si eres de los que vuelven en septiembre, este es el ritual de vuelta.`,
  },
  {
    slug: "doñana-nivel-marisma-preocupa",
    title: "El nivel de la marisma en Doñana sigue bajo tras el verano seco",
    dek: "Las lluvias de primavera no bastaron. El Acebuche y El Rocío registran lagunas con menos agua que en años anteriores.",
    category: "news",
    readMinutes: 5,
    featured: false,
    source: "editorial",
    neighborhood: "matalascanas",
    publishedAt: "2026-08-21T10:00:00Z",
    votes: 17,
    body: `El verano seco deja huella en **Doñana**. Las lagunas del entorno del Acebuche y El Rocío presentan niveles de agua más bajos de lo habitual para esta época, según los últimos registros del parque.

## Qué dicen los técnicos

La primavera trajo lluvias, pero no fueron suficientes para recargar la marisma como en años anteriores. El calor de julio y agosto ha evaporado más rápido de lo esperado.

El parque sigue abierto y las rutas concertadas continúan, pero los expertos insisten: Doñana necesita un otoño húmedo. El equilibrio del ecosistema depende del agua, y el cambio climático se nota aquí antes que en otros puntos.

## Para el visitante

Las rutas siguen operativas. El amanecer sigue siendo el mejor momento para ver fauna. Los ciervos y las aves aún están, pero la marisma pide respeto y prudencia. No es alarmismo: es la realidad de un parque que vive del ciclo del agua.`,
  },
  {
    slug: "punta-umbria-cierra-verano-lleno",
    title: "Punta Umbría cierra agosto con las terrazas a tope",
    dek: "Los chiringuitos mantienen el ritmo hasta el 31. Choco, gamba y una última semana de agosto que sigue siendo verano onubense.",
    category: "news",
    readMinutes: 4,
    featured: false,
    source: "editorial",
    neighborhood: "punta-umbria",
    publishedAt: "2026-08-21T12:00:00Z",
    votes: 19,
    body: `Agosto no ha terminado en **Punta Umbría**. Las terrazas del Paseo de la Ribera siguen llenas, el choco se fríe a todas horas y la gamba blanca mantiene el tipo. El último fin de semana promete ser de los buenos.

Los chiringuitos alargan horarios hasta el lunes 31. Septiembre es otra cosa, pero esta semana todavía es verano onubense de verdad: agua a 22°, poniente moderado y mesas al aire libre hasta tarde.

Si vuelves a la capital después de agosto, este es el último tramo. Punta no se apaga de golpe: se va despidiendo con la misma gamba de siempre.`,
  },
  {
    slug: "cinta-2026-programa-confirmado",
    title: "Las Fiestas de la Cinta arrancan el 8 de septiembre",
    dek: "Romería chica al Santuario, ofrenda floral y una semana de celebración. Septiembre onubense por excelencia.",
    category: "news",
    readMinutes: 4,
    featured: false,
    source: "editorial",
    neighborhood: "conquero",
    publishedAt: "2026-08-20T09:00:00Z",
    votes: 21,
    body: `Las **Fiestas de la Cinta** vuelven el domingo 8 de septiembre con la romería chica al Santuario del Conquero. Ofrenda floral, misa solemne y una semana de actos que cierran el verano y abren el otoño onubense.

## Qué es La Cinta

La patrona de Huelva. No es Colombinas: es más íntima, más de barrio, más septiembre. El santuario se llena, la gente sube al Conquero y la ciudad para un día. Es una fiesta que no necesita aspas ni megafonía: funciona con la devoción y el paisaje.

El programa completo se publica la primera semana de septiembre. La romería es el 8, domingo. Si vives aquí, ya lo sabes. Si vienes de fuera, es una buena excusa para ver Huelva en su día.`,
  },
  {
    slug: "riotinto-temporada-otono",
    title: "El tren minero de Riotinto alarga temporada hasta octubre",
    dek: "Más salidas los sábados. La cuenca colorada en otoño, sin el calor de agosto. Reserva con antelación.",
    category: "news",
    readMinutes: 3,
    featured: false,
    source: "editorial",
    neighborhood: null,
    publishedAt: "2026-08-20T11:00:00Z",
    votes: 13,
    body: `El **ferrocarril turístico de Riotinto** amplía horarios de cara a septiembre y octubre, los dos mejores meses para subir a la cuenca minera. Sin el calor de agosto, el paisaje rojo se entiende mejor y el viaje se hace más cómodo.

Sábados con más salidas. Reserva online o en el Museo Minero. Agua, sombrero y calzado cerrado: el rojo mancha, pero merece la pena.

Octubre es el mes dulce para Riotinto. Anótalo.`,
  },
  {
    slug: "48-horas-en-huelva",
    title: "48 horas en Huelva (al ritmo de la marea)",
    dek: "Dos días de ría, gamba blanca, Colón y una playa elegida con criterio. El ritmo de Huelva, no el del autobús.",
    category: "guides",
    readMinutes: 10,
    featured: true,
    source: "editorial",
    neighborhood: "centro",
    publishedAt: "2026-08-12T08:00:00Z",
    votes: 42,
    body: `## Día 1 — La ciudad que mira al río

Empieza en la **Plaza de las Monjas**. Café con leche, tostada de tomate o manteca colorá: el primer gesto de la casa. Huelva es un puerto atlántico que se ha ido haciendo a sí mismo, con luz de estuario y una capital que se recorre a pie. Anda hacia el **Muelle de Riotinto**, la pasarela de hierro sobre el Tinto. Reserva el atardecer. El río baja rojo del norte; el cielo, de cobre. No hay filtro que lo mejore.

Antes, un desvío al **Barrio Reina Victoria** (Barrio Obrero). Casas inglesas de las minas, porches y verjas: el legado británico de Riotinto, diez minutos y otra arquitectura. Luego **Casa Colón** —el pabellón, las exposiciones— y a la mesa.

## Dónde comer el primer día

Pide **gamba blanca a la plancha**. Es el producto que da nombre a esta costa: pálida, de cristal, sal y fuego. La gabardina es fiesta; la plancha es el rito. Acompañamiento: pimientos asados, o nada. El vino: un **Condado de Huelva**, blanco, frío. Si la casa recomienda el suyo, escúchala.

Por la tarde, **El Conquero** y el Parque Moret. Sube. Desde la loma se entiende la ría: marisma, pino, el Atlántico al fondo. Baja cuando se enciendan las luces.

## Día 2 — Palos, La Rábida y una playa

Coche o bus hacia **La Rábida**. El monasterio mudéjar es íntimo y basta: claustro, pinar, el estuario. **Palos de la Frontera**, la iglesia de San Jorge, el pueblo desde el que zarparon las naves. **Moguer** si te queda Juan Ramón: la casa-museo se visita en una hora y deja el sabor exacto.

Por la tarde, elige playa:

- **Punta Umbría** si quieres choco, paseo y el verano onubense.
- **Mazagón** si quieres pino, duna y una orilla más ancha.
- **Isla Cristina** si el plan es lonja y gamba con apellido.

Duerme pronto. El Atlántico madruga, y el primer baño de septiembre todavía es de verdad.`,
  },
  {
    slug: "manual-supervivencia-onubense",
    title: "Manual onubense",
    dek: "Cómo moverse, a qué hora sentarse, qué viento sopla y las palabras de la casa.",
    category: "guides",
    readMinutes: 9,
    featured: true,
    source: "editorial",
    neighborhood: "centro",
    publishedAt: "2026-08-08T08:00:00Z",
    votes: 37,
    body: `## Moverse

La capital se anda, y se anda bien. El área metropolitana pide otro ritmo: para **Punta Umbría** hay bus, con más frecuencia en verano; para **Mazagón, Isla Cristina, Aracena y Riotinto**, el coche abre la provincia. El tren llega a Huelva; el vuelo, a Sevilla, y de ahí un traslado fácil.

En agosto, los parkings cubiertos y el entorno del Muelle ahorran tiempo. Reserva esa energía para la mesa.

## Horarios

Comida: **14:00**. Cena: **21:30**. Los chiringuitos de playa se adelantan un poco; la capital, no. El domingo por la tarde la ciudad descansa; la costa sigue encendida.

Agosto es Colombinas y luz alta. Septiembre es el mes feliz: el agua todavía caliente, la orilla más ancha.

## El viento

El Atlántico manda. **Levante** y **poniente** cambian el baño, la bandera y el sitio de la sombrilla. Pregunta en el chiringuito: es la meteorología local, más fina que el parte. La Costa de la Luz se llama así por algo — tres mil horas de sol — y el viento es parte del paisaje, no un fastidio.

## Palabras

- **Onubense**: de Huelva. De Onuba, el nombre romano.
- **Choco**: sepia. En Punta, una institución.
- **Gamba blanca**: la de estos bancos de arena. Única.
- **La Cinta**: la virgen, el santuario, septiembre.
- **Colombinas**: la feria de la capital. Alegre, de casa.
- **Miarma, illó**: se oyen. Llegan solas, con los días.

Huelva no necesita compararse. Tiene ría, marisma, sierra y una mesa que se defiende sola.`,
  },
  {
    slug: "recetario-gamba-choco",
    title: "El recetario de la gamba blanca (y del choco)",
    dek: "Qué pedir, cómo se come y por qué la gamba blanca de Huelva es un producto de lujo que se sirve con sal.",
    category: "eat",
    readMinutes: 8,
    featured: true,
    source: "editorial",
    neighborhood: "punta-umbria",
    publishedAt: "2026-08-18T08:00:00Z",
    votes: 55,
    body: `## La gamba

La **gamba blanca de Huelva** vive en un banco de arena atlántico, entre siete y treinta millas. Sale por las lonjas de **Isla Cristina, Punta Umbría, Ayamonte y Huelva**. En crudo es pálida, casi de cristal. En cocida, firme y rosa suave. Es una de las piezas más finas del marisco europeo: hay que pedirla por su nombre.

### Cómo pedirla

- **A la plancha**, con sal. El clásico.
- **Cocida**, si es del día y el punto es el de la casa.
- **Gabardina** (rebozada) cuando apetece fiesta.

Se pelan en la mesa. Las cabezas se chupan. El pan está para el jugo. Es etiqueta de lonja, no de prisa.

### Dónde

En **Isla Cristina**, pregunta qué ha entrado. En **Punta Umbría**, el paseo en temporada. En la capital, las casas de toda la vida alrededor de Concepción y Pablo Rada. Una buena mesa sabe decirte el origen.

## El choco

El choco es sepia. En Punta se fríe y se pone en el centro como si fuera el motivo del viaje — y a menudo lo es. Tierno, limpio, sin harina de más. Empieza por el frito. Hay choco en salsa, huevas, puntillitas. Bebe **Condado** o una caña bien tirada.

## Lo demás que importa

**Coquinas** a la marinera, en su temporada. **Choquitos**, **acedías**, **urta**. **Mojama** como tapa noble. Y el **jamón de Jabugo** cuando subas a la sierra: dos geografías, dos mesas. La gamba por la mañana; el jamón, con la encina.`,
  },
  {
    slug: "barrios-explicados",
    title: "Barrios, explicados (y pueblos que importan)",
    dek: "Centro, Conquero, Reina Victoria, Punta, Mazagón, Isla Cristina. Elige tu Huelva.",
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

**Isla Chica.** La más vivida, la cotidiana. Desayuna como la ciudad: café, tostada, el día por delante.

## En la costa

**Punta Umbría** es la playa de los onubenses. Choco, gamba, paseo, agosto imposible sin reserva.

**Mazagón** es pino y duna. Más quieta. El Parador existe por una razón.

**Matalascañas** es la orilla de Doñana: playa servida y, al otro lado, el parque. Fuera de temporada, una calma rara y preciosa.

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
    dek: "Café, caña y pescado: cómo pedir en Huelva con la naturalidad de la casa.",
    category: "guides",
    readMinutes: 7,
    featured: true,
    source: "editorial",
    neighborhood: "centro",
    publishedAt: "2026-08-01T08:00:00Z",
    votes: 28,
    body: `## Café

Aquí el café se pide claro:

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

«El menú del día» en un sitio de pescado rara vez supera a la pizarra. Carta corta, lo que ha entrado, el camarero como guía.

## La cuenta

Se pide en barra o al camarero, sin palmas. En muchos bares todavía se fía el café de los de siempre. Tú no eres de siempre. Paga, da las gracias, y si vuelves mañana ya eres casi de la casa.`,
  },
  {
    slug: "colon-sin-placa",
    title: "Colón, Palos y el estuario",
    dek: "La Rábida, Palos y Moguer: el paisaje desde el que zarparon las naves, con el tiempo que merece.",
    category: "guides",
    readMinutes: 9,
    featured: true,
    source: "editorial",
    neighborhood: "moguer-palos",
    publishedAt: "2026-07-28T08:00:00Z",
    votes: 24,
    body: `Huelva es el estuario desde el que un puñado de marineros de Palos y Moguer se echaron al mar. La historia se entiende si se recorre sin prisa: monasterio, pueblo, palabra, ría.

## La Rábida

El monasterio es mudéjar, íntimo, silencioso. El claustro, el pinar, la luz del Odiel. El monumento a Colón, al otro lado de la ría, se contempla mejor de lejos, como una figura sobre el agua.

Las **réplicas de las carabelas** (Muelle de las Carabelas) emocionan con niños y cierran bien una mañana. El verdadero decorado es el estuario: eucaliptos, marisma, una luz que no se fabrica.

## Palos de la Frontera

La iglesia de **San Jorge**. La Fontanilla. Un pueblo que sigue siendo pueblo, y desde el que salió el viaje. Come aquí: plaza, Condado, tiempo.

## Moguer

Juan Ramón Jiménez no es un apéndice. La **casa-museo** y Platero se visitan en una hora. Moguer tiene plaza, vino y una calma que le sienta a la literatura. Si te interesa la palabra, quédate.

## El ritmo

Reserva medio día, o el día entero. Un eje —Rábida y Palos, o Moguer— bien andado vale más que tres sellos. Cierra, si puedes, en el **Muelle del Tinto**, cuando el hierro se enciende.`,
  },
  {
    slug: "playas-costa-de-la-luz",
    title: "Playas de la Costa de la Luz: cuál elegir",
    dek: "Punta, Portil, Mazagón, Matalascañas, Isla Cristina, Canela. Atlántico fino: agua viva, viento noble, luz larga.",
    category: "guides",
    readMinutes: 8,
    featured: false,
    source: "editorial",
    neighborhood: "punta-umbria",
    publishedAt: "2026-08-15T08:00:00Z",
    votes: 41,
    body: `El Atlántico de Huelva es otra costa: agua viva, viento que ordena el día, toallas con espacio. Tres mil horas de sol. La Costa de la Luz no es un eslogan; es el clima.

## Punta Umbría

La playa de los onubenses. Paseo, choco, familia, un verano que empieza en mayo. La flecha hacia El Portil es el paseo que hay que hacerse.

## El Portil

Más bajo, más duna, la laguna detrás. Ideal si buscas calma sin cambiar de comarca.

## Mazagón

Pinos hasta la arena. Playa ancha, de las que respiran. Elige este si las noches las quieres quietas.

## Matalascañas

Larga, servida, con Doñana a la espalda. Duerme aquí si el parque es el plan; báñate y entra al Acebuche al amanecer.

## Isla Cristina / Punta del Moral / Isla Canela

Gamba, marisma, orillas distintas. Isla Cristina gana en carácter marinero. Canela, en arena ancha y confort.

## Lo que conviene saber

La bandera se respeta: hay corriente de verdad. El poniente tumba sombrillas y también limpia el cielo. El atardecer se mira al oeste. Aquí el sol se pone en el mar.`,
  },
  {
    slug: "donana-sin-calor",
    title: "Doñana, a su hora",
    dek: "Cuándo ir, por qué puerta entrar y cómo visitar el parque con el respeto que pide.",
    category: "guides",
    readMinutes: 8,
    featured: false,
    source: "editorial",
    neighborhood: "matalascanas",
    publishedAt: "2026-08-10T08:00:00Z",
    votes: 19,
    body: `Doñana pide hora. Al amanecer, en mayo, octubre o un invierno claro, el parque se abre: aves, luz baja, marisma. El mediodía de agosto es para la playa; el parque, para el fresco.

## Puertas

**El Acebuche** (Matalascañas) es la entrada clásica, con centro de visitantes y una introducción seria al territorio. **El Rocío** es el pueblo-santuario: arena en las calles, hermandades, marisma a un paso. La aldea se entiende mejor un laborable que una mañana de julio entre prisas.

## Cómo entrar

Visitas concertadas, 4x4, pasarelas públicas. Reserva. Agua, sombrero, prismáticos. El lince es un privilegio, no una cita. Los ciervos, a veces, al atardecer.

## El Rocío

Si no vas a la romería, ve un día sereno. La ermita, la marisma, un café. La romería es un país aparte —fe, polvo, hermandad— y merece su propio viaje.

## Combinar

Duerme en Mazagón o Matalascañas. Parque por la mañana, playa por la tarde. Costa, marisma y sierra son tres Huelvas: dales tres tiempos.`,
  },
  {
    slug: "vino-condado-huelva",
    title: "Condado de Huelva: el blanco de esta mesa",
    dek: "Blancos atlánticos, vinos de naranja y bodegas de pueblo. Para beberse con la gamba, no para coleccionar.",
    category: "eat",
    readMinutes: 7,
    featured: false,
    source: "editorial",
    neighborhood: "moguer-palos",
    publishedAt: "2026-08-21T08:00:00Z",
    votes: 16,
    body: `El Condado es el vino de esta tierra llana: **blancos jóvenes** que sostienen una gamba con más gracia que muchos nombres de carta. Hay vinos históricos de naranja y bodegas en Bollullos, Rociana, Moguer, Palos.

Pide el blanco de la casa en un sitio que quiera a su provincia. Frío, limpio, de aquí. Una visita a bodega se hace en una mañana, entre fresas y moscatel.

Gamba y blanco. Jamón y un trago más serio, ya en la sierra. Dos geografías, dos copas. Huelva bebe lo que cultiva.`,
  },
];

export const SEED_PLACES: SeedPlace[] = [
  {
    name: "Muelle de Riotinto",
    kind: "mirador",
    lat: 37.2618,
    lng: -6.9415,
    blurb: "La pasarela de hierro sobre el Tinto. El atardecer más noble de la capital.",
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
    blurb: "El pueblo del jamón. Ve temprano, cuando el secadero todavía habla.",
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
    title: "Feria del Jamón y el Marisco de Ayamonte",
    dek: "Plaza de España. Gamba blanca y jamón ibérico, 26 al 28 de agosto, a partir de las 20:00. Lo que se habla esta semana.",
    startsOn: "2026-08-26",
    endsOn: "2026-08-28",
    venue: "Plaza de España, Ayamonte",
    neighborhood: "ayamonte",
    lat: 37.214,
    lng: -7.403,
    source: "editorial",
    votes: 28,
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
  {
    title: "Último fin de semana de agosto en Punta Umbría",
    dek: "Chiringuitos a tope, gamba plancha hasta tarde. El verano onubense cierra con las terrazas llenas.",
    startsOn: "2026-08-30",
    endsOn: "2026-08-31",
    venue: "Paseo de la Ribera, Punta Umbría",
    neighborhood: "punta-umbria",
    lat: 37.181,
    lng: -6.966,
    source: "editorial",
    votes: 15,
  },
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
    title: "Recreativo de Huelva vs. Real Murcia",
    dek: "Primera jornada en casa. El Decano recibe al Murcia en el Nuevo Colombino, domingo 1 de septiembre a las 18:00.",
    startsOn: "2026-09-01",
    endsOn: null,
    venue: "Estadio Nuevo Colombino",
    neighborhood: "centro",
    lat: 37.258,
    lng: -6.962,
    source: "editorial",
    votes: 22,
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
];
