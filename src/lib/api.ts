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
    'Plaza_de_las_monjas': '/images/guides/huelva-plaza-las-monjas.jpg', // Este funciona local
    'Estación_de_Sevilla': 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=1200&q=80',
    'Calle_Berdigón': 'https://images.unsplash.com/photo-1512453979798-5ea904ac6666?auto=format&fit=crop&w=1200&q=80',
    'Gambas_blancas': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80',
    'Choco_frito': 'https://images.unsplash.com/photo-1599487483441-df3f705139fb?auto=format&fit=crop&w=1200&q=80',
    'Muelle_del_Tinto': 'https://images.unsplash.com/photo-1620733723572-11c52f7c2fd5?auto=format&fit=crop&w=1200&q=80',
    'Barrio_Reina_Victoria': 'https://images.unsplash.com/photo-1512453979798-5ea904ac6666?auto=format&fit=crop&w=1200&q=80',
    'Barrio_Obrero': 'https://images.unsplash.com/photo-1512453979798-5ea904ac6666?auto=format&fit=crop&w=1200&q=80',
    'Coquinas': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80', // Fallback to gambas
    'Jamón': 'https://images.unsplash.com/photo-1624653554176-59a16f39d150?auto=format&fit=crop&w=1200&q=80', // Jamon fallback
    'Jamon': 'https://images.unsplash.com/photo-1624653554176-59a16f39d150?auto=format&fit=crop&w=1200&q=80',
  };

  // Mapping logic
  for (const [key, replacement] of Object.entries(mapping)) {
    if (url.includes(key)) {
      return replacement;
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

