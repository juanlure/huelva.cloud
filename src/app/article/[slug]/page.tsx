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

const STRATEGIC_GUIDE_CTAS: Record<string, {
  eyebrow: string;
  title: string;
  body: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}> = {
  'que-hacer-en-huelva-guia-definitiva': {
    eyebrow: 'Siguiente paso útil',
    title: 'Si quieres criterio de verdad, entra en la flagship de qué ver',
    body: 'Este artículo te orienta. La guía premium de qué ver te ayuda a decidir mejor según tiempo, tipo de visita y zonas que sí compensan.',
    primary: { href: '/que-ver', label: 'Abrir guía de qué ver' },
    secondary: { href: '/agenda', label: 'Ver agenda de hoy' },
  },
  'que-ver-en-huelva-en-un-dia': {
    eyebrow: 'Decisión rápida',
    title: 'No improvises el recorrido: usa la guía completa de qué ver',
    body: 'Si ya sabes que vienes con poco tiempo, la flagship te ordena mejor el plan y evita meter paradas mediocres por rellenar.',
    primary: { href: '/que-ver', label: 'Abrir qué ver en Huelva' },
    secondary: { href: '/fin-de-semana', label: 'Ver plan de fin de semana' },
  },
  'playas-huelva-guia-completa': {
    eyebrow: 'Mejor siguiente paso',
    title: 'La versión buena de esta decisión está en la flagship de playas',
    body: 'Si vas a elegir playa según plan, viento, acceso y tipo de día, la guía premium de playas está bastante mejor resuelta que una lista genérica.',
    primary: { href: '/playas', label: 'Abrir guía de playas' },
    secondary: { href: '/tiempo', label: 'Mirar el tiempo antes de salir' },
  },
  'mejores-playas-huelva-guia-real': {
    eyebrow: 'Atajo útil',
    title: 'Cruza esta guía con la flagship de playas y decidirás más rápido',
    body: 'Aquí tienes contexto editorial. En la guía premium tienes la versión preparada para comparar mejor según el tipo de día que quieres tener.',
    primary: { href: '/playas', label: 'Comparar playas en la flagship' },
    secondary: { href: '/tiempo', label: 'Ver previsión y viento' },
  },
  'mejores-restaurantes-huelva-2026': {
    eyebrow: 'Siguiente capa',
    title: 'Para comer bien sin regalar una comida, usa la flagship de dónde comer',
    body: 'La guía premium está pensada para decidir según presupuesto, vibe, zona y tipo de comida. Menos lista, más criterio.',
    primary: { href: '/donde-comer', label: 'Abrir guía de dónde comer' },
    secondary: { href: '/guias/choco', label: 'Ver traductor de choco' },
  },
  'mejores-restaurantes-huelva': {
    eyebrow: 'Siguiente capa',
    title: 'Este artículo orienta; la flagship de dónde comer convierte mejor',
    body: 'Si ya estás comparando sitios, entra en la guía premium para filtrar rápido y elegir con más intención.',
    primary: { href: '/donde-comer', label: 'Abrir flagship gastronómica' },
    secondary: { href: '/guias/cafe', label: 'Ver traductor de café' },
  },
  'huelva-48-horas-itinerario-completo': {
    eyebrow: 'Plan resuelto',
    title: 'Si vienes un finde, usa la flagship de fin de semana',
    body: 'Este itinerario inspira. La página premium de fin de semana aterriza mejor el ritmo, las decisiones y el orden de juego.',
    primary: { href: '/fin-de-semana', label: 'Abrir guía de fin de semana' },
    secondary: { href: '/alojarse', label: 'Ver dónde alojarse' },
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
  const strategicGuideCta = STRATEGIC_GUIDE_CTAS[slug];

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
              <h2 className="text-base font-semibold">Relacionado en {article.category}</h2>
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
