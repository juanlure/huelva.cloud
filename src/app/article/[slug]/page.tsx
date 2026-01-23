import React from 'react';
import styles from './page.module.css';
import { getArticleBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound(); 
  }

  return (
    <main className={styles.main}>
      <article className={styles.article}>
        {/* Hero de Artículo */}
        <header 
          className={styles.header} 
          style={{ backgroundImage: `url(${article.image || '/images/placeholder.jpg'})` }}
        >
          <div className={styles.imageOverlay}></div>
          
          <div className={`container ${styles.headerContent}`}>
            <span className={styles.category}>{article.category}</span>
            <h1 className={styles.title}>{article.title}</h1>
            
            <div className={styles.meta}>
              <span>{article.date}</span>
              <span className={styles.dot}>•</span>
              <span>{article.readTime} lectura</span>
              <span className={styles.dot}>•</span>
              {article.isAi && <span className={styles.aiBadge}>Curado con IA</span>}
            </div>
          </div>
        </header>

        {/* Contenido */}
        <section className={`container ${styles.bodyContainer}`}>
          <div className={styles.contentWrapper}>
            <p className={styles.lead}>{article.excerpt}</p>
            {article.content && (
              <div 
                className={styles.prose}
                dangerouslySetInnerHTML={{ __html: article.content }} 
              />
            )}
          </div>
        </section>
      </article>
    </main>
  );
}
