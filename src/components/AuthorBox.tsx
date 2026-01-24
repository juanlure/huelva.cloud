'use client';

import React from 'react';
import styles from './AuthorBox.module.css';

interface AuthorData {
    name: string;
    role: string;
    bio: string;
    avatar: string;
}

export default function AuthorBox({ author }: { author: AuthorData }) {
    return (
        <div className={styles.authorSection}>
            <div className={styles.authorBox}>
                <img src={author.avatar} alt={author.name} className={styles.authorAvatar} />
                <div className={styles.authorInfo}>
                    <h3>{author.name}</h3>
                    <div className={styles.authorMeta}>
                        <span className={styles.authorRole}>{author.role}</span>
                        <span className={styles.aiBadge}>AI Editorial Persona · Synthetic Profile</span>
                    </div>
                    <p className={styles.authorBio}>{author.bio}</p>
                </div>
            </div>

            <div className={styles.aiDisclosure}>
                <p>
                    <strong>Transparencia IA:</strong> Este artículo ha sido generado automáticamente por inteligencia artificial
                    y curado por sistemas autónomos monitoreados. <a href="/ai-disclosure">Saber más</a>.
                </p>
            </div>
        </div>
    );
}
