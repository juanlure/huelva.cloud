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
  }
];
