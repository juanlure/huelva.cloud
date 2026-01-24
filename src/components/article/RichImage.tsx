'use client';

import React from 'react';
import styles from './RichImage.module.css';

interface RichImageProps {
    src: string;
    alt: string;
    caption?: string;
}

export default function RichImage({ src, alt, caption }: RichImageProps) {
    return (
        <figure className={styles.figure}>
            <div className={styles.imageContainer}>
                <img
                    src={src}
                    alt={alt}
                    className={styles.image}
                    loading="lazy"
                />
                <div className={styles.border}></div>
            </div>
            {(caption || alt) && (
                <figcaption className={styles.caption}>
                    {caption || alt}
                </figcaption>
            )}
        </figure>
    );
}
