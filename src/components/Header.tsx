'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Navigation = [
    { name: 'Comer', href: '/comer' },
    { name: 'Eventos', href: '/eventos' },
    { name: 'Alojarse', href: '/alojarse' },
    { name: 'Guías', href: '/guias' },
    { name: 'Noticias', href: '/noticias' },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [time, setTime] = useState('');
    const [temp, setTemp] = useState('--');

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);

        // Simple Clock
        const timer = setInterval(() => {
            const now = new Date();
            setTime(now.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }));
        }, 1000);

        // Weather Fetch (Huelva coords: 37.25, -6.95)
        fetch('https://api.open-meteo.com/v1/forecast?latitude=37.25&longitude=-6.95&current_weather=true')
            .then(res => res.json())
            .then(data => setTemp(Math.round(data.current_weather.temperature).toString()));

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(timer);
        };
    }, []);

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    Huelva<span className={styles.dot}>.is</span>
                </Link>

                <nav className={styles.nav}>
                    {Navigation.map((item) => (
                        <Link key={item.name} href={item.href} className={styles.navLink}>
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
                        <span className={styles.icon}>☀️</span>
                        {temp}°C <span className={styles.loc}>Huelva</span>
                    </div>

                    <div className={styles.widget}>
                        <span className={styles.icon}>🕒</span>
                        {time}
                    </div>
                </div>
            </div>
        </header>
    );
}
