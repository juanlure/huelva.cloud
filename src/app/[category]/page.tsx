import React from 'react';
import ArticleCard from '@/components/ArticleCard';
import { getArticles } from '@/lib/api';
import { ArrowLeft, TrendingUp, Calendar, ArrowRight, Sparkles, Compass, Newspaper } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';
import type { Metadata } from 'next';

import { CATEGORY_TITLES } from '@/lib/constants';

export function generateStaticParams() {
  return Object.keys(CATEGORY_TITLES).map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const title = CATEGORY_TITLES[category.toLowerCase()] || category;

  const metaDescriptions: Record<string, string> = {
    comer: 'Dónde comer en Huelva: choco frito, coquinas, gamba blanca, tapas y restaurantes que sí merecen la pena. Guía local sin humo.',
    eventos: 'Agenda de eventos en Huelva 2026: ferias, conciertos, mercados, escapadas y planes. Lo útil para saber qué hacer en capital y provincia.',
    alojarse: 'Dónde dormir en Huelva: hoteles, apartamentos y alojamientos recomendados. Zonas, precios y consejos locales.',
    guias: 'Guías de Huelva: qué ver, rutas, playas, pueblos y escapadas. Descubre la provincia como un local y no como otro turista perdido.',
    noticias: 'Noticias de Huelva: actualidad local, provincia, cultura y señales que afectan a la agenda real. Información relevante para onubenses y visitantes.',
  };

  const metaTitles: Record<string, string> = {
    comer: 'Dónde Comer en Huelva 2026 | Tapas, Choco Frito y Restaurantes',
    eventos: 'Agenda de Huelva 2026 | Eventos, Planes y Qué Hacer',
    alojarse: 'Dónde Dormir en Huelva | Hoteles y Alojamientos 2026',
    guias: 'Qué Ver en Huelva | Guías, Playas, Pueblos y Escapadas',
    noticias: 'Noticias Huelva | Actualidad Local y Provincial 2026',
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
        ...(safeIsoDate(article.publishedAtISO || article.date) && {
          startDate: safeIsoDate(article.publishedAtISO || article.date),
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

const categoryIntro: Record<string, { eyebrow: string; description: string; ctaLabel?: string; ctaHref?: string; kicker: string }> = {
  comer: {
    eyebrow: 'Producto, bares y criterio',
    description: 'Aquí va lo que sí merece sentarte a comer en Huelva: pescado, tapas, desayunos y sitios con sentido. Menos lista vacía, más utilidad real.',
    kicker: 'Dónde comer bien sin caer en la trampa turística.',
  },
  eventos: {
    eyebrow: 'La parte viva de Huelva',
    description: 'Planes, agenda, escapadas y señales de lo que se mueve en capital y provincia. Si toca salir de casa, empieza aquí.',
    ctaLabel: 'Ver agenda viva',
    ctaHref: '/agenda',
    kicker: 'Qué se mueve ahora y qué merece tu tiempo.',
  },
  alojarse: {
    eyebrow: 'Dormir sin cagarla',
    description: 'Dónde alojarte en Huelva según plan, presupuesto y zona. Poco volumen aún, así que prima la utilidad sobre el relleno.',
    kicker: 'Zonas, contexto y alojamientos con sentido.',
  },
  guias: {
    eyebrow: 'Descubrir Huelva de verdad',
    description: 'Guías para entender la ciudad y la provincia con ojos de local: playas, pueblos, patrimonio, rutas y dudas prácticas.',
    kicker: 'La capa útil para no venir a ciegas.',
  },
  noticias: {
    eyebrow: 'Actualidad útil',
    description: 'Noticias y señales que afectan al día a día, la agenda y el contexto local. Nada de ruido por rellenar una portada.',
    kicker: 'Lo importante antes de que se convierta en ruido.',
  },
};

const categorySignals: Record<string, string[]> = {
  comer: ['Restaurantes con criterio', 'Tapas que merecen rodeo', 'Guías locales sin relleno'],
  eventos: ['Agenda viva', 'Escapadas y planes', 'Provincia en movimiento'],
  alojarse: ['Zonas recomendadas', 'Hoteles y apartamentos', 'Consejo local antes de reservar'],
  guias: ['Playas y pueblos', 'Rutas y patrimonio', 'Respuestas prácticas'],
  noticias: ['Actualidad local', 'Contexto útil', 'Señales que importan'],
};

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const normalizedCategory = category.toLowerCase();
  const title = CATEGORY_TITLES[normalizedCategory] || category;
  const articles = await getArticles(category);
  const lastUpdated = articles[0]?.publishedLabel || null;
  const intro = categoryIntro[normalizedCategory];
  const featured = articles[0];
  const rest = articles.slice(1);
  const eventSchema = normalizedCategory === 'eventos' ? generateEventSchema(articles) : null;
  const signals = categorySignals[normalizedCategory] || ['Selección local', 'Información actualizada', 'Enfoque útil'];

  return (
    <>
      {eventSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
      )}

      <main className={styles.main}>
        <header className={styles.header}>
          <div className="container">
            <div className={styles.headerCard}>
              <div className={styles.headerTopRow}>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-navy/60 hover:text-terracotta transition-colors font-medium text-sm"
                >
                  <ArrowLeft size={18} />
                  Volver al inicio
                </Link>

                {lastUpdated && (
                  <p className="text-sm text-navy/45">Última actualización: {lastUpdated}</p>
                )}
              </div>

              <div className={styles.headerGrid}>
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/70 bg-white/70 mb-5 shadow-[0_10px_30px_rgba(26,42,58,0.05)]">
                    <TrendingUp size={16} className="text-terracotta" />
                    <span className="text-sm font-semibold uppercase tracking-widest text-navy/60">
                      {intro?.eyebrow || 'Explorando Huelva'}
                    </span>
                  </div>

                  <h1 className={styles.title}>{title}<span className={styles.dot}>.</span></h1>

                  <p className={styles.kicker}>
                    {intro?.kicker || `Una selección útil para entender ${title.toLowerCase()} en Huelva.`}
                  </p>

                  <p className={styles.description}>
                    {intro?.description || `Descubre ${title} en Huelva con una selección útil de artículos.`}
                  </p>

                  <div className={styles.actions}>
                    {intro?.ctaHref && intro?.ctaLabel ? (
                      <Link href={intro.ctaHref} className="btn btn-secondary">
                        {intro.ctaLabel}
                        <ArrowRight size={16} />
                      </Link>
                    ) : (
                      <Link href="/guias" className="btn btn-secondary">
                        Explorar más guías
                        <ArrowRight size={16} />
                      </Link>
                    )}

                    <div className={styles.metaChip}>
                      <Sparkles size={15} className="text-terracotta" />
                      <span>{articles.length} piezas publicadas</span>
                    </div>

                    {normalizedCategory === 'eventos' && articles.length > 0 && (
                      <div className={styles.metaChipAccent}>
                        <Calendar size={15} />
                        <span>Agenda activa</span>
                      </div>
                    )}
                  </div>
                </div>

                <aside className={styles.sidePanel}>
                  <div className={styles.sidePanelHeader}>
                    <Compass size={17} className="text-terracotta" />
                    <span>Radar de esta sección</span>
                  </div>

                  <div className={styles.signalList}>
                    {signals.map((signal) => (
                      <div key={signal} className={styles.signalItem}>
                        <span className={styles.signalDot} />
                        <span>{signal}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.sideNote}>
                    <Newspaper size={16} className="text-navy/45" />
                    <p>
                      Huelva.cloud no va de inflar páginas. Va de que encuentres antes lo que merece tu tiempo.
                    </p>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </header>

        <section className={styles.content}>
          <div className="container">
            {articles.length > 0 ? (
              <div className="space-y-14">
                {featured && normalizedCategory !== 'noticias' && (
                  <section className={styles.sectionBlock}>
                    <div className={styles.sectionHeading}>
                      <div>
                        <p className={styles.sectionEyebrow}>Destacado</p>
                        <h2 className={styles.sectionTitle}>Empieza por aquí</h2>
                      </div>
                      <p className={styles.sectionCopy}>La pieza que mejor abre esta categoría sin hacerte perder tiempo.</p>
                    </div>

                    <ArticleCard
                      {...featured}
                      imageUrl={featured.image}
                      publishedAt={featured.publishedAtISO}
                      readTime={parseInt(featured.readTime)}
                      author={{ name: featured.author }}
                      featured
                    />
                  </section>
                )}

                {normalizedCategory === 'noticias' ? (
                  <section className={styles.newsFeed}>
                    <div className={styles.sectionHeading}>
                      <div>
                        <p className={styles.sectionEyebrow}>Actualidad</p>
                        <h2 className={styles.sectionTitle}>Señales de Huelva</h2>
                      </div>
                      <p className={styles.sectionCopy}>Noticias con una presentación más limpia y menos aspecto de bloque genérico.</p>
                    </div>

                    <div className={styles.newsList}>
                      {articles.map((article, idx) => (
                        <Link
                          key={article.slug || idx}
                          href={`/article/${article.slug}`}
                          className={styles.newsItem}
                        >
                          <div className={styles.newsMeta}>
                            <span className={styles.newsSource}>{article.source || 'Redacción Huelva.cloud'}</span>
                            <span className={styles.newsDate}>{article.date}</span>
                          </div>
                          <h3 className={styles.newsTitle}>{article.title}</h3>
                          <p className={styles.newsExcerpt}>{article.excerpt}</p>
                          <span className={styles.newsCta}>
                            Leer noticia
                            <ArrowRight size={15} />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </section>
                ) : (
                  rest.length > 0 && (
                    <section className={styles.sectionBlock}>
                      <div className={styles.sectionHeading}>
                        <div>
                          <p className={styles.sectionEyebrow}>Archivo útil</p>
                          <h2 className={styles.sectionTitle}>Todos los artículos de {title.toLowerCase()}</h2>
                        </div>
                        <p className={styles.sectionCopy}>Más profundidad, más contexto y una parrilla que ya no parece un listado sin acabar.</p>
                      </div>

                      <div className={styles.grid}>
                        {rest.map((article, idx) => (
                          <ArticleCard
                            key={article.slug || idx}
                            {...article}
                            imageUrl={article.image}
                            publishedAt={article.publishedAtISO}
                            readTime={parseInt(article.readTime)}
                            author={{ name: article.author }}
                          />
                        ))}
                      </div>
                    </section>
                  )
                )}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p className="font-display text-2xl text-navy mb-3">Próximamente</p>
                <p className="text-navy/55 max-w-xl mx-auto">
                  Estamos preparando contenido sobre {title.toLowerCase()}. Mejor eso que publicar paja para llenar una URL.
                </p>
                <Link href="/" className="btn btn-primary mt-8">
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
