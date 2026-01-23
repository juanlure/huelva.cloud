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
    .limit(20);

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

    if (freshItems.length === 0) {
      console.log("[DIVERSITY] No hay noticias frescas válidas en este feed.");
      return null;
    }

    // 4. Seleccionar una noticia
    const chosen = freshItems[0]; // La más reciente válida
    console.log(`[DIVERSITY] Noticia seleccionada: ${chosen.title}`);

    return {
      topic: chosen.title || 'Noticia sin título',
      url: chosen.link,
      priority: 'high'
    };

  } catch (e) {
    console.error("[DIVERSITY] Error leyendo RSS", e);
    return null;
  }
}
