import styles from './page.module.css';
import ArticleCard from '@/components/ArticleCard';
import { getArticles } from '@/lib/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const articles = await getArticles();

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>
            Huelva<span className={styles.dot}>.is</span> alive
          </h1>
          
          <div className={styles.ctaWrapper}>
            <a href="/test" className={styles.ctaButton}>
              <span className={styles.ctaIcon}>👁️</span>
              Are you a <span className={styles.highlight}>Choquero</span> or a Guiri? <strong>Take the test</strong>
              <span className={styles.ctaArrow}>→</span>
            </a>
          </div>

          <div className={styles.startHere}>
            <h2>Start here</h2>
            <p>If it's your first time, or you want Huelva done right.</p>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.grid}>
            {articles.slice(0, 6).map((article, idx) => (
               <ArticleCard key={idx} {...article} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
