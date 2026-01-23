import React from 'react';
import styles from './ArticleCard.module.css';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  slug: string;
  isAi?: boolean;
}

export default function ArticleCard({ 
  title, 
  excerpt, 
  category, 
  image, 
  date, 
  readTime, 
  slug,
  isAi = true 
}: ArticleCardProps) {
  return (
    <article className={styles.card}>
      <a href={`/article/${slug}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          <img src={image} alt={title} className={styles.image} />
          <span className={styles.category}>{category}</span>
          {isAi && <span className={styles.aiBadge}>AI</span>}
        </div>
        
        <div className={styles.content}>
          <div className={styles.meta}>
            <span className={styles.date}>{date}</span>
            <span className={styles.dot}>•</span>
            <span className={styles.readTime}>{readTime} read</span>
          </div>
          
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.excerpt}>{excerpt}</p>
        </div>
      </a>
    </article>
  );
}
