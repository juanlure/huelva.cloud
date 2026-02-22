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
    image: '/images/guides/calle-huelva-centro.jpg',
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
  }
];
