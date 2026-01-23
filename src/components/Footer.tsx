import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>Huelva<span className={styles.dot}>.is</span></span>
            <p className={styles.tagline}>Tu compañero local inteligente para descubrir la provincia de Huelva.</p>
          </div>
          
          <div className={styles.aiDisclosure}>
            <span className={styles.aiBadge}>AI CURATED</span>
            <p>Este sitio es curado con inteligencia artificial. Guiado por valores locales y honestidad choquera.</p>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} Huelva.is - De Huelva, por y para el mundo.</p>
          <div className={styles.links}>
            <a href="#">Aviso Legal</a>
            <a href="#">Privacidad</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
