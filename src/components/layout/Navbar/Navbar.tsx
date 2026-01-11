"use client";
import React from 'react';
import Link from 'next/link';
import { Clapperboard } from 'lucide-react';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.logo}>
                <Clapperboard color="var(--color-accent-primary)" size={28} style={{ marginRight: '0.5rem' }} />
                CINEMA
            </Link>
            <div className={styles.navLinks}>
                <Link href="/" className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}>
                    Discover
                </Link>
                <Link href="/favorites" className={`${styles.link} ${pathname === '/favorites' ? styles.active : ''}`}>
                    Favorites
                </Link>
            </div>
        </nav>
    );
}
