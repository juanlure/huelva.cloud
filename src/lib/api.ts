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

// Política visual Huelva.cloud:
// - Priorizar imágenes reales y locales de /public/images/guides
// - Evitar dependencias de imágenes externas ambiguas
function fixImageUrl(url: string, category?: string, slug?: string, title?: string): string {
  const localByCategory: Record<string, string> = {
    'Noticias': '/images/guides/ayuntamiento-huelva.jpg',
    'Eventos': '/images/guides/monumento-colon-monjas.jpg',
    'Gastronomía': '/images/guides/choco-frito-hero.jpg',
    'Playa y Naturaleza': '/images/guides/playa-punta-umbria.jpg',
    'Cultura y Historia': '/images/guides/barrio-reina-victoria-hero.jpg',
    'Alojamiento': '/images/guides/calle-huelva-centro.jpg',
    'Guías': '/images/guides/huelva-plaza-las-monjas.jpg',
    'Guías Locales': '/images/guides/huelva-plaza-las-monjas.jpg'
  };

  const localByKeyword: Record<string, string> = {
    'rocio': '/images/guides/iglesia-rocio-huelva.jpg',
    'jamon': '/images/guides/jamon-iberico-bellota.jpg',
    'choco': '/images/guides/choco-frito-hero.jpg',
    'coquina': '/images/guides/coquinas-huelva.jpg',
    'gamba': '/images/guides/gambas-blancas-huelva.jpg',
    'muelle': '/images/guides/muelle-tinto-huelva.jpg',
    'tinto': '/images/guides/muelle-tinto-riotinto.jpg',
    'marisma': '/images/guides/marismas-odiel.jpg',
    'reina-victoria': '/images/guides/barrio-reina-victoria-hero.jpg',
    'playa': '/images/guides/playa-punta-umbria.jpg'
  };

  // Si ya es una imagen local del proyecto, mantener
  if (url?.startsWith('/images/guides/')) return url;

  const text = `${slug || ''} ${title || ''}`.toLowerCase();
  for (const [kw, local] of Object.entries(localByKeyword)) {
    if (text.includes(kw)) return local;
  }

  // Fallback por categoría
  if (category && localByCategory[category]) return localByCategory[category];

  return '/images/guides/huelva-plaza-las-monjas.jpg';
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
    image: fixImageUrl(dbArticle.image_url, dbArticle.category, dbArticle.slug, dbArticle.title),
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

