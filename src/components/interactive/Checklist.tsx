'use client';

import { useState } from 'react';
import styles from './Checklist.module.css';

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
        <div className={styles.checklistWrapper}>
            <div className={styles.header}>
                <div>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.count}>{checkedItems.size} de {items.length} completados</p>
                </div>
                <div className={styles.percentage}>{progress}%</div>
            </div>

            {/* Progress Bar */}
            <div className={styles.progressBar}>
                <div
                    className={styles.progressFill}
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className={styles.itemsList}>
                {items.map((item) => {
                    const isChecked = checkedItems.has(item.id);
                    return (
                        <button
                            key={item.id}
                            onClick={() => toggleItem(item.id)}
                            className={`${styles.itemButton} ${isChecked ? styles.itemChecked : styles.itemUnchecked}`}
                        >
                            <div className={`${styles.checkbox} ${isChecked ? styles.checkboxChecked : styles.checkboxUnchecked}`}>
                                {isChecked && <span className={styles.checkMark}>✓</span>}
                            </div>
                            <span className={`${styles.label} ${isChecked ? styles.labelChecked : ''}`}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
