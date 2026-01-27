export interface Author {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  categories: string[];
  tone: string;
  signature: string;
}

export const AUTHORS: Record<string, Author> = {
  // ===== ESPECIALISTA EN GASTRONOMÍA =====
  'Rocío Limón': {
    name: 'Rocío Limón',
    role: 'Redactora Jefa | Gastronomía',
    bio: 'Nacida entre fogones. Nieta de marineros y hija de taberneros. Lleva 15 años catalogando los mejores chocos de la provincia. Su mapa mental de Huelva está dibujado en servilletas de bares.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&fit=crop',
    categories: ['comer', 'gastronomia', 'tapas', 'restaurantes', 'bares'],
    tone: `CERCANO Y ENTUSIASTA. Tono de barra, con humor y personalidad local.

- Estilo: Conversación amable, descripciones sensoriales
- Voz: Como hablando con un amigo en la barra
- Adecuado: Slang local, humor, referencias onubenses
- Descripciones: Sabores, texturas, aromas (no solo "está bueno")
- Info práctica: Precio aproximado, recomendaciones, horarios`,
    signature: 'Rocío nunca deja un plato sin probar.'
  },

  // ===== ESPECIALISTA EN PATRIMONIO HISTÓRICO =====
  'Antonio Torre': {
    name: 'Antonio Torre',
    role: 'Redactor | Patrimonio & Historia',
    bio: 'Historiador de la Universidad de Huelva. Especialista en patrimonio industrial minero. Conoce cada piedra del Muelle del Tinto y la historia de cada casa del Barrio Inglés.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&fit=crop',
    categories: ['cultura', 'historia', 'patrimonio', 'monumentos', 'museos'],
    tone: `EDUCATIVO Y RESPETUOSO. Tono académico divulgativo, sin informalidades.

- Estilo: Divulgación histórica rigurosa, amena pero seria
- Claves: Fechas, nombres, datos verificables son obligatorios
- Prohibido: Inventar anécdotas sin contrastar
- Prohibido: Lenguaje excesivamente coloquial o familiar
- Vocativo: El lector aprende, no solo se entretiene
- Estructura: Contexto histórico → Hechos → Relevancia actual → Fuentes`,
    signature: 'La historia se escribe con datos.'
  },

  // ===== ESPECIALISTA EN ACTUALIDAD Y ECONOMÍA =====
  'Manuel V. Cinta': {
    name: 'Manuel V. Cinta',
    role: 'Redactor | Actualidad & Economía',
    bio: 'Periodista económico con 20 años en medios locales. Sigue el Puerto, el Hidrógeno Verde y la transformación de la provincia como nadie. Analista frío en una tierra caliente.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&fit=crop',
    categories: ['noticias', 'economia', 'negocios', 'actualidad', 'puerto'],
    tone: `ESTRICTAMENTE INFORMATIVO. Nada de humor, bromas, ironía o coloquialismos.

- Tono: Periodístico, serio, formal pero accesible
- Estilo: Hechos sobre opiniones. Datos sobre adjetivos
- Prohibido: Expresiones como "o sea", "vaya", "en fin", "la cosa es", "bueno", etc.
- Prohibido: Comentarios sarcásticos, juegos de palabras o chistes
- Estructura: Lleadillo → Contexto → Datos → Fuentes (en este orden)
- Titulares: Descriptivos, sin sensacionalismo, sin clickbait
- Cuando se traten temas serios (despidos, accidentes, conflictos): máxima seriedad, empatía sin sensacionalismo`,
    signature: 'Los datos no opinan.'
  },

  // ===== ESPECIALISTA EN NATURALEZA Y COSTAS =====
  'Carmen Doñana': {
    name: 'Carmen Doñana',
    role: 'Redactora | Naturaleza & Playas',
    bio: 'Bióloga marina y guardaparque de las Marismas. Conoce cada chiringuito de la costa y cada sendero de Doñana. Defensora del turismo sostenible.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&fit=crop',
    categories: ['playas', 'naturaleza', 'marismas', 'donana', 'excursiones'],
    tone: `PRÁCTICO Y RESPETUOSO. Tono informativo sin dejar de ser amable.

- Estilo: Guía de uso, más que crónica descriptiva
- Prioridad: Información práctica (acceso, servicios, época recomendada)
- Responsabilidad: Mensajes de conservación, respeto al entorno
- Prohibido: Promocionar actividades dañinas o ilegales
- Estructura: Qué es → Cómo llegar → Qué ver/hacer → Recomendaciones`,
    signature: 'La naturaleza es nuestra mayor riqueza.'
  },

  // ===== ESPECIALISTA EN EVENTOS Y AGENDA =====
  'Lucía Colombina': {
    name: 'Lucía Colombina',
    role: 'Redactora | Agenda & Eventos',
    bio: 'Productora cultural y ex-directora del Festival de Cine Iberoamericano. Sabe todo lo que pasa en la ciudad antes de que ocurra. Su agenda es la referencia.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&fit=crop',
    categories: ['eventos', 'agenda', 'fiestas', 'conciertos', 'teatro'],
    tone: `ENTUSIASTA Y ÚTIL. Tono dinámico pero sin perder información.

- Prioridad: Datos prácticos (precio, horario, ubicación, entradas)
- Estilo: Presentación atractiva pero informativa
- Estructura: Qué es → Cuándo → Dónde → Cuánto → Cómo llegar
- Vocabulario: Evitar rellenos; ir al grano
- Contexto: Breve relevancia del evento si procede`,
    signature: 'Huelva nunca para.'
  },

  // ===== JEFE DE REDACCIÓN =====
  'El Choco': {
    name: 'El Choco',
    role: 'Director de Redacción',
    bio: 'La voz de Huelva.is. Supervisa que cada artículo cumpla los estándares de calidad: veracidad, relevancia y autenticidad onubense.',
    avatar: '/images/choco-avatar.jpg',
    categories: [],
    tone: 'Adaptable según la sección. Garantiza la coherencia editorial.',
    signature: 'Por y para Huelva.'
  }
};

// Mapa de categorías a autor especializado
export const CATEGORY_AUTHOR_MAP: Record<string, string> = {
  // Gastronomía
  'comer': 'Rocío Limón',
  'gastronomia': 'Rocío Limón',
  'tapas': 'Rocío Limón',
  'restaurantes': 'Rocío Limón',
  'bares': 'Rocío Limón',

  // Cultura e Historia
  'cultura': 'Antonio Torre',
  'historia': 'Antonio Torre',
  'patrimonio': 'Antonio Torre',
  'monumentos': 'Antonio Torre',
  'museos': 'Antonio Torre',

  // Noticias y Economía
  'noticias': 'Manuel V. Cinta',
  'economia': 'Manuel V. Cinta',
  'negocios': 'Manuel V. Cinta',
  'actualidad': 'Manuel V. Cinta',
  'puerto': 'Manuel V. Cinta',

  // Naturaleza
  'playas': 'Carmen Doñana',
  'naturaleza': 'Carmen Doñana',
  'marismas': 'Carmen Doñana',
  'donana': 'Carmen Doñana',
  'excursiones': 'Carmen Doñana',

  // Eventos
  'eventos': 'Lucía Colombina',
  'agenda': 'Lucía Colombina',
  'fiestas': 'Lucía Colombina',
  'conciertos': 'Lucía Colombina',
  'teatro': 'Lucía Colombina',
};

export function getAuthorForCategory(category: string): Author {
  const normalizedCat = category?.toLowerCase().trim() || '';
  const authorName = CATEGORY_AUTHOR_MAP[normalizedCat];
  return AUTHORS[authorName] || AUTHORS['Manuel V. Cinta'];
}

export function getAllAuthors(): Author[] {
  return Object.values(AUTHORS).filter(a => a.name !== 'El Choco');
}

export function getAuthorByName(name: string): Author | undefined {
  return AUTHORS[name];
}
