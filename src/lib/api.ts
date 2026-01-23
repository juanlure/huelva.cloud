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
    image: dbArticle.image_url,
    date: new Date(dbArticle.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    readTime,
    author: dbArticle.author,
    isAi: dbArticle.is_ai
  };
}

export async function getArticles(category?: string): Promise<Article[]> {
  let query = supabase
    .from('articles')
    .select('*')
    .order('published_at', { ascending: false });

  if (category) {
    // Buscar case-insensitive en una columna normal requiere configuración extra o ilike
    // Por simplicidad en demo, asumimos que 'Category' se guarda capitalizado correctamente en DB
    // O usamos ilike si category es texto entrante
    query = query.ilike('category', category); 
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
  
  // Return typed data
  return (data as ArticleDB[]).map(mapArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return undefined;
  }

  return mapArticle(data as ArticleDB);
}

