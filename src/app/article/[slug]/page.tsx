import React from 'react';
import styles from './page.module.css';
import { getArticleBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import { AUTHORS } from '@/lib/authors';

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

            {/* Author Box */}
            <div className={styles.authorSection}>
               <div className={styles.authorBox}>
                  <img src={authorData.avatar} alt={authorData.name} className={styles.authorAvatar} />
                  <div className={styles.authorInfo}>
                    <h3>{authorData.name}</h3>
                    <div className={styles.authorMeta}>
                       <span className={styles.authorRole}>{authorData.role}</span>
                       <span className={styles.aiBadge}>AI Editorial Persona · Synthetic Profile</span>
                    </div>
                    <p className={styles.authorBio}>{authorData.bio}</p>
                  </div>
               </div>

               {/* AI Disclosure */}
               <div className={styles.aiDisclosure}>
                  <p>
                    <strong>Transparencia IA:</strong> Este artículo ha sido generado automáticamente por inteligencia artificial 
                    y curado por sistemas autónomos. <a href="/ai-disclosure">Saber más</a>.
                  </p>
               </div>
            </div>

          </div>
        </section>
      </article>
    </main>
  );
}
