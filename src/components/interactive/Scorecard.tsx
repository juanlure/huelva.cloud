'use client';

import { useState } from 'react';
import styles from './Scorecard.module.css';

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
        <div className={styles.scorecardContainer}>
            <div className={styles.decoration}></div>

            <h2 className={styles.title}>{title}</h2>

            <div className={styles.itemsList}>
                {items.map((item) => (
                    <div key={item.id} className={styles.scoreItem}>
                        <div className={styles.itemHeader}>
                            <div className={styles.itemInfo}>
                                <span className={styles.itemIcon}>{item.icon}</span>
                                <span className={styles.itemLabel}>{item.label}</span>
                            </div>
                            <span className={styles.scoreValue}>{scores[item.id]} / 10</span>
                        </div>

                        <div className={styles.rangeContainer}>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                step="1"
                                value={scores[item.id]}
                                onChange={(e) => handleScore(item.id, parseInt(e.target.value))}
                                className={styles.rangeInput}
                            />
                            <div
                                className={styles.rangeTrack}
                                style={{ width: `${scores[item.id] * 10}%` }}
                            >
                                <div className={styles.handle}></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.footer}>
                <div className={styles.totalBadge}>
                    <span className={styles.totalText}>Puntuación Choquera</span>
                    <span className={styles.totalScore}>{totalScore}</span>
                </div>

                <p className={styles.disclaimer}>
                    * Esta nota es tuya, no me vengas luego con que el sitio estaba cerrao.
                </p>
            </div>
        </div>
    );
}
