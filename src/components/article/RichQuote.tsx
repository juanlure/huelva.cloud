'use client';

import React from 'react';
import styles from './RichQuote.module.css';

export default function RichQuote({ children }: { children: React.ReactNode }) {
    return (
        <blockquote className={styles.quote}>
            <span className={styles.mark}>“</span>
            {children}
        </blockquote>
    );
}
