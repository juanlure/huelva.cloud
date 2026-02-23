export interface LocalArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string | null;
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
  // ─── EVENTOS ───────────────────────────────────────────────────
  {
    slug: 'agenda-huelva-esta-semana-claves',
    title: 'Agenda de Huelva: qué hacer esta semana en capital y provincia',
    excerpt: 'Selección de planes para la semana en Huelva y provincia: mercados, conciertos, actividades en la naturaleza y eventos culturales con horarios y acceso.',
    category: 'Eventos',
    image: '/images/guides/huelva-plaza-las-monjas.jpg',
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

  // ─── GASTRONOMÍA → /comer ──────────────────────────────────────
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
    image: '/images/guides/huelva-plaza-las-monjas.jpg',
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

  // ─── GUÍAS LOCALES → /guias ────────────────────────────────────
  {
    slug: 'aracena-que-hacer-fin-de-semana',
    title: 'Aracena de fin de semana: cueva, sierra, ibérico y cómo organizar el día',
    excerpt: 'Guía realista para sacar el máximo a una escapada a Aracena: qué ver primero, dónde comer bien y cómo evitar las colas de la Gruta.',
    category: 'Guías Locales',
    image: '/images/guides/corte-jamon-iberico.jpg',
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
  },

  // ─── NUEVOS ARTÍCULOS ──────────────────────────────────────────

  // 5. Plaza de las Monjas
  {
    slug: 'plaza-monjas-huelva-guia-completa',
    title: 'Plaza de las Monjas: el corazón social de Huelva',
    excerpt: 'Guía completa de la Plaza de las Monjas: historia, qué hacer, dónde comer cerca y por qué sigue siendo el centro de gravedad de la ciudad.',
    category: 'Guías Locales',
    image: '/images/guides/huelva-plaza-las-monjas.jpg',
    publishedAt: '2026-02-23T18:00:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>La Plaza de las Monjas no es la plaza más bonita de España. No tiene la elegancia de la Plaza Mayor de Salamanca ni la monumentalidad de la Plaza de España de Sevilla. Pero es la plaza de Huelva: el lugar donde la ciudad se encuentra, se encuentra a sí misma y se organiza.</p>

      <h2>Qué es realmente la Plaza de las Monjas</h2>
      <p>Espacio peatonal en el centro histórico, rodeado de edificios de principios del siglo XX. El nombre viene del antiguo convento de monjas que ocupaba parte del solar. Hoy es zona de paso, de encuentro y de terrazas.</p>

      <h2>Qué hacer aquí</h2>
      <ul>
        <li><strong>Tomar café en una terraza:</strong> especialmente por la mañana, cuando el sol entra de lado y la gente pasea.</li>
        <li><strong>Observar la arquitectura:</strong> los edificios del entorno tienen detalles modernistas poco conocidos pero dignos de atención.</li>
        <li><strong>Usarla como base:</strong> desde aquí se llega a pie a todos los puntos interesantes del centro en menos de 10 minutos.</li>
      </ul>

      <h2>Dónde comer cerca</h2>
      <p>Alrededor de la plaza hay una concentración de bares y restaurantes que abarca desde tapas tradicionales hasta cocina más elaborada. No es la zona más barata, pero tiene opciones para distintos presupuestos.</p>
      <ul>
        <li>Calle Concepción: bares de toda la vida.</li>
        <li>Calle Rico: opciones de mediana categoría.</li>
        <li>Calle Vázquez López: cafeterías y desayunos.</li>
      </ul>

      <h2>Horarios y acceso</h2>
      <p>La plaza es peatonal las 24 horas. Las terrazas suelen abrir de 8:00 a 24:00. Los fines de semana hay más ambiente, especialmente a mediodía y al atardecer.</p>

      <blockquote>La Plaza de las Monjas no es un destino. Es un punto de partida.</blockquote>
    `
  },

  // 6. Puerto de Huelva
  {
    slug: 'puerto-huelva-que-ver-industrial',
    title: 'Puerto de Huelva: visita al corazón industrial de la ciudad',
    excerpt: 'El puerto es parte esencial de la identidad de Huelva. Una guía para entender qué es hoy, qué puedes ver y cómo acercarte.',
    category: 'Guías Locales',
    image: '/images/guides/huelva-puerto-grande.jpg',
    publishedAt: '2026-02-23T18:05:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>El Puerto de Huelva es el más importante de Andalucía occidental y uno de los principales de España en tráfico de mercancías. No es un puerto para cruceristas, es un puerto de trabajo: químicos, minerales, contenedores. Eso lo hace diferente y, en cierto modo, más interesante.</p>

      <h2>Qué es realmente el puerto hoy</h2>
      <p>Infraestructura industrial dividida en varios muelles. El más conocido es el Muelle de la Compañía (o Muelle del Tinto), de época inglesa. El resto es zona portuaria activa con restricciones de acceso.</p>

      <h2>Qué puedes visitar</h2>
      <ul>
        <li><strong>Muelle del Tinto:</strong> acceso público. Antiguo muelle de la Rio Tinto Company Limited. Vistas del río Odiel y de la actividad portuaria.</li>
        <li><strong>Centro de Interpretación:</strong> información sobre la historia del puerto (consultar horarios).</li>
        <li><strong>Paseo marítimo:</strong> desde el muelle se puede caminar hacia el entorno del río.</li>
      </ul>

      <h2>Cómo llegar</h2>
      <p>El muelle del Tinto está a unos 15-20 minutos a pie desde el centro. También hay autobús (líneas que van hacia el puerto) y aparcamiento en zona si vas en coche.</p>

      <h2>Lo que no encontrarás</h2>
      <p>No es un puerto turístico. No hay tiendas, ni restaurantes frente al agua, ni ferries para pasajeros con destinos interesantes. La actividad es industrial y el acceso a zonas operativas está restringido.</p>

      <blockquote>El puerto de Huelva es para entender, no para fotografiarse con un barco de crucero de fondo.</blockquote>
    `
  },

  // 7. Vistas de Huelva
  {
    slug: 'miradores-huelva-vistas-panoramicas',
    title: 'Dónde ver Huelva desde arriba: los mejores miradores',
    excerpt: 'Las mejores vistas de Huelva capital y provincia: dónde subir, qué ver y cómo llegar a los puntos panorámicos.',
    category: 'Guías Locales',
    image: '/images/guides/huelva-aerea.jpg',
    publishedAt: '2026-02-23T18:10:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>Huelva es una ciudad plana, pero hay lugares desde donde se obtienen vistas interesantes de la ciudad, el río y el entorno natural. No esperas miradores de montaña: aquí la panorámica combina urbano, industrial y natural.</p>

      <h2>En capital</h2>
      <ul>
        <li><strong>Muelle del Tinto:</strong> vistas del puerto, el río Odiel y la marisma. Al atardecer es especialmente interesante por la luz sobre el agua.</li>
        <li><strong>Barrio Alto (Reina Victoria):</strong> desde ciertas calles se ve el casco antiguo desde una ligera elevación.</li>
        <li><strong>Edificios públicos:</strong> algunos edificios administrativos tienen vistas desde plantas altas, aunque no suelen ser accesibles al público.</li>
      </ul>

      <h2>En provincia</h2>
      <ul>
        <li><strong>El Conquero:</strong> pequeña elevación natural desde donde se ve Huelva capital a lo lejos, con el Odiel en primer plano.</li>
        <li><strong>Marismas del Odiel:</strong> desde los observatorios se obtienen vistas panorámicas de la ría y el entorno natural.</li>
        <li><strong>Sierra de Aracena:</strong> varios puntos de la carretera ofrecen vistas de los pueblos desde altura.</li>
      </ul>

      <h2>Mejor momento</h2>
      <p>Al atardecer, cuando la luz baja y colorea el río y las estructuras del puerto. Evitar el mediodía en verano: luz plana y demasiado contraste.</p>

      <blockquote>La mejor vista de Huelva no es un mirador. Es el contraste entre el río, la marisma y la industria.</blockquote>
    `
  },

  // 8. Coquinas
  {
    slug: 'coquinas-huelva-como-comer',
    title: 'Coquinas de Huelva: cómo pedirlas bien y dónde',
    excerpt: 'Las coquinas son un clásico de la gastronomía onubense. Guía para reconocer las buenas, evitar las congeladas y disfrutarlas de verdad.',
    category: 'Gastronomía',
    image: '/images/guides/coquinas-huelva.jpg',
    publishedAt: '2026-02-23T18:15:00Z',
    author: 'Rocío Limón',
    isAi: true,
    content: `
      <p>Las coquinas (tellina) son un producto humilde de la ría de Huelva que, bien tratado, se convierte en tapa de primer nivel. Menos glamurosas que la gamba blanca, pero igual de identitarias y más accesibles.</p>

      <h2>Cómo reconocer coquinas frescas</h2>
      <ul>
        <li><strong>Tamaño:</strong> pequeñas, de 2-4 cm. Las grandes suelen ser de otras procedencias.</li>
        <li><strong>Color:</strong> concha grisácea con tonos amarillentos. Si están blanquecinas, pueden ser congeladas.</li>
        <li><strong>Olor:</strong> marino intenso. Sin rastro de amoniaco ni olores extraños.</li>
      </ul>

      <h2>Preparaciones típicas</h2>
      <p>Las coquinas se cocinan de dos formas principales:</p>
      <ul>
        <li><strong>A la marinera:</strong> con salsa de ajo, perejil y vino blanco. La más habitual en bares.</li>
        <li><strong>Al ajillo:</strong> solo con aceite, ajo y guindilla. Para probar el producto sin distracciones.</li>
      </ul>

      <h2>Dónde comerlas</h2>
      <p>Los bares de la zona del puerto y del centro histórico suelen tenerlas en temporada. Precio orientativo: 8-14€ la ración.</p>

      <h2>Temporada</h2>
      <p>Todo el año, aunque en verano sube el precio y baja la calidad por la presión turística.</p>

      <blockquote>Las coquinas no son almejas pequeñas. Son otro producto con sabor y textura propios.</blockquote>
    `
  },

  // 9. Café en Huelva
  {
    slug: 'cafe-huelva-tradicion-donde-tomar',
    title: 'Café en Huelva: dónde tomarlo bien y con historia',
    excerpt: 'El café es ritual en Huelva. Desde los bares tradicionales hasta las nuevas propuestas, guía para tomar café con criterio.',
    category: 'Gastronomía',
    image: '/images/guides/cafe-vaso-huelva.jpg',
    publishedAt: '2026-02-23T18:20:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>En Huelva, el café no es solo una bebida. Es excusa para sentarse, para empezar el día, para hacer tiempo, para encontrarse. La cultura del café aquí es de consumo diario, de barra y terraza, no de especialidad y catación.</p>

      <h2>Cómo se pide el café en Huelva</h2>
      <ul>
        <li><strong>Solo:</strong> espresso corto, intenso.</li>
        <li><strong>Cortado:</strong> solo con un poco de leche caliente.</li>
        <li><strong>Americano:</strong> solo con agua caliente añadida.</li>
        <li><strong>Sombra:</strong> mucha leche, poco café (variante local).</li>
      </ul>

      <h2>Dónde tomarlo</h2>
      <p>Los bares de toda la vida son la mejor opción para entender el ritual:</p>
      <ul>
        <li><strong>Centro histórico:</strong> bares con décadas de historia, clientela fija y café que no ha cambiado de proveedor en años.</li>
        <li><strong>Zona de la Gran Vía:</strong> más variado, con opciones de cafeterías modernas.</li>
        <li><strong>Mercado del Carmen:</strong> algunos puestos sirven café para el desayuno del mercado.</li>
      </ul>

      <h2>El desayuno completo</h2>
      <p>Café + tostada con aceite o manteca colorá, o café + churros si es fin de semana. Precio: 2-3,50€ dependiendo de la zona.</p>

      <blockquote>En Huelva no se va a tomar café. Se va al bar y se toma café mientras se está.</blockquote>
    `
  },

  // 10. Muelle del Tinto
  {
    slug: 'muelle-tinto-huelva-historia-visita',
    title: 'Muelle del Tinto: historia inglesa en el corazón del puerto',
    excerpt: 'El Muelle del Tinto es uno de los pocos vestigios visibles de la época inglesa en Huelva. Qué es, por qué importa y cómo visitarlo.',
    category: 'Guías Locales',
    image: '/images/guides/huelva-muelle-tinto.jpg',
    publishedAt: '2026-02-23T18:25:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>El Muelle de la Compañía, conocido popularmente como Muelle del Tinto, es una estructura portuaria construida a finales del siglo XIX por la Rio Tinto Company Limited para embarcar el mineral de cobre extraído en las minas de la Sierra de Huelva.</p>

      <h2>Qué es hoy</h2>
      <p>Estructura de hierro y madera (la original era de madera, la actual es reconstrucción) que se adentra en el río Odiel. Es accesible al público y uno de los pocos lugares desde donde se puede ver la actividad portuaria de cerca.</p>

      <h2>Por qué importa</h2>
      <ul>
        <li>Es símbolo de la influencia británica en la historia industrial de Huelva.</li>
        <li>Representa la época de esplendor minero que transformó la economía de la provincia.</li>
        <li>Es punto de referencia visual de la ciudad.</li>
      </ul>

      <h2>Cómo visitar</h2>
      <p>Acceso libre y gratuito. Se llega caminando desde el centro en 15-20 minutos o en coche (aparcamiento en zona). Recomendable al atardecer por la luz sobre el agua.</p>
      <ul>
        <li>Duración de la visita: 15-30 minutos.</li>
        <li>Ideal combinar con paseo por el entorno del puerto.</li>
        <li>No hay servicios en el propio muelle (baños, bares).</li>
      </ul>

      <h2>Contexto histórico breve</h2>
      <p>A partir de 1873, las minas de Riotinto pasaron a manos británicas. El mineral se transportaba por ferrocarril hasta Huelva y se embarcaba desde este muelle. La operación duró hasta mediados del siglo XX y transformó por completo la economía y la demografía de la zona.</p>

      <blockquote>El Muelle del Tinto no es atracción turística. Es memoria industrial hecha estructura.</blockquote>
    `
  }
];
