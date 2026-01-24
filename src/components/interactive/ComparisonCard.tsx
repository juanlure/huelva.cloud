'use client';

import { useState } from 'react';
import styles from './ComparisonCard.module.css';

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
        <div className={styles.comparisonWrapper}>
            <h2 className={styles.title}>{title}</h2>

            <div className={styles.grid}>
                {items.map((item, idx) => {
                    const isWinner = winner === idx;
                    return (
                        <div
                            key={idx}
                            className={`${styles.card} ${isWinner ? styles.cardWinner : styles.cardNormal}`}
                        >
                            {isWinner && (
                                <div className={styles.winnerBadge}>
                                    🏆 EL ELEGIDO
                                </div>
                            )}

                            <div className={styles.imagePlaceholder}>
                                {idx === 0 ? '🅰️' : '🅱️'}
                            </div>

                            <div className={styles.content}>
                                <h3 className={styles.itemName}>{item.name}</h3>

                                <div className={styles.attributes}>
                                    {item.attributes.map((attr: any, attrIdx: number) => (
                                        <div key={attrIdx} className={styles.attributeRow}>
                                            <span className={styles.attributeLabel}>{attr.label}</span>
                                            <span className={`${styles.attributeValue} ${attr.better ? styles.attributeBetter : ''}`}>
                                                {attr.value} {attr.better && '✅'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
