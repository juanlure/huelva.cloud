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
      className="flex items-center gap-3"
    >
      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-terracotta">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm text-white/60">{label}</p>
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

  // Parallax effects
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Quick links data - MEJORADO con copy más persuasivo
  const quickLinks = [
    { 
      title: 'Dónde comer', 
      desc: 'Los sitios donde comemos los de aquí',
      icon: <Utensils size={20} />,
      href: '/comer',
      color: 'from-orange-500/20 to-red-500/20',
      badge: 'Top 10'
    },
    { 
      title: 'Qué hacer hoy', 
      desc: 'Planes que no fallan este finde',
      icon: <Calendar size={20} />,
      href: '/eventos',
      color: 'from-blue-500/20 to-purple-500/20',
      badge: 'Actualizado'
    },
    { 
      title: 'Mejores playas', 
      desc: 'Kilómetros de arena sin masificaciones',
      icon: <MapPin size={20} />,
      href: '/playas',
      color: 'from-green-500/20 to-teal-500/20',
      badge: 'Secretos'
    },
    { 
      title: 'Guías locales', 
      desc: 'Lo que solo sabemos los de Huelva',
      icon: <Compass size={20} />,
      href: '/guias',
      color: 'from-amber-500/20 to-orange-500/20',
      badge: '60+ guías'
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-navy"
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
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-transparent to-navy/90" />
      </motion.div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        className="container relative z-10 pt-32 pb-20"
      >
        <div className="max-w-5xl mx-auto">
          {/* Badge - MEJORADO con social proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white/80 mb-6 border border-white/10"
          >
            <Users size={16} className="text-terracotta" />
            <span>60+ guías escritas por onubenses de verdad</span>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-1 mb-6"
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
            ))}
            <span className="text-white/60 text-sm ml-2">Guía local #1 en Huelva</span>
          </motion.div>

          {/* Main Headline - MEJORADO con copywriting brutal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-display text-5xl md:text-7xl lg:text-8xl font-semibold text-white mb-6 leading-[0.95]"
          >
            Descubre Huelva
            <br />
            <span className="text-terracotta italic">como un local</span>
          </motion.h1>

          {/* Subheadline - MEJORADO con hook y value prop */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-2xl mb-8"
          >
            Sin tópicos vacíos. Sin lugares turísticos trampa. 
            Solo <strong className="text-white">lo que los de Huelva hacemos</strong>, 
            dónde comemos, y qué lugares guardamos en secreto.
          </motion.p>

          {/* Value Props - NUEVO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <TrendingUp size={12} className="text-green-400" />
              </div>
              <span>Actualizado marzo 2026</span>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <MapPin size={12} className="text-green-400" />
              </div>
              <span>60+ lugares verificados</span>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <Users size={12} className="text-green-400" />
              </div>
              <span>Escrito por onubenses</span>
            </div>
          </motion.div>

          {/* CTA Buttons - MEJORADO con urgencia */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start gap-4 mb-12"
          >
            <Link
              href="#descubre"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-terracotta hover:bg-terracotta/90 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-terracotta/25"
            >
              Ver planes para hoy
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#guias"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 transition-all duration-300"
            >
              Explorar guías completas
            </Link>
          </motion.div>

          {/* Stats Row - MEJORADO */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-8 pt-8 border-t border-white/10"
          >
            <QuickStat value="60+" label="guías locales" icon={<Sparkles size={18} />} />
            <QuickStat value="10k" label="lectores/mes" icon={<Users size={18} />} />
            <QuickStat value="4.9" label="valoración media" icon={<Star size={18} />} />
          </motion.div>
        </div>
      </motion.div>

      {/* Quick Links Bar - MEJORADO con badges */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative z-10 mt-auto"
      >
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8">
            {quickLinks.map((link, idx) => (
              <Link
                key={link.title}
                href={link.href}
                className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 transition-all duration-300"
              >
                {/* Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-2 py-1 bg-terracotta/80 text-white text-xs font-semibold rounded-full">
                    {link.badge}
                  </span>
                </div>

                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-terracotta mb-4 group-hover:scale-110 transition-transform">
                    {link.icon}
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-1">{link.title}</h3>
                  <p className="text-white/50 text-sm">{link.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs uppercase tracking-widest">Descubre más</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-3 bg-terracotta rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}