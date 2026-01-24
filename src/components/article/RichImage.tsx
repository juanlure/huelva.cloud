'use client';

import React from 'react';

interface RichImageProps {
    src: string;
    alt: string;
}

export default function RichImage({ src, alt }: RichImageProps) {
    return (
        <figure className="my-10 group">
            <div className="relative overflow-hidden rounded-xl shadow-lg transition-transform duration-500 hover:shadow-2xl">
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute inset-0 border-2 border-white/10 rounded-xl pointer-events-none"></div>
            </div>
            {alt && (
                <figcaption className="mt-3 text-center text-sm text-gray-500 font-medium tracking-wide font-sans italic">
                    {alt}
                </figcaption>
            )}
        </figure>
    );
}
