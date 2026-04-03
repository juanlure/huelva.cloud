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
    publishedAt: '2026-03-08T22:00:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>La agenda onubense tiene ritmo propio: hay semanas cargadas y semanas para respirar. Esta es una guía práctica para saber dónde buscar planes en Huelva capital y provincia, con criterio y sin rodeos.</p>

      <h2>Planes habituales en capital</h2>
      <ul>
        <li><strong>Mercado ecológico Plaza de las Monjas</strong> — Sábados por la mañana, 9:00-14:00. Productores locales de Huelva y provincia. Entrada libre. Confirma fechas en el Ayuntamiento.</li>
        <li><strong>Ciclo 'Noches de Jazz' - Teatro Casa Colón</strong> — Programación periódica con grupos locales y nacionales. Consulta cartelera en casacolon.es. Entradas desde 8€.</li>
        <li><strong>Exposiciones en el Museo de Huelva</strong> — Programación cultural rotatoria. Entrada gratuita domingos. Merece la visita aunque no haya exposición temporal.</li>
        <li><strong>Ruta guiada 'Huelva Industrial'</strong> — Recorrido por el Muelle del Tinto y el patrimonio portuario. Fechas variables; reserva en turismo@huelva.es o en la Oficina de Turismo.</li>
      </ul>

      <h2>Planes en provincia</h2>
      <ul>
        <li><strong>Islantilla y La Antilla</strong> — Mercados artesanos en paseo marítimo los fines de semana en temporada. Artesanía, productos locales y gastronomía.</li>
        <li><strong>Ruta ornitológica Marismas del Odiel</strong> — Todo el año, especialmente en migración otoño-primavera. Gratuito con inscripción previa. Llevar prismáticos.</li>
        <li><strong>Visita teatralizada Aracena</strong> — Disponible fines de semana y festivos. Recorrido por el casco histórico con personajes en vivo. Consulta horarios en turismodeAracena.es. Precio: 10€.</li>
        <li><strong>Gruta de las Maravillas</strong> — Abierta todo el año. Acceso con visita guiada; entradas limitadas, reservar con antelación.</li>
      </ul>

      <h2>Dónde consultar la agenda actualizada</h2>
      <ul>
        <li><strong>Ayuntamiento de Huelva:</strong> huelva.es/agenda</li>
        <li><strong>Diputación Provincial:</strong> diphuelva.es</li>
        <li><strong>Turismo Andaluz:</strong> andalucia.org/huelva</li>
        <li><strong>Redes sociales locales:</strong> busca "Huelva Cultural" o "Agenda Huelva" en Instagram para eventos de última hora.</li>
      </ul>

      <h2>Cómo organizarte el fin de semana</h2>
      <p>Si quieres combinar capital y provincia, el esquema más eficiente es: mercado o cultura en capital el sábado por la mañana, sierra o costa el domingo. Ahorra desplazamientos y aprovechas mejor el tiempo. Si quieres bajarlo a tierra, enlázalo con <a href="/fin-de-semana">la guía de fin de semana</a>, <a href="/que-ver">qué ver en Huelva</a> y <a href="/playas">las mejores playas</a> según el tipo de plan.</p>

      <p>Y si el evento es solo la excusa para salir, completa luego con <a href="/donde-comer">dónde comer</a> o con <a href="/fin-de-semana">algún plan de fin de semana</a> que te redondee el día.</p>

      <blockquote>Consejo: llama antes de ir a cualquier evento. Los cambios de horario de última hora son más habituales de lo que parece en Huelva.</blockquote>
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
      <p>Vamos a ver, que nos conocemos. Si vienes a Huelva y pides sepia, el camarero te va a mirar con una mezcla de lástima y resignación. En Huelva se come <strong>choco</strong>, y punto pelota. Es nuestra seña de identidad, hasta el punto de que nos llaman choqueros a los de la capital con todo el orgullo del mundo.</p>

      <h2>El choco no es sepia (métetelo en la cabeza)</h2>
      <p>La diferencia está en la textura. El choco de la ría tiene un "mordisco" que no encuentras en el Mediterráneo. Si está gomoso o parece un chicle, huye: es congelado o lo han maltratado en la cocina.</p>
      <ul>
        <li><strong>El rebozado:</strong> Harina fina de calidad. Nada de panko, ni tempuras raras, ni inventos modernos. Tiene que crujir, no ser una bota.</li>
        <li><strong>El aceite:</strong> De oliva virgen, limpio y que eche humo. Si el aceite está cansado, el choco sale triste.</li>
        <li><strong>El corte:</strong> En tiras o dados. Si te lo sirven en aros perfectos, sospecha; puede que te estén dando gato por liebre (o pota por choco).</li>
      </ul>

      <h2>¿Dónde ir sin que te engañen?</h2>
      <p>Si quieres el choco de verdad, vete a los bares de toda la vida en el centro o date una vuelta por las freidurías del barrio de El Torrejón. Huye de los sitios con fotos de platos en la puerta; eso es para guiris que no saben lo que es la humedad de la ría.</p>

      <p>Si quieres montar una ruta de barra con un poco más de criterio, sigue por <a href="/donde-comer">dónde comer en Huelva</a> y por <a href="/article/donde-tapear-en-huelva">la guía para tapear sin caer en la trampa</a>.</p>

      <blockquote>Si pides limón, hazlo con discreción. El choco bueno sabe a mar, no a cítrico de bote.</blockquote>
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
      <p>En Huelva no nos sobran los hoteles, pero los que hay cumplen si sabes elegir. Si buscas un resort de cinco estrellas con buffet de fotos de Instagram, tira para la costa. En la capital venimos a vivir la calle, así que el alojamiento es para dormir y poco más.</p>

      <h2>Zonas: O en el centro, o estás lejos</h2>
      <p>Huelva se camina en 15 minutos de punta a punta. Si te quedas en el centro (Plaza de las Monjas, Gran Vía), tienes la vida a un paso. Si te quedas a las afueras, vas a depender del coche y aparcar en el centro es un deporte de riesgo.</p>
      <ul>
        <li><strong>Centro Histórico:</strong> Donde pasa todo. Ruido los fines de semana (porque aquí nos gusta la juerga), pero lo tienes todo a mano.</li>
        <li><strong>Zona Puerto:</strong> Más moderna, pero un poco más fría. Útil si vienes de negocios y no quieres líos.</li>
      </ul>

      <h2>Verdades sobre el precio</h2>
      <p>Un hostal limpio en el centro te va a dar más alegrías que un hotel de cadena a 3 kilómetros. No pagues por el desayuno del hotel; sal a la calle, pide una tostada de pringá y un café, y ahórrate 15 pavos que luego te gastas en gambas. Y para decidir bien dónde te conviene dormir según el plan, combínalo con <a href="/que-ver">qué ver en Huelva</a>, <a href="/fin-de-semana">la guía de fin de semana</a> y <a href="/donde-comer">dónde comer</a>.</p>

      <p>La elección buena no es “hotel bonito”, es hotel útil para el plan. Decide con <a href="/alojarse">la guía de alojamiento</a> y luego ordénalo con <a href="/que-ver">qué ver</a>.</p>

      <blockquote>Consejo de local: El parking es clave. Si el hotel no tiene, asegúrate de que haya uno público cerca o prepárate para dar vueltas como un jartible.</blockquote>
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

      <p>Si estás montando una escapada completa, enlaza con <a href="/fin-de-semana">planes para un fin de semana en Huelva</a> y con <a href="/que-ver">qué ver en la provincia</a> para no dejar Aracena aislada del resto del viaje.</p>

      <p>Para no dejarla aislada como pieza suelta, mézclala con <a href="/fin-de-semana">una escapada de fin de semana</a> o con <a href="/que-ver">otros sitios potentes de la provincia</a>.</p>

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
      <p>No nos engañemos: la Plaza de las Monjas no es la Plaza Mayor de Salamanca. Ni falta que le hace. Es el salón de nuestra casa. Si quieres ver quién manda en Huelva, ven un sábado a mediodía y siéntate en un banco (si encuentras uno libre).</p>

      <h2>¿Qué se hace aquí? Nada y todo</h2>
      <p>Es el punto de encuentro por excelencia. Aquí se queda para ir a comer, para ver pasar el tiempo o para que los niños corran mientras tú te tomas un café. No busques monumentos épicos, busca la vida que tiene.</p>
      <ul>
        <li><strong>El "Colón":</strong> Aunque la estatua es de la Fe Descubridora, todos le llamamos Colón. Es el punto de reunión oficial. "Nos vemos en el Colón", y punto.</li>
        <li><strong>El Kiosko:</strong> Un clásico para comprar chuches o el periódico mientras ves pasar a la gente.</li>
      </ul>

      <h2>A comer, pero con criterio</h2>
      <p>Alrededor de la plaza hay de todo. Desde sitios donde te clavan por ser el centro hasta bares de toda la vida en las calles que salen (Vázquez López o Rico). Si ves a muchos onubenses en una barra, entra. Si solo ves cámaras de fotos, sigue caminando.</p>

      <p>Si vienes con mentalidad de recorrido, esta parada encaja sola dentro de <a href="/que-ver">qué ver en Huelva</a>. Y si estás montando una visita más completa, enlázala con <a href="/donde-comer">dónde comer</a> y <a href="/fin-de-semana">qué hacer un fin de semana</a>.</p>

      <blockquote>Dato real: La plaza ha cambiado mil veces. Algunos todavía echan de menos los jardines antiguos, otros aman el espacio peatonal. Así somos aquí.</blockquote>
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

      <p>Para meter esta visita en una ruta que tenga sentido, enlázala con <a href="/que-ver">qué ver en Huelva</a>. Y si la idea es quedarte más de un día, <a href="/fin-de-semana">esta guía de fin de semana</a> te ordena bastante mejor el conjunto.</p>

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

      <p>Si quieres encajar estos puntos dentro de una visita con lógica, combínalos con <a href="/que-ver">qué ver en Huelva</a> y con <a href="/fin-de-semana">ideas para un fin de semana</a> según vayas con más o menos tiempo.</p>

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

      <p>Si la gamba blanca es la reina, la coquina es la princesa rebelde de la ría. Es un producto humilde, pero si te dan "gato por liebre" (o tellina por coquina de aquí), te vas a enterar rápido porque tienen más arena que el desierto del Sáhara.</p>

      <h2>¿Cómo saber si son de las buenas?</h2>
      <p>La coquina de Huelva es pequeña, fina y tiene un sabor que te llena la boca de mar. Si ves unas almejas gigantes que te venden como coquinas, sospecha. Probablemente vienen de lejos y han pasado más tiempo en un camión que en el agua.</p>
      <ul>
        <li><strong>A la marinera:</strong> La clásica. Ajo, perejil y un chorrito de vino del Condado. El secreto es no dejarlas mucho tiempo al fuego; tienen que abrirse y ya está.</li>
        <li><strong>Al ajillo:</strong> Para los puristas. Solo aceite del bueno, ajo picadito y un toque de guindilla para que despierten el paladar.</li>
      </ul>

      <h2>El ritual de comerlas</h2>
      <p>Aquí no se usan cubiertos. Se usan las manos. Coges una, usas la concha para sacar el bicho de la siguiente y así hasta que solo quede un montón de cáscaras y el caldito delicioso al fondo del plato. El que no use pan para mojar ese caldo, no tiene alma.</p>

      <p>Y si quieres llevar esto al terreno práctico, enlaza con <a href="/donde-comer">dónde comer en Huelva</a> y con <a href="/article/donde-tapear-en-huelva">la ruta de tapeo</a> para encontrar contexto, no solo teoría.</p>

      <blockquote>Ojo con la veda: Hay épocas en las que no se pueden coger. Si te las ofrecen en agosto a precio de oro, pregunta de dónde vienen.</blockquote>
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
      <p>El Muelle de la Rio Tinto Company Limited (o Muelle del Tinto para los amigos) es nuestro monumento al hierro y al pasado inglés. Olvida las pirámides; esto es ingeniería bruta que servía para cargar el mineral que salía de las tripas de la Sierra.</p>

      <h2>Más que un muelle, un símbolo</h2>
      <p>Terminado en 1876, fue una revolución tecnológica en su día. Hoy es el sitio perfecto para pasear cuando el sol empieza a caer y la ría se pone de color naranja. No es una "atracción turística" al uso; es un trozo de historia que sigue en pie a pesar del salitre y del olvido.</p>
      <ul>
        <li><strong>La visita:</strong> Se camina por arriba. Tienes las mejores vistas del Odiel y del puerto. Si tienes suerte, verás algún barco mercante entrando a cámara lenta.</li>
        <li><strong>El momento:</strong> Atardecer. Imprescindible. La luz de Huelva a esa hora sobre el hierro del muelle es algo que no se olvida.</li>
      </ul>

      <h2>¿Qué hay cerca?</h2>
      <p>Poco. El muelle está un poco apartado del bullicio del centro, pero el paseo por la ría merece la pena. Llévate una chaqueta fina, que cuando sopla el Poniente al lado del agua te puedes quedar tieso hasta en julio.</p>

      <p>Si quieres que esta parada tenga retorno de verdad, mézclala con <a href="/que-ver">qué ver en Huelva</a> y con la visita al entorno portuario. El muelle gana cuando entiendes lo que lo rodea.</p>

      <blockquote>Dato de historiador local: Muchos creen que es de Eiffel, pero no. Fue cosa de George Bruce y Thomas Gibson. Ingeniería británica con alma choquera.</blockquote>
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
      <p>Cuidado aquí, que entramos en terreno sagrado. En la Sierra de Huelva no hacemos jamón; hacemos arte que se come. Si estás acostumbrado al jamón de sobre del súper, prepárate porque lo que vas a probar aquí es otra liga.</p>

      <h2>DOP Jabugo (Sierra de Huelva)</h2>
      <p>No todo lo que viene de la sierra es 100% ibérico de bellota. Tienes que fijarte en la brida (la etiqueta de plástico que lleva en la pezuña). Si quieres lo máximo, busca la <strong>brida negra</strong>. Eso significa que el cerdo era un atleta dehesa que solo comió bellotas y hierba.</p>
      <ul>
        <li><strong>Negro:</strong> El top. 100% raza ibérica y bellota.</li>
        <li><strong>Rojo:</strong> Bellota, pero el cerdo tiene mezcla de sangre (no es 100% ibérico).</li>
        <li><strong>Verde:</strong> Cebo de campo. Buenos, pero no han vivido el sueño de la bellota completa.</li>
      </ul>

      <h2>¿Cómo se come?</h2>
      <p>A cuchillo. Siempre a cuchillo. Si ves que lo cortan con máquina en un bar de la sierra, date media vuelta. El jamón necesita sudar, estar a temperatura ambiente y que el corte sea traslúcido. Y por favor, no le quites el tocino; ahí es donde está la gloria.</p>

      <blockquote>Un truco: Si vas a Jabugo o Aracena, compra directamente en los secaderos. Te ahorras intermediarios y la calidad está garantizada.</blockquote>
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
      <p>Julio y agosto están saturados. Junio y septiembre son ideales: buen tiempo, menos gente, precios más razonables. Si estás comparando opciones, cruza esto con <a href="/playas">las mejores playas de Huelva</a> y con <a href="/fin-de-semana">ideas de fin de semana</a> para decidir si Punta Umbría es tu base o solo una parada.</p>

      <p>Si estás comparando costa, no te quedes solo con esta pieza: abre también <a href="/playas">la guía general de playas</a> y decide con más criterio.</p>

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

      <p>Por eso funciona mejor si lo metes en una ruta de ciudad más amplia. Úsalo como parada con contexto dentro de <a href="/que-ver">qué ver en Huelva</a> y no como visita aislada sin más.</p>

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

      <p>Una vez resuelto el trayecto, lo inteligente es enlazar transporte con plan real: revisa <a href="/que-ver">qué ver en Huelva</a>, <a href="/fin-de-semana">ideas para un fin de semana</a> y <a href="/alojarse">dónde alojarse</a> para que llegar no sea lo único que tengas claro.</p>

      <p>Eso también significa que, si vas a moverte por provincia, te conviene organizar antes <a href="/que-ver">qué ver</a> y si el viaje da para <a href="/fin-de-semana">una escapada de fin de semana</a> o solo para una visita rápida.</p>

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

      <p>Si esta parte te interesa de verdad, el siguiente paso lógico no es leer más cronología: es ver sitios. Tira de <a href="/que-ver">qué ver en Huelva</a> y conviértelo en recorrido, no en examen.</p>

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
      <p>Abril-mayo y septiembre-octubre. Clima ideal para pasear, comer en terrazas y visitar la provincia sin agobios. Si quieres afinar el viaje según plan, te conviene cruzar esta guía con <a href="/playas">las mejores playas de Huelva</a>, <a href="/fin-de-semana">ideas de fin de semana</a> y <a href="/que-ver">qué ver en Huelva</a> para no venir a ciegas.</p>

      <h2>Qué llevar</h2>
      <ul>
        <li>Verano: ropa ligera, crema solar, gafas, sombrero.</li>
        <li>Invierno: jersey, chaqueta impermeable, paraguas.</li>
        <li>Todo el año: calzado cómodo para caminar por ciudad.</li>
      </ul>

      <p>Úsalo como filtro, no como curiosidad. Si hace calor serio, manda <a href="/playas">la costa</a>. Si quieres ciudad y paseo, revisa antes <a href="/que-ver">qué ver en Huelva</a>.</p>

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

      <p>Si vienes a dormir en la capital o a hacer base desde aquí, combina esto con la guía de <a href="/alojarse">dónde alojarse en Huelva</a> y con <a href="/que-ver">qué ver en Huelva</a> para elegir zona con sentido y no perder media jornada en logística.</p>

      <p>Y si vas a hacer base en ciudad, no planifiques aparcamiento aislado: decide primero <a href="/alojarse">dónde alojarte</a> y luego qué parte de <a href="/que-ver">Huelva quieres cubrir</a>.</p>

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

      <p>Si vas a acercarte hasta aquí, no lo dejes como visita suelta. Mete también Palos y el entorno colombino dentro de <a href="/que-ver">qué ver en Huelva y provincia</a>, o conviértelo directamente en <a href="/fin-de-semana">plan de fin de semana</a>.</p>

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

      <p>Bien metido dentro del recorrido, funciona. Solo, se liquida rápido. Mejor enlazarlo con <a href="/que-ver">qué ver en Huelva</a> y con la zona del puerto para que tenga contexto.</p>

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

      <p>Si vienes con poco tiempo, úsalo como ancla cultural dentro de <a href="/que-ver">qué ver en Huelva</a>. Y si luego toca comer, enlaza sin drama con <a href="/donde-comer">dónde comer en el centro</a>.</p>

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
      <p>Junio y septiembre son ideales: buen tiempo sin masificación. Julio y agosto están más llenos pero sigue siendo tranquilo comparado con otras zonas. Si quieres compararlo con otras zonas costeras, tira de <a href="/playas">la guía general de playas</a> y de <a href="/fin-de-semana">planes de fin de semana en Huelva</a>.</p>

      <p>Si dudas entre Portil, Punta Umbría o algo más familiar, compara directamente en <a href="/playas">la guía de playas de Huelva</a> en vez de elegir a ciegas.</p>

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

      <p>Como parada, funciona muy bien dentro de un paseo por el casco antiguo. Lo sensato es integrarla en <a href="/que-ver">qué ver en Huelva</a> y rematar luego por el centro con algo de <a href="/donde-comer">comer bien</a>.</p>

      <blockquote>La Concepción es fe de barrio en forma de templo. No es grande, pero es de todos.</blockquote>
    `
  },

  // ─── 5 ARTÍCULOS MÁS (30-34) ───────────────────────────────────

  // 30. Palos de la Frontera
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
  },

  // ─── 5 ARTÍCULOS MÁS (31-35) ───────────────────────────────────

  // 30. Palos de la Frontera
  {
    slug: 'palos-frontera-huelva-colon-lugares',
    title: 'Palos de la Frontera: donde todo empezó',
    excerpt: 'Palos de la Frontera: la Fuente Santa, la Rábida, y los lugares colombinos imprescindibles cerca de Huelva.',
    category: 'Guías Locales',
    image: '/images/guides/monasterio-rabida.jpg',
    publishedAt: '2026-02-23T21:00:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>Palos de la Frontera es un pueblo de 11.000 habitantes a 10 minutos de Huelva capital. Su nombre aparece en todos los libros de historia por una razón: aquí se gestó el viaje que cambió el mundo.</p>

      <h2>Qué ver en Palos</h2>
      <ul>
        <li><strong>Monasterio de La Rábida:</strong> donde Colón encontró apoyo. A 2 km del centro.</li>
        <li><strong>Fuente Santa:</strong> donde se reclutó parte de la tripulación. Placa conmemorativa.</li>
        <li><strong>Casa de los Pinzón:</strong> hogar de los hermanos que capitaneaban las naves.</li>
        <li><strong>Muelle de las Carabelas:</strong> reconstrucción de las tres naves del descubrimiento.</li>
      </ul>

      <h2>Cómo organizar la visita</h2>
      <p>Combinar con el Monasterio de La Rábida (misma zona). Media jornada suficiente. Ideal en primavera u otoño, cuando el calor no aprieta.</p>

      <h2>Cómo llegar</h2>
      <p>Desde Huelva: 10 minutos en coche por la A-497. También autobús de línea regular.</p>

      <p>Precisamente por eso conviene visitarlo con estructura: usa <a href="/que-ver">qué ver en Huelva y provincia</a> para no dejar fuera La Rábida, y si puedes, conviértelo en <a href="/fin-de-semana">escapada de fin de semana</a> con más aire.</p>

      <blockquote>Palos es pequeño, pero su huella en la historia es inmensamente grande.</blockquote>
    `
  },

  // 31. Minas de Riotinto
  {
    slug: 'minas-riotinto-huelva-visitar-tren',
    title: 'Minas de Riotinto: el Marte onubense',
    excerpt: 'Visita a las Minas de Riotinto: paisajes de otro planeta, tren histórico y el legado minero de Huelva.',
    category: 'Guías Locales',
    image: '/images/guides/huelva-aerea.jpg',
    publishedAt: '2026-02-23T21:05:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>Las Minas de Riotinto son uno de los paisajes más singulares de España. Extracción de minerales desde hace 5.000 años, pasando por tartesios, romanos, y la época británica. El resultado es un territorio que parece de otro planeta.</p>

      <h2>Qué ver en las minas</h2>
      <ul>
        <li><strong>Tren turístico:</strong> recorrido por el entorno minero en vagón histórico.</li>
        <li><strong>Museo minero:</strong> historia de la explotación desde la prehistoria.</li>
        <li><strong>Peña de Hierro:</strong> mirador con vistas sobre el corta (excavación a cielo abierto).</li>
        <li><strong>Tinto River:</strong> el río rojo, ácido, único en el mundo.</li>
      </ul>

      <h2>El color rojo</h2>
      <p>La tierra, el agua y las rocas tienen tonos rojizos, anaranjados y amarillos por el alto contenido en minerales de hierro y azufre. NASA estudió la zona por su similitud con Marte.</p>

      <h2>Cómo llegar</h2>
      <p>Desde Huelva: 1 hora en coche. Desde Aracena: 45 minutos. Acceso bien señalizado.</p>

      <blockquote>Riotinto es Huelva en otro planeta. El mismo cielo, suelo diferente.</blockquote>
    `
  },

  // 32. Noche en Huelva
  {
    slug: 'noche-huelva-donde-salir-tapas',
    title: 'Noche en Huelva: dónde salir y qué hacer',
    excerpt: 'Guía de la noche onubense: tapas, copas, y los mejores planes para salir en Huelva capital.',
    category: 'Eventos',
    image: '/images/guides/huelva-plaza-las-monjas.jpg',
    publishedAt: '2026-02-23T21:10:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>La noche en Huelva no es la de Madrid ni Sevilla. Es más tranquila, más temprana, más de bar que de discoteca. Pero tiene su ritmo y sus lugares.</p>

      <h2>La ruta de tapas nocturna</h2>
      <p>Empieza sobre las 21:00. Calle Concepción, Plaza de las Monjas, y alrededores concentran la mayor oferta. Diferente ambiente que al mediodía: más joven, más movimiento.</p>

      <h2>Zonas para copas</h2>
      <ul>
        <li><strong>Centro histórico:</strong> bares con ambiente mixto, desde los 30 a los 50 años.</li>
        <li><strong>Zona Gran Vía:</strong> más moderno, terrazas y pubs.</li>
        <li><strong>Puerto:</strong> algunos locales con vistas, más tranquilos.</li>
      </ul>

      <h2>Horarios</h2>
      <p>Los bares cierran sobre la 1:00-2:00. Las discotecas (pocas) abren hasta las 6:00, pero no es el ambiente predominante. La noche onubense es de conversación, no de macrofiesta.</p>

      <h2>Presupuesto</h2>
      <p>Caña: 1,50-2,50€. Copa: 6-10€. Cena de tapas: 15-25€ por persona.</p>

      <blockquote>En Huelva, la noche es de terraza y conversación. No es la ciudad que no duerme, es la ciudad que charla hasta tarde.</blockquote>
    `
  },

  // 33. Gastronomía típica de Huelva
  {
    slug: 'gastronomia-tipica-huelva-platos',
    title: 'Gastronomía de Huelva: los 10 platos que tienes que probar',
    excerpt: 'Guía completa de la gastronomía onubense: qué comer, dónde probarlo y cuándo es temporada.',
    category: 'Gastronomía',
    image: '/images/guides/corte-jamon-iberico.jpg',
    publishedAt: '2026-02-23T21:15:00Z',
    author: 'Rocío Limón',
    isAi: true,
    content: `
      <p>La cocina de Huelva es de producto, de mar y de tierra. No hay alta cocina complicada: hay buen producto tratado con respeto. Estos son los platos imprescindibles.</p>

      <h2>Platos de mar</h2>
      <ul>
        <li><strong>Gamba blanca:</strong> cocida o a la plancha. Temporada: octubre-marzo.</li>
        <li><strong>Choco frito:</strong> con limón, sin salsa. Todo el año.</li>
        <li><strong>Coquinas a la marinera:</strong> ajo, perejil, vino blanco.</li>
        <li><strong>Atún:</strong> de almadraba, encebollado o a la plancha.</li>
      </ul>

      <h2>Platos de tierra</h2>
      <ul>
        <li><strong>Jamón ibérico:</strong> DOP Sierra de Huelva, bellota.</li>
        <li><strong>Presa ibérica:</strong> a la brasa, jugosa.</li>
        <li><strong>Carrillada:</strong> estofada, con vino de la tierra.</li>
        <li><strong>Papas aliñás:</strong> ensalada de patata, bacalao y naranja.</li>
      </ul>

      <h2>Dulces</h2>
      <ul>
        <li><strong>Jueves lardero:</strong> hornazo, pestiños, torrijas.</li>
        <li><strong>Roscos fritos:</strong> especialmente en Semana Santa.</li>
      </ul>

      <p>Si prefieres pasar de la teoría al sitio correcto, sigue por <a href="/donde-comer">dónde comer en Huelva</a> y luego afina con piezas concretas como <a href="/article/choco-frito-huelva-como-se-come-bien">choco frito</a>, <a href="/article/coquinas-huelva-como-comer">coquinas</a> o <a href="/article/mejores-restaurantes-huelva">los mejores restaurantes de Huelva</a>.</p>

      <p>Y si lo que quieres no es teoría sino sentarte bien, tira de <a href="/donde-comer">dónde comer en Huelva</a> y deja de improvisar como un turista castigado.</p>

      <blockquote>La gastronomía de Huelva no necesita chefs famosos. Necesita buen producto y manos que lo respeten.</blockquote>
    `
  },

  // 34. Compras en Huelva
  {
    slug: 'compras-huelva-donde-ir-tiendas',
    title: 'Compras en Huelva: dónde ir y qué comprar',
    excerpt: 'Guía de compras en Huelva: centros comerciales, comercio local, artesanía y productos típicos para llevarse.',
    category: 'Guías Locales',
    image: '/images/guides/huelva-plaza-las-monjas.jpg',
    publishedAt: '2026-02-23T21:20:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>Huelva no es ciudad de grandes compras, pero tiene comercio local con carácter. Desde centros comerciales a tiendas de productos típicos, aquí está lo que necesitas saber.</p>

      <h2>Centros comerciales</h2>
      <ul>
        <li><strong>Aqualon:</strong> el principal, en el Puerto. Grandes superficies, cine, restauración.</li>
        <li><strong>Holea:</strong> más moderno, a las afueras. Zara, H&amp;M, etc.</li>
      </ul>

      <h2>Comercio local</h2>
      <ul>
        <li><strong>Centro histórico:</strong> tiendas tradicionales de toda la vida.</li>
        <li><strong>Calle Concepción:</strong> comercio mixto, algunas tiendas de artesanía.</li>
        <li><strong>Mercado del Carmen:</strong> productos frescos para llevar.</li>
      </ul>

      <h2>Qué comprar de recuerdo</h2>
      <ul>
        <li>Jamón ibérico de bellota (en tiendas especializadas).</li>
        <li>Vinos del Condado de Huelva.</li>
        <li>Miel de la Sierra.</li>
        <li>Artesanía local: cerámica, cuero.</li>
      </ul>

      <h2>Horarios</h2>
      <p>Comercio tradicional: 10:00-14:00 y 17:00-20:30. Domingos cerrado (excepto festivos especiales). Centros comerciales: 10:00-22:00, incluso festivos.</p>

      <blockquote>En Huelva no se viene de compras. Se compra lo que se necesita, y se encuentra lo que no se buscaba.</blockquote>
    `
  },

  // ─── 10 ARTÍCULOS CON NUEVAS IMÁGENES (35-44) ──────────────────

  // 35. Tren Minero de Riotinto
  {
    slug: 'tren-minero-riotinto-viaje-historia',
    title: 'Tren Minero de Riotinto: viaje al corazón de la historia',
    excerpt: 'Sube al tren minero de Riotinto y recorre 22 kilómetros de historia, paisajes de otro planeta y el legado británico de Huelva.',
    category: 'Guías Locales',
    image: '/images/guides/tren-minero-riotinto.jpg',
    publishedAt: '2026-02-23T21:30:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>El Tren Minero de Riotinto no es un tren turístico cualquiera. Es una máquina del tiempo sobre raíles que te lleva a través de 22 kilómetros de historia, desde la época británica hasta los paisajes más alienígenas de España.</p>

      <h2>El recorrido</h2>
      <p>Salida desde la estación de Riotinto, antiguo centro de operaciones de la Rio Tinto Company Limited. El tren recorre el valle del Tinto, pasando por túneles excavados en la roca, puentes de hierro del siglo XIX, y paisajes que la NASA estudió por su similitud con Marte.</p>

      <h2>Qué verás desde el vagón</h2>
      <ul>
        <li><strong>Corta Atalaya:</strong> la mina a cielo abierto más grande de Europa en su época.</li>
        <li><strong>Río Tinto:</strong> aguas rojas, ácidas, únicas en el mundo. Color que no parece de este planeta.</li>
        <li><strong>Estaciones históricas:</strong> construcciones victorianas que sobreviven como fantasmas de la época dorada.</li>
      </ul>

      <h2>Detalles prácticos</h2>
      <p>Duración: 1 hora y 45 minutos ida y vuelta. Precio: 12-15€ adultos, descuentos para niños y grupos. Horarios: fines de semana todo el año, diario en verano. Reserva recomendada.</p>

      <h2>Combinar con</h2>
      <p>Museo Minero (en la misma estación), Peña de Hierro (mirador sobre el corta), y el pueblo de Nerva para comer. Media jornada completa.</p>

      <blockquote>El Tren Minero no te lleva a un destino. Te lleva a otro tiempo, a otro color, a otra forma de entender Huelva.</blockquote>
    `
  },

  // 36. Fresas de Huelva
  {
    slug: 'fresas-huelva-rojas-oro-rojo',
    title: 'Fresas de Huelva: el oro rojo de la provincia',
    excerpt: 'La fresa onubense es la mejor de España. Descubre por qué, dónde comprarlas y cómo disfrutarlas en temporada.',
    category: 'Gastronomía',
    image: '/images/guides/fresas-huelva.jpg',
    publishedAt: '2026-02-23T21:35:00Z',
    author: 'Rocío Limón',
    isAi: true,
    content: `
      <p>Huelva produce el 90% de las fresas de España y exporta a toda Europa. No es casualidad: el clima suave del oeste andaluz, la tierra arenosa, y décadas de experiencia han convertido a la provincia en la capital europea de la fresa.</p>

      <h2>Por qué son diferentes</h2>
      <p>Las fresas de Huelva tienen aroma intenso, dulzor equilibrado, y textura firme. No son las fresas de invernadero de otros sitios: son producto de campo, cultivadas al aire libre en su mayoría, con técnicas que han perfeccionado generaciones de agricultores.</p>

      <h2>Temporada</h2>
      <p>Principalmente diciembre a mayo, con pico en marzo-abril. Fuera de temporada, lo que encuentres probablemente viene de otros lugares o es de invernadero con menor calidad.</p>

      <h2>Dónde comprar</h2>
      <ul>
        <li><strong>Mercado del Carmen:</strong> puestos de productores locales con fresas recién recogidas.</li>
        <li><strong>Carreteras de la comarca:</strong> venta directa en puestos de campo (más baratas, más frescas).</li>
        <li><strong>Supermercados:</strong> busca el origen "Huelva" en la etiqueta.</li>
      </ul>

      <h2>Más que fresa natural</h2>
      <p>La industria transformadora elabora mermeladas, licores, yogures, y postres. La fresa de Huelva es ingrediente, recuerdo, y motor económico de la provincia.</p>

      <blockquote>Una fresa de Huelva en su punto no necesita azúcar. Ya tiene todo lo que debe tener.</blockquote>
    `
  },

  // 37. Naranjas de Huelva
  {
    slug: 'naranjas-huelva-citricos-condado',
    title: 'Naranjas de Huelva: el cítrico del Condado',
    excerpt: 'El Condado de Huelva produce naranjas de mesa con denominación de origen. Cómo reconocerlas y disfrutarlas.',
    category: 'Gastronomía',
    image: '/images/guides/naranjas-huelva.png',
    publishedAt: '2026-02-23T21:40:00Z',
    author: 'Rocío Limón',
    isAi: true,
    content: `
      <p>El Condado de Huelva, la comarca al este de la capital, es tierra de naranjos desde hace siglos. Aquí se cultivan naranjas de mesa con denominación de origen protegida: dulces, jugosas, con el punto ácido justo que las hace equilibradas.</p>

      <h2>Variedades principales</h2>
      <ul>
        <li><strong>Navelate:</strong> la reina, sin pepitas, dulce, de fácil pelado.</li>
        <li><strong>Navelina:</strong> similar, madura antes, algo más ácida.</li>
        <li><strong>Salustiana:</strong> muy jugosa, ideal para zumo.</li>
      </ul>

      <h2>Temporada</h2>
      <p>Noviembre a mayo, dependiendo de la variedad. Enero y febrero son los meses de mejor calidad-precio: la naranja ha acumulado azúcares durante el frío invernal.</p>

      <h2>La diferencia del Condado</h2>
      <p>El microclima de la comarca —temperaturas suaves, humedad del Atlántico, tierra fértil— produce naranjas con más jugo y mejor conservación que las de otras zonas. La Denominación de Origen protege este saber hacer.</p>

      <h2>Dónde comprar</h2>
      <p>Mercado del Carmen, cooperativas agrícolas del Condado, y venta directa en las carreteras de la comarca (A-472, A-493). Precio en origen: 1-2€/kg según calidad y temporada.</p>

      <blockquote>La naranja del Condado no es solo fruta. Es el sabor del invierno onubense, exprimido.</blockquote>
    `
  },

  // 38. Casa de los Pinzón
  {
    slug: 'casa-pinzon-palos-frontera-visita',
    title: 'Casa de los Pinzón: los capitanes olvidados del Descubrimiento',
    excerpt: 'Visita la Casa de los Pinzón en Palos de la Frontera, hogar de los hermanos que capitaneaban las naves de Colón.',
    category: 'Guías Locales',
    image: '/images/guides/casa-pinzon.jpg',
    publishedAt: '2026-02-23T21:45:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>Mientras Colón se lleva los libros de historia, los hermanos Pinzón hicieron el trabajo real. Martín Alonso, Vicente Yáñez y Francisco Martín nacieron en Palos de la Frontera, y desde su casa familiar organizaron la tripulación, financiaron parte de la expedición, y capitaneaban la Pinta, la Niña y la Santa María.</p>

      <h2>La casa hoy</h2>
      <p>Casa-museo en el centro de Palos que recrea la vivienda de la familia Pinzón. No es la casa original (destruida en el siglo XIX), sino una reconstrucción fiel en el mismo solar, con elementos arquitectónicos de la época.</p>

      <h2>Qué ver</h2>
      <ul>
        <li><strong>Reconstrucción de estancias:</strong> cómo vivía una familia de marineros adinerados del siglo XV.</li>
        <li><strong>Maquetas de las carabelas:</strong> diferencias entre la Pinta, la Niña y la Santa María.</li>
        <li><strong>Documentación:</strong> contratos, cartas, y la historia real de quién hizo qué en 1492.</li>
      </ul>

      <h2>Los Pinzón vs Colón</h2>
      <p>Martín Alonso Pinzón comandó la Pinta y fue el verdadero experto navegante. Muchos historiadores sostienen que sin los Pinzón, la expedición no hubiera salido adelante. Esta casa es homenaje a los olvidados.</p>

      <h2>Visita combinada</h2>
      <p>Entrada gratuita. Combinar con Monasterio de La Rábida (2 km), Fuente Santa (donde se reclutó la tripulación), y Muelle de las Carabelas. Media jornada colombina completa.</p>

      <p>Si vas a hacer ruta colombina, no la trocees mal: enlaza esta parada con <a href="/que-ver">qué ver en Huelva y provincia</a> y con <a href="/fin-de-semana">un plan de fin de semana</a> si quieres meter también La Rábida y Palos con calma.</p>

      <blockquote>Colón tuvo la idea. Los Pinzón la hicieron realidad. Esta casa es de los que ejecutan, no de los que firman.</blockquote>
    `
  },

  // 39. Fuente Santa
  {
    slug: 'fuente-santa-palos-historia-colon',
    title: 'Fuente Santa: donde se gestó la tripulación del Descubrimiento',
    excerpt: 'La Fuente Santa de Palos de la Frontera es el lugar donde se reclutó a los marineros que cambiaron la historia.',
    category: 'Guías Locales',
    image: '/images/guides/fuente-santa.png',
    publishedAt: '2026-02-23T21:50:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>La Fuente Santa es solo una fuente. Pero es LA fuente. Aquí, en 1492, Martín Alonso Pinzón convenció a los marineros de Palos para que se embarcaran en una expedición loca comandada por un extranjero con ideas raras. Sin esa fuente, quizás no hubiera Descubrimiento.</p>

      <h2>El lugar</h2>
      <p>Fuente pública del siglo XV, reconstruida varias veces, situada en una plaza peatonal del centro de Palos. Agua que sigue corriendo, como hace 500 años.</p>

      <h2>La historia</h2>
      <p>Los pinzones tenían una deuda con la Corona. Para saldarla, debían proporcionar dos carabelas y tripulación. Martín Alonso Pinzón se plantó junto a esta fuente y convenció a sus paisanos. La oferta: participar en algo peligroso pero potencialmente rentable.</p>

      <h2>El resultado</h2>
      <p>De los 90 marineros que partieron, 49 eran de Palos y Moguer. La mayoría volvieron. Algunos se quedaron en el Caribe. La Fuente Santa es el origen de la primera globalización.</p>

      <h2>Cómo llegar</h2>
      <p>En el centro de Palos de la Frontera, a 2 minutos a pie de la Casa de los Pinzón. Placa conmemorativa, bancos, ambiente de pueblo. Visita gratuita, 10 minutos suficientes.</p>

      <p>Encaja mejor dentro de una ruta colombina completa, así que compárala con <a href="/que-ver">qué ver en Huelva y provincia</a> y monta la media jornada con cabeza.</p>

      <blockquote>La Fuente Santa no es monumento. Es el lugar donde la historia cambió de río, no de agua.</blockquote>
    `
  },

  // 40. Estación de Tren de Huelva
  {
    slug: 'estacion-tren-huelva-historia-arquitectura',
    title: 'Estación de tren de Huelva: la puerta de hierro de la ciudad',
    excerpt: 'Historia y arquitectura de la estación de tren de Huelva, punto de entrada a la capital onubense desde 1880.',
    category: 'Guías Locales',
    image: '/images/guides/estacion-tren-huelva.jpg',
    publishedAt: '2026-02-23T21:55:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>La estación de tren de Huelva es la primera impresión que muchos viajeros tienen de la ciudad. Edificio funcional, heredero de la época en que el ferrocarril era el verdadero motor de la provincia: el tren de las minas, el tren de Sevilla, el tren que conectaba Huelva con el mundo.</p>

      <h2>Historia de la estación</h2>
      <p>Inaugurada en 1880, durante la época dorada de la Rio Tinto Company Limited. El ferrocarril unió las minas de Riotinto con el puerto de Huelva, y la estación se convirtió en centro neurálgico de la ciudad. Reformada en el siglo XX, mantiene la estructura original.</p>

      <h2>Arquitectura</h2>
      <p>Edificio de ladrillo visto con elementos neomudéjares típicos del ferrocarril español de finales del XIX. El andén cubierto, el vestíbulo, y la fachada principal conservan el aire de estación de provincias de la España industrial.</p>

      <h2>Servicios actuales</h2>
      <ul>
        <li><strong>Media Distancia:</strong> conexiones con Sevilla, Córdoba, Madrid (con transbordo).</li>
        <li><strong>Cercanías:</strong> línea Sevilla-Huelva, frecuente y económica.</li>
        <li><strong>Estación de autobuses:</strong> junto a la de tren, para conexiones provinciales.</li>
      </ul>

      <h2>Acceso al centro</h2>
      <p>La estación está a 15 minutos a pie del centro histórico. Taxi en la salida (unos 6-8€ al centro). Autobús urbano: líneas que conectan con la Gran Vía y el centro.</p>

      <blockquote>La estación de Huelva es umbral: entras por una provincia industrial del siglo XIX y sales a una ciudad del siglo XXI que aún respira ese pasado.</blockquote>
    `
  },

  // 41. Puente Internacional del Guadiana
  {
    slug: 'puente-internacional-guadiana-frontera',
    title: 'Puente Internacional: cruzar el Guadiana hacia Portugal',
    excerpt: 'Guía del Puente Internacional del Guadiana: cómo cruzar de España a Portugal, historia de la frontera y qué encontrar al otro lado.',
    category: 'Guías Locales',
    image: '/images/guides/puente-internacional.jpg',
    publishedAt: '2026-02-23T22:00:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>El Puente Internacional del Guadiana une Ayamonte (Huelva) con Vila Real de Santo António (Algarve, Portugal). Es una frontera sin frontera: Schengen permite el paso sin controles, aunque cambias de país, de moneda (si usas efectivo), y sobre todo, de hora: Portugal tiene una menos.</p>

      <h2>El puente</h2>
      <p>Inaugurado en 1991, mide 666 metros de longitud. Diseño funcional, sin pretensiones arquitectónicas monumentales, pero con vistas espectaculares sobre la desembocadura del Guadiana. Peaje en sentido Portugal (unos 2€).</p>

      <h2>Cómo cruzar</h2>
      <ul>
        <li><strong>Coche:</strong> más común. Peaje solo hacia Portugal, gratis de vuelta.</li>
        <li><strong>Ferry:</strong> en verano hay barcas que cruzan el río (más lento, más pintoresco).</li>
        <li><strong>A pie:</strong> no hay paso peatonal por el puente. Debes ir en transporte.</li>
      </ul>

      <h2>Qué encontrar al otro lado</h2>
      <p>Vila Real de Santo António es el gemelo portugués de Ayamonte: pueblo de pescadores, playas, marisco. Diferencias notables: precios similares, lengua diferente, y el café espresso es más fuerte.</p>

      <h2>El cambio de hora</h2>
      <p>Es el detalle más surrealista. Cruzas el puente y tu móvil atrasa una hora automáticamente. Si quedas con alguien, especifica "hora española" o "hora portuguesa".</p>

      <blockquote>El Puente Internacional es frontera sin frontera: pasas de España a Portugal sin saber muy bien cuándo, solo tu móvil te lo confirma.</blockquote>
    `
  },

  // 42. Parque Moret
  {
    slug: 'parque-moret-huelva-respiro-verde',
    title: 'Parque Moret: el pulmón verde de Huelva capital',
    excerpt: 'Guía del Parque Moret de Huelva: historia, qué ver, y por qué es el lugar favorito de los onubenses para desconectar.',
    category: 'Guías Locales',
    image: '/images/guides/parque-moret.jpg',
    publishedAt: '2026-02-23T22:05:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>Huelva es una ciudad industrial, portuaria, con pocas zonas verdes. El Parque Moret es la excepción: 20 hectáreas de vegetación, estanques, paseos y árboles centenarios que ofrecen respiro a una ciudad que lo necesita.</p>

      <h2>Historia del parque</h2>
      <p>Antiguos terrenos de la familia Moret, terratenientes onubenses. Cedidos al municipio en el siglo XX, transformados en parque público. Conserva la casa señorial (hoy centro cultural) y el jardín histórico.</p>

      <h2>Qué hacer en el Moret</h2>
      <ul>
        <li><strong>Pasear:</strong> senderos arbolados, bancos para sentarse, sombra en verano.</li>
        <li><strong>Estanque:</strong> patos, tortugas, y el juego favorito de los niños: tirar pan.</li>
        <li><strong>Casa Moret:</strong> ocasionalmente exposiciones y eventos culturales.</li>
        <li><strong>Área de juegos:</strong> columpios y espacios para niños.</li>
      </ul>

      <h2>Para quién es</h2>
      <p>Para familias con niños (los domingos por la mañana es inevitable). Para mayores que pasean en grupos. Para quien necesita sombra en agosto. Para los que quieren leer un rato sin ruido de coches.</p>

      <h2>Ubicación y acceso</h2>
      <p>Al oeste del centro, cerca de la zona de El Conquero. Autobús urbano, aparcamiento en zona. Acceso peatonal desde varios puntos.</p>

      <p>Como parada aislada no te cambia el viaje, pero dentro de <a href="/que-ver">qué ver en Huelva</a> suma bien si te apetece bajar revoluciones o vas con niños.</p>

      <blockquote>El Parque Moret no es Central Park. Es humilde, pequeño, y precisamente por eso es de los onubenses: no viene nadie de fuera, solo los que necesitan un respiro.</blockquote>
    `
  },

  // 43. Baluarte de la Concepción
  {
    slug: 'baluarte-concepcion-huelva-fortaleza',
    title: 'Baluarte de la Concepción: fortaleza olvidada en el puerto',
    excerpt: 'Historia del Baluarte de la Concepción, la fortaleza defensiva del puerto de Huelva que resistió piratas y corsarios.',
    category: 'Guías Locales',
    image: '/images/guides/baluarte-huelva.jpg',
    publishedAt: '2026-02-23T22:10:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>El Baluarte de la Concepción es una fortaleza del siglo XVII situada en el entorno del puerto de Huelva. Construido para defender la ría de piratas, corsarios y potencias enemigas, hoy es un vestigio histórico poco conocido incluso por los propios onubenses.</p>

      <h2>Historia defensiva</h2>
      <p>Época de oro del comercio colonial: Huelva era puerto de paso hacia las Indias. El baluarte formaba parte de un sistema defensivo que incluía torres de vigilancia costera, fuertes, y baterías. Nunca tuvo que defenderse de un ataque serio, pero su mera presencia disuadía.</p>

      <h2>Arquitectura militar</h2>
      <p>Construcción de piedra con planta estrellada, cañoneras orientadas al mar, y murallas de más de dos metros de grosor. Diseño funcional: resistir bombarda y permitir el fuego cruzado de artillería.</p>

      <h2>Estado actual</h2>
      <p>En proceso de restauración durante años. El acceso es limitado, aunque ocasionalmente se organizan visitas guiadas. El exterior se puede observar desde el entorno portuario.</p>

      <h2>Ubicación</h2>
      <p>En la zona del puerto, cerca del Muelle del Tinto. Acceso complicado (zona portuaria industrial), pero visible desde ciertos puntos.</p>

      <p>Si te interesa este Huelva menos obvio, encájalo dentro de <a href="/que-ver">qué ver en Huelva</a> junto al puerto y el Muelle del Tinto. Solo, se queda corto; en conjunto, gana bastante.</p>

      <blockquote>El Baluarte de la Concepción es la memoria de cuando Huelva tenía que defenderse del mundo, en lugar de comerciar con él.</blockquote>
    `
  },

  // 44. Cruz de Mayo
  {
    slug: 'cruz-mayo-huelva-tradicion-flores',
    title: 'Cruz de Mayo en Huelva: tradición, flores y devoción',
    excerpt: 'La fiesta de las Cruces de Mayo en Huelva: historia, dónde verlas, y por qué esta tradición sigue viva en la provincia.',
    category: 'Eventos',
    image: '/images/guides/cruz-mayo-huelva.png',
    publishedAt: '2026-02-23T22:15:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>Cada 3 de mayo, Huelva se llena de flores. La Fiesta de las Cruces es una tradición que mezcla devoción religiosa con concurso popular: cruces elaboradas con flores, plantas, y objetos cotidianos, expuestas en plazas, calles, y patios de vecinos.</p>

      <h2>Origen de la tradición</h2>
      <p>La leyenda dice que Constantino vio una cruz en el cielo antes de una batalla. La victoria convirtió el símbolo en sagrado. En España, la tradición de las cruces de mayo viene del siglo XV, pero en Huelva tomó fuerza especialmente en barrios obreros como forma de expresión colectiva.</p>

      <h2>Cómo son las cruces</h2>
      <ul>
        <li><strong>Cruces vivas:</strong> estructura de madera cubierta de flores frescas.</li>
        <li><strong>Cruces de patio:</strong> instaladas en espacios privados, abiertas al público.</li>
        <li><strong>Cruces de calle:</strong> organizadas por asociaciones de vecinos en plazas y rincones.</li>
      </ul>

      <h2>Dónde verlas</h2>
      <p>Barrios tradicionales: El Torrejón, Barrio Obrero, Zona Centro. Cada cruz compite por premios, pero la verdadera recompensa es el reconocimiento vecinal. Se acompaña de música, pescaíto frito, y ambiente de barrio.</p>

      <h2>Cuándo es</h2>
      <p>El 3 de mayo, aunque los preparativos empiezan días antes y algunas cruces permanecen más tiempo. La noche del 2 al 3 es cuando se montan, y el día 3 es la procesión y los premios.</p>

      <blockquote>La Cruz de Mayo no es solo religión. Es competencia vecinal, orgullo de barrio, y la prueba de que en Huelva, la belleza se hace entre todos.</blockquote>
    `
  },

  // ─── ÚLTIMOS 6 CON ADN CHOQUERO (45-50) ────────────────────────

  // 45. Choco Frito - La Biblia
  {
    slug: 'choco-frito-biblia-huelva-como-manda',
    title: 'Choco frito: la biblia del auténtico choco onubense',
    excerpt: 'Todo lo que necesitas saber sobre el choco frito: cómo debe ser, dónde comerlo bien, y por qué en Huelva lo hacemos como nadie.',
    category: 'Gastronomía',
    image: '/images/guides/choco-frito-tapa.jpg',
    publishedAt: '2026-02-23T22:20:00Z',
    author: 'Rocío Limón',
    isAi: true,
    content: `
      <p>Mira, vamos a hablar claro. El choco frito no es "sepia a la romana". Eso se lo cuentas a los de fuera. En Huelva, el choco es choco: <em>Sepia officinalis</em>, de la ría, recién salido del agua, con el cuerpo blanco y las aletas violáceas. Lo demás es imitación.</p>

      <h2>El choco bueno: señales de identidad</h2>
      <p>Cuando te ponen un plato de choco delante, no hace falta probarlo para saber si va a estar bueno. Solo hay que mirar:</p>
      <ul>
        <li><strong>El color:</strong> dorado, no quemado. Si está negro, el aceite estaba viejo o muy caliente.</li>
        <li><strong>El rebozado:</strong> fino, apenas una capa de harina. Si parece pollo empanado, sal corriendo.</li>
        <li><strong>El corte:</strong> en tiras regulares, ni muy gruesas ni muy finas. En dados solo si es para tapa pequeña.</li>
        <li><strong>El limón:</strong> debe venir aparte. Si llega con limón encima, el cocinero no confía en su producto.</li>
      </ul>

      <h2>El truco del aceite</h2>
      <p>El secreto no está en el choco, está en el aceite. De oliva virgen, muy caliente, y preferiblemente no reutilizado. Las freidurías de toda la vida lo cambian cada pocos días. Los sitios nuevos, a veces... bueno, ya sabes.</p>

      <h2>Dónde ir (y dónde no)</h2>
      <p>Los mejores chocos están en los sitios que no tienen carta inglesa. En el centro, busca los bares que huelen a aceite desde la calle. En el Torrejón, hay freidurías que llevan tres generaciones haciendo lo mismo.</p>
      <p>Evita: sitios con fotos en el menú, sitios que lo sirven con "salsa de la casa", y cualquier lugar donde te digan "sepia frita" sin ruborizarse.</p>

      <h2>Temporada y precio</h2>
      <p>Todo el año, pero el de verano suele ser congelado o de otras costas. El bueno, el de la ría, se nota. Precio razonable: 10-16€ la ración. Si te piden menos de 8€, sospecha. Si te piden más de 20€, también.</p>

      <blockquote>El choco frito es simple: buen producto, buen aceite, mano experta. Todo lo demás es ruido.</blockquote>
    `
  },

  // 46. Coquinas - Guía del marisco
  {
    slug: 'coquinas-huelva-marisco-como-comprar',
    title: 'Coquinas: el marisco humilde que conquistó Huelva',
    excerpt: 'Guía práctica de las coquinas: cómo elegirlas, cómo cocinarlas, y por qué son el tesoro escondido de nuestra ría.',
    category: 'Gastronomía',
    image: '/images/guides/coquinas-huelva.jpg',
    publishedAt: '2026-02-23T22:25:00Z',
    author: 'Rocío Limón',
    isAi: true,
    content: `
      <p>Si la gamba blanca es la reina del marisco onubense, las coquinas son las princesas del pueblo. Pequeñas, humildes, pero cuando están buenas... hay pocos platos que superen una buena ración de coquinas a la marinera con una cerveza bien tirada.</p>

      <h2>Qué son realmente</h2>
      <p><em>Donax trunculus</em>, para los técnicos. "Tellinas" para los que vienen de fuera. En Huelva, simplemente "coquinas". Bivalvos pequeños que viven enterrados en la arena de las playas y estuarios. Las de la ría de Huelva tienen sabor más intenso que las de mar abierto.</p>

      <h2>Cómo reconocer las buenas</h2>
      <ul>
        <li><strong>Tamaño:</strong> pequeñas, de 2 a 4 centímetros. Las grandes suelen ser de vivero o de otras zonas.</li>
        <li><strong>Concha:</strong> grisácea con refleos amarillentos o violáceos. Si están blancas, sospecha.</li>
        <li><strong>Vivas:</strong> cuando las golpeas entre sí, deben sonar hueco, no sólido. Las muertas no se abren al cocer.</li>
        <li><strong>Olor:</strong> a mar limpio. Nada de amoniaco ni olores raros.</li>
      </ul>

      <h2>Preparación: menos es más</h2>
      <p>La marinera: aceite, ajo, perejil, guindilla, vino blanco. Se echan limpias a la sartén caliente, tapas un par de minutos hasta que se abran, y a comer. Con pan para mojar, obligatorio.</p>
      <p>El ajillo: aún más simple. Solo aceite, ajo y guindilla. Para cuando el producto es tan bueno que no necesita aliados.</p>

      <h2>Dónde y cuánto</h2>
      <p>Mercado del Carmen, primera hora. Pescaderías de confianza, no supermercados. Precio: 6-10€/kg según temporada y tamaño. En bar, una ración buena: 8-14€.</p>

      <blockquote>Las coquinas no son almejas pequeñas. Son otro producto, con sabor propio, de la ría de Huelva. No las confundas.</blockquote>
    `
  },

  // 47. Sierra de Huelva
  {
    slug: 'sierra-huelva-escapada-montana-fin-de-semana',
    title: 'Sierra de Huelva: escapada de montaña a una hora de la capital',
    excerpt: 'La Sierra de Huelva es el refugio natural de la provincia. Rutas, pueblos blancos y el mejor jamón, a menos de 60 minutos.',
    category: 'Guías Locales',
    image: '/images/guides/aracena-pueblo.jpg',
    publishedAt: '2026-02-23T22:30:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>Cuando el calor de la costa aprieta o cuando necesitas ver verde después de tanto gris industrial, la Sierra de Huelva está ahí. A 45 minutos en coche, otro mundo: dehesas, robles, pueblos blancos pegados a la ladera, y el jamón más bueno que vas a probar.</p>

      <h2>Qué es la Sierra</h2>
      <p>Parque Natural de la Sierra de Aracena y Picos de Aroche. 186.000 hectáreas de montes, valles, y el mayor bosque de castaños de España. Cero masificación turística. Cero colas. Cero timos.</p>

      <h2>Pueblos donde perderse</h2>
      <ul>
        <li><strong>Aracena:</strong> la capital. Gruta de las Maravillas, castillo, jamón en cada esquina.</li>
        <li><strong>Jabugo:</strong> el nombre que vende el jamón. Más pequeño, más auténtico, más ibérico.</li>
        <li><strong>Alájar:</strong> blanco, colgado de la peña, con la Peña de Arias Montano al fondo.</li>
        <li><strong>Cortegana:</strong> castillo medieval, calles empedradas, silencio.</li>
      </ul>

      <h2>Qué hacer</h2>
      <p>Comer jamón, primero. Luego: rutas de senderismo (bajas, para todos los niveles), visitar la Gruta, pasear por los pueblos sin prisa. No hay discotecas ni macrodiscos. Hay mesas de piedra, sombra de castaños, y tiempo que pasa despacio.</p>

      <h2>Cuándo ir</h2>
      <p>Otoño para los castaños y el jamón. Primavera para el verde y las flores. Verano para huir del calor de la costa (aquí hace fresquito). Invierno para el fuego de la chimenea y el cocido.</p>

      <blockquote>La Sierra es el otro Huelva. El de siempre. El que no ha cambiado porque no necesita cambiar.</blockquote>
    `
  },

  // 48. Hablar como onubense
  {
    slug: 'hablar-onubense-expresiones-jerga-huelva',
    title: 'Cómo hablar como un onubense: expresiones que necesitas saber',
    excerpt: 'Guía de supervivencia lingüística: expresiones, jerga y maneras de hablar propias de Huelva. Para que no parezcas de fuera.',
    category: 'Guías Locales',
    image: '/images/guides/huelva-plaza-las-monjas.jpg',
    publishedAt: '2026-02-23T22:35:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>En Huelva no hablamos andaluz estándar. Tenemos nuestro acento, nuestras palabras, nuestras formas. No es mejor ni peor, es de aquí. Si quieres pasar desapercibido o, al menos, entender qué te dicen en el bar, anota esto.</p>

      <h2>Las básicas</h2>
      <ul>
        <li><strong>"Mijo":</strong> no es hijo de nadie, es "mi hijo". "Vente pa'ca, mijo".</li>
        <li><strong>"Arre/Arreo":</strong> echar, tirar. "Arrea eso pa'alla".</li>
        <li><strong>"Chiquillo/a":</strong> niño, pero también forma cariñosa de dirigirse a cualquiera.</li>
        <li><strong>"Guiri":</strong> turista, extranjero. No es ofensivo, es descriptivo.</li>
      </ul>

      <h2>En el bar</h2>
      <ul>
        <li><strong>"Una caña":</strong> cerveza de barril, pequeña. Lo que tomas antes de comer.</li>
        <li><strong>"Una corta":</strong> menos común, pero se entiende: caña corta de espuma.</li>
        <li><strong>"Con mosto":</strong> con poca espuma. Solo los que saben lo piden así.</li>
        <li><strong>"Ponme un chato":</strong> vino de la tierra, en vaso pequeño.</li>
      </ul>

      <h2>Para describir</h2>
      <ul>
        <li><strong>"Mare":</strong> expresión de sorpresa. "¡Mare, qué calor hace!"</li>
        <li><strong>"Fiera":</strong> bien, genial. "Ese choco está fiera".</li>
        <li><strong>"Chungo":</strong> malo, difícil. "El tiempo está chungo".</li>
        <li><strong>"Morro":</strong> cara dura. "Qué morro tiene este".</li>
      </ul>

      <h2>Lo que nunca dirás</h2>
      <p>No digas "vale" al final de cada frase (eso es de Madrid). No digas "hostia" cada dos palabras (eso es de Sevilla). No digas "chaval" (eso es de Málaga). Di "mijo", di "fiera", di "mare". Y si no sabes qué decir, asiente y sonríe.</p>

      <blockquote>El acento de Huelva no se aprende en una guía. Se adquiere bebiendo cañas y escuchando. Pero esto te sirve para empezar.</blockquote>
    `
  },

  // 49. Huelva en 48 horas
  {
    slug: 'huelva-48-horas-itinerario-completo',
    title: 'Huelva en 48 horas: el itinerario que no te puede fallar',
    excerpt: 'Dos días en Huelva: qué ver, dónde comer, y cómo sacarle el máximo partido a un fin de semana en la capital onubense.',
    category: 'Guías Locales',
    image: '/images/guides/huelva-aerea.jpg',
    publishedAt: '2026-02-23T22:40:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>Vienes a Huelva 48 horas. No es mucho, pero es suficiente para entender de qué va esta ciudad. No para verlo todo (eso es imposible), sí para captar la esencia: el contraste entre la historia industrial, la marisma, y el chiringuito de playa.</p>

      <h2>Día 1: Historia y capital</h2>
      <p><strong>Mañana:</strong> Plaza de las Monjas, desayuno en alguna cafetería de toda la vida. Museo de Huelva (gratis, 1 hora). Paseo por el centro: Concepción, calles comerciales.</p>
      <p><strong>Mediodía:</strong> ruta de tapas en el centro. Choco frito, coquinas, gamba si es temporada. Caña y media.</p>
      <p><strong>Tarde:</strong> Muelle del Tinto, Monumento a Colón. Atardecer en el entorno del puerto o en El Conquero para ver la ciudad desde arriba.</p>
      <p><strong>Noche:</strong> cena en el centro o Gran Vía. Tapas, conversación, terraza si hace bueno.</p>

      <h2>Día 2: Naturaleza y alrededores</h2>
      <p><strong>Mañana:</strong> salida temprana a La Rábida (15 minutos). Monasterio, vistas al río. Luego Palos de la Frontera: Fuente Santa, Casa Pinzón.</p>
      <p><strong>Mediodía:</strong> comida en la playa. Punta Umbría o El Portil. Pescaíto frito, cerveza, vistas al Atlántico.</p>
      <p><strong>Tarde:</strong> vuelta a Huelva, paseo por el Parque Moret si quieres sombra, o por la zona del puerto si prefieres movimiento.</p>
      <p><strong>Noche:</strong> última cena, últimas tapas. Recoger fuerzas para volver.</p>

      <h2>Lo que te estás perdiendo (y está bien)</h2>
      <p>No has visto Aracena, ni las minas, ni Ayamonte, ni Doñana. Has visto lo esencial de la capital y un poco de alrededor. Para el resto, necesitas volver. Y lo harás. Si quieres ordenar mejor ese regreso, sigue por <a href="/fin-de-semana">la guía de fin de semana</a>, <a href="/que-ver">qué ver en Huelva</a>, <a href="/donde-comer">dónde comer</a> y <a href="/alojarse">dónde alojarse</a>.</p>

      <blockquote>48 horas en Huelva no son para verlo todo. Son para entender que aquí se vive distinto, más despacio, más de cerca.</blockquote>
    `
  },

  // 50. El Turista vs El Choquero
  {
    slug: 'turista-vs-choquero-huelva-diferencias',
    title: 'Turista vs Choquero: cómo distinguirlos en Huelva',
    excerpt: 'Manual práctico de las diferencias entre quien viene de fuera y quien lleva el ADN onubense. Para reírte y para aprender.',
    category: 'Guías Locales',
    image: '/images/guides/huelva-plaza-las-monjas.jpg',
    publishedAt: '2026-02-23T22:45:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>Hay dos formas de vivir Huelva: como turista o como choquero. No es bueno ni malo, es diferente. Pero si quieres integrarte (o al menos reírte un rato), aquí tienes el manual de diferencias.</p>

      <h2>En la playa</h2>
      <ul>
        <li><strong>Turista:</strong> se pone la toalla a 5 metros de la orilla, se quema en 20 minutos, se queja del viento.</li>
        <li><strong>Choquero:</strong> llega a las 12, se instala lejos del agua (conoce la marea), lleva sombrilla propia, se queda hasta las 8.</li>
      </ul>

      <h2>En el bar</h2>
      <ul>
        <li><strong>Turista:</strong> pide "una cerveza", espera que le pongan aceitunas, se extraña de que no haya tapa gratis.</li>
        <li><strong>Choquero:</strong> pide "una caña", sabe que la tapa se paga aparte, y si el camarero es de confianza, le dice "ponme lo que tengas bueno".</li>
      </ul>

      <h2>Con el choco</h2>
      <ul>
        <li><strong>Turista:</strong> pide "sepia frita", pregunta si tiene salsa tártara, le pone limón encima sin probarlo.</li>
        <li><strong>Choquero:</strong> pide "un choco", lo prueba solo primero, si está bueno no toca el limón, y si está malo se lo dice al camarero sin tapujos.</li>
      </ul>

      <h2>Con el calor</h2>
      <ul>
        <li><strong>Turista:</strong> se queja, busca aire acondicionado, se sorprende de que a las 3 de la tarde todo esté cerrado.</li>
        <li><strong>Choquero:</strong> sabe que a las 3 hay que estar en casa o en la playa. No protesta, se adapta. Y lleva siempre agua en el coche.</li>
      </ul>

      <h2>El punto de inflexión</h2>
      <p>El turista se va y cuenta que ha estado en "Huelva, cerca de Sevilla". El choquero, cuando vuelve de fuera, lo primero que hace es ir a una freiduría. Y sonríe. Porque ya está en casa.</p>

      <blockquote>No naces choquero. Te haces. Pero empiezas por respetar el choco, la caña, y la siesta. Lo demás viene solo.</blockquote>
    `
  },

  // 51. Mejores playas de Huelva
  {
    slug: 'mejores-playas-huelva-guia-real',
    title: 'Las mejores playas de Huelva: guía real para no ir a ciegas',
    excerpt: 'Qué playa elegir en Huelva según el plan: familiar, salvaje, cómoda, con ambiente o para desconectar de verdad.',
    category: 'Guías Locales',
    image: '/images/guides/costa-huelva.jpg',
    publishedAt: '2026-04-02T09:00:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>Huelva tiene costa para aburrir, pero no todas las playas sirven para lo mismo. Una cosa es querer aparcar fácil con niños y otra buscar dunas, silencio o un chiringuito decente. Esta guía va de elegir bien y no perder el día haciendo el primo.</p>

      <h2>Si quieres comodidad: Punta Umbría</h2>
      <p>Es la opción fácil. Cerca de la capital, con servicios, bares, paseo y ambiente. No es la playa más salvaje ni la más fotogénica, pero funciona. Para ir sin complicarte la vida, cumple de sobra.</p>

      <h2>Si quieres amplitud y verano clásico: Matalascañas</h2>
      <p>Matalascañas es enorme. Hay sitio, hay tradición veraniega y hay mezcla de familias, chavales y gente que lleva veraneando ahí media vida. Si te toca viento, cambia bastante la experiencia, así que conviene mirar el tiempo antes de salir.</p>

      <h2>Si quieres equilibrio: El Portil y Nuevo Portil</h2>
      <p>Menos escándalo que Punta Umbría y bastante más tranquilidad. Buena opción para pasear, desconectar y comer luego con cierta calma. No vende tanto humo y quizá por eso gusta más a quien repite.</p>

      <h2>Si quieres ambiente de siempre: La Antilla e Islantilla</h2>
      <p>Aquí hay vida, paseo, familias, terrazas y sensación de vacaciones de toda la vida. Perfecta si quieres playa + helado + paseo + cena sin coger el coche para todo. Si buscas soledad monástica, no es esto.</p>

      <h2>Si quieres naturaleza más cruda: Cuesta Maneli o zonas abiertas de Doñana</h2>
      <p>Aquí vienes por paisaje, no por comodidad. Menos servicios, más arena, más sensación de costa en bruto. Es mejor planearlo bien: agua, sombra y cabeza. Si no, la épica se te convierte en castigo.</p>

      <h2>Cómo elegir sin equivocarte</h2>
      <ul>
        <li><strong>Niños y logística:</strong> Punta Umbría o Islantilla.</li>
        <li><strong>Pareja y calma:</strong> El Portil o zonas menos masificadas.</li>
        <li><strong>Día completo con paseo:</strong> La Antilla.</li>
        <li><strong>Playa grande y clásica:</strong> Matalascañas.</li>
        <li><strong>Naturaleza y menos gente:</strong> entorno Doñana.</li>
      </ul>

      <p>Si después quieres aterrizar la elección en un viaje más completo, enlaza con <a href="/playas">la guía de playas de Huelva</a> y con <a href="/fin-de-semana">planes de fin de semana</a> para no quedarte solo en “qué playa”, sino también en “qué hago alrededor”.</p>

      <blockquote>La mejor playa de Huelva no existe. Existe la mejor para el plan que llevas hoy. Si no distingues eso, acabas cabreado con arena hasta en el DNI.</blockquote>
    `
  },

  // 52. Qué hacer en Huelva con niños
  {
    slug: 'que-hacer-en-huelva-con-ninos',
    title: 'Qué hacer en Huelva con niños sin caer en el plan cutre',
    excerpt: 'Ideas reales para familias en Huelva: playa, naturaleza, paseos, visitas fáciles y planes que no se hacen bola.',
    category: 'Guías Locales',
    image: '/images/guides/parque-moret.jpg',
    publishedAt: '2026-04-02T09:10:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>Cuando vas con niños, el plan perfecto dura exactamente hasta que alguien tiene hambre, calor o se aburre. Así que en Huelva conviene pensar menos en “hacer muchas cosas” y más en encadenar planes sencillos que no te revienten el día.</p>

      <h2>Parque Moret: la salida fácil que suele funcionar</h2>
      <p>Es amplio, al aire libre y permite correr sin demasiada ceremonia. Si lo que necesitas es soltar energía y no gastar una fortuna, es una opción bastante sensata dentro de la capital.</p>

      <h2>La Rábida: historia que entra mejor si no la conviertes en clase</h2>
      <p>El entorno de La Rábida funciona bien porque mezcla paseo, aire libre y un punto de historia sin exigir demasiado. Si vas en modo ligero y no pretendes recitar fechas, puede salir muy bien.</p>

      <h2>Playas cómodas para familias</h2>
      <p>Punta Umbría, Islantilla o La Antilla suelen darte mejor logística: acceso razonable, más servicios y menos drama. Si el plan depende de baños, sombras y comida cerca, no inventes demasiado. Para elegir bien según distancia, servicios y tipo de día, mira también <a href="/playas">la guía de playas de Huelva</a>.</p>

      <h2>Muelle del Tinto al atardecer</h2>
      <p>Paseo corto, fotogénico y con sensación de sitio especial. No hace falta convertirlo en expedición. Llegas, paseas, haces fotos y luego te vas a cenar algo. Eso ya cuenta como plan bueno.</p>

      <h2>Consejos para no liarla</h2>
      <ul>
        <li>Evita las horas centrales si hace calor fuerte.</li>
        <li>No metas coche, museo, playa y cena el mismo día como si fueras un touroperador poseído.</li>
        <li>Ten siempre un plan B de comida rápida decente.</li>
        <li>Menos sitios, mejor elegidos.</li>
      </ul>

      <p>Si quieres montar algo más completo sin volverte loco, cruza esta guía con <a href="/que-ver">qué ver en Huelva</a> y con <a href="/fin-de-semana">planes de fin de semana</a>. Así pasas de “a ver qué hacemos” a un día medio resuelto.</p>

      <blockquote>Con niños no gana el plan más ambicioso. Gana el que sale limpio, fácil y sin berrinche colectivo a las seis de la tarde.</blockquote>
    `
  },

  // 53. Pueblos bonitos de la Sierra de Huelva
  {
    slug: 'pueblos-bonitos-sierra-huelva',
    title: 'Pueblos bonitos de la Sierra de Huelva para una escapada que merezca la pena',
    excerpt: 'Aracena, Alájar, Cortegana, Jabugo y otros pueblos de la sierra para comer bien, pasear y salir del ruido.',
    category: 'Guías Locales',
    image: '/images/guides/aracena-pueblo.jpg',
    publishedAt: '2026-04-02T09:20:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>La Sierra de Huelva es la respuesta correcta cuando la costa aprieta, la ciudad cansa o simplemente te apetece comer como una persona decente. No hace falta montar un retiro espiritual: con un día bien pensado ya te cambia el humor.</p>

      <h2>Aracena: la puerta obvia, y con razón</h2>
      <p>Tiene tirón porque funciona. Gruta, castillo, calles con pendiente, bares, ambiente y suficientes cosas para justificar la escapada. Es la más conocida, sí. También una de las más seguras para acertar.</p>

      <h2>Alájar: pequeño, bonito y con ese punto especial</h2>
      <p>No necesitas que te vendan demasiado. Basta pasearlo. Casas blancas, entorno serrano y la Peña de Arias Montano dominando la zona. Si quieres bajar revoluciones, este encaja muy bien.</p>

      <h2>Cortegana: castillo y sierra con personalidad</h2>
      <p>El castillo le da presencia y el pueblo tiene más cuerpo del que parece a primera vista. Buen sitio para mezclar paseo, foto y comida con fundamento. No es decorado: tiene vida propia.</p>

      <h2>Jabugo: aquí se viene a entender el jamón</h2>
      <p>No es solo una marca famosa. Es contexto, dehesa, industria, cultura y producto. Si vienes con hambre y curiosidad, sales mejor de lo que entraste. Y probablemente más caro, pero eso ya es otra historia.</p>

      <h2>Cómo montar la escapada</h2>
      <ul>
        <li><strong>Una sola base:</strong> Aracena si quieres comodidad.</li>
        <li><strong>Ruta corta:</strong> Aracena + Alájar.</li>
        <li><strong>Ruta con producto:</strong> Jabugo + pueblos cercanos.</li>
        <li><strong>Si vas sin prisa:</strong> añade Cortegana.</li>
      </ul>

      <p>Para encajarlo dentro de una visita más amplia, apóyate en <a href="/fin-de-semana">la guía de fin de semana</a> y en <a href="/que-ver">qué ver en Huelva y provincia</a>. Así conviertes pueblos sueltos en un plan con lógica.</p>

      <p>Y si quieres convertir pueblos bonitos en ruta útil, enlázalos con <a href="/fin-de-semana">planes de fin de semana</a> y con <a href="/que-ver">qué ver en Huelva y provincia</a>.</p>

      <blockquote>La Sierra de Huelva no se disfruta corriendo. Se disfruta comiendo, andando y dejando que el día vaya un poco más lento. Rarísimo concepto, ya.</blockquote>
    `
  },

  // 54. Dónde tapear en Huelva
  {
    slug: 'donde-tapear-en-huelva',
    title: 'Dónde tapear en Huelva sin caer en la trampa para guiris',
    excerpt: 'Una guía práctica para tapear en Huelva con cabeza: zonas que funcionan, qué pedir y cómo detectar un sitio que merece la pena.',
    category: 'Gastronomía',
    image: '/images/guides/choco-frito-tapa.jpg',
    publishedAt: '2026-04-02T10:00:00Z',
    author: 'Rocío Limón',
    isAi: true,
    content: `
      <p>Tapear en Huelva no consiste en sentarte en la primera terraza con sol y entregarte al destino. Hay sitios que cumplen, otros que viven de la inercia y algunos que parecen hechos para cazar al despistado. Si quieres comer bien, conviene distinguirlos.</p>

      <h2>Empieza por el centro, pero no te enamores de lo primero</h2>
      <p>El centro concentra opciones y eso está bien para arrancar, pero también mete ruido. Mira rotación, mira si hay gente local y mira si la carta parece pensada para comer o para sobrevivir con cuatro fotos plastificadas. La diferencia se nota rápido.</p>

      <h2>Qué pedir para medir un sitio</h2>
      <ul>
        <li><strong>Choco frito:</strong> si esto falla, mal asunto.</li>
        <li><strong>Coquinas:</strong> producto, limpieza y punto. Aquí se retratan solos.</li>
        <li><strong>Ensaladilla o tapa fría:</strong> útil para detectar desgana.</li>
        <li><strong>Algo fuera de carta:</strong> si existe, normalmente hay cocina viva detrás.</li>
      </ul>

      <h2>Cómo detectar trampa</h2>
      <p>Si todo parece pensado para que hagas una foto y nada para que repitas, sospecha. Si el camarero no sabe recomendarte nada, peor. Y si el pescado sabe a trámite, vete cerrando la cuenta y sigue tu vida. Para afinar todavía más, cruza esta pieza con <a href="/donde-comer">dónde comer en Huelva</a> y con las guías específicas de <a href="/article/choco-frito-huelva-como-se-come-bien">choco frito</a> y <a href="/article/coquinas-huelva-como-comer">coquinas</a>.</p>

      <h2>Zonas y lógica</h2>
      <p>Centro para empezar. Barrios o zonas menos obvias para afinar. Costa si el día pide mar. No hay un único “mejor sitio”; hay contextos. Lo inteligente es decidir según hambre, hora y compañía.</p>

      <p>Si quieres ir un paso más allá de la tapa suelta, remata con <a href="/donde-comer">la guía de dónde comer en Huelva</a>, que es donde separas picoteo de comida seria.</p>

      <blockquote>La mejor ruta de tapas en Huelva no la gana el sitio más mono. La gana el que te hace pedir una ronda más porque está todo bueno. Fin del misterio.</blockquote>
    `
  },

  // 55. Qué ver en Huelva en un día
  {
    slug: 'que-ver-en-huelva-en-un-dia',
    title: 'Qué ver en Huelva en un día para salir con la sensación de haber acertado',
    excerpt: 'Un recorrido realista por Huelva en un día: centro, historia, paseo, comida y un cierre digno sin hacer turismo a martillazos.',
    category: 'Guías Locales',
    image: '/images/guides/huelva-aerea.jpg',
    publishedAt: '2026-04-02T10:15:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>Si solo tienes un día en Huelva, la clave no es meter veinte cosas. La clave es elegir un hilo lógico: centro, historia, comida, paseo y un buen final. Así entiendes la ciudad sin convertir el día en una oposición.</p>

      <h2>Mañana: centro y primeras referencias</h2>
      <p>Empieza por Plaza de las Monjas y las calles del centro. Desayuna bien, pasea sin prisa y entiende rápido la escala real de la ciudad. Huelva no se disfruta corriendo como si fueras a sellar una gymkana.</p>

      <h2>Media mañana: Museo o entorno colombino</h2>
      <p>Si quieres ciudad, Museo de Huelva. Si prefieres contexto histórico más amplio y tienes coche, La Rábida te da bastante retorno por poco esfuerzo. Las dos opciones son sensatas; lo absurdo es intentar hacer ambas como si nada.</p>

      <h2>Mediodía: comer como toca</h2>
      <p>Este tramo importa mucho. Choco, coquinas, pescado o una ruta de tapas bien resuelta. Huelva gana bastante cuando comes donde debes y pierde mucho cuando improvisas mal.</p>

      <h2>Tarde: Muelle del Tinto y paseo</h2>
      <p>El Muelle del Tinto no falla. Tiene historia, imagen potente y paseo agradable. Si pillas buena luz, además te llevas las fotos fáciles sin tener que inventar demasiado.</p>

      <h2>Final del día: mirador, terraza o paseo largo</h2>
      <p>Remata con vistas, terraza o un paseo tranquilo. Huelva no necesita un final épico; necesita uno coherente. Si acabas bien comido y con la sensación de haber respirado otro ritmo, ya has acertado. Y si luego decides alargar, te conviene saltar a <a href="/que-ver">qué ver en Huelva</a>, <a href="/fin-de-semana">planes para un fin de semana</a> y <a href="/donde-comer">dónde comer bien</a>.</p>

      <blockquote>En un día no vas a “tachar Huelva”. Vas a entenderla lo justo para querer volver. Y eso, sinceramente, ya es una victoria.</blockquote>
    `
  },

  // 56. Escapadas desde Huelva
  {
    slug: 'escapadas-desde-huelva-un-dia',
    title: 'Las mejores escapadas desde Huelva para un día sin desperdicio',
    excerpt: 'Ideas de escapadas desde Huelva capital: sierra, costa, pueblos y planes de un día que sí compensan el desplazamiento.',
    category: 'Guías Locales',
    image: '/images/guides/ayamonte-huelva.jpg',
    publishedAt: '2026-04-02T10:30:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>Huelva capital está bien colocada para hacer escapadas muy decentes sin tragarte media vida en carretera. La clave es no querer abarcar demasiadas cosas en un solo día. Una buena escapada no es la que más kilómetros mete, sino la que te deja volver contento y no reventado.</p>

      <h2>Aracena y sierra: cuando quieres aire y comida seria</h2>
      <p>Es la escapada clásica y sigue siéndolo porque funciona. Paseas, comes bien y cambias de paisaje de verdad. Muy buena opción cuando apetece montaña suave y bajar ruido mental.</p>

      <h2>Ayamonte: frontera, paseo y otro ritmo</h2>
      <p>Tiene personalidad, mezcla de río y frontera, y ese punto de sitio que no va con prisas. Si te gusta pasear, comer tranquilo y sentir que has salido de la rutina sin volverte loco, entra muy bien.</p>

      <h2>Punta Umbría o El Portil: solución rápida si manda el mar</h2>
      <p>Para día de playa o paseo costero, son salidas fáciles desde la capital. Menos épica, más practicidad. Y a veces eso es exactamente lo correcto.</p>

      <h2>La Rábida y Palos: historia sin paliza</h2>
      <p>Muy recomendables cuando quieres media jornada con sentido histórico y sin grandes desplazamientos. En relación esfuerzo/retorno, salen bastante fuertes.</p>

      <h2>Cómo elegir</h2>
      <ul>
        <li><strong>Si quieres comer bien y desconectar:</strong> sierra.</li>
        <li><strong>Si quieres paseo con carácter:</strong> Ayamonte.</li>
        <li><strong>Si quieres mar sin complicarte:</strong> Punta Umbría o El Portil.</li>
        <li><strong>Si quieres historia cercana:</strong> La Rábida y Palos.</li>
      </ul>

      <p>Si quieres convertir esta escapada en un plan más redondo, enlázala con <a href="/fin-de-semana">la guía de fin de semana en Huelva</a>, <a href="/playas">las mejores playas</a> y <a href="/que-ver">qué ver en la provincia</a> según el tipo de viaje.</p>

      <blockquote>La escapada buena no es la más ambiciosa. Es la que te hace volver pensando “esto lo repito”, no “a ver cuándo me recupero”.</blockquote>
    `
  },

  // 57. Mejores restaurantes en Huelva
  {
    slug: 'mejores-restaurantes-huelva',
    title: 'Los mejores restaurantes en Huelva para comer bien sin postureo',
    excerpt: 'Restaurantes en Huelva para comer producto, cocina seria y sitios que merecen una reserva. Menos ruido, más criterio.',
    category: 'Gastronomía',
    image: '/images/guides/coquinas-huelva.jpg',
    publishedAt: '2026-04-02T11:00:00Z',
    author: 'Rocío Limón',
    isAi: true,
    content: `
      <p>Buscar “mejores restaurantes en Huelva” suele darte dos cosas: listas copiadas unas de otras o sitios que viven más de la foto que del plato. Así que vamos a lo importante: producto, regularidad, contexto y sentido común.</p>

      <h2>Lo primero: en Huelva manda el producto</h2>
      <p>Aquí el restaurante bueno no necesita hacer veinte piruetas si tiene buena materia prima y cocina con cabeza. Marisco, pescado, chacina, temporada. Si eso falla, da igual cuántas bombillitas tenga el local.</p>

      <h2>Qué distingue un sitio serio</h2>
      <ul>
        <li><strong>Carta corta o con criterio:</strong> no una enciclopedia infumable.</li>
        <li><strong>Producto con rotación:</strong> se nota en pescado y marisco.</li>
        <li><strong>Servicio que recomienda:</strong> no solo apunta comanda.</li>
        <li><strong>Coherencia precio-experiencia:</strong> si pagas, que se note por qué.</li>
      </ul>

      <h2>Qué tipo de restaurante buscar según el plan</h2>
      <p>Si vas a producto, busca cocina onubense y carta con verdad. Si quieres cena más fina, hay sitios que elevan la experiencia sin volverse ridículos. Si vas en modo tapeo largo, a veces un bar excelente le gana la partida a un restaurante mediocre con mantel.</p>

      <h2>Errores típicos</h2>
      <p>Elegir por estética, por estar “cerca” o por reseñas que parecen escritas por primos del dueño. En Huelva se come muy bien, sí, pero no por arte de magia. Hay que elegir con un mínimo de criterio.</p>

      <blockquote>El mejor restaurante no siempre es el más famoso. Muchas veces es el que entiende mejor el producto y no intenta impresionarte con gilipolleces.</blockquote>
    `
  },

  // 58. Qué hacer en Huelva en abril
  {
    slug: 'que-hacer-en-huelva-en-abril',
    title: 'Qué hacer en Huelva en abril: planes, clima y escapadas que sí apetecen',
    excerpt: 'Abril en Huelva pide calle, costa, sierra y agenda. Una guía útil para saber qué hacer este mes sin improvisar mal.',
    category: 'Eventos',
    image: '/images/guides/feria-huelva.jpg',
    publishedAt: '2026-04-02T11:10:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>Abril le sienta bien a Huelva. El calor todavía no aprieta del todo, la luz mejora, la costa empieza a llamar y la sierra sigue teniendo sentido. Es uno de esos meses en los que casi cualquier buen plan parece más fácil.</p>

      <h2>Capital: pasear y comer fuera vuelve a tener gracia</h2>
      <p>Centro, terrazas, Muelle del Tinto, alguna visita cultural ligera y tapeo. Abril permite recuperar la calle sin sufrirla. Ya solo por eso merece la pena aprovecharlo.</p>

      <h2>Costa: primeras escapadas serias</h2>
      <p>Quizá no sea todavía verano pleno, pero sí un mes muy bueno para ir a Punta Umbría, El Portil, Islantilla o La Antilla a pasear, comer o incluso pisar playa si sale buen día.</p>

      <h2>Sierra: todavía muy fuerte</h2>
      <p>Aracena y alrededores siguen funcionando de lujo en abril. Comer bien, aire fresco, pueblos bonitos y un ritmo más humano. Muy buena contraoferta al ruido de ciudad.</p>

      <h2>Cómo usar abril inteligentemente</h2>
      <ul>
        <li>Si hace buen tiempo: costa.</li>
        <li>Si quieres comer y pasear: sierra.</li>
        <li>Si solo tienes unas horas: capital + muelle + tapas.</li>
        <li>Si hay agenda local fuerte ese finde: prioriza evento + comida.</li>
      </ul>

      <p>Para convertir abril en plan concreto, salta a <a href="/playas">las mejores playas de Huelva</a>, <a href="/fin-de-semana">planes de fin de semana</a> y <a href="/que-ver">qué ver en capital y provincia</a>. Ahí es donde decides de verdad.</p>

      <p>Y elegir bien aquí significa una cosa: si sale día de costa, abre <a href="/playas">playas</a>; si sale día de recorrido, abre <a href="/que-ver">qué ver en Huelva</a>.</p>

      <blockquote>Abril en Huelva no pide heroicidades. Pide elegir bien y salir. Con eso ya le sacas mucho partido al mes.</blockquote>
    `
  },

  // 59. Qué ver en la provincia de Huelva
  {
    slug: 'provincia-de-huelva-que-ver',
    title: 'Qué ver en la provincia de Huelva si quieres ir más allá de lo obvio',
    excerpt: 'Costa, sierra, historia, pueblos y espacios naturales. Una guía para entender qué ver en la provincia de Huelva con criterio.',
    category: 'Guías Locales',
    image: '/images/guides/costa-huelva.jpg',
    publishedAt: '2026-04-02T11:20:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>La provincia de Huelva tiene un problema curioso: mucha gente la reduce a una sola cosa. Playa, jamón, El Rocío o poco más. Error. Lo bueno de Huelva está precisamente en la mezcla: costa, sierra, marismas, historia, frontera y pueblos con mucha más personalidad de la que aparentan.</p>

      <h2>La costa: mucho más que tumbarse al sol</h2>
      <p>Punta Umbría, El Rompido, Islantilla, La Antilla, Ayamonte, Isla Cristina o Matalascañas. Hay playas, sí, pero también paseos, puertos, gastronomía y ritmos distintos según la zona.</p>

      <h2>La sierra: el otro gran mundo onubense</h2>
      <p>Aracena, Alájar, Cortegana, Jabugo y compañía. Aquí cambian el paisaje, la comida y hasta la cadencia del día. Si vienes buscando equilibrio, la sierra suele devolver mucho.</p>

      <h2>Entorno colombino e historia</h2>
      <p>La Rábida, Palos de la Frontera, Moguer y otros puntos ligados al imaginario del descubrimiento. Más allá de la chapa escolar, bien vistos tienen bastante interés.</p>

      <h2>Naturaleza potente</h2>
      <p>Doñana, Marismas del Odiel y otros espacios que no están para rellenar un folleto. Son parte de la identidad real de la provincia y una ventaja competitiva enorme frente a destinos más artificiales.</p>

      <blockquote>La provincia de Huelva no se visita bien con una lista absurda de “10 cosas”. Se entiende mejor por zonas, ritmos y planes. Cuando haces eso, de repente gana mucho.</blockquote>
    `
  }
];
