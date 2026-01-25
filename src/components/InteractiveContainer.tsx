'use client';

import dynamic from 'next/dynamic';

const TranslatorComponent = dynamic(() => import('./interactive/TranslatorComponent'));
const ItineraryBuilder = dynamic(() => import('./interactive/ItineraryBuilder'));
const QuizComponent = dynamic(() => import('./interactive/QuizComponent'));
const ComparisonCard = dynamic(() => import('./interactive/ComparisonCard'));
const Checklist = dynamic(() => import('./interactive/Checklist'));
const Scorecard = dynamic(() => import('./interactive/Scorecard'));
const Map = dynamic(() => import('./interactive/Map'), { ssr: false });

export default function InteractiveContainer({ type, data }: { type: string, data: any }) {
    if (!data) return null;

    switch (type) {
        case 'translator':
            return <TranslatorComponent {...data} />;
        case 'itinerary':
            return <ItineraryBuilder {...data} />;
        case 'quiz':
            return <QuizComponent {...data} />;
        case 'cards':
            return <ComparisonCard {...data} />;
        case 'checklist':
            return <Checklist {...data} />;
        case 'scorecard':
            return <Scorecard {...data} />;
        case 'map':
            return <Map {...data} />;
        default:
            return null;
    }
}
