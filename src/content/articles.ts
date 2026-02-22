export interface LocalArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  publishedAt: string;
  author: string;
  isAi: boolean;
}

// Categorías válidas (deben coincidir con CATEGORY_MAP en constants.ts):
// 'Gastronomía'   → /comer
// 'Eventos'       → /eventos
// 'Alojamiento'   → /alojarse
// 'Guías Locales' → /guias
// 'Noticias'      → /noticias

export const LOCAL_ARTICLES: LocalArticle[] = [
  // ─── NOTICIAS ──────────────────────────────────────────────────
  {
    slug: 'huelva-puerto-ampliacion-muelle-2026',
    title: 'El Puerto de Huelva inicia el proceso de ampliación del muelle de contenedores',
    excerpt: 'La Autoridad Portuaria de Huelva ha publicado el expediente de licitación para ampliar la capacidad del muelle de contenedores, con una inversión prevista de más de 40 millones de euros.',
    category: 'Noticias',
    image: '/images/guides/muelle-tinto-sunset.jpg',
    publishedAt: '2026-02-22T21:30:00Z',
    author: 'Manuel V. Cinta',
    isAi: true,
    content: `
      <p>La Autoridad Portuaria de Huelva ha dado luz verde al expediente de licitación para ampliar el muelle de contenedores, una infraestructura clave para la logística industrial de la provincia. La inversión prevista supera los 40 millones de euros y el plazo de ejecución estimado es de 30 meses.</p>

      <h2>Qué cambia con esta ampliación</h2>
      <p>La capacidad operativa del muelle pasaría de las actuales 180.000 unidades equivalentes de veinte pies (TEU) anuales a aproximadamente 320.000 TEU. Esto permitiría absorber el crecimiento de tráfico vinculado al polo industrial de Palos de la Frontera y al Corredor Atlántico de mercancías.</p>
      <ul>
        <li>Nueva grúa pórtico de mayor alcance para buques de gran eslora.</li>
        <li>Ampliación de la explanada de almacenamiento en 4,2 hectáreas.</li>
        <li>Mejora del acceso ferroviario al recinto portuario.</li>
      </ul>

      <h2>Impacto en el empleo local</h2>
      <p>La Autoridad Portuaria estima que la fase de construcción generará alrededor de 350 empleos directos e indirectos en la provincia. A largo plazo, el incremento de actividad logística podría consolidar entre 80 y 120 puestos de trabajo permanentes en operaciones portuarias y servicios auxiliares.</p>

      <h2>Plazos previstos</h2>
      <p>El periodo de presentación de ofertas cierra en abril de 2026. La adjudicación se espera para el tercer trimestre del año, con inicio de obras a finales de 2026.</p>

      <blockquote>La ampliación refuerza el posicionamiento estratégico del Puerto de Huelva como nodo logístico del suroeste peninsular.</blockquote>
    `
  },
  {
    slug: 'huelva-festival-cine-europeo-2026',
    title: 'El Festival de Cine Iberoamericano de Huelva presenta su programación para la edición de 2026',
    excerpt: 'El festival más veterano del cine latinoamericano en España confirma fechas y anticipa las primeras películas seleccionadas para la sección oficial.',
    category: 'Noticias',
    image: '/images/guides/huelva-plaza-las-monjas.jpg',
    publishedAt: '2026-02-22T20:30:00Z',
    author: 'Manuel V. Cinta',
    isAi: true,
    content: `
      <p>El Festival de Cine Iberoamericano de Huelva, que celebrará su edición 2026 en noviembre, ha comenzado a avanzar los primeros nombres de su sección oficial. Con más de cuatro décadas de historia, el festival sigue siendo uno de los escaparates más relevantes del cine latinoamericano en Europa.</p>

      <h2>Lo que se sabe hasta ahora</h2>
      <p>La organización ha confirmado que la sección oficial mantendrá la estructura de años anteriores: largometrajes de ficción, documental competitivo y una sección paralela dedicada a primeras obras. La sede principal seguirá siendo el Gran Teatro de Huelva.</p>
      <ul>
        <li>Fechas tentativas: primera quincena de noviembre de 2026.</li>
        <li>Sección Iberoamérica con representación de al menos 12 países.</li>
        <li>Premio Extraordinario Latinoamericano en su convocatoria anual.</li>
      </ul>

      <h2>Impacto en la ciudad</h2>
      <p>Durante los días del festival, la ciudad recibe a profesionales del sector, prensa especializada y público general. Los hoteles del centro registran ocupaciones superiores al 90% durante las noches de gala.</p>

      <blockquote>El festival es uno de los activos culturales más reconocibles de Huelva a nivel nacional e internacional.</blockquote>
    `
  },

  // ─── EVENTOS ───────────────────────────────────────────────────
  {
    slug: 'agenda-huelva-esta-semana-claves',
    title: 'Agenda de Huelva: qué hacer esta semana en capital y provincia',
    excerpt: 'Selección de planes para la semana en Huelva y provincia: mercados, conciertos, actividades en la naturaleza y eventos culturales con horarios y acceso.',
    category: 'Eventos',
    image: '/images/guides/monumento-colon-monjas.jpg',
    publishedAt: '2026-02-22T21:15:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>La agenda onubense tiene ritmo propio: hay semanas cargadas y semanas para respirar. Esta es una selección con criterio, no un volcado de todo lo que pasa.</p>

      <h2>Planes en capital</h2>
      <ul>
        <li><strong>Mercado ecológico Plaza de las Monjas</strong> — Sábado 9:00-14:00. Productores locales de Huelva y provincia. Entrada libre.</li>
        <li><strong>Visita guiada Barrio Reina Victoria</strong> — Domingo 11:00. Salida desde el propio barrio. Plazas limitadas, reserva previa recomendada.</li>
        <li><strong>Exposición temporal Museo de Huelva</strong> — Abierta toda la semana. Entrada gratuita domingos.</li>
      </ul>

      <h2>Planes en provincia</h2>
      <ul>
        <li><strong>Ruta senderista Marismas del Odiel</strong> — Sábado 8:30. Salida desde el Centro de Visitantes. Nivel fácil-medio. Llevar agua y calzado adecuado.</li>
        <li><strong>Mercado artesano Almonte</strong> — Domingo 10:00-15:00. Artesanía local, cerámica y productos típicos de la comarca.</li>
      </ul>

      <h2>Cómo organizarte</h2>
      <p>Si vas a varios planes, ordena por ubicación: capital el sábado por la mañana y sierra o costa el domingo. Ahorra desplazamientos y aprovechas mejor el fin de semana.</p>

      <blockquote>Consejo: llama antes de ir a cualquier evento. Los cambios de horario de última hora son más habituales de lo que parece.</blockquote>
    `
  },
  {
    slug: 'fiesta-tinajas-trigueros',
    title: 'Fiesta de las Tinajas en Trigueros: cómo organizarte para no perder media tarde',
    excerpt: 'Todo lo que necesitas saber antes de ir: acceso, horarios, aparcamiento y qué esperar de uno de los eventos más auténticos de la comarca.',
    category: 'Eventos',
    image: '/images/guides/calle-huelva-centro.jpg',
    publishedAt: '2026-02-22T20:55:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>La Fiesta de las Tinajas es uno de esos eventos de provincia que merece el desplazamiento. Sin postureo, con ambiente local real y producto de la zona como protagonista.</p>

      <h2>Cómo llegar</h2>
      <p>Trigueros está a 18 km de Huelva capital por la A-472. En coche el acceso es directo. En días de fiesta el aparcamiento en las calles del centro se complica, así que lo más cómodo es aparcar en la periferia y entrar andando.</p>
      <ul>
        <li>Aparcamiento recomendado: zona del polideportivo o acceso sur del pueblo.</li>
        <li>Tiempo a pie desde aparcamiento hasta el centro: 8-10 minutos.</li>
      </ul>

      <h2>Qué esperar</h2>
      <p>La fiesta gira en torno a la tradición alfarera de la zona: exposición de tinajas, demostración de técnicas artesanales y mercado local. El ambiente es familiar y el ritmo tranquilo.</p>
      <ul>
        <li>Artesanía de barro y cerámica con denominación local.</li>
        <li>Degustaciones de productos de la comarca.</li>
        <li>Actuaciones musicales en la plaza principal.</li>
      </ul>

      <h2>Checklist antes de salir</h2>
      <ul>
        <li>Confirmar horario oficial actualizado (suele haber cambios de último momento).</li>
        <li>Llevar efectivo: no todos los puestos tienen TPV.</li>
        <li>Ropa cómoda y calzado plano.</li>
      </ul>

      <blockquote>Si vas en grupo: queda en un punto fijo al llegar. El pueblo se llena y perderse es fácil.</blockquote>
    `
  },

  // ─── GASTRONOMÍA → /comer ──────────────────────────────────────
  {
    slug: 'ruta-gamba-blanca-huelva-capital',
    title: 'Ruta de la gamba blanca en Huelva capital: dónde comer bien sin trampa',
    excerpt: 'Guía práctica para disfrutar la gamba blanca de Huelva con criterio: cómo elegir sitio, qué pedir y qué evitar.',
    category: 'Gastronomía',
    image: '/images/guides/gambas-blancas-huelva.jpg',
    publishedAt: '2026-02-22T21:10:00Z',
    author: 'Rocío Limón',
    isAi: true,
    content: `
      <p>La gamba blanca de Huelva no necesita adornos. Es producto de temporada, con sabor intenso y textura firme cuando está bien tratada. El problema es que en muchos sitios se sirve congelada o pasada de cocción sin que el cliente lo sepa.</p>

      <h2>Cómo reconocer producto fresco</h2>
      <ul>
        <li>Color: blanco nacarado con ligero tono rosado. Si está grisácea, lleva tiempo.</li>
        <li>Olor: marino pero limpio. Sin rastro de amoniaco.</li>
        <li>Textura: firme al tacto. Si está blanda antes de cocinar, no es del día.</li>
      </ul>

      <h2>Dónde orientar la búsqueda</h2>
      <p>El mercado del Carmen es buen punto de referencia para ver qué hay de temporada. Los bares de la zona del Odiel y del puerto históricamente tienen rotación de producto más ajustada a la lonja.</p>

      <h2>Qué pedir y qué evitar</h2>
      <p>La gamba blanca no necesita salsa. Si el sitio la sirve con ali-oli por defecto, es señal de que el producto no es suficientemente bueno solo.</p>
      <ul>
        <li>Cocida o a la plancha: las dos preparaciones válidas.</li>
        <li>Precio orientativo: entre 18 y 28 euros el cuarto de kilo según temporada.</li>
        <li>Evitar menús con gamba "incluida" a precios muy bajos.</li>
      </ul>

      <h2>Temporada</h2>
      <p>La gamba blanca de Huelva tiene mejor momento entre octubre y marzo. En verano el producto que se sirve suele ser de otras procedencias o congelado.</p>

      <blockquote>En Huelva, el marisco no se adorna: se respeta.</blockquote>
    `
  },
  {
    slug: 'choco-frito-huelva-como-se-come-bien',
    title: 'Choco frito en Huelva: cómo distinguir el bueno del mediocre',
    excerpt: 'El choco frito es identidad onubense. Una guía para entender qué lo hace diferente, cómo pedirlo bien y dónde orientar la búsqueda.',
    category: 'Gastronomía',
    image: '/images/guides/choco-frito-tapa.jpg',
    publishedAt: '2026-02-22T21:00:00Z',
    author: 'Rocío Limón',
    isAi: true,
    content: `
      <p>El choco frito es uno de los elementos más reconocibles de la cocina onubense. No es sepia. Es choco: un cefalópodo que se trabaja de forma diferente, con textura y sabor propios que no tienen equivalente directo en otras cocinas costeras andaluzas.</p>

      <h2>Qué hace al choco frito de Huelva diferente</h2>
      <p>El punto clave está en el rebozado y la temperatura del aceite. El choco bien frito tiene la capa exterior crujiente y el interior tierno, sin exceso de grasa. Si está gomoso o apelmazado, algo falló en la cocina.</p>
      <ul>
        <li>Rebozado: harina fina, no panko ni espeso.</li>
        <li>Aceite: de oliva, muy caliente. No reutilizado en exceso.</li>
        <li>Corte: en tiras o en dados, según zona y tradición del local.</li>
      </ul>

      <h2>Dónde orientarse</h2>
      <p>Las freidurías del centro y del barrio El Torrejón son buena referencia. Los sitios con carta extensa y precio bajo suelen sacrificar calidad de producto.</p>

      <h2>Cómo pedirlo</h2>
      <p>Ración o media ración, dependiendo del grupo. Sin limón por defecto en muchos sitios —si lo quieres, pídelo. El choco bueno no necesita enmascarar nada.</p>

      <blockquote>Regla choquera: si te sirven "sepia frita" en Huelva, pregunta. Probablemente es choco y el camarero no lo sabe diferenciar.</blockquote>
    `
  },

  // ─── ALOJAMIENTO → /alojarse ───────────────────────────────────
  {
    slug: 'donde-dormir-huelva-capital-opciones-reales',
    title: 'Dónde dormir en Huelva capital: opciones reales para distintos presupuestos',
    excerpt: 'Una guía honesta sobre alojamiento en Huelva ciudad: qué zonas funcionan mejor, qué esperar en cada rango de precio y cómo no llevarte sorpresas.',
    category: 'Alojamiento',
    image: '/images/guides/barrio-reina-victoria-hero.jpg',
    publishedAt: '2026-02-22T21:05:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>Huelva no es una ciudad con infraestructura hotelera masiva. Lo que tiene es suficiente para una estancia de 1-3 días si sabes dónde mirar. El truco está en elegir bien la zona antes de elegir el hotel.</p>

      <h2>Qué zona elegir</h2>
      <p>Para moverse a pie, el centro histórico (entorno a Plaza de las Monjas y Calle Concepción) es lo más práctico. Acceso a bares, comercio y museos sin necesitar coche.</p>
      <ul>
        <li><strong>Centro:</strong> mejor acceso a pie. Algo más de ruido nocturno los fines de semana.</li>
        <li><strong>Zona Gran Vía:</strong> más tranquila, bien comunicada. Buena opción para viajes de trabajo.</li>
        <li><strong>Alrededores del Puerto:</strong> interesante si llegas en barco o quieres el ambiente del Odiel.</li>
      </ul>

      <h2>Rangos de precio orientativos</h2>
      <ul>
        <li><strong>Económico (30-55€/noche):</strong> hostales y pensiones familiares en el centro. Limpios y funcionales. Sin extra.</li>
        <li><strong>Medio (60-100€/noche):</strong> hoteles de 3 estrellas con desayuno incluido en algunos casos. La mejor relación calidad-precio.</li>
        <li><strong>Superior (100-160€/noche):</strong> hoteles de 4 estrellas con aparcamiento y servicios completos. Dos o tres opciones en la ciudad.</li>
      </ul>

      <h2>Qué revisar antes de reservar</h2>
      <ul>
        <li>Aparcamiento: en el centro es complicado. Confirmar si el hotel tiene o está cerca de parking público.</li>
        <li>Desayuno incluido: en Huelva suele compensar más desayunar en bar local que pagar el buffet del hotel.</li>
        <li>Cancelación: reservar con cancelación gratuita si el plan no está 100% cerrado.</li>
      </ul>

      <blockquote>Consejo directo: un hostal bien ubicado en el centro supera a un hotel mediocre en la periferia. La logística lo vale.</blockquote>
    `
  },
  {
    slug: 'alojarse-sierra-aracena-opciones',
    title: 'Alojarse en la Sierra de Aracena: casas rurales, hoteles y lo que no te cuentan',
    excerpt: 'Opciones reales de alojamiento en la sierra onubense: dónde quedarse según el tipo de viaje, temporada y presupuesto.',
    category: 'Alojamiento',
    image: '/images/guides/jamon-iberico-bellota.jpg',
    publishedAt: '2026-02-22T20:50:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>La sierra de Aracena tiene oferta de alojamiento variada, pero hay que saber leer entre líneas. No todo lo que se anuncia como "casa rural con encanto" cumple las expectativas fuera de temporada.</p>

      <h2>Tipos de alojamiento disponibles</h2>
      <ul>
        <li><strong>Casas rurales independientes:</strong> la opción más popular para grupos o familias. Alquiler completo, cocina propia, entorno natural. Precio medio 80-150€/noche la casa completa.</li>
        <li><strong>Hoteles rurales en Aracena pueblo:</strong> más cómodos logísticamente, con acceso directo a restaurantes y servicios. Buenos para viajes cortos de 1-2 noches.</li>
        <li><strong>Apartamentos turísticos:</strong> opciones intermedias con más flexibilidad que el hotel pero sin el mantenimiento de una casa rural de calidad.</li>
      </ul>

      <h2>Temporada y disponibilidad</h2>
      <p>La sierra tiene dos picos claros: otoño (octubre-noviembre) por la matanza y las setas, y primavera (marzo-mayo) por el paisaje. En esas épocas hay que reservar con semanas de antelación.</p>

      <h2>Lo que no te cuentan</h2>
      <ul>
        <li>Algunas casas rurales anunciadas online llevan temporadas sin actualizar fotos. Pide fotos recientes antes de reservar.</li>
        <li>La calefacción es clave en invierno: confirmar que funciona y que el combustible está incluido.</li>
        <li>El acceso a muchas casas es por pista sin asfaltar. Con lluvia, un coche bajo puede complicarse.</li>
      </ul>

      <blockquote>Si buscas calidad sin sorpresas: prioriza alojamientos con reseñas recientes y teléfono de contacto directo, no solo booking.</blockquote>
    `
  },

  // ─── GUÍAS LOCALES → /guias ────────────────────────────────────
  {
    slug: 'el-rocio-guia-principiantes',
    title: 'El Rocío para principiantes: logística, respeto y cómo no parecer turista',
    excerpt: 'Una guía práctica para entender El Rocío antes de ir: cuándo ir, cómo moverte, qué esperar y qué no hacer.',
    category: 'Guías Locales',
    image: '/images/guides/iglesia-rocio-huelva.jpg',
    publishedAt: '2026-02-22T21:20:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>El Rocío no es un parque temático. Es una aldea viva con tradición centenaria, una ermita de importancia nacional y un entorno natural protegido que la rodea. Si vas sin saber esto, probablemente no lo disfrutes y puede que molestes sin querer.</p>

      <h2>Cuándo ir según tu objetivo</h2>
      <ul>
        <li><strong>Visita cultural tranquila:</strong> entre semana en meses de otoño o invierno. Poca gente, ambiente auténtico.</li>
        <li><strong>Romería:</strong> Pentecostés (mayo-junio). Masificación máxima. Experiencia única pero requiere preparación logística seria.</li>
        <li><strong>Naturaleza (Doñana):</strong> cualquier época. Coordinar con el Centro de Visitantes del Parque Nacional.</li>
      </ul>

      <h2>Logística básica</h2>
      <ul>
        <li>Aparcamiento: fuera del núcleo central. La aldea no está diseñada para coches en tránsito.</li>
        <li>Calzado: arena suelta en calles. Nada de tacones ni calzado de ciudad.</li>
        <li>Horario de la ermita: variable según días y celebraciones. Consultar antes de ir.</li>
      </ul>

      <h2>Respeto al entorno</h2>
      <p>La aldea es residencia permanente de muchas familias. No es decorado. Fotografiar personas sin permiso o entrar en zonas privadas son faltas de respeto que se notan.</p>

      <blockquote>El Rocío bien visitado es de las experiencias más singulares de Andalucía. Mal visitado, es una cola en un sitio que no entiendes.</blockquote>
    `
  },
  {
    slug: 'muelle-tinto-atardecer-guia-real',
    title: 'Muelle del Tinto: guía real para ver el atardecer (hora, posición y sin agobios)',
    excerpt: 'Todo lo que necesitas para aprovechar el atardecer en el Muelle del Tinto: mejor franja horaria, dónde colocarte y qué llevar.',
    category: 'Guías Locales',
    image: '/images/guides/muelle-tinto-sunset.jpg',
    publishedAt: '2026-02-22T21:05:00Z',
    author: 'Carmen Doñana',
    isAi: true,
    content: `
      <p>El Muelle del Tinto es una de las estampas más reconocibles de Huelva. Las estructuras minerales victorianas, el estuario del Odiel y la luz de la Costa de la Luz crean una combinación fotográfica difícil de igualar. Pero si vas a la hora equivocada, te lo pierdes.</p>

      <h2>Hora exacta para llegar</h2>
      <p>La regla práctica: llega 40 minutos antes del ocaso oficial. Así pillas la luz dorada en su mejor momento, no solo el sol tocando el horizonte. Puedes consultar la hora de puesta en cualquier app de clima.</p>

      <h2>Posición recomendada</h2>
      <ul>
        <li>Para el muelle completo en perspectiva: acceso sur, con el río de fondo.</li>
        <li>Para contraluz sobre las estructuras: zona central del paseo.</li>
        <li>Para silencio y calma: extremo norte, menos frecuentado.</li>
      </ul>

      <h2>Qué llevar</h2>
      <ul>
        <li>Chaqueta: el viento del estuario baja la temperatura al caer el sol, incluso en primavera.</li>
        <li>Calzado cómodo: hay tramos de adoquín irregular.</li>
        <li>Agua: el paseo completo son unos 3 km de ida y vuelta si lo recorres entero.</li>
      </ul>

      <h2>Cuándo evitarlo</h2>
      <p>Los domingos en verano está saturado de gente con cámaras y drones. Si buscas calma, ve entre semana o en meses fríos.</p>

      <blockquote>El Muelle del Tinto de tarde es Huelva en su mejor versión. Sin prisa y con luz.</blockquote>
    `
  },
  {
    slug: 'ayamonte-casco-historico-y-tapeo',
    title: 'Ayamonte en un día: ruta por el casco histórico, tapeo y paseo junto al Guadiana',
    excerpt: 'Plan completo para exprimir Ayamonte sin correr: por dónde empezar, dónde comer, cómo terminar el día con vistas al río.',
    category: 'Guías Locales',
    image: '/images/guides/calle-huelva-centro.jpg',
    publishedAt: '2026-02-22T20:50:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>Ayamonte está a menos de una hora de Huelva capital y tiene suficiente para llenar un día completo sin forzar el ritmo. El truco es no intentar verlo todo: mejor pocas cosas bien que un tour de check-ins vacíos.</p>

      <h2>Mañana: casco histórico</h2>
      <p>Empieza por la parte alta del pueblo antes de que llegue el calor. El casco conserva arquitectura tradicional bien preservada, con miradores sobre el Guadiana y Portugal al fondo.</p>
      <ul>
        <li>Iglesia de San Francisco: gótico-mudéjar del siglo XV.</li>
        <li>Plaza de la Laguna: centro neurálgico con mercado local los sábados.</li>
        <li>Mirador del Castillo: las mejores vistas del estuario y la costa portuguesa.</li>
      </ul>

      <h2>Mediodía: tapeo sin trampa</h2>
      <p>La zona baja, cerca del puerto de ferry, concentra los bares más frecuentados por locales. Producto del Guadiana y mariscos de la zona son la apuesta segura.</p>
      <ul>
        <li>Acedías fritas: especialidad local que no está en todos los sitios.</li>
        <li>Dorada o lubina del río: cuando es del día, notoria la diferencia.</li>
      </ul>

      <h2>Tarde: paseo junto al río</h2>
      <p>El paseo marítimo de Ayamonte corre paralelo al Guadiana durante casi dos kilómetros. Buen sitio para bajar la comida y ver los ferris que cruzan a Castro Marim (Portugal).</p>

      <blockquote>Si el día acompaña, cierra la tarde con café en terraza mirando al río. Plan de provincia sin complicaciones.</blockquote>
    `
  },
  {
    slug: 'aracena-que-hacer-fin-de-semana',
    title: 'Aracena de fin de semana: cueva, sierra, ibérico y cómo organizar el día',
    excerpt: 'Guía realista para sacar el máximo a una escapada a Aracena: qué ver primero, dónde comer bien y cómo evitar las colas de la Gruta.',
    category: 'Guías Locales',
    image: '/images/guides/jamon-iberico-bellota.jpg',
    publishedAt: '2026-02-22T20:45:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>Aracena es la capital de la Sierra de Huelva y uno de los destinos de interior más completos de Andalucía. Naturaleza, patrimonio, gastronomía ibérica y un pueblo con carácter propio. El problema es que mucha gente va sin orden y pierde horas en colas evitables.</p>

      <h2>Gruta de las Maravillas: ir temprano o no ir</h2>
      <p>La Gruta de las Maravillas es visita obligatoria, pero las entradas se agotan. Recomienda llegar al menos 45 minutos antes de apertura (9:00) o reservar online con antelación. Las visitas son guiadas con grupos cerrados cada 30-45 minutos.</p>
      <ul>
        <li>Duración de la visita: aproximadamente 50 minutos.</li>
        <li>Temperatura interior: 16-18ºC constantes. Llevar capa ligera.</li>
        <li>Precio: consultar web oficial para tarifas actualizadas.</li>
      </ul>

      <h2>Castillo y casco histórico</h2>
      <p>El castillo árabe domina el pueblo desde lo alto. Acceso libre al recinto exterior. Las vistas sobre la sierra desde la muralla justifican el paseo.</p>

      <h2>Mesa: el ibérico como protagonista</h2>
      <p>La comarca de Aracena es zona de denominación de origen del jamón ibérico de bellota. Los restaurantes del centro sirven producto local con elaboraciones sencillas: tabla de ibéricos, presa a la brasa, solomillo al Pedro Ximénez.</p>
      <ul>
        <li>Hora punta: 14:00-15:30 los fines de semana. Reservar si el grupo es de 4+.</li>
        <li>Precio medio: 25-40€ por persona con bebida.</li>
      </ul>

      <blockquote>Aracena se disfruta sin prisa. Si intentas hacer todo en 4 horas, no disfrutas nada.</blockquote>
    `
  }
];
