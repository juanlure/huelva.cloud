'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';
import WeatherWidget from '@/components/widgets/WeatherWidget';
import TimeWidget from '@/components/widgets/TimeWidget';

const NAVIGATION_ITEMS = [
  { name: 'Agenda', href: '/agenda' },
  { name: 'Comer', href: '/comer' },
  { name: 'Eventos', href: '/eventos' },
  { name: 'Alojarse', href: '/alojarse' },
  { name: 'Guías', href: '/guias' },
  { name: 'Noticias', href: '/noticias' },
  { name: 'Tiempo', href: '/tiempo' },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 32);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-white/82 backdrop-blur-2xl shadow-[0_18px_60px_rgba(26,42,58,0.10)] border-b border-navy/8'
          : 'py-4 bg-white/62 backdrop-blur-xl border-b border-white/40'
      }`}
    >
      <div className="container overflow-visible">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-terracotta to-orange-600 text-white flex items-center justify-center shadow-[0_12px_30px_rgba(212,85,58,0.35)] text-sm font-bold">
              HC
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-display text-2xl font-bold text-navy group-hover:text-terracotta transition-colors">Huelva</span>
                <span className="text-display text-2xl font-bold text-terracotta">.cloud</span>
              </div>
              <p className="hidden md:block text-[11px] uppercase tracking-[0.22em] text-navy/38 font-semibold">Guía local con criterio</p>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center">
            <div className="flex items-center gap-1 rounded-full border border-white/70 bg-white/65 backdrop-blur-md px-2 py-1 shadow-[0_10px_40px_rgba(26,42,58,0.06)]">
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2.5 text-sm font-semibold tracking-tight transition-all duration-300 relative rounded-full ${
                      isActive ? 'text-terracotta' : 'text-navy/80 hover:text-terracotta'
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-full bg-terracotta/10 border border-terracotta/15"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="flex items-center gap-4 lg:gap-6 shrink-0">
            <div className="hidden 2xl:flex items-center gap-4 text-sm text-navy/55 rounded-full border border-white/70 bg-white/65 backdrop-blur-md px-4 py-2 shadow-[0_10px_40px_rgba(26,42,58,0.06)]">
              <WeatherWidget />
              <span className="w-px h-4 bg-navy/10" />
              <TimeWidget />
            </div>

            <Link
              href="/guias"
              className="hidden md:inline-flex items-center gap-2 px-5 py-3 rounded-full bg-navy text-white text-sm font-semibold hover:bg-terracotta transition-colors shadow-[0_12px_30px_rgba(26,42,58,0.16)]"
            >
              <Sparkles size={15} />
              Ver guías
              <ArrowRight size={15} />
            </Link>

            <button
              className="xl:hidden p-3 transition-colors rounded-full text-navy hover:bg-navy/5 border border-navy/10 bg-white/70 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Alternar menú"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden absolute top-full left-0 right-0 bg-white/96 backdrop-blur-2xl border-b border-navy/10 shadow-[0_18px_60px_rgba(26,42,58,0.10)]"
          >
            <nav className="flex flex-col p-6 gap-2">
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-3.5 text-base rounded-2xl font-semibold transition-colors ${
                      isActive ? 'text-terracotta bg-terracotta/8' : 'text-navy hover:text-terracotta hover:bg-navy/3'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="flex items-center justify-between pt-5 mt-4 border-t border-navy/10 text-sm text-navy/60">
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
