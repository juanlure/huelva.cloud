'use client';

import React from 'react';
import styles from './TipBox.module.css';

// Modern, high-aesthetic tip box
export default function TipBox({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.tipBox}>
            <div className={styles.icon}>💡</div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}
