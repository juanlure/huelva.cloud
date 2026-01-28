import Link from 'next/link';
import { getArticleBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import { AUTHORS } from '@/lib/authors';
import InteractiveContainer from '@/components/InteractiveContainer';
import AuthorBox from '@/components/AuthorBox';
import ArticleRenderer from '@/components/article/ArticleRenderer';
import { Clock, ArrowLeft } from 'lucide-react';
import styles from './ArticlePage.module.css';

interface PageProps {
  params: { slug: string };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const authorData = AUTHORS[article.author] || AUTHORS['El Choco'];

  // --- Extract interactive components ---
  let interactiveType = null;
  let interactiveData = null;
  let cleanedContent = article.content || '';

  const typeMatch = cleanedContent.match(/<div id="interactive-root" data-component="([^"]+)"/);
  if (typeMatch) interactiveType = typeMatch[1];

  const dataMatch = cleanedContent.match(/<script type="application\/json" id="interactive-data">([\s\S]*?)<\/script>/);
  if (dataMatch) {
    try {
      interactiveData = JSON.parse(dataMatch[1]);
    } catch (e) {
      console.error("Error parsing interactive data:", e);
    }
  }

  if (interactiveType && interactiveData) {
    cleanedContent = cleanedContent
      .replace(/<div id="interactive-root"[^>]*><\/div>/g, '')
      .replace(/<script type="application\/json" id="interactive-data">[\s\S]*?<\/script>/g, '');
  }

  return (
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
      </header>

      {/* Hero Image */}
      <figure className={styles.heroImage}>
        <img
          src={article.image || '/images/placeholder.jpg'}
          alt={article.title}
          className={styles.heroImg}
          loading="eager"
        />
      </figure>

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

      {/* Article Footer */}
      <footer className={styles.articleFooter}>
        <div className={styles.footerContent}>
          <AuthorBox author={authorData} />
        </div>
      </footer>
    </article>
  );
}
