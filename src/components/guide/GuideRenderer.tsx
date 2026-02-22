'use client';

import React, { useState, useEffect } from 'react';
import { Guide } from '../../types/guide';
import GuideChapterRenderer from './GuideChapterRenderer';
import RichImage from '../article/RichImage';

interface GuideRendererProps {
    guide: Guide;
}

export default function GuideRenderer({ guide }: GuideRendererProps) {
    const [activeChapter, setActiveChapter] = useState<string>(guide.chapters[0]?.id || '');

    // Simple scroll spy logic (optional, for MVP active state)
    // For now, we just render the structure

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative h-[70vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/40 z-10" />
                <img
                    src={guide.heroImage}
                    alt={guide.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-12 max-w-4xl mx-auto">
                    <div className="text-white mb-8 animate-fade-in-up">
                        <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 uppercase tracking-widest mb-4 inline-block">
                            Huelva.cloud Guides
                        </span>
                        <h1 className="text-5xl md:text-7xl font-serif font-black leading-none mb-4">
                            {guide.title}
                        </h1>
                        <p className="text-xl md:text-2xl font-light text-white/90 max-w-2xl">
                            {guide.subtitle}
                        </p>
                    </div>
                </div>
            </div>

            {/* Sticky Table of Contents */}
            <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm overflow-x-auto">
                <div className="max-w-4xl mx-auto px-6 py-4 flex gap-6 md:gap-8 whitespace-nowrap">
                    {guide.chapters.map((chapter) => (
                        <a
                            key={chapter.id}
                            href={`#chapter-${chapter.id}`}
                            className="text-sm font-bold text-slate-500 hover:text-orange-600 transition-colors uppercase tracking-wide cursor-pointer"
                        >
                            {chapter.title}
                        </a>
                    ))}
                </div>
            </div>

            {/* Content */}
            <main className="max-w-3xl mx-auto px-6 pt-8">
                {/* Intro / Metadata */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-8 mb-8 text-sm text-slate-500">
                    <span>By <strong>Choquero Bot</strong></span>
                    <span>{guide.tags.join(' • ')}</span>
                </div>

                {guide.chapters.map((chapter, index) => (
                    <GuideChapterRenderer
                        key={chapter.id}
                        chapter={chapter}
                        chapterIndex={index}
                    />
                ))}

                {/* Footer Prompt */}
                <div className="mt-20 p-8 bg-slate-50 rounded-2xl text-center border border-slate-200">
                    <h3 className="font-serif text-2xl text-slate-900 mb-2">¿Te ha sido útil?</h3>
                    <p className="text-slate-600 mb-6">Esta guía ha sido curada con IA y verificada por locales.</p>
                    <button className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold hover:bg-slate-800 transition-colors">
                        Compartir guía
                    </button>
                </div>
            </main>
        </div>
    );
}
