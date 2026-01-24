'use client';

import React from 'react';

interface RichImageProps {
    src: string;
    alt: string;
}

export default function RichImage({ src, alt }: RichImageProps) {
    return (
        <figure className="my-12 group w-full relative">
            <div className="relative overflow-hidden rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] transition-all duration-700 group-hover:scale-[1.01] group-hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.2)] bg-gray-100">
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute inset-0 border border-black/5 rounded-xl pointer-events-none shadow-inner"></div>
            </div>
            {alt && (
                <figcaption className="mt-4 text-center text-sm text-gray-500 font-serif italic tracking-wide opacity-80 max-w-2xl mx-auto">
                    {alt}
                </figcaption>
            )}
        </figure>
    );
}
