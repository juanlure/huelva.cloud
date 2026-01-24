import React from 'react';
import { GuidePlace } from '../../types/guide';
import RichImage from '../article/RichImage';

interface PlaceCardProps {
    place: GuidePlace;
    index: number;
}

export default function PlaceCard({ place, index }: PlaceCardProps) {
    return (
        <div className="my-8 rounded-xl overflow-hidden bg-white shadow-sm border border-slate-100 group transition-transform hover:-translate-y-1 duration-300">
            <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden">
                    {place.images && place.images.length > 0 ? (
                        <RichImage
                            src={place.images[0]}
                            alt={place.name}
                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                            <span className="text-4xl">📍</span>
                        </div>
                    )}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold font-mono text-slate-800 shadow-sm">
                        #{index + 1}
                    </div>
                </div>

                {/* Content Section */}
                <div className="md:w-3/5 p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-slate-900 font-serif leading-tight">
                                {place.name}
                            </h3>
                            {place.priceRange && (
                                <span className="text-sm font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded">
                                    {place.priceRange}
                                </span>
                            )}
                        </div>

                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                            {place.description}
                        </p>

                        {place.tip && (
                            <div className="bg-orange-50 border-l-2 border-orange-400 p-3 mb-4 rounded-r-md">
                                <p className="text-xs text-orange-800 italic">
                                    <span className="font-bold not-italic">💡 Consejo:</span> {place.tip}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex gap-2">
                            {place.bestFor?.map(tag => (
                                <span key={tag} className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold bg-slate-100 px-2 py-1 rounded-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {place.googleMapsUrl && (
                            <a
                                href={place.googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-orange-600 hover:text-orange-700 text-sm font-bold group/link"
                            >
                                Ver mapa
                                <svg className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
