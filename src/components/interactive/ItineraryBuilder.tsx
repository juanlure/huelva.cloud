'use client';

import { useState } from 'react';

const VIBES = [
    { id: 'classic', label: 'Clásico', emoji: '🏛️', description: 'Historia y monumentos' },
    { id: 'foodie', label: 'Foodie', emoji: '🍽️', description: 'Tapas y mercados' },
    { id: 'nature', label: 'Naturaleza', emoji: '🌿', description: 'Parques y rutas' },
    { id: 'relaxed', label: 'Relax', emoji: '☀️', description: 'Playa y descanso' },
];

export default function ItineraryBuilder({
    title = "Tu Plan Ideal",
    itineraries
}: {
    title?: string;
    destination?: string;
    itineraries: any;
}) {
    const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
    const [showItinerary, setShowItinerary] = useState(false);

    const handleGenerate = () => {
        if (selectedVibe) {
            setShowItinerary(true);
        }
    };

    return (
        <div className="itinerary-builder bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 my-12 shadow-sm border border-blue-100">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
                <p className="text-gray-600 mt-2">
                    Selecciona tu estilo y te preparamos el plan perfecto
                </p>
            </div>

            {!showItinerary ? (
                <>
                    {/* Vibe Selector */}
                    <div className="vibe-grid grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {VIBES.map((vibe) => (
                            <button
                                key={vibe.id}
                                onClick={() => setSelectedVibe(vibe.id)}
                                className={`
                  p-6 rounded-xl text-center transition-all duration-200 border-2
                  ${selectedVibe === vibe.id
                                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl scale-105'
                                        : 'bg-white text-gray-700 border-transparent hover:border-indigo-200 hover:shadow-lg'
                                    }
                `}
                            >
                                <span className="text-4xl block mb-2 transform hover:scale-110 transition-transform">{vibe.emoji}</span>
                                <span className="font-bold block">{vibe.label}</span>
                                <span className="text-xs opacity-90 mt-1">{vibe.description}</span>
                            </button>
                        ))}
                    </div>

                    {/* Generate Button */}
                    <div className="text-center">
                        <button
                            onClick={handleGenerate}
                            disabled={!selectedVibe}
                            className={`
                px-8 py-4 rounded-full font-bold text-lg transition-all duration-300
                ${selectedVibe
                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl scale-100'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed scale-95'
                                }
              `}
                        >
                            ✨ Crear mi itinerario
                        </button>
                    </div>
                </>
            ) : (
                /* Generated Itinerary */
                <div className="itinerary-result animate-fadeIn">
                    <button
                        onClick={() => setShowItinerary(false)}
                        className="text-indigo-600 mb-6 hover:underline flex items-center font-medium"
                    >
                        ← Cambiar estilo
                    </button>

                    {itineraries[selectedVibe!] ? Object.entries(itineraries[selectedVibe!]).map(([day, activities]: [string, any]) => (
                        <div key={day} className="day-block bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">
                                {day === 'day1' ? '📅 Día 1' : '📅 Día 2'}
                            </h3>
                            <div className="space-y-4">
                                {(activities as any[]).map((activity, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                        <span className="text-3xl bg-indigo-50 p-2 rounded-lg">{activity.emoji}</span>
                                        <div>
                                            <span className="text-sm text-indigo-600 font-bold uppercase tracking-wide">
                                                {activity.time}
                                            </span>
                                            <h4 className="font-bold text-gray-800 text-lg">{activity.title}</h4>
                                            <p className="text-gray-600 text-sm mt-1 leading-relaxed">{activity.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )) : (
                        <div className="p-8 text-center text-gray-500 bg-white rounded-xl">
                            No hay itinerario disponible para este estilo aún.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
