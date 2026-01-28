import React from 'react';
import ArticleCard from '@/components/ArticleCard';
import { getArticles } from '@/lib/api';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';

import { CATEGORY_TITLES } from '@/lib/constants';

export function generateStaticParams() {
  return Object.keys(CATEGORY_TITLES).map((category) => ({
    category,
  }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const title = CATEGORY_TITLES[category.toLowerCase()] || category;
  const articles = await getArticles(category);

  return (
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6">
            <TrendingUp size={16} className="text-terracotta" />
            <span className="text-sm font-semibold uppercase tracking-widest text-navy/60">
              Explorando
            </span>
          </div>

          <h1 className={styles.title}>{title}<span className={styles.dot}>.</span></h1>

          {/* Meta info */}
          <p className="mt-4 text-navy/60 text-lg max-w-2xl">
            {articles.length > 0
              ? `${articles.length} artículos para descubrir lo mejor de Huelva.`
              : 'Próximamente encontrarás contenido increíble aquí.'
            }
          </p>
        </div>
      </header>

      {/* Articles Grid */}
      <section className={styles.content}>
        <div className="container">
          <div className={styles.grid}>
            {articles.length > 0 ? (
              articles.map((article, idx) => (
                <ArticleCard
                  key={idx}
                  {...article}
                  imageUrl={article.image}
                  publishedAt={article.date}
                  readTime={parseInt(article.readTime)}
                  author={{ name: article.author }}
                />
              ))
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
        </div>
      </section>
    </main>
  );
}
