'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Sparkles, MapPin, Utensils, Calendar, Compass, Star, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface QuickStatProps {
  value: string;
  label: string;
  icon: React.ReactNode;
}

function QuickStat({ value, label, icon }: QuickStatProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-2 sm:gap-3"
    >
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-terracotta">
        {icon}
      </div>
      <div>
        <p className="text-lg sm:text-2xl font-bold text-white">{value}</p>
        <p className="text-xs sm:text-sm text-white/60">{label}</p>
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects - disabled on mobile for performance
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Quick links data
  const quickLinks = [
    { 
      title: 'Dónde comer', 
      desc: 'Los sitios donde comemos los de aquí',
      icon: <Utensils size={18} />,
      href: '/comer',
      color: 'from-orange-500/20 to-red-500/20',
      badge: 'Top 10'
    },
    { 
      title: 'Qué hacer', 
      desc: 'Planes que no fallan este finde',
      icon: <Calendar size={18} />,
      href: '/eventos',
      color: 'from-blue-500/20 to-purple-500/20',
      badge: 'Hoy'
    },
    { 
      title: 'Playas', 
      desc: 'Kilómetros sin masificaciones',
      icon: <MapPin size={18} />,
      href: '/playas',
      color: 'from-green-500/20 to-teal-500/20',
      badge: 'Secretos'
    },
    { 
      title: 'Guías', 
      desc: 'Lo que solo sabemos los de Huelva',
      icon: <Compass size={18} />,
      href: '/guias',
      color: 'from-amber-500/20 to-orange-500/20',
      badge: '60+'
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-navy"
    >
      {/* Background Image with Overlay */}
      <motion.div 
        style={{ scale: imageScale, opacity: imageOpacity }}
        className="absolute inset-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/guides/huelva-aerea.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/70 to-navy" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/50 to-navy/95" />
      </motion.div>

      {/* Animated Particles - fewer on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-terracotta/30 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="container relative z-10 pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-20 px-4 sm:px-6"
      >
        <div className="max-w-5xl mx-auto">
          {/* Badge - compact on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-white/80 mb-4 sm:mb-6 border border-white/10"
          >
            <Users size={14} className="text-terracotta" />
            <span className="hidden sm:inline">60+ guías escritas por onubenses de verdad</span>
            <span className="sm:hidden">60+ guías de onubenses</span>
          </motion.div>

          {/* Trust Badge - hidden on smallest screens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden sm:flex items-center gap-1 mb-4 sm:mb-6"
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
            ))}
            <span className="text-white/60 text-sm ml-2">Guía local #1 en Huelva</span>
          </motion.div>

          {/* Main Headline - responsive sizes */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-white mb-4 sm:mb-6 leading-[0.95]"
          >
            Descubre Huelva
            <br />
            <span className="text-terracotta italic">como un local</span>
          </motion.h1>

          {/* Subheadline - shorter on mobile */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 leading-relaxed max-w-2xl mb-6 sm:mb-8"
          >
            <span className="hidden sm:inline">Sin tópicos vacíos. Sin lugares turísticos trampa. </span>
            Solo <strong className="text-white">lo que los de Huelva hacemos</strong>, 
            <span className="hidden sm:inline"> dónde comemos, y qué lugares guardamos en secreto.</span>
          </motion.p>

          {/* Value Props - horizontal scroll on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-x-4 gap-y-2 mb-6 sm:mb-10"
          >
            <div className="flex items-center gap-1.5 text-white/60 text-xs sm:text-sm">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <TrendingUp size={10} className="text-green-400" />
              </div>
              <span>Marzo 2026</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/60 text-xs sm:text-sm">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <MapPin size={10} className="text-green-400" />
              </div>
              <span>60+ lugares</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/60 text-xs sm:text-sm">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <Users size={10} className="text-green-400" />
              </div>
              <span>Por onubenses</span>
            </div>
          </motion.div>

          {/* CTA Buttons - full width on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4 mb-8 sm:mb-12"
          >
            <Link
              href="#descubre"
              className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-terracotta hover:bg-terracotta/90 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-terracotta/25 text-sm sm:text-base"
            >
              Ver planes para hoy
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#guias"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 transition-all duration-300 text-sm sm:text-base"
            >
              Explorar guías
            </Link>
          </motion.div>

          {/* Stats Row - hidden on mobile, visible on sm+ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hidden sm:flex flex-wrap gap-6 lg:gap-8 pt-6 lg:pt-8 border-t border-white/10"
          >
            <QuickStat value="60+" label="guías locales" icon={<Sparkles size={16} />} />
            <QuickStat value="10k" label="lectores/mes" icon={<Users size={16} />} />
            <QuickStat value="4.9" label="valoración" icon={<Star size={16} />} />
          </motion.div>
        </div>
      </motion.div>

      {/* Quick Links Bar - optimized for mobile */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative z-10 mt-auto"
      >
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 pb-4 sm:pb-8">
            {quickLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-3 sm:p-6 hover:bg-white/10 transition-all duration-300"
              >
                {/* Badge */}
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20">
                  <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-terracotta/80 text-white text-[10px] sm:text-xs font-semibold rounded-full">
                    {link.badge}
                  </span>
                </div>

                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/10 flex items-center justify-center text-terracotta mb-2 sm:mb-4 group-hover:scale-110 transition-transform">
                    {link.icon}
                  </div>
                  <h3 className="font-semibold text-white text-sm sm:text-lg mb-0.5 sm:mb-1">{link.title}</h3>
                  <p className="text-white/50 text-[10px] sm:text-sm leading-tight">{link.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator - smaller on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 sm:gap-2 text-white/40"
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-widest">Descubre</span>
          <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1 sm:p-2">
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 sm:w-1.5 sm:h-3 bg-terracotta rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}