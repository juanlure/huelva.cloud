'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Bookmark, ExternalLink } from 'lucide-react';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string | null;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: Date | string;
  readTime: number;
  slug: string;
  featured?: boolean;
  compact?: boolean;
  external?: boolean;
}

// Category-based styling
const categoryStyles: Record<string, { border: string; accent: string; bg: string }> = {
  'comer': {
    border: 'border-l-4 border-l-terracotta',
    accent: 'text-terracotta',
    bg: 'hover:bg-terracotta-100/30'
  },
  'eventos': {
    border: 'border-l-4 border-l-navy',
    accent: 'text-navy',
    bg: 'hover:bg-navy-100/30'
  },
  'guias': {
    border: 'border-l-4 border-l-sage',
    accent: 'text-navy-600',
    bg: 'hover:bg-sage/30'
  },
  'alojarse': {
    border: 'border-l-4 border-l-[#60a5fa]',
    accent: 'text-[#60a5fa]',
    bg: 'hover:bg-blue-50/50'
  },
  'default': {
    border: 'border-l-4 border-l-terracotta',
    accent: 'text-terracotta',
    bg: 'hover:bg-cream/50'
  }
};

export default function ArticleCard({
  title,
  excerpt,
  category,
  imageUrl,
  author,
  publishedAt,
  readTime,
  slug,
  featured = false,
  compact = false,
  external = false,
}: ArticleCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
  };

  const normalizedCategory = category.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const style = categoryStyles[normalizedCategory] || categoryStyles['default'];

  const href = `/article/${slug}`;
  const isExternal = external;

  const LinkWrapper = ({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => {
    return <Link href={href} className={className} style={style}>{children}</Link>;
  };

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={compact ? { y: -4 } : {
        y: -8,
        rotateX: 2,
        rotateY: -1,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      className={`group bg-white rounded-2xl overflow-hidden border border-navy-10 hover:shadow-lg transition-all duration-500 ${style.border} ${
        featured ? 'md:grid md:grid-cols-2 md:gap-0' : 'flex flex-col h-full'
      } ${compact ? 'hover:shadow-md' : 'hover:shadow-xl'}`}
      style={{ 
        perspective: 1000,
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Image Section */}
      {imageUrl ? (
        <LinkWrapper
          className={`relative overflow-hidden block ${
            featured ? 'aspect-[4/3] md:aspect-auto md:h-full' : 'aspect-[16/9]'
          }`}
          style={{ transform: 'translateZ(0)' }}
        >
          <motion.div
            animate={{
              scale: isHovered ? 1.05 : 1,
              filter: isHovered ? 'saturate(1.1)' : 'saturate(1)'
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full will-change-transform"
          >
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-opacity duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={featured}
            />
          </motion.div>

          {/* Gradient overlay - appears on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent"
          />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="badge badge-terracotta text-[10px] inline-flex items-center gap-1"
            >
              {isExternal && <ExternalLink size={10} />}
              {category}
            </motion.span>
          </div>

          {/* Save Button */}
          <motion.button
            onClick={(e) => { e.preventDefault(); setIsSaved(!isSaved); }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white"
          >
            <Bookmark
              size={18}
              className={isSaved ? 'text-terracotta fill-terracotta' : 'text-navy-60'}
            />
          </motion.button>

          {/* Read more indicator on image - visible on hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <span className="text-white text-sm font-medium flex items-center gap-2">
              {isExternal ? 'Ver noticia' : 'Leer artículo'}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.div>
        </LinkWrapper>
      ) : (
        /* No Image - Category Badge Only */
        <div className={`relative bg-navy-5 flex items-center justify-center ${
          featured ? 'aspect-[4/3] md:aspect-auto md:h-full' : 'aspect-[16/9]'
        }`}>
          <div className="absolute top-4 left-4">
            <span className="badge badge-terracotta text-[10px]">
              {category}
            </span>
          </div>
          <div className="text-navy-20 text-center">
            <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
            <span className="text-sm">Huelva.is</span>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className={`${compact ? 'p-4' : 'p-6'} flex flex-col ${featured ? 'md:p-10' : 'flex-1'} ${style.bg} transition-colors duration-300`}>
        {/* Meta */}
        <div className={`flex items-center gap-4 text-xs text-navy-40 mb-3 ${compact ? 'mb-2' : 'mb-4'}`}>
          <span className={`font-semibold uppercase tracking-wider text-navy-60 ${compact ? 'text-[10px]' : ''}`}>
            {author.name}
          </span>
          {!compact && (
            <>
              <span className="w-1 h-1 rounded-full bg-navy-20" />
              <div className="flex items-center gap-1.5">
                <Clock size={14} className={style.accent} />
                <span>{readTime} min</span>
              </div>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className={`text-display font-semibold text-navy mb-2 group-hover:text-terracotta transition-colors duration-300 ${compact ? 'text-base mb-2' : 'text-lg mb-3'}`}>
          <LinkWrapper className="hover:underline decoration-terracotta/30 underline-offset-4">
            {title}
          </LinkWrapper>
        </h3>

        {/* Excerpt - hidden in compact mode */}
        {!compact && (
          <p className="text-navy-60 text-sm leading-relaxed mb-6 line-clamp-3">
            {excerpt}
          </p>
        )}

        {/* Footer */}
        <div className={`flex items-center justify-between ${compact ? 'mt-auto pt-3' : 'mt-auto pt-4 border-t border-navy-10'}`}>
          <LinkWrapper
            className={`inline-flex items-center gap-2 font-semibold text-navy hover:text-terracotta transition-colors group/link ${compact ? 'text-xs' : 'text-sm'}`}
          >
            <span>{isExternal ? 'Ver noticia →' : 'Leer más'}</span>
            {!isExternal && (
              <motion.span
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight size={compact ? 14 : 16} />
              </motion.span>
            )}
          </LinkWrapper>

          {!compact && (
            <span className="text-xs text-navy-30">
              {formatDate(publishedAt)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
