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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] py-3 border-b border-navy/5'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container overflow-visible">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-1 group"
          >
            <span className={`text-display text-2xl font-bold transition-colors ${
              isScrolled ? 'text-navy' : 'text-white'
            } group-hover:text-terracotta`}>
              Huelva
            </span>
            <span className="text-display text-2xl font-bold text-terracotta">.cloud</span>
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
                    className={`px-5 py-2.5 text-sm font-semibold tracking-tight transition-all duration-300 relative group/link ${
                      isActive
                        ? 'text-terracotta'
                        : isScrolled ? 'text-navy hover:text-terracotta' : 'text-white hover:text-white/80'
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
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
            <div className={`hidden xl:flex items-center gap-4 text-sm transition-colors ${
              isScrolled ? 'text-navy/50' : 'text-white/60'
            }`}>
              <WeatherWidget />
              <span className={`w-px h-4 ${isScrolled ? 'bg-navy/10' : 'bg-white/10'}`} />
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
              className={`lg:hidden p-2.5 transition-colors rounded-full ${
                isScrolled ? 'text-navy hover:bg-navy/5' : 'text-white hover:bg-white/10'
              }`}
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
