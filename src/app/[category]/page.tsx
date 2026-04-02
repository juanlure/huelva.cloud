import React from 'react';
import ArticleCard from '@/components/ArticleCard';
import { getArticles } from '@/lib/api';
import { ArrowLeft, TrendingUp, Calendar } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';
import type { Metadata } from 'next';

import { CATEGORY_TITLES } from '@/lib/constants';

export function generateStaticParams() {
  return Object.keys(CATEGORY_TITLES).map((category) => ({
    category,
  }));
}

// Generate metadata for each category
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const title = CATEGORY_TITLES[category.toLowerCase()] || category;
  
  const metaDescriptions: Record<string, string> = {
    'comer': 'Dónde comer en Huelva: choco frito, coquinas, gamba blanca, tapas y restaurantes que sí merecen la pena. Guía local sin humo.',
    'eventos': 'Agenda de eventos en Huelva 2026: ferias, conciertos, mercados, escapadas y planes. Lo útil para saber qué hacer en capital y provincia.',
    'alojarse': 'Dónde dormir en Huelva: hoteles, apartamentos y alojamientos recomendados. Zonas, precios y consejos locales.',
    'guias': 'Guías de Huelva: qué ver, rutas, playas, pueblos y escapadas. Descubre la provincia como un local y no como otro turista perdido.',
    'noticias': 'Noticias de Huelva: actualidad local, provincia, cultura y señales que afectan a la agenda real. Información relevante para onubenses y visitantes.',
  };

  const metaTitles: Record<string, string> = {
    'comer': 'Dónde Comer en Huelva 2026 | Tapas, Choco Frito y Restaurantes',
    'eventos': 'Agenda de Huelva 2026 | Eventos, Planes y Qué Hacer',
    'alojarse': 'Dónde Dormir en Huelva | Hoteles y Alojamientos 2026',
    'guias': 'Qué Ver en Huelva | Guías, Playas, Pueblos y Escapadas',
    'noticias': 'Noticias Huelva | Actualidad Local y Provincial 2026',
  };

  return {
    title: metaTitles[category.toLowerCase()] || `${title} | Huelva.cloud`,
    description: metaDescriptions[category.toLowerCase()] || `Descubre ${title} en Huelva. Guía local con información actualizada.`,
    keywords: `Huelva, ${title}, ${category}, Andalucía, guía local`,
    alternates: {
      canonical: `https://huelva.cloud/${category}`,
    },
  };
}

// Generate Event Schema for eventos category
function safeIsoDate(value?: string) {
  const date = new Date(value || '');
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function generateEventSchema(articles: any[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: articles.slice(0, 10).map((article, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Event',
        name: article.title,
        description: article.excerpt,
        url: `https://huelva.cloud/article/${article.slug}`,
        image: article.image ? `https://huelva.cloud${article.image}` : undefined,
        eventStatus: 'https://schema.org/EventScheduled',
        ...(safeIsoDate(article.date) && {
          startDate: safeIsoDate(article.date),
        }),
        location: {
          '@type': 'Place',
          name: 'Huelva',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Huelva',
            addressRegion: 'Andalucía',
            addressCountry: 'ES',
          },
        },
      },
    })),
  };
}

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const title = CATEGORY_TITLES[category.toLowerCase()] || category;
  const articles = await getArticles(category);
  const lastUpdated = articles[0]?.date || null;

  // Generate Event Schema if this is the eventos category
  const eventSchema = category.toLowerCase() === 'eventos' ? generateEventSchema(articles) : null;

  return (
    <>
      {/* Event Schema for eventos category */}
      {eventSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
      )}
      
      <main className={styles.main}>
        {/* Enhanced Header */}
        <header className={styles.header}>
          <div className="container">
            {/* Back button */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-navy/60 hover:text-terracotta transition-colors mb-6 font-medium text-sm"
            >
              <ArrowLeft size={18} />
              Volver al inicio
            </Link>

            {/* Category badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-4">
              <TrendingUp size={16} className="text-terracotta" />
              <span className="text-sm font-semibold uppercase tracking-widest text-navy/60">
                Explorando
              </span>
            </div>

            {lastUpdated && (
              <p className="text-sm text-navy/50 mb-6">Última actualización: {lastUpdated}</p>
            )}

            <h1 className={styles.title}>{title}<span className={styles.dot}>.</span></h1>

            {/* Meta info */}
            <p className="mt-4 text-navy/60 text-lg max-w-2xl">
              {category === 'noticias'
                ? `Todos los ${articles.length} artículos sobre Huelva, ordenados por fecha.`
                : articles.length > 0
                  ? `${articles.length} artículos para descubrir lo mejor de Huelva.`
                  : 'Próximamente encontrarás contenido increíble aquí.'
              }
            </p>

            {/* Event info banner for eventos */}
            {category.toLowerCase() === 'eventos' && articles.length > 0 && (
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full text-terracotta text-sm">
                <Calendar size={16} />
                <span>{articles.length} eventos programados</span>
              </div>
            )}
          </div>
        </header>

        {/* Articles Grid / Noticias List */}
        <section className={styles.content}>
          <div className="container">
            {articles.length > 0 ? (
              category === 'noticias' ? (
                <div className="max-w-4xl mx-auto space-y-4">
                  {articles.map((article, idx) => (
                    <Link
                      key={article.slug || idx}
                      href={`/article/${article.slug}`}
                      className="block bg-white rounded-2xl border border-navy/10 p-6 hover:border-terracotta/30 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <span className="text-xs uppercase tracking-wider text-terracotta font-semibold">
                          {article.source || 'Redacción Huelva.cloud'}
                        </span>
                        <span className="text-xs text-navy/50">{article.date}</span>
                      </div>
                      <h3 className="font-display text-2xl text-navy leading-tight mb-2 hover:text-terracotta transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-navy/70 leading-relaxed">{article.excerpt}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className={styles.grid}>
                  {articles.map((article, idx) => (
                    <ArticleCard
                      key={idx}
                      {...article}
                      imageUrl={article.image}
                      publishedAt={article.date}
                      readTime={parseInt(article.readTime)}
                      author={{ name: article.author }}
                    />
                  ))}
                </div>
              )
            ) : (
              <div className={styles.emptyState}>
                <p className="font-display text-xl text-navy mb-2">
                  Próximamente
                </p>
                <p className="text-navy/50">
                  Estamos preparando contenido increíble sobre {title.toLowerCase()}.
                  Mientras tanto, explora nuestras otras categorías.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-terracotta text-white font-semibold rounded-full hover:bg-terracotta-500 transition-colors"
                >
                  Volver al inicio
                  <ArrowLeft size={18} />
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
