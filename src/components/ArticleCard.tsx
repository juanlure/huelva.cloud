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

const categoryStyles: Record<string, { accent: string; pill: string; glow: string; frame: string }> = {
  comer: {
    accent: 'text-terracotta',
    pill: 'bg-terracotta/12 text-terracotta border-terracotta/15',
    glow: 'group-hover:shadow-[0_22px_70px_rgba(212,85,58,0.16)]',
    frame: 'from-terracotta/16 via-white/0 to-transparent',
  },
  eventos: {
    accent: 'text-navy',
    pill: 'bg-navy/8 text-navy border-navy/10',
    glow: 'group-hover:shadow-[0_22px_70px_rgba(26,42,58,0.14)]',
    frame: 'from-navy/12 via-white/0 to-transparent',
  },
  guias: {
    accent: 'text-navy-600',
    pill: 'bg-sage text-navy border-sage/70',
    glow: 'group-hover:shadow-[0_22px_70px_rgba(104,132,96,0.14)]',
    frame: 'from-sage/70 via-white/0 to-transparent',
  },
  alojarse: {
    accent: 'text-sky-600',
    pill: 'bg-sky-50 text-sky-700 border-sky-100',
    glow: 'group-hover:shadow-[0_22px_70px_rgba(96,165,250,0.14)]',
    frame: 'from-sky-100 via-white/0 to-transparent',
  },
  noticias: {
    accent: 'text-orange-600',
    pill: 'bg-orange-50 text-orange-700 border-orange-100',
    glow: 'group-hover:shadow-[0_22px_70px_rgba(249,115,22,0.14)]',
    frame: 'from-orange-100 via-white/0 to-transparent',
  },
  default: {
    accent: 'text-terracotta',
    pill: 'bg-terracotta/12 text-terracotta border-terracotta/15',
    glow: 'group-hover:shadow-[0_22px_70px_rgba(212,85,58,0.16)]',
    frame: 'from-terracotta/16 via-white/0 to-transparent',
  },
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
    if (typeof date === 'string') {
      const parsed = new Date(date);
      if (Number.isNaN(parsed.getTime())) return date;
      return parsed.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
    }

    return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
  };

  const normalizedCategory = category.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const style = categoryStyles[normalizedCategory] || categoryStyles.default;
  const href = `/article/${slug}`;
  const isExternal = external;

  const LinkWrapper = ({ children, className, style: linkStyle }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => {
    return <Link href={href} className={className} style={linkStyle}>{children}</Link>;
  };

  const isGeneratedImage = !!imageUrl && imageUrl.startsWith('data:image/');

  return (
    <motion.article
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={compact ? { y: -4 } : { y: -8 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`group relative overflow-hidden rounded-[2rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(255,252,248,0.86))] backdrop-blur-md shadow-[0_18px_60px_rgba(26,42,58,0.08)] transition-all duration-500 ${style.glow} ${
        featured ? 'md:grid md:grid-cols-[1.1fr_0.9fr] md:gap-0' : 'flex flex-col h-full'
      } ${compact ? 'hover:border-navy/10' : 'hover:border-white/90'}`}
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${style.frame} opacity-90`} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

      {imageUrl ? (
        <LinkWrapper
          className={`relative overflow-hidden block ${
            featured ? 'aspect-[4/3] md:aspect-auto md:h-full' : compact ? 'aspect-[16/10]' : 'aspect-[16/9]'
          }`}
        >
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1, filter: isHovered ? 'saturate(1.08)' : 'saturate(1)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full will-change-transform"
          >
            {isGeneratedImage ? (
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover transition-opacity duration-300"
                loading={featured ? 'eager' : 'lazy'}
              />
            ) : (
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={featured}
              />
            )}
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-navy/78 via-navy/18 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/10 to-transparent" />

          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] backdrop-blur-md ${style.pill}`}>
              {isExternal && <ExternalLink size={10} />}
              {category}
            </span>
            {featured && (
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/12 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-md">
                Destacado
              </span>
            )}
          </div>

          <motion.button
            onClick={(e) => { e.preventDefault(); setIsSaved(!isSaved); }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.2 }}
            className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white shadow-sm"
          >
            <Bookmark size={18} className={isSaved ? 'text-terracotta fill-terracotta' : 'text-navy/55'} />
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 16 }}
            transition={{ duration: 0.3, delay: 0.08 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <span className="text-white text-sm font-medium flex items-center gap-2">
              {isExternal ? 'Ver noticia' : 'Leer artículo'}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.div>
        </LinkWrapper>
      ) : (
        <div className={`relative flex items-center justify-center bg-gradient-to-br from-sand to-cream ${
          featured ? 'aspect-[4/3] md:aspect-auto md:h-full' : 'aspect-[16/9]'
        }`}>
          <div className="absolute top-4 left-4">
            <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] ${style.pill}`}>
              {category}
            </span>
          </div>
          <div className="text-navy/25 text-center">
            <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
            <span className="text-sm font-medium">Huelva.cloud</span>
          </div>
        </div>
      )}

      <div className={`${compact ? 'p-5' : featured ? 'p-7 md:p-10' : 'p-6'} relative flex flex-col ${featured ? '' : 'flex-1'} transition-colors duration-300 bg-[linear-gradient(180deg,rgba(255,255,255,0.70),rgba(255,252,247,0.54))]`}>
        <div className={`flex items-center gap-4 text-xs text-navy/42 ${compact ? 'mb-3' : 'mb-4'} flex-wrap`}>
          <span className="font-semibold uppercase tracking-[0.18em] text-navy/55 text-[11px]">{author.name}</span>
          <span className="w-1 h-1 rounded-full bg-navy/20" />
          <div className="flex items-center gap-1.5">
            <Clock size={13} className={style.accent} />
            <span>{readTime} min</span>
          </div>
        </div>

        <h3 className={`text-display text-navy leading-[1.02] tracking-[-0.02em] group-hover:text-terracotta transition-colors duration-300 ${
          featured ? 'text-3xl md:text-4xl mb-4' : compact ? 'text-[1.35rem] mb-2' : 'text-[1.75rem] mb-3'
        }`}>
          <LinkWrapper className="hover:underline decoration-terracotta/30 underline-offset-4">
            {title}
          </LinkWrapper>
        </h3>

        {!compact && (
          <p className={`text-navy/65 leading-relaxed ${featured ? 'text-base md:text-lg mb-8' : 'text-sm mb-6'} line-clamp-3`}>
            {excerpt}
          </p>
        )}

        <div className={`flex items-center justify-between gap-4 ${compact ? 'mt-auto pt-3' : 'mt-auto pt-4 border-t border-navy/8'}`}>
          <LinkWrapper className="inline-flex items-center gap-2 font-semibold text-navy hover:text-terracotta transition-colors text-sm">
            <span>{isExternal ? 'Ver noticia' : 'Leer más'}</span>
            <motion.span animate={{ x: isHovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
              <ArrowRight size={compact ? 14 : 16} />
            </motion.span>
          </LinkWrapper>

          <span className="text-xs text-navy/34 whitespace-nowrap">{formatDate(publishedAt)}</span>
        </div>
      </div>
    </motion.article>
  );
}
