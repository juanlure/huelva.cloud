'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Cloud, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import WeatherWidget from '@/components/widgets/WeatherWidget';
import TimeWidget from '@/components/widgets/TimeWidget';

const NAVIGATION_ITEMS = [
    { name: 'Comer', href: '/comer' },
    { name: 'Eventos', href: '/eventos' },
    { name: 'Alojarse', href: '/alojarse' },
    { name: 'Guías', href: '/guias' },
    { name: 'Noticias', href: '/noticias' },
];

export default function Header() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
                isScrolled ? 'bg-cream/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent'
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-display font-bold text-navy tracking-tight"
                >
                    Huelva<span className="text-terracotta">.is</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {NAVIGATION_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'text-sm font-medium transition-colors hover:text-terracotta',
                                pathname === item.href ? 'text-terracotta' : 'text-navy/70'
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Widgets & Menu Toggle */}
                <div className="flex items-center space-x-6">
                    <div className="hidden lg:flex items-center space-x-4 border-l border-navy/10 pl-6">
                        <div className="flex items-center text-xs font-semibold text-navy/40 space-x-2">
                            <span className="text-terracotta">ES</span>
                            <span>|</span>
                            <span className="hover:text-navy/60 cursor-pointer">EN</span>
                        </div>
                        <div className="h-4 w-px bg-navy/10" />
                        <WeatherWidget />
                        <div className="h-4 w-px bg-navy/10" />
                        <TimeWidget />
                    </div>

                    <button
                        className="md:hidden p-2 text-navy hover:text-terracotta transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Alternar menú"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Mesh */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-cream shadow-xl border-t border-navy/5 md:hidden"
                    >
                        <nav className="flex flex-col p-6 space-y-4">
                            {NAVIGATION_ITEMS.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        'text-lg font-display font-medium py-2',
                                        pathname === item.href ? 'text-terracotta' : 'text-navy'
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="pt-6 border-t border-navy/5 flex items-center justify-between text-navy/60">
                                <WeatherWidget />
                                <TimeWidget />
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
