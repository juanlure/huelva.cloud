import { supabaseAdmin } from '../supabase';
import Parser from 'rss-parser';

// Feeds locales de Huelva
const RSS_FEEDS = [
  'https://www.diariodehuelva.es/rss/all',
  'https://www.huelvainformacion.es/rss/huelva',
  'https://www.huelvabuenasnoticias.com/feed/',
];

export interface TopicSuggestion {
  topic: string; // Título de la noticia
  url?: string;  // URL original para scrapear
  priority: 'high' | 'medium';
}

export async function analyzeDiversity(): Promise<TopicSuggestion | null> {
  const parser = new Parser();

  // 1. Obtener historial reciente para no repetir (por URL o Título)
  const { data: articles } = await supabaseAdmin
    .from('articles')
    .select('title')
    .order('published_at', { ascending: false })
    .limit(50);

  const existingTitles = new Set(articles?.map((a: any) => a.title.toLowerCase()) || []);

  // 2. Leer un feed aleatorio
  const randomFeed = RSS_FEEDS[Math.floor(Math.random() * RSS_FEEDS.length)];
  console.log(`[DIVERSITY] Leyendo feed: ${randomFeed}`);

  try {
    const feed = await parser.parseURL(randomFeed);

    // 3. Filtrar noticias
    const freshItems = feed.items.filter(item => {
      if (!item.title || !item.link) return false;
      // Evitar deportes o sucesos trágicos (opcional, ajustamos por keywords)
      const titleLower = item.title.toLowerCase();
      const forbidden = ['muerto', 'fallece', 'accidente', 'herido', 'detenido', 'sucesos'];
      if (forbidden.some(word => titleLower.includes(word))) return false;

      // Evitar repetidos
      if (existingTitles.has(titleLower)) return false;

      return true;
    });

    // 4. Seleccionar una noticia
    if (freshItems.length > 0) {
      const chosen = freshItems[0];
      console.log(`[DIVERSITY] Noticia seleccionada (RSS): ${chosen.title}`);
      return {
        topic: chosen.title || 'Noticia Huelva',
        url: chosen.link,
        priority: 'high'
      };
    }

    // 5. FALLBACK: Temas Evergreen (Si no hay noticias frescas)
    console.log("[DIVERSITY] Sin noticias RSS válidas. Buscando tema Evergreen...");

    // Lista de temas atemporales para rellenar
    const EVERGREEN_TOPICS = [
      "La leyenda del Muelle del Tinto", "Ruta de las Tapas por el Centro de Huelva",
      "Atardecer en el Muelle de las Carabelas", "Senderismo en la Sierra de Aracena",
      "Los mejores chocos fritos de la capital", "Guía de playas de Huelva para perros",
      "Historia del Barrio Obrero", "El legado inglés en Huelva", "De compras por el Mercado del Carmen",
      "Ruta de los Castillos de Huelva", "El Rocío para principiantes", "Gastronomía de Cuaresma en Huelva",
      "Las mejores confiterías de Huelva", "Paseo por el Parque Moret", "Visita a las Marismas del Odiel"
    ];

    // Filtrar temas ya usados
    const availableEvergreen = EVERGREEN_TOPICS.filter(t => !existingTitles.has(t.toLowerCase()));

    if (availableEvergreen.length > 0) {
      const randomTopic = availableEvergreen[Math.floor(Math.random() * availableEvergreen.length)];
      console.log(`[DIVERSITY] Tema Evergreen seleccionado: ${randomTopic}`);
      return {
        topic: randomTopic,
        priority: 'medium'
      };
    }

    console.log("[DIVERSITY] ¡Agotación de temas! Se recomienda pausar.");
    return null;

  } catch (e) {
    console.error("[DIVERSITY] Error leyendo RSS", e);
    return null;
  }
}
