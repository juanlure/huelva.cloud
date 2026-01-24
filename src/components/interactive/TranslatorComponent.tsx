'use client';

import { useState } from 'react';
import styles from './TranslatorComponent.module.css';

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
        <div className={styles.translatorWrapper}>
            {/* Header */}
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.subtitle}>{subtitle}</p>
            </div>

            {/* Visual Display */}
            <div className={styles.visualDisplay}>
                <div className="text-center">
                    <h3 className={styles.selectedName}>
                        {selectedItem.name}
                    </h3>

                    {visualType === 'ratio' && selectedItem.ratio !== undefined && (
                        <div className={styles.ratioBar}>
                            <div
                                className={styles.ratioFill}
                                style={{ width: `${selectedItem.ratio}%` }}
                            />
                        </div>
                    )}

                    <p className={styles.description}>{selectedItem.description}</p>

                    {selectedItem.tip && (
                        <div className={styles.tipBox}>
                            <span className={styles.tipIcon}>💡</span>
                            <span className={styles.tipText}>{selectedItem.tip}</span>
                        </div>
                    )}

                    {selectedItem.price_range && (
                        <div className={styles.priceRange}>
                            💰 {selectedItem.price_range}
                        </div>
                    )}
                </div>
            </div>

            {/* Selector Buttons */}
            <div className={styles.selectorGrid}>
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className={`
              ${styles.selectorButton}
              ${selectedItem.id === item.id
                                ? styles.activeButton
                                : styles.inactiveButton
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
