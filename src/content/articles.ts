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

// Fuente única editorial: GitHub (manual)
// Regla: contenido útil, más profundidad y portada local real
export const LOCAL_ARTICLES: LocalArticle[] = [
  {
    slug: 'huelva-cloud-metodologia-verificacion-local',
    title: 'Cómo verificamos cada noticia en Huelva.cloud (metodología local)',
    excerpt: 'Nuestro proceso editorial para publicar con rigor en Huelva y provincia: fuente primaria, doble validación y actualización visible.',
    category: 'Noticias',
    image: '/images/guides/ayuntamiento-huelva.jpg',
    publishedAt: '2026-02-22T21:20:00Z',
    author: 'Manuel V. Cinta',
    isAi: true,
    content: `
      <p>Para ser referencia local no basta con publicar rápido. Hay que publicar bien. En Huelva.cloud trabajamos con una regla básica: primero datos, luego narrativa.</p>
      <h2>Qué comprobamos antes de dar una noticia</h2>
      <ul>
        <li>Fuente primaria: institución, entidad organizadora o documento oficial.</li>
        <li>Datos críticos: fecha, hora, ubicación y alcance real del hecho.</li>
        <li>Contexto local: por qué esa información importa en Huelva o en la provincia.</li>
      </ul>
      <h2>Cómo corregimos</h2>
      <p>Si una agenda cambia o una información se matiza, actualizamos el artículo y dejamos trazabilidad en el propio contenido. No maquillamos errores: los corregimos.</p>
      <blockquote>Ritmo sí, humo no. Ese es el estándar.</blockquote>
    `
  },
  {
    slug: 'agenda-huelva-esta-semana-claves',
    title: 'Agenda de Huelva esta semana: cómo no perderte lo importante',
    excerpt: 'Resumen práctico para organizar la semana en capital y provincia: cultura, planes y recomendaciones útiles.',
    category: 'Eventos',
    image: '/images/guides/monumento-colon-monjas.jpg',
    publishedAt: '2026-02-22T21:15:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>La agenda local se mueve rápido: hoy hay plan, mañana cambia un horario y pasado se cae un evento. Por eso aquí priorizamos utilidad real.</p>
      <h2>Qué mirar primero</h2>
      <ul>
        <li>Eventos con fecha y hora confirmadas.</li>
        <li>Lugar exacto y mejor franja para llegar.</li>
        <li>Precio, reserva previa y plan B si hay cambios.</li>
      </ul>
      <h2>Capital + provincia</h2>
      <p>No nos quedamos solo en Huelva ciudad. Cada semana incluimos rotación de pueblos para cubrir actividad cultural y social de toda la provincia.</p>
      <p>Consejo práctico: decide dos planes cerrados y uno flexible para no depender de una sola opción.</p>
    `
  },
  {
    slug: 'ruta-gamba-blanca-huelva-capital',
    title: 'Ruta de gamba blanca en Huelva capital: 5 paradas con criterio',
    excerpt: 'Guía práctica para disfrutar producto onubense de verdad, sin postureo y con sentido común.',
    category: 'Gastronomía',
    image: '/images/guides/gambas-blancas-huelva.jpg',
    publishedAt: '2026-02-22T21:10:00Z',
    author: 'Rocío Limón',
    isAi: true,
    content: `
      <p>La gamba blanca de Huelva no necesita artificio. Necesita producto fresco, cocción bien hecha y barra honesta.</p>
      <h2>Cómo distinguir un sitio serio</h2>
      <ul>
        <li>Te explican producto y procedencia sin rodeos.</li>
        <li>La carta no intenta esconder el mar con salsas.</li>
        <li>El punto de sal y cocción está cuidado, no improvisado.</li>
      </ul>
      <h2>Errores típicos</h2>
      <p>Pedir “marisco surtido” sin criterio y acabar pagando por relleno. Mejor ir a pocas cosas y bien elegidas.</p>
      <blockquote>En Huelva, menos cuento y más producto.</blockquote>
    `
  },
  {
    slug: 'muelle-tinto-atardecer-guia-real',
    title: 'Muelle del Tinto: hora ideal para ver el atardecer sin agobios',
    excerpt: 'Guía rápida para disfrutar uno de los atardeceres más potentes de Huelva con buena luz y mejor posición.',
    category: 'Playa y Naturaleza',
    image: '/images/guides/muelle-tinto-sunset.jpg',
    publishedAt: '2026-02-22T21:05:00Z',
    author: 'Carmen Doñana',
    isAi: true,
    content: `
      <p>El Muelle del Tinto es un clásico local por una razón: cuando la luz acompaña, la escena es brutal.</p>
      <h2>Mejor franja</h2>
      <p>Llega entre 35 y 45 minutos antes de la puesta. Así pillas la transición completa de color y no solo la foto final.</p>
      <h2>Qué llevar</h2>
      <ul>
        <li>Calzado cómodo para caminar sin prisas.</li>
        <li>Chaqueta ligera en meses de viento.</li>
        <li>Agua y tiempo: correr aquí no tiene sentido.</li>
      </ul>
      <p>Si buscas calma, evita la punta de fin de semana.</p>
    `
  },
  {
    slug: 'el-rocio-guia-principiantes',
    title: 'El Rocío para principiantes: logística, respeto y contexto',
    excerpt: 'Una guía clara para entender El Rocío sin improvisar: cuándo ir, cómo moverte y qué evitar.',
    category: 'Guías Locales',
    image: '/images/guides/iglesia-rocio-huelva.jpg',
    publishedAt: '2026-02-22T21:00:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>El Rocío no se resume en una postal. Es tradición viva, con tiempos propios y mucha logística.</p>
      <h2>Antes de salir</h2>
      <ul>
        <li>Define objetivo: visita cultural, peregrinación o escapada de día.</li>
        <li>Revisa acceso y aparcamiento con antelación.</li>
        <li>Respeta entorno y normas locales.</li>
      </ul>
      <h2>Qué no hacer</h2>
      <p>Ir sin plan y tratar la zona como parque temático. El resultado suele ser perder tiempo y no entender nada.</p>
    `
  },
  {
    slug: 'fiesta-tinajas-trigueros',
    title: 'Fiesta de las Tinajas en Trigueros: plan de provincia con sentido',
    excerpt: 'Claves para aprovechar bien la cita: horarios, acceso y cómo organizar la visita.',
    category: 'Eventos',
    image: '/images/guides/calle-huelva-centro.jpg',
    publishedAt: '2026-02-22T20:55:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>Trigueros tiene citas que merecen viaje corto desde capital. Esta es una de ellas si te gusta ambiente local real.</p>
      <h2>Checklist rápido</h2>
      <ul>
        <li>Horario oficial actualizado.</li>
        <li>Ruta de ida/vuelta cerrada antes de salir.</li>
        <li>Plan de aparcamiento para no perder media tarde.</li>
      </ul>
      <p>Si vas en grupo, mejor llegar escalonado y quedar en un punto claro.</p>
    `
  },
  {
    slug: 'ayamonte-casco-historico-y-tapeo',
    title: 'Ayamonte en un día: casco histórico, tapeo y paseo por el Guadiana',
    excerpt: 'Plan útil para exprimir Ayamonte sin correr: ruta urbana, mesa local y cierre de tarde con vistas.',
    category: 'Guías Locales',
    image: '/images/guides/calle-huelva-centro.jpg',
    publishedAt: '2026-02-22T20:50:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>Ayamonte funciona mejor con ritmo tranquilo: calle, barra y paseo. No necesita más.</p>
      <h2>Ruta recomendada</h2>
      <ul>
        <li>Mañana: centro y plazas principales.</li>
        <li>Mediodía: tapeo con producto local.</li>
        <li>Tarde: cierre junto al río para bajar revoluciones.</li>
      </ul>
      <p>Si el día acompaña, es plan redondo de provincia.</p>
    `
  },
  {
    slug: 'aracena-que-hacer-fin-de-semana',
    title: 'Aracena de fin de semana: cueva, sierra y mesa con sello onubense',
    excerpt: 'Guía realista para organizar escapada: qué ver primero, dónde parar y cómo evitar colas.',
    category: 'Guías Locales',
    image: '/images/guides/jamon-iberico-bellota.jpg',
    publishedAt: '2026-02-22T20:45:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>Aracena combina patrimonio, naturaleza y cocina. Si ordenas bien el día, cunde muchísimo.</p>
      <h2>Prioridades</h2>
      <ul>
        <li>Primera hora: Gruta de las Maravillas.</li>
        <li>Después: casco histórico y entorno del castillo.</li>
        <li>Cierre: mesa con protagonismo del ibérico.</li>
      </ul>
      <p>Recomendación: reserva lo importante con margen en fines de semana de alta demanda.</p>
    `
  }
];
