import React from 'react';
import ArticleCard from '@/components/ArticleCard';
import { getArticles } from '@/lib/api';
import styles from './page.module.css';

// Mapa de slugs a títulos amigables
const categoryTitles: Record<string, string> = {
  'comer': 'Comer y Beber',
  'eventos': 'Agenda y Eventos',
  'alojarse': 'Dónde Dormir',
  'guias': 'Guías Locales',
  'noticias': 'Actualidad',
  'rutas': 'Rutas y Escapadas'
};

interface PageProps {
  params: {
    category: string;
  };
}

export function generateStaticParams() {
  return Object.keys(categoryTitles).map((category) => ({
    category,
  }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const title = categoryTitles[category] || category; // Fallback al slug
  const articles = await getArticles(category);

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className="container">
          <span className={styles.label}>Explorando</span>
          <h1 className={styles.title}>{title}<span className={styles.dot}>.</span></h1>
        </div>
      </header>

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
              <p>No hay artículos en esta categoría aún.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
