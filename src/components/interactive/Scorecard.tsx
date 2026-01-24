'use client';

import { useState } from 'react';

interface ScoreItem {
    id: string;
    label: string;
    icon: string;
    score: number;
}

interface ScorecardProps {
    title: string;
    items: { id: string; label: string; icon: string }[];
}

export default function Scorecard({ title, items }: ScorecardProps) {
    const [scores, setScores] = useState<Record<string, number>>(
        items.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {})
    );

    const handleScore = (id: string, value: number) => {
        setScores(prev => ({ ...prev, [id]: value }));
    };

    const totalScore = (Object.values(scores).reduce((a, b) => a + b, 0) / items.length).toFixed(1);

    return (
        <div className="scorecard-container bg-white rounded-3xl p-8 my-12 border border-orange-100 shadow-xl overflow-hidden relative">
            {/* Fondo decorativo sutil */}
            <div className="absolute top-0 right-0 -trorange-x-1/4 -trorange-y-1/4 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

            <h2 className="text-3xl font-bold text-gray-900 mb-8 relative z-10">{title}</h2>

            <div className="space-y-8 relative z-10">
                {items.map((item) => (
                    <div key={item.id} className="score-item">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl bg-orange-50 p-2 rounded-xl">{item.icon}</span>
                                <span className="font-bold text-gray-700">{item.label}</span>
                            </div>
                            <span className="text-orange-600 font-bold text-xl">{scores[item.id]} / 10</span>
                        </div>

                        <div className="relative h-4 bg-gray-100 rounded-full cursor-pointer group">
                            <input
                                type="range"
                                min="0"
                                max="10"
                                step="1"
                                value={scores[item.id]}
                                onChange={(e) => handleScore(item.id, parseInt(e.target.value))}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                            />
                            <div
                                className="absolute h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-300 ease-out z-10"
                                style={{ width: `${scores[item.id] * 10}%` }}
                            >
                                <div className="absolute right-0 top-1/2 -trorange-y-1/2 w-6 h-6 bg-white border-4 border-orange-500 rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 text-center relative z-10">
                <div className="inline-block px-10 py-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <span className="block text-orange-100 text-sm font-bold uppercase tracking-widest mb-1">Puntuación Choquera</span>
                    <span className="text-5xl font-black text-white">{totalScore}</span>
                </div>

                <p className="mt-6 text-gray-500 italic text-sm">
                    * Esta nota es tuya, no me vengas luego con que el sitio estaba cerrao.
                </p>
            </div>
        </div>
    );
}
