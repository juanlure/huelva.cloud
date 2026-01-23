export interface Author {
  name: string;
  role: string;
  bio: string;
  avatar: string; // URL
  categories: string[];
}

export const AUTHORS: Record<string, Author> = {
  'Rocío Limón': {
    name: 'Rocío Limón',
    role: 'Comer & Cultura',
    bio: 'Cazadora de tapas en el Centro y experta en sobremesas eternas. Defensora a ultranza de la gamba blanca y el mosto del Condado. Si no mancha, no cuenta.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&fit=crop', // Placeholder female
    categories: ['Comer', 'Eventos', 'Guías', 'Cultura']
  },
  'Manuel V. Cinta': {
    name: 'Manuel V. Cinta',
    role: 'Actualidad & Futuro',
    bio: 'Analista de la transformación de Huelva. Desde el Hidrógeno Verde hasta el Puerto. Datos fríos en una ciudad caliente.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&fit=crop', // Placeholder male
    categories: ['Noticias', 'Tech', 'Negocios']
  },
  'Carmen Doñana': {
    name: 'Carmen Doñana',
    role: 'Escapadas & Estilo',
    bio: 'Buscadora de refugios con encanto, desde atardeceres en Mazagón hasta chimeneas en Aracena. El lujo es el silencio.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&fit=crop', // Placeholder female
    categories: ['Alojarse', 'Viajes', 'Relax']
  },
  // Fallback
  'El Choco': {
    name: 'El Choco',
    role: 'Redacción AI',
    bio: 'La inteligencia artificial más choquera. Curando contenido local las 24h sin pedir tapas ni café.',
    avatar: '/images/choco-avatar.jpg',
    categories: []
  }
};

export function getAuthorForCategory(category: string): Author {
  // Búsqueda simple
  const cat = category ? category.trim() : '';
  if (AUTHOR_MAP['Rocío Limón'].categories.includes(cat)) return AUTHOR_MAP['Rocío Limón'];
  if (AUTHOR_MAP['Manuel V. Cinta'].categories.includes(cat)) return AUTHOR_MAP['Manuel V. Cinta'];
  if (AUTHOR_MAP['Carmen Doñana'].categories.includes(cat)) return AUTHOR_MAP['Carmen Doñana'];
  
  // Default logic based on keywords if distinct category
  if (['Restaurantes', 'Gastronomía'].includes(cat)) return AUTHOR_MAP['Rocío Limón'];
  
  return AUTHOR_MAP['Manuel V. Cinta']; // Default for news
}

// Map interno para facilitar acceso
const AUTHOR_MAP = AUTHORS;
