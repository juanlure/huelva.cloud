import { LOCAL_ARTICLES, LocalArticle } from '@/content/articles';
import { CATEGORY_MAP } from './constants';

const CATEGORY_FALLBACK_IMAGE: Record<string, string> = {
  'noticias': '/images/guides/huelva-plaza-las-monjas.jpg',
  'eventos': '/images/guides/huelva-plaza-las-monjas.jpg',
  'gastronomía': '/images/guides/coquinas-huelva.jpg',
  'gastronomia': '/images/guides/coquinas-huelva.jpg',
  'alojamiento': '/images/guides/huelva-plaza-las-monjas.jpg',
  'guías locales': '/images/guides/huelva-plaza-las-monjas.jpg',
  'guias locales': '/images/guides/huelva-plaza-las-monjas.jpg',
};

function normalizeCategory(category: string): string {
  return (category || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function resolveArticleImage(article: LocalArticle): string {
  const raw = (article.image || '').trim();

  // Prefer local images. If empty or remote URL, use stable local fallback.
  if (!raw || raw.startsWith('http://') || raw.startsWith('https://')) {
    const key = normalizeCategory(article.category);
    return CATEGORY_FALLBACK_IMAGE[key] || '/images/placeholder.jpg';
  }

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
  image: string;
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
