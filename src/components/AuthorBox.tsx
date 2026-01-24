'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AuthorData {
    name: string;
    role: string;
    bio: string;
    avatar: string;
}

export default function AuthorBox({ author }: { author: AuthorData }) {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center md:items-start p-8 bg-sand/30 rounded-3xl border border-navy/5">
                <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-24 h-24 rounded-full object-cover mb-6 md:mb-0 md:mr-8 border-4 border-white shadow-sm"
                />
                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-display font-bold text-navy mb-2">{author.name}</h3>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                        <span className="text-sm font-semibold text-terracotta uppercase tracking-tighter">
                            {author.role}
                        </span>
                        <span className="px-2 py-0.5 bg-navy/5 text-[10px] font-bold text-navy/40 uppercase tracking-widest rounded border border-navy/10">
                            AI Editorial Persona
                        </span>
                    </div>
                    <p className="text-navy/60 leading-relaxed italic">
                        "{author.bio}"
                    </p>
                </div>
            </div>

            <div className="p-6 bg-white border border-navy/5 rounded-2xl flex items-start space-x-4">
                <div className="w-10 h-10 bg-terracotta/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-terracotta text-lg">⚖️</span>
                </div>
                <div>
                    <p className="text-sm text-navy/70 leading-relaxed">
                        <strong className="text-navy">Transparencia IA:</strong> Este artículo ha sido generado por inteligencia artificial
                        y curado por sistemas autónomos monitoreados para garantizar la veracidad y el tono "choquero".
                        <Link href="/ai-disclosure" className="text-terracotta hover:underline ml-1 font-bold">
                            Saber más sobre nuestro proceso.
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
