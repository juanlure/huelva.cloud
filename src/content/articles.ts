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
export const LOCAL_ARTICLES: LocalArticle[] = [
  {
    slug: 'atardeceres-costa-luz-huelva',
    title: 'Atardeceres en la Costa de la Luz: guía onubense sin postureo',
    excerpt: 'Dónde ver los mejores atardeceres de la costa onubense y qué hacer en cada zona para aprovechar la tarde.',
    category: 'Guías Locales',
    image: '/images/guides/playa-punta-umbria.jpg',
    publishedAt: '2026-02-22T19:35:00Z',
    author: 'Carmen Doñana',
    isAi: true,
    content: `
      <p>En la Costa de la Luz no hay dos atardeceres iguales. Si vas con prisa, no lo vas a disfrutar. Si vas con tiempo, te llevas media vida en la retina.</p>
      <h2>Punta Umbría para una tarde fácil</h2>
      <p>Plan cómodo: paseo, playa, y remate en terraza. Ideal para ir sin complicarte.</p>
      <h2>Mazagón para horizonte abierto</h2>
      <p>Más amplitud y menos ruido. Lleva algo de abrigo al caer el sol en meses frescos.</p>
      <blockquote>Consejo choquero: llega 40 minutos antes del ocaso y no te pegues al coche.</blockquote>
    `
  },
  {
    slug: 'el-rocio-guia-principiantes',
    title: 'El Rocío para principiantes: lo que debes saber antes de ir',
    excerpt: 'Una guía clara para disfrutar El Rocío con respeto, logística y cabeza.',
    category: 'Guías Locales',
    image: '/images/guides/iglesia-rocio-huelva.jpg',
    publishedAt: '2026-02-22T19:36:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>El Rocío no se entiende en una tarde. Pero sí puedes evitar errores típicos con una preparación básica.</p>
      <h2>Cuándo ir</h2>
      <p>Depende del objetivo: peregrinación, fin de semana tranquilo o visita cultural.</p>
      <h2>Respeto y contexto</h2>
      <p>No es un parque temático. Es tradición viva y hay que entrar con esa mentalidad.</p>
    `
  },
  {
    slug: 'fiesta-tinajas-trigueros',
    title: 'Fiesta de las Tinajas en Trigueros: plan local con sabor a provincia',
    excerpt: 'Horarios, ambiente y claves para aprovechar una de las citas más auténticas de la agenda local.',
    category: 'Eventos',
    image: '/images/guides/monumento-colon-monjas.jpg',
    publishedAt: '2026-02-22T19:37:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>Si buscas un evento con ambiente local real, esta fiesta merece sitio en la agenda.</p>
      <h2>Qué mirar antes de ir</h2>
      <ul>
        <li>Horario oficial actualizado</li>
        <li>Zonas de aparcamiento</li>
        <li>Condiciones meteorológicas</li>
      </ul>
      <p>La clave es llegar con margen y planificar la vuelta.</p>
    `
  },
  {
    slug: 'como-verificamos-noticias-huelva-cloud',
    title: 'Cómo verificamos las noticias en Huelva.cloud (y por qué importa)',
    excerpt: 'Nuestra metodología editorial para cubrir Huelva y provincia con rigor: fuente primaria, contexto local y actualización continua.',
    category: 'Noticias',
    image: '/images/guides/ayuntamiento-huelva.jpg',
    publishedAt: '2026-02-22T20:40:00Z',
    author: 'Manuel V. Cinta',
    isAi: true,
    content: `
      <p>Si quieres que un medio local sea útil, tiene que ser fiable. En Huelva.cloud no publicamos por rellenar: publicamos para que te sirva.</p>
      <h2>Qué verificamos antes de publicar</h2>
      <ul>
        <li>Fuente primaria cuando exista (institución, entidad u organizador).</li>
        <li>Fecha, hora y ubicación en piezas de agenda.</li>
        <li>Contexto local real: qué cambia para Huelva y provincia.</li>
      </ul>
      <h2>Qué corregimos rápido</h2>
      <p>Si un horario cambia o un evento se cancela, actualizamos la pieza y lo dejamos indicado.</p>
    `
  },
  {
    slug: 'ruta-gamba-blanca-huelva-capital',
    title: 'Ruta de gamba blanca en Huelva capital: 5 paradas con criterio',
    excerpt: 'Una guía práctica para disfrutar producto onubense de verdad, sin postureo y con sentido común.',
    category: 'Gastronomía',
    image: '/images/guides/gambas-blancas-huelva.jpg',
    publishedAt: '2026-02-22T20:45:00Z',
    author: 'Rocío Limón',
    isAi: true,
    content: `
      <p>La gamba blanca de Huelva no necesita maquillaje. Necesita producto bueno, punto de cocción y sitio honesto.</p>
      <h2>Cómo elegir bien</h2>
      <ul>
        <li>Pregunta por procedencia y frescura del día.</li>
        <li>Evita sitios donde todo sabe igual: mala señal.</li>
        <li>Menos salsa, más producto.</li>
      </ul>
      <blockquote>En Huelva se viene a comer bien, no a hacer teatro.</blockquote>
    `
  },
  {
    slug: 'atardecer-muelle-tinto-hora-ideal',
    title: 'Muelle del Tinto: hora ideal para el atardecer y dónde colocarte',
    excerpt: 'Guía rápida para ver el atardecer en el Muelle del Tinto con buena luz y sin agobios.',
    category: 'Playa y Naturaleza',
    image: '/images/guides/muelle-tinto-sunset.jpg',
    publishedAt: '2026-02-22T20:50:00Z',
    author: 'Carmen Doñana',
    isAi: true,
    content: `
      <p>Hay días de foto fácil y días de viento peleón. Si quieres aprovechar bien el Muelle del Tinto, llega con margen.</p>
      <h2>Cuándo ir</h2>
      <p>Lo ideal: 35-45 minutos antes de la puesta de sol para ver el cambio completo de luz.</p>
      <h2>Consejos rápidos</h2>
      <ul>
        <li>Calzado cómodo: se anda más de lo que parece.</li>
        <li>Evita hora punta de fin de semana si buscas calma.</li>
        <li>Revisa viento y nubosidad antes de salir.</li>
      </ul>
    `
  }
];
