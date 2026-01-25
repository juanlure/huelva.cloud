'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface TrendingLabelProps {
  className?: string;
}

export default function TrendingLabel({ className }: TrendingLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-terracotta/10 to-orange-50 border border-terracotta/20 ${className || ''}`}
    >
      <Sparkles size={16} className="text-terracotta animate-pulse" />
      <span className="text-sm font-bold text-navy uppercase tracking-widest">
        La guía más honesta de Huelva
      </span>
    </motion.div>
  );
}
