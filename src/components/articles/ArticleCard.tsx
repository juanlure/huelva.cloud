'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className={cn(
                "group relative bg-white rounded-2xl overflow-hidden border border-navy/5 shadow-sm hover:shadow-xl transition-all duration-300",
                featured ? "md:grid md:grid-cols-2 md:gap-0" : "flex flex-col"
            )}
        >
            {/* Image Section */}
            <div className={cn("relative overflow-hidden", featured ? "aspect-[4/3] md:aspect-auto" : "aspect-[16/9]")}>
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-terracotta text-white text-[10px] uppercase tracking-widest font-bold rounded-full">
                        {category}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className={cn("p-6 flex flex-col", featured ? "md:p-10 justify-center" : "flex-1")}>
                <div className="flex items-center space-x-3 text-xs text-navy/40 mb-4">
                    <span className="font-semibold uppercase tracking-tight">{author.name}</span>
                    <span>•</span>
                    <div className="flex items-center">
                        <Clock size={12} className="mr-1" />
                        <span>{readTime} min lectura</span>
                    </div>
                </div>

                <h3 className={cn(
                    "font-display font-bold text-navy group-hover:text-terracotta transition-colors mb-3",
                    featured ? "text-3xl md:text-4xl" : "text-xl leading-tight"
                )}>
                    <Link href={`/article/${slug}`}>
                        {title}
                    </Link>
                </h3>

                <p className={cn(
                    "text-navy/60 leading-relaxed mb-6",
                    featured ? "text-lg" : "text-sm line-clamp-3"
                )}>
                    {excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <Link
                        href={`/article/${slug}`}
                        className="inline-flex items-center text-sm font-bold text-navy hover:text-terracotta transition-colors group/link"
                    >
                        Leer más
                        <ArrowRight size={16} className="ml-2 transition-transform group-hover/link:translate-x-1" />
                    </Link>

                    <span className="text-[10px] text-navy/30 uppercase tracking-tighter">
                        {typeof publishedAt === 'string' ? publishedAt : new Date(publishedAt).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
