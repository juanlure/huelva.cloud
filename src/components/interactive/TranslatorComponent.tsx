'use client';

import { useState } from 'react';

export default function TranslatorComponent({
    title,
    subtitle,
    items,
    visualType = 'ratio' // 'ratio' | 'scale' | 'cards'
}: {
    title: string;
    subtitle: string;
    items: any[];
    visualType?: 'ratio' | 'scale' | 'cards';
}) {
    const [selectedItem, setSelectedItem] = useState(items[0]);

    if (!items || items.length === 0) return null;

    return (
        <div className="translator-wrapper bg-white rounded-2xl shadow-lg p-8 my-12 border border-gray-100">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
                <p className="text-gray-600 mt-2">{subtitle}</p>
            </div>

            {/* Visual Display */}
            <div className="visual-display bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 mb-8 transition-all duration-300">
                <div className="text-center">
                    <h3 className="text-4xl font-bold text-amber-900 mb-4">
                        {selectedItem.name}
                    </h3>

                    {visualType === 'ratio' && selectedItem.ratio !== undefined && (
                        <div className="ratio-bar flex h-8 rounded-full overflow-hidden mb-4 shadow-inner bg-amber-200">
                            <div
                                className="bg-amber-800 transition-all duration-500 ease-out"
                                style={{ width: `${selectedItem.ratio}%` }}
                            />
                        </div>
                    )}

                    <p className="text-lg text-gray-700 min-h-[3rem]">{selectedItem.description}</p>

                    {selectedItem.tip && (
                        <div className="tip-box mt-4 bg-white/80 rounded-lg p-4 inline-block shadow-sm">
                            <span className="text-2xl mr-2">💡</span>
                            <span className="text-sm text-gray-600 font-medium">{selectedItem.tip}</span>
                        </div>
                    )}

                    {selectedItem.price_range && (
                        <div className="mt-4 text-amber-800 font-bold">
                            💰 {selectedItem.price_range}
                        </div>
                    )}
                </div>
            </div>

            {/* Selector Buttons */}
            <div className="selector-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className={`
              px-4 py-3 rounded-xl font-medium transition-all duration-200
              ${selectedItem.id === item.id
                                ? 'bg-amber-600 text-white shadow-lg scale-105 transform'
                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow'
                            }
            `}
                    >
                        {item.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
