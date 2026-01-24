'use client';

import { useState } from 'react';
import styles from './ItineraryBuilder.module.css';

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
        <div className={styles.itineraryBuilder}>
            {/* Header */}
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.subtitle}>
                    Selecciona tu estilo y te preparamos el plan perfecto
                </p>
            </div>

            {!showItinerary ? (
                <>
                    {/* Vibe Selector */}
                    <div className={styles.vibeGrid}>
                        {VIBES.map((vibe) => {
                            const isActive = selectedVibe === vibe.id;
                            return (
                                <button
                                    key={vibe.id}
                                    onClick={() => setSelectedVibe(vibe.id)}
                                    className={`${styles.vibeButton} ${isActive ? styles.vibeButtonActive : styles.vibeButtonInactive}`}
                                >
                                    <span className={styles.vibeEmoji}>{vibe.emoji}</span>
                                    <span className={styles.vibeLabel}>{vibe.label}</span>
                                    <span className={styles.vibeDescription}>{vibe.description}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Generate Button */}
                    <div className={styles.generateContainer}>
                        <button
                            onClick={handleGenerate}
                            disabled={!selectedVibe}
                            className={`${styles.generateButton} ${selectedVibe ? styles.generateButtonEnabled : styles.generateButtonDisabled}`}
                        >
                            ✨ Crear mi itinerario
                        </button>
                    </div>
                </>
            ) : (
                /* Generated Itinerary */
                <div className={styles.itineraryResult}>
                    <button
                        onClick={() => setShowItinerary(false)}
                        className={styles.backButton}
                    >
                        ← Cambiar estilo
                    </button>

                    {itineraries[selectedVibe!] ? Object.entries(itineraries[selectedVibe!]).map(([day, activities]: [string, any]) => (
                        <div key={day} className={styles.dayBlock}>
                            <h3 className={styles.dayTitle}>
                                {day === 'day1' ? '📅 Día 1' : '📅 Día 2'}
                            </h3>
                            <div className={styles.activities}>
                                {(activities as any[]).map((activity, idx) => (
                                    <div key={idx} className={styles.activityCard}>
                                        <span className={styles.activityEmoji}>{activity.emoji}</span>
                                        <div>
                                            <span className={styles.activityTime}>
                                                {activity.time}
                                            </span>
                                            <h4 className={styles.activityTitle}>{activity.title}</h4>
                                            <p className={styles.activityDescription}>{activity.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )) : (
                        <div className={styles.dayBlock}>
                            No hay itinerario disponible para este estilo aún.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
