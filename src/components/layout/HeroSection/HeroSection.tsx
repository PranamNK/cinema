import React from 'react';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
    children: React.ReactNode;
}

export default function HeroSection({ children }: HeroSectionProps) {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    Cinema <span className={styles.highlight}>Reimagined</span>
                </h1>
                <p className={styles.subtitle}>
                    Explore the universe of film in a premium glassmorphic experience.
                </p>
                <div className={styles.searchWrapper}>
                    {children}
                </div>
            </div>
            <div className={styles.glow} />
        </section>
    );
}
