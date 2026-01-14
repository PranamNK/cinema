"use client";
import React, { useEffect, useState } from 'react';
import { Genre } from '@/types';
import { getGenres } from '@/utils/api';
import styles from './FilterBar.module.css';

interface FilterBarProps {
    selectedGenre: number | undefined;
    onSelectGenre: (genreId: number | undefined) => void;
}

export default function FilterBar({ selectedGenre, onSelectGenre }: FilterBarProps) {
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const res = await getGenres();
                console.log("FilterBar fetched genres:", res);
                if (res && res.genres) {
                    setGenres(res.genres);
                } else {
                    console.error("FilterBar: No genres found in response", res);
                }
            } catch (err) {
                console.error("FilterBar: Failed to fetch genres", err);
            }
        };
        fetchGenres();
    }, []);

    return (
        <div className={styles.filterContainer}>
            <div className={styles.filterScroll}>
                <button
                    className={`${styles.filterChip} ${!selectedGenre ? styles.active : ''}`}
                    onClick={() => onSelectGenre(undefined)}
                >
                    All
                </button>
                {genres.map(genre => (
                    <button
                        key={genre.id}
                        className={`${styles.filterChip} ${selectedGenre === genre.id ? styles.active : ''}`}
                        onClick={() => onSelectGenre(genre.id)}
                    >
                        {genre.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
