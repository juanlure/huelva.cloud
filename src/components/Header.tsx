'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { usePathname } from 'next/navigation';
import WeatherWidget from '@/components/widgets/WeatherWidget';
import TimeWidget from '@/components/widgets/TimeWidget';

const Navigation = [
    { name: 'Comer', href: '/comer' },
    { name: 'Eventos', href: '/eventos' },
    { name: 'Alojarse', href: '/alojarse' },
    { name: 'Guías', href: '/guias' },
    { name: 'Noticias', href: '/noticias' },
];

export default function Header() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const isArticlePage = pathname?.startsWith('/article/');

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${menuOpen ? styles.menuOpen : ''} ${isArticlePage ? styles.inverted : ''}`}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
                    Huelva<span className={styles.dot}>.is</span>
                </Link>

                <nav className={`${styles.nav} ${menuOpen ? styles.active : ''}`}>
                    {Navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={styles.navLink}
                            onClick={() => setMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className={styles.widgets}>
                    <div className={styles.langToggle}>
                        <span className={styles.activeLang}>ES</span>
                        <span className={styles.sep}>|</span>
                        <span className={styles.inactiveLang}>EN</span>
                    </div>

                    <div className={styles.widget}>
                        <WeatherWidget />
                    </div>

                    <div className={styles.widget}>
                        <TimeWidget />
                    </div>
                </div>

                <button
                    className={styles.menuButton}
                    onClick={toggleMenu}
                    aria-label="Menu"
                >
                    <span className={styles.hamburger}></span>
                </button>
            </div>
        </header>
    );
}
