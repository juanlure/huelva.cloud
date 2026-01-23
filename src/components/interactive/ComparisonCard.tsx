'use client';

import { useState } from 'react';

export default function ComparisonCard({
    title,
    items, // [{ name, image, attributes: [{ label, value, better: boolean }] }]
    winner // optional: index of winner
}: {
    title: string;
    items: any[];
    winner?: number;
}) {
    return (
        <div className="comparison-wrapper my-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">{title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className={`
                        relative bg-white rounded-2xl overflow-hidden shadow-lg border-2 transition-transform
                        ${winner === idx ? 'border-green-500 scale-105 z-10 ring-4 ring-green-100' : 'border-transparent hover:border-gray-200'}
                    `}
                    >
                        {winner === idx && (
                            <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 rounded-bl-xl font-bold text-sm z-20">
                                🏆 EL ELEGIDO
                            </div>
                        )}

                        <div className="h-48 bg-gray-200 relative">
                            {/* Placeholder visual if no image provided */}
                            <div className="absolute inset-0 flex items-center justify-center text-4xl bg-gradient-to-br from-gray-100 to-gray-200">
                                {idx === 0 ? '🅰️' : '🅱️'}
                            </div>
                            {/* Image overlay would go here if available */}
                        </div>

                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-4 text-center">{item.name}</h3>

                            <div className="space-y-3">
                                {item.attributes.map((attr: any, attrIdx: number) => (
                                    <div key={attrIdx} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                                        <span className="text-gray-500 text-sm">{attr.label}</span>
                                        <span className={`font-medium ${attr.better ? 'text-green-600' : 'text-gray-800'}`}>
                                            {attr.value} {attr.better && '✅'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
