'use client';

import React from 'react';

export default function RichQuote({ children }: { children: React.ReactNode }) {
    return (
        <blockquote className="relative my-16 pl-10 pr-6 py-6 italic font-serif text-2xl md:text-3xl text-gray-800 leading-relaxed border-l-[6px] border-orange-500/80">
            <span className="absolute -top-4 left-4 text-8xl text-orange-500/10 font-serif leading-none -z-10 font-black">“</span>
            {children}
        </blockquote>
    );
}
