import { LOCAL_ARTICLES, LocalArticle } from '@/content/articles';
import { CATEGORY_MAP } from './constants';
import externalNewsData from '@/content/external-news.json';

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
  external?: boolean;
  externalUrl?: string;
  source?: string;
}

// Tipo para noticias externas
interface ExternalNewsItem {
  title: string;
  excerpt: string;
  url: string;
  publishedAt: string;
  source: string;
  category: string;
  image: string;
  external: boolean;
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
    external: false,
  };
}

function mapExternalNews(news: ExternalNewsItem): Article {
  return {
    slug: `external-${Buffer.from(news.url).toString('base64').substring(0, 20)}`,
    title: news.title,
    excerpt: news.excerpt,
    content: `<p>${news.excerpt}</p><p><a href="${news.url}" target="_blank" rel="noopener noreferrer">Leer noticia completa en ${news.source} →</a></p>`,
    category: 'Noticias',
    image: news.image,
    date: new Date(news.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
    readTime: '2 min',
    author: news.source,
    isAi: false,
    external: true,
    externalUrl: news.url,
    source: news.source,
  };
}

export async function getArticles(category?: string): Promise<Article[]> {
  // Si es 'noticias', devolver noticias externas scrapeadas
  if (category?.toLowerCase() === 'noticias') {
    const externalNews = (externalNewsData.news || []) as ExternalNewsItem[];
    
    // Si hay noticias externas, devolverlas
    if (externalNews.length > 0) {
      return externalNews.map(mapExternalNews);
    }
    
    // Si no hay noticias externas, devolver artículos locales de Eventos como fallback
    const eventArticles = LOCAL_ARTICLES.filter(a => a.category === 'Eventos');
    eventArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    return eventArticles.map(mapArticle);
  }

  let filtered = [...LOCAL_ARTICLES];

  if (category) {
    const mappedCategory = CATEGORY_MAP[category.toLowerCase()] || category;
    filtered = filtered.filter(a => a.category.toLowerCase() === mappedCategory.toLowerCase());
  }

  filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  return filtered.map(mapArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  // Si es una noticia externa
  if (slug.startsWith('external-')) {
    const externalNews = (externalNewsData.news || []) as ExternalNewsItem[];
    const found = externalNews.find(n => 
      `external-${Buffer.from(n.url).toString('base64').substring(0, 20)}` === slug
    );
    if (found) return mapExternalNews(found);
  }
  
  const found = LOCAL_ARTICLES.find(a => a.slug === slug);
  return found ? mapArticle(found) : undefined;
}
