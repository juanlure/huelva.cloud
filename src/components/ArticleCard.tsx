'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Bookmark } from 'lucide-react';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: Date | string;
  readTime: number;
  slug: string;
  featured?: boolean;
}

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
}: ArticleCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`group bg-white rounded-3xl overflow-hidden border border-navy-10 hover:shadow-xl transition-all duration-500 ${
        featured ? 'md:grid md:grid-cols-2 md:gap-0' : 'flex flex-col h-full'
      }`}
    >
      {/* Image Section */}
      <Link
        href={`/article/${slug}`}
        className={`relative overflow-hidden block ${
          featured ? 'aspect-[4/3] md:aspect-auto md:h-full' : 'aspect-[16/9]'
        }`}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="badge badge-terracotta text-[10px]">
            {category}
          </span>
        </div>

        {/* Save Button */}
        <button
          onClick={(e) => { e.preventDefault(); setIsSaved(!isSaved); }}
          className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110"
        >
          <Bookmark
            size={18}
            className={isSaved ? 'text-terracotta fill-terracotta' : 'text-navy-60'}
          />
        </button>
      </Link>

      {/* Content Section */}
      <div className={`p-6 flex flex-col ${featured ? 'md:p-10' : 'flex-1'}`}>
        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-navy-40 mb-4">
          <span className="font-semibold uppercase tracking-wider text-navy-60">
            {author.name}
          </span>
          <span className="w-1 h-1 rounded-full bg-navy-20" />
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-terracotta" />
            <span>{readTime} min</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-display font-semibold text-navy mb-3 group-hover:text-terracotta transition-colors">
          <Link href={`/article/${slug}`} className="hover:underline decoration-terracotta/30 underline-offset-4">
            {title}
          </Link>
        </h3>

        {/* Excerpt - No truncation, let it flow naturally */}
        <p className="text-navy-60 text-sm leading-relaxed mb-6 line-clamp-3">
          {excerpt}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-navy-10 flex items-center justify-between">
          <Link
            href={`/article/${slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-terracotta transition-colors group"
          >
            <span>Leer más</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <span className="text-xs text-navy-30">
            {formatDate(publishedAt)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
