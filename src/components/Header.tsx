'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, ArrowRight, Dot, Compass } from 'lucide-react';
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
    const handleScroll = () => setIsScrolled(window.scrollY > 28);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-[52px] left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3 bg-[rgba(255,255,255,0.78)] backdrop-blur-2xl shadow-[0_24px_70px_rgba(26,42,58,0.10)] border-b border-[rgba(26,42,58,0.06)]'
          : 'py-4 bg-[linear-gradient(180deg,rgba(255,255,255,0.62),rgba(255,255,255,0.28))] backdrop-blur-xl border-b border-white/30'
      }`}
    >
      <div className="container overflow-visible">
        <div className="flex items-center justify-between gap-6 rounded-[2rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.42))] px-4 py-2.5 shadow-[0_18px_50px_rgba(26,42,58,0.07)] backdrop-blur-xl md:px-5">
          <div className="flex items-center gap-6 min-w-0">
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-11 h-11 rounded-[1.35rem] bg-[linear-gradient(135deg,#D4553A_0%,#E56C49_52%,#C5402A_100%)] text-white flex items-center justify-center shadow-[0_18px_40px_rgba(212,85,58,0.34)] text-sm font-bold ring-1 ring-white/25">
                HC
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1 leading-none">
                  <span className="text-display text-[1.9rem] font-bold text-navy group-hover:text-terracotta transition-colors">Huelva</span>
                  <span className="text-display text-[1.9rem] font-bold text-terracotta">.cloud</span>
                </div>
                <div className="hidden lg:flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-navy/40 font-semibold mt-1">
                  <span>Guía local con criterio</span>
                  <Dot size={12} />
                  <span>Huelva sin folletos</span>
                </div>
              </div>
            </Link>

            <div className="hidden 2xl:flex items-center gap-3 rounded-full border border-white/80 bg-[rgba(255,255,255,0.76)] px-4 py-2 shadow-[0_12px_30px_rgba(26,42,58,0.05)] text-sm text-navy/60 backdrop-blur-md">
              <Compass size={15} className="text-terracotta" />
              <span className="font-medium">Capital + costa + provincia</span>
            </div>
          </div>

          <nav className="hidden xl:flex items-center min-w-0 flex-1 justify-center">
            <div className="flex items-center gap-1 rounded-full border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(255,255,255,0.62))] backdrop-blur-md px-2 py-1.5 shadow-[0_12px_34px_rgba(26,42,58,0.06)]">
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2.5 text-sm font-semibold tracking-tight transition-all duration-300 relative rounded-full ${
                      isActive ? 'text-terracotta' : 'text-navy/78 hover:text-terracotta'
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-full border border-terracotta/15 bg-[linear-gradient(180deg,rgba(212,85,58,0.18),rgba(212,85,58,0.08))] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="flex items-center gap-3 lg:gap-4 shrink-0">
            <div className="hidden 2xl:flex items-center gap-4 text-sm text-navy/55 rounded-full border border-white/80 bg-white/72 backdrop-blur-md px-4 py-2 shadow-[0_10px_40px_rgba(26,42,58,0.06)]">
              <WeatherWidget />
              <span className="w-px h-4 bg-navy/10" />
              <TimeWidget />
            </div>

            <Link
              href="/guias"
              className="hidden md:inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[linear-gradient(135deg,#0F1A24_0%,#1A2A3A_100%)] text-white text-sm font-semibold hover:from-terracotta hover:to-orange-600 transition-all shadow-[0_14px_34px_rgba(26,42,58,0.18)] ring-1 ring-white/10"
            >
              <Sparkles size={15} />
              Explorar Huelva
              <ArrowRight size={15} />
            </Link>

            <button
              className="xl:hidden p-3 transition-colors rounded-full text-navy hover:bg-navy/5 border border-navy/10 bg-white/78 backdrop-blur-sm"
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
              <div className="grid grid-cols-1 gap-3 pt-5 mt-4 border-t border-navy/10 text-sm text-navy/60">
                <div className="rounded-2xl border border-navy/10 bg-white/70 px-4 py-3"><WeatherWidget /></div>
                <div className="rounded-2xl border border-navy/10 bg-white/70 px-4 py-3"><TimeWidget /></div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
