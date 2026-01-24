'use client';

import React from 'react';

// Modern, high-aesthetic tip box
export default function TipBox({ children }: { children: React.ReactNode }) {
    return (
        <div className="my-8 p-6 bg-orange-50 border-l-4 border-orange-500 rounded-r-lg shadow-sm flex gap-4 items-start transition-transform hover:scale-[1.01]">
            <div className="text-2xl pt-1">💡</div>
            <div className="prose prose-orange max-w-none text-gray-800 font-medium">
                {children}
            </div>
        </div>
    );
}
