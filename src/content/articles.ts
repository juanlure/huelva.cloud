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
  },

  // ─── 4 ARTÍCULOS ADICIONALES ───────────────────────────────────

  // 11. Jamón Ibérico de Huelva (artículo dedicado)
  {
    slug: 'jamon-iberico-huelva-denominacion-origen',
    title: 'Jamón ibérico de Huelva: denominación de origen y cómo elegirlo',
    excerpt: 'La Sierra de Huelva produce jamón ibérico de bellota de primer nivel. Guía para entender la denominación, los códigos de color y dónde comprar.',
    category: 'Gastronomía',
    image: '/images/guides/corte-jamon-iberico.jpg',
    publishedAt: '2026-02-23T19:00:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>El jamón ibérico de la Denominación de Origen Protegida (DOP) Sierra de Huelva es uno de los productos más valorados de la gastronomía española. No todo el jamón que se vende como "de Huelva" tiene esta protección.</p>

      <h2>Qué es la DOP Sierra de Huelva</h2>
      <p>Área geográfica delimitada que incluye la Sierra y parte de la provincia. Solo los cerdos criados, alimentados y sacrificados en esta zona, con las características específicas de raza y alimentación, pueden llevar esta denominación.</p>

      <h2>Códigos de color (brida)</h2>
      <ul>
        <li><strong>Negro:</strong> 100% ibérico de bellota. El más alto de la gama.</li>
        <li><strong>Rojo:</strong> Ibérico de bellota (pero no 100% raza pura).</li>
        <li><strong>Verde:</strong> Ibérico de cebo de campo.</li>
        <li><strong>Blanco:</strong> Ibérico de cebo (alimentación con piensos).</li>
      </ul>

      <h2>Dónde comprar</h2>
      <p>En Huelva capital, las tiendas especializadas del centro ofrecen producto con certificación. En la Sierra (Aracena, Jabugo, Cortegana), las tiendas de productores suelen tener mejor relación calidad-precio.</p>

      <h2>Precios orientativos</h2>
      <ul>
        <li>Paleta (5-6 kg): 80-150€ según calidad.</li>
        <li>Jamón (7-8 kg): 150-350€ según calidad.</li>
        <li>Envasado al vacío: 15-25€/kg para bellota de primera.</li>
      </ul>

      <blockquote>Un jamón bueno no necesita presentación. Pero sí necesita cuchillo afilado y temperatura ambiente.</blockquote>
    `
  },

  // 12. Punta Umbría
  {
    slug: 'punta-umbria-playa-huelva-escapada',
    title: 'Punta Umbría: escapada de playa a 15 minutos de Huelva capital',
    excerpt: 'La playa más cercana a Huelva capital. Cómo llegar, qué esperar y por qué es el destino de verano de los onubenses.',
    category: 'Guías Locales',
    image: '/images/guides/huelva-aerea.jpg',
    publishedAt: '2026-02-23T19:05:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>Punta Umbría es la playa de Huelva por defecto. No es la más bonita de la provincia (esa distinción suele corresponder a las playas de la Costa de la Luz entre Matalascañas y Ayamonte), pero es la más práctica: 15 minutos en coche desde la capital.</p>

      <h2>Qué es Punta Umbría</h2>
      <p>Municipio costero en la desembocadura del río Odiel. Playas amplias de arena fina, urbanización concentrada en el pueblo y un ambiente de veraneo familiar sin grandes pretensiones turísticas.</p>

      <h2>Cómo llegar</h2>
      <ul>
        <li><strong>Coche:</strong> A-497 desde Huelva. 15-20 minutos.</li>
        <li><strong>Autobús:</strong> línea regular desde Huelva capital.</li>
        <li><strong>Taxi:</strong> unos 25-35€ desde el centro de Huelva.</li>
      </ul>

      <h2>Qué encontrar</h2>
      <p>La playa es amplia, con chiringuitos en verano y suficiente espacio para no sentirte agobiado. El pueblo tiene restaurantes, tiendas y todo lo necesario para una jornada de playa.</p>

      <h2>Mejor época</h2>
      <p>Julio y agosto están saturados. Junio y septiembre son ideales: buen tiempo, menos gente, precios más razonables.</p>

      <blockquote>Punta Umbría no es destino exótico. Es la playa de los que viven en Huelva y quieren mar sin complicaciones.</blockquote>
    `
  },

  // 13. Barrio Reina Victoria
  {
    slug: 'barrio-reina-victoria-huelva-modernista',
    title: 'Barrio Reina Victoria: el modernismo olvidado de Huelva',
    excerpt: 'Paseo por el barrio Reina Victoria: arquitectura industrial inglesa, casas obreras y el legado británico de la ciudad.',
    category: 'Guías Locales',
    image: '/images/guides/aracena-pueblo.jpg',
    publishedAt: '2026-02-23T19:10:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>El Barrio Reina Victoria es uno de los pocos conjuntos arquitectónicos de Huelva que sobreviven de la época industrial inglesa. No es una atracción turística organizada: es un barrio residencial con casas de principios del siglo XX que merecen ser vistas con atención.</p>

      <h2>Historia del barrio</h2>
      <p>Construido por la Rio Tinto Company Limited para albergar a los trabajadores ingleses y a los empleados españoles de cierta categoría. Las casas siguen patrones arquitectónicos británicos adaptados al clima andaluz.</p>

      <h2>Qué ver</h2>
      <ul>
        <li><strong>Casas de la calle Reina Victoria:</strong> fachadas con detalles modernistas y estructuras de madera.</li>
        <li><strong>Viviendas obreras:</strong> casas más sencillas del entorno, también de época.</li>
        <li><strong>Iglesia anglicana:</strong> pequeña iglesia que servía a la comunidad británica.</li>
      </ul>

      <h2>Cómo visitar</h2>
      <p>Acceso libre. Es un barrio residencial, así que se pide discreción. El paseo completo lleva unos 30-45 minutos. Ideal combinar con visita al centro histórico.</p>

      <blockquote>El Reina Victoria es memoria urbana. No hay carteles explicativos: hay que saber mirar.</blockquote>
    `
  },

  // 14. Desayuno en Huelva
  {
    slug: 'desayuno-huelva-donde-tostada-churros',
    title: 'Desayuno en Huelva: tostadas, churros y los mejores sitios',
    excerpt: 'El desayuno es institución en Huelva. Dónde ir, qué pedir y cuánto pagar por un buen desayuno onubense.',
    category: 'Gastronomía',
    image: '/images/guides/choco-frito-hero.jpg',
    publishedAt: '2026-02-23T19:15:00Z',
    author: 'Rocío Limón',
    isAi: true,
    content: `
      <p>En Huelva, el desayuno no se improvisa. Hay lugares que llevan décadas sirviendo el mismo café, las mismas tostadas y los mismos churros a la misma gente. El desayuno aquí es rutina social, no solo alimentación.</p>

      <h2>Tipos de desayuno onubense</h2>
      <ul>
        <li><strong>Tostada con aceite:</strong> pan de pueblo, aceite de oliva virgen extra, opcional tomate rallado.</li>
        <li><strong>Manteca colorá:</strong> manteca de cerdo con pimentón, extendida sobre pan tostado. Sabor intenso, no apto para todos los paladares.</li>
        <li><strong>Churros:</strong> sobretodo fines de semana. Con chocolate o solo.</li>
        <li><strong>Mollete:</strong> típico de los desayunos rápidos en bares.</li>
      </ul>

      <h2>Dónde desayunar</h2>
      <p>Los bares del centro abren temprano (7:00-8:00). Algunos de toda la vida mantienen la calidad y el ritual.</p>
      <ul>
        <li>Cerca del Mercado del Carmen: ambiente de mercado, producto fresco.</li>
        <li>Plaza de las Monjas: terrazas para desayunar con calma.</li>
        <li>Barrio del Torrejón: locales tradicionales sin pretensiones.</li>
      </ul>

      <h2>Precios</h2>
      <p>Desayuno completo (café + tostada): 2-3,50€. Churros para dos: 4-6€. Los fines de semana en zonas céntricas sube un poco.</p>

      <blockquote>El desayuno en Huelva no se inventa. Se hereda.</blockquote>
    `
  },

  // ─── ÚLTIMOS 6 ARTÍCULOS (TOTAL 20) ────────────────────────────

  // 15. Cómo llegar a Huelva
  {
    slug: 'como-llegar-huelva-transporte-coche-tren',
    title: 'Cómo llegar a Huelva: todas las opciones de transporte',
    excerpt: 'Guía completa para llegar a Huelva en coche, tren, autobús o avión. Tiempos, precios y recomendaciones prácticas.',
    category: 'Guías Locales',
    image: '/images/guides/huelva-aerea.jpg',
    publishedAt: '2026-02-23T19:20:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>Huelva no está en el centro de ninguna autopista principal, pero tampoco es inaccesible. La clave es entender que es una ciudad de paso entre Portugal, el Algarve y el resto de Andalucía.</p>

      <h2>En coche (la opción más común)</h2>
      <ul>
        <li><strong>Desde Sevilla:</strong> A-49, 45 minutos. Autopista de peaje.</li>
        <li><strong>Desde Madrid:</strong> A-4 hasta Sevilla, luego A-49. Unas 6 horas.</li>
        <li><strong>Desde el Algarve:</strong> A-22 hasta la frontera, luego A-49. 1 hora desde Faro.</li>
      </ul>

      <h2>En tren</h2>
      <p>La estación de tren de Huelva tiene conexiones con Sevilla (cercanías) y trenes de media distancia. No hay AVE directo: hay que cambiar en Sevilla.</p>
      <ul>
        <li>Sevilla-Huelva: 1h 15min aproximadamente.</li>
        <li>Madrid-Huelva: 3h 30min a Sevilla + 1h 15min a Huelva.</li>
      </ul>

      <h2>En autobús</h2>
      <p>La estación de autobuses tiene conexiones frecuentes con Sevilla, Cádiz, y ciudades de la provincia. Las compañías principales son Damas y other regional operators.</p>

      <h2>En avión</h2>
      <p>El aeropuerto más cercano es el de Sevilla (SVQ), a 1 hora en coche. También se puede usar Faro (FAO) en Portugal, a 1 hora y 15 minutos.</p>

      <blockquote>En Huelva, el coche es libertad. El transporte público existente, pero no da para todo.</blockquote>
    `
  },

  // 16. Historia de Huelva en 5 minutos
  {
    slug: 'historia-huelva-resumen-rapido',
    title: 'Historia de Huelva: de Tartessos al presente en 5 minutos',
    excerpt: 'Resumen cronológico de la historia de Huelva: tartessos, fenicios, romanos, británicos y la ciudad actual.',
    category: 'Guías Locales',
    image: '/images/guides/huelva-plaza-las-monjas.jpg',
    publishedAt: '2026-02-23T19:25:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>Huelva tiene una de las historias más antiguas de España. La clave es entender que siempre ha sido puerto: de minerales, de comercio, de culturas.</p>

      <h2>Tartessos y Fenicios (antes del 200 a.C.)</h2>
      <p>La zona de Huelva fue puerto tartésico y luego fenicio. El comercio de metales (cobre, plata, oro) desde las minas del interior hacia el Mediterráneo.</p>

      <h2>Romana (200 a.C. - 500 d.C.)</h2>
      <p>La ciudad romana de <em>Onuba</em> fue centro administrativo y comercial. Restos arqueológicos en el Museo de Huelva y en el propio subsuelo de la ciudad.</p>

      <h2>Edad Media (500-1500)</h2>
      <p>Período de menor relevancia. La ciudad estuvo bajo dominio musulmán hasta la Reconquista. Población dispersa, sin la importancia de otros núcleos andaluces.</p>

      <h2>Descubrimiento de América (1492)</h2>
      <p>La expedición de Colón partió de Palos de la Frontera (Huelva). La provincia tiene un papel simbólico en la historia de la navegación transatlántica.</p>

      <h2>Era industrial inglesa (1873-1954)</h2>
      <p>La compra de las minas de Riotinto por capital británico transformó Huelva. Llegó el ferrocarril, el puerto moderno, la arquitectura inglesa. La ciudad duplicó su población.</p>

      <h2>Huelva hoy</h2>
      <p>Ciudad de 145.000 habitantes, capital de provincia, con economía basada en el puerto, la química, la agricultura y un turismo emergente pero aún minoritario.</p>

      <blockquote>Huelva es memoria de puerto: tartesio, fenicio, romano, británico, y ahora español.</blockquote>
    `
  },

  // 17. Clima y mejor época para visitar
  {
    slug: 'clima-huelva-mejor-epoca-visitar',
    title: 'Clima de Huelva: cuándo visitar y qué ropa llevar',
    excerpt: 'Guía climática de Huelva: temperaturas, lluvias, viento y la mejor época del año para viajar a la capital onubense.',
    category: 'Guías Locales',
    image: '/images/guides/huelva-aerea.jpg',
    publishedAt: '2026-02-23T19:30:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>Huelva tiene clima mediterráneo atlántico: inviernos suaves, veranos calurosos, precipitaciones concentradas en otoño e invierno. El viento del oeste es constante.</p>

      <h2>Por estaciones</h2>
      <ul>
        <li><strong>Primavera (mar-may):</strong> 15-25ºC. Ideal para visitar. Naturaleza verde, flores, temperatura agradable.</li>
        <li><strong>Verano (jun-ago):</strong> 25-35ºC, picos de 40ºC. Calor intenso, playa obligatoria. Agobiante en ciudad.</li>
        <li><strong>Otoño (sep-nov):</strong> 15-25ºC. Lluvias esporádicas. Buena época, menos turística.</li>
        <li><strong>Invierno (dic-feb):</strong> 8-16ºC. Lluvias frecuentes. Nunca baja de cero, pero el frío húmedo se nota.</li>
      </ul>

      <h2>La famana (viento de Levante)</h2>
      <p>El viento del este, seco y caluroso, es característico del verano. Puede elevar la sensación térmica varios grados.</p>

      <h2>Mejor época para visitar</h2>
      <p>Abril-mayo y septiembre-octubre. Clima ideal para pasear, comer en terrazas y visitar la provincia sin agobios.</p>

      <h2>Qué llevar</h2>
      <ul>
        <li>Verano: ropa ligera, crema solar, gafas, sombrero.</li>
        <li>Invierno: jersey, chaqueta impermeable, paraguas.</li>
        <li>Todo el año: calzado cómodo para caminar por ciudad.</li>
      </ul>

      <blockquote>En Huelva, el clima es benevolente: nunca hace frío extremo, pero el verano puede ser implacable.</blockquote>
    `
  },

  // 18. Ruta de tapas por el centro
  {
    slug: 'ruta-tapas-centro-huelva-donde-ir',
    title: 'Ruta de tapas por el centro de Huelva: dónde ir y qué pedir',
    excerpt: 'Recorrido gastronómico por los mejores bares de tapas del centro de Huelva. Precios, especialidades y cómo organizar la ruta.',
    category: 'Gastronomía',
    image: '/images/guides/choco-frito-tapa.jpg',
    publishedAt: '2026-02-23T19:35:00Z',
    author: 'Rocío Limón',
    isAi: true,
    content: `
      <p>La ruta de tapas es el plan por excelencia en Huelva. No hay que complicarse: se empieza en un sitio, se bebe, se come, se paga, y se va al siguiente. La gracia está en la variedad, no en quedarse horas en el mismo bar.</p>

      <h2>Zonas para tapear</h2>
      <ul>
        <li><strong>Calle Concepción:</strong> bares tradicionales de toda la vida. Ambiente local, tapas clásicas.</li>
        <li><strong>Plaza de las Monjas:</strong> terrazas, más turístico, bueno para sentarse.</li>
        <li><strong>Barrio del Torrejón:</strong> tapas de calidad, ambiente más alternativo.</li>
      </ul>

      <h2>Tapas imprescindibles en la ruta</h2>
      <ul>
        <li>Choco frito: en cualquier freiduría de confianza.</li>
        <li>Coquinas a la marinera: tamaño pequeño, sabor intenso.</li>
        <li>Gamba blanca: solo en temporada (otoño-invierno).</li>
        <li>Papas aliñás: ensalada de patata, bacalao y naranja. Plato de contraste.</li>
        <li>Carrillada ibérica: si se quiere alternar el pescado con carne.</li>
      </ul>

      <h2>Cómo organizar la ruta</h2>
      <p>Una tapa y una bebida por bar. No más. El objetivo es probar 4-5 sitios, no llenarse en el primero. Distancia entre bares: máximo 5 minutos caminando.</p>

      <h2>Presupuesto</h2>
      <p>Tapa + caña: 2,50-4€ dependiendo de la zona. Con 15-20€ por persona se hace una ruta completa y variada.</p>

      <blockquote>La ruta de tapas no es comida. Es deporte de resistencia gastronómica.</blockquote>
    `
  },

  // 19. Dónde aparcar en Huelva
  {
    slug: 'donde-aparcar-huelva-capital-parkings',
    title: 'Dónde aparcar en Huelva capital: parkings y zonas libres',
    excerpt: 'Guía práctica para aparcar en Huelva: parkings públicos, zonas azules, horarios y precios actualizados.',
    category: 'Guías Locales',
    image: '/images/guides/huelva-plaza-las-monjas.jpg',
    publishedAt: '2026-02-23T19:40:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>Aparcar en el centro de Huelva es complicado pero no imposible. La clave es saber dónde buscar y estar dispuesto a caminar 5-10 minutos.</p>

      <h2>Parkings públicos</h2>
      <ul>
        <li><strong>Parking Plaza de las Monjas:</strong> subterráneo, en pleno centro. Precio: aprox. 2€/hora.</li>
        <li><strong>Parking Gran Vía:</strong> más grande, un poco más alejado del casco antiguo. Tarifa similar.</li>
        <li><strong>Parking Avenida de Italia:</strong> a las afueras del centro, más barato, 10-15 minutos caminando.</li>
      </ul>

      <h2>Zona azul (ORA)</h2>
      <p>Las calles del centro tienen zona azul regulada. Horario general: de 9:00 a 14:00 y de 17:00 a 20:30. Sábados por la mañana también. Precio: 0,50-1€/hora según zona.</p>
      <ul>
        <li>Límite de tiempo: generalmente 2 horas.</li>
        <li>Domingos y festivos: gratis en la mayoría de zonas.</li>
      </ul>

      <h2>Zonas de aparcamiento libre</h2>
      <p>Alrededor del centro, en zonas residenciales, se puede aparcar gratis. Requiere llegar con tiempo y caminar. Barrios como El Torrejón o zonas de la Gran Vía suelen tener plazas libres con paciencia.</p>

      <h2>Consejos prácticos</h2>
      <ul>
        <li>Evitar las 13:00-14:00: cambio de turno, mucho tráfico.</li>
        <li>Fines de semana: más fácil aparcar en zona azul, más difícil en parkings (llenos).</li>
        <li>Noches: zona azul suele ser gratis después de 20:30.</li>
      </ul>

      <blockquote>En Huelva, aparcar es arte de paciencia. Quien espera, encuentra.</blockquote>
    `
  },

  // 20. Pescado fresco en Huelva
  {
    slug: 'pescado-fresco-huelva-lonja-comprar',
    title: 'Pescado fresco en Huelva: cómo comprar como un local',
    excerpt: 'Guía para comprar pescado fresco en Huelva: la lonja, el mercado, cómo elegir y cuándo ir para el mejor producto.',
    category: 'Gastronomía',
    image: '/images/guides/coquinas-huelva.jpg',
    publishedAt: '2026-02-23T19:45:00Z',
    author: 'Rocío Limón',
    isAi: true,
    content: `
      <p>El pescado fresco es uno de los grandes tesoros de Huelva. La lonja de Isla Cristina (a 40 km) y los puestos del Mercado del Carmen ofrecen producto de la ría y del cercano litoral atlántico.</p>

      <h2>Qué pescado encontrar</h2>
      <ul>
        <li><strong>Gamba blanca:</strong> producto estrella, temporada otoño-invierno.</li>
        <li><strong>Coquinas:</strong> todo el año, precio variable.</li>
        <li><strong>Choco:</strong> fresco o congelado, verificar procedencia.</li>
        <li><strong>Pescado de roca:</strong> lubina, dorada, pargo según temporada.</li>
      </ul>

      <h2>Dónde comprar</h2>
      <p><strong>Mercado del Carmen (Huelva capital):</strong> pescaderías tradicionales con producto diario. Horario: 8:00-14:00, sábados hasta 14:00. Cerrado domingos y festivos.</p>
      <p><strong>Lonja de Isla Cristina:</strong> para comprar al por mayor o para los muy exigentes. Requiere madrugar (subastas muy temprano).</p>

      <h2>Cómo elegir buen pescado</h2>
      <ul>
        <li>Ojos brillantes, hundidos y opacos son señal de poco fresco.</li>
        <li>Branquias rojas brillantes, no marrones ni grises.</li>
        <li>Olor a mar limpio, no a amoniaco ni ácido.</li>
        <li>Textura firme al tacto.</li>
      </ul>

      <h2>Mejor hora para ir</h2>
      <p>A primera hora (8:00-9:00) para elegir. A última hora (13:00-14:00) a veces hay ofertas para liquidar stock.</p>

      <blockquote>El pescado bueno no necesita salsa. El malo, tampoco la salva.</blockquote>
    `
  },

  // ─── 10 ARTÍCULOS NUEVOS CON IMÁGENES ADICIONALES ──────────────

  // 21. Monasterio de La Rábida
  {
    slug: 'monasterio-rabida-huelva-colon',
    title: 'Monasterio de La Rábida: donde Colón preparó el viaje',
    excerpt: 'Visita al Monasterio de La Rábida, donde Colón encontró apoyo para su expedición. Historia, qué ver y cómo llegar.',
    category: 'Guías Locales',
    image: '/images/guides/monasterio-rabida.jpg',
    publishedAt: '2026-02-23T20:00:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>El Monasterio de La Rábida es uno de los lugares más simbólicos de Huelva. Aquí, Cristóbal Colón encontró el apoyo de los frailes franciscanos y de los hermanos Pinzón para su expedición hacia las Indias.</p>

      <h2>Historia del lugar</h2>
      <p>Monasterio franciscano del siglo XV situado en la confluencia de los ríos Tinto y Odiel. Colón residió aquí antes de partir en 1492, refinando sus planes y buscando patrocinadores.</p>

      <h2>Qué ver en la visita</h2>
      <ul>
        <li><strong>Claustro mudéjar:</strong> joya arquitectónica del siglo XV.</li>
        <li><strong>Sala capitular:</strong> donde Colón expuso sus teorías.</li>
        <li><strong>Jardines:</strong> vistas sobre la ría y los ríos.</li>
        <li><strong>Museo colombino:</strong> reproducciones de cartas y documentos.</li>
      </ul>

      <h2>Cómo llegar</h2>
      <p>A 2 km de Palos de la Frontera, a unos 15 minutos en coche desde Huelva capital. Acceso bien señalizado desde la carretera nacional.</p>

      <h2>Horarios y precios</h2>
      <ul>
        <li>Horario: generalmente 10:00-13:00 y 16:00-18:45.</li>
        <li>Entrada: gratuita (donativo voluntario).</li>
        <li>Visitas guiadas: disponibles en horario de mañana.</li>
      </ul>

      <blockquote>La Rábida es donde la historia de América empezó a hacerse realidad.</blockquote>
    `
  },

  // 22. Monumento a Colón
  {
    slug: 'monumento-colon-huelva-escultura',
    title: 'Monumento a Colón: la escultura más grande de España',
    excerpt: 'Todo sobre el Monumento a la Fe Descubridora, conocido como Monumento a Colón, en Huelva capital.',
    category: 'Guías Locales',
    image: '/images/guides/cristobal-colon-huelva.jpg',
    publishedAt: '2026-02-23T20:05:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>El Monumento a la Fe Descubridora, popularmente conocido como el Monumento a Colón, es una escultura monumental de 37 metros de altura situada en la confluencia de los ríos Tinto y Odiel, en el entorno del puerto de Huelva.</p>

      <h2>Datos del monumento</h2>
      <ul>
        <li><strong>Altura:</strong> 37 metros.</li>
        <li><strong>Material:</strong> hormigón revestido de piedra caliza.</li>
        <li><strong>Autor:</strong> escultora Gertrudiz Gómez de Avellaneda (homenaje a la escritora).</li>
        <li><strong>Inauguración:</strong> 1929.</li>
      </ul>

      <h2>Qué representa</h2>
      <p>La escultura muestra a Colón con los brazos extendidos mirando hacia el Atlántico, simbolizando la fe en el descubrimiento. Es un símbolo identitario de Huelva y referencia visual desde cualquier punto alto de la ciudad.</p>

      <h2>Cómo visitar</h2>
      <p>Acceso libre y gratuito. Se encuentra en una rotonda junto al puerto. Se puede ver desde la carretera o acercarse a pie desde el entorno del muelle del Tinto.</p>

      <blockquote>El Colón de Huelva no es el explorador. Es la fe en lo imposible hecha piedra.</blockquote>
    `
  },

  // 23. Doñana
  {
    slug: 'donana-parque-nacional-huelva-visitar',
    title: 'Doñana: el parque nacional en la puerta de Huelva',
    excerpt: 'Guía para visitar Doñana desde Huelva: cómo llegar, qué ver, rutas y consejos prácticos.',
    category: 'Guías Locales',
    image: '/images/guides/donana-huelva.jpg',
    publishedAt: '2026-02-23T20:10:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>El Parque Nacional de Doñana es uno de los espacios naturales más importantes de Europa. Aunque su entrada principal está en Sevilla, desde Huelva se accede a la zona de influencia del parque: las marismas, el entorno del río, y la costa atlántica.</p>

      <h2>Qué es Doñanav/p>
      <p>Sistema de marismas, dunas y bosques mediterráneos que alberga una biodiversidad única. Aves migratorias, lince ibérico, águila imperial, y una red hídrica compleja.</p>

      <h2>Cómo visitar desde Huelva</h2>
      <ul>
        <li><strong>Marismas del Odiel:</strong> parque natural de acceso libre, parte del entorno de Doñana.</li>
        <li><strong>Visitas guiadas:</strong> empresas locales organizan excursiones al corazón del parque.</li>
        <li><strong>Playa de la Bota:</strong> límite del parque, acceso directo desde Huelva.</li>
      </ul>

      <h2>Qué llevar</h2>
      <ul>
        <li>Calzado cómodo para caminar.</li>
        <li>Ropa según estación (invierno: abrigo, verano: protección solar).</li>
        <li>Prismáticos si te interesa la observación de aves.</li>
        <li>Agua y algo de comida (no hay servicios en la mayoría de rutas).</li>
      </ul>

      <blockquote>Doñana no es un parque. Es un sistema vivo donde la naturaleza sigue sin pedir permiso.</blockquote>
    `
  },

  // 24. Feria de Huelva
  {
    slug: 'feria-huelva-colombinas-agosto',
    title: 'Feria de Huelva: Las Colombinas en agosto',
    excerpt: 'Todo sobre la Feria de las Colombinas de Huelva: fechas, casetas, conciertos y cómo disfrutarla.',
    category: 'Eventos',
    image: '/images/guides/feria-huelva.jpg',
    publishedAt: '2026-02-23T20:15:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>La Feria de las Colombinas es la gran fiesta de Huelva. Se celebra en agosto, en conmemoración del regreso de Colón de su primer viaje. Una semana de casetas, conciertos, toros y ambiente.</p>

      <h2>Fechas y ubicación</h2>
      <p>Normalmente entre finales de julio y principios de agosto. El recinto ferial está en el centro, junto a la zona portuaria, con entrada libre a las calles principales.</p>

      <h2>Qué es la feria</h2>
      <ul>
        <li><strong>Casetas:</strong> algunas públicas (entrada libre), otras privadas (pases o invitación).</li>
        <li><strong>Conciertos:</strong> escenario principal con artistas nacionales e internacionales.</li>
        <li><strong>Toros:</strong> corridas en la plaza de toros.</li>
        <li><strong>Fuegos artificiales:</strong> noche inaugural y final.</li>
      </ul>

      <h2>Cómo disfrutarla</h2>
      <p>Vestirse de flamenco es opcional pero frecuente. Las casetas públicas son la mejor opción para turistas: rebujito, tapas y ambiente sin necesidad de conocer a nadie.</p>

      <h2>Horarios</h2>
      <p>Las casetas abren a mediodía (13:00-14:00), cierran por la tarde (17:00-20:00), y vuelven a abrir hasta la madrugada. El ambiente nocturno es el más intenso.</p>

      <blockquote>Las Colombinas son feria y celebración. Pero también son calor, mucho calor.</blockquote>
    `
  },

  // 25. Museo de Huelva
  {
    slug: 'museo-huelva-visitar-que-ver',
    title: 'Museo de Huelva: arqueología y arte provincial',
    excerpt: 'Guía para visitar el Museo de Huelva: colecciones permanentes, horarios y por qué merece la pena.',
    category: 'Guías Locales',
    image: '/images/guides/museo-huelva.jpg',
    publishedAt: '2026-02-23T20:20:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>El Museo de Huelva es el principal centro de conservación y exposición del patrimonio arqueológico y artístico de la provincia. Ubicado en un edificio moderno en el centro de la capital.</p>

      <h2>Qué ver</h2>
      <ul>
        <li><strong>Arqueología:</strong> restos tartésicos, fenicios y romanos de la provincia.</li>
        <li><strong>Arte ibero:</strong> piezas destacadas de la cultura ibérica local.</li>
        <li><strong>Arte colonial:</strong> conexiones con la América descubierta desde Huelva.</li>
        <li><strong>Exposiciones temporales:</strong> programación cultural variada.</li>
      </ul>

      <h2>Horarios y precios</h2>
      <ul>
        <li>Martes a sábado: 9:00-20:00.</li>
        <li>Domingos y festivos: 9:00-15:00.</li>
        <li>Lunes: cerrado.</li>
        <li>Entrada gratuita (donativo voluntario).</li>
      </ul>

      <h2>Cómo llegar</h2>
      <p>En pleno centro, a 5 minutos a pie de la Plaza de las Monjas. Accesible a pie desde cualquier punto del centro histórico.</p>

      <blockquote>El Museo de Huelva es memoria de la provincia desde antes de que existiera España.</blockquote>
    `
  },

  // 26. El Portil
  {
    slug: 'el-portil-playa-huelva-visitar',
    title: 'El Portil: playa y entorno natural junto a Huelva',
    excerpt: 'Guía de El Portil: playas, entorno natural y cómo pasar un día en este núcleo costero cercano a Huelva.',
    category: 'Guías Locales',
    image: '/images/guides/el-portil.jpg',
    publishedAt: '2026-02-23T20:25:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>El Portil es un núcleo urbano costero situado entre Huelva capital y Punta Umbría. Menos masificado que otras zonas, ofrece playa, entorno natural de marismas y un ambiente tranquilo.</p>

      <h2>Qué es El Portil</h2>
      <p>Urbanización costera desarrollada en los años 70, situada en el entorno de las marismas del río Piedras. Playa amplia, arena fina, y un entorno natural preservado en buena parte.</p>

      <h2>Qué hacer</h2>
      <ul>
        <li><strong>Playa:</strong> menos concurrida que Punta Umbría, espacio para estirarse.</li>
        <li><strong>Senderismo:</strong> rutas por las marismas del entorno.</li>
        <li><strong>Observación de aves:</strong> zona de paso de aves migratorias.</li>
        <li><strong>Chiringuitos:</strong> en temporada, bares de playa con ambiente familiar.</li>
      </ul>

      <h2>Cómo llegar</h2>
      <p>En coche desde Huelva: 15 minutos por la A-497. También hay autobús de línea regular.</p>

      <h2>Mejor época</h2>
      <p>Junio y septiembre son ideales: buen tiempo sin masificación. Julio y agosto están más llenos pero sigue siendo tranquilo comparado con otras zonas.</p>

      <blockquote>El Portil es la opción cuando quieres playa sin que te la quiten.</blockquote>
    `
  },

  // 27. Ayamonte
  {
    slug: 'ayamonte-huelva-frontera-portugal',
    title: 'Ayamonte: la frontera con Portugal',
    excerpt: 'Guía de Ayamonte: qué ver en este pueblo fronterizo, playa, gastronomía y cómo cruzar a Portugal.',
    category: 'Guías Locales',
    image: '/images/guides/ayamonte-huelva.jpg',
    publishedAt: '2026-02-23T20:30:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>Ayamonte es el último pueblo de España antes de Portugal. Situado en la desembocadura del río Guadiana, es una localidad de pescadores convertida en destino turístico con carácter propio.</p>

      <h2>Qué ver en Ayamonte</h2>
      <ul>
        <li><strong>Casco antiguo:</strong> calles empedradas, casas de pescadores, ambiente portugués.</li>
        <li><strong>Puente internacional:</strong> cruza el Guadiana hacia Portugal (Vila Real de Santo António).</li>
        <li><strong>Playa de Isla Canela:</strong> playa amplia, a unos 5 km del centro.</li>
        <li><strong>Iglesia de Nuestra Señora de las Angustias:</strong> barroco del siglo XVIII.</li>
      </ul>

      <h2>Cruzar a Portugal</h2>
      <p>El puente une Ayamonte con Vila Real de Santo António (Algarve). Sin frontera real desde el acuerdo de Schengen, pero sí cambio de hora (Portugal tiene una hora menos).</p>

      <h2>Gastronomía</h2>
      <p>Pescado fresco, mariscos de la ría, y la influencia portuguesa en platos como la cataplana o el arroz de marisco.</p>

      <h2>Cómo llegar</h2>
      <p>Desde Huelva: 50 minutos en coche por la A-49. Desde Faro (Portugal): 45 minutos.</p>

      <blockquote>Ayamonte es España con aroma portugués. O Portugal con acento andaluz.</blockquote>
    `
  },

  // 28. El Rocío
  {
    slug: 'el-rocio-huelva-romeria-aldea',
    title: 'El Rocío: la aldea más famosa de Huelva',
    excerpt: 'Todo sobre El Rocío: la aldea de Almonte, la romería, y qué ver en este lugar único de Huelva.',
    category: 'Guías Locales',
    image: '/images/guides/el-rocio.jpg',
    publishedAt: '2026-02-23T20:35:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>El Rocío no es un pueblo normal. Es una aldea de Almonte donde cada casa es una <em>hermandad</em>, donde las calles son de arena, y donde la Virgen del Rocío es la protagonista absoluta de la vida local.</p>

      <h2>Qué es El Rocío</h2>
      <p>Aldea de unos 1.500 habitantes situada junto a las marismas de Doñana. Patrimonio de la Humanidad como parte del entorno de Doñana. Las casas son ermitas-hermandades de diferentes devociones.</p>

      <h2>La Romería del Rocío</h2>
      <p>El fin de semana de Pentecostés (mayo-junio), más de un millón de personas peregrinan a El Rocío. Es una de las manifestaciones religiosas más importantes de España.</p>
      <ul>
        <li>Las hermandades llegan en carretas, a caballo y a pie.</li>
        <li>El ambiente es festivo y religioso a la vez.</li>
        <li>Reservar alojamiento con meses de antelación es obligatorio.</li>
      </ul>

      <h2>Qué ver fuera de la romería</h2>
      <p>El resto del año, El Rocío es tranquilo. Se puede visitar la ermita de la Virgen, pasear por las calles de arena, y observar las marismas.</p>

      <h2>Cómo llegar</h2>
      <p>Desde Almonte: 15 minutos en coche. Desde Huelva: 45 minutos. Acceso por carretera secundaria.</p>

      <blockquote>El Rocío es fe en forma de aldea. Sin la Virgen, sería un puñado de casas en la marisma.</blockquote>
    `
  },

  // 29. Iglesia de la Concepción
  {
    slug: 'iglesia-concepcion-huelva-centro',
    title: 'Iglesia de la Concepción: la catedral de Huelva',
    excerpt: 'Historia y visita de la Iglesia de Nuestra Señora de la Concepción, el principal templo de Huelva capital.',
    category: 'Guías Locales',
    image: '/images/guides/iglesia-concepcion-huelva.jpg',
    publishedAt: '2026-02-23T20:40:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>La Iglesia de Nuestra Señora de la Concepción es el templo más importante de Huelva capital. Conocida popularmente como la Catedral (aunque Huelva no tiene catedral, depende de la diócesis de Cádiz).</p>

      <h2>Historia</h2>
      <p>Edificio del siglo XVI reconstruido en el siglo XVIII tras el terremoto de Lisboa. Estilo barroco con elementos neoclásicos. Ha sido el centro religioso de la ciudad durante siglos.</p>

      <h2>Qué ver</h2>
      <ul>
        <li><strong>Fachada:</strong> sobria, de piedra, con torre de campanas.</li>
        <li><strong>Interior:</strong> nave única, capillas laterales, retablos barrocos.</li>
        <li><strong>Capilla sacramental:</strong> imagen de la Virgen de la Concepción.</li>
        <li><strong>Órgano:</strong> instrumento histórico utilizado en celebraciones.</li>
      </ul>

      <h2>Horarios de visita</h2>
      <p>Abierta para el culto diario. Horario de misas: consultar la parroquia. Visitas turísticas no organizadas, pero se puede entrar durante las horas de apertura.</p>

      <h2>Ubicación</h2>
      <p>En pleno centro histórico, a 2 minutos de la Plaza de las Monjas. Referencia ineludible del casco antiguo.</p>

      <blockquote>La Concepción es fe de barrio en forma de templo. No es grande, pero es de todos.</blockquote>
    `
  },

  // 30. Mercado del Carmen
  {
    slug: 'mercado-carmen-huelva-comprar-fresco',
    title: 'Mercado del Carmen: comprar fresco en el centro de Huelva',
    excerpt: 'Guía del Mercado del Carmen de Huelva: qué encontrar, cómo comprar y por qué sigue siendo el corazón gastronómico de la ciudad.',
    category: 'Gastronomía',
    image: '/images/guides/huelva-plaza-las-monjas.jpg',
    publishedAt: '2026-02-23T20:45:00Z',
    author: 'Rocío Limón',
    isAi: true,
    content: `
      <p>El Mercado del Carmen es el mercado de abastos principal de Huelva capital. Edificio modernista reformado que alberga pescaderías, carnicerías, fruterías y puestos de productos locales.</p>

      <h2>Qué encontrar</h2>
      <ul>
        <li><strong>Pescaderías:</strong> producto de la ría y del litoral, especialmente coquinas, choco y pescado de roca.</li>
        <li><strong>Carnicerías:</strong> carne de ternera, cerdo ibérico de la Sierra, pollo de corral.</li>
        <li><strong>Frutas y verduras:</strong> producto local de la provincia (fresas, naranjas, verduras de temporada).</li>
        <li><strong>Ultramarinos:</strong> especias, legumbres, productos típicos.</li>
      </ul>

      <h2>Horarios</h2>
      <ul>
        <li>Lunes a sábado: 8:00-14:00.</li>
        <li>Algunos puestos abren por la tarde (17:00-20:00), pero con menor oferta.</li>
        <li>Domingos: cerrado.</li>
      </ul>

      <h2>Cómo comprar</h2>
      <p>La gente mayor compra en sus puestos de toda la vida. Los puestos fijos tienen número: pregunta por "el pescadero del 15" o "la frutera del 8". Relación de confianza entre vendedor y cliente.</p>

      <h2>Cafeterías del mercado</h2>
      <p>Hay bares dentro y alrededor del mercado donde desayunar después de comprar. Café, tostadas, y ambiente de mercado desde primera hora.</p>

      <blockquote>El Mercado del Carmen es desayuno, compra y charla. Es Huelva antes de las 14:00.</blockquote>
    `
  }
];
