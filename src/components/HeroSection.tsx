'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Clock } from 'lucide-react';
import TrendingLabel from '@/components/ui/TrendingLabel';

interface StatCounterProps {
  value: string;
  label: string;
  icon: React.ReactNode;
}

function StatCounter({ value, label, icon }: StatCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-2 text-sm text-navy-40"
    >
      <span className="text-terracotta">{icon}</span>
      <span>{value} {label}</span>
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
  const blob1Y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const blob1X = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const blob2X = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center bg-cream overflow-hidden"
    >
      {/* Background Grid with shimmer */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.02]" />

      {/* Animated Blob 1 - Top Right */}
      <motion.div
        style={{ y: blob1Y, x: blob1X }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-terracotta/8 via-terracotta/5 to-transparent rounded-full blur-3xl"
      />

      {/* Animated Blob 2 - Bottom Left */}
      <motion.div
        style={{ y: blob2Y, x: blob2X }}
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-navy/8 via-sage/10 to-transparent rounded-full blur-3xl"
      />

      {/* Decorative floating elements */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-[10%] w-3 h-3 bg-terracotta/20 rounded-full hidden lg:block"
      />
      <motion.div
        animate={{
          y: [0, 10, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-1/3 right-[15%] w-2 h-2 bg-navy/10 rounded-full hidden lg:block"
      />

      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="container relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center py-24">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-8"
          >
            <TrendingLabel />
          </motion.div>

          {/* Decorative Line - Animated */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 60, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-8"
          >
            <div className="h-[3px] bg-terracotta rounded-full" style={{ width: 60 }} />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-display font-semibold text-navy mb-8"
            style={{ lineHeight: 0.95 }}
          >
            Huelva como{' '}
            <span className="relative inline-block">
              <span className="text-terracotta italic">nunca</span>
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                className="absolute -bottom-3 left-0 w-full"
                height="12"
                viewBox="0 0 200 12"
                fill="none"
              >
                <motion.path
                  d="M2 8C50 2 150 2 198 8"
                  stroke="#D4553A"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                />
              </motion.svg>
            </span>
            {' '}te la habían contado
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-navy-60 leading-relaxed max-w-2xl mx-auto mb-12"
          >
            Sin rodeos, sin turismos. Solo lo mejor de nuestra tierra
            contado por gente que sabe lo que es un buen plato de chocos.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="#trending"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-primary group"
            >
              Empezar a leer
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#guias"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-outline"
            >
              Explorar guías
            </motion.a>
          </motion.div>

          {/* Stats with animated counters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-8 border-t border-navy-10"
          >
            <StatCounter
              value="+50"
              label="guías locales"
              icon={<Sparkles size={16} />}
            />
            <StatCounter
              value=""
              label="Escrito por onubenses"
              icon={<Users size={16} />}
            />
            <StatCounter
              value=""
              label="Actualizado semanalmente"
              icon={<Clock size={16} />}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator with float animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-navy-20 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{
              y: [0, 12, 0],
              opacity: [1, 0.5, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-terracotta rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
