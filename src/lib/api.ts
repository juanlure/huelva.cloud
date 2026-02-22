import { LOCAL_ARTICLES, LocalArticle } from '@/content/articles';
import { CATEGORY_MAP } from './constants';

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
  isAi: boolean;
}

function mapArticle(article: LocalArticle): Article {
  const words = (article.content || '').split(/\s+/).filter(Boolean).length;
  const readTime = `${Math.max(1, Math.ceil(words / 200))} min`;

  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    category: article.category,
    image: article.image,
    date: new Date(article.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
    readTime,
    author: article.author,
    isAi: article.isAi,
  };
}

export async function getArticles(category?: string): Promise<Article[]> {
  let filtered = [...LOCAL_ARTICLES];

  if (category) {
    const mappedCategory = CATEGORY_MAP[category.toLowerCase()] || category;
    filtered = filtered.filter(a => a.category.toLowerCase() === mappedCategory.toLowerCase());
  }

  filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  return filtered.map(mapArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const found = LOCAL_ARTICLES.find(a => a.slug === slug);
  return found ? mapArticle(found) : undefined;
}
