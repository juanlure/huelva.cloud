'use client';

import dynamic from 'next/dynamic';

const TranslatorComponent = dynamic(() => import('./interactive/TranslatorComponent'));
const ItineraryBuilder = dynamic(() => import('./interactive/ItineraryBuilder'));
const QuizComponent = dynamic(() => import('./interactive/QuizComponent'));

export default function InteractiveContainer({ type, data }: { type: string, data: any }) {
    if (!data) return null;

    switch (type) {
        case 'translator':
            return <TranslatorComponent {...data} />;
        case 'itinerary':
            return <ItineraryBuilder {...data} />;
        case 'quiz':
            return <QuizComponent {...data} />;
        default:
            return null;
    }
}
