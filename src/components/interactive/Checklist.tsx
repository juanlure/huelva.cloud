'use client';

import { useState } from 'react';

export default function Checklist({
    title,
    items // [{ id, label, category }]
}: {
    title: string;
    items: any[];
}) {
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

    const toggleItem = (id: string) => {
        const next = new Set(checkedItems);
        if (next.has(id)) {
            next.delete(id);
        } else {
            next.add(id);
        }
        setCheckedItems(next);
    };

    const progress = Math.round((checkedItems.size / items.length) * 100);

    return (
        <div className="checklist-wrapper bg-white rounded-2xl shadow-sm border border-gray-200 p-8 my-12 max-w-2xl mx-auto">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                    <p className="text-gray-500 text-sm mt-1">{checkedItems.size} de {items.length} completados</p>
                </div>
                <div className="text-green-600 font-bold text-xl">{progress}%</div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-gray-100 rounded-full mb-8 overflow-hidden">
                <div
                    className="h-full bg-green-500 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="space-y-2">
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`
                w-full flex items-center p-3 rounded-xl transition-all text-left group
                ${checkedItems.has(item.id)
                                ? 'bg-green-50 text-green-700 decoration-slate-400'
                                : 'hover:bg-gray-50 text-gray-700'}
            `}
                    >
                        <div className={`
                w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-colors
                ${checkedItems.has(item.id) ? 'bg-green-500 border-green-500' : 'border-gray-300 group-hover:border-gray-400'}
            `}>
                            {checkedItems.has(item.id) && <span className="text-white text-sm">✓</span>}
                        </div>
                        <span className={`flex-1 font-medium ${checkedItems.has(item.id) ? 'line-through opacity-70' : ''}`}>
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
