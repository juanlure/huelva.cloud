'use client';

import React from 'react';

export default function RichQuote({ children }: { children: React.ReactNode }) {
    return (
        <blockquote className="relative my-10 pl-8 pr-4 py-4 italic font-serif text-xl md:text-2xl text-gray-700 leading-relaxed border-l-4 border-emerald-500 bg-gradient-to-r from-emerald-50 to-transparent rounded-r-xl">
            <span className="absolute top-0 left-2 text-6xl text-emerald-200 font-serif leading-none -z-10">“</span>
            {children}
        </blockquote>
    );
}
