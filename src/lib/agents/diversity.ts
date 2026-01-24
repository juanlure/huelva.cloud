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

  const EVERGREEN_TOPICS = [
    "La leyenda del Muelle del Tinto", "Ruta de las Tapas por el Centro de Huelva",
    "Atardecer en el Muelle de las Carabelas", "Senderismo en la Sierra de Aracena",
    "Los mejores chocos fritos de la capital", "Guía de playas de Huelva para perros",
    "Historia del Barrio Obrero", "El legado inglés en Huelva", "De compras por el Mercado del Carmen",
    "Ruta de los Castillos de Huelva", "El Rocío para principiantes", "Gastronomía de Cuaresma en Huelva",
    "Las mejores confiterías de Huelva", "Paseo por el Parque Moret", "Visita a las Marismas del Odiel",
    "Descubriendo la Gruta de las Maravillas", "Las playas vírgenes de Doñana",
    "Guía de vinos del Condado de Huelva", "La historia de Colón y La Rábida",
    "Dónde ver flamencos en Huelva", "Ruta minera por Riotinto", "El Jamón de Jabugo: Guía de compra",
    "Los mejores atardeceres de la Costa de la Luz", "Escapada a Almonaster la Real",
    "Feria de la Gamba de Punta Umbría", "Historia del Recreativo de Huelva (El Decano)",
    "Visita al Dolmen de Soto", "Senderismo por los acantilados del Asperillo",
    "Gastronomía de la Sierra: Setas y Gurumelos", "La Saca de las Yeguas: Tradición ancestral",
    "Guía de chiringuitos en Punta Umbría", "El encanto de Moguer y Juan Ramón Jiménez",
    "Niebla y su muralla medieval", "Playas familiares en Matalascañas",
    "Dónde comer el mejor marisco en Isla Cristina"
  ];

  export async function analyzeDiversity(): Promise<TopicSuggestion | null> {
    const parser = new Parser();

    // 1. Obtener historial reciente
    const { data: articles } = await supabaseAdmin
      .from('articles')
      .select('title')
      .order('published_at', { ascending: false })
      .limit(100); // Increased history check

    const existingTitles = new Set(articles?.map((a: any) => a.title.toLowerCase()) || []);

    // 2. Intentar RSS (Fail-safe)
    let freshItem: any = null;
    const randomFeed = RSS_FEEDS[Math.floor(Math.random() * RSS_FEEDS.length)];
    console.log(`[DIVERSITY] Intentando feed: ${randomFeed}`);

    try {
      const feed = await parser.parseURL(randomFeed);
      const validItems = feed.items.filter(item => {
        if (!item.title || !item.link) return false;
        const titleLower = item.title.toLowerCase();
        const forbidden = ['muerto', 'fallece', 'accidente', 'herido', 'detenido', 'sucesos', 'luto', 'funeral'];
        if (forbidden.some(word => titleLower.includes(word))) return false;
        if (existingTitles.has(titleLower)) return false;
        return true;
      });

      if (validItems.length > 0) {
        freshItem = validItems[0];
      }
    } catch (e) {
      console.warn(`[DIVERSITY] Fallo al leer RSS (${randomFeed}). Saltando a Evergreen.`, e);
    }

    // 3. Resultado RSS Prioritario
    if (freshItem) {
      console.log(`[DIVERSITY] Noticia fresca encontrada: ${freshItem.title}`);
      return {
        topic: freshItem.title,
        url: freshItem.link,
        priority: 'high'
      };
    }

    // 4. Fallback Evergreen
    console.log("[DIVERSITY] Buscando tema Evergreen...");

    // Temas nuevos (no publicados)
    const availableEvergreen = EVERGREEN_TOPICS.filter(t => !existingTitles.has(t.toLowerCase()));

    if (availableEvergreen.length > 0) {
      const topic = availableEvergreen[Math.floor(Math.random() * availableEvergreen.length)];
      console.log(`[DIVERSITY] Tema Evergreen seleccionado: ${topic}`);
      return {
        topic: topic,
        priority: 'medium'
      };
    }

    // 5. Modo "Reciclaje" (Si se acaban los temas, repetimos uno antiguo pero reescrito)
    // Esto asegura que el daemon NUNCA se detenga.
    const recycledTopic = EVERGREEN_TOPICS[Math.floor(Math.random() * EVERGREEN_TOPICS.length)];
    console.log(`[DIVERSITY] Reciclando tema (Modo Supervivencia): ${recycledTopic}`);

    return {
      topic: recycledTopic,
      priority: 'medium' // Le damos medium para que lo procese igual
    };
  }
