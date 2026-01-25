import Link from 'next/link';
import React from 'react';
import { getArticleBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import { AUTHORS } from '@/lib/authors';
import InteractiveContainer from '@/components/InteractiveContainer';
import AuthorBox from '@/components/AuthorBox';
import ArticleRenderer from '@/components/article/ArticleRenderer';
import { Clock, Share2, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const authorData = AUTHORS[article.author] || AUTHORS['El Choco'];

  // --- Lógica de Extracción de Interactividad ---
  let interactiveType = null;
  let interactiveData = null;
  let cleanedContent = article.content || '';

  const typeMatch = cleanedContent.match(/<div id="interactive-root" data-component="([^"]+)"/);
  if (typeMatch) interactiveType = typeMatch[1];

  const dataMatch = cleanedContent.match(/<script type="application\/json" id="interactive-data">([\s\S]*?)<\/script>/);
  if (dataMatch) {
    try {
      interactiveData = JSON.parse(dataMatch[1]);
    } catch (e) {
      console.error("Error parsing interactive data:", e);
    }
  }

  if (interactiveType && interactiveData) {
    cleanedContent = cleanedContent
      .replace(/<div id="interactive-root"[^>]*><\/div>/g, '')
      .replace(/<script type="application\/json" id="interactive-data">[\s\S]*?<\/script>/g, '');
  }

  return (
    <main className="min-h-screen bg-white pt-40 pb-20">
      <article className="max-w-7xl mx-auto px-6">
        {/* Editorial Header - Centered & Clean */}
        <header className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-3 mb-8 flex-wrap gap-2">
            <span className="px-4 py-1.5 bg-green-50 text-green-800 text-xs font-bold uppercase tracking-widest rounded-full border border-green-100">
              {article.category}
            </span>
            {article.isAi && (
              <span className="text-xs font-medium text-navy/40 flex items-center border border-navy/10 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2" />
                Curado con IA
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-navy leading-[1.1] mb-8 tracking-tight max-w-4xl mx-auto">
            {article.title}
          </h1>

          <div className="flex items-center justify-center text-navy/60 text-sm font-medium space-x-4">
            <div className="flex items-center">
              <span className="font-bold text-navy mr-2">{article.author}</span>
            </div>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <div className="flex items-center">
              <Clock size={14} className="mr-1.5" />
              <span>{parseInt(article.readTime) || 5} min lectura</span>
            </div>
          </div>
        </header>

        {/* Contained Hero Image */}
        <div className="max-w-4xl mx-auto mb-20 relative">
          <div className="aspect-[16/9] w-full relative rounded-2xl overflow-hidden shadow-xl shadow-navy/5">
            <img
              src={article.image || '/images/placeholder.jpg'}
              alt={article.title}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Content Column */}
        <div className="max-w-2xl mx-auto">
          {/* Excerpt - Serif, centered, elegant */}
          <p className="text-xl md:text-2xl font-display text-navy leading-relaxed mb-12 text-center italic border-b border-navy/5 pb-10">
            {article.excerpt}
          </p>

          <div className="editorial-content">
            {interactiveType && interactiveData && (
              <div className="my-12 p-1 border-t border-b border-navy/5">
                <InteractiveContainer type={interactiveType} data={interactiveData} />
              </div>
            )}

            {cleanedContent && (
              <ArticleRenderer content={cleanedContent} />
            )}
          </div>

          {/* Footer / Author */}
          <div className="mt-20 pt-10 border-t border-navy/10">
            <div className="flex items-center justify-between mb-10">
              <Link href="/" className="group flex items-center text-navy/60 hover:text-navy transition-colors font-medium text-sm">
                <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Volver al inicio
              </Link>
              <button className="p-3 rounded-full bg-cream hover:bg-terracotta/10 text-navy transition-colors">
                <Share2 size={18} />
              </button>
            </div>
            <AuthorBox author={authorData} />
          </div>
        </div>
      </article>

      {/* Read Next Section */}
      {/* Could add generic read next here later */}
    </main>
  );
}
