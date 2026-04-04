import Link from 'next/link';
import { getArticleBySlug, getArticles } from '@/lib/api';
import { notFound } from 'next/navigation';
import { AUTHORS } from '@/lib/authors';
import InteractiveContainer from '@/components/InteractiveContainer';
import AuthorBox from '@/components/AuthorBox';
import ArticleRenderer from '@/components/article/ArticleRenderer';
import StrategicGuideCTA from '@/components/article/StrategicGuideCTA';
import ArticleHeroImage from '@/components/article/ArticleHeroImage';
import { Clock, ArrowLeft, Link2 } from 'lucide-react';
import styles from './ArticlePage.module.css';
import type { Metadata } from 'next';

interface PageProps {
  params: { slug: string };
}

// Generate metadata for each article
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Artículo no encontrado | Huelva.cloud',
    };
  }

  return {
    title: `${article.title} | Huelva.cloud`,
    description: article.excerpt,
    keywords: `${article.title}, Huelva, ${article.category}, Andalucía, guía local`,
    authors: [{ name: article.author }],
    alternates: {
      canonical: `https://huelva.cloud/article/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://huelva.cloud/article/${slug}`,
      siteName: 'Huelva.cloud',
      locale: 'es_ES',
      type: 'article',
      publishedTime: article.publishedAtISO,
      authors: [article.author],
      images: article.image ? [article.image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.image ? [article.image] : [],
    },
  };
}

// Generate JSON-LD structured data
function generateArticleSchema(article: any, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.image ? `https://huelva.cloud${article.image}` : undefined,
    datePublished: article.publishedAtISO,
    dateModified: article.publishedAtISO,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Huelva.cloud',
      logo: {
        '@type': 'ImageObject',
        url: 'https://huelva.cloud/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://huelva.cloud/article/${slug}`,
    },
  };
}

type StrategicCta = {
  eyebrow: string;
  title: string;
  body: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
};

const STRATEGIC_GUIDE_CTAS: Record<string, StrategicCta> = {
  'que-hacer-en-huelva-guia-definitiva': {
    eyebrow: 'Siguiente paso útil',
    title: 'Si ya has abierto esta pieza, lo inteligente es pasar a la guía que sí ordena la visita',
    body: 'Este artículo da contexto. La flagship de qué ver te ayuda a recortar, priorizar y montar una ruta con sentido según el tiempo y el tipo de visita.',
    primary: { href: '/que-ver', label: 'Ir a la guía de qué ver' },
    secondary: { href: '/agenda', label: 'Mirar agenda de hoy' },
  },
  'que-ver-en-huelva-en-un-dia': {
    eyebrow: 'Decisión rápida',
    title: 'No conviertas un día en una gymkhana: usa la guía que recorta bien',
    body: 'Si vienes justo de tiempo, la flagship te evita meter relleno turístico y te ayuda a dejar una ruta más limpia y más defendible.',
    primary: { href: '/que-ver', label: 'Abrir qué ver en Huelva' },
    secondary: { href: '/fin-de-semana', label: 'Ver escapada de fin de semana' },
  },
  'playas-huelva-guia-completa': {
    eyebrow: 'Mejor siguiente paso',
    title: 'La decisión buena no es “qué playa es famosa”, sino cuál te arregla el día',
    body: 'Si vas a elegir playa según acceso, ambiente, viento y tipo de plan, la flagship de playas resuelve bastante mejor que una lista genérica con nombres repetidos.',
    primary: { href: '/playas', label: 'Ir a la guía de playas' },
    secondary: { href: '/tiempo', label: 'Mirar tiempo y viento' },
  },
  'mejores-playas-huelva-guia-real': {
    eyebrow: 'Atajo útil',
    title: 'Cruza esta lectura con la flagship y decidirás con bastante menos ruido',
    body: 'Aquí tienes contexto. En la guía premium tienes la versión pensada para comparar playas según el día que quieres montar, no según el ranking de turno.',
    primary: { href: '/playas', label: 'Comparar playas con criterio' },
    secondary: { href: '/tiempo', label: 'Ver previsión y viento' },
  },
  'mejores-restaurantes-huelva-2026': {
    eyebrow: 'Antes de reservar mesa',
    title: 'Para no malgastar una comida, pasa a la guía que sí filtra por contexto',
    body: 'La flagship de dónde comer está pensada para decidir según momento, presupuesto, zona y expectativa. Menos ruido de lista, más criterio útil.',
    primary: { href: '/donde-comer', label: 'Ir a dónde comer' },
    secondary: { href: '/guias/choco', label: 'Ver guía del choco' },
  },
  'mejores-restaurantes-huelva': {
    eyebrow: 'Si ya estás comparando sitios',
    title: 'Este artículo orienta; la guía buena es la que te ayuda a descartar rápido',
    body: 'Si ya estás comparando sitios, entra en la flagship para filtrar mejor y no terminar en un sitio correcto pero olvidable.',
    primary: { href: '/donde-comer', label: 'Abrir guía gastronómica' },
    secondary: { href: '/guias/cafe', label: 'Ver guía del café' },
  },
  'huelva-48-horas-itinerario-completo': {
    eyebrow: 'Plan resuelto',
    title: 'Si vienes un finde, mejor usar la guía que ordena el ritmo y no solo la lista',
    body: 'Este itinerario inspira. La flagship de fin de semana resuelve mejor la secuencia, los bloques y las decisiones que hacen que el viaje no se tuerza.',
    primary: { href: '/fin-de-semana', label: 'Ir a fin de semana' },
    secondary: { href: '/alojarse', label: 'Mirar dónde alojarse' },
  },
};

const CATEGORY_FALLBACK_CTAS: Record<string, StrategicCta> = {
  guias: {
    eyebrow: 'Sigue explorando con criterio',
    title: 'Una pieza suelta informa; una flagship buena te ayuda a decidir',
    body: 'Si este artículo te dio contexto, el siguiente paso inteligente es entrar en una guía principal que convierta lectura en decisión real.',
    primary: { href: '/que-ver', label: 'Ir a qué ver en Huelva' },
    secondary: { href: '/fin-de-semana', label: 'Montar un fin de semana' },
  },
  comer: {
    eyebrow: 'Siguiente decisión útil',
    title: 'Para no acabar en un sitio simplemente correcto, filtra mejor desde la flagship',
    body: 'Un artículo ayuda. La guía principal de dónde comer resuelve bastante mejor según momento, zona, presupuesto y tipo de comida.',
    primary: { href: '/donde-comer', label: 'Ir a dónde comer' },
    secondary: { href: '/fin-de-semana', label: 'Ver escapada completa' },
  },
  alojarse: {
    eyebrow: 'Ordena el viaje',
    title: 'Dormir en la zona correcta te arregla más viaje que cualquier lista bonita',
    body: 'Si ya estás comparando alojamiento, cruza esta lectura con la flagship para decidir mejor base, ritmo y tipo de visita.',
    primary: { href: '/alojarse', label: 'Ir a la guía de alojamiento' },
    secondary: { href: '/que-ver', label: 'Ver qué sí compensa visitar' },
  },
  eventos: {
    eyebrow: 'Convierte el plan en día redondo',
    title: 'La agenda sola no basta: crúzala con una guía que ordene el resto del día',
    body: 'Un evento te da la excusa. Las páginas principales te ayudan a completar mejor qué ver, dónde comer y cómo montar el finde sin fricción.',
    primary: { href: '/agenda', label: 'Ir a la agenda de Huelva' },
    secondary: { href: '/que-ver', label: 'Ver qué hacer en Huelva' },
  },
  noticias: {
    eyebrow: 'No te quedes solo en el titular',
    title: 'Después de la noticia, lo útil es pasar a una página que te dé contexto local de verdad',
    body: 'Si quieres convertir actualidad en navegación con intención, salta a las guías principales y entiende mejor ciudad, provincia y planes reales.',
    primary: { href: '/que-ver', label: 'Ir a qué ver en Huelva' },
    secondary: { href: '/agenda', label: 'Ver agenda actual' },
  },
};

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const authorData = AUTHORS[article.author] || AUTHORS['El Choco'];
  const relatedArticles = (await getArticles())
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3);

  // --- Extract interactive components ---
  const SUPPORTED_INTERACTIVES = new Set(['translator', 'itinerary', 'quiz', 'cards', 'checklist', 'scorecard', 'map']);
  let interactiveType: string | null = null;
  let interactiveData: any = null;
  let cleanedContent = article.content || '';

  const typeMatch = cleanedContent.match(/<div id="interactive-root" data-component="([^"]+)"/);
  if (typeMatch && SUPPORTED_INTERACTIVES.has(typeMatch[1])) {
    interactiveType = typeMatch[1];
  }

  const dataMatch = cleanedContent.match(/<script type="application\/json" id="interactive-data">([\s\S]*?)<\/script>/);
  if (dataMatch) {
    try {
      interactiveData = JSON.parse(dataMatch[1]);
    } catch (e) {
      console.error("Error parsing interactive data:", e);
    }
  }

  // Limpia siempre los bloques raw para que no aparezcan artefactos visuales
  cleanedContent = cleanedContent
    .replace(/<div id="interactive-root"[^>]*><\/div>/g, '')
    .replace(/<script type="application\/json" id="interactive-data">[\s\S]*?<\/script>/g, '');

  const articleSchema = generateArticleSchema(article, slug);
  const strategicGuideCta = STRATEGIC_GUIDE_CTAS[slug] || CATEGORY_FALLBACK_CTAS[article.category];

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      <article className={styles.articlePage}>
        {/* Progress Line - animado al scroll */}
        <div className={styles.progressLine} aria-hidden="true" data-progress-line />

        {/* Navigation Breadcrumb */}
        <nav className={styles.articleNav}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={18} />
            <span>Volver</span>
          </Link>
          <span className={styles.categoryTag}>{article.category}</span>
        </nav>

        {/* Header Section */}
        <header className={styles.articleHeader}>
          <div className={styles.metaLine}>
            <span className={styles.author}>{article.author}</span>
            <span>•</span>
            <span className={styles.date}>{article.date}</span>
            <span>•</span>
            <span className={styles.readTime}>
              <Clock size={14} />
              {parseInt(article.readTime) || 5} min
            </span>
            {article.isAi && (
              <>
                <span>•</span>
                <span className="text-xs text-muted-foreground opacity-70">
                  Generado con asistencia de IA
                </span>
              </>
            )}
          </div>

          <h1 className={styles.articleTitle}>
            {article.title}
          </h1>

          {article.excerpt && (
            <p className={styles.articleExcerpt}>
              {article.excerpt}
            </p>
          )}

          <div className="mt-6 text-sm text-navy-50">
            <p>Fuente: {article.source ? `Redacción Huelva.cloud (fuente consultada: ${article.source})` : 'Redacción Huelva.cloud + fuentes locales verificadas'}</p>
            <p>Fecha de publicación: {article.date}</p>
          </div>
        </header>

        {/* Hero Image (solo si existe) */}
        {article.image && (
          <figure className={styles.heroImage}>
            <ArticleHeroImage
              src={article.image}
              alt={article.title}
              className={styles.heroImg}
            />
          </figure>
        )}

        {/* Main Content */}
        <main className={styles.articleContent}>
          {interactiveType && interactiveData && (
            <div className={styles.interactiveWrapper}>
              <InteractiveContainer type={interactiveType} data={interactiveData} />
            </div>
          )}

          {cleanedContent && (
            <ArticleRenderer content={cleanedContent} />
          )}

          {strategicGuideCta ? (
            <StrategicGuideCTA
              eyebrow={strategicGuideCta.eyebrow}
              title={strategicGuideCta.title}
              body={strategicGuideCta.body}
              primary={strategicGuideCta.primary}
              secondary={strategicGuideCta.secondary}
            />
          ) : null}
        </main>

        {relatedArticles.length > 0 && (
          <section className="max-w-4xl mx-auto px-4 md:px-0 mt-12">
            <div className="flex items-center gap-2 mb-4 text-navy-60">
              <Link2 size={16} />
              <h2 className="text-base font-semibold">Sigue por aquí si quieres afinar mejor la decisión</h2>
            </div>
            <div className="space-y-2">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  href={`/article/${related.slug}`}
                  className="block text-navy hover:text-terracotta transition-colors"
                >
                  {related.title}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Article Footer */}
        <footer className={styles.articleFooter}>
          <div className={styles.footerContent}>
            <AuthorBox author={authorData} />
          </div>
        </footer>
      </article>
    </>
  );
}
