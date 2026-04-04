'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Sparkles, MapPin, Utensils, Calendar, Compass, Users, TrendingUp } from 'lucide-react';
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
      title: 'Qué ver', 
      desc: 'La guía madre para empezar con criterio',
      icon: <Compass size={18} />,
      href: '/que-ver',
      color: 'from-amber-500/20 to-orange-500/20',
      badge: 'Base'
    },
    { 
      title: 'Dónde comer', 
      desc: 'Sitios que ayudan a decidir de verdad',
      icon: <Utensils size={18} />,
      href: '/donde-comer',
      color: 'from-orange-500/20 to-red-500/20',
      badge: 'Mesa'
    },
    { 
      title: 'Agenda', 
      desc: 'Planes vivos para hoy y este finde',
      icon: <Calendar size={18} />,
      href: '/agenda',
      color: 'from-blue-500/20 to-purple-500/20',
      badge: 'Ahora'
    },
    { 
      title: 'Playas', 
      desc: 'Costa elegida por tipo de día',
      icon: <MapPin size={18} />,
      href: '/playas',
      color: 'from-green-500/20 to-teal-500/20',
      badge: 'Costa'
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-[linear-gradient(180deg,#13202d_0%,#1a2a3a_42%,#101922_100%)]"
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,85,58,0.22),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.10),transparent_20%),linear-gradient(180deg,rgba(15,26,36,0.66)_0%,rgba(15,26,36,0.24)_32%,rgba(15,26,36,0.92)_100%)]" />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-grid-shimmer mix-blend-soft-light" />
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
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.05))] backdrop-blur-xl rounded-full text-xs font-bold text-white/90 mb-8 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.16)]"
          >
            <Sparkles size={14} className="text-terracotta" />
            <span className="uppercase tracking-[0.2em]">Huelva.cloud · Guía local con criterio</span>
          </motion.div>

          {/* Local trust signal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden sm:flex items-center gap-2 mb-4 sm:mb-6 text-white/60 text-sm"
          >
            <span className="inline-flex w-2.5 h-2.5 rounded-full bg-terracotta" />
            <span>Capital, costa y provincia. Sin ranking inventado.</span>
          </motion.div>

          {/* Main Headline - responsive sizes */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-8 leading-[0.85] tracking-tight drop-shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
          >
            Huelva
            <br />
            <span className="text-terracotta italic font-light drop-shadow-2xl">bien elegida</span>
          </motion.h1>

          {/* Subheadline - shorter on mobile */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl md:text-2xl text-white/60 leading-relaxed max-w-2xl mb-12 font-light"
          >
            Guías, agenda, playas, comida y escapadas para decidir mejor qué ver, dónde comer y cómo ordenar una visita a Huelva sin perder tiempo con relleno.
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
              <span>Actualizado en 2026</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/60 text-xs sm:text-sm">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <MapPin size={10} className="text-green-400" />
              </div>
              <span>60+ piezas publicadas</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/60 text-xs sm:text-sm">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <Users size={10} className="text-green-400" />
              </div>
              <span>Criterio local</span>
            </div>
          </motion.div>

          {/* CTA Buttons - full width on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mb-20"
          >
            <Link
              href="/que-ver"
              className="group relative overflow-hidden px-8 py-5 bg-[linear-gradient(135deg,#D4553A_0%,#E56C49_52%,#C5402A_100%)] text-white font-bold rounded-full transition-all duration-500 hover:shadow-[0_18px_40px_-12px_rgba(212,85,58,0.55)] active:scale-95 text-center ring-1 ring-white/10"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                VER QUÉ VER EN HUELVA
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              href="/donde-comer"
              className="group px-8 py-5 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.04))] hover:bg-white/10 backdrop-blur-md text-white font-bold rounded-full border border-white/10 transition-all duration-300 text-center active:scale-95 hover:border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
            >
              VER DÓNDE COMER
            </Link>
          </motion.div>

          {/* Stats Row - hidden on mobile, visible on sm+ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hidden sm:flex flex-wrap gap-6 lg:gap-8 pt-6 lg:pt-8 border-t border-white/10"
          >
            <QuickStat value="60+" label="piezas publicadas" icon={<Sparkles size={16} />} />
            <QuickStat value="capital + provincia" label="rutas, guías y actualidad" icon={<MapPin size={16} />} />
            <QuickStat value="local" label="criterio útil antes que postureo" icon={<Users size={16} />} />
          </motion.div>
        </div>
      </motion.div>

      {/* Quick Links Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative z-10 px-4 sm:px-6 mb-4"
      >
        <div className="container px-0">
          <p className="text-[10px] sm:text-xs font-bold text-white/40 uppercase tracking-[0.3em] mb-4">Accesos directos</p>
        </div>
      </motion.div>

      {/* Quick Links Bar - optimized for mobile */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="relative z-10 mt-auto"
      >
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 pb-8 sm:pb-12">
            {quickLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="group relative overflow-hidden rounded-[1.7rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] backdrop-blur-2xl border border-white/8 p-5 sm:p-8 hover:bg-white/[0.08] transition-all duration-500 hover:-translate-y-2 shadow-[0_22px_70px_rgba(0,0,0,0.18)]"
              >
                {/* Badge */}
                <div className="absolute top-4 right-5 z-20">
                  <span className="px-2 py-1 bg-terracotta text-white text-[9px] font-bold rounded-full uppercase tracking-wider shadow-lg shadow-terracotta/20">
                    {link.badge}
                  </span>
                </div>

                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                
                <div className="relative z-10">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-white/5 flex items-center justify-center text-terracotta mb-4 group-hover:scale-110 transition-transform duration-500 border border-white/5">
                    {link.icon}
                  </div>
                  <h3 className="font-bold text-white text-base sm:text-xl mb-1 group-hover:text-terracotta transition-colors">{link.title}</h3>
                  <p className="text-white/40 text-xs sm:text-sm leading-relaxed font-light">{link.desc}</p>
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