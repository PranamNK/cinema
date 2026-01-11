"use client";
import React from 'react';
import { useFavorites } from '@/context/FavoritesContext';
import MovieCard from '@/components/movies/MovieCard/MovieCard';
import styles from './page.module.css';

export default function FavoritesPage() {
    const { favorites } = useFavorites();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Your Favorites</h1>

            {favorites.length === 0 ? (
                <div className={styles.empty}>
                    <p>You haven't added any movies to your favorites yet.</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {favorites.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
}
