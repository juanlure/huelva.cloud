import React from 'react';
import styles from './page.module.css';
import { getArticleBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import { AUTHORS } from '@/lib/authors';
import InteractiveContainer from '@/components/InteractiveContainer';
import AuthorBox from '@/components/AuthorBox';

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

  const authorData = AUTHORS[article.author] || AUTHORS['El Choco'];

  // --- Lógica de Extracción de Interactividad ---
  let interactiveType = null;
  let interactiveData = null;
  let cleanedContent = article.content || '';

  // 1. Buscar marcador de tipo
  const typeMatch = cleanedContent.match(/<div id="interactive-root" data-component="([^"]+)"/);
  if (typeMatch) {
    interactiveType = typeMatch[1];
  }

  // 2. Buscar payload de datos
  const dataMatch = cleanedContent.match(/<script type="application\/json" id="interactive-data">([\s\S]*?)<\/script>/);
  if (dataMatch) {
    try {
      interactiveData = JSON.parse(dataMatch[1]);
    } catch (e) {
      console.error("Error parsing interactive data:", e);
    }
  }

  // 3. Limpiar HTML (esto es crudo pero efectivo para el MVP)
  if (interactiveType && interactiveData) {
    cleanedContent = cleanedContent
      .replace(/<div id="interactive-root"[^>]*><\/div>/g, '')
      .replace(/<script type="application\/json" id="interactive-data">[\s\S]*?<\/script>/g, '');
  }
  // ----------------------------------------------

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

            {/* Componente Interactivo (si existe) - Lo ponemos ANTES del cuerpo o intercalado? 
                Por ahora, lo ponemos al principio para dar wow factor si es un test o traductor */}
            {interactiveType && interactiveData && (
              <InteractiveContainer type={interactiveType} data={interactiveData} />
            )}

            {cleanedContent && (
              <div
                className={styles.prose}
                dangerouslySetInnerHTML={{ __html: cleanedContent }}
              />
            )}

            {/* Author Box */}
            <AuthorBox author={authorData} />

          </div>
        </section>
      </article>
    </main>
  );
}
