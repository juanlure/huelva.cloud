'use client';

import { useState } from 'react';

// Simple Grid Gallery
export default function Gallery({ images }: { images: string[] }) {
    if (!images || images.length === 0) return null;

    return (
        <div className="my-12">
            <h3 className="text-2xl font-serif font-bold mb-6 text-gray-900 border-l-4 border-orange-500 pl-4">
                Galería de Fotos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((src, idx) => (
                    <div key={idx} className="relative group overflow-hidden rounded-xl aspect-square shadow-sm hover:shadow-md transition-shadow">
                        <img
                            src={src}
                            alt={`Galería ${idx + 1}`}
                            className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
