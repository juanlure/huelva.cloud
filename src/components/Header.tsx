'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
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

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-cream/90 backdrop-blur-md shadow-sm py-4 border-b border-navy/10'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-1 group"
          >
            <span className="text-display text-2xl font-semibold text-navy group-hover:text-terracotta transition-colors">
              Huelva
            </span>
            <span className="text-display text-2xl font-semibold text-terracotta">.cloud</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center gap-1">
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-5 py-2.5 text-sm font-medium transition-all duration-300 relative ${
                      isActive
                        ? 'text-terracotta'
                        : 'text-navy-60 hover:text-navy'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            {/* Widgets */}
            <div className="hidden xl:flex items-center gap-4 text-sm text-navy-40">
              <WeatherWidget />
              <span className="w-px h-4 bg-navy-10" />
              <TimeWidget />
            </div>

            {/* Guides CTA */}
            <Link
              href="#guias"
              className="hidden md:flex btn btn-sm btn-primary"
            >
              Guías
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2.5 text-navy hover:text-terracotta transition-colors rounded-full hover:bg-navy/5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Alternar menú"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-cream border-b border-navy/10 shadow-lg"
          >
            <nav className="flex flex-col p-6">
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-3 text-lg font-medium transition-colors ${
                      isActive ? 'text-terracotta' : 'text-navy hover:text-terracotta'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="flex items-center justify-around pt-6 mt-6 border-t border-navy-10">
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
