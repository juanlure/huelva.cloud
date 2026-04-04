import { LOCAL_ARTICLES, LocalArticle } from '@/content/articles';
import { CATEGORY_MAP } from './constants';
import externalNewsData from '@/content/external-news.json';
import { generateNewsArtDataUri } from './newsArt';

const CATEGORY_FALLBACK_IMAGE: Record<string, string> = {
  'noticias': '/images/guides/huelva-muelle-tinto.jpg',
  'eventos': '/images/guides/feria-huelva.jpg',
  'gastronomía': '/images/guides/coquinas-huelva.jpg',
  'gastronomia': '/images/guides/coquinas-huelva.jpg',
  'alojamiento': '/images/guides/aracena-pueblo.jpg',
  'guías locales': '/images/guides/huelva-muelle-tinto.jpg',
  'guias locales': '/images/guides/huelva-muelle-tinto.jpg',
};

function normalizeCategory(category: string): string {
  return (category || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function getCategoryUrl(category: string): string {
  const normalized = normalizeCategory(category);
  const entry = Object.entries(CATEGORY_MAP).find(([, dbCategory]) => normalizeCategory(dbCategory) === normalized);
  return entry?.[0] || 'guias';
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

function isDataUri(value: string | null | undefined): boolean {
  return !!value && value.startsWith('data:image/');
}

function getNewsInternalCta(news: ExternalNewsItem): string {
  const title = `${news.title} ${news.excerpt}`.toLowerCase();

  if (/(ayuntamiento|causa|accidente|familias|institucional|huelva capital)/.test(title)) {
    return '<p><strong>Siguiente lectura útil:</strong> si quieres más contexto local y recorrido práctico, sigue por <a href="/que-ver">qué ver en Huelva</a>, <a href="/agenda">la agenda de Huelva</a> o <a href="/fin-de-semana">la guía de fin de semana</a>.</p>';
  }

  if (/(detenido|estafa|sucesos|ayamonte|policia|guardia civil)/.test(title)) {
    return '<p><strong>Siguiente lectura útil:</strong> si estás siguiendo movimiento en provincia, completa con <a href="/agenda">la agenda actual</a>, <a href="/que-ver">qué ver en Huelva y provincia</a> o <a href="/fin-de-semana">ideas para escapada y contexto local</a>.</p>';
  }

  return '<p><strong>Siguiente lectura útil:</strong> para no quedarte solo en el titular, enlaza esta noticia con <a href="/agenda">la agenda</a>, <a href="/que-ver">qué ver en Huelva</a> y <a href="/donde-comer">dónde comer bien</a>.</p>';
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  image: string | null;
  date: string;
  publishedAtISO: string;
  publishedLabel: string;
  readTime: string;
  author: string;
  isAi: boolean;
  external?: boolean;
  source?: string;
  sourceDate?: string;
}

// Tipo para noticias externas
interface ExternalNewsItem {
  title: string;
  excerpt: string;
  content?: string;
  url: string;
  publishedAt: string;
  source: string;
  category: string;
  image: string | null;
  external: boolean;
}

function formatHumanDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Fecha pendiente';
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
}

function toSafeIso(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return new Date().toISOString();
  return date.toISOString();
}

function mapArticle(article: LocalArticle): Article {
  const image = resolveArticleImage(article);
  const content = article.content || '';
  const words = content.split(/\s+/).filter(Boolean).length;
  const readTime = `${Math.max(1, Math.ceil(words / 200))} min`;
  const publishedAtISO = toSafeIso(article.publishedAt);
  const publishedLabel = formatHumanDate(article.publishedAt);

  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    content,
    category: getCategoryUrl(article.category),
    image,
    date: publishedLabel,
    publishedAtISO,
    publishedLabel,
    readTime,
    author: article.author,
    isAi: article.isAi,
    external: false,
  };
}

function mapExternalNews(news: ExternalNewsItem): Article {
  const publishedAtISO = toSafeIso(news.publishedAt);
  const publishedLabel = formatHumanDate(news.publishedAt);
  const localImage = news.image && !/^https?:\/\//i.test(news.image) ? news.image : null;
  const resolvedImage = localImage || generateNewsArtDataUri(news.title, news.source);

  // Usar content generado por IA si existe, sino fallback básico
  const bodyContent = news.content || `<p>${news.excerpt}</p>`;
  const shouldInlineImage = !!localImage && !isDataUri(resolvedImage);
  const footerContent = `${getNewsInternalCta(news)}<p><strong>Fuente consultada:</strong> ${news.source} (${publishedLabel}).</p>`;
  const content = shouldInlineImage
    ? ensureInlineImage(
        `${bodyContent}${footerContent}`,
        resolvedImage,
        news.title
      )
    : `${bodyContent}${footerContent}`;
  
  // Generar slug consistente con external- prefix
  const base64Url = Buffer.from(news.url).toString('base64').substring(0, 20);
  
  return {
    slug: `external-${base64Url}`,
    title: news.title,
    excerpt: news.excerpt,
    content,
    category: 'noticias',
    image: resolvedImage,
    date: publishedLabel,
    publishedAtISO,
    publishedLabel,
    readTime: '3 min',
    author: 'Redacción Huelva.cloud',
    isAi: true,
    external: true,
    source: news.source,
    sourceDate: publishedLabel,
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
