export type BacklogIdea = {
  topic: string;
  angle: string;
  category: "guides" | "news" | "events" | "eat";
  neighborhood: string | null;
  body?: string;
  dek?: string;
};

export const BACKLOG_IDEAS: BacklogIdea[] = [
  {
    topic: "El poniente de septiembre",
    angle: "Por qué la bandera amarilla manda más que el calendario.",
    category: "guides",
    neighborhood: "punta-umbria",
    dek: "El agua sigue. El viento, también. Septiembre es el mes que los onubenses no regalan.",
    body: `## El truco no es agosto

Agosto es ruido. Septiembre es el pacto: el agua todavía está, las toallas se van, el poniente sigue mandando.

En **Punta Umbría** la bandera pasa a amarilla cuando pica el viento, no cuando lo dice un cartel de temporada. Si el chiringuito recoge sombrillas, tú también. No es drama. Es Atlántico.

## Dónde ir

- **Mazagón** hacia el este, andando, cuando Punta se llena de fin de semana.
- **El Portil** a última hora, la flecha sin megafonía.
- La capital, el **Muelle del Tinto**, si el mar no deja.

No hace falta despedirse del verano el 31. Aquí el verano se despide cuando el agua lo dice.`,
  },
  {
    topic: "Coquinas de primera hora",
    angle: "El chiringuito a las diez no es el de las tres.",
    category: "eat",
    neighborhood: "punta-umbria",
    dek: "Las coquinas no esperan. Ni el aceite nuevo tampoco.",
    body: `## A las diez

Si llegas a **El Portil** o a la Ribera de Punta a las diez de un septiembre laborable, pide **coquinas**. El aceite está nuevo y la marisma todavía huele a marea.

A las tres, a veces, ya no quedan. O quedan y el aceite no. No hay lealtad que justifique una coquina pasada.

## Cómo

A la marinera, pan, vino blanco del Condado. Fin. Si te ofrecen un menú del día con paella, estás en el sitio equivocado.

Firmado desde la mesa de las diez, no desde la cola de las tres.`,
  },
  {
    topic: "El kiosco de las Monjas",
    angle: "El rito que no sale en la guía de Colón.",
    category: "guides",
    neighborhood: "centro",
    dek: "Café, sombra y el salón de estar de la capital. Sin placa.",
    body: `## Plaza de las Monjas

No es un monumento. Es donde Huelva se sienta. El kiosco, la sombra, las abuelas, el trámite a diez metros.

Pide el café sin diccionario. Tostada de tomate o manteca. Mira. Eso es el centro: no la catedral, el velador.

Si tu plan es «hacer Huelva» en dos horas, empieza aquí y resiste la tentación de irte a La Rábida antes de haber entendido la plaza.

La Rábida espera. El café, no tanto.`,
  },
  {
    topic: "Bus a Punta sin coche",
    angle: "Se puede. No es un mito urbano de Aljaraque.",
    category: "guides",
    neighborhood: "punta-umbria",
    dek: "La capital se anda. Punta se bus. El resto, se piensa.",
    body: `## Sí hay bus

De la estación de Huelva a **Punta Umbría** hay línea regular. En verano, más. En septiembre, suficiente si no viajas con tres hamacas y un perro.

Consulta la hora de vuelta **antes** del segundo choco. El último bus no espera a tu ración.

## Lo que no hay

No improvises Mazagón, Isla Cristina o Aracena en transporte público como si fuera el metro de Madrid. Coche, o un plan más corto.

Aparcar en Punta en agosto es un deporte. En septiembre, un trámite.`,
  },
  {
    topic: "Blanco del Condado con la gamba",
    angle: "La caña está bien. El blanco está mejor.",
    category: "eat",
    neighborhood: "moguer-palos",
    dek: "El Condado no es Jerez. No tiene que serlo. Está para la gamba.",
    body: `## La copa que casi nadie pide

En muchos veladores la gamba llega con caña por inercia. Pide un **blanco del Condado**, frío. Si el de la casa no es un brick, hazle caso.

No hay que hablar de maridaje. Hay que beber lo que crece a treinta kilómetros de la lonja.

## Dónde

Bollullos, Rociana, Moguer, Palos. Una mañana de bodega cabe entre la fresa y La Rábida. El jamón, ya en la sierra, es otra copa y otra geografía.

Dos provincias en una. Dos tragos. No los mezcles en el mismo acto.`,
  },
  {
    topic: "Reina Victoria sin filtro inglés",
    angle: "El barrio obrero es de aquí, aunque parezca de Gales.",
    category: "guides",
    neighborhood: "reina-victoria",
    dek: "Porches, verjas, damero. Diez minutos y otra provincia. Sigue siendo Huelva.",
    body: `## Barrio Obrero

Las casas las levantó el capital británico de Riotinto. El nombre oficial es **Reina Victoria**. Aquí se dice Barrio Obrero.

Entra por la calle A y recorre el damero. No hay boutique. No hay hotel dentro. Hay porche y una idea de pueblo metida en la ciudad.

## Cómo usarlo

Se visita. Se fotografía sin palo. Se baja a Concepción a comer. No se «elige para alojarse».

Si solo tienes un hueco entre el Muelle y El Conquero, este es el hueco correcto.`,
  },
  {
    topic: "La Cinta en septiembre",
    angle: "La feria grande ya pasó. La de verdad, para los de aquí, es esta.",
    category: "events",
    neighborhood: "conquero",
    dek: "Santuario, cuesta y virgen. Colombinas es ruido. La Cinta es Huelva.",
    body: `## 8 de septiembre

Las Colombinas cierran julio. **La Cinta** abre el otoño. El santuario arriba, la ciudad abajo, la cuesta en medio.

No es para el crucerista. Es para quien tiene abuela en Isla Chica. Si estás de visita, sube igual: el mirador vale la pena aunque no sepas la letanía.

## Cómo

A pie o en el bus de siempre. Agua. Respeto cuando hay misa. Foto del estuario, no del selfie con la virgen.

Luego baja. Cena en la capital. El Polo al fondo, encendido. Esa es la postal honesta.`,
  },
  {
    topic: "Riotinto en octubre, no en agosto",
    angle: "El rojo mancha. El calor, también.",
    category: "guides",
    neighborhood: null,
    dek: "El tren minero aguanta hasta octubre. Es el mes correcto.",
    body: `## El paisaje no necesita filtro

La cuenca de **Riotinto** parece de otro planeta y fue de una compañía británica. El tren turístico es un vagón viejo, no un documental.

Agosto allí es un error. **Octubre** es agua, sombrero todavía, y menos cola.

## Cómo

Reserva el tren. Museo minero. Calzado cerrado: el rojo mancha. No lo combines con playa el mismo día. Huelva es ancha. Trátala como tal.

Si te queda Jabugo, es otra noche y otra temperatura.`,
  },
];
