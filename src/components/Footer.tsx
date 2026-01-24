import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>

        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>Huelva.is</span>
            <p className={styles.tagline}>
              Descubriendo Huelva con inteligencia (artificial) y corazón.
            </p>
            {/* Privacy Pledge */}
            <div className="mt-4 px-3 py-1 bg-green-50 text-green-800 text-xs font-bold rounded-full inline-block border border-green-200">
              🌱 Sin cookies. Sin rastreo. Solo Huelva.
            </div>
          </div>

          <div className={styles.links}>
            <h4>Explora</h4>
            <Link href="/comer">Comer</Link>
            <Link href="/eventos">Eventos</Link>
            <Link href="/alojarse">Alojarse</Link>
            <Link href="/guias">Guías</Link>
          </div>

          <div className={styles.links}>
            <h4>Transparencia</h4>
            <Link href="/ai-disclosure">Cómo funciona (IA)</Link>
            <Link href="/privacy">Privacidad</Link>
            <Link href="/legal">Aviso Legal</Link>
            <Link href="/admin">Admin Area</Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} Huelva.is · Made with ❤️ & 🤖 in Huelva.</p>
        </div>

      </div>
    </footer>
  );
}
