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
    bio: 'Nacida entre fogones. Nietayene de marineros y hija de taberneros. Lleva 15 años catalogando los mejores chocos de la provincia. Su mapa mental de Huelva está dibujado en servilletas de bares.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&fit=crop',
    categories: ['comer', 'gastronomia', 'tapas', 'restaurantes', 'bares'],
    tone: 'Apasionado, directo, con humor local. No usa palabras raras. Escribe como hablaría con un amigo en la barra.',
    signature: 'Rocío nunca deja un plato sin probar.'
  },

  // ===== ESPECIALISTA EN PATRIMONIO HISTÓRICO =====
  'Antonio Torre': {
    name: 'Antonio Torre',
    role: 'Redactor | Patrimonio & Historia',
    bio: 'Historiador de la Universidad de Huelva. Especialista en patrimonio industrial minero. Conoce cada piedra del Muelle del Tinto y la historia de cada casa del Barrio Inglés.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&fit=crop',
    categories: ['cultura', 'historia', 'patrimonio', 'monumentos', 'museos'],
    tone: 'Respetuoso, documentado, educativo. Incluye siempre datos verificables y fechas. Nunca inventa.',
    signature: 'La historia se escribe con datos.'
  },

  // ===== ESPECIALISTA EN ACTUALIDAD Y ECONOMÍA =====
  'Manuel V. Cinta': {
    name: 'Manuel V. Cinta',
    role: 'Redactor | Actualidad & Economía',
    bio: 'Periodista económico con 20 años en medios locales. Sigue el Puerto, el Hidrógeno Verde y la transformación de la provincia como nadie. Analista frío en una tierra caliente.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&fit=crop',
    categories: ['noticias', 'economia', 'negocios', 'actualidad', 'puerto'],
    tone: 'Profesional, objetivo, sin adjetivos innecesarios. Prioriza datos y fuentes. El titular debe ser claro e informativo.',
    signature: 'Los datos no opinan.'
  },

  // ===== ESPECIALISTA EN NATURALEZA Y COSTAS =====
  'Carmen Doñana': {
    name: 'Carmen Doñana',
    role: 'Redactora | Naturaleza & Playas',
    bio: 'Bióloga marina y guardaparque de las Marismas. Conoce cada chiringuito de la costa y cada sendero de Doñana. Defensora del turismo sostenible.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&fit=crop',
    categories: ['playas', 'naturaleza', 'marismas', 'donana', 'excursiones'],
    tone: 'Respetuoso con el entorno, práctico, informativo. Incluye datos de accesibilidad y preservación.',
    signature: 'La naturaleza es nuestra mayor riqueza.'
  },

  // ===== ESPECIALISTA EN EVENTOS Y AGENDA =====
  'Lucía Colombina': {
    name: 'Lucía Colombina',
    role: 'Redactora | Agenda & Eventos',
    bio: 'Productora cultural y ex-directora del Festival de Cine Iberoamericano. Sabe todo lo que pasa en la ciudad antes de que ocurra. Su agenda es la referencia.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&fit=crop',
    categories: ['eventos', 'agenda', 'fiestas', 'conciertos', 'teatro'],
    tone: 'Entusiasta pero informativo. Utilidades prácticas (precio, horario, cómo llegar) son prioritarias.',
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
