import { LOCAL_ARTICLES, LocalArticle } from '@/content/articles';
import { CATEGORY_MAP } from './constants';

const CATEGORY_FALLBACK_IMAGE: Record<string, string> = {
  'noticias': '/images/guides/huelva-puerto.jpg',
  'eventos': '/images/guides/fiesta-tradicional-huelva.jpg',
  'gastronomía': '/images/guides/coquinas-huelva.jpg',
  'gastronomia': '/images/guides/coquinas-huelva.jpg',
  'alojamiento': '/images/guides/sierra-aracena.jpg',
  'guías locales': '/images/guides/muelle-tinto.jpg',
  'guias locales': '/images/guides/muelle-tinto.jpg',
};

function normalizeCategory(category: string): string {
  return (category || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function resolveArticleImage(article: LocalArticle): string | null {
  const raw = (article.image || '').trim();

  // Solo usar imagen si existe localmente y no es URL remota
  if (!raw || raw.startsWith('http://') || raw.startsWith('https://')) {
    return null; // Sin imagen si no hay local válida
  }

  // Verificar que el archivo existe (esto se valida en build)
  return raw;
}

function ensureInlineImage(content: string | undefined, image: string, title: string): string {
  const safeContent = (content || '').trim();
  if (!safeContent) return '';

  const hasInlineImage = /<img\b[^>]*>/i.test(safeContent);
  if (hasInlineImage) return safeContent;

  return `
    <figure>
      <img src="${image}" alt="${title}" loading="lazy" />
    </figure>
    ${safeContent}
  `;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  image: string | null;
  date: string;
  readTime: string;
  author: string;
  isAi: boolean;
}

function mapArticle(article: LocalArticle): Article {
  const image = resolveArticleImage(article);
  const content = article.content || '';
  const words = content.split(/\s+/).filter(Boolean).length;
  const readTime = `${Math.max(1, Math.ceil(words / 200))} min`;

  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    content,
    category: article.category,
    image,
    date: new Date(article.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
    readTime,
    author: article.author,
    isAi: article.isAi,
  };
}

export async function getArticles(category?: string): Promise<Article[]> {
  let filtered = [...LOCAL_ARTICLES];

  if (category) {
    const normalizedCategory = category.toLowerCase();
    
    // 'noticias' shows all articles (like a blog feed)
    if (normalizedCategory === 'noticias') {
      // Return all articles sorted by date
      filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      return filtered.map(mapArticle);
    }
    
    const mappedCategory = CATEGORY_MAP[normalizedCategory] || category;
    filtered = filtered.filter(a => a.category.toLowerCase() === mappedCategory.toLowerCase());
  }

  filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  return filtered.map(mapArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const found = LOCAL_ARTICLES.find(a => a.slug === slug);
  return found ? mapArticle(found) : undefined;
}
