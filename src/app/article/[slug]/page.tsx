import Link from 'next/link';
import { getArticleBySlug, getArticles } from '@/lib/api';
import { notFound } from 'next/navigation';
import { AUTHORS } from '@/lib/authors';
import InteractiveContainer from '@/components/InteractiveContainer';
import AuthorBox from '@/components/AuthorBox';
import ArticleRenderer from '@/components/article/ArticleRenderer';
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
      publishedTime: article.date,
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
    datePublished: article.date,
    dateModified: article.date,
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
            <img
              src={article.image}
              alt={article.title}
              className={styles.heroImg}
              loading="eager"
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
