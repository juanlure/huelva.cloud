import { supabase, ArticleDB } from './supabase';

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  image: string;
  date: string;
  readTime: string; // Calculado
  author: string;
  isAi: boolean;
}

// Helper to fix broken/hotlinked images from DB
function fixImageUrl(url: string): string {
  if (!url) return '/images/guides/huelva-plaza-las-monjas.jpg'; // Fallback

  // Local images are already good
  if (url.startsWith('/') || url.startsWith('http://localhost')) return url;

  const mapping: Record<string, string> = {
    'Plaza_de_las_monjas': 'huelva-plaza-las-monjas.jpg',
    'Estación_de_Sevilla': 'estacion-neomudejar.jpg',
    'Calle_Berdigón': 'calle-berdigon.jpg',
    'Gambas_blancas': 'gambas-blancas-huelva.jpg',
    'Choco_frito': 'choco-frito-tapa.jpg',
    'Muelle_del_Tinto': 'muelle-tinto-huelva.jpg',
    'Barrio_Reina_Victoria': 'barrio-reina-victoria.jpg',
    'Barrio_Obrero': 'barrio-reina-victoria-hero.jpg',
    'Coquinas': 'coquinas-huelva.jpg',
    'Jamón': 'jamon-iberico-bellota.jpg',
    'Jamon': 'jamon-iberico-bellota.jpg',
  };

  for (const [key, filename] of Object.entries(mapping)) {
    if (url.includes(key)) {
      return `/images/guides/${filename}`;
    }
  }

  return url;
}

// Mapper de DB a Frontend
function mapArticle(dbArticle: ArticleDB): Article {
  // Calculo simple de tiempo lectura: 200 palabras / min
  const words = (dbArticle.content || '').split(' ').length;
  const readTime = Math.ceil(words / 200) + ' min';

  return {
    slug: dbArticle.slug,
    title: dbArticle.title,
    excerpt: dbArticle.excerpt,
    content: dbArticle.content,
    category: dbArticle.category,
    image: fixImageUrl(dbArticle.image_url),
    date: new Date(dbArticle.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    readTime,
    author: dbArticle.author,
    isAi: dbArticle.is_ai
  };
}

import { CATEGORY_MAP } from './constants';

export async function getArticles(category?: string): Promise<Article[]> {
  let query = supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (category) {
    const dbCategory = CATEGORY_MAP[category.toLowerCase()] || category;
    query = query.ilike('category', dbCategory);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching articles:", error);
    return [];
  }

  return (data as ArticleDB[]).map(mapArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !data) {
    return undefined;
  }

  return mapArticle(data as ArticleDB);
}

